const serverUrl = process.env.VUE_APP_SERVER_URL

module.exports = {
  devServer: {
    port: 9999,
    proxy: {
      '^/v1': {
        target: serverUrl
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#2e317c',
            'link-color': '#2e317c',
            'border-radius-base': '2px',
          },
          javascriptEnabled: true,
        },
      },
      sass: {
        additionalData: `@import "@/assets/style/global.scss";`
      },
    }
  }
}
