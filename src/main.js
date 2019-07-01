import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from "@store"
import VueI18n from 'vue-i18n'
// import socket from "@socket"
import '@common/styl/index.styl'
import io from 'socket.io-client';
// import VueSocketio from 'vue-socket.io';
// import socketio from 'socket.io-client';
// Vue.use(VueSocketio, socketio('http://192.168.2.50:2021'));

const socket = io(process.env.NODE_ENV=="production"?`https://socket.pickown.com/`:'http://192.168.2.50:2021');
// const socket = io(window.location.origin);
Vue.prototype.$socket = socket

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

console.log(socket)
// socket
// Vue.use(socket)

import './common/styl/index.styl'

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
