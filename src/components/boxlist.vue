<style lang="stylus" scoped>
  .boxlist
    width 10.04rem
    cursor pointer
  .baoright
    align-self flex-end
    // float right
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
    border-radius: 0.48rem;
    border: solid 0.04rem #dedede;
    overflow hidden
    margin-bottom 0.98rem
    .box-top
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
      <div class="box-top flex">
        <img v-if="item.none||item.isgo" src="../common/images/bao1.png">
        <img v-else src="../common/images/bao.png">
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
import { date } from 'quasar'
import {post} from '@/api'
import axios from "axios";
import {login, scatSelectPacket, scatGetAccount, scatGetAllBalance} from "@common/js"
import {SET_ROOM_RED_EVELOPE_LIST,SET_ACTIVE_RED_EVELOPE_LIST} from "@store/mutation-types";
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
      SET_ACTIVE_RED_EVELOPE_LIST
    }),
    go(){
      if (JSON.stringify(this.userInfo) === "{}") return login();
      const {isgo, none, txId, packetId, eos} = this.item;
      // 判断时候可抢，不能抢跳转详情
      if (isgo || none) return this.$router.push({
        name: 'record-this',
        params: {
          txId:this.item.txId,
          name:this.item.name,
          num:this.item.num
        }
      });
      // 提示信息
      const errObje = {
        "3081001": "Transaction reached the deadline set due to leeway on account CPU limits",
        "3080004": "Transaction exceeded the current CPU usage limit imposed on the transaction",
        "3040005": "交易超时",
        "3123456": "找不到对应红包",
        "3123457": "发送失败",
        "3050003": "余额不足",
        "3080001": "Account using more than allotted RAM usage"
      }
      this.$q.loading.show();
      console.log(Number(this.item.packetId), `${Number(eos).toFixed(4)} EOS`, this.inviteName)
      scatSelectPacket(Number(this.item.packetId), `${Number(eos).toFixed(4)} EOS`, this.inviteName)
      .then(json => {
        this.txid = json.txid
        this.redcss(json.islast)
        time = setTimeout(()=>{
          this.$q.loading.hide();
          this.txid = ""
          this.$q.notify({
            message: "本次交易与EOS主网同步较慢，交易结果以主网结果为准，请至主网查询",
            timeout: 1000,
            color: 'red',
            position:"center"
          })
        },10000)
      })
      .catch(code => {
        this.$q.loading.hide();
        // 用户cpu查询
        scatGetAccount()
        // 查询EosBalance同步vuex， 查询OwnBalance
        scatGetAllBalance()
        if(code == 3123456){
          let win = {
            num:this.item.num,
            eos:this.item.eos,
            packetId:Number(this.item.packetId),
            outid:this.item.txId,
            guang:true
          }
          this.redcss('1')
          // 展示抢红包结果
          this.$emit('myshow',win)
          // 上传红包结果
          post('/close_packet',win).then(()=>{})
          return false
        }
        this.$q.notify({
          message: errObje[code] || "发送失败",
          timeout: 1500,
          color: 'red',
          position:"center"
        })
      });
    },
    // 红包样式调整
    redcss(islast){
      let item = {}
      // 热点红包
      let _redEnvelopeList = [
        ...this.redEnvelopeList
      ] 
      // 所有红包
      let _roomRedEnvelopeList = [
        ...this.roomRedEnvelopeList,
      ]
      // 判断是否为最后一个
      if(islast == '1'){
        _redEnvelopeList[this.index] = {
          ..._redEnvelopeList[this.index],
          isgo: 1,
          none: 1
        }
      }else{
        _redEnvelopeList[this.index] = {
          ..._redEnvelopeList[this.index],
          isgo: 1,
        }
      }
      _roomRedEnvelopeList[this.roomId] = _redEnvelopeList;
      this.SET_ROOM_RED_EVELOPE_LIST(_roomRedEnvelopeList)
      this.SET_ACTIVE_RED_EVELOPE_LIST(_redEnvelopeList)
    },
    // 展示红包data
    updata(json){
      this.$q.loading.hide();
      let win = {
        print:json.income_sum,
        is_chailei:json.is_chailei,
        reward:json.is_reward,
        rewardsum:json.reward_sum,
        num:this.item.num,
        eos:this.item.eos,
        packetId:Number(this.item.packetId),
        outid:this.item.txId,
        own:json.own
      }
      // 展示抢红包结果
      this.$emit('myshow',win)
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
      return date.formatDate(this.item.time*1000, 'HH:mm:ss')
    }
  },
  watch:{
    redresults(newobj){
      if(this.txid == ""){
        return false
      }
      if(newobj.txid == this.txid){
        console.log(newobj)
        // 展示红包
        this.updata(newobj)
        // 用户cpu查询
        scatGetAccount()
        // 查询EosBalance同步vuex， 查询OwnBalance
        scatGetAllBalance()
        clearTimeout(time)
        this.txid = ""
      }
    }
  }
}
</script>
