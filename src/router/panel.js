import layout from '../layout/layout.vue'

function load (component) {
  return () => import(`../pages/${component}.vue`)
}
export default {
  path: '/',
  component: layout,
  meta: { requireAuth: true },
  children: [
    { path: '', component: load('panel/index'), meta: { title: '仓储系统管理后台', requireAuth: true } }
  ]
}