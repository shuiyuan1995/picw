<style lang="stylus" scoped>
.contant
  background #ffffff
  max-width 16rem
  margin  0 auto
.top
  background url("../common/images/img22.png") no-repeat center top
  background-size 100% auto
  height 100%
  margin-top 2rem
  padding-top 11.28rem
  p
    color #333333
    font-size 0.56rem
    text-align center
    font-weight bold
    margin-bottom 1.36rem
  img 
    width 1rem
    height 0.8rem
    margin 0 0.4rem
  .topinfo
    justify-content center
.er
  width 120px
  height 120px
  img 
    width 100%
    height 100%
</style>

<template>
  <div class="contant fullscreen" @click="closeall">
    <smallhead  class="fixed-top" :title='$t("message.contact")' :right="false"></smallhead>
    <div class="top">
      <p>telegram链接：https://t.me/gtbredlotto</p>
      <p>添加微信客服，备注猎人红包，进群领福利。</p>
      <div class="topinfo flex">
        <img src="../common/images/icon17.png" @click.stop="share = !share">
        <img src="../common/images/icon18.png" @click.stop="share1 = !share1">
      </div>
    </div>
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="er fixed-center" v-show="share">
        <img src="../common/images/icon19.png">
      </div>
    </transition>
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="er fixed-center" v-show="share1">
        <img src="../common/images/icon20.png">
      </div>
    </transition>
  </div>
</template>

<script>
import smallhead from '@/components/smallhead.vue'
export default {
  data(){
    return{ 
      share:false,
      share1:false
    }
  },
  components: {
    smallhead
  },
  methods:{
    closeall(){
      console.log(1)
      this.share = false,
      this.share1 = false
    }
  }
}
</script>
