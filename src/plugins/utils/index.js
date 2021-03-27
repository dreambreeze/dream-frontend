import _ from 'lodash'
import cookie from 'js-cookie'
import sanitizeHtml from 'sanitize-html'
import sanitizeConfig from './sanitize'
import { FilterSidebar } from './FilterSidebar'
import storage from './storage'
import * as is from './is'
import * as domain from './domain'
import * as transfer from './transfer'
import * as format from './format'

const table = Object.entries(format).reduce((table, [k, f]) => {
  if (_.isFunction(f)) {
    table['format' + _.upperFirst(k)] = (options = {}) => (mix) =>
      f(mix, options)
  }

  return table
}, {})

/**
 * cookie methods, see https://github.com/js-cookie/js-cookie
 *
 * @method isDevelopment()
 * @method isValidDate(mix)
 * @method isEmpty(mix)
 * @method isEmptyString(mix)
 * @method setSessionStorage(key, value)
 * @method getSessionStorage(key, defaultValue = null)
 * @method removeSessionStorage(keys)
 * @method clearSessionStorage(keepKeys = [])
 * @method setLocalStorage(key, value)
 * @method getLocalStorage(key, defaultValue = null)
 * @method removeLocalStorage(keys)
 * @method clearLocalStorage(keepKeys = [])
 * @method sanitizeHtml(content, config = null)
 */
export default {
  ...is,
  ...storage,
  ...domain,
  FilterSidebar,
  cookie,
  transfer,
  format,
  table,
  rule: {},
  mask: {},
  sanitizeHtml(content, config = null) {
    return sanitizeHtml(content, config || sanitizeConfig)
  },
}
