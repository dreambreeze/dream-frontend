import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import i18n from './lang/i18n'
import '@/utils/axios.js'
import library from './components/library'

Vue.use(VueRouter)
Vue.use(library)
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
