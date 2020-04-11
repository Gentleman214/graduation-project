import layout from '../layout/layout.vue'

function load (component) {
  return () => import(`../pages/${component}.vue`)
}
export default {
  path: '/',
  component: layout,
  children: [
    { path: 'depository', component: load('depository/index'), meta: { title: '库内管理', requireAuth: true } }
  ]
}