import layout from '../layout/layout.vue'

function load (component) {
  return () => import(`../pages/${component}.vue`)
}
export default {
  path: '/',
  component: layout,
  children: [
    { path: 'data', component: load('data/index'), meta: { title: '数据录入' } }
  ]
}