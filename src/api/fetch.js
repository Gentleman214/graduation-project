import axios from 'axios'
import store from '../store'
import router from '../router'
axios.defaults.timeout = 30000
axios.defaults.baseURL = ''
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(config => {
  config.headers.token = store.state.token
  config.headers.authorization = store.state.token
  return config
}, err => {
  return Promise.reject(err)
})

function request ({ url = '', params = {}, method = 'get', type = 'payload', headers = {} }) {
  let query = []
  for (let k in params) {
    query.push(k + '=' + params[k])
  }
  let qs = query.join('&')
  if (method.toLowerCase() === 'get' && query.length > 0) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + qs
  }
  if (type === 'payload' && method !== 'get') {
    qs = params
  }
  return new Promise((resolve, reject) => {
    axios({
      headers,
      method: method,
      url: url,
      data: qs
    }).then(function (response) {
      if (response.status >= 200 && response.status < 400) {
        if (response.data.code === 1000) { // 未登录
          router.push('/login?redirect=' + window.location.href)
          reject(new Error('invalid token'))
          return
        }
        if (response.data.code === 1002) { // 无权限
          this.$message.error('你没有权限进行此操作，如需开权限，请联系管理员', '没有权限')
          reject(new Error('无权限'))
          return
        }
        resolve(response.data)
      } else {
        this.$message.info(response.statusText, response.status)
      }
    }).catch(function (err) {
      reject(err)
    })
  })
}

// 历史原因，type默认为payload，就是在请求体里传json，如果参数传入formData，则使用formData传
function fetch (url = '', params = {}, method = 'get', type = 'payload', headers = {}) {
  return request({ url, params, method, type, headers })
}

export {
  fetch as default,
  request
}