import layout from '../layout/layout.vue'

function load (component) {
  return () => import(`../pages/${component}.vue`)
}
export default {
  path: '/',
  component: layout,
  meta: { requireAuth: true },
  children: [
    { path: 'getOut', component: load('get-out/get-out'), meta: { title: '商品出库', requireAuth: true } },
    { path: 'getOutBill', component: load('get-out/get-out-bill'), meta: { title: '出库单查询', requireAuth: true } }
  ]
}