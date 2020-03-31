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
  },
  getUserInfoByStaffId (staffId) { // 根据员工号获取用户信息
    return fetch(`/api/user/${staffId}`)
  },
  addOrUpdateUser (params) { // 新增员工或编辑员工信息
    return fetch('/api/user/addOrUpdate', params, 'post')
  },
  getRoleList () { // 获取角色列表
    return fetch('/api/role/list')
  },
  getMenu () { // 获取菜单
    return fetch('/api/role/menu')
  }
}
