<style lang="stylus" scoped>
  .boxlist
    width 10.04rem
    cursor pointer
    float left
  .baoright
    float right
  .over
    opacity 0.6
  .sendname
    font-size 12px
    margin-bottom 0.32rem
    .time
      color: #cccccc;
  .box
    width 100%
    height: 3.7rem;
    border-radius: 0.24rem;
    border: solid 0.04rem #dedede;
    overflow hidden
    margin-bottom 0.98rem
    .box-top
      display flex
      height: 2.58rem;
      background #f99c3b
      align-items center
      flex-wrap nowrap
      img 
        width: 1.54rem;
        height: 1.9rem;
        margin 0 0.44rem 0 0.48rem;
      p:first-of-type
        color: #ffffff;
        font-size: 0.6rem;
        margin-bottom 0.28rem
      p:last-of-type
        color: #ffffff;
        font-size: 0.48rem;
    .box-bottom
      height 1.12rem
      line-height 1.12rem
      margin-left 0.48rem
      font-size 0.48rem
</style>

<template>
  <div class="boxlist" :class="{'over':item.none||item.isgo,'baoright':item.name == userInfo.name}" @click="go">
    <p class="sendname">{{item.name}} <span class="time">({{timer}})</span></p>
    <div class="box">
      <div class="box-top">
        <img v-if="item.none||item.isgo" src="../assets/images/bao1.png">
        <img v-else src="../assets/images/bao.png">
        <div class="bao">
          <p>{{$t("message.wei")}}:{{item.num}}</p>
          <p>{{item.none?$t("message.linwan"):(item.isgo?$t("message.linqu"):$t("message.baotxt1"))}}</p>
        </div>
      </div>
      <div class="box-bottom">{{$t("message.PickOwn")}}</div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import {post} from '@/api'
import axios from "axios";
import {login, scatSelectPacket, scatGetAccount, scatGetAllBalance,changedata} from "@common/js"
import {SET_ROOM_RED_EVELOPE_LIST,SET_ACTIVE_RED_EVELOPE_LIST,SET_LOADING,SET_THISJULU} from "@store/mutation-types";
let time = null
export default {
  props:{
    item:{
      type:Object
    },
    index:{
      type:Number
    }
  },
  data(){
    return{
      over:true,
      txid:""
    }
  },
  methods:{
    ...mapMutations({
      SET_ROOM_RED_EVELOPE_LIST,
      SET_ACTIVE_RED_EVELOPE_LIST,
      SET_LOADING,
      SET_THISJULU
    }),
    // 抢红包
    go(){
      if (JSON.stringify(this.userInfo) === "{}") return login();
      const {isgo, none, packetId, eos} = this.item;
      // 判断时候可抢，不能抢跳转详情
      if (isgo || none) {
        this.SET_THISJULU(1)
        return this.$router.push({
          name: 'record-this',
          params: {
            packetId:this.item.packetId,
            name:this.item.name,
            num:this.item.num,
            time:this.item.time*1000,
            sum:this.item.eos,
            status:this.item.none?0:1
          }
        });
      }
      let loadingbaodata = {
        item:this.item,
        index:this.index,
        intype:0
      }
      this.$parent.$parent.openloadingbao(loadingbaodata)
      return false
    },
  },
  computed:{
    ...mapGetters([
      "roomRedEnvelopeList",
      "redEnvelopeList",
      "roomId",
      "inviteName",
      "userInfo",
      "redresults"
    ]),

    // 转换时间
    timer(){
      return changedata(this.item.time*1000,'hh:mm:ss')
    }
  },
}
</script>
