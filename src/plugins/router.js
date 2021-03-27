import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '../views/errors/404.vue'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'

Vue.use(Router)

let devRoutes
if (process.env.NODE_ENV === 'development') {
  devRoutes = [
    {
      path: '/auth/login',
      name: 'login',
      component: Login,
    },
  ]
} else {
  devRoutes = []
}

export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  routes: [
    ...devRoutes,
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '*',
      name: 'default',
      component: NotFound,
    },
  ],
})
