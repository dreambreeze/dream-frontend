import Vue from 'vue'
import Vuex from 'vuex'
import {getLocaleStorage, getUserInfoStorage, setLocaleStorage, setUserInfoStorage} from '../utils/storage'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showSideBar: false,
    locale: getLocaleStorage() || 'cn',
    userInfo: getUserInfoStorage() || {},
  },
  getters: {},
  mutations: {
    setShowSideBar(state, data) {
      state.showSideBar = data
    },
    setLocale(state, data) {
      setLocaleStorage(data)
      state.locale = data
    },
    setUserInfo(state, data) {
      setUserInfoStorage(data)
      state.userInfo = data
    },
  },
  actions: {}
})
