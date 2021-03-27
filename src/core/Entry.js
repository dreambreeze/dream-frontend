import _ from 'lodash'
import cookie from 'js-cookie'
import { Register } from './Register'
import { getConfiguration, getIsLogin, getMe, goTerms, loadScript, } from './helper'

class Entry {
  constructor({
    global,
    layout,
    app,
    vue,
    router,
    store,
    i18n,
    progress,
  } = {}) {
    this.global = global
    this.layout = layout
    this.app = app
    this.vue = vue
    this.router = router
    this.store = store
    this.i18n = i18n
    this.progress = progress

    this.isDevelopment = process.env.NODE_ENV === 'development'
    this.vm = null
    this.microAppConfig = null
    this.loadedScripts = {}
    this.routes = []
    this.stores = []
    this.i18ns = []
    this.register = new Register({ router, store, i18n, layout })

    this.init()
  }

  init() {
    if ( !this.progress) {
      this.progress = {
        start: () => {},
        done: () => {},
      }
    }

    if ( !this.layout) {
      throw new Error('Params.layout must be a vue component.')
    }

    if ( !this.app) {
      throw new Error('Params.app must be a vue component.')
    }

    if ( !this.vue) {
      throw new Error('Params.vue must be Vue.')
    }

    if ( !this.router) {
      throw new Error('Params.router must be vue-router instance.')
    }

    if ( !this.store) {
      throw new Error('Params.store must be vuex store instance.')
    }

    if ( !this.i18n) {
      throw new Error('Params.i18n must be vue-i18n instance.')
    }
  }

  create() {
    this._injectMeta()
    this._setCookie()

    return this._loadAppConfig().then(() => {
      this._inject()
      this._routerGuard()
      this._setBrand()
      this._createApp()

      return this.vm
    })
  }

  /**
   * Register routes for local development.
   *
   * @param {String} name Portal name, if the portal is an entry portal, name = ''.
   * @param {String} prefix Route prefix, if the portal is an entry portal, prefix = ''.
   * @param {Array} routes
   */
  registerRoutes(name, prefix, routes) {
    this.routes.push([name.trim(), prefix.trim(), routes])
    return this
  }

  /**
   * @param {string} name
   * @param {Object} store
   */
  registerStore(name, store) {
    this.stores.push([name.trim(), store])
    return this
  }

  /**
   * @param {string} name
   * @param {Object} i18n
   */
  registerI18n(name, i18n) {
    this.i18ns.push([name.trim(), i18n])
    return this
  }

  log(message) {
    if (this.isDevelopment) {
      console.log(message)
    }

    return this
  }

  /**
   * Load app config from server or page.
   *
   * @param {Object} global window
   * @returns {Promise}
   */
  _loadAppConfig() {
    const { global, store } = this

    let promise
    if (this._isGreenLight()) {
      promise = getConfiguration().then((config) => {
        return {
          ...config,
        }
      })
    } else {
      // Note: we must call getIsLogin(), this method will remove HttpOnly for XSRF-TOKEN cookie.
      promise = Promise.all([getConfiguration(), getIsLogin()])
        .then(([config, login]) => {
          return {
            $jwt: login?.jwt,
            ...config,
          }
        })
        .then((config) => {
          return getMe().then((me) => {
            me.role = me.profile.roleCode
            store.commit('setUserInfo', me)

            return config
          })
        })
    }

    return promise.then((config) => {
      const { tenantId } = config
      if ( !tenantId) {
        const message = 'product code must be set.'
        throw new Error(message)
      }

      // Handling static resource paths
      function handleStaticResource(resource) {
        Object.keys(resource).forEach((key) => {
          resource[
            key
            ] = `${ config.cloudFrontUrl }/static-resources/${ resource[key] }`
        })
      }

      if (config.settings) {
        handleStaticResource(config.settings.images || {})
        handleStaticResource(config.settings.staticFile || {})
      }

      store.commit('setFrontendConfig', config)
      store.commit('setTenantId', tenantId)

      // @todo For compatibility, need to remove. Get config from store.
      // eslint-disable-next-line no-unused-expressions
      global?.sessionStorage?.setItem('appConfig', JSON.stringify(config))

      // http headers for axios.
      const headers = {
        'X-REQUEST-WITH': config.csrf || '',
        'X-XSRF-TOKEN': cookie.get('XSRF-TOKEN') || '',
      }
      if (config.$jwt) {
        headers['X-SN-JWT-TOKEN'] = config.$jwt
      }
      store.commit('setHttpHeaders', headers)

      return config
    })
  }

  _inject() {
    this.routes.forEach((item) => this.register.addRoutes(...item))
    this.stores.forEach((item) => this.register.addStore(...item))
    this.i18ns.forEach((item) => this.register.addI18n(...item))
  }

  _injectMeta() {
    const { global, router, store, i18n, vue, register, layout } = this

    // This function for compatible.
    function addRouter(routes, name) {
      if (routes.length <= 0) {
        return
      }

      const route = [
        {
          path: `/entry-${ name }`,
          component: layout,
          children: routes,
        },
      ]

      router.addRoutes(route)
    }

    global.microAppData = {
      vue,
      router,
      store,
      i18n,
      addRouter,
      register,
    }

    return this
  }

  /**
   * Only for development.
   */
  _setCookie() {
    if ( !this.isDevelopment) {
      return
    }

    const token = 'XSRF-TOKEN'
    const session = 'xx-SESSION'
    const cookies = [token, session]
    const url = new URL(window.location)
    const queryToken = url.searchParams.get(token)
    const querySession = url.searchParams.get(session)

    if (querySession && queryToken) {
      Object.entries(cookie.get()).forEach(([name, value]) => {
        cookie.remove(name)
      })

      cookies.forEach((name) => {
        const value = url.searchParams.get(name)
        if (value) {
          cookie.set(name, value)
        }
      })
    }
  }

  _routerGuard() {
    this._scriptLoaderGuard()
    this._authGuard()

    return this
  }

  _scriptLoaderGuard() {
    const { router } = this

    let currentRoute = null

    router.beforeEach((to, from, next) => {
      currentRoute = to

      // Fixed, some route don't have name.
      const name = (to.name || '').toUpperCase()
      if (name === 'DEFAULT') {
        this._loadAppScript(to).then((route) => {
          if (currentRoute === route) {
            // when script was loaded, need rematch.
            next(route.fullPath)
          } else {
            next()
          }
        })
      } else {
        next()
      }
    })

    return this
  }

  _authGuard() {
    const { router, progress, store } = this
    const auth = (role, type, roles) => {
      const checked = roles.some((item) => {
        return item === role
      })

      if (type === 'white') {
        return checked
      }

      if (type === 'black') {
        return !checked
      }
    }

    router.beforeEach((to, from, next) => {
      progress.start()

      const role = store.getters.role
      const permission = store.state.frontendConfig?.permission?.page?.[to.name]
      const passed = permission
        ? auth(role, permission.listType, permission.listData)
        : true

      if (passed) {
        next()
      } else {
        next('/not-permission')
      }
    })

    router.afterEach(() => {
      progress.done()
    })

    return this
  }

  _createApp() {
    const { router, store, i18n, app, vue: Vue } = this

    this.global.vm = this.vm = new Vue({
      router,
      store,
      i18n,
      render: (h) => h(app),
      el: '#app',
      created() {
        goTerms(router, store)
      },
    })

    return this
  }

  _setBrand() {
    const { frontendConfig = {} } = this.store.state

    // add theme css
    const themeCss = frontendConfig.settings.theme
    if (themeCss) {
      const styleElement = document.createElement('style')
      styleElement.type = 'text/css'
      document.documentElement.appendChild(styleElement)
      if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = themeCss
      } else {
        styleElement.appendChild(document.createTextNode(themeCss))
      }
    }

    // set favicon
    const favicon = frontendConfig.settings?.images?.favicon
    if (favicon) {
      const faviconElement = document.querySelector("link[rel*='icon']")
      faviconElement.href = favicon
    }

    // set title
    const title = frontendConfig.settings?.title || 'Demo'
    if (title) {
      const titleElement = document.querySelector("title[id='product-title']")
      titleElement.text = title
    }
  }

  _isGreenLight() {
    const { store } = this
    const whitelistUrl = store.getters.whitelistUrl
    const path = global.location?.pathname
    const goToAppServerText =
      '[[auth or app]]: white list url [not] include this router path, user will go to app server'
    const goToAuthServerText =
      '[[auth or app]]: white list url include this router path, user will go to auth server'

    if ( !path) {
      throw new Error('Invalid path.')
    }

    if (path.indexOf('/auth') > -1) {
      this.log(goToAuthServerText)
      return true
    }

    if (whitelistUrl.includes(path)) {
      this.log(goToAuthServerText)
      return true
    }

    this.log(goToAppServerText)
    return false
  }

  _sanitizeMicroAppConfig() {
    if (this.microAppConfig === null) {
      const { store } = this
      const { frontendConfig = {} } = store.state
      const { cloudFrontUrl } = frontendConfig
      const microApp = _.cloneDeep(frontendConfig?.settings?.microApp || {})
      Object.keys(microApp).forEach((key) => {
        const productName = microApp[key].productName.trim()
        const basePath = microApp[key].basePath.trim()
        const version = microApp[key].version.trim()
        microApp[key].productName = productName
        microApp[key].basePath = '/' + _.trim(basePath, '/')
        microApp[
          key
          ].cdn = `${ cloudFrontUrl }/${ productName }/${ version }/${ productName }.umd.min.js`
      })
      this.microAppConfig = microApp
    }
    return this.microAppConfig
  }

  async _loadAppScript(to) {
    const { progress, routes } = this

    // Micro App config empty.
    const microAppConfig = this._sanitizeMicroAppConfig()
    if (Object.keys(microAppConfig).length <= 0) {
      return
    }

    // Route prefix is not in config
    const pos = to.path.indexOf('/', 1)
    const routePrefix = pos === -1 ? to.path : to.path.substring(0, pos)
    const config = microAppConfig[routePrefix]
    if ( !config) {
      return
    }

    // Route is registered from local.
    const isRegistered = routes.some((item) => item.name === config.productName)
    if (isRegistered) {
      return
    }

    // If script loaded.
    const { productName, cdn } = config
    if (this.loadedScripts[productName]?.[1] === 1) {
      return
    }

    const loader = this.loadedScripts[productName] ?? [null, 0]
    if (loader[0] === null) {
      progress.start()
      loader[0] = loadScript(cdn).then(() => {
        loader[1] = 1
        return to
      })
    } else {
      loader[0] = loader[0].then(() => {
        return to
      })
    }

    this.loadedScripts[productName] = loader
    return loader[0]
  }
}

export { Entry }
