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
import echarts from 'echarts'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Antd)
Vue.prototype.$store = store
Vue.prototype.$cookie = cookie
Vue.prototype.$api = api
Vue.prototype.$echarts = echarts
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
let staffId = cookie.get('staffId')
if (!token || !staffId) {
  router.push('login')
} else {
  store.commit('setToken', token)
  api.common.getStaffInfo(staffId).then(res => {
    if (res?.code === 200) {
      store.commit('setUserInfo', res.data)
    }
  })
}
