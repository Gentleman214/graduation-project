import fetch from './fetch'

export default {
  getProductByIdOrName (keywords) { // 根据商品id或商品名搜索商品信息
    return fetch(`/api/product/keywords/${keywords}`)
  },
  addEnterBill (params) { // 商品入库（新增入库单）
    return fetch('/api/product/bill/add', params, 'post')
  },
  getBillList (params) { // 获取入库单
    return fetch('/api/product/bill/list', params, 'post')
  }
}
