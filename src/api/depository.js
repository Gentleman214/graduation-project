import fetch from './fetch'

export default {
  checkStock (params) { // 库存盘点
    return fetch('/api/product/checkStock', params, 'post')
  }
}
