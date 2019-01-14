<style lang="stylus" scoped>
  @import "../common/styl/index";
  .fullscreen
    position absolute
    top 0rem
    width 100%
    height 100%
    overflow hidden
  .flex
    display flex
  .alljilu
    background #ffffff
    max-width 16rem
    margin  0 auto
  .nav
    display flex
    margin-top 0.16rem
    max-width 16rem
    height 1.54rem
    border-bottom 0.1rem solid #eeeeee
    padding 0 0.8rem
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
  .banner
    height 3.8rem
    margin 0 0.8rem
    background url("../common/images/bg8.png") no-repeat center
    background-size 100% 100%
    padding-top 1.12rem
    box-sizing border-box
    margin-top 0.6rem
    .bannertxt
      font-size 0.48rem
      color #ffffff
      text-align center
      margin-bottom 0.2rem
    .bannernum
      text-align center
      color #ffffff
      font-size 0.96rem
      font-weight bold
      span 
        font-weight bold
        color #ffc000
  .top
    display flex
    padding 0 0.8rem
    height 2.8rem
    align-items center
    &>div
      flex 1
      text-align center
      p:first-of-type
        font-size 0.96rem
        font-weight bold
      p:last-of-type
        font-size 0.48rem
        margin-top 0.1rem
  .recordHair
    position absolute
    top 10.88rem
    width 100%
    bottom 0rem
    height auto
    border-top 3px solid #e8e8e8
    padding 0 0.8rem
    box-sizing border-box
    .itemtxt
      font-size 0.56rem
      color #888888
      text-align center
      margin 0.4rem 0
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
      b
        font-size 0.48rem
  .recordnone
    font-size 0.56rem
    color #888888
    text-align center
    padding-top 30%
</style>

<template>
  <div class="alljilu fullscreen">
    <smallhead ref="smallhead" left="guanbi" :center='$t("message.fa")' right="more"></smallhead>
    <div class="nav">
      <div class="item" @click="changeN(0)" :class="thisjilu==0?'active':''">
        {{$t("message.fa")}}
      </div>
      <div class="item" @click="changeN(1)" :class="thisjilu==1?'active':''">
        {{$t("message.shou")}}
      </div>
    </div>
    <div v-show="thisjilu==0">
      <div class="banner">
        <p class="bannertxt">{{userInfo.name}} {{$t("message.issued")}}</p>
        <p class="bannernum"><span>{{data.out_packet_sum}}</span> EOS</p>
      </div>
      <div class="top">
        <div>
          <p>{{data.out_packet_count}}</p>
          <p>{{$t("message.fabao")}}</p>
        </div>
        <div>
          <p>{{data.out_chailei_count}}</p>
          <p>{{$t("message.shoucai")}}</p>
        </div>
      </div>
      <cube-scroll class="recordHair" ref="scroll">
        <ul v-if="outlist&&outlist.length>0">
          <li class="recordlist" :key="index" v-for="(item,index) in outlist" @click="golist(item)">
            <p>
              <span class="name">{{item.issus_sum}}EOS</span>
              <span class="num">{{item.status==1?`${$t("message.jinxin")}...`:`10/10${$t("message.packet")}`}}</span>
            </p>
            <p>
              <span class="time">{{item.created_at1}}</span>
              <span class="img" v-if="item.status!=1&&item.chailei_count>0">
                <img src="../common/images/icon26.png">
                <b v-if="item.chailei_count>1">x{{item.chailei_count}}</b>
              </span>
            </p>
          </li>
          <p class="itemtxt"  v-if="inlist&&inlist.length>=20">{{$t("message.baoliu")}}</p>
        </ul>
        <div v-else class="recordnone">
          <p>{{$t("message.sendbtn")}}>></p>
        </div>
      </cube-scroll>
    </div>
    <div v-show="thisjilu==1">
      <div class="banner">
        <p class="bannertxt">{{userInfo.name}} {{$t("message.gohuo")}}</p>
        <p class="bannernum"><span>{{data.in_packet_sum}}</span> EOS</p>
      </div>
      <div class="top">
        <div>
          <p>{{data.in_packet_count}}</p>
          <p>{{$t("message.qiangdao")}}</p>
        </div>
        <div>
          <p>{{data.in_chailei_count}}</p>
          <p>{{$t("message.steptitle")}}</p>
        </div>
      </div>
      <cube-scroll class="recordHair" ref="scroll">
        <ul v-if="inlist&&inlist.length>0">
          <li class="recordlist" :key="index" v-for="(item,index) in inlist" @click="golist(item)">
            <div>
              <p class="name">
                {{item.fa_name}}
                <span>{{$t("message.debao")}}</span>
              </p>
              <p class="money">
                <span class="orange">{{item.income_sum}}</span>&nbsp;EOS+<span class="orange">{{item.own}}</span>&nbsp;OWN
              </p>
            </div>
            <p>
              <span class="time">{{item.created_at1}}</span>
              <span class="img">
                <img v-if="item.is_chailei == 1" src="../common/images/icon26.png">
                <img v-if="item.reward_type > 0" :src="typeImg[item.reward_type]">
              </span>
            </p>
          </li>
          <p v-if="inlist&&inlist.length>=20" class="itemtxt">{{$t("message.baoliu")}}</p>
        </ul>
        <div v-else class="recordnone">
          <p>{{$t("message.qiangbtn")}}>></p>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import smallhead from '@/components/smallhead.vue'
import {changedata} from "@common/js"
import {mapGetters,mapMutations} from 'vuex';
import {get} from "@api"
import {SET_LOADING,SET_THISJULU} from "@store/mutation-types"
export default {
  created(){
    this.SET_LOADING(true)
    this.getinfo()
  },
  data(){
    return{
      data:{
        out_packet_sum: "0.0000",
        out_packet_count: 0,
        out_chailei_count: 0,
        in_packet_sum: "0.0000",
        in_packet_count: 0,
        in_chailei_count: 0
      }, //信息
      outlist:[],
      inlist:[],
      qingqiu:false //是否在请求数据
    }
  },
  components: {
    smallhead
  },
  methods:{
    ...mapMutations({
      SET_LOADING,
      SET_THISJULU
    }),
    changeN(i){
      this.SET_THISJULU(i)
      setTimeout(()=>{
        this.$refs.scroll.refresh()
      },10)
    },
    // 获取列表信息
    getinfo(time){
      this.qingqiu = true
      get('/my_packet').then(json=>{
        this.SET_LOADING(false)
        console.log(json)
        this.data = json.data
        if(Object.keys(json.data.out_list).length != 0){
          this.outlist = json.data.out_list.map((val,i)=>{
            return {
              ...val,
              created_at1:changedata(val.created_at*1000,'MM-dd hh:mm')
            }
          })
        }
        if(Object.keys(json.data.in_list).length != 0){
          this.inlist = json.data.in_list.map((val,i)=>{
            return {
              ...val,
              created_at1:changedata(val.created_at*1000,'MM-dd hh:mm')
            }
          })
        }
      })
    },
    golist(item){
      this.$router.push({
        name: 'record-this',
        params: this.thisjilu==0?{
          txId:item.blocknumber,
          name:item.user.name,
          num:item.tail_number,
          time:item.created_at*1000
        }:{
          txId:item.outblocknumber,
          name:item.fa_name,
          num:item.tail_number,
          time:item.created_at*1000
        }
      })
    },
  },
  computed:{
    ...mapGetters([
      "userInfo",
      "thisjilu"
    ]),
    typeImg(){
      return ['',require('../common/images/icon22.png'),require('../common/images/icon23.png'),require('../common/images/icon27.png'),require('../common/images/icon25.png'),require('../common/images/icon24.png')]
    }
  }
}
</script>

