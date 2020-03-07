import fetch from './fetch'
export default {
  common: {
    getMenu() { // 动态获取菜单
      return fetch('')
    }
  }
}
