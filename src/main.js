import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from "@store"
import VueI18n from 'vue-i18n'
import socket from "@socket"
import '@common/styl/index.styl'

Vue.config.productionTip = false

Vue.use(VueI18n);
const i18n = new VueI18n({
  //定义默认语言
  locale: 'zhCHS', 
  messages:{
    'en': langen,
    'zhCHS': langcn,
    'zhCHT': langcnH
  }
})

// socket
Vue.use(socket)

import './common/styl/index.styl'

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
