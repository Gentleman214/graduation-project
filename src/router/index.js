import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import routes from './routes'
import cookie from 'js-cookie'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth === undefined)) {
    next()
  } else {
    if (cookie.get('token')) {
      next()
    } else if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
        replace: true
      })
    }
  }
  if (to.matched.some(r => r.meta.title)) {
    document.title = to.meta.title
    next()
  }
})
export default router