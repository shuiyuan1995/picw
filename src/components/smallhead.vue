<style lang="stylus" scoped>
  .smallhead
    align-items center
    height 2rem
    max-width 16rem
    width 100%
    margin 0 auto
    background #e51c23
    color #ffffff
    span 
      flex 0 0 60px
    .jilu
      font-size 0.48rem
    .jilui
      margin-right 0 !important
    .menu
      height 0.8125rem
      border-radius 0.16rem
      border solid 0.0208rem #ffffff
      margin-left 0.6875rem
      &:before
        font-size 0.96rem
    .icon
      text-align center
      &:before
        font-size 0.8rem
      &:last-of-type  
        margin-right 0.6rem
    .guan
      font-size 0.56rem
      margin-left 0.8rem
    p
      font-size 0.64rem
      flex 1
      text-align center
      font-weight bold
    .more
      position absolute
      top 2rem
      right 0.4rem
      background #ffffff
      width 6.7rem
      li
        height 1.54rem
        font-size 0.56rem
        color #000000
        line-height 1.54rem
        padding-left 0.72rem
        &.active
          background #f0f0f0
</style>

<template>
  <div class="smallhead flex" @click="open">
    <span :class="left" v-if="left == 'guan'" @click="$router.push('/')">{{$t("message.close")}}</span>
    <span v-else @click="prev" class="icon icon-Left" v-show="!judge"></span>
    <p>{{title}}</p>
    <span v-if="!right"></span>
    <span :class="right" v-if="right == 'jilu'" @click="togojilu">{{$t("message.record")}}</span>
    <span :class="right" class="icon icon-moreread" v-if="right == 'jilui'" @click.stop="more = !more"></span>
    <q-btn v-if="right" flat dense round aria-label="Menu" class="menu icon icon-menu" @click="menu"/>
    <ul class="more" v-show="more">
      <li :class="$route.path == '/record-hair'?'active':''" @click="$router.push('/record-hair')">{{$t("message.fa")}}</li>
      <li :class="$route.path == '/record-closed'?'active':''" @click="$router.push('/record-closed')">{{$t("message.shou")}}</li>
    </ul>
    <!-- <span v-show="share" class="icon icon-fenxiang3"></span> -->
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex';
import {SET_GOOGLE_MENU} from "@store/mutation-types"
export default {
  props:{
    // 标题
    title:{
      type:String
    },
    // 两侧显示影藏标识
    right:{
      default:true
    },
    left:{
      default:true
    },
    // 数据
    data:{
      default:""
    },
    share:{
      type:Boolean,
      default:false
    },
    judge:{
      type:String
    }
  },
  data(){
    return{
      more:false
    }
  },
  computed:{
    ...mapGetters([
      "infos"
    ])
  },
  methods:{
    // 后退
    prev(){
      this.$router.go(-1)
    },
    // 打开菜单
    menu(){
      this.SET_GOOGLE_MENU(true)
    },
    open(){
      this.more = false
    },
    togojilu(){
      if(!data){
        this.$router.push('/record-hair')
      }
      if(data == this.infos.name){
        this.$router.push('/record-hair')
      }else{
        this.$router.push('/record-closed')
      }
    },
    ...mapMutations({
     SET_GOOGLE_MENU
    }),
  }
}
</script>
