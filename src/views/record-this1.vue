<style lang="stylus" scoped>
  @import "../common/styl/index";
  .column
    display flex
    flex-direction column
  .flex
    display flex
  .fullscreen
    position absolute
    top 0
    width 100%
    height 100%
  .recordHair
    max-width 16rem
    margin  0 auto
    background #ffffff
  .fixed-top
    z-index 1000
    background #eb1726
  .top
    background url("../common/images/bg.png") no-repeat top center
    background-size 100% auto
    height 8.36rem
    box-sizing border-box
    text-align center
    color #222222
    align-items center
    .toptitle
      width 100%
      font-size 0.64rem
      color #ffffff
      position relative
      margin-top 0.48rem
      margin-bottom 1.52rem
      .jilu
        position absolute
        right 0.8rem
        font-size 0.48rem
        top 0.16rem
    .img
      width 1.2rem
      height 1.9rem
    .num
      margin-top 0.32rem
      font-size 21px
      color #ffffff
    .over
      color #ffffff
      font-size 0.48rem
      margin-top 0.4rem
  .center
    height 1.4rem
    color #999999
    font-size 0.48rem
    line-height 1.4rem
    background #f9f9f9
    padding-left 0.8rem
  .bottom
    border-top 0.04rem solid #e8e8e8
    background #ffffff
    li
      border-bottom 0.04rem solid #e8e8e8
      padding 0.68rem 20px
      .info
        justify-content space-between
      .name,.price
        font-size 14px
        color #000000
        span 
          color #ff8400
          font-weight bold
      .name
        font-weight bold
      .time,.num1
        font-size 0.48rem
        color #999999
        margin-top 0.24rem
      .time
        margin-top 0.32rem
      .num1
        text-align right
        justify-content flex-end
        align-items center
        span 
          display flex
          align-items center
      .lei
        width 0.8rem
        height 0.68rem
        margin-left 0.4rem
      .san
        width 0.68rem
        height 0.68rem
      .txtinfo
        text-align center
        span
          position relative
          height: 0.82rem
          line-height 0.82rem
          background-color #dddddd
          display inline-block
          border-radius 0.2rem
          font-size 0.48rem
          padding 0 0.28rem 0 0.7rem
          color #ffffff
          margin-left 0.4rem
          z-index 0
        .img1
          width 0.82rem
          height 0.68rem
          position absolute
          top 0.04rem
          left 0.12rem
          z-index 0
  .bottomtxt
    text-align center
    font-size 0.56rem
    color #333333
    margin-top 2.4rem
  .contentinfo
    position absolute
    width 100%
    height auto
    top 1.9rem
    bottom 0rem
</style>

<template>
  <div class="recordHair fullscreen scroll">
    <smallhead left="huitui" :center='`${name}${$t("message.debao")}`' right="jilu"></smallhead>
    <cube-scroll class="contentinfo">
      <div class="top column">
        <div class="toptitle">
          <span @click="togojilu" class="jilu">{{$t("message.record")}}</span>
          <p>{{name+$t("message.debao")}}</p>
        </div>
        <img class="img" src="../common/images/icon.png" />
        <p class="num">{{$t("message.wei")}}:{{num}}</p>
        <p class="over" v-if="data.data && data.data.length > 0">{{$t("message.linwan")}}</p>
      </div>
      <div class="center">{{$t("message.gong")}}{{data.outpacketsum}}eos</div>
      <ul class="bottom" v-if="data.data&&data.data.length>0">
        <li :key="index" v-for="(item,index) in data.data">
          <div class="info flex">
            <div class="left">
              <p class="name">{{item.user}}</p>
              <p class="time">{{item.created_at}}</p>
            </div>
            <div class="right">
              <p class="price"><span>{{item.income_sum}}</span> EOS+<span>{{item.own}}</span> OWN</p>
              <p class="num1 flex">
                <span v-if="item.reward_type != 0"><img class="san" :src="typetxt[item.reward_type]" />+{{item.reward_sum}}EOS</span>
                <span v-if="item.is_chailei == 1"><img class="lei" src="../common/images/lei.png" />-{{data.outpacketsum}}EOS</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
      <div class="bottomtxt" v-else>{{$t("message.jinxin")}}</div>
    </cube-scroll>
  </div>
</template>

<script>
import smallhead from '@/components/smallhead.vue'
import {mapGetters,mapMutations} from 'vuex';
import {get} from '../api'
import {SET_LOADING} from "@store/mutation-types"
import {changedata} from "@common/js"
export default {
  created(){
    // 获取红包id
    this.packetId = this.$route.params.txId
    this.name = this.$route.params.name
    this.num = this.$route.params.num
    let data = {
      outid:this.packetId
    }
    // 获取当前红包抽奖信息
    this.SET_LOADING(true)
    get('/red_packet',data).then((obj)=>{
      this.SET_LOADING(false)
      console.log(obj)
      this.data = obj
      this.data.data = obj.data.map((val,i)=>{
        return {
          ...val,
          created_at:changedata(val.updated_at*1000,'hh:mm:ss')
        }
      })
    }).catch(()=>{
      this.SET_LOADING(false)
      // console.log(e)
    })
  },
  data(){
    return{
      packetId:'', //红包id
      data:{}, //红包数据
      typetxt:['',require('../common/images/icon2.png'),require('../common/images/icon3.png'),require('../common/images/icon6.png'),require('../common/images/icon4.png'),require('../common/images/icon5.png')]
    }
  },
  components: {
    smallhead
  },
  computed:{
    ...mapGetters([
      "userInfo"
    ]),
    // 红包获奖状态判断
    // typetxt(){
    //   return ['',this.thislang.dui,this.thislang.san,this.thislang.small,this.thislang.zhen,this.thislang.shun,this.thislang.si,this.thislang.big]
    // },
  },
  methods:{
    ...mapMutations({
      SET_LOADING
    }),
    togojilu(){
      if(this.name==this.userInfo.name){
        this.$router.push('/record-hair')
      }else{
        this.$router.push('/record-closed')
      }
    }
  }
}
</script>

