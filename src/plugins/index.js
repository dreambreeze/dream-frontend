import Vue from 'vue'
import _ from 'lodash'
import utils from './utils'
import progress from './progress'
import http from './http'
import store from './store'
import router from './router'
import i18n from './i18n'
import * as mask from './rule/mask'
import * as validator from './rule/validator'
import './clipboard'

const isDevelopment = process.env.NODE_ENV === 'development'

Vue.prototype.$dev = isDevelopment
Vue.prototype.$lodash = _
Vue.prototype.$http = http
Vue.prototype.$progress = progress
Vue.prototype.$utils = utils
Vue.prototype.$mask = mask
Vue.prototype.$validator = validator
Vue.config.productionTip = false

/**
 * Example:
 *
 * this.hasAuthed('proposal.generic')
 * this.hasAuthed('proposal.generic', 1)
 *
 * @param {String} permissionCode
 * @param {Number} permissionValue 1 block 2 read 3 write default 3
 */
Vue.prototype.hasAuthed = utils.createHasAuthed(store)
/**
 * Example:
 *
 * this.$ts('active')
 * this.$ts('active', {}, { channel: 'Orion' })
 *
 * @param {String} message
 * @param {Object} params
 * @param {Object} options
 * @param {String} options.channel
 */
Vue.prototype.$t = utils.createTs(router, store, i18n)

// Add filters
Object.entries(utils.format).forEach(([k, f]) => {
  if ( !_.isFunction(f)) {
    return
  }

  Vue.filter('format' + _.upperFirst(k), f)
})

export { Vue, store, router, i18n }
