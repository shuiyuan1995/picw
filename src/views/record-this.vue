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
    background #f2f2f2
  .nav
    display flex
    margin-top 0.16rem
    max-width 16rem
    height 1.54rem
    border-bottom 0.1rem solid #eeeeee
    padding 0 0.8rem
    background #ffffff
    .item
      flex 1
      height 1.65rem
      text-align center
      font-size 0.56rem
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      font-weight bold
      cursor pointer
      line-height 1.53rem
      position relative
      &.active
        color #eb1726
        &::after
          position absolute
          bottom 0rem
          left 0rem
          content ""
          height 0.1rem
          width 100%
          background #eb1726
  .box
    margin 0.7rem 0 0
    padding 0 0.8rem
    position absolute
    top 3.8rem
    bottom 0.6rem
    width 100%
    box-sizing border-box
  .boxinfo
    height 100%
    padding 1rem 0.72rem
    background #ffffff
    box-sizing border-box
    position relative
    .close
      position absolute
      top 0.32rem
      right 0.4rem
      font-size 0.8rem
      color #bebebe
    .sendname
      font-size 12px
      margin-bottom 0.32rem
      .big
        font-size 0.6rem
      .time
        color: #cccccc;
    .bao
      width 100%
      height 3.7rem
      border-radius 0.24rem
      border solid 0.04rem #dedede
      overflow hidden
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
        margin-right 0.48rem
        font-size 0.48rem
        text-align right
  .recordscroll
    position absolute
    top 5.76rem
    left 0rem
    width 100%
    bottom 0rem
    height auto
    box-sizing border-box
    padding 0 0.8rem
  .recordlist
    padding 0.5rem 0
    border-bottom 1px solid #e8e8e8
    p,div
      display flex
      justify-content space-between
      flex-wrap nowrap
      &:last-of-type
        margin-top 0.16rem
    .name
      font-size 0.64rem
      color #000000
      font-weight bold
      span 
        font-size 0.48rem
        line-height 0.72rem
    .num
      font-size 0.56rem
      color #999999
    .money
      font-size 0.48rem
      color #222222
    .time
      font-size 0.48rem
      color #999999
    .orange
      color #ff8400
      font-weight bold
    .img 
      display flex
      flex-wrap nowrap
      img
        width 1.52rem
        height 0.52rem
        margin-left 0.2rem
  .recordsnone
    text-align center
    padding-top 30%
    img 
      width 3.16rem
      height 2.64rem
    p
      font-size 0.48rem
      color #888888
      margin-top 0.4rem
</style>

<template>
  <div class="recordHair fullscreen scroll">
    <smallhead left="huitui" :center='`${name}${$t("message.debao")}`' right="jilu"></smallhead>
    <div class="nav">
      <div class="item" @click="changeN(0)" :class="thisjilu==0?'active':''">
        {{$t("message.fa")}}
      </div>
      <div class="item" @click="changeN(1)" :class="thisjilu==1?'active':''">
        {{$t("message.shou")}}
      </div>
    </div>
    <div class="box">
      <div class="boxinfo">
        <p class="sendname"><span class="big">{{name}}</span>{{$t("message.debao")}}<span class="time">({{timer}})</span></p>
        <div class="bao">
          <div class="box-top">
            <img src="../common/images/bao.png">
            <div>
              <p>{{$t("message.wei")}}:{{num}}</p>
              <p>{{$t("message.linwan")}}</p>
            </div>
          </div>
          <div class="box-bottom">{{$t("message.gong")}}{{data.outpacketsum?data.outpacketsum:'0.0000'}} EOS</div>
        </div>
        <cube-scroll class="recordscroll" ref="scroll">
          <ul v-if="data.data&&data.data.length>0">
            <li class="recordlist" :key="index" v-for="(item,index) in data.data">
              <div>
                <p class="name">{{item.user}}</p>
                <p class="money">
                  <span class="orange">{{item.income_sum}}</span>&nbsp;EOS+<span class="orange">{{item.own}}</span>&nbsp;OWN
                </p>
              </div>
              <p>
                <span class="time">{{item.created_at}}</span>
                <span class="img">
                  <img v-if="item.is_chailei == 1" src="../common/images/icon26.png">
                  <img v-if="item.reward_type > 0" :src="typeImg[item.reward_type]">
                </span>
              </p>
            </li>
          </ul>
          <div class="recordsnone" v-else>
            <img src="../common/images/bao.gif" />
            <p>{{$t("message.jinxin1")}}</p>
          </div>
        </cube-scroll>
        <span class="close icon icon-close" @click="$router.go(-1)"></span>
      </div>
    </div>
  </div>
</template>

<script>
import smallhead from '@/components/smallhead.vue'
import {mapGetters,mapMutations} from 'vuex';
import {get} from '../api'
import {SET_LOADING,SET_THISJULU} from "@store/mutation-types"
import {changedata} from "@common/js"
export default {
  created(){
    // 获取红包id
    this.packetId = this.$route.params.txId
    this.name = this.$route.params.name
    this.num = this.$route.params.num
    this.time = this.$route.params.time
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
          created_at:changedata(val.updated_at*1000,'MM-dd hh:mm')
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
    }
  },
  components: {
    smallhead
  },
  computed:{
    ...mapGetters([
      "userInfo",
      "thisjilu"
    ]),
    // 红包获奖状态判断
    typeImg(){
      return ['',require('../common/images/icon22.png'),require('../common/images/icon23.png'),require('../common/images/icon27.png'),require('../common/images/icon25.png'),require('../common/images/icon24.png')]
    },
    // 转换时间
    timer(){
      return changedata(this.time,'hh:mm:ss')
    }
  },
  methods:{
    ...mapMutations({
      SET_LOADING,
      SET_THISJULU
    }),
    changeN(i){
      this.SET_THISJULU(i)
      this.$router.push('/record-hair')
    }
  }
}
</script>

