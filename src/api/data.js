import fetch from './fetch'

export default {
  // 供应商
  getSupplierList (params) {
    return fetch('/api/supplier/list', params, 'post')
  },
  getSupplierListForScreening () { // 获取供应商列表（仅名字和id）
    return fetch('/api/supplier/simpleList', {}, 'post')
  },
  getSupplierInfoById (id) {
    return fetch(`/api/supplier/${id}`)
  },
  addOrUpdateSupplier (params) {
    return fetch('/api/supplier/addOrUpdate', params, 'post')
  },
  deleteSupplierById (id) {
    return fetch('/api/supplier/delete', { id }, 'post')
  },

  // 商品
  getProdutList (params) { // 分页查询商品列表
    return fetch('/api/product/list', params, 'post')
  },
  getProductCategoryList () { // 获取商品分类级联选择列表
    return fetch('/api/pruduct/category')
  },
  getProductInfoById (id) { // 获取商品信息，by id
    return fetch(`/api/product/${id}`)
  },
  addOrUpdateProduct (params) { // 新增或编辑商品信息
    return fetch('/api/product/addOrUpdate', params, 'post')
  }
}
