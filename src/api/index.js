import fetch from './fetch'
import role from './role'
import data from './data'
export default {
  role,
  data,
  common: {
    login (params) { // 登录
      return fetch('/api/user/login',params, 'post')
    },
    checkAuth (token) { // 效验token是否有效
      return fetch('/api/user/checkAuth',{ token }, 'post')
    },
    getStaffInfo (id) { // 获取用户信息（简单信息）
      return fetch(`/api/user/info/${id}`)
    },
    getMenu() { // 动态获取菜单
      return fetch('')
    }
  }
}
