import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: "home" */ '../views/home/home.vue')
    },
    {
      path: '/article',
      name: 'article',
      component: () =>
        import(/* webpackChunkName: "home" */ '../views/article/article.vue'),
      children: [
        {
          path: '/article',
          name: 'articleList',
          component: () =>
            import(
              /* webpackChunkName: "article" */ '../views/article/article-list/article-list'
              )
        },
        {
          path: '/article/article-editor',
          name: 'articleEditor',
          component: () =>
            import(
              /* webpackChunkName: "article" */ '../views/article/article-editor/article-editor'
              )
        },
        {
          path: '/article/:articleId',
          name: 'articleDetail',
          component: () =>
            import(
              /* webpackChunkName: "article" */ '../views/article/article-detail/article-detail'
              )
        }
      ]
    },
    {
      path: '/codes',
      name: 'codes',
      component: () =>
        import(/* webpackChunkName: "code" */ '../views/code/codes.vue')
    },
    {
      path: '/links',
      name: 'links',
      component: () =>
        import(/* webpackChunkName: "link" */ '../views/link/links.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/about/about.vue')
    }
  ],
  mode: 'history'
})
