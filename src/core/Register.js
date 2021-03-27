import _ from 'lodash'

class Register {
  constructor({ router, store, i18n, layout } = {}) {
    this.router = router
    this.store = store
    this.i18n = i18n
    this.layout = layout
  }

  addRoutes(name, prefix, routes) {
    if (routes.length <= 0) {
      return this
    }

    routes = _.cloneDeep(routes)
    prefix = this._sanitizePrefix(prefix)
    name = this._sanitizeName(name)
    // Entry portal.
    if (prefix === '/') {
      name = ''
    }

    if (name === '') {
      this.router.addRoutes(routes)
    } else {
      routes.forEach((route) => {
        this._addPrefix(route, prefix, name)
      })

      this.router.addRoutes([
        {
          path: `/entry-${name}`,
          component: this.layout,
          children: routes,
        },
      ])
    }

    return this
  }

  addStore(name, store) {
    name = name.trim()
    this.store.registerModule(name, store)

    return this
  }

  addI18n(name, messages) {
    name = _.trim(name.trim(), '/')

    const locale = this.i18n.locale
    let onlineI18n = this.store.state.frontendConfig?.settings?.i18n ?? {}
    if (name === '') {
      // Entry portal.
      this.i18n.mergeLocaleMessage(locale, messages)
      this.i18n.mergeLocaleMessage(locale, onlineI18n)
    } else {
      this.i18n.mergeLocaleMessage(locale, { [name]: messages })
      this.i18n.mergeLocaleMessage(locale, { [name]: onlineI18n })
    }

    return this
  }

  _addPrefix(route, pathPrefix, namePrefix) {
    const { children = [] } = route
    const { path, name, redirect } = route

    if (!_.isNil(path)) {
      route.path = this._joinPath(pathPrefix, path)
    }

    if (!_.isNil(redirect)) {
      route.redirect = this._joinPath(pathPrefix, redirect)
    }

    if (!_.isNil(name) && namePrefix !== '') {
      route.name = this._joinName(namePrefix, name)
    }

    children.forEach((item) => {
      this._addPrefix(item, pathPrefix, namePrefix)
    })

    return route
  }

  _joinName(prefix, name) {
    name = this._sanitizeName(name)

    return [prefix, name].filter((item) => item.length > 0).join('-')
  }

  _joinPath(prefix, path) {
    path = path.trim()

    // Relative path.
    if (path[0] !== '/') {
      return path
    }

    path = _.trim(path, '/')
    path = _.trim([prefix, path].join('/'), '/')

    return '/' + path
  }

  /**
   * Make sure prefix begin with /.
   *
   * @param {String} path
   */
  _sanitizePrefix(path) {
    path = path.trim()
    path = _.trim(path, '/')

    return '/' + path
  }

  /**
   * @param {String} name
   */
  _sanitizeName(name) {
    return name.trim()
  }
}

export { Register }
