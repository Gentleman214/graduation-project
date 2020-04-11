import layout from '../layout/layout.vue'

function load (component) {
  return () => import(`../pages/${component}.vue`)
}
export default {
  path: '/',
  component: layout,
  meta: { requireAuth: true },
  children: [
    { path: 'statistics', component: load('statistics/index'), meta: { title: '统计报表',  requireAuth: true } }
  ]
}