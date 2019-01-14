<style lang="stylus" scoped>
  .fullscreen
    position absolute
    top 0rem
    width 100%
    height 100%
    overflow hidden
  .flex
    display flex
  .column
    display flex
    flex-direction column
  .home
    max-width 16rem
    margin 0 auto
    z-index 2000
    background #ffffff
  .listtitle
    height: 1.36rem;
    background #f4f4f4
    margin-top 0.12rem
    padding 0 0.8rem
    span 
      font-size 12px
      color: #000000;
      font-weight bold
      flex 0 0 25%
  .paititle
    align-items center
    text-align center
  .pailist
    position absolute
    width 100%
    height auto
    top 3.7rem
    bottom 0px
    .paiitem
      margin 0 0.8rem
      height 1.52rem
      border-bottom 1px solid #f4f4f4
      font-size 0.48rem
      align-items center
      &:nth-of-type(1) > span
        margin 0 1.2rem 
        height 1.04rem
        background url("../common/images/one.png") no-repeat
        background-size 100% 100%
        padding-top 0.08rem
        color #ea1f1f
      &:nth-of-type(2) > span
        margin 0 1.2rem
        height 1.04rem
        background url("../common/images/two.png") no-repeat
        background-size 100% 100%
        padding-top 0.08rem
        color #4a68d3
      &:nth-of-type(3) > span
        margin 0 1.2rem
        height 1.04rem
        background url("../common/images/three.png") no-repeat
        background-size 100% 100%
        padding-top 0.08rem
        color #a94e17
    span,p
      flex 0 0 25%
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
      margin 0 1.2rem
    p:nth-of-type(1)
      color #333333
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      line-height 0.64rem
    p:nth-of-type(2)
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      span
        color: #ff9703;
    p:nth-of-type(3)
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      span
        color: #00bf0d;
  .bottomtxt
    text-align center
    font-size 0.56rem
    color #333333
    margin-top 2.4rem
</style>


<template>
  <div class="fullscreen column home">
    <smallhead left="huitui" :center='$t("message.board")'></smallhead>
    <div>
      <div class="listtitle paititle flex">
        <span>{{$t("message.rank")}}</span>
        <span>{{$t("message.user")}}</span>
        <span>{{$t("message.amount")}}</span>
        <span>{{$t("message.prize")}}</span>
      </div>
      <cube-scroll class="pailist column" v-if="items2 && items2.length>0">
        <div class="paiitem flex" :key="index" v-for="(item,index) in items2">
          <span class="num" :class="index<3?`${index+1}`:''">{{index+1}}</span>
          <p>{{item.user}}</p>
          <p><span>{{(item.balance/10000).toFixed(4)}}</span> EOS</p>
          <p><span>{{(item.prize/10000).toFixed(4)}}</span> EOS</p>
        </div>
      </cube-scroll>
      <p class="bottomtxt" v-else>{{$t("message.wu")}}</p>
    </div>
  </div>
</template>

<style>
</style>

<script>
import smallhead from '@/components/smallhead.vue'
import {mapGetters,mapMutations} from 'vuex';
import {scatRedPacketList} from "@common/js"
import {SET_LOADING} from "@store/mutation-types"
export default {
  created(){
    // 获取排行榜列表
    // this.SET_LOADING(true)
    // scatRedPacketList().then(val => {
    //   this.SET_LOADING(false)
    //   this.items2 = val
    // }).catch(()=>{
    //   this.SET_LOADING(false)
    //   const toast = this.$createToast({
    //     txt: "服务器繁忙，请稍后再试",
    //     time: 2000,
    //     type: 'txt'
    //   })
    //   toast.show()
    // })
  },
  components: {
    smallhead
  },
  data(){
    return{
      swiperOption: {
        slidesPerView:1
      },
      items2:[], //排行榜数组
    }
  },
  computed:{
    ...mapGetters([
      "userInfo"
    ]),
  },
  methods:{
    ...mapMutations({
      SET_LOADING
    }),
  }
}
</script>
