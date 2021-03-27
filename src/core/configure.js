function proxy(items, alternate) {
  const is = [
    'Arguments',
    'Array',
    'Date',
    'Function',
    'Number',
    'RegExp',
    'String',
    'Null',
    'Undefined',
  ].reduce((obj, name) => {
    obj['is' + name] = (x) => toString.call(x) === '[object ' + name + ']'
    return obj
  }, {})
  const some = (items, search) => {
    return items.some((path) => {
      if (is.isString(path) && path === search) {
        return true
      } else if (is.isRegExp(path) && path.test(search)) {
        return true
      } else {
        return false
      }
    })
  }
  const empty = (mix) => mix.length === 0

  return Object.entries(items).reduce((map, item) => {
    const [path, entry] = item
    const { disabled = false, include = [], exclude = [], target } = entry
    const keys = ['disabled', 'include', 'exclude']
    const router = (disabled, include, exclude, target, alternate) => {
      return (req) => {
        // Disabled, go to alternate
        if (disabled) {
          return alternate
        }

        // Both include and exclude are not exist, go to target
        if (empty(include) && empty(exclude)) {
          return target
        }

        // Only include, if match, go to target or go to alternate
        if (!empty(include) && empty(exclude)) {
          if (some(include, req.path)) {
            return target
          } else {
            return alternate
          }
        }

        // Only exclude, if match, go to alternate or go to target
        if (!empty(exclude) && empty(include)) {
          if (some(exclude, req.path)) {
            return alternate
          } else {
            return target
          }
        }

        // Both include and exclude are exist, include match have higher priority.
        let route = target
        if (some(exclude, req.path)) {
          route = alternate
        }

        if (some(include, req.path)) {
          route = target
        }

        return route
      }
    }

    keys.forEach((key) => delete entry[key])
    entry.router = router(disabled, include, exclude, target, alternate)
    entry.changeOrigin = true
    entry.xfwd = false
    entry.secure = false
    entry.autoRewrite = true
    entry.protocolRewrite = 'http'
    entry.onProxyRes = (proxyRes) => {
      const removeSecure = (str) =>
        str.replace(/; Secure/i, '').replace(/; HttpOnly/i, '')
      const set = proxyRes.headers['set-cookie']
      if (set) {
        const result = Array.isArray(set)
          ? set.map(removeSecure)
          : removeSecure(set)
        proxyRes.headers['set-cookie'] = result
      }
    }

    map[path] = entry
    return map
  }, {})
}

function resolve(filename) {
  const path = require('path')
  return path.resolve(process.cwd(), filename)
}

function copy(filename) {
  const path = require('path')
  const fs = require('fs')

  filename = resolve(filename)

  const basename = path.basename(filename)

  if (!fs.existsSync(filename)) {
    fs.copyFileSync(
      path.resolve(__dirname, `../../boilerplate/${basename}`),
      filename
    )
  }
}

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = function configure() {
  const path = require('path')
  const webpack = require('webpack')
  const ManifestPlugin = require('webpack-manifest-plugin')
  const { DllReferencePlugin } = webpack
  const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
  const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

  // Copy some file from @sn/framework/boilerplate if it is not exist.
  // This operation for disabling webpack error.
  ;['./proxy.local.js', './user.local.js'].forEach((filename) => copy(filename))

  let proxyMap
  if (isDevelopment) {
    // Set environment variables.
    const env = require(resolve('./switch.json'))
    process.env.VUE_APP_PRODUCT_URL = env.productUrl
    process.env.VUE_APP_CDN_URL = env.cdnUrl
    process.env.VUE_APP_WEBSITE_CODE = env.websiteCode
    process.env.VUE_APP_TENANR_ID = env.tenantId
    process.env.VUE_APP_ENVIRONMENT = env.environment

    // Proxy
    const proxyList = require(resolve('./proxy.local'))
    proxyList['^/forward/auth/login'] = {
      disabled: true,
      target: process.env.VUE_APP_PRODUCT_URL,
      pathRewrite: { '^/forward/auth/login': '/auth/login' },
    }
    proxyMap = proxy(proxyList, process.env.VUE_APP_PRODUCT_URL)
  } else {
    process.env.VUE_APP_USERS = '"[]"'
    proxyMap = {}
  }

  return {
    lintOnSave: false,
    publicPath: process.env.CDN_DOMAIN_NAME || '/',
    transpileDependencies: ['frontend-library'],
    configureWebpack: {
      plugins: [new ManifestPlugin()],
    },
    chainWebpack: (config) => {
      config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
        {
          // Languages are loaded on demand at runtime
          languages: ['json', 'javascript', 'html', 'yaml']
        }
      ])
      config.devtool(process.env.WEBPACK_DEVTOOL || 'source-map')

      if (process.env.WEBPACK_ALIAS) {
        config.resolve.alias.set(
          process.env.WEBPACK_ALIAS,
          path.resolve('./src')
        )
      }
      config.resolve.alias.set('axios$', 'axios/dist/axios.js')
      config.resolve.alias.set(
        'frontend-library$',
        'frontend-library/dist/components/s-design/s-design.umd.js'
      )

      config.resolve.extensions.clear().add('.js').add('.vue').add('.json')
      config.resolve.modules.prepend(path.resolve('./vendor'))
      config.module.noParse(
        /^(vue|vue-router|vuex|vuex-router-sync|lodash|bignumber\.js|numeral|axios|frontend-library)$/
      )

      config.module.rules
        .delete('sass')
        .delete('stylus')
        .delete('less')
        .delete('postcss')
        .delete('pug')
      config.plugins.delete('preload').delete('prefetch')
      config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: process.env.WEBPACK_BUNDLE_ANALYZER || 'disabled',
        },
      ])
      ;['chart', 'tool', 'moment', 'vue'].forEach((dll) => {
        config.plugin(`dll-${dll}`).use(DllReferencePlugin, [
          {
            manifest: require(path.resolve(
              `./vendor/@sn/dll/dll/${dll}.manifest.json`
            )),
          },
        ])
      })

      if (process.env.BUILD_ENV !== 'lib') {
        config.plugin('asset-html').use(AddAssetHtmlPlugin, [
          {
            filepath: path.resolve('./vendor/@sn/dll/dll/*.dll.js'),
          },
        ])
        config.plugin('html').tap((args) => {
          const [options] = args
          options.template = path.resolve(
            './vendor/@sn/framework/public/index.html'
          )
          return args
        })
      }
    },
    pluginOptions: {
      webpackBundleAnalyzer: {
        analyzerMode: process.env.WEBPACK_BUNDLE_ANALYZER || 'disabled',
      },
    },
    devServer: {
      host: process.env.WEBPACK_HOST,
      proxy: proxyMap,
    },
    css: {
      sourceMap: true,
      loaderOptions: {
        sass: {
          prependData: `
            @import "frontend-library/src/style/style.scss";
            `,
        },
      },
    },
  }
}
