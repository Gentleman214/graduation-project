import Vue from 'vue'
import VueRouter from 'vue-router'
import app from './App.vue'
import router from './router/index'
import './assets/style/main.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Antd)

var vm = new Vue({
  el: '#app',
  router,
  render: p => p(app)
})
