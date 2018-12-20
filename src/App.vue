<style lang="stylus" scoped>
  .q-item
    font-size 12px !important
  #app
    background rgb(31,41,36)
</style>

<template>
  <div id="app" v-cloak class="scroll no-scroll">
    <router-view/>
    <rules v-show="rules" bgc="white" @openrule="openrule" :therules="therules"></rules>
  </div>
</template>

<script>
import {mapMutations, mapActions} from 'vuex';
import {SET_USER_INFO, SET_USERID, SET_TOKEN, SET_EOSBALANCE, SET_INVITE_NAME, SET_ALL_INFO} from "@store/mutation-types";
import {gameLogin, getBalance} from "@common/js/scatter";
import {login, getMoneyListget,imgUrl} from "@common/js";
import rules from "@/components/rules.vue";
import {get} from './api';

export default {
  created(){
    // 获取邀请人参数
    const {ref} = this.$route.query;
    ref && this.SET_INVITE_NAME(ref);
    // 获取红包列表
    this.$q.loading.show();
    getMoneyListget(true);
    // 自动登陆
    login(()=>{
      this.openrule(2)
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
  methods:{
    // 获取展示数据，只展示一次
    _getInfo() {
      get("/get_info").then(json => {
        const {data} = json;
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
        imgUrl+"bg3.png",
        imgUrl+"bg.png",
        imgUrl+"bg5.png",
        imgUrl+"img22.png",
      ]
      for (let img of imgs) {
        let image = new Image()
        image.src = img
        image.onload = () => {}
      }
    },
    // 获取vuex方法
    ...mapMutations({
      SET_USER_INFO,
      SET_USERID,
      SET_TOKEN,
      SET_EOSBALANCE,
      SET_INVITE_NAME,
      SET_ALL_INFO
    })
  },
  components:{
    rules
  }
}
</script>

