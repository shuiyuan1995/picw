<style lang="stylus" scoped>
.nav
  display flex
  margin-top 0.16rem
  max-width 16rem
  height 1.54rem
  border-bottom 0.1rem solid #eeeeee
  padding 0 0.8rem
  .item
    position relative
    flex 1
    height 1.53rem
    text-align center
  .btn-item
    font-size 0.56rem
    height 1.53rem
    line-height 1.53rem
    font-weight bold
    position relative
    cursor pointer
    &.active
      color #eb1726
      &::after
        position absolute
        bottom -0.12rem
        left 0rem
        content ""
        height 0.1rem
        width 100%
        background #eb1726
  .more
    position absolute
    top 0px
    right 0px
    width 1.06rem
    height 0.62rem
    background-color #ff0000
    border-radius 0.28rem
    font-size 0.48rem
    color #ffffff
    line-height 0.62rem
    text-align center
</style>

<template>
  <div class="nav">
    <div class="item" v-for="(item, index) in roomList" :key="index">
      <div @click="changeE(index)" class="btn-item" :class="roomId === index ?'active':''">{{item>=1?item+' EOS':item+$t("message.tiyan")}}</div>
      <span class="more" v-show="roomId != index&&allroomred[index]>0">{{allroomred[index]}}</span>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapMutations, mapActions} from 'vuex';
export default {
  props:{
    allroomred:{
      type:Array
    }
  },
  data(){
    return{
      roomList: ["0.1","1", "5","20"],
    }
  },
  computed:{
    ...mapGetters([
      "roomId"
    ]),
  },
  methods:{
    changeE(index){
      this.$parent.changeE(index)
    }
  }
}
</script>
