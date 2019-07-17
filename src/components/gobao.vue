<style lang="stylus" scoped>
 @import "../common/styl/index";
  .fullscreen
    position absolute
    top 0rem
    height 100%
    width 100%
  .fixed-center
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-50%)
  .flex
    display flex
  .column
    display flex
    flex-direction column
  .bg
    background rgba(#000000,0.4)
    z-index 999
  .gobao
    width: 13.4rem;
    min-height: 17.02rem;
    background url("../assets/images/bg3.png") no-repeat bottom
    background-size 100% 100%
    z-index 1000
    align-items center
    justify-content space-between
    flex-wrap nowrap
    padding-top 1.2rem
    .baotop
      flex 1
      align-items center
      justify-content center
      flex-wrap nowrap
      padding-bottom 1.6rem
    .baobottom
      padding-bottom 1.44rem
      text-align center
      margin-top 0.8rem
      .okbtn
        height 1.6rem
        background-color #dc1500
        border-radius 0.8rem
        border solid 0.02rem #cf513b
        padding 0 3.2rem
        font-size 0.64rem
        color #ffffff
    h2
      font-size 0.48rem
      color #ffba41
      margin-top 1.28rem
      &:first-of-type
        margin-top 0rem
    p
      font-size 1.64rem
      margin-top 0.48rem
      color #ffba41
      font-weight bold
    .kuang
      font-size 1.2rem
      margin-top 0.4rem
    .ewai
      justify-content center
      flex-wrap nowrap
      p
        align-items center
        margin 0 0.56rem
        span 
          margin-top 0.52rem
          font-size 0.48rem
          color #666666
        img
          height 1.36rem
          width 1.36rem
        .lei
          width: 1.7rem;
          height: 1.36rem;
          margin-left 0.8rem
    .share
      position absolute
      color: #ffe8c1;
      top 0.4rem
      right 0.4rem
      font-size 0.72rem
      cursor pointer
    .toview
      font-size 0.48rem
      margin-top 1rem
      color #666666
      cursor pointer
  .close
    position absolute
    color: #ffe8c1;
    top 0.5rem
    left 0.8rem
    font-size 0.72rem
    cursor pointer
    &:before
      font-size 0.72rem
</style>

<template>
  <div class="fullscreen">
    <div class="bg fullscreen" @click="$emit('myshow')"></div>
    <div class="gobao fixed-center column">
      <div v-if="!win.guang" class="baotop column">
        <h2>{{$t("message.goodtitle")}}</h2>
        <p>{{win.print}} EOS</p>
      </div>
      <div v-if="!win.guang" class="baobottom">
        <div class="ewai flex">
          <p class="column" v-if="win.reward > 0">
            <img :src="typetxt[win.reward]">
            <span>+ {{win.rewardsum}}EOS</span>
          </p>
          <p class="column" v-if="win.is_chailei == 1">
            <img class="lei" src="../assets/images/lei.png">
            <span>- {{win.eos}}EOS</span>
          </p>
        </div>
        <p class="toview" @click="golist">{{$t("message.kan")}}>></p>
      </div>
      <div class="baotop column" v-if="win.guang">
        <p class="kuang">手太慢了!</p>
        <p class="kuang">红包已经被抢完了!</p>
      </div>
      <div class="baobottom" v-if="win.guang">
        <button class="okbtn" @click="$emit('myshow')">确定</button>
        <p class="toview" @click="golist">{{$t("message.kan")}}>></p>
      </div>
      <span class="share icon icon-fenxiang3" ></span>
      <span class="close icon icon-close" @click="$emit('myshow')"></span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  props:{
    win:{
      type:Object
    }
  },
  data(){
    return{
      typetxt:['',require('../assets/images/icon2.png'),require('../assets/images/icon3.png'),require('../assets/images/icon6.png'),require('../assets/images/icon4.png'),require('../assets/images/icon5.png')]
    }
  },
  methods:{
    golist(){
      this.$router.push({
        name: 'record-this',
        params: {
          name:this.win.name,
          num:this.win.num
        }
      })
    }
  },
  computed:{
    ...mapGetters([
      "userInfo"
    ]),
  }
}
</script>
