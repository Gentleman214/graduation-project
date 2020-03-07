import Vuex from 'vuex'
import Vue from 'vue'
import api from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userInfo: null,
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
