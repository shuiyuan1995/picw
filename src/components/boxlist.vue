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
import {post} from '../api'
import {login, scatSelectPacket, scatGetAccount, scatGetAllBalance} from "@common/js"
import {SET_ROOM_RED_EVELOPE_LIST,SET_ACTIVE_RED_EVELOPE_LIST} from "@store/mutation-types";
export default {
  created(){
    console.log(this.item,this.index)
  },
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
      over:true
    }
  },
  methods:{
    ...mapMutations({
      SET_ROOM_RED_EVELOPE_LIST,
      SET_ACTIVE_RED_EVELOPE_LIST
      // setpackdata:'SET_PACKDATA',
      // setinfo:'SET_INFO',
      // setpackdatal:'SET_PACKDATAL',
    }),
    go(){
      if (JSON.stringify(this.userInfo) === "{}") return login();
      const {isgo, none, txId, packetId, eos} = this.item;
      // 判断时候可抢，不能抢跳转详情
      if (isgo || none) return this.$router.push({
        name: 'record-this',
        params: {txId}
      });
      // 提示信息
      const errObje = {
        "3081001": "用户CPU不足",
        "3080004": "合约CPU不足",
        "3040005": "交易超时",
        "3123456": "找不到对应红包",
        "3123457": "发送失败"
      }
      scatSelectPacket(packetId, `${Number(eos).toFixed(4)} EOS`, "")
      .then(json => {
        if(!json.packetId){
          this.$q.notify({
            message: errObje[code] || "发送失败",
            timeout: 1500,
            color: 'red',
            position:"center"
          })
          return false
        }
        // 用户cpu查询
        scatGetAccount()
        // 查询EosBalance同步vuex， 查询OwnBalance
        scatGetAllBalance()
        // 展示上传红包
        this.updata(json)
      })
      .catch(code => this.$q.notify({
        message: errObje[code] || "发送失败",
        timeout: 1500,
        color: 'red',
        position:"center"
      }))
    },
    // 展示上传红包data
    updata(val){
      let item = {}
      // 热点红包
      let _redEnvelopeList = [
        ...this.redEnvelopeList
      ] 
      // 热点红包
      let _roomRedEnvelopeList = [
        ...this.roomRedEnvelopeList,
      ]
      // 判断是否为最后一个
      if(val.isLast == '1'){
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
      let data = {
        outid:this.item.txId,
        eosid:val.packetId,
        blocknumber:val.block_num,
        income_sum:(val.packetAmount/10000).toFixed(4),
        is_chailei:val.isBomb,
        reward_type:val.isLuck,
        reward_sum:(val.luckyAmount/10000).toFixed(4),
        addr:this.inviteName,
        isnone:val.isLast,
        isgo:1,
        own:(val.own/10000).toFixed(4),
        newPrizePool:(val.newPrizePool/10000).toFixed(4)
      }
      let win = {
        print:(val.packetAmount/10000).toFixed(4),
        is_chailei:val.isBomb,
        reward:val.isLuck,
        rewardsum:(val.luckyAmount/10000).toFixed(4),
        num:this.item.num,
        eos:this.item.eos,
        packetId:Number(this.item.packetId),
        outid:this.item.txId,
        own:(val.own/10000).toFixed(4)
      }
      // 展示抢红包结果
      this.$emit('myshow',win)
      // 上传结果
      post('/income_packet',data).then((val)=>{
        console.log(val)
      }).catch((e)=>{
        
      })
    },
  },
  computed:{
    ...mapGetters([
      "roomRedEnvelopeList",
      "redEnvelopeList",
      "roomId",
      "inviteName",
      "userInfo",
      "packages"
    ]),
    // 转换时间
    timer(){
      return date.formatDate(this.item.time, 'HH:mm:ss')
    }
  },
}
</script>
