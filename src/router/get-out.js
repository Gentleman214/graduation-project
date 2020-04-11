import layout from '../layout/layout.vue'

function load (component) {
  return () => import(`../pages/${component}.vue`)
}
export default {
  path: '/',
  component: layout,
  meta: { requireAuth: true },
  children: [
    { path: 'getOut', component: load('get-out/index'), meta: { title: '出库管理', requireAuth: true } }
  ]
}