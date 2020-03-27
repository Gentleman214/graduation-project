import layout from '../layout/layout.vue'

function load (component) {
  return () => import(`../pages/${component}.vue`)
}
export default {
  path: '/',
  component: layout,
  children: [
    { path: 'menu', component: load('setting/menu'), meta: { title: '菜单管理' } }
  ]
}
