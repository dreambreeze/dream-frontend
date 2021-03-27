import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const root = Vuex.__ROOT__ || {}

export default new Vuex.Store({
  state: {
    ...(root.state || {}),
    ...state(),
  },
  getters: {
    ...(root.getters || {}),
    ...getters,
  },
  mutations: {
    ...(root.mutations || {}),
    ...mutations,
  },
  actions: {
    ...(root.actions || {}),
    ...actions,
  },
})
