import {isNullOrUndValue} from '@/utils/utils'

export default {
  methods: {
    validateForms(forms, callback) {
      let ret = true
      let count = 0
      forms.forEach((form) => {
        form.validate((valid) => {
          if (!valid) {
            ret = false
          }
          if (++count === forms.length) {
            callback(ret)
          }
        })
      })
    },
    successHandler() {
      this.$message.success({
        content: this.$t("successful_operation")
      })
    },
    validRequire(message = this.$t('this_field_can_not_blank'), trigger = '') {
      return {
        required: true,
        message,
        trigger,
      }
    },
    validEmail(field) {
      return {
        type: 'email',
        transform: function (value) {
          return value.trim()
        },
        message: `${field} is not a valid email address.`,
      }
    },
    validLengthLimit(field, number = 9, alias) {
      return {
        len: number,
        message: `${field} must be ${alias || number} digits.`,
      }
    },
    validMaxValue(field, maxValue, formatCallBack) {
      return {
        validator: (rule, value) => {
          value = (value + '').replace(/,/g, '')
          return isNullOrUndValue(value) || value * 1 < maxValue * 1
        },
        message: `${field} must be less than ${
          formatCallBack ? formatCallBack(maxValue) : maxValue
        }.`,
      }
    },
    validMinValue(field, minValue, formatCallBack) {
      return {
        validator: (rule, value) => {
          value = (value + '').replace(/,/g, '')
          return isNullOrUndValue(value) || value * 1 > minValue * 1
        },
        message: `${field} must be greater than ${
          formatCallBack ? formatCallBack(minValue) : minValue
        }.`,
      }
    },
    validPhone(field, number) {
      return {
        validator: (rule, value) => {
          return value.toString().replace(/[^0-9]/gi, '').length === number
        },
        message: `${field} must be ${number} digits.`,
      }
    },
    validAdult(field, number) {
      return {
        validator: (rule, value, callback) => {
          const now = new Date()
          const v = new Date(value)

          if (now.getFullYear() - v.getFullYear() > 18) {
            callback()
          } else {
            if (now.getFullYear() - v.getFullYear() === 18) {
              if (now.getMonth() > v.getMonth()) {
                callback()
              } else {
                if (now.getMonth() === v.getMonth()) {
                  if (now.getDate() >= v.getDate()) {
                    callback()
                  }
                }
              }
            }
            callback(new Error('Applicant should be older than 18.'))
          }
        },
        message: `${field} must be ${number} digits.`,
      }
    },
  },
}
