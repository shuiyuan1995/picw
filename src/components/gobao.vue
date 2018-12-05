<style lang="stylus" scoped>
  .bg
    background rgba(#000000,0.4)
    z-index 999
  .gobao
    width: 13.4rem;
    min-height: 15.76rem;
    background #d65c44 url("../common/images/baobottom.png") no-repeat bottom
    background-size 100%
    z-index 1000
    align-items center
    justify-content space-between
    flex-wrap nowrap
    padding-top 1.2rem
    .baotop
      flex 1
      align-items center
      justify-content center
      flex-wrap nowrap
    .baobottom
      padding-bottom 0.96rem
      text-align center
      margin-top 0.8rem
    .title
      margin 1.04rem 0 0.4rem;
      font-size: 1.44rem;
      color: #ffba41;
    .h2,.h3
      font-size: 0.6rem;
      color: #ffe8c1;
      padding 0 0.8rem
      line-height 0.7rem
    .h2
      height 2.24rem
    .h3
      height 0.5rem
    img 
      width: 1.14rem;
      height: 1.72rem;
      margin 0 0 0.4rem
    .money1
      font-size 0.96rem
      color: #ffba41;
    .gobtn
      width: 11.16rem;
      background-color #ffe8c1
      height 1.6rem
      border-radius 1.84rem
      font-size 0.64rem
      color: #d65c44;
      font-weight bold
      margin-top 1.38rem
    .share
      position absolute
      color: #ffe8c1;
      top 0.4rem
      right 0.4rem
      font-size 0.72rem
      cursor pointer
    .toview
      font-size 0.48rem
      margin-top 0.8rem
      color #ffe8c1
      cursor pointer
    .over
      color: #ffba41;
      font-size 0.84rem
      margin 0.64rem 0 1.08rem
</style>

<template>
  <div class="fullscreen">
    <div class="bg fullscreen" @click="$emit('myshow')"></div>
    <div class="gobao fixed-center column">
      <div class="baotop column">
        <img src="../common/images/icon8.png">
        <p class="money1" v-if="win[0] != 0">0.0098</p>
        <p class="title" v-if="win[1] || win[0] == 1">恭喜你!</p>
        <p class="h3" v-if="win[1]">抽中：对子，将再获得0.0162 EOS</p>
        <p class="title" v-if="win[0] == 2">糟糕，踩到雷了!</p>
        <p class="h2" v-if="win[0] == 2">您抢到的EOS尾数=红包的号码<span class="num">6</span>,<br/>{{thislang.results2}}<span>1</span>EOS{{thislang.results3}}<span>1</span>EOS</p>
        <p class="over" v-if="win[0] == 0">手慢了!红包已被抢完!</p>
      </div>
      <div class="baobottom">
        <q-btn :label="thislang.ok" class="gobtn" @click="$emit('myshow')"/>
        <p class="toview" @click="$router.push('/record-this')">查看领取记录>></p>
      </div>
      <span class="share icon icon-fenxiang3"></span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  props:{
    win:{
      type:Array
    }
  },
  computed:{
    ...mapGetters([
      "thislang"
    ]),
  }
}
</script>
