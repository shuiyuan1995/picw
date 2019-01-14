<style lang="stylus" scoped>
  .flex
    display flex
  .home
    z-index 2000
    background #ffffff
    max-width 16rem
    margin 0 auto
  .nav
    margin-top 0.6rem
  .title
    font-size 0.64rem
    color #eb0000
    font-weight bold
    margin 1.4rem 0 0 0.8rem
  .numlist
    padding 0 0.8rem
    display flex
    flex-wrap wrap
    justify-content space-between
    margin-top 0.72rem
    li
      width 2.56rem
      height 1.78rem
      text-align center
      line-height 1.78rem
      background-color #eeeeee
      border-radius 0.08rem
      margin-bottom 0.16rem
      box-shadow 0px 1px 0px #a6a6a6
      font-size 0.72rem
      cursor pointer
      &.active
        background #eb0000
        color #ffffff
  .contant
    padding 0 0.8rem
    font-size 0.56rem
    font-weight 400
    margin-top 0.8rem
  .btn
    padding 0 0.8rem
    .gobtn
      height 1.8rem
      width 100%
      margin-top 2.08rem
      background url("../common/images/btn1.png") no-repeat
      background-size 100% 100%
      border 0
      color #ffffff
      font-size 0.64rem
      font-weight bold
      outline none
  .send
    min-height calc(100vh - 50px)
    background-size 100%
    padding 0.04rem 0.8rem 0 0.8rem
    position relative
    max-width 16rem
    margin  0 auto
    & > p
      margin 1.12rem 0 0.64rem
      font-size 0.56rem
      color #222222
    .content
      height 9.88rem
      background-color rgba(#f5f5f5,0.9)
      border-radius 0.2rem
      box-sizing border-box
      padding 1rem 26px 0 26px
      .one
        align-items center
        height 1.44rem
        span 
          font-size 0.56rem
          color #e30714
      .inputone
        width 4.8rem
        height 1.44rem
        background-color #ffffff
        border solid 0.04rem #b5b5b5
        margin-left 0.24rem
        font-size 0.56rem
      p
        font-size 0.56rem
        line-height 0.72rem
        color #222222
        margin 0.6rem 0 1rem
      .two
        align-items center
        height 1.2rem
        span 
          font-size 0.56rem
          color #333333
        .inputtwo
          width 1.98rem
          height 1.2rem
          background-color #f62d40
          border-radius 0.2rem
          margin 0 0.16rem
          font-size 14px
          color #ffffff
    .gobtn
      width 100%
      background-color #56b416
      height 1.82rem
      border-radius 1.84rem
      font-size 0.64rem
      color #ffffff
      box-sizing border-box
      margin-top 2.08rem
      font-weight bold
      border none
      outline none
      position relative
    .classify
      display flex
      align-items center
      width 100%
      border solid 1px #d2d2d2
      border-radius 0.1rem
      background #ffffff
      width 100%
      height 1.64rem
      span
        flex 1
        height 100%
        line-height 1.64rem
        text-align center
        border-right solid 0.02rem #d2d2d2
        font-size 0.56rem
        font-weight bold
        color #222222
        &:last-of-type
          border-right none
        &.active
          background #eb1726
          color #ffffff
</style>

<template>
  <div class="home fullscreen">
    <smallhead left="huitui" center="发红包"></smallhead>
    <mynav class="nav" :allroomred="allroomred"></mynav>
    <p class="title">{{$t("message.chooseluck")}}</p>
    <ul class="numlist flex">
      <li :class="number == item-1?'active':''" :key="item" v-for="item in 10" @click="gonum(item)">{{item-1}}</li>
    </ul>
    <p class="contant">{{$t("message.explain")}}</p>
    <p class="contant">{{$t("message.explain1")}}</p>
    <div class="btn">
      <button class="gobtn" @click="send">{{$t("message.sendbtn1")}}</button>
    </div>
  </div>
</template>

<script>
import smallhead from '@/components/smallhead.vue'
import {mapGetters,mapActions,mapMutations} from 'vuex';
import mynav from '@/components/mynav.vue'
import {login, scatcreateRedPacket, scatGetAccount, scatGetAllBalance} from "@common/js"
import {SET_ROOM_RED_EVELOPE_LIST_UPDATA,SET_MY_SEND,SET_ROOMID,SET_CLICK_ROOMID_RED_EVELOPE_LIST} from "@store/mutation-types";
import {post} from '../api'
export default {
  data(){
    return{
      number:Math.floor(Math.random()*9), //尾数
      eosnum:[0.1,1,5,20], //房间钱数
      allroomred:[]
    }
  },
  components: {
    smallhead,
    mynav
  },
  methods:{
    ...mapActions({
      SET_ROOM_RED_EVELOPE_LIST_UPDATA,
      SET_CLICK_ROOMID_RED_EVELOPE_LIST
    }),
    ...mapMutations({
      SET_MY_SEND,
      SET_ROOMID
    }),
    // 房间选择切换
    changeE(i){
      let roomid = i;
      this.SET_CLICK_ROOMID_RED_EVELOPE_LIST({roomid, redEnvelopeList: this.roomRedEnvelopeList[i]})
    },
    // 选择尾数
    gonum(i){
      this.number = i-1
    },
    // 发红包
    send(){
      // console.log([1,2,3,4].indexOf(3))
      // 判断登录
      if (JSON.stringify(this.userInfo) === "{}") return login();
      // 提示信息
      const errObje = {
        "3081001": "Transaction reached the deadline set due to leeway on account CPU limits",
        "3080004": "Transaction exceeded the current CPU usage limit imposed on the transaction",
        "3040005": "交易超时",
        "3123456": "找不到对应红包",
        "3123457": "发送失败",
        "3123458": "取消操作",
        "3050003": "余额不足",
        "3080001": "Account using more than allotted RAM usage"
      }
      // 创建红包
      console.log(this.eosnum[this.roomId], Number(this.number))
      scatcreateRedPacket(this.eosnum[this.roomId], Number(this.number))
      .then(response=>{
        console.log(response)
        // 判断参数是否正确
        if(!response.packetId||!response.txId){
          const toast = this.$createToast({
            txt: '发送失败',
            time: 2000,
            type: 'txt'
          })
          toast.show()
          return false
        }
        // 添加自己发红包id
        this.SET_MY_SEND(response.txId)
        // 用户cpu查询
        scatGetAccount()
        // 查询EosBalance同步vuex， 查询OwnBalance
        scatGetAllBalance()
        // 展示上传红包data
        this.updata(response)

        const toast = this.$createToast({
          txt: '发送成功',
          time: 2000,
          type: 'txt'
        })
        toast.show()
        this.$router.push('/')
      }).catch(code => {
        const toast = this.$createToast({
          txt: errObje[code] || "发送失败",
          time: 2000,
          type: 'txt'
        })
        toast.show()
        // 用户cpu查询
        scatGetAccount()
        // 查询EosBalance同步vuex， 查询OwnBalance
        scatGetAllBalance()
      });
    },
    // 展示上传红包data
    updata(response){
      let packetData = {
        name:this.userInfo.name,
        packetId:response.packetId,
        txId:response.txId,
        type:1,
        num:this.number,
        eos:this.eosnum[this.roomId],
        time:new Date().getTime()/1000,
        none:false
      }
      let data1 ={
        issus_sum:this.eosnum[this.roomId],
        tail_number:this.number,
        count:10,
        eosid:response.packetId,
        blocknumber:response.txId,
        addr:this.inviteName
      }
      let index = this.roomId
      // 更新所有红包数据
      this.SET_ROOM_RED_EVELOPE_LIST_UPDATA({packetData, index})
      // 上传红包信息
      post('/issus_packet',data1).then(()=>{})
    },
  },
  computed:{
    ...mapGetters([
      "roomId","userInfo","inviteName","redEnvelopeList","roomRedEnvelopeList"
    ])
  },
}
</script>
