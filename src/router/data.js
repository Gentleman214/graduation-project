import layout from '../layout/layout.vue'

function load (component) {
  return () => import(`../pages/${component}.vue`)
}
export default {
  path: '/',
  component: layout,
  meta: { requireAuth: true },
  children: [
    { path: 'storehouse', component: load('data/storehouse'), meta: { title: '仓库信息', requireAuth: true } },
    { path: 'supplier', component: load('data/supplier'), meta: { title: '供应商信息', requireAuth: true } },
    { path: 'supplier/:mode/:id', component: load('data/addoredit-supplier'), meta: { title: '编辑供应商', requireAuth: true } },
    { path: 'product', component: load('data/product'), meta: { title: '商品列表', requireAuth: true } },
    { path: 'product/:mode/:id', component: load('data/addoredit-product'), meta: { title: '编辑商品', requireAuth: true } }
  ]
}