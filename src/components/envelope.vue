<style lang="stylus" scoped>
  html
  .envelope
    background url(../common/images/bg1.jpg) no-repeat top
    padding-bottom 2rem
    box-sizing border-box
    .drawertitle
      height 2rem
      background rgba(#e10310,0.8)
      color #ffffff
    .top
      height 9.42rem
      margin-top 2rem
      background url(../common/images/bg2.jpg) no-repeat top
      background-size 100%
      .index
        font-size 0.48rem
        font-weight 600
        color #ffc600
        position absolute
        top 8.2rem
        left 6.56rem
        transform rotate(-30deg)
        span 
          font-size 0.84rem
      .money
        font-size 16px
        font-weight 600
        position absolute
        top 10.1rem
        color #333333
        width 100%
        margin-left -0.24rem
    .content
      background-size 100%
      padding 0.04rem 0.8rem 0 0.8rem
      align-items center
      .title
        font-size 1.2rem
        font-weight 600
        margin-top 1.68rem
      .h2
        font-size 0.56rem
        color #f7f7f7
        margin 10px 0 30px
        text-align center
      img 
        width 1.52rem
        height 2.26rem
      .money1
        font-size 21px
        font-weight 600
        color #f7f7f7
        margin 0.66rem 0 1.74rem
        span 
          font-weight 600
      .record
        margin-top 0.56rem
        font-size 0.56rem
        color #e59100
      .gobtn
        width 100%
        background-color #56b416
        height 1.82rem
        border-radius 1.84rem
        font-size 0.64rem
        color #ffffff
        font-weight 600
        box-sizing border-box
    .good
      .title
        color #21ff0a
      .money1 span 
        color #21ff0a
    .back
      .title
        color #e30714
      .money1 span 
        color #e30714
      .num
        color: #e30714;
      .gobtn
        background #e30714
</style>

<template>
  <div class="envelope scroll">
    <smallhead class="drawertitle fixed-top" title='EOS 红包' :share="true"></smallhead>
    <div class="top">
      <p class="index">NO.<span>6</span></p>
      <p class="money text-center">1 EOS</p>
    </div>
    <div class="content column" :class="win?'good':'back'">
      <p class="title">{{win?thislang.goodtitle:thislang.backtitle}}</p>
      <p class="h2" v-if="win">{{thislang.results}}</p>
      <p class="h2" v-else>{{thislang.results1}}<span class="num">6</span>,{{thislang.results2}}<span>1</span>EOS{{thislang.results3}}<span>1</span>EOS</p>
      <img src="../common/images/icon8.png">
      <p class="money1">0.009<span>8</span></p>
      <q-btn :label="thislang.ok" class="gobtn" @click="$parent.myshow()"/>
      <p class="record">查看红包记录</p>
    </div>
  </div>
</template>

<script>
import smallhead from '@/components/smallhead.vue'
import {mapGetters} from 'vuex';
export default {
  props:{
    win:{
      type:Boolean
    }
  },
  components:{
    smallhead
  },
  computed:{
    ...mapGetters([
      "thislang"
    ])
  },
}
</script>
