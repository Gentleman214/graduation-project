import layout from '../layout/layout.vue'

function load (component) {
  return () => import(`../pages/${component}.vue`)
}
export default {
  path: '/',
  component: layout,
  meta: { requireAuth: true },
  children: [
    { path: 'user', component: load('role/user'), meta: { title: '用户管理' } },
    { path: 'authority', component: load('role/authority'), meta: { title: '权限管理', requireAuth: true } },
    { path: 'userInfo/:mode/:id', component: load('user-info'), meta: { title: '用户信息', requireAuth: true } },
  ]
}
