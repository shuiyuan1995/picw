import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "@store"
import VueI18n from 'vue-i18n'
import socket from "@socket"

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

import './styles/quasar.styl'
import 'quasar-framework/dist/quasar.ie.polyfills'
import 'quasar-extras/animate'
import 'quasar-extras/roboto-font'
import 'quasar-extras/material-icons'
import Quasar from 'quasar'
import './common/styl/index.styl'
// import './common/font/font.css'
// import './common/font/iconfont.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

Vue.use(Quasar, {
  config: {}
 })

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
