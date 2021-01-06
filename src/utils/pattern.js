import moment from 'moment'

/**
 * @returns {RegExp}
 */
export function unsignedInteger() {
  return /^[1-9]\d{0,15}$/
}

/**
 * @returns {RegExp}
 */
export function number() {
  return /^-?(\d+\.?\d*)$|(\d*\.?\d+)$/
}

/**
 * @returns {Array}
 */
export function validDateFormat() {
  return ['YYYY/MM/DD', 'YYYY/MM/DD', moment.ISO_8601]
}