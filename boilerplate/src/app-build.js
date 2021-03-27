import routes from './router/index'
import store from './store/index'
import i18n from '../static/lang/en.json'

const basePath = (process.env.VUE_APP_BASE_PATH || '').trim()
const productName = (process.env.VUE_APP_PRODUCT_NAME || '').trim()
const microAppData = window.microAppData

if (!microAppData) {
  throw new Error('Entry does not inject microAppData')
}
if (!productName) {
  console.warn('`productName` is empty')
}
if (!basePath) {
  console.warn('`basePath` is empty')
}

const register = microAppData.register
register
  .addRoutes(productName, basePath, routes)
  .addStore(productName, store)
  .addI18n(basePath, i18n)
