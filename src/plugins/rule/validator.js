import _ from 'lodash'
import { toBigNumber } from '../utils/transfer'

export function requiredInput(field) {
  return {
    required: true,
    message: field ? `${field} can not be blank.` : '',
    transform(value) {
      return _.isString(value) ? value.trim() : value
    },
  }
}

export function requiredSelect(field) {
  return {
    required: true,
    type: 'any',
    message: field ? `Please Select ${field}.` : '',
    transform(value) {
      return _.isString(value) ? value.trim() : value
    },
  }
}

export function requiredMessage(message) {
  return {
    required: true,
    message: message || '',
    transform(value) {
      return _.isString(value) ? value.trim() : value
    },
  }
}

export function email(field) {
  return {
    type: 'email',
    message: `${field} is not a valid email address.`,
    transform(value) {
      return value.trim()
    },
  }
}

export function maxValue(field, maxValue, included = true) {
  return {
    validator(rule, value) {
      value = toBigNumber(value)

      if (included) {
        return value.isLessThanOrEqualTo(toBigNumber(maxValue))
      } else {
        return value.isLessThan(toBigNumber(maxValue))
      }
    },
    transform(value) {
      return value.trim()
    },
    message: `${field} must be no greater than ${maxValue}.`,
  }
}

export function minValue(field, minValue, included = false) {
  return {
    validator(rule, value) {
      value = toBigNumber(value)

      if (included) {
        return value.isGreaterThanOrEqualTo(toBigNumber(minValue))
      } else {
        return value.isGreaterThan(toBigNumber(minValue))
      }
    },
    transform(value) {
      return value.trim()
    },
    message: `${field} must be greater than ${minValue}.`,
  }
}

export function phone(field) {
  // 999-999-9999
  const number = 10

  return {
    validator: (rule, value) => {
      return value.toString().replace(/[^0-9]/gi, '').length === number
    },
    transform(value) {
      return value.trim()
    },
    message: `${field} must be ${number} digits.`,
  }
}

export function zipcode(field) {
  return {
    pattern: /^(\d{5}$)|^(\d{5}-\d{4}$)/,
    transform(value) {
      return value.trim()
    },
    message: `${field} is not a valid zipcode.`,
  }
}
