<style lang="stylus" scoped>
  .fullscreen
    position absolute
    top 0rem
    width 100%
    height 100%
    overflow hidden
  .flex
    display flex
  .column
    display flex
    flex-direction column
  .home
    max-width 16rem
    margin 0 auto
    background #ffffff
  .homescroll
    position absolute
    top 2rem
    bottom 0rem
    width 100%
    height auto
  .hometop
    height 1.64rem
    background #f9f9f9
    display flex
    justify-content space-between
    padding 0 0.8rem
    .title
      flex 1
      line-height 1.64rem
      font-size 0.64rem
      color #333333
      font-weight bold
      text-align center
    .gonggao
      flex 1
      font-size 0.56rem
      line-height 1.64rem
      &:before
        margin-right 0.16rem
    .rules
      flex 1
      text-align right 
      font-size 0.56rem
      cursor pointer
      box-sizing border-box
      line-height 1.64rem
      &:after
        content '\e63d'
        margin-left 0.1667rem
        font-size 0.64rem
  .banner 
    margin 0.6rem 0.8rem 0.52rem
    height 3.8rem
    background url("../common/images/bg8.png") no-repeat center
    background-size 100% 100%
    padding-top 1rem
    box-sizing border-box
    .bannernum
      font-size 0.96rem
      font-weight bold
      color #ffffff
      text-align center
      span 
        font-weight bold
        color #ffc000
  .top
    .title
      display flex
      justify-content center
      align-items center
      color #000000
      font-size 0.56rem
      img 
        width 0.76rem
        height 0.76rem
        cursor pointer
      span 
        font-weight bold
        margin 0 0.4rem
    .info
      height 8rem
      margin 0 0.8rem
      background url("../common/images/bg9.png") no-repeat center
      background-size 100% auto
      position relative
    .infotop
      font-size 0.56rem
      position absolute
      width 100%
      top 0.4rem
      display flex
      span 
        flex 1
        text-align center
        &:first-of-type
          margin-top 0.72rem
        &:last-of-type
          margin-top 1.12rem
    .infocenter
      font-size 0.56rem
      position absolute
      width 100%
      bottom 0.88rem
      display flex
      span 
        flex 1
        text-align center
    .infofoot
      font-size 0.56rem
      position absolute
      width 100%
      bottom 0.3rem
      display flex
      span 
        flex 1
        text-align center
  .listtitle
    height: 1.36rem;
    background #f4f4f4
    margin-top 0.12rem
    padding 0 0.8rem
    span 
      font-size 12px
      color: #000000;
      font-weight bold
      flex 0 0 25%
  .bannertime
    color #ffffff
    font-size 0.48rem
    text-align center
    margin-top 0.36rem
  .paititle
    align-items center
    text-align center
  .pailist
    width 100%
    min-height 200px
    max-height 400px
    .paiitem
      margin 0 0.8rem
      height 1.52rem
      border-bottom 1px solid #f4f4f4
      font-size 0.48rem
      align-items center
      &:nth-of-type(1) > span
        margin 0 1.2rem 
        height 1.04rem
        background url("../common/images/one.png") no-repeat
        background-size 100% 100%
        padding-top 0.08rem
        color #ea1f1f
      &:nth-of-type(2) > span
        margin 0 1.2rem
        height 1.04rem
        background url("../common/images/two.png") no-repeat
        background-size 100% 100%
        padding-top 0.08rem
        color #4a68d3
      &:nth-of-type(3) > span
        margin 0 1.2rem
        height 1.04rem
        background url("../common/images/three.png") no-repeat
        background-size 100% 100%
        padding-top 0.08rem
        color #a94e17
    span,p
      flex 0 0 25%
      font-size 0.48rem
      text-align center
    .num
      flex 0 0 0.76rem
      width 0.76rem
      height 0.76rem
      background-color: #d52027;
      border-radius 50%
      color #ffffff
      text-align center
      line-height 0.76rem
      margin 0 1.2rem
    p:nth-of-type(1)
      color #333333
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      line-height 0.64rem
    p:nth-of-type(2)
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      span
        color: #ff9703;
    p:nth-of-type(3)
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      span
        color: #00bf0d;
  .bottomtxt
    height 100px
    text-align center
    font-size 0.56rem
    color #333333
    margin-top 2.4rem
  .allpaiitem
    height 2rem
    background #eaeaea
    display flex
    align-items center
    padding 0 0.8rem
    span,p
      flex 1
      text-align center
      font-size 12px
    .num
      flex 0 0 0.76rem
      width 0.76rem
      height 0.76rem
      background-color: #d52027;
      border-radius 50%
      color #ffffff
      text-align center
      line-height 0.76rem
      margin 0 1.2rem
  .grey
    color #999999
  .orange
    color #ff9703
  .green
    color #00bf0d
</style>


<template>
  <div class="fullscreen column home">
    <smallhead left="huitui" :center='$t("message.board")'></smallhead>
    <cube-scroll class="homescroll">
      <div class="hometop">
        <span class="gonggao icon icon-gonggao" @click="openlist">{{$t("message.myjiang")}}</span>
        <span class="title">{{$t("message.paijiang")}}</span>
        <span class="rules icon"  @click="openrule(4)">{{$t("message.how1")}}</span>
      </div>
      <div class="banner">
        <p class="bannernum"><span>{{Number(jiangchi).toFixed(4)}}</span> EOS</p>
        <p class="bannertime">{{$t("message.jiesuan")}}:&nbsp;&nbsp;&nbsp;{{`${hr}:${min}:${sec}`}}</p>
      </div>
      <div class="top">
        <div class="title">
          <img src="../common/images/btn2.png">
          <span>{{$t("message.board")}}</span>
          <img src="../common/images/btn3.png">
        </div>
        <div class="info">
          <p class="infotop">
            <span>{{items2[1]?items2[1].user:''}}</span>
            <span>{{items2[0]?items2[0].user:''}}</span>
            <span>{{items2[2]?items2[2].user:''}}</span>
          </p>
          <p class="infocenter">
            <span class="orange">{{items2[1]?Number(items2[1].balance/10000).toFixed(4):'0.0000'}}</span>
            <span class="orange">{{items2[0]?Number(items2[0].balance/10000).toFixed(4):'0.0000'}}</span>
            <span class="orange">{{items2[2]?Number(items2[2].balance/10000).toFixed(4):'0.0000'}}</span>
          </p>
          <p class="infofoot">
            <span class="green">{{items2[1]?Number(items2[1].prize/10000).toFixed(4):'0.0000'}}</span>
            <span class="green">{{items2[0]?Number(items2[0].prize/10000).toFixed(4):'0.0000'}}</span>
            <span class="green">{{items2[2]?Number(items2[2].prize/10000).toFixed(4):'0.0000'}}</span>
          </p>
        </div>
      </div>
      <div>
        <div class="listtitle paititle flex">
          <span>{{$t("message.rank")}}</span>
          <span>{{$t("message.user")}}</span>
          <span>{{$t("message.amount")}}</span>
          <span>{{$t("message.prize")}}</span>
        </div>
        <cube-scroll class="pailist column" v-if="items2 && items2.length>0">
          <div class="paiitem flex" :key="index" v-for="(item,index) in items2">
            <span class="num" :class="index<3?`${index+1}`:''">{{index+1}}</span>
            <p>{{item.user}}</p>
            <p><span>{{(item.balance/10000).toFixed(4)}}</span> EOS</p>
            <p><span>{{(item.prize/10000).toFixed(4)}}</span> EOS</p>
          </div>
        </cube-scroll>
        <p class="bottomtxt" v-else>{{$t("message.wu")}}</p>
        <div class="allpaiitem">
          <span class="num">{{mypai?mypai.index:'-'}}</span>
          <p class="grey">{{mypai?mypai.user:'-----'}}</p>
          <p><span class="orange">{{mypai?(mypai.balance/10000).toFixed(4):'0.0000'}}</span> EOS</p>
          <p><span class="green">{{mypai?(mypai.prize/10000).toFixed(4):'0.0000'}}</span> EOS</p>
        </div>
      </div>
    </cube-scroll>
    <mylist v-show="listshow" :listshow="listshow"></mylist>
    <rules v-show="rules" bgc="white" @openrule="openrule" :therules="therules"></rules>
  </div>
</template>

<style>
</style>

<script>
import smallhead from '@/components/smallhead.vue'
import mylist from '@/components/mylist.vue'
import rules from '@/components/rules.vue'
import {mapGetters,mapMutations} from 'vuex';
import {scatRedPacketList,userboard} from "@common/js"
import {get} from "@api"
import {SET_LOADING} from "@store/mutation-types"
export default {
  created(){
    // // 获取排行榜列表
    // this.SET_LOADING(true)
    // scatRedPacketList().then(val => {
    //   this.SET_LOADING(false)
    //   this.items2 = val
    // }).catch(()=>{
    //   this.SET_LOADING(false)
    //   const toast = this.$createToast({
    //     txt: "服务器繁忙，请稍后再试",
    //     time: 2000,
    //     type: 'txt'
    //   })
    //   toast.show()
    // })
    this.getlist()
  },
  mounted(){
    this.countdown()
  },
  components: {
    smallhead,
    mylist,
    rules
  },
  data(){
    return{
      jiangchi:0,
      items2:[], //排行榜数组
      mypai:null,
      listshow:false,
      rules:false,
      therules:1,
      hr: 0,
      min: 0,
      sec: 0,
    }
  },
  computed:{
    ...mapGetters([
      "userInfo"
    ]),
  },
  methods:{
    ...mapMutations({
      SET_LOADING
    }),
    openlist(){
      this.listshow = !this.listshow
    },
    openrule(i){
      if(i != 'undefined'){
        this.therules = i
      }
      this.rules = !this.rules
    },
    // 获取排行榜数据
    getlist(){
      this.SET_LOADING(true)
      get('/get_paihangbang').then(json=>{
        this.SET_LOADING(false)
        console.log(json)
        if(json.data&&json.data.length>0){
          this.items2 = json.data
          this.jiangchi = (json.data[0].prize/10000)*5
          // 获取自己排行
          this.getmypai()
        }
      })
      // userboard('cstatus','pickowngames').then(json=>{
      //   console.log(json)
      // })
      // userboard('userboard','pickowngames').then(json=>{
      //   console.log(json)
      // })
    },
    getmypai(){
      for (let i = 0; i < this.items2.length; i++) {
        if(this.userInfo.name == this.items2[i].user){
          this.mypai = {
            index:i+1,
            ...this.items2[i]
          }
        }
      }
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
  }
}
</script>
