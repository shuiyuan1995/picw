module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  },
  pluginOptions: {
    quasar: {
      theme: 'mat',
      rtlSupport: true,
      importAll: true
    }
  },
  lintOnSave: undefined,
  baseUrl: './',
  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar-framework[\\\/]/
  ]
}
