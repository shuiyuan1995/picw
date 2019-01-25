<style lang="stylus">
#app
  background #ffffff
  max-width 16rem
  height 100%
  margin 0 auto
  overflow hidden
  position relative
  .faderight-enter-active, .faderight-leave-active {
    transition: all 0.3s;s;
  }
  .faderight-enter, .faderight-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform translateX(100%)
  }
  .bg
    position absolute
    top 0
    width 100%
    height 100%
    background rgba(0,0,0,0.2)
    z-index 99
  .transitionRouter-enter-active,
  .transitionRouter-leave-active {
    transition: all .5s;
  }
  .transitionRouter-enter,
  .transitionRouter-leave-to{
    opacity: 0;
  }
</style>

<template>
  <div id="app">
    <transition name="transitionRouter">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
    </transition>
    <transition name="transitionRouter">
      <router-view v-if="!$route.meta.keepAlive"/>
    </transition>
    <rules v-show="rules" bgc="white" @openrule="openrule" :therules="therules"></rules>
    <loading v-show="loading"></loading>
    <transition name="faderight">
      <drawer v-show="menuStatus"></drawer>
    </transition>
    <div v-show="menuStatus" class="bg" @click="theclose"></div>
  </div>
</template>

<script>
import {mapMutations, mapActions,mapGetters} from 'vuex';
import {SET_LOADING,SET_ALL_INFO,SET_GOOGLE_MENU} from "@store/mutation-types";
import {login, getMoneyListget,imgUrl} from "@common/js";
import rules from "@/components/rules.vue";
import {get} from './api';
import loading from "@/components/loading.vue";
import drawer from "@/components/drawer.vue";
export default {
  created(){
    // 获取红包列表
    this.SET_LOADING(true)
    getMoneyListget(true);
    // 自动登陆
    login(()=>{
      this.openrule(9)
    });
    // 
    this._getInfo()
    //预加载图片
    this.preload()
  },
  data(){
    return{
      rules: false,
      therules:2
    }
  },
  computed:{
    ...mapGetters([
      "loading",
      "menuStatus"
    ])
  },
  components:{
    loading,
    rules,
    drawer
  },
  methods:{
    // 获取vuex方法
    ...mapMutations({
      SET_LOADING,
      SET_ALL_INFO,
      SET_GOOGLE_MENU
    }),
    theclose(){
      this.SET_GOOGLE_MENU(false)
    },
    // 获取展示数据，只展示一次
    _getInfo() {
      get("/get_info").then(json => {
        const {data} = json;
        console.log(data)
        this.SET_ALL_INFO(data)
      })
    },
    //打开关闭游戏介绍
    openrule(b) {
      this.therules = b
      this.rules = !this.rules;
    },
    //预加载图片
    preload(){
      let imgs = [
        imgUrl+"img.png",
        imgUrl+"img1.png",
        imgUrl+"img2.png",
        imgUrl+"img3.png",
        imgUrl+"img4.png",
        imgUrl+"img5.png",
        imgUrl+"img6.png",
        imgUrl+"img7.png",
        imgUrl+"img8.png",
        imgUrl+"img9.png",
        imgUrl+"img10.png",
        imgUrl+"img11.png",
        imgUrl+"img12.png",
        imgUrl+"img13.png",
        imgUrl+"img14.png",
        imgUrl+"img15.png",
        imgUrl+"img16.png",
        imgUrl+"img17.png",
        imgUrl+"img18.png",
        imgUrl+"img19.png",
        imgUrl+"img20.png",
        imgUrl+"img21.png",
        imgUrl+"img22.png",
      ]
      for (let img of imgs) {
        let image = new Image()
        image.src = img
        image.onload = () => {
        }
      }
    },
  }
}
</script>
