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
    height 10.82rem
    text-align center
    color #222222
    position relative
    z-index 1
    box-sizing border-box
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
      margin-top 1.2rem
      li
        flex 1
        p
          color #b2b2b2
          &:first-of-type
            font-size 0.72rem
          &:last-of-type
            font-size 0.48rem  
            margin-top 0.2rem
    .time
      color #d87307
      font-size 0.56rem
      position absolute
      right 0.8rem
      top 4.2rem
      cursor pointer
  .bottom
    background #ffffff
    position relative
    border-top 0.04rem solid #e8e8e8
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
  .hide
    display none
  .bottomtxt
    text-align center
    font-size 0.56rem
    color #333333
    margin-top 2.4rem
</style>

<template>
  <div class="alljilu fullscreen">
    <smallhead ref="smallhead" left="guanbi" :center='$t("message.fa")' right="more"></smallhead>
    <cube-scroll class="recordHair" ref="scroll"
      :options="scrollOptions"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <div class="top">
        <div class="toptitle">
          <span @click="tomore" class="more icon icon-moreread"></span>
          <p>{{$t("message.fa")}}</p>
        </div>
        <p class="name">{{userInfo.name}}{{$t("message.issued")}}</p>
        <p class="allprice">{{data.outpacketsum}}EOS</p>
        <ul class="flex tablebox">
          <li>
            <p>{{data.outpacketcount}}</p>
            <p>{{$t("message.fabao")}}</p>
          </li>
          <li>
            <p>{{data.chaileicount}}</p>
            <p>{{$t("message.shoucai")}}</p>
          </li>
        </ul>
        <span class="time" @click="showDatePicker">{{thisdata}}</span>
      </div>
      <ul class="bottom" v-if="list.length">
        <li :key="index" v-for="(item,index) in list">
          <div class="info flex" @click="golist(item)">
            <div class="left">
              <p class="name">{{item.issus_sum}}EOS</p>
              <p class="time">{{item.created_at}}</p>
            </div>
            <div class="right">
              <p class="price">10/10</p>
              <p class="num1"></p>
            </div>
          </div>
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
import {get} from "@api"
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
      timer:false,//时间选择展示
      data:{
        outpacketsum: "00.0000",
        outpacketcount: 0,
        chaileicount: 0
      }, //信息
      list:[],//列表
      timej:{}, //时间区间
      more:false ,
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
      get('/my_issus_packet').then((val)=>{
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
        this.model = newtime
        // let time = date.formatDate(newtime, 'X')
        let time = 0
        this.getinfo(time)
      }
      this.timer = false
    },
    golist(item){
      this.$router.push({
        name: 'record-this',
        params: {
          txId:item.blocknumber,
          name:item.user.name,
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
          page:1
        }
      }else{
        data = {
          page:this.page+1
        }
      }
      get('/my_issus_packet',data).then((val)=>{
        this.SET_LOADING(false)
        console.log(val)
        this.qingqiu = false
        this.data = val
        this.page = val.meta.current_page
        console.log(this.page)
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
      // return  `${date.formatDate(this.model, 'MM')}月${date.formatDate(this.model, 'DD')}日`
      return changedata(this.model,'MM月dd日')
    },
    ...mapGetters([
      "userInfo"
    ])
  }
}
</script>

