<style lang="stylus" scoped>
  .q-item
    font-size 12px !important
  #app
    background rgb(31,41,36)
</style>

<template>
  <div id="app" v-cloak class="scroll no-scroll">
    <router-view/>
  </div>
</template>

<script>
import {mapMutations,mapGetters} from 'vuex';
import {SET_USER_INFO, SET_USERID, SET_TOKEN, SET_EOSBALANCE, SET_INVITE_NAME, SET_ALL_INFO} from "@store/mutation-types";
import {gameLogin, getBalance} from "@common/js/scatter";
import {login, getMoneyListget} from "@common/js";
import {get} from './api';

export default {
  created(){
    // 获取邀请人参数
    const {invite} = this.$route.query;
    invite && this.SET_INVITE_NAME(invite);
    // 获取红包列表
    getMoneyListget(true);
    // 自动登陆
    login();
    // 
    this._getInfo()
  },
  methods:{
    // 获取展示数据，只展示一次
    _getInfo() {
      get("/get_info").then(json => {
        const {data} = json;
        this.SET_ALL_INFO(data)
      })
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
  }
}
</script>

