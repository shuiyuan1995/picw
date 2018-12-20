<style lang="stylus" scoped>
  @import "../common/styl/index";
  .alljilu
    background #ffffff
    padding-top 1.99rem
  .recordHair
    max-width 16rem
    margin  0 auto
    background #ffffff
    min-height 100%
  .smallhead
    background #c7422f
    color #ffba41
  .fixed-top
    z-index 999
  .top
    background #f0f0f0 url($imgUrl+"bg5.png") no-repeat top
    background-size 100% auto
    min-height 10.82rem
    padding-top 4.78rem
    text-align center
    color #222222
    position relative
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
        flex 0 0 33%
        margin 0.4rem 0
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
      top 3.6rem
      cursor pointer
  .bottom
    border-top 0.04rem solid #e8e8e8
    background #ffffff
    position relative
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
      .txtinfo
        text-align center
        span
          position relative
          height: 0.82rem;
          line-height 0.82rem;
          background-color: #dddddd;
          display inline-block
          border-radius: 0.2rem;
          font-size 0.48rem
          padding 0 0.28rem 0 0.7rem
          color: #ffffff;
          margin-left 0.4rem
          z-index 0
        .img1
          width: 0.82rem;
          height: 0.68rem;
          position absolute
          top 0.04rem
          left 0.12rem
          z-index 0
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
  <div class="alljilu fullscreen scroll" ref="myscroll" @scroll="scrollHandler" @click="$refs.smallhead.open()">
    <smallhead ref="smallhead" :title='$t("message.shou")' class="fixed-top" right="jilui" left="guan"></smallhead>
    <q-pull-to-refresh  :handler="refresher"
      :inline="true"
      :distance="10"
      pull-message="下拉刷新"
      refresh-message="正在刷新"
      release-message="释放刷新"
      class="recordHair text-justify" 
      >
      <div class="top">
        <p class="name">{{data.name}}{{$t("message.gohuo")}}<br />{{data.packetcount}}{{$t("message.ge")}}</p>
        <p class="allprice">{{data.packetsum?Number(data.packetsum).toFixed(4):(0).toFixed(4)}} EOS</p>
        <ul class="flex tablebox">
          <li>
            <p>{{data.paris?data.paris:0}}</p>
            <p>{{$t("message.dui")}}</p>
          </li>
          <li>
            <p>{{data.three?data.three:0}}</p>
            <p>{{$t("message.san")}}</p>
          </li>
          <li>
            <p>{{data.int?data.int:0}}</p>
            <p>{{$t("message.zhen")}}</p>
          </li>
          <li>
            <p>{{data.shunzi?data.shunzi:0}}</p>
            <p>{{$t("message.shun")}}</p>
          </li>
          <li>
            <p>{{data.bomb?data.bomb:0}}</p>
            <p>{{$t("message.si")}}</p>
          </li>
          <li>
            <p>{{data.chailei?data.chailei:0}}</p>
            <p>{{$t("message.steptitle")}}</p>
          </li>
        </ul>
        <span class="time" @click="timer = !timer">{{thisdata}}</span>
      </div>
      <ul class="bottom" v-if="list&&list.length>0">
        <li :key="index" v-for="(item,index) in list">
          <div class="info flex" @click="golist(item)">
            <div class="left">
              <p class="name">{{item.outpacket_sum}}EOS</p>
              <p class="time">{{item.created_at}}</p>
            </div>
            <div class="right">
              <p class="price">{{Number(item.income_sum)>0?item.income_sum:'待同步'}}EOS</p>
              <p class="num1"></p>
            </div>
          </div>
          <p v-show="item.reward_type>0" class="txtinfo"><span>{{$t("message.zhong")}}：{{typetxt[item.reward_type]}}，{{$t("message.huo")}}{{item.reward_sum}} EOS</span></p>
          <p v-show="item.is_chailei==1" class="txtinfo"><span><img class="img1" src="../common/images/lei.png">{{$t("message.steptitle")}}，{{$t("message.fu")}}{{item.outpacket_sum}} EOS</span></p>
        </li>
        <li class="more" v-show="more">{{data.meta.current_page>=data.meta.last_page?$t("message.di"):$t("message.loading")}}</li>
      </ul>
      <p class="bottomtxt" v-else>{{$t("message.wu")}}</p>
    </q-pull-to-refresh>
    <datetime v-show="timer" @newtime="newtime" :timej="timej"></datetime>
  </div>
</template>

<script>
import smallhead from '@/components/smallhead.vue'
import datetime from '@/components/datetime.vue'
import { date } from 'quasar'
import {mapGetters} from 'vuex';
import {get} from '../api'
export default {
  created(){
    this.getinfo()
  },
  data(){
    return{
      model:new Date(),//时间
      timer:false, //时间选择展示
      data:{}, //信息
      list:[],//列表
      timej:{}, //时间区间
      more:false,
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
        let time = date.formatDate(newtime, 'X')
        this.getinfo(time)
        this.model = newtime
      }
      this.timer = false
    },
    golist(item){
      this.$router.push({
        name: 'record-this',
        params: {
          txId:item.outblocknumber,
          name:item.user,
          num:item.tail_number
        }
      })
    },
    // 获取列表信息
    getinfo(time){
      this.qingqiu = true
      let data = {}
      if(time){
        data = {
          time:time,
          page:this.page+1
        }
      }else{
        data = {
          page:this.page+1
        }
      }
      this.$q.loading.show();
      get('/my_income_packet',data).then((val)=>{
        console.log(val)
        this.$q.loading.hide();
        this.qingqiu = false
        this.data = val
        this.page = val.meta.current_page
        if(Object.keys(val.data).length != 0){
          this.data.data = val.data.map((val,i)=>{
          return {
            ...val,
            created_at:date.formatDate(val.created_at*1000, 'HH:mm:ss')
          }
        })
        this.list = [
          ...this.list,
          ...this.data.data
        ]
        }
        this.timej = {
          first:val.last_time*1000,
          last:val.max_time*1000
        }
      })
    },
    refresher(done){
      this.qingqiu = true
      get('/my_income_packet').then((val)=>{
        console.log(val)
        done()
        this.qingqiu = false
        this.data = val
        this.page = val.meta.current_page
        if(Object.keys(val.data).length != 0){
          this.list = val.data.map((val,i)=>{
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
    // 奖励类型判断
    typetxt(){
      return ['',this.$t("message.dui"),this.$t("message.san"),this.$t("message.zhen"),this.$t("message.shun"),this.$t("message.si")]
    },
    ...mapGetters([
      "userInfo"
    ]),
  }
}
</script>

