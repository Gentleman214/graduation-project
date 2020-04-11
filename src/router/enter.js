import layout from '../layout/layout.vue'

function load (component) {
  return () => import(`../pages/${component}.vue`)
}
export default {
  path: '/',
  component: layout,
  meta: { requireAuth: true },
  children: [
    { path: 'enter', component: load('enter/index'), meta: { title: '入库管理', requireAuth: true } }
  ]
}