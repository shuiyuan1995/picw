<style lang="stylus" scoped>
  .results
    margin-bottom 0.56rem
  .sendname
    font-size 12px
    margin-bottom 0.32rem
    width 100%
  .txtinfo 
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
    .img 
      width: 0.42rem;
      height: 0.52rem;
      position absolute
      top 0.16rem
      left 0.2rem
    .img1
      width: 0.82rem;
      height: 0.68rem;
      position absolute
      top 0.04rem
      left 0.12rem
</style>

<template>
  <div class="results">
    <p class="sendname">BruceWC12345的红包:</p>
    <p class="txtinfo" :key="index" v-for="(item,index) in 10"><img class="img" src="../common/images/bao.png">Zhongyi120你领取了红包，获得0.0162 EOS</p>
    <p class="txtinfo">childbirdeos抽中：对子，获得0.0162 EOS</p>
    <p class="txtinfo"><img class="img1" src="../common/images/lei.png">childbirDTEH 踩雷，Brecedgj1244获得1 EOS</p>
  </div>
</template>

<script>
export default {
  props:{
    item:{
      type:Object
    }
  },
}
</script>
