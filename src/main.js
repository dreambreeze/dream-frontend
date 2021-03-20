import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import i18n from './lang/i18n'
import library from './components/library'
import Antd from 'ant-design-vue';
import mavonEditor from 'mavon-editor'
import utils from './utils/utils'
import lodash from 'lodash'

import '@/utils/axios.js'
import 'mavon-editor/dist/css/index.css'
import './assets/style/iconfont/iconfont.css'

import 'ant-design-vue/dist/antd.less'; // 引入官方提供的 less 样式入口文件
import './assets/style/ant-theme-file.less'; // 用于覆盖上面定义的变量

Vue.use(VueRouter)
Vue.use(library)
Vue.use(Antd)
Vue.use(mavonEditor)

Vue.prototype.$openLogin = () => {
  store.commit('setShowLoginModal', true)
  store.commit('setHasLogin', false)
  store.commit('setUserInfo', null)
}
Vue.prototype.$utils = utils
Vue.prototype.$lodash = lodash


Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
