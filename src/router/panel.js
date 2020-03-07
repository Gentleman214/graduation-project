import layout from '../layout/layout.vue'

function load (component) {
  return () => import(`../pages/${component}.vue`)
}
export default {
  path: '/',
  component: layout,
  children: [
    { path: '/', component: load('panel/index'), meta: { title: '控制面板' } }
  ]
}