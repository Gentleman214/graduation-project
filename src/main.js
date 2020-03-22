import Vue from 'vue'
import VueRouter from 'vue-router'
import app from './App.vue'
import router from './router/index'
import store from './store'
import './assets/style/main.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import cookie from 'js-cookie'
import api from './api'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Antd)
Vue.prototype.$store = store
Vue.prototype.$cookie = cookie
Vue.prototype.$api = api
Vue.prototype.$message.config({
  top: `50px`,
  duration: 1,
  maxCount: 3,
})
var vm = new Vue({
  el: '#app',
  router,
  render: p => p(app)
})

let token = cookie.get('token')
store.commit('setToken', token)