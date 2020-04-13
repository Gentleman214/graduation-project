<template>
  <a-layout id="layout">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed" width="230" class="slider">
      <div class="logo">
        <a-icon type="home" style="margin-left: 10px;" />
        仓储系统管理后台
      </div>
      <a-menu
        :defaultSelectedKeys="defaultSelectedKeys"
        mode="inline"
        theme="dark"
        :inlineCollapsed="collapsed"
        class="menu"
      >
        <template v-for="m in menu">
          <a-menu-item v-if="!m.children || !m.children.length" :key="m.key">
            <router-link :to="'/' + m.link">
              <a-icon v-if="m.icon" :type="m.icon" />
              <span>{{m.title}}</span>
            </router-link>
          </a-menu-item>
          <a-sub-menu v-else :key="m.key">
            <span slot="title">
              <a-icon v-if="m.icon" :type="m.icon" />
              <span>{{m.title}}</span>
            </span>
            <a-menu-item v-for="subm in m.children" :key="subm.key">
              <router-link :to="'/' + subm.link">
                {{subm.title}}
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
  import { mapState } from 'vuex'
  Vue.component('page', page)
  export default {
    name: "layout",
    components: {
      modifyPassword
    },
    data() {
      return {
        collapsed: false,
        menu: [],
        defaultSelectedKeys: []
      }
    },
    created () {
      this.getMenu()
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo
      })
    },
    methods: {
      getMenu () {
        let authorityId = this.userInfo.authority
        this.$api.role.getMenuByAuthorityId(authorityId).then(res => {
          if (res?.code === 200) {
            this.menu = res.data
            this.defaultSelectedKeys.push(res.data[0].key)
          } else {
            this.$message.error(res.userMsg)
          }
        })
      },
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
