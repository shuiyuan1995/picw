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
    background url($imgUrl+"chun1.png") no-repeat center
    background-size 100% 100%
    padding-top 1.12rem
    box-sizing border-box
    margin-top 0.6rem
    &.bannerq
      background url($imgUrl+"chun2.png") no-repeat center
      background-size 100% 100%
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
        color #eb0000
      p:last-of-type
        font-size 0.48rem
        margin-top 0.1rem
      &:last-of-type p:first-of-type
        color #ff8400
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
        <p class="bannernum"><span>{{send_money}}</span> {{thismoney.name}}</p>
      </div>
      <div class="top">
        <div>
          <p>{{send_num}}</p>
          <p>{{$t("message.fabao")}}</p>
        </div>
        <div>
          <p>{{send_lei}}</p>
          <p>{{$t("message.shoucai")}}</p>
        </div>
      </div>
      <cube-scroll class="recordHair" ref="scroll">
        <ul v-if="send_data&&send_data.length>0">
          <li class="recordlist" :key="index" v-for="(item,index) in send_data" @click="golist(item)">
            <p>
              <span class="name">{{item.money}}{{thismoney.name}}</span>
              <span class="num">{{item.status==1?`${$t("message.jinxin")}...`:`10/10${$t("message.packet")}`}}</span>
            </p>
            <p>
              <span class="time">{{item.time}}</span>
              <span class="img" v-if="item.status!=1&&item.lei_num>0">
                <img src="../assets/images/icon26.png">
                <b v-if="item.lei_num>1">x{{item.lei_num}}</b>
              </span>
            </p>
          </li>
          <p class="itemtxt"  v-if="send_data&&send_data.length>=20">{{$t("message.baoliu")}}</p>
        </ul>
        <div v-else class="recordnone">
          <p>{{$t("message.sendbtn")}}>></p>
        </div>
      </cube-scroll>
    </div>
    <div v-show="thisjilu==1">
      <div class="banner bannerq">
        <p class="bannertxt">{{userInfo.name}} {{$t("message.gohuo")}}</p>
        <p class="bannernum"><span>{{get_money}}</span> {{thismoney.name}}</p>
      </div>
      <div class="top">
        <div>
          <p>{{get_num}}</p>
          <p>{{$t("message.qiangdao")}}</p>
        </div>
        <div>
          <p>{{get_lei}}</p>
          <p>{{$t("message.steptitle")}}</p>
        </div>
      </div>
      <cube-scroll class="recordHair" ref="scroll">
        <ul v-if="get_data&&get_data.length>0">
          <li class="recordlist" :key="index" v-for="(item,index) in get_data" @click="golist(item)">
            <div>
              <p class="name">
                {{item.account}}
                <span>{{$t("message.debao")}}</span>
              </p>
              <p class="money">
                <span class="orange">{{item.money}}</span>&nbsp;{{thismoney.name}}
              </p>
            </div>
            <p>
              <span class="time">{{item.time}}</span>
              <span class="img">
                <img v-if="item.is_lei" src="../assets/images/icon26.png">
                <img v-if="item.reward_type > 0" :src="typeImg[item.reward_type]">
              </span>
            </p>
          </li>
          <p v-if="get_data&&get_data.length>=20" class="itemtxt">{{$t("message.baoliu")}}</p>
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
      //信息
      send_lei:0,
      send_num:0,
      get_lei:0,
      get_num:0,
      get_money:0.0000,
      send_money:0.0000,
      send_data:[],
      get_data:[],
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
      get('/recode').then(json=>{
        this.SET_LOADING(false)
        const {send_lei,send_num,get_lei,get_num,get_money,send_money,send_data,get_data} = json.data
        this.send_lei = send_lei;
        this.send_num = send_num;
        this.get_lei = get_lei;
        this.get_num = get_num;
        this.get_money = get_money;
        this.send_money = send_money;
        this.send_data = send_data;
        this.get_data = get_data;
        return false
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
          packetId:item.packetId,
          name:this.userInfo.name,
          num:item.num,
          time:item.time,
          sum:item.money,
          status:item.status
        }:{
          packetId:item.packetId,
          name:item.account,
          num:item.num,
          time:item.time,
          sum:item.sum,
          status:item.status
        }
      })
    },
  },
  computed:{
    ...mapGetters([
      "userInfo",
      "thisjilu",
      "thismoney"
    ]),
    typeImg(){
      return ['',require('../assets/images/icon22.png'),require('../assets/images/icon23.png'),require('../assets/images/icon27.png'),require('../assets/images/icon25.png'),require('../assets/images/icon24.png')]
    }
  }
}
</script>

