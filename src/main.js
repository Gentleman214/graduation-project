import Vue from 'vue'
import VueRouter from 'vue-router'
import app from './App.vue'
import router from './router/index'
import './assets/style/main.css'
import {
  Table
} from 'ant-design-vue'
Vue.use(VueRouter)
Vue.use(Table)

var vm = new Vue({
  el: '#app',
  router,
  render: p => p(app)
})
