<style lang="stylus" scoped>
.dantiao
  margin 0.3rem 0 0.1rem
  div
    display flex
    height 0.8rem
    justify-content center
    align-items center
    margin-bottom 0.2rem
    p
      display flex
      align-items center
      background-color #dddddd
      font-size 0.48rem
      color #ffffff
      padding 0 0.4rem
      border-radius 0.2rem
      height 0.8rem
      line-height 0.8rem
    span 
      font-size 0.48rem
.red
  color #e51c23
.bao
  img 
    width 0.4rem
    height 0.52rem
    margin-right 0.16rem
.lei
  img 
    width: 1.52rem
    height: 0.54rem
    margin-left 0.16rem
</style>

<template>
  <div class="dantiao">
    <div class="bao"><p><img src="../common/images/bao.png"><span>{{item.name1}}领取了{{item.name}}的</span><span class="red">红包</span></p></div>
    <div class="lei" v-if="item.is_chailei == 1"><p><span>{{item.name1}}</span><img src="../common/images/icon26.png"></p></div>
    <div class="lei" v-if="item.reward_type > 0"><p><span>{{item.name1}}抽中了</span><img :src="typeImg[item.reward_type]"></p></div>
  </div>
</template>

<script>
export default {
  props:{
    item:{
      type:Object
    },
  },
  computed:{
    typeImg(){
      return ['',require('../common/images/icon22.png'),require('../common/images/icon23.png'),require('../common/images/icon27.png'),require('../common/images/icon25.png'),require('../common/images/icon24.png')]
    }
  }
}
</script>
