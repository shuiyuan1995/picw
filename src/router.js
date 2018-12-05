import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import Home from './views/Home1.vue'
import hall from './views/hall.vue'
import send from './views/send.vue'
import mylist from './views/mylist.vue'
import recordHair from './views/record-hair.vue'
import recordThis from './views/record-this.vue'
import recordClosed from './views/record-closed.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: '/hall',
          name: 'hall',
          component: hall
        },
        {
          path: '/send',
          name: 'send',
          component: send
        },
        {
          path: '/mylist',
          name: 'mylist',
          component: mylist
        },
        {
          path: '/record-hair',
          name: 'record-hair',
          component: recordHair
        },
        {
          path: '/record-this',
          name: 'record-this',
          component: recordThis
        },
        {
          path: '/record-closed',
          name: 'record-closed',
          component: recordClosed
        },
      ]
    }
  ]
})
