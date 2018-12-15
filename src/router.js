import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import Home from './views/Home2.vue'
import send from './views/send.vue'
import mylist from './views/mylist.vue'
import recordHair from './views/record-hair.vue'
import recordThis from './views/record-this.vue'
import recordClosed from './views/record-closed.vue'
import recordJiang from './views/record-jiang.vue'
import cooperation from './views/cooperation.vue'
import contant from './views/contant.vue'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          meta:{
            keepAlive:false
          }
        },
        {
          path: '/send',
          name: 'send',
          component: send,
          meta:{
            keepAlive:false
          }
        },
        {
          path: '/mylist',
          name: 'mylist',
          component: mylist,
          meta:{
            keepAlive:false
          }
        },
        {
          path: '/record-hair',
          name: 'record-hair',
          component: recordHair,
          meta:{
            keepAlive:false
          }
        },
        {
          path: '/record-this',
          name: 'record-this',
          component: recordThis,
          meta:{
            keepAlive:false
          }
        },
        {
          path: '/record-closed',
          name: 'record-closed',
          component: recordClosed,
          meta:{
            keepAlive:false
          }
        },
        {
          path: '/record-jiang',
          name: 'record-jiang',
          component: recordJiang,
          meta:{
            keepAlive:false
          }
        },
        {
          path: '/cooperation',
          name: 'cooperation',
          component: cooperation,
          meta:{
            keepAlive:false
          }
        },
        {
          path: '/contant',
          name: 'contant',
          component: contant,
          meta:{
            keepAlive:false
          }
        },
      ]
    }
  ]
})
