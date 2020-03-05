import login from '../pages/login.vue'
import home from '../pages/home.vue'
// 分模块
export default [
  {
    path: '/',
    component: login
  },
  {
    path: '/home',
    component: home
  }
]
