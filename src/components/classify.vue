<style lang="stylus" scoped>
  .btn-group
    width 100%
    border solid 1px #d2d2d2
    border-radius 0.1rem
    background #ffffff
  .item
    width 50%
  .item:not(:last-of-type) .btn-item
    border-right solid 0.02rem #d2d2d2
  .btn-item
    border none
    background none
    font-size 0.56rem
    font-weight bold
    color #222222
    position relative
    padding 0
    width 100%
    height 100%
    box-sizing border-box
    cursor pointer
    &.active
      background #eb1726
      color #ffffff
    &.more:after
      position absolute
      content ""
      display block
      border-radius 50%
      top 0.1042rem
      right 0.1042rem
      width 0.2083rem
      height 0.2083rem
      background-color #ff0000
      border solid 0.04rem #d2d2d2
</style>

<template>
  <swiper :options="{slidesPerView:3,initialSlide}" class="btn-group swiper-no-swiping">
    <swiper-slide class="item" v-for="(item, index) in roomList" :key="index">
      <button @click="changeE(index)" :class="initialSlide === index?'active':''" class="btn-item">{{item}}</button>
    </swiper-slide>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {mapMutations,mapGetters} from 'vuex';
import {SET_ROOMID} from "@store/mutation-types";
export default {
  created(){
    this.initialSlide = this.roomId
  },
  props:{
    page:{ //页面类型
      type:String,
      default:'home'
    }
  },
  data(){
    return{
      initialSlide:0,
      roomList: ["0.1 Eos","1 Eos", "5 Eos"],
    }
  },
  methods:{
    ...mapMutations({
      SET_ROOMID,
    }),
    // 房间选择切换
    changeE(i){
      this.SET_ROOMID(i)
      this.initialSlide = i
    },
  },
  components:{
    swiper,
    "swiper-slide":swiperSlide
  },
  computed:{
    ...mapGetters([
      "packages",
      "roomId"
    ]),
  }
}
</script>
