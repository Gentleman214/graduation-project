import layout from '../layout/layout.vue'

function load (component) {
  return () => import(`../pages/${component}.vue`)
}
export default {
  path: '/',
  component: layout,
  children: [
    { path: 'storehouse', component: load('data/storehouse'), meta: { title: '仓库信息' } },
    { path: 'supplier', component: load('data/supplier'), meta: { title: '供应商信息' } },
    { path: 'supplier/:mode/:id', component: load('data/addoredit-supplier'), meta: { title: '编辑供应商' } },
    { path: 'product', component: load('data/product'), meta: { title: '商品列表' } }
  ]
}