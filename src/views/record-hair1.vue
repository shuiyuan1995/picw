<style lang="stylus" scoped>
  .recordHair
    max-width 16rem
    margin  0 auto
    background #ffffff
  .fixed-top
    z-index 999
  .smallhead
    background #c7422f
    color #ffba41
  .top
    background url("../common/images/bg3.jpg") no-repeat top
    background-size 100% 100%
    height 10.82rem
    padding-top 5.78rem
    text-align center
    color #222222
    position relative
    z-index 1
    .name
      font-size 0.72rem
    .allprice
      font-size 1.2rem
      margin-top 0.7rem
      font-weight bold
      span 
        font-size 0.96rem
    .tablebox
      margin-top 0.7rem
      li
        flex 1
        p
          color #b2b2b2
          &:first-of-type
            font-size 0.72rem
          &:last-of-type
            font-size 0.48rem  
    .time
      color #d87307
      font-size 0.56rem
      position absolute
      right 0.8rem
      top 4.6rem
      cursor pointer
  .bottom
    background #ffffff
    position relative
    border-top 0.04rem solid #e8e8e8
    padding-bottom 1.6rem
    li
      border-bottom 0.04rem solid #e8e8e8
      padding 0.68rem 0.8rem
      .info
        justify-content space-between
      .name,.price
        font-size 14px
        color #222222
      .time,.num1
        font-size 0.48rem
        color #999999
        margin-top 0.16rem
      .num1
        text-align right
    .more
      position absolute
      bottom 0
      text-align center
      font-size 0.64rem
      text-align center
      width 100%
      padding 10px 0 10px
  .bottomtxt
    text-align center
    font-size 0.56rem
    color #333333
    margin-top 2.4rem
</style>

<template>
  <div class="recordHair fullscreen scroll" ref="myscroll" @scroll="scrollHandler" @click="$refs.smallhead.open()">
    <smallhead ref="smallhead" :title="`${thislang.fa}`" class="fixed-top" right="jilui" left="guan"></smallhead>
    <div class="top">
      <p class="name">{{data.name}}{{thislang.issued}}</p>
      <p class="allprice">{{data.outpacketsum}}EOS</p>
      <ul class="flex tablebox">
        <li>
          <p>{{data.outpacketcount}}</p>
          <p>{{thislang.fabao}}</p>
        </li>
        <li>
          <p>{{data.chaileicount}}</p>
          <p>{{thislang.shoucai}}</p>
        </li>
      </ul>
      <span class="time" @click="timer = !timer">{{thisdata}}</span>
    </div>
    <ul class="bottom" v-if="list&&list.length>0">
      <li :key="index" v-for="(item,index) in list">
        <!-- <li :key="index" v-for="(item,index) in 15"> -->
        <!-- <div class="info flex" @click="$router.push(`/record-this/${Number(item.eosid)}`)"> -->
        <div class="info flex" @click="golist(item)">
          <div class="left">
            <p class="name">{{item.user.name}}EOS</p>
            <p class="time">{{item.created_at}}</p>
          </div>
          <div class="right">
            <p class="price">10/10</p>
            <p class="num1"></p>
          </div>
        </div>
      </li>
      <li class="more" v-show="more">{{data.meta.current_page>=data.meta.last_page?'到底了':'数据加载中'}}</li>
    </ul>
    <p class="bottomtxt" v-else>暂无数据</p>
    <datetime v-show="timer" @newtime="newtime" :timej="timej"></datetime>
  </div>
</template>

<script>
import smallhead from '@/components/smallhead.vue'
import datetime from '@/components/datetime.vue'
import { date } from 'quasar'
import {mapGetters} from 'vuex';
import {post} from '../api'
export default {
  created(){
    // 判断登录
    if(this.infos.name.length == 0){
      alert('请先登录')
      this.$router.push('/')
      return false
    }
    this.getinfo()
  },
  data(){
    return{
      model:new Date(),//时间
      timer:false,//时间选择展示
      data:{}, //信息
      list:[],//列表
      timej:{}, //时间区间
      more:false ,
      page:0,//页码
      qingqiu:false //是否在请求数据
    }
  },
  components: {
    smallhead,
    datetime
  },
  methods:{
     // 获取新时间
    newtime(newtime){
      if(newtime){
        this.model = newtime
        let time = date.formatDate(newtime, 'X')
        this.getinfo(time)
      }
      this.timer = false
    },
    golist(item){
      this.$router.push({
        name: 'record-this',
        params: {
          txId:item.blocknumber
        }
      })
    },
    // 获取列表信息
    getinfo(time){
      this.qingqiu = true
      let data = {}
      if(time){
        data = {
          token:this.infos.token,
          userid:this.infos.userid,
          time:time,
          page:this.page+1
        }
      }else{
        data = {
          token:this.infos.token,
          userid:this.infos.userid,
          page:this.page+1
        }
      }
      post('/my_issus_packet',data).then((val)=>{
        this.qingqiu = false
        console.log(val)
        this.data = val
        this.list = [
          ...this.list,
          ...val.data
        ]
        this.page = val.meta.current_page
        if(Object.keys(val.data).length != 0){
          this.data.data = val.data.map((val,i)=>{
            return {
              ...val,
              created_at:date.formatDate(val.created_at*1000, 'HH:mm:ss')
            }
          })
        }
        this.timej = {
          first:val.last_time*1000,
          last:val.max_time*1000
        }
      })
    },
    scrollHandler(e){
      console.log(this.$refs.myscroll.scrollHeight-scrollTop-this.$refs.myscroll.offsetHeight < 30)
      let scrollTop = e.target.pageYOffset || e.target.scrollTop
      if(this.$refs.myscroll.scrollHeight-scrollTop-this.$refs.myscroll.offsetHeight < 30){
        this.more = true
        if(this.qingqiu||this.data.meta.last_page&&this.page>=this.data.meta.last_page){
          return false
        }else{
          this.getinfo()
        }
      }else{
        this.more = false
      }
    }
  },
  computed:{
    // 时间转换
    thisdata(){
      return  `${date.formatDate(this.model, 'MM')}月${date.formatDate(this.model, 'DD')}日`
    },
    ...mapGetters([
      "thislang","infos"
    ])
  }
}
</script>

