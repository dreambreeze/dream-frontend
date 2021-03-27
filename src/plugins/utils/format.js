import _ from 'lodash'
import * as transfer from './transfer'
import * as is from './is'

/**
 * Except String, Number, any other type is invalid.
 * If options.emptyStringToInvalid is true, the empty string to invalid string.
 *
 * @param {*} mix
 * @param {Object} options
 * @param {String} options.invalid
 * @param {Boolean} options.emptyStringToInvalid
 * @param {Array} options.include If mix in the include array, the mix is invalid.
 * @returns {String}
 */
export function text(
  mix,
  { invalid = '-', emptyStringToInvalid = true, include = [] } = {}
) {
  if (_.isNumber(mix) && _.isFinite(mix)) {
    mix = String(mix)
  }

  if (_.isArray(include) && include.includes(mix)) {
    mix = invalid
  } else if (emptyStringToInvalid && is.isEmptyString(mix)) {
    mix = invalid
  } else if (!_.isString(mix)) {
    mix = invalid
  }

  return mix
}

/**
 * @param {*} mix
 * @param {String} options.format
 * @param {String} options.invalid
 * @param {String} options.append e.g. CT => 07/01/2020 CT
 * @param {String} options.timezone
 * @param {Boolean} options.zeroInvalid
 */
export function datetime(
  mix,
  {
    format = 'MM/DD/YYYY HH:mm',
    invalid = '-',
    timezone = null,
    append = '',
    zeroInvalid = true,
  } = {}
) {
  if (zeroInvalid && /^0$/.test(mix)) {
    return invalid
  }

  const m = transfer.toMoment(mix, { timezone })
  if (!m.isValid()) {
    return invalid
  }

  if (append) {
    format += ' \\' + append.split('').join('\\')
  }
  return m.format(format)
}

/**
 * @param {*} mix
 * @param {String} options.format
 * @param {String} options.invalid
 * @param {String} options.append
 * @param {String} options.timezone
 * @param {Boolean} options.zeroInvalid
 */
export function date(
  mix,
  {
    format = 'L',
    invalid = '-',
    timezone = null,
    append = '',
    zeroInvalid = true,
  } = {}
) {
  return datetime(mix, { format, invalid, append, timezone, zeroInvalid })
}

/**
 * @param {*} mix
 * @param {String} options.format
 * @param {String} options.invalid
 * @param {String} options.append
 * @param {String} options.timezone
 * @param {Boolean} options.zeroInvalid
 */
export function time(
  mix,
  {
    format = 'LT',
    invalid = '-',
    timezone = null,
    append = '',
    zeroInvalid = true,
  } = {}
) {
  return datetime(mix, { format, invalid, append, timezone, zeroInvalid })
}

/**
 * @param {*} mix
 * @param {String} options.format
 * @param {String} options.invalid
 * @param {String} options.append
 * @param {Boolean} options.zeroInvalid
 */
export function datetimeChicago(
  mix,
  {
    format = 'MM/DD/YYYY HH:mm',
    invalid = '-',
    append = 'CT',
    zeroInvalid = true,
  } = {}
) {
  return datetime(mix, {
    format,
    invalid,
    append,
    zeroInvalid,
    timezone: 'America/Chicago',
  })
}

/**
 * @param {*} mix
 * @param {String} options.format
 * @param {String} options.invalid
 * @param {String} options.append
 * @param {Boolean} options.zeroInvalid
 */
export function dateChicago(
  mix,
  { format = 'L', invalid = '-', append = 'CT', zeroInvalid = true } = {}
) {
  return datetime(mix, {
    format,
    invalid,
    append,
    zeroInvalid,
    timezone: 'America/Chicago',
  })
}

/**
 * @param {*} mix
 * @param {String} options.format
 * @param {String} options.invalid
 * @param {String} options.append
 * @param {Boolean} options.zeroInvalid
 */
export function timeChicago(
  mix,
  { format = 'LT', invalid = '-', append = 'CT', zeroInvalid = true }
) {
  return datetime(mix, {
    format,
    invalid,
    append,
    zeroInvalid,
    timezone: 'America/Chicago',
  })
}

/**
 * @param {*} mix
 * @param {Object} options
 * @param {String} options.format See http://numeraljs.com/#format
 * @param {String} options.invalid
 * @param {Function} options.roundMethod e.g Math.round
 */
export function number(
  mix,
  { format = '0,0.00', invalid = '-', roundMethod = null } = {}
) {
  const res = transfer.toNumeral(mix, { invalid: null })

  return res.value() === null ? invalid : res.format(format, roundMethod)
}

/**
 *  This method is rounding. 1.225 => 1.23
 *
 * @param {*} mix
 * @param {Object} options
 * @param {String} options.format See http://numeraljs.com/#format
 * @param {String} options.invalid
 * @returns {String}
 */
export function currency(mix, { format = '$0,0.00', invalid = '-' } = {}) {
  return number(mix, { format, invalid })
}

/**
 * This method is not rounding. 1.225 => 1.22
 *
 * @see currency
 */
export function availableCredit(
  mix,
  { format = '$0,0.00', invalid = '-' } = {}
) {
  return number(mix, { format, invalid, roundMethod: Math.floor })
}

/**
 * @param {*} mix
 * @param {Object} options
 * @param {String} options.format See http://numeraljs.com/#format
 * @param {String} options.append
 * @param {String} options.invalid
 */
export function rate(
  mix,
  { format = '0.00000', append = '%', invalid = '-' } = {}
) {
  const res = number(mix, { format, invalid })

  if (res === invalid) {
    return res
  }

  return `${res}${append}`
}

/**
 * @param {*} mix
 * @param {Object} options
 * @param {String} options.format See http://numeraljs.com/#format
 * @param {String} options.append
 * @param {String} options.invalid
 * @param {Number} options.magnification
 */
export function percentage(
  mix,
  { format = '0.00', append = '%', invalid = '-', magnification = 1 } = {}
) {
  const res = transfer.toNumeral(mix, { invalid: null })
  let value = res.value()

  if (value === null) {
    return invalid
  }

  value = res.multiply(magnification).format(format)
  return `${value}${append}`
}

/**
 * @param {*} mix
 * @param {Object} options
 * @param {String} options.invalid
 */
export function zipcode(mix, { invalid = '-' } = {}) {
  if (is.isEmpty(mix)) {
    return invalid
  }

  mix = String(mix).replace(/[^\d]/g, '')

  if (mix.length < 5) {
    return invalid
  }

  if (mix.length === 5) {
    return mix
  }

  mix = mix.padEnd(9, '0')
  return mix.substring(0, 5) + '-' + mix.substring(mix.length - 4)
}

/**
 * Mask string. e.g (123456789 => *****6789)
 *
 * @param {*} mix
 * @param {Object} options
 * @param {String} options.invalid
 * @param {String} options.placeholder
 * @param {Number} options.length Reserved string. positive number, padding end (123456789 => 1234*****);
 *                                negative number, padding start (123456789 => *****6789).
 */
export function mask(
  mix,
  { invalid = '-', placeholder = '*', length = -4 } = {}
) {
  if (!_.isString(mix) && !_.isNumber(mix)) {
    return invalid
  }

  mix = String(mix)
  const l = mix.length
  if (l <= Math.abs(length) || length === 0) {
    return mix
  }

  if (length > 0) {
    mix = mix.substring(0, length).padEnd(l, placeholder)
  } else {
    mix = mix.substring(l + length).padStart(l, placeholder)
  }

  return mix
}

/**
 * This has some different from _.startCase(). __FOO_BAR__ => 'Foo Bar'
 *
 * @see _.startCase()
 * @param {*} mix
 * @param {Object} options
 * @param {String} options.invalid
 */
export function startCase(mix, { invalid = '-' } = {}) {
  mix = text(mix, { invalid })
  if (mix === invalid) {
    return invalid
  }

  if (/[-_]/.test(mix)) {
    mix = mix.toLowerCase()
  }

  return _.startCase(String(mix))
}

/**
 * @param {*} mix
 * @param {Object} options
 * @param {String} options.invalid
 */
export function capitalize(mix, { invalid = '-' } = {}) {
  if (!_.isString(mix) || is.isEmptyString(mix)) {
    return invalid
  }

  return _.capitalize(mix)
}
