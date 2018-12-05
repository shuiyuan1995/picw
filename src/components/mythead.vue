<style lang="stylus" scoped>
 .header
  height 1.92rem
  line-height 1.92rem
  color #333333
  margin 0 0.8rem
  div:last-of-type
    background-size 0.68rem
    text-align right
    padding-right 0.79rem
  div
    font-size 0.56rem
    color #333333
    height 1.92rem
  .icon
    background url(../common/images/icon2.png) no-repeat center right
  .more
    background url(../common/images/icon5.png) no-repeat center right
    background-size 0.32rem 0.6rem !important
</style>

<template>
  <div class="header flex justify-between items-center">
    <div>{{title.one}}</div>
    <div></div>
    <div :class="icon">{{title.two}}</div>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:Object
    },
    icon:{
      type:String
    }
  }
}
</script>
