import Vue from 'vue'
import Vuex from 'vuex'
import {
  getHasLoginStorage,
  getLocaleStorage,
  getUserInfoStorage,
  setHasLoginStorage,
  setLocaleStorage,
  setUserInfoStorage,
} from '../utils/storage'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hasLogin: getHasLoginStorage() || false,
    showSideBar: false,
    showLoginModal: false,
    locale: getLocaleStorage() || 'cn',
    userInfo: getUserInfoStorage() || null,
  },
  getters: {},
  mutations: {
    setHasLogin(state, data) {
      setHasLoginStorage(data)
      state.hasLogin = data
    },
    setShowSideBar(state, data) {
      state.showSideBar = data
    },
    setShowLoginModal(state, data = true) {
      state.showLoginModal = data
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
  actions: {},
})


export default store
