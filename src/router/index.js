import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import progress from '@/plugins/progress'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  routes: [
    ...routes
  ],
})

router.beforeEach((to, from, next) => {
  progress.start()
  next()
})

const convertedPages = new Set()
router.afterEach((to) => {
  progress.done()
  if (convertedPages.has(to.path)) return
  convertedPages.add(to.path)
  store.dispatch('changeThemeConfig')
})


export default router
