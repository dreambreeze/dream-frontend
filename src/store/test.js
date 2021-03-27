import cssVars from 'css-vars-ponyfill'

export default {
  state: { theme: { primary: 'green', danger: '#a19a9a', }, },
  mutations: {
    setTheme(state, data) {
      const variables = {}
      Object.assign(state.theme, data)
      Object.keys(state.theme).forEach((key) => { variables[`--${ key }`] = state.theme[key] })
      cssVars({ variables })
    }
  },
  actions: { changeTheme({ commit }, theme = {}) { commit('setTheme', theme) } }
}

