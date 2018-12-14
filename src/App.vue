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
import {SET_USER_INFO, SET_USERID, SET_TOKEN, SET_EOSBALANCE} from "@store/mutation-types";
import {gameLogin, getBalance} from "@common/js/scatter";
import {login, getMoneyListget} from "@common/js";
import {get} from './api';

export default {
  created(){
    getMoneyListget(true);
    login();
  },
  methods:{
    // 获取vuex方法
    ...mapMutations({
      SET_USER_INFO,
      SET_USERID,
      SET_TOKEN,
      SET_EOSBALANCE
    })
  }
}
</script>

