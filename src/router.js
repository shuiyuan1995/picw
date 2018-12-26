import Vue from 'vue'
import Router from 'vue-router'
import store from "@store";
import DefaultLayout from './layouts/Default.vue'
const Home = () => import('@views/Home2.vue')
const send = () => import('@views/send.vue')
const mylist = () => import('@views/mylist.vue')
const recordHair = () => import('@views/record-hair.vue')
const recordThis = () => import('@views/record-this.vue')
const recordClosed = () => import('@views/record-closed.vue')
const recordJiang = () => import('@views/record-jiang.vue')
const cooperation = () => import('@views/cooperation.vue')
const contant = () => import('@views/contant.vue')
const announcement = () => import('@views/announcement.vue')

Vue.use(Router)

const router =  new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        // {
        //   path: '/announcement',
        //   name: 'announcement',
        //   component: announcement,
        //   meta:{
        //     keepAlive: true
        //   }
        // },
        {
          path: '',
          name: 'home',
          component: Home,
          meta:{
            keepAlive: true
          }
        },
        {
          path: '/send',
          name: 'send',
          component: send,
          meta:{
            keepAlive: true,
            requireAuth: true
          }
        },
        {
          path: '/mylist',
          name: 'mylist',
          component: mylist,
          meta:{
            keepAlive:false,
            requireAuth: true
          }
        },
        {
          path: '/record-hair',
          name: 'record-hair',
          component: recordHair,
          meta:{
            keepAlive:false,
            requireAuth: true
          }
        },
        {
          path: '/record-this',
          name: 'record-this',
          component: recordThis,
          meta:{
            keepAlive:false,
            requireAuth: true
          }
        },
        {
          path: '/record-closed',
          name: 'record-closed',
          component: recordClosed,
          meta:{
            keepAlive:false,
            requireAuth: true
          }
        },
        {
          path: '/record-jiang',
          name: 'record-jiang',
          component: recordJiang,
          meta:{
            keepAlive:false,
            requireAuth: true
          }
        },
        {
          path: '/cooperation',
          name: 'cooperation',
          component: cooperation,
          meta:{
            keepAlive:true,
          }
        },
        {
          path: '/contant',
          name: 'contant',
          component: contant,
          meta:{
            keepAlive:true,
          }
        },
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const {userInfo} = store.state;
  // 判断是否需要登陆
  if (to.meta.requireAuth) {
    // token是否存在
    if (JSON.stringify(userInfo) !== "{}") {
      next();
    }else {
      // 需要注册
      next({
        path:'/'
      })
    }
  }else {
    next();
  }
});

export default router;
