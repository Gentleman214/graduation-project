import Vuex from 'vuex'
import Vue from 'vue'
import api from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userInfo: null,
    notice: { // 消息通知
      modifyPassword: true, // 修改密码
      perfectInfo: true // 完善信息
    },
    menu: []
  },
  getters: {},
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setNotice (state, notice) {
      state.notice = notice
    },
    setMenu (state, data) {
      state.menu = data
    }
  },
  actions: {
    getUserInfo ({ commit, state }) {
      if (!state.token || window.location.hash.indexOf('#/login') > -1) return
      return new Promise((resolve, reject) => {
        api.common.getStaffInfo().then(res => {
          if (res.code === 0) {
            commit('setUserInfo', res.data)
          }
        }).finally(() => {
          resolve()
        })
      })
    }
  }
})
