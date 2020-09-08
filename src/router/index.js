import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: "home" */ '../views/home/home.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () =>
        import(/* webpackChunkName: "blog" */ '../views/blog/blog.vue'),
    },
    {
      path: '/code',
      name: 'code',
      component: () =>
        import(/* webpackChunkName: "code" */ '../views/code/code.vue'),
    },
    {
      path: '/link',
      name: 'link',
      component: () =>
        import(/* webpackChunkName: "link" */ '../views/link/link.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/about/about.vue'),
    },
  ],
  mode: 'history',
})
