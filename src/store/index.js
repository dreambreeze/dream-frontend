import Vue from 'vue'
import Vuex from 'vuex'
import {
  getDepartmentStorage,
  getHasLoginStorage,
  getLocaleStorage,
  getUserInfoStorage,
  setDepartmentStorage,
  setHasLoginStorage,
  setLocaleStorage,
  setUserInfoStorage
} from '../utils/storage'
import api from "@/utils/api";
import {sortEnum} from "@/utils/enum";
import _ from 'lodash'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hasLogin: getHasLoginStorage() || false,
    showSideBar: false,
    showLoginModal: false,
    locale: getLocaleStorage() || 'cn',
    userInfo: getUserInfoStorage() || {},
    sortList: [],
    departments: getDepartmentStorage() || [],
  },
  getters: {
    departmentList(state) {
      let departmentList = state.departments.map(parent => {
        if (_.isEmpty(parent.parent)) {
          parent.childrens = state.departments.filter(item => item.parent === parent.number)
          return parent
        }
      })
      return departmentList.filter(item => !_.isEmpty(item))
    },
    departmentParentList(state) {
      return state.departments.filter(item => _.isEmpty(item.parent))
    }
  },
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
    saveDepartment(state, data) {
      const index = state.departments.findIndex(item => item.number === data.number)
      if (index === -1) {
        state.departments.push(data)
      } else {
        state.departments[index] = data
      }
      setDepartmentStorage(state.departments)
    },
    setDepartments(state, data) {
      state.departments = data
      setDepartmentStorage(data)
    },
    deleteDepartments(state, data) {
      state.departments = state.departments.slice(data, 1)
      setDepartmentStorage(state.departments)
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
