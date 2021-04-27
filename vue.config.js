const serverUrl = process.env.VUE_APP_SERVER_URL

module.exports = {
  devServer: {
    port: 9999,
    proxy: {
      '^/v1': {
        target: serverUrl,
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#2E317C',
          },
          javascriptEnabled: true,
        },
      },
      sass: {
        additionalData: `@import "@/assets/style/global.scss";`,
      },
    },
  },
}
