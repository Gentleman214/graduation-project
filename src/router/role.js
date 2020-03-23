import layout from '../layout/layout.vue'

function load (component) {
  return () => import(`../pages/${component}.vue`)
}
export default {
  path: '/',
  component: layout,
  children: [
    { path: 'user', component: load('role/user'), meta: { title: '用户管理' } },
    { path: 'authority', component: load('role/user'), meta: { title: '权限管理' } }
  ]
}