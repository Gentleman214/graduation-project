import layout from '../layout/layout.vue'

function load (component) {
  return () => import(`../pages/${component}.vue`)
}
export default {
  path: '/',
  component: layout,
  meta: { requireAuth: true },
  children: [
    { path: 'stockCheck', component: load('depository/stock-check'), meta: { title: '库存盘点', requireAuth: true } }
  ]
}