<style lang="stylus" scoped>
  .fullscreen
    position absolute
    top 0
    width 100%
    height 100%
    overflow hidden
  .cooperation
    background #ffffff
    max-width 16rem
    margin  0 auto
  h2
    padding 1.24rem 0 0.4rem 0.96rem
    border-bottom 1px solid #dddddd
    color #333333
    font-size 0.64rem
  ul
    padding 0 0.8rem
    justify-content space-between
    .img
      margin-top 0.8rem
      height 1.32rem
      img 
        height 1.32rem
    .img1
      height 2.16rem
      margin-bottom 0.6rem
      img 
        height 2.16rem
  .zhan
    margin-bottom 1rem
  .top
    position absolute
    top 2rem
    bottom 0rem
    width 100%
    height auto
    box-sizing border-box
    .topin
      height 26.48rem
  .flex
    display flex
    flex-wrap wrap
</style>

<template>
  <div class="cooperation fullscreen">
    <smallhead  class="fixed-top" left="huitui" :center='$t("message.hezuo")' ></smallhead>
    <cube-scroll class="top">
      <div class="topin">
        <h2>EOS {{$t("message.qian")}}</h2>
        <ul class="flex">
          <li class="img" :key="index" v-for="(item,index) in theimg"><img :src="item"></li>
        </ul>
        <h2 class="zhan">{{$t("message.heji")}}</h2>
        <ul class="flex">
          <li class="img1" :key="index" v-for="(item,index) in theimg1"><img :src="item"></li>
        </ul>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
import smallhead from '@/components/smallhead.vue'
import {imgUrl} from "@common/js"
export default {
  components: {
    smallhead
  },
  computed:{
    theimg(){
      let a = []
      for(let i = 0;i<4;i++){
        a = [...a,`${imgUrl}img${i==0?'':i}.png`]
      }
      return a
    },
    theimg1(){
      let a = []
      for(let i = 4;i<22;i++){
        a = [...a,`${imgUrl}img${i==0?'':i}.png`]
      }
      return a
    }
  },
}
</script>
