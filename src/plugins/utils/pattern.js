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
  return ['YYYY/MM/DD', 'MM/DD/YYYY', moment.ISO_8601]
}
