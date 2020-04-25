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
  },
  exportEnterBill (params) { // 导出入库单
    // return fetch('/api/product/bill/exportExcel', params)
    let offset = (params.current - 1) * params.size || 0
    let limit = params.size || 10
    let type = params.type
    let product = params.product || ''
    let operator = params.operator || ''
    let startTime = params.startTime || '1950-01-01 00:00:00'
    let endTime = params.endTime || '2030-12-31 23:59:59'
    return `/api/product/bill/exportExcel?offset=${offset}&limit=${limit}&type=${type}&product=${product}&operator=${operator}&startTime=${startTime}&endTime=${endTime}`
  }
}
