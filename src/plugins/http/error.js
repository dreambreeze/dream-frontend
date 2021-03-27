import SystemError from './SystemError.vue'
import _ from 'lodash'
import utils from '../utils/index.js'

const userError = _.debounce((error) => {
  globalThis.microAppData.vue.prototype.$s_confirm({
    type: 'warning',
    title: error.message,
    placement: 'topRight',
    confirmText: 'Confirm',
    cancelText: '',
  })
}, 1500)

const systemError = _.debounce((error) => {
  globalThis.microAppData.vue.prototype.$s_toast({
    type: 'error',
    message: (h) => h(SystemError, { props: error }),
    placement: 'topRight',
  })
}, 1500)

export default (error) => {
  /* global globalThis */
  const router = globalThis.microAppData.router
  const resData = error.response.data

  try {
    if (error && error.response) {
      // time out, throws an exception after 30s
      if (error.code === 'ECONNABORTED') {
        systemError({ message: 'Request timeout, Please try again later' })
      }

      // Special error code handling
      if (resData) {
        // pop-up window for form validate errors
        // if (resData.code && resData.code.toString().indexOf('1044') > -1) {}
        switch (resData.code) {
          case 100005: // session invalid
          case 102003: // the user does not exist
            utils.clearLocalStorage(['rememberMe', 'applicationLocalStorage'])
            window.location.href = '/auth/login'
            return Promise.reject(error)
          case 103007: // MFA validation
            return Promise.reject(error)
          case 110077: // forgot email error
          case 110016: // User can not use previous 8 passwords
          case 110002: // current password invalid
          case 144058: // email exist error for adding borrower
          case 104112: // collateral account is pending
          case 115018:
          case 149413: // wet sign finish error
            return Promise.reject(resData)
          case 100001: // for maintenance.html
            window.location.href = '/maintenance'
            break
          // default:
          //   // other error with alert
          //   systemError(resData)
          //   return Promise.reject(error)
        }

        // response status handling
        switch (error.response.status) {
          case 400:
            switch (resData.code) {
              case 144163:
                return Promise.reject(resData)
              default:
                userError(resData)
            }
            break
          case 401:
            switch (resData.code) {
              case 103013: // auth server login invalid
              case 136017: // TDAI server login invalid
              case 103001: // security answers are incorrect
                return Promise.reject(error)
              case 110006: // link invalid
                utils.clearLocalStorage([
                  'rememberMe',
                  'applicationLocalStorage',
                ])
                router.push({ path: '/link-expired' })
                return Promise.reject(error)
              default:
                utils.clearLocalStorage([
                  'rememberMe',
                  'applicationLocalStorage',
                ])
                return new Promise(function (resolve, reject) {
                  reject(error)
                  setTimeout(function () {
                    window.location.href = '/auth/login'
                  }, 1000)
                })
            }

          case 403:
            switch (resData.code) {
              case 159107: // not permission, others detail view
                router.push({ name: 'not-permission' })
                break
              case 116014: // CSRF refresh for valid
                location.reload()
                break

              case 103012: // users were disabled or locked
              case 103013:
                window.location.href = '/auth/login'
                break

              case 110025: // old password is incorrect
                return Promise.reject(resData)

              case 103010: // security questions
                return Promise.reject(error)

              default:
                return systemError(resData)
            }
            break

          case 404:
            if (error.config.method === 'head') {
              return Promise.reject(error.response.data)
            }
            systemError({ message: 'Request does not exist' })
            return Promise.reject(error)

          case 500:
            systemError(resData)
            break
        }
      } else {
        switch (error.response.status) {
          case 403:
            if (process.env.NODE_ENV === 'production')
              router.push({ name: 'not-permission' })
            break
          default:
            error.message = `Connection error ${error.response.status}`
        }
      }

      // If no match is found
      return Promise.reject(error)
    } else {
      systemError({ message: 'Connection to server failed' })
      console.error(error)
    }
  } catch (error) {
    console.error(error)
  }
}
