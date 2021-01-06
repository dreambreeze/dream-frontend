import _ from 'lodash'
import numeral from 'numeral'
import moment from 'moment'
import 'moment-timezone'
import 'moment-business-days'
import BigNumber from 'bignumber.js'
import * as is from './is'
import * as pattern from './pattern'

/**
 * @param {*} mix
 * @param {Object} options
 * @param {String} options.invalid
 */
export function toString(mix, {invalid = ''} = {}) {
  if (_.isNumber(mix)) {
    mix = String(mix)
  } else if (!_.isString(mix)) {
    mix = invalid
  }

  return mix
}

/**
 * Convert date to YYYY-MM-DD, for post data.
 *
 * @param {*} mix
 * @param {Object} options
 * @param {String} options.format
 * @return {String} 2020-04-01
 */
export function toDate(mix, {format = 'YYYY-MM-DD', invalid = ''} = {}) {
  if (is.isEmpty(mix)) {
    return invalid
  }

  const m = moment(mix, pattern.validDateFormat(), true)
  if (!m.isValid()) {
    return invalid
  }

  return m.format(format)
}

/**
 * Convert number like value to numeral.
 *
 * @param {*} mix
 * @param {Object} options
 * @param {Number} options.invalid
 */
export function toNumeral(mix, {invalid = 0} = {}) {
  if (_.isNumber(mix) && _.isFinite(mix)) {
    return numeral(mix)
  }

  if (_.isString(mix)) {
    mix = numeral(mix)
    if (_.isNumber(mix.value())) {
      return mix
    }
  }

  return numeral(invalid)
}

/**
 * @param {*} mix
 * @param {Object} options
 * @returns {Number}
 */
export function toNumber(mix, {invalid = 0} = {}) {
  mix = toNumeral(mix, {invalid: null}).value()

  return mix === null ? invalid : mix
}

/**
 * @param {*} mix
 * @param {Object} options
 * @returns {BigNumber}
 */
export function toBigNumber(mix, {invalid = 0} = {}) {
  mix = toNumber(mix, {invalid})

  return BigNumber(mix)
}

/**
 * Convert currency format string to valid number. e.g. $1,223.00123 to 1223.00
 *
 * @param {*} mix
 * @param {string} options.format
 * @param {string} options.invalid
 */
export function toCurrency(mix, {format = '0.00', invalid = 0} = {}) {
  mix = toNumeral(mix, {invalid})

  return mix.format(format)
}

/**
 * @param {*} mix
 * @param {*} options.timezone
 */
export function toMoment(mix, {timezone = null} = {}) {
  let m
  if (timezone) {
    m = moment.tz(mix, pattern.validDateFormat(), true, timezone)
    if (!m.isValid() && pattern.unsignedInteger().test(mix)) {
      m = moment.tz(new Date(Number(mix)), timezone)
    }
  } else {
    m = moment(mix, pattern.validDateFormat(), true)
    if (!m.isValid() && pattern.unsignedInteger().test(mix)) {
      m = moment(new Date(Number(mix)))
    }
  }

  return m
}
