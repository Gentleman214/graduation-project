import fetch from './fetch'

export default {
  salesVolumeStatistics (type) { // 库存盘点
    return fetch(`/api/product/bill/salesVolumeStatistics/${type}`)
  }
}
