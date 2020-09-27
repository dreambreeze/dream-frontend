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
import api from "@/utils/api";
import {sortEnum} from "@/utils/enum";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hasLogin: getHasLoginStorage() || false,
    showSideBar: false,
    showLoginModal: false,
    locale: getLocaleStorage() || 'cn',
    userInfo: getUserInfoStorage() || null,
    sortList: [],
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
    setSortList(state, data) {
      state.sortList = data
    },
  },
  actions: {
    async getSortList(context) {
      let res = await api.getSortList({type: sortEnum.article})
      context.commit('setSortList', res)
    },
  },
})


export default store
