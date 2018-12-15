<style lang="stylus" scoped>
  @import '~variables'
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
    top 3.7rem
    bottom 0px
    .paiitem
      margin 0 0.8rem
      height 1.52rem
      border-bottom 1px solid #f4f4f4
      font-size 0.48rem
      align-items center
      &:nth-of-type(1) > span 
        height 1.04rem
        background url("../common/images/one.png") no-repeat
        background-size 100%
        margin-top 0.24rem
      &:nth-of-type(2) > span 
        height 1.04rem
        background url("../common/images/two.png") no-repeat
        background-size 100%
        margin-top 0.28rem
      &:nth-of-type(3) > span 
        height 1.04rem
        background url("../common/images/three.png") no-repeat
        background-size 100%
        margin-top 0.28rem
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
      margin 0 1.28rem
    p:nth-of-type(1)
      color #333333
    p:nth-of-type(2)
      span
        color: #ff9703;
    p:nth-of-type(3)
      span
        color: #00bf0d;
  .bottomtxt
    text-align center
    font-size 0.56rem
    color #333333
    margin-top 2.4rem
</style>


<template>
  <q-page class="fullscreen column home">
    <smallhead :title='$t("message.board")' :right="false"></smallhead>
    <div>
      <div class="listtitle paititle flex">
        <span>{{$t("message.rank")}}</span>
        <span>{{$t("message.user")}}</span>
        <span>{{$t("message.amount")}}</span>
        <span>{{$t("message.prize")}}</span>
      </div>
      <q-scroll-area class="pailist column" v-if="items2 && items2.length>0">
        <div class="paiitem flex" :key="index" v-for="(item,index) in items2">
          <span class="num" :class="index<3?`${index+1}`:''">{{index+1}}</span>
          <p>{{item.user}}</p>
          <p><span>{{(item.balance/10000).toFixed(4)}}</span> EOS</p>
          <p><span>{{(item.prize/10000).toFixed(4)}}</span> EOS</p>
        </div>
      </q-scroll-area>
      <p class="bottomtxt" v-else>{{$t("message.wu")}}</p>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import smallhead from '@/components/smallhead.vue'
import {mapGetters} from 'vuex';
// import {redPacketList} from '../scattereos'
export default {
  created(){
    // 判断登录
    // if(this.infos.name.length == 0){
    //   alert('请先登录')
    //   this.$router.push('/')
    //   return false
    // }else{
    //   // 获取排行榜列表
    //   redPacketList("pickowngames").then(val => {
    //     console.log(val)
    //     this.items2 = val
    //   })
    // }
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
  }
}
</script>
