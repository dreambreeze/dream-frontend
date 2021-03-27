import '@sn/framework/src/plugins/vue'
import createEntry from '@sn/framework'
import scopeRoutes from './router/index'
import scopeStore from './store/index'
import scopeI18n from '../static/lang/en.json'

const baseUrl = process.env.VUE_APP_BASE_PATH
const portalName = process.env.VUE_APP_PRODUCT_NAME
const entry = createEntry()

entry
  .registerRoutes(portalName, baseUrl, scopeRoutes)
  .registerStore(portalName, scopeStore)
  .registerI18n(baseUrl, scopeI18n)
  .create()
