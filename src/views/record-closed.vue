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
  .recordHair
    position absolute
    top 2rem
    bottom 0rem
    width 100%
    height auto
    max-width 16rem
    margin -1px auto
    background #ffffff
    font-size 0.48rem
  .fixed-top
    z-index 999
  .top
    background #f1f1f1 url("../common/images/bg5.png") no-repeat top
    background-size 100% auto
    min-height 7.82rem
    text-align center
    color #222222
    position relative
    padding-top 0.52rem
    .toptitle
      font-size 0.72rem
      color #ffba41
      margin-bottom 4rem
      position relative
      .more
        position absolute
        right 0.8rem
        top -0.16rem
        font-size 1.12rem
      p
        font-weight bold
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
      flex-wrap wrap
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
      top 4.2rem
      cursor pointer
  .bottom
    border-top 0.04rem solid #e8e8e8
    background #ffffff
    position relative
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
  <div class="alljilu fullscreen">
    <smallhead ref="smallhead" left="guanbi" :center='$t("message.shou")' right="more"></smallhead>
    <cube-scroll class="recordHair" ref="scroll"
      :options="scrollOptions"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <div class="top">
        <div class="toptitle">
          <span @click="tomore" class="more icon icon-moreread"></span>
          <p>{{$t("message.shou")}}</p>
        </div>
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
        <span class="time" @click="showDatePicker">{{thisdata}}</span>
      </div>
      <ul class="bottom" v-if="list&&list.length>0">
        <li :key="index" v-for="(item,index) in list">
          <div class="info flex" @click="golist(item)">
            <div class="left">
              <p class="name">{{item.outpacket_sum}}EOS</p>
              <p class="time">{{item.created_at}}</p>
            </div>
            <div class="right">
              <p class="price">{{Number(item.income_sum)>0?item.income_sum:"待同步"}}EOS</p>
              <p class="num1"></p>
            </div>
          </div>
          <p v-show="item.reward_type>0" class="txtinfo"><span>{{$t("message.zhong")}}：{{typetxt[item.reward_type]}}，{{$t("message.huo")}}{{item.reward_sum}} EOS</span></p>
          <p v-show="item.is_chailei==1" class="txtinfo"><span><img class="img1" src="../common/images/lei.png">{{$t("message.steptitle")}}，{{$t("message.fu")}}{{item.outpacket_sum}} EOS</span></p>
        </li>
      </ul>
      <p class="bottomtxt" v-else>{{$t("message.wu")}}</p>
    </cube-scroll>
  </div>
</template>

<script>
import smallhead from '@/components/smallhead.vue'
import {changedata} from "@common/js"
import {mapGetters,mapMutations} from 'vuex';
import {get} from '../api'
import {SET_LOADING} from "@store/mutation-types"
export default {
  created(){
    this.SET_LOADING(true)
    this.getinfo()
  },
  data(){
    return{
      scrollOptions:{
        pullDownRefresh: {
          threshold: 60,
          stop: 40,
          txt: '更新成功'
        },
        pullUpLoad:{
          threshold:40,
          txt: '加载成功'
        },
      },
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
    smallhead
  },
  methods:{
    ...mapMutations({
      SET_LOADING
    }),
    onPullingDown(){
      this.qingqiu = true
      get('/my_income_packet').then((val)=>{
        console.log(val)
        this.$refs.scroll.forceUpdate(true)
        this.qingqiu = false
        this.data = val
        this.page = val.meta.current_page
        console.log(this.page)
        if(Object.keys(val.data).length != 0){
          this.list = val.data.map((val,i)=>{
            return {
              ...val,
              created_at:changedata(val.created_at*1000,'hh:mm:ss')
            }
          })
        }
        this.timej = {
          first:val.last_time*1000,
          last:val.max_time*1000
        }
      })
    },
    onPullingUp(){
      if(!this.qingqiu&&this.data.meta.last_page&&this.page<this.data.meta.last_page){
        this.getinfo()
      }else{
        this.$refs.scroll.forceUpdate()
      }
    },
    // 获取新时间
    newtime(newtime){
      if(newtime){
        // let time = date.formatDate(newtime, 'X')
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
    tomore(){
      this.$createActionSheet({
        title: '红包记录',
        pickerStyle: true,
        active:this.$route.path == '/record-hair'?0:1,
        data: [
          {
            content: '发红包记录'
          },
          {
            content: '抢红包记录'
          }
        ],
        onSelect: (item, index) => {
          switch (index) {
            case 0:
              this.$router.push('/record-hair')
              break;
            default:
              this.$router.push('/record-closed')
              break;
          }
        }
      }).show()
    },
    // 获取列表信息
    getinfo(time){
      this.qingqiu = true
      let data = {}
      if(time){
        data = {
          time:time,
          page:1
        }
      }else{
        data = {
          page:this.page+1
        }
      }
      get('/my_income_packet',data).then((val)=>{
        console.log(val)
        this.SET_LOADING(false)
        console.log('89e')
        this.qingqiu = false
        this.data = val
        this.page = val.meta.current_page
        if(Object.keys(val.data).length != 0){
          this.data.data = val.data.map((val,i)=>{
            return {
              ...val,
              created_at:changedata(val.created_at*1000,'hh:mm:ss')
            }
          })
        }
        if(time){
          this.list = [
            ...this.data.data
          ]
        }else{
          this.list = [
            ...this.list,
            ...this.data.data
          ]
        }
        this.timej = {
          first:val.last_time*1000,
          last:val.max_time*1000
        }
        this.$nextTick(()=>{
          this.$refs.scroll.forceUpdate(true)
        })
      })
    },
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '选择日期',
          min: new Date(this.timej.first),
          max: new Date(this.timej.last),
          value: new Date(),
          onSelect: this.selectHandle
        })
      }
      this.datePicker.show()
    },
    selectHandle(date, selectedVal, selectedText) {
      this.model = date
      this.SET_LOADING(true)
      this.getinfo(date.getTime())
    },
  },
  computed:{
    // 时间转换
    thisdata(){
      return changedata(this.model,'MM月dd日')
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

