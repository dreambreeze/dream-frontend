import _ from 'lodash'
import moment from 'moment'
import * as pattern from './pattern'

/**
 * @returns {Boolean}
 */
export function isDevelopment() {
  return process.env.NODE_ENV === 'development'
}

/**
 * @param {*} mix
 * @returns {Boolean}
 */
export function isValidDate(mix) {
  return moment(mix, pattern.validDateFormat(), true).isValid()
}

/**
 * null, undefined, false, '', '  ', 0, NaN, Infinity, [], {} all empty.
 *
 * @param {any} mix
 * @param {object} options
 * @param {string[]} options.include
 */
export function isEmpty(mix, {include = []} = {}) {
  // null
  if (_.isNull(mix)) {
    return true
  }
  // undefined
  if (_.isUndefined(mix)) {
    return true
  }
  // false
  if (_.isBoolean(mix) && mix === false) {
    return true
  }
  // empty string or only whitespace string. '' or '    '
  if (_.isString(mix) && mix.trim().length < 1) {
    return true
  }
  // NaN
  if (_.isNaN(mix)) {
    return true
  }
  // 0
  if (_.isNumber(mix) && mix === 0) {
    return true
  }
  // Infinity
  if (_.isNumber(mix) && !_.isFinite(mix)) {
    return true
  }
  // []
  if (_.isArray(mix) && mix.length < 1) {
    return true
  }
  // arguments.length < 1
  if (_.isArguments(mix) && mix.length < 1) {
    return true
  }
  // see https://lodash.com/docs/4.17.15#isEmpty
  // {}, empty object, collection, map, or set.
  if (_.isObject(mix) && _.isEmpty(mix)) {
    return true
  }
  if (_.isArray(include) && include.includes(mix)) {
    return true
  }

  return false
}

/**
 * @param {*} mix
 * @param {Array} options.include
 */
export function isEmptyString(mix, {include = []} = {}) {
  if (!_.isString(mix)) {
    return false
  }
  if (mix.trim().length < 1) {
    return true
  }
  if (_.isArray(include) && include.includes(mix)) {
    return true
  }

  return false
}
