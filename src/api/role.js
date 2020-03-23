import fetch from './fetch'

export default {
  getUser (params) { // 分页查询用户
    return fetch('/api/user', params, 'post')
  }
}