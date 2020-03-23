import fetch from './fetch'
import role from './role'
export default {
  role,
  common: {
    login (params) { // 登录
      return fetch('/api/user/login',params, 'post')
    },
    checkAuth (token) { // 效验token是否有效
      return fetch('/api/user/checkAuth',{ token }, 'post')
    },
    getMenu() { // 动态获取菜单
      return fetch('')
    }
  }
}
