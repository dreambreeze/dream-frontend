import timeZone from '../../node_modules/moment-timezone/moment-timezone.js'
import numeral from 'numeral'

/**
 * Formatted number
 * @param {Number} value Number to be formatted
 * @param {String} formatTemp Formatted content template
 */
function formatNumber (value,formatTemp = '0,0.00') {
  if (value === undefined || value === null) return '-'
  value = value === null ? 0 : value
  if (value < 0) {
    value = value * - 1
    return /^[0-9]+.?[0-9]*$/.test(value)
      ? '-' + numeral(value).format(formatTemp)
      : value
  }
  return /^[0-9]+.?[0-9]*$/.test(value)
    ? numeral(value).format(formatTemp)
    : value
}

/**
 * Formatted nullDate
 * @param value is null or '' or undefined to be '-'
 */
function nullToDash (value) {
  return (value === undefined || value === null || value === '') ? '-' : value
}

/**
 * Formatted Date
 * @param {Number} value Number to be formatted
 * @param {String} formatTemp Formatted content template
 */
function formatDate (value,formatTemp = 'en-US',fmtOptions = { year: 'numeric',month: '2-digit',day: '2-digit' }) {
  if (!value) return '-'
  return new Date(value).toLocaleDateString(formatTemp,fmtOptions)
}

function formatCTDate ({ date,fmt = 'MM/DD/YYYY HH:mm',isAddCT = true }) {
  if (!date) return '-'
  let dateTime = new Date(date * 1)
  let time = timeZone.tz(dateTime,'America/Chicago')
  let suffix = isAddCT ? ' CT' : ''
  return time.format(fmt) + suffix
}


export {
  formatNumber,
  formatDate,
  formatCTDate,
  nullToDash,
}
