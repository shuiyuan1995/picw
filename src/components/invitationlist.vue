<style lang="stylus" scoped>
  .orange
    color #ff9600 !important
  .info
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-50%)
    width 13.4rem
    height 23.48rem
    max-height 100%
    background-color #ffffff
    border-radius 0.08rem
    z-index 999
    h2
      font-size 0.72rem
      line-height 2rem
    .close
      position absolute
      top 0.6rem
      right 0.56rem
      font-size 0.8rem
      color rgba(194, 194, 194, 0.93) 
  .contentinfo
    position absolute
    top 2rem
    bottom 0rem
    height auto
    width 100%
    padding 0 0.48rem
    box-sizing border-box
    border-top 0.04rem solid #e8e8e8
    li
      padding 0.52rem 0
      div
        display flex
        justify-content space-between
      .name
        font-size 0.6rem
      .num,.time
        font-size 0.48rem
      .time 
        margin-top 0.2rem
</style>

<template>
  <div class="invitationlist">
    <div class="bg" @click="$parent.openinvitation()"></div>
    <div class="info">
      <h2>{{$t("message.yaomingx")}}</h2>
      <span class="close icon icon-close" @click.stop="$parent.openinvitation()"></span>
      <cube-scroll class="contentinfo" :data="list" ref="scroll">
        <ul>
          <li v-for="(item,index) in list" :key="index">
            <div>
              <p class="name">{{item.name}}</p>
              <p class="num"><span class="orange">{{item.reffee}}</span> EOS</p>
            </div>
            <div class="time">{{time(item.time)}}</div>
          </li>
        </ul>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import {changedata} from "@common/js"
export default {
  props:{
    list:{
      type:Array
    },
    invitation:{
      type:Boolean
    }
  },
  computed:{
    time(time){
      return function(time){
        return changedata(time*1000,'yyyy/MM/dd')
      }
    }
  },
  watch:{
    invitation(){
      this.$refs.scroll.refresh()
    }
  }
}
</script>
