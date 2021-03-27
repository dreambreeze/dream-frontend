import Vue from 'vue'
import Vuex from 'vuex'
import {
  getHasLoginStorage,
  getLocaleStorage,
  getUserInfoStorage,
  setHasLoginStorage,
  setLocaleStorage,
  setUserInfoStorage
} from '../utils/storage'
import api from "@/utils/api";
import { sortEnum } from "@/utils/enum";
import _ from 'lodash'
import cssVars from "css-vars-ponyfill";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hasLogin: getHasLoginStorage() || false,
    showSideBar: false,
    defaultAvatar: require(`@/assets/images/avatar.jpeg`),
    logoUrl: require('@/assets/images/dreambreeze.png'),
    randomSkyImg: require(`@/assets/images/sky${ _.random(1, 12) }.jpg`),
    showLoginModal: false,
    locale: getLocaleStorage() || 'cn',
    userInfo: getUserInfoStorage() || {},
    sortList: [],
    themeConfig: {
      primary: '#004CFF',
      secondary: '#44668c',
      success: '#008040',
      danger: '#c82334',
      warning: '#ffb300',
      info: '#2A7AB0',
    },
  },
  getters: {},
  mutations: {
    setThemeConfig(state, data) {
      const variables = {}
      Object.assign(state.themeConfig, data)
      Object.keys(state.themeConfig).forEach((key) => {
        variables[`--${ key }`] = state.themeConfig[key]
      })
      cssVars({
        variables
      })
    },
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
    changeThemeConfig({ commit }, themeConfig = {}) {
      commit('setThemeConfig', themeConfig)
    },
    async getSortList(context) {
      let res = await api.getSortList({ type: sortEnum.article })
      context.commit('setSortList', res)
    },
  },
})


export default store
