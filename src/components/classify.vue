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
  <swiper :options="swiperOption" class="btn-group swiper-no-swiping">
    <swiper-slide class="item">
      <button @click="changeE(0)" :class="packages.this == 0?'active':''" class="btn-item">1 EOS</button>
    </swiper-slide>
    <swiper-slide class="item">
      <button @click="changeE(1)" :class="packages.this == 1?'active':''" class="btn-item">5 EOS</button>
    </swiper-slide>
    <!-- <swiper-slide class="item">
      <button @click="changeE(2)" :class="packages.this == 2?'active':''" class="btn-item">10 EOS</button>
    </swiper-slide>
    <swiper-slide class="item">
      <button @click="changeE(3)" :class="packages.this == 3?'active':''" class="btn-item">20 EOS</button>
    </swiper-slide>
    <swiper-slide class="item">
      <button @click="changeE(4)" :class="packages.this == 4?'active':''" class="btn-item">50 EOS</button>
    </swiper-slide>
    <swiper-slide class="item">
      <button @click="changeE(5)" :class="packages.this == 5?'active':''" class="btn-item">100 EOS</button>
    </swiper-slide> -->
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {mapMutations,mapGetters} from 'vuex';
export default {
  created(){
    this.swiperOption.initialSlide = this.packages.this
  },
  props:{
    page:{ //页面类型
      type:String,
      default:'home'
    }
  },
  data(){
    return{
      swiperOption: {
        slidesPerView:2,
        initialSlide: 0
      },
    }
  },
  methods:{
    // 房间选择切换
    changeE(i){
      this.chaE = i
      this.setpacki(i)
    },
    ...mapMutations({
      setpacki:'SET_PACKI'
    }),
  },
  components:{
    swiper,
    "swiper-slide":swiperSlide
  },
  computed:{
    ...mapGetters([
      "packages"
    ]),
  }
}
</script>
