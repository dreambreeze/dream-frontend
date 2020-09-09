import Vue from 'vue'
import axios from 'axios'

// let appConfig = JSON.parse(sessionStorage.getItem('appConfig'))
// let productCode = appConfig ? appConfig.productCode : null

axios.defaults.baseURL = ''
axios.interceptors.request.use(
  (config) => {
    // set http header
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    // config.headers['X-SN-USER-UID'] = '32456475454343'

    // timeout
    config.timeout = 20000
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (config) => {
    if (
      config.headers['content-type'] !== undefined &&
      config.headers['content-type'].indexOf('text/html') !== -1
    ) {
      toLogin()
    } else {
      return config
    }
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          if (error.response.data) {
            alertError(error.response.data)
          }
          break
        case 401:
          error.message = 'Unauthorized'
          toLogin()
          break
        case 403:
          toLogin()
          break
        case 404:
          error.message = 'Not Found'
          break
        case 405:
          error.message = 'Method Not Allowed'
          break
        case 408:
          error.message = 'Request Timeout'
          break
        case 500:
          if (error.response.data) {
            alertError(error.response.data, 'danger')
          }
          error.message = 'Internal Server Error'
          break
        case 501:
          error.message = 'Not Implemented'
          break
        case 502:
          error.message = 'Bad Gateway'
          break
        case 503:
          error.message = 'Service Unavailable'
          break
        case 504:
          error.message = 'Gateway Timeout'
          break
        case 505:
          error.message = 'HTTP Version Not Supported'
          break
        default:
          error.message = `Connection error${error.response.status}`
      }
    } else {
      toLogin()
      alertError(error.response.data)
      error.message = 'Connection to server failed'
    }
    return Promise.reject(error.response.data)
  }
)
const toLogin = () => {
  if (
    process.env.NODE_ENV === 'development' &&
    window.location.hostname === 'localhost'
  ) {
    // window.location.reload()
  } else {
    window.location.href = '/auth/login'
  }
}
/**
 * show error info
 * @messeage error info
 * @return $alert pop-up window
 */
const alertError = (data, type = 'error-info') => {
  let msg = ''
  let requestId = ''
  if (data) {
    msg = `${data.message}`
    requestId = `Request ID: ${data.requestId ? data.requestId : ''} Code: ${
      data.code ? data.code : ''
    }`
  }
  if (type === 'error-info') {
    Vue.prototype.$alert.show({
      flag: 'error-info',
      message: msg,
      requestIdInfo: requestId,
      autoClose: 10000
    })
  } else {
    Vue.prototype.$alert.show({
      flag: 'danger',
      position: 'top',
      message: msg,
      autoClose: 4000
    })
  }
}

export default axios
