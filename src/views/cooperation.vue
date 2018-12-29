<style lang="stylus" scoped>
  .cooperation
    background #ffffff
    padding-top 2rem
    padding-bottom 1.28rem
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
</style>

<template>
  <div class="cooperation fullscreen scroll">
    <smallhead  class="fixed-top" :title='$t("message.hezuo")' :right="false"></smallhead>
    <div class="top">
      <h2>EOS 钱包</h2>
      <ul class="flex">
        <li class="img" :key="index" v-for="(item,index) in theimg"><img :src="item"></li>
      </ul>
      <h2 class="zhan">战略合作机构</h2>
      <ul class="flex">
        <li class="img1" :key="index" v-for="(item,index) in theimg1"><img :src="item"></li>
      </ul>
    </div>
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
  }
}
</script>
