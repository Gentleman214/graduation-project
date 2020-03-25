import fetch from './fetch'

export default {
  checkPassword (params) {
    return fetch('/api/user/checkPassword', params, 'post')
  },
  changePassword (params) {
    return fetch('/api/user/changePassword', params, 'post')
  },
  getUser (params) { // 分页查询用户
    return fetch('/api/user', params, 'post')
  }
}
