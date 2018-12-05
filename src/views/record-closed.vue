<style lang="stylus" scoped>
  .recordHair
    max-width 16rem
    margin  0 auto
  .top
    background #f0f0f0 url("../common/images/bg3.jpg") no-repeat top
    background-size 100% auto
    min-height 10.82rem
    padding-top 5.78rem
    text-align center
    color #222222
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
        flex 0 0 25%
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
      top 4.6rem
      cursor pointer
  .bottom
    border-top 0.04rem solid #e8e8e8
    background #ffffff
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
</style>

<template>
  <div class="recordHair fullscreen scroll">
    <record-head class="fixed-top" title="EOS 收包记录"></record-head>
    <div class="top">
      <p class="name">Yintao520共获得<br />386个红包</p>
      <p class="allprice">108.0986EOS</p>
      <ul class="flex tablebox">
        <li>
          <p>3</p>
          <p>最大奖</p>
        </li>
        <li>
          <p>23</p>
          <p>对子</p>
        </li>
        <li>
          <p>6</p>
          <p>三条</p>
        </li>
        <li>
          <p>8</p>
          <p>最小奖</p>
        </li>
        <li>
          <p>12</p>
          <p>整数</p>
        </li>
        <li>
          <p>5</p>
          <p>顺子</p>
        </li>
        <li>
          <p>15</p>
          <p>炸弹</p>
        </li>
        <li>
          <p>16</p>
          <p>踩雷</p>
        </li>
      </ul>
      <span class="time" @click="timer = !timer">{{thisdata}}</span>
    </div>
    <ul class="bottom">
      <li :key="index" v-for="(item,index) in 20">
        <div class="info flex">
          <div class="left">
            <p class="name">5EOS</p>
            <p class="time">12-23 12:27</p>
          </div>
          <div class="right">
            <p class="price">0.6587EOS</p>
            <p class="num1"></p>
          </div>
        </div>
      </li>
    </ul>
    <datetime v-show="timer" @newtime="newtime"></datetime>
  </div>
</template>

<script>
import recordHead from '@/components/recordHead.vue'
import datetime from '@/components/datetime.vue'
import { date } from 'quasar'
export default {
  data(){
    return{
      model:new Date(),//时间
      timer:false //时间选择展示
    }
  },
  components: {
    "record-head":recordHead,
    datetime
  },
  methods:{
    // 获取新时间
    newtime(newtime){
      if(newtime){
        this.model = newtime
      }
      this.timer = false
    }
  },
  computed:{
    // 时间转换
    thisdata(){
      return  `${date.formatDate(this.model, 'MM')}月${date.formatDate(this.model, 'DD')}日`
    }
  }
}
</script>

