<style lang="stylus" scoped>
@import "../common/styl/index";
.contant
  background #ffffff
  max-width 16rem
  margin  0 auto
  height 100%
.top
  background url($imgUrl+"img22.png") no-repeat center top
  background-size 100% auto
  height 100%
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
.flex
  display flex
.fixed-center
  position fixed
  top 50%
  left 50%
  transform translate(-50%,-50%) 
</style>

<template>
  <div class="contant fullscreen" @click="closeall">
    <smallhead  class="fixed-top" left="huitui" :center='$t("message.contact")'></smallhead>
    <div class="top">
      <p>telegram{{$t("message.lianjie")}}：https://t.me/gtbredlotto</p>
      <p>{{$t("message.kefu")}}</p>
      <div class="topinfo flex">
        <img src="../assets/images/icon17.png" @click.stop="open(0)">
        <img src="../assets/images/icon18.png" @click.stop="open(1)">
      </div>
    </div>
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="er fixed-center" v-show="share">
        <img :src="er">
      </div>
    </transition>
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="er fixed-center" v-show="share1">
        <img :src="er1">
      </div>
    </transition>
  </div>
</template>

<script>
import smallhead from '@/components/smallhead.vue'
import {imgUrl} from "@common/js"
export default {
  data(){
    return{ 
      share:false,
      share1:false,
      er:imgUrl+'icon19.png',
      er1:imgUrl+'icon20.png'
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
    },
    open(i){
      switch (i) {
        case 0:
          this.share = !this.share,
          this.share1 = false
          break;
        default:
          this.share = false,
          this.share1 = !this.share1
          break;
      }
    }
  }
}
</script>
