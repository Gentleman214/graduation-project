<template>
  <a-layout id="layout">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
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
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '5px', padding: '5px', background: '#fff', minHeight: '600px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
  import Vue from 'vue'
  import page from './page.vue'
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
    data() {
      return {
        collapsed: false,
        menu
      }
    }
  }
</script>

<style scoped>
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
    margin: 16px;
    overflow: hidden;
  }
  /*#layout .ant-layout-sider .ant-layout-sider-dark {*/
    /*background: rgba(105, 111, 112, 0.51);*/
    /*flex:0 0 230px;*/
    /*max-width: 230px;*/
    /*min-width: 230px;*/
    /*width: 230px;*/
  /*}*/
  #layout .ant-menu {
    font-size: 16px;
    font-weight: 600;
  }
</style>
