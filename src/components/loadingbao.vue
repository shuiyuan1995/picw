<style lang="stylus" scoped>
  .rob  
    width 13.4rem
    height 16.8rem
    background url(../assets/images/chun14.png) no-repeat
    background-size 100% 100%
    position absolute
    z-index 99
    top 50%
    left 50%
    transform translate(-50%,-50%)
    text-align center
    img 
      width 1.16rem
      height 1.88rem
      margin-top 2.08rem
    .money
      font-size 36px
      font-weight bold
      margin-top 0.4rem
      color #ffba41
    .congratulations
      font-size 18px
      color #ffba41
      margin-top 0.6rem
    .mantissa
      font-size 15px
      color #ffe8c1
      margin-top 0.72rem
    .go
      width 4rem
      height 4rem
      margin-left 50%
      transform translateX(-50%)
      margin-top 0.72rem
      background url(../assets/images/img23.png) no-repeat
      background-position-x 0
      background-size auto 100%
      animation play 0.5s steps(1) infinite
    .explain
      position absolute
      width 100%
      line-height 0.72rem
      color #ffba41
      font-size 0.48rem
      text-align center
      bottom 1.44rem
    .icon-close,.icon-fenxiang3
      position absolute
      top 0.4rem
      left 0.4rem
      color #ffe8c1
      font-size 0.8rem
    .icon-fenxiang3
      left auto
      right 0.4rem
    .sendbtn
      width 8.88rem
      height 1.6rem
      border-radius 0.8rem
      display inline-block
      margin-top 4.8rem
      background-color #ff6c00
      line-height 1.6rem
      font-size 0.64rem
      color #ffffff
    .sendimg
      width 200px
      height 200px
      margin-top 0px
  @keyframes play 
    0%
      background-position-x 0
    9%
      background-position-x -4rem
    18%
      background-position -8rem 0
    27%
      background-position -12rem 0
    36%
      background-position -16rem 0
    45%
      background-position -20rem 0
    54%
      background-position -24rem 0
    63%
      background-position -28rem 0
    72%
      background-position -32rem 0
    81%
      background-position -36rem 0
    90%
      background-position -40rem 0
    100%
      background-position-x 0
</style>

<template>
  <div class="box">
    <div class="bg" @click="$parent.closeloadingbao"></div>
    <div class="rob" v-if="loadingbaodata.intype">
      <img src="../assets/images/icon8.png" alt="">
      <p class="money">{{loadingbaodata.eos?Number(loadingbaodata.eos).toFixed(4):'0.0000'}} EOS</p>
      <p class="congratulations">恭喜发财{{loadingbaodata.intype}}</p>
      <p class="mantissa">尾数 {{loadingbaodata.num?loadingbaodata.num:0}}</p>
      <div v-show="sending" class="sendbtn" @click="gosend">确定</div>
      <img v-show="!sending" class="sendimg" src="../assets/images/chun15.gif" alt="">
      <i class="icon icon-close" @click="$parent.closeloadingbao"></i>
      <i class="icon icon-fenxiang3"></i>
    </div>
    <div class="rob" v-else>
      <img src="../assets/images/icon8.png" alt="">
      <p class="money">{{loadingbaodata.item?loadingbaodata.item.eos:'0.0000'}} EOS</p>
      <p class="congratulations">恭喜发财</p>
      <p class="mantissa">尾数 {{loadingbaodata.item?loadingbaodata.item.num:0}}</p>
      <div class="go" @click="go" :style="{animationPlayState:animationPlayState}"></div>
      <p class="explain">领红包获得数量随机的 EOS<br />必定挖矿 {{loadingbaodata.item?Number(loadingbaodata.item.eos*3).toFixed(4):'0.0000'}} OWN</p>
      <i class="icon icon-close" @click="$parent.closeloadingbao"></i>
      <i class="icon icon-fenxiang3"></i>
    </div>
  </div>
</template>

<script>
import {login, scatSelectPacket,scatcreateRedPacket, scatGetAccount, scatGetAllBalance,changedata} from "@common/js"
import {mapGetters,mapActions,mapMutations} from 'vuex';
import {post} from '@/api'
import {SET_IFENTRY,SET_ROOM_RED_EVELOPE_LIST,SET_ACTIVE_RED_EVELOPE_LIST,SET_LOADING,SET_THISJULU,SET_ROOM_RED_EVELOPE_LIST_UPDATA,SET_MY_SEND,SET_ROOMID,SET_ROOM_RED_EVELOPE_EXPIRED} from "@store/mutation-types";
let time = null
export default {
  props:{
    loadingbaodata:{
      type:Object
    }
  },
  data(){
    return{
      animationPlayState:'paused',
      thisgoto:false,
      sending:true
    }
  },
  computed:{
    ...mapGetters([
      "roomRedEnvelopeList",
      "redEnvelopeList",
      "roomId",
      "inviteName",
      "userInfo",
      "allInfo"
    ]),
  },
  methods:{
    ...mapActions({
      SET_ROOM_RED_EVELOPE_LIST_UPDATA,
      SET_ROOM_RED_EVELOPE_EXPIRED
    }),
    ...mapMutations({
      SET_ROOM_RED_EVELOPE_LIST,
      SET_ACTIVE_RED_EVELOPE_LIST,
      SET_LOADING,
      SET_THISJULU,
      SET_MY_SEND,
      SET_ROOMID,
      SET_IFENTRY
    }),
    go(){
      if(this.thisgoto) return false
      const {packetId,name,num,eos} = this.loadingbaodata.item;
      // 判断余额
      if(eos>this.allInfo.user_money){
        this.$createToast({
          txt: "余额不足，请充值",
          time: 1000,
          type:'txt',
          onTimeout: () => {
            this.$parent.closeloadingbao()
            this.$parent.close(true)
          }
        }).show()
        return false
      }
      this.thisgoto = true
      this.animationPlayState = 'running'
      this.SET_IFENTRY(true)
      // setTimeout(()=>{
        post('/grab_hb',{packetId:packetId}).then(json=>{
          this.animationPlayState = 'paused'
          this.$parent.closeloadingbao()
          this.thisgoto = false
          console.log(json)
          let win = json.data.guang?{
            num:num,
            eos:eos,
            packetId:Number(packetId),
            guang:true
          }:{
            name:name,
            print:json.data.print,
            is_chailei:json.data.is_chailei,
            reward:json.data.reward,
            rewardsum:json.data.rewardsum,
            num:num,
            eos:eos,
            packetId:Number(packetId),
            own:Number(json.data.own).toFixed(4)
          }
          console.log(win)
          // 修改红包展示状态
          this.SET_ROOM_RED_EVELOPE_EXPIRED({roomId: eos, index: this.loadingbaodata.index, packetData: this.redEnvelopeList[this.loadingbaodata.index],type:1});
          // 展示抢红包结果
          this.$emit('myshow',win)
        }).catch(err=>{
          this.animationPlayState = 'paused'
          this.$parent.closeloadingbao()
          this.thisgoto = false
        })
      // },2000)
    },
    // 向后台请求结果
    _getid(){
      post('/post_income_packet',{packetId:this.loadingbaodata.item.packetId}).then(json=>{
        const {type,in_packet,is_last} = json.data
        switch (type) {
          case 1:
            this.redcss(is_last)
            this.updata(in_packet)
            break;
          case 2:
            this.animationPlayState = 'paused'
            this.$parent.closeloadingbao()
            let win = {
              num:this.loadingbaodata.item.num,
              eos:this.loadingbaodata.item.eos,
              packetId:Number(this.loadingbaodata.item.packetId),
              outid:this.loadingbaodata.item.txId,
              guang:true
            }
            this.redcss('1')
            // 展示抢红包结果
            this.$emit('myshow',win)
            // 上传红包结果
            post('/close_packet',win).then(()=>{})
            break;
          case 3:
            this.txid = in_packet.id
            this.redcss()
            time = setTimeout(()=>{
              this.animationPlayState = 'paused'
              this.$parent.closeloadingbao()
              this.thisgoto = false
              this.txid = ""
              this.$createToast({
                txt: "本次交易与EOS主网同步较慢，交易结果以主网结果为准，请至主网查询",
                time: 2000,
                type:'txt'
              }).show()
            },10000)
            break;
          default:
            break;
        }
      }).catch(err=>{
        this.animationPlayState = 'paused'
        this.$parent.closeloadingbao()
      })
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
      _redEnvelopeList[this.loadingbaodata.index] = {
        ..._redEnvelopeList[this.loadingbaodata.index],
        isgo: 1,
      }
      _roomRedEnvelopeList[this.roomId] = _redEnvelopeList;
      this.SET_ROOM_RED_EVELOPE_LIST(_roomRedEnvelopeList)
      this.SET_ACTIVE_RED_EVELOPE_LIST(_redEnvelopeList)
    },
    // 展示红包data
    updata(json){
      this.animationPlayState = 'paused'
      this.$parent.closeloadingbao()
      this.thisgoto = false
      let win = {
        name:this.loadingbaodata.item.name,
        print:json.income_sum,
        is_chailei:json.is_chailei,
        reward:json.reward_type,
        rewardsum:json.reward_sum,
        num:this.loadingbaodata.item.num,
        eos:this.loadingbaodata.item.eos,
        packetId:Number(this.loadingbaodata.item.packetId),
        outid:this.loadingbaodata.item.txId,
        own:Number(json.own).toFixed(4)
      }
      // 展示抢红包结果
      this.$emit('myshow',win)
    },
    // 发红包
    gosend(){
      // 判断余额
      if(this.loadingbaodata.eos>this.allInfo.user_money){
        this.$createToast({
          txt: "余额不足，请充值",
          time: 1000,
          type:'txt',
          onTimeout: () => {
            this.$parent.closeloadingbao()
            this.$parent.close(true)
          }
        }).show()
        return false
      }
      let data = {
        num:this.loadingbaodata.num,
        money:this.loadingbaodata.eos
      }
      this.sending = !this.sending
      this.SET_IFENTRY(true)
      // setTimeout(()=>{
        post('/fahb',data).then(json=>{
          console.log(json)
          // 展示上传红包data
          // this.sendupdata(json.data.data)
          this.$createToast({
            txt: '发送成功',
            time: 2000,
            type: 'txt'
          }).show()
          this.sending = true
          this.$parent.closeloadingbao()
          this.$router.push('/')
        })
      // },1000)
    },
    // 展示上传红包data
    sendupdata(response){
      let packetData = {
        name:response.name,
        packetId:response.packetId,
        type:1,
        num:response.num,
        eos:response.eos,
        time:response.time,
        none:false
      }
      let index = this.roomId
      console.log(index,packetData)
      // 更新所有红包数据
      this.SET_ROOM_RED_EVELOPE_LIST_UPDATA({packetData, index})
    },
  },
}
</script>
