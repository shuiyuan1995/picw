import Vue from 'vue'
import Router from 'vue-router'
import store from "@store";
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        keepAlive:false,
      }
    },
    {
      path: '/record-this',
      name: 'record-this',
      component: () => import('./views/record-this.vue'),
      meta:{
        keepAlive:false,
        requireAuth: true
      }
    },
    {
      path: '/send',
      name: 'send',
      component: () => import('./views/send.vue'),
      meta:{
        keepAlive:false,
        requireAuth: true
      }
    },
    {
      path: '/cooperation',
      name: 'cooperation',
      component: () => import('./views/cooperation.vue'),
      meta:{
        keepAlive:false,
        requireAuth: true
      }
    },
    {
      path: '/contant',
      name: 'contant',
      component: () => import('./views/contant.vue'),
      meta:{
        keepAlive:false,
        requireAuth: true
      }
    },
    {
      path: '/record-jiang',
      name: 'record-jiang',
      component: () => import('./views/record-jiang.vue'),
      meta:{
        keepAlive:false,
        requireAuth: true
      }
    },
    {
      path: '/mylist',
      name: 'mylist',
      component: () => import('./views/mylist.vue'),
      meta:{
        keepAlive:false,
        requireAuth: true
      }
    },
    {
      path: '/record-hair',
      name: 'record-hair',
      component: () => import('./views/record-hair.vue'),
      meta:{
        keepAlive:false,
        requireAuth: true
      }
    },
    {
      path: '/invitation',
      name: 'invitation',
      component: () => import('./views/invitation.vue'),
      meta:{
        keepAlive:false,
        requireAuth: true
      }
    }
  ]
})
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
