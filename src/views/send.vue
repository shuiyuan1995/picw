<style lang="stylus" scoped>
  .fullscreen
    position fixed
    top 0px
    width 100%
    height 100%
  .flex
    display flex
  .home
    background #ffffff url("../assets/images/chun.png") center bottom no-repeat
    background-size contain
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
      background url("../assets/images/btn1.png") no-repeat
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
    <loadingbao v-show="loadingbao" :loadingbaodata="loadingbaodata"></loadingbao>
    <recharge v-show="recharge"></recharge>
  </div>
</template>

<script>
import smallhead from '@/components/smallhead.vue'
import {mapGetters,mapActions,mapMutations} from 'vuex';
import mynav from '@/components/mynav.vue'
import loadingbao from '@/components/loadingbao.vue'
import recharge from "@/components/recharge.vue";
import {login, scatcreateRedPacket, scatGetAccount, scatGetAllBalance} from "@common/js"
import {SET_ROOM_RED_EVELOPE_LIST_UPDATA,SET_MY_SEND,SET_ROOMID,SET_CLICK_ROOMID_RED_EVELOPE_LIST} from "@store/mutation-types";
import {post} from '../api'
export default {
  data(){
    return{
      number:Math.floor(Math.random()*9), //尾数
      eosnum:[0.1,1,5,20], //房间钱数
      allroomred:[],
      loadingbao:false,
      loadingbaodata:{
        intype:1
      },
      recharge:false
    }
  },
  components: {
    smallhead,
    mynav,
    loadingbao,
    recharge
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
      // 判断登录
      if (JSON.stringify(this.userInfo) === "{}") return login();
      this.loadingbaodata = {
        ...this.loadingbaodata,
        eos:this.roomId,
        num:this.number
      }
      this.loadingbao = !this.loadingbao
    },
    closeloadingbao(){
      this.loadingbao = !this.loadingbao
    },
    // 充值提现
    close(b){
      this.recharge = b
    }
  },
  computed:{
    ...mapGetters([
      "roomId",
      "userInfo",
      "inviteName",
      "redEnvelopeList",
      "roomRedEnvelopeList"
    ])
  },
}
</script>
