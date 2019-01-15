<style lang="stylus" scoped>
  .fullscreen
    position absolute
    width 100%
    height 100%
    top 0rem
  .recordHair
    max-width 16rem
    margin  0 auto
    background #ffffff
  .contentinfo
    position absolute
    top 2rem
    bottom 0rem
    width 100%
    height auto
  .orange
    color #ff8c14
  .top
    padding 0.48rem 0.8rem 0
    .banner
      min-width 13.4rem
      height 5.36rem
      background url("../common/images/bg6.png") no-repeat center
      background-size 100% 100%
      padding-top 0.84rem
    .title
      font-size 0.96rem
      color #ffffff
      text-align center
      font-weight bold
    .money
      font-size 0.96rem
      color #ffffff
      text-align center
      margin-top 0.72rem
      span 
        font-weight bold
        color #ffc000
    .time
      font-size 0.64rem
      margin-top 0.64rem
      text-align center
      color #ffffff
    .annotation
      font-size 0.56rem
      color #333333
      text-align center
      line-height 0.96rem
      font-weight 400
      span 
        color #ff8c14
        font-weight bold
      a
        color #999999
        cursor pointer
  .center
    padding 0.68rem 0.8rem 0
    .allmoney
      height 1.56rem
      background-color #e51c23
      border-radius 0.06rem
      display flex
      justify-content space-between
      align-items center
      p 
        color #f5f5f5
        font-size 0.48rem
        margin-left 0.56rem
        span 
          font-weight bold
          color #ff8c14
      button 
        min-width 2.64rem
        height 1.04rem
        background-color #f98812
        border-radius 0.1rem
        border none
        outline none
        margin-right 0.28rem
        font-size 0.48rem
        color #ffffff
        cursor pointer
    .box
      height 3.32rem
      border 0.04rem solid #eeeeee
      margin-top 0.48rem
      background #fcfcfc
      box-shadow 0px 0px 4px #eeeeee
      padding-top 0.88rem
      padding-left 1.16rem
      box-sizing border-box
      p:first-of-type
        font-size 0.48rem
        color #333333
        margin-bottom 0.28rem
      p:last-of-type
        font-size 0.96rem
  .bottom
    padding 0 0.8rem
    margin-top 0.56rem
    .title
      height 1.64rem
      background-color #e51c23
      font-size 0.56rem
      color #ffffff
      line-height 1.64rem
      padding-left 0.64rem
      box-sizing border-box
    .fenhong
      height 3.52rem
      border 0.04rem solid #eeeeee
      box-shadow 0px 0px 4px #eeeeee
      margin-bottom 1.6rem
      text-align center
      padding-top 0.72rem
      button 
        min-width 4.28rem
        height 1.28rem
        background-color #e51c23
        border-radius 0.1rem
        margin-top 0.52rem
        border none 
        outline none
        color #ffffff
        cursor pointer
</style>

<template>
  <div class="recordHair fullscreen">
    <smallhead left="huitui" :center='$t("message.myjiang")'></smallhead>
    <cube-scroll class="contentinfo" :options="options">
      <div class="top">
        <div class="banner">
          <p class="title">{{$t("message.fenhong")}}</p>
          <p class="money"><span>{{Number(allfenhong).toFixed(4)}}</span> EOS</p>
          <p class="time">{{$t("message.daoji")}}: {{`${hr}:${min}:${sec}`}}</p>
        </div>
        <p class="annotation">{{$t("message.annotation")}}</p>
        <p class="annotation">{{$t("message.annotation1")}}：<span>0.06374778</span> EOS</p>
        <p class="annotation">{{$t("message.annotation2")}}<a href="https://assets.pickown.com/PickOwnV1.pdf" target="_blank">{{$t("message.bai")}}</a></p>
      </div>
      <div class="center">
        <div class="allmoney">
          <p>{{$t("message.chiyou")}} OWN: <span>{{ownbalance}}</span></p>
          <button @click="openpledge">{{$t("message.pledge")}}</button>
        </div>
        <div class="box">
          <p>OWN {{$t("message.pledgenum")}}</p>
          <p class="orange">{{Number(data.balown).toFixed(4)}}</p>
        </div>
        <div class="box">
          <p>{{$t("message.oldShare")}}（EOS）</p>
          <p><span class="orange">{{Number(totaleos).toFixed(4)}}</span> EOS</p>
        </div>
        <div class="box">
          <p>{{$t("message.newShare")}}（EOS）</p>
          <p><span class="orange">{{Number(data.allOWN)?((Number(data.balown)/Number(data.allOWN))*Number(allfenhong)).toFixed(4):(0).toFixed(4)}}</span> EOS</p>
        </div>
      </div>
      <div class="bottom">
        <p class="title">{{$t("message.tiShare")}}：</p>
        <div class="fenhong">
          <p><span class="orange">{{Number(baleos).toFixed(4)}}</span> EOS</p>
          <button @click="wdbonus">{{$t("message.allextract")}}</button>
        </div>
      </div>
    </cube-scroll>
    <pledge :data="data" v-show="pledge"></pledge>
  </div>
</template>

<script>
import smallhead from '@/components/smallhead.vue'
import pledge from '@/components/pledge.vue'
import {scatWithdrawref,wdbonus,bonustable,getBalance,scatGetAllBalance,userboard} from "@common/js"
import {mapGetters,mapMutations} from 'vuex';
import {post,get} from "@api"
import {SET_LOADING} from "@store/mutation-types"
export default {
  created(){
    // this._getInfo();
    // 查询信息
    this.getdata()
  },
  mounted(){
    this.countdown()
  },
  components:{
    smallhead,
    pledge
  },
  computed:{
    ...mapGetters([
      "userInfo",
      "ownbalance"
    ])
  },
  data(){
    return{
      options:{
        bounce:false
      },
      pledge:false,
      hr: 0,
      min: 0,
      sec: 0,
      baleos:0,
      totaleos:0,
      allfenhong:0,
      data:{
        balown:0,
        allOWN:0
      }
    }
  },
  methods:{
    ...mapMutations({
      SET_LOADING
    }),
    openpledge(){
      this.pledge = !this.pledge
    },
    // 倒计时
    countdown: function () {
      const end = Date.parse(new Date(this.getDateStr(1)))
      const now = Date.parse(new Date())
      const msec = end - now
      if(msec<=0){
        this.getdata()
      }
      let hr = parseInt(msec / 1000 / 60 / 60 % 24)
      let min = parseInt(msec / 1000 / 60 % 60)
      let sec = parseInt(msec / 1000 % 60)
      this.hr = hr > 9 ? hr : '0' + hr
      this.min = min > 9 ? min : '0' + min
      this.sec = sec > 9 ? sec : '0' + sec
      const that = this
      setTimeout(()=> {
        that.countdown()
      }, 1000)
    },
    // 获取明天日期
    getDateStr(AddDayCount) {
      let dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount);   //获取AddDayCount天后的日期
      let year = dd.getFullYear();
      let mon = dd.getMonth()+1;                //获取当前月份的日期
      let day = dd.getDate();
      return year + "-" + mon + "-" + day;
    },
    getdata(){
      bonustable('bonustable').then(json =>{
        console.log(json)
        if(json != ''){
          const {baleos,totaleos,balown} = json
          this.baleos = baleos/10000
          this.totaleos = totaleos/10000
          this.data.balown = balown/10000
          // const {balance,dist,depositown} = json
          // this.baleos = balance[2] | 0
          // this.totaleos = dist[2] | 0
          // this.data.balown = depositown?Number(depositown/10000).toFixed(4):0
        }
      })
      userboard('statetable','pickownbonus').then(json=>{
        if(json != ''){
          const {totaleos,totalown} = json
          this.data.allOWN = (totalown/10000).toFixed(4)
          this.allfenhong = (totaleos/10000).toFixed(4)
        }
      })
      userboard('wdowntab','pickownbonus').then(json=>{
        
      })
      scatGetAllBalance()
    },
    // 提取分红
    wdbonus(){
      wdbonus().then(()=>{
        this.getdata()
      })
    },
    lin(){
      // 余额判断
      if(Number(this.shengyu_sum)<=0){
        return false
      }
      // 余额提现
      this.SET_LOADING(true)
      scatWithdrawref().then((val)=>{
        post('/post_tixian', {
          money:(val/10000).toFixed(4)
        }).then(json => {
          this.SET_LOADING(false)
          const {shengyu_sum, sum, tixian_sum} = json.data;
          this.shengyu_sum = shengyu_sum;
          this.sum = sum;
          this.tixian_sum = tixian_sum;
        }).catch(e => {
          this.SET_LOADING(false)
        })
      }).catch(e =>{
        // 提示信息
        const errObje = {
          "3081001": "Transaction reached the deadline set due to leeway on account CPU limits",
          "3080004": "Transaction exceeded the current CPU usage limit imposed on the transaction",
          "3040005": "交易超时",
          "3123456": "找不到对应红包",
          "3123457": "发送失败",
          "3080001": "Account using more than allotted RAM usage",
          "10001":"没有该推荐人的信息",
          "10002":"无可提取余额"
        }
        if(e == 10002){
          post('/post_tixian', {
            money:this.shengyu_sum
          }).then(json => {
            this.SET_LOADING(false)
            const {shengyu_sum, sum, tixian_sum} = json.data;
            this.shengyu_sum = shengyu_sum;
            this.sum = sum;
            this.tixian_sum = tixian_sum;
            return false
          }).catch(e => {
            this.SET_LOADING(false)
            return false
          })
        }
        const toast = this.$createToast({
          txt: errObje[e] || "服务器繁忙，请稍后再试",
          time: 2000,
          type: 'txt'
        })
        toast.show()
        this.SET_LOADING(false)
      })
    },
    _getInfo() {
      this.SET_LOADING(true)
      get('/get_tixian_info').then(json => {
        this.SET_LOADING(false)
        const {shengyu_sum, sum, tixian_sum} = json.data;
        this.shengyu_sum = shengyu_sum;
        this.sum = sum;
        this.tixian_sum = tixian_sum;
      })
    }
  }
}
</script>

