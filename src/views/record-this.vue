<style lang="stylus" scoped>
  .recordHair
    max-width 16rem
    margin  0 auto
  .fixed-top
    z-index 1000
  .top
    background url("../common/images/bg3.jpg") no-repeat top
    background-size 100% 100%
    height 10.82rem
    padding-top 5.78rem
    text-align center
    color #222222
    .name
      font-size 0.72rem
    .allprice
      font-size 1.2rem
      margin-top 1.14rem
      font-weight bold
    .num
      margin-top 0.32rem
      font-size 0.48rem
      color #b2b2b2;
      span 
        font-size 0.96rem
  .center
    padding 0 0.8rem
    height 1.38rem
    color #999999
    font-size 0.48rem
    line-height 1.38rem
    background #ffffff
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
</style>

<template>
  <div class="recordHair fullscreen scroll">
    <record-head class="fixed-top"></record-head>
    <div class="top">
      <p class="name">Yintao520共发出</p>
      <p class="allprice">5EOS</p>
      <p class="num">踩雷号码是 <span>6</span>！</p>
    </div>
    <div class="center">红包已领取10/10</div>
    <ul class="bottom">
      <li :key="index" v-for="(item,index) in 6">
        <div class="info flex">
          <div class="left">
            <p class="name">5EOS</p>
            <p class="time">12-23 12:27</p>
          </div>
          <div class="right">
            <p class="price">0.6587EOS</p>
            <p class="num1" ></p>
          </div>
        </div>
        <p class="txtinfo"><span>抽中：对子，获得0.0162 EOS</span></p>
        <p class="txtinfo"><span><img class="img1" src="../common/images/lei.png">踩雷，付出了1 EOS</span></p>
      </li>
    </ul>
  </div>
</template>

<script>
import recordHead from '@/components/recordHead.vue'
export default {
  components: {
    "record-head":recordHead
  },
}
</script>

