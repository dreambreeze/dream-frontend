/* global globalThis */
import 'core-js'
import 'regenerator-runtime/runtime'
import Vue from 'vue'

const uri = new URL(window.location.href)
const debug =
  uri.searchParams.get('debug') ===
  'msHMa2IkIjCLr3BdxwCDXh2TtkJ2Ll8kqUXhwpzRWtMc'

Vue.config.devtools = process.env.NODE_ENV === 'development' || debug
Vue.prototype.$debug = debug

// Export Vue to global, because when build library from vue-cli, 
// it's always inject root['Vue'] if imported Vue in library code.
// @todo Check why?
globalThis.Vue = Vue

export default Vue
