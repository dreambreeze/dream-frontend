import Vue from 'vue'
import axios from 'axios'
import {duration} from './enum'
import _ from 'lodash'

axios.defaults.baseURL = ''
axios.interceptors.request.use(
  (config) => {
    // set http header
    config.headers['X-Requested-With'] = 'XMLHttpRequest'

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
          if (
            error.response.data.code &&
            (_.toString(error.response.data.code).indexOf('20001') !== -1 ||
              _.toString(error.response.data.code).indexOf('7000') !== -1)
          ) {
            Vue.prototype.$openLogin()
          }
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
            alertError(error.response.data)
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
  window.location.href = '/auth/login'
}
/**
 * show error info
 * @messeage error info
 * @return $alert pop-up window
 */
const alertError = (data) => {
  let msg = ''
  if (data) {
    msg = `${data.message}`
  }
  Vue.prototype.$message.error({
    content: msg,
    duration,
  })
}

export default axios
