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
      path: '/blogs',
      name: 'blogs',
      component: () =>
        import(/* webpackChunkName: "blog" */ '../views/blog/blogs.vue'),
      children: [
        {
          path: '/blogs/:blogId',
          name: 'blogDetail',
          component: () =>
            import(
              /* webpackChunkName: "blog" */ '../views/blog/blog-detail/blog-detail.vue'
            ),
        },
      ],
    },
    {
      path: '/codes',
      name: 'codes',
      component: () =>
        import(/* webpackChunkName: "code" */ '../views/code/codes.vue'),
    },
    {
      path: '/links',
      name: 'links',
      component: () =>
        import(/* webpackChunkName: "link" */ '../views/link/links.vue'),
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
