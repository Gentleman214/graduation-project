import fetch from './fetch'

export default {
  // 供应商
  getSupplierList (params) {
    return fetch('/api/supplier/list', params, 'post')
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
  getProductCategoryList () {
    return fetch('/api/pruduct/category')
  }
}
