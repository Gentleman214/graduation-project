<template>
  <a-layout id="layout">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed" width="230" class="slider">
      <div class="logo">
        <a-icon type="home" style="margin-left: 10px;" />
        仓储系统管理后台
      </div>
      <a-menu
        :defaultSelectedKeys="[menu[0].id]"
        mode="inline"
        theme="dark"
        :inlineCollapsed="collapsed"
        class="menu"
      >
        <template v-for="m in menu">
          <a-menu-item v-if="!m.children.length" :key="m.id">
            <router-link :to="'/' + m.link">
              <a-icon v-if="m.icon" :type="m.icon" />
              <span>{{m.name}}</span>
            </router-link>
          </a-menu-item>
          <a-sub-menu v-else :key="m.id">
            <span slot="title">
              <a-icon v-if="m.icon" :type="m.icon" />
              <span>{{m.name}}</span>
            </span>
            <a-menu-item v-for="subm in m.children" :key="subm.id">
              <router-link :to="'/' + subm.link">
                {{subm.name}}
              </router-link>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0; max-height: 60px">
        <div class="flex flex-justify-between">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="()=> collapsed = !collapsed"
          />
         <div class="flex">
           <div class="mr-20">
             <a-dropdown>
               <div class="mr-20">
                 <a-avatar style="margin: 5px 5px" :size="25" icon="user" />
                 {{$store.state.userInfo && $store.state.userInfo.name ? $store.state.userInfo.name : '' }}
               </div>
               <a-menu slot="overlay" style="margin-top: -15px">
                 <a-menu-item>
                   <span @click="() => $router.push('/userInfo/my/0')">
                     <a-icon class="primary" type="idcard" />
                     <span class="ml-10">个人信息</span>
                   </span>
                 </a-menu-item>
                 <a-menu-item>
                   <span @click="() => $refs.changePassword.openDrawer()">
                     <a-icon class="primary" type="edit" />
                     <span class="ml-10">修改密码</span>
                   </span>
                 </a-menu-item>
                 <a-menu-item>
                   <span>
                     <a-badge dot>
                       <a-icon class="primary" type="notification" />
                     </a-badge>
                     <span class="ml-10">消息通知</span>
                   </span>
                 </a-menu-item>
               </a-menu>
             </a-dropdown>
           </div>
           <div class="mr-20 font-20 pointer" @click="loginOut"><a-icon type="logout" /></div>
         </div>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '5px', padding: '5px', background: '#fff', minHeight: '500px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
    <modify-password ref="changePassword"></modify-password>
  </a-layout>
</template>

<script>
  import Vue from 'vue'
  import page from './page.vue'
  import modifyPassword from '../components/modify-password.vue'
  Vue.component('page', page)
  const menu = [
    {
      id: '100',
      name: '控制面板',
      icon: 'area-chart',
      link: '',
      children: []
    },
    {
      id: '200',
      name: '数据录入',
      icon: 'form',
      link: 'data',
      children: []
    },
    {
      id: '300',
      name: '入库管理',
      icon: 'plus-circle',
      link: 'enter',
      children: []
    },
    {
      id: '400',
      name: '出库管理',
      icon: 'minus-circle',
      link: 'getOut',
      children: []
    },
    {
      id: '500',
      name: '库内管理',
      icon: 'check-circle',
      link: 'depository',
      children: []
    },
    {
      id: '600',
      name: '统计报表',
      icon: 'file-excel',
      link: 'statistics',
      children: []
    },
    {
      id: '700',
      name: '角色管理',
      icon: 'user',
      children: [
        {
          id: '701',
          name: '用户管理',
          link: 'user'
        },
        {
          id: '702',
          name: '权限管理',
          link: 'authority'
        }
      ]
    },
    {
      id: '800',
      name: '系统设置',
      icon: 'setting',
      children: [
        {
          id: '801',
          name: '菜单管理',
          link: 'menu'
        }
      ]
    }
  ]
  export default {
    name: "layout",
    components: {
      modifyPassword
    },
    data() {
      return {
        collapsed: false,
        menu
      }
    },
    methods: {
      loginOut () {
        this.$cookie.set('token', '', { expires: 0 })
        this.$cookie.set('staffId', '', { expires: 0 })
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  #layout .slider {
    min-height: 100vh;
    box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
    z-index: 1;
  }

  #layout .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #layout .trigger:hover {
    color: #1890ff;
  }

  #layout .logo {
    height: 32px;
    color: white;
    font-size: 20px;
    font-weight: 700;
    margin: 16px;
    overflow: hidden;
  }

  #layout .ant-menu {
    font-size: 16px;
    font-weight: 600;
  }
</style>
