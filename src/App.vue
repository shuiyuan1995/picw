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
import {mapMutations, mapActions} from 'vuex';
import {SET_USER_INFO, SET_USERID, SET_TOKEN, SET_EOSBALANCE, SET_INVITE_NAME, SET_ALL_INFO, SET_ROOM_RED_EVELOPE_LIST_UPDATA} from "@store/mutation-types";
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
  // socket维护
  sockets: {
    connect: function () {
     
    },
    // 发红包通知
    issus_packet(data) {
      const {index, info, name, out_packet} = data;
      const {eosid, blocknumber, tail_number, issus_sum, created_at} = out_packet;
      // 红包数据
      let packetData = {
        name,
        packetId: eosid,
        txId: blocknumber,
        num: tail_number,
        eos: issus_sum,
        time: created_at * 1000,
        type: 1,
        none: false
      }
      // 设置展示数据
      this.SET_ALL_INFO(info);
      // 
      this.SET_ROOM_RED_EVELOPE_LIST_UPDATA({packetData, index})
      // 
    },
    // 抢红包通知
    income_packet(data) {
      console.log(data)
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
    // 获取vuex方法
    ...mapMutations({
      SET_USER_INFO,
      SET_USERID,
      SET_TOKEN,
      SET_EOSBALANCE,
      SET_INVITE_NAME,
      SET_ALL_INFO
    }),
    ...mapActions({
      SET_ROOM_RED_EVELOPE_LIST_UPDATA
    })
  }
}
</script>

