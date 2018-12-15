module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  },
  productionSourceMap:false,
  pluginOptions: {
    quasar: {
      theme: 'mat',
      rtlSupport: true,
      importAll: true
    }
  },
  lintOnSave: undefined,
  baseUrl: 'https://www.pickown.com/',
  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar-framework[\\\/]/
  ]
}
