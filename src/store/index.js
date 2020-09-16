import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showSideBar: false,
    locale: localStorage.getItem('locale') || 'cn',
  },
  getters: {},
  mutations: {
    setShowSideBar(state, data) {
      state.showSideBar = data
    },
    setLocale(state, data) {
      localStorage.setItem('locale', data)
      state.locale = data
    },
  },
  actions: {}
})
