<style lang="stylus" scoped>
  @import '~variables'
  .home
    max-width 16rem
    margin 0 auto
  .nav
    margin-top 0.46rem
    height 1.54rem
    border-bottom 0.1rem solid #eeeeee
    padding 0 0.8rem
    .btn-group
      height 1.53rem
    .item
      width 71px
      height 1.53rem
      text-align center
    .btn-item
      font-size 0.56rem
      height 1.53rem
      line-height 1.53rem
      font-weight bold
      position relative
      &.active
        color #eb1726
        &::after
          position absolute
          bottom 0rem
          left 0rem
          content ""
          height 0.1rem
          width 100%
          background #eb1726
  .listtitle
    height: 1.36rem;
    background #f4f4f4
    margin-top 0.12rem
    padding 0 1rem
    span 
      font-size 12px
      color: #000000;
      font-weight bold
  .paititle
    align-items center
    text-align center
    span:nth-of-type(1)
      width 1.64rem
    span:nth-of-type(2)
      width 3.44rem
    span:nth-of-type(3)
      width 3.48rem
    span:nth-of-type(4)
      width 3.44rem
  .pailist
    position absolute
    width 100%
    top 3.44rem
    bottom 0px
    .paiitem
      margin 0 0.8rem
      height 1.52rem
      border-bottom 1px solid #f4f4f4
      font-size 0.48rem
      align-items center
      &:nth-of-type(1) > span 
        width 1rem
        height 1.04rem
        background url("../common/images/one.png") no-repeat
        background-size 100%
        margin-top 0.24rem
      &:nth-of-type(2) > span 
        width 1rem
        height 1.04rem
        background url("../common/images/two.png") no-repeat
        background-size 100%
        margin-top 0.28rem
      &:nth-of-type(3) > span 
        width 1rem
        height 1.04rem
        background url("../common/images/three.png") no-repeat
        background-size 100%
        margin-top 0.28rem
    span,p
      font-size 0.48rem
      text-align center
    .num
      flex 0 0 0.76rem
      width 0.76rem
      height 0.76rem
      background-color: #d52027;
      border-radius 50%
      color #ffffff
      text-align center
      line-height 0.76rem
      margin 0 0.4rem 0 0.56rem
    p:nth-of-type(1)
      color: #333333;
      width 3.44rem
    p:nth-of-type(2)
      width 3.56rem
      span
        color: #ff9703;
    p:nth-of-type(3)
      width 3.56rem
      span
        color: #00bf0d;
</style>


<template>
  <q-page class="column home">
    <div class="nav">
      <swiper :options="swiperOption" class="btn-group swiper-no-swiping">
        <swiper-slide class="item">
          <div class="btn-item active">{{thislang.board}}</div>
        </swiper-slide>
      </swiper>
    </div>
    <div>
      <div class="listtitle paititle flex">
        <span>{{thislang.rank}}</span>
        <span>{{thislang.user}}</span>
        <span>{{thislang.amount}}</span>
        <span>{{thislang.prize}}</span>
      </div>
      <q-scroll-area class="pailist column">
        <div class="paiitem flex" :key="index" v-for="(item,index) in 15">
          <span class="num" :class="index<3?`${index+1}`:''">{{index+1}}</span>
          <p>Yintao520</p>
          <p><span>9.0000</span> EOS</p>
          <p><span>758.0898</span> EOS</p>
        </div>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import {mapGetters} from 'vuex';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    "swiper-slide":swiperSlide,
  },
  data(){
    return{
      swiperOption: {
        slidesPerView:1
      },
      items2:[
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        }
      ], //排行榜数组
    }
  },
  computed:{
    ...mapGetters([
      "thislang"
    ]),
  }
}
</script>
