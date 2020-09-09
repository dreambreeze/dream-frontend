import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showSideBar: false
  },
  getters: {},
  mutations: {
    setShowSideBar (state, data) {
      state.showSideBar = data
    }
  },
  actions: {}
})
