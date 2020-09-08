export default {
  data() {
    return {}
  },
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
  },
}
