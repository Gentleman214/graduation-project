import layout from '../layout/layout.vue'

function load (component) {
  return () => import(`../pages/${component}.vue`)
}
export default {
  path: '/',
  component: layout,
  meta: { requireAuth: true },
  children: [
    { path: 'enter', component: load('enter/enter'), meta: { title: '商品入库', requireAuth: true } },
    { path: 'enterBill', component: load('enter/enter-bill'), meta: { title: '入库单查询', requireAuth: true } }
  ]
}