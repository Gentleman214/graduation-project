import fetch from './fetch'

export default {
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
  }
}
