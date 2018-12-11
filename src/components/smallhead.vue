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
    <span :class="left" v-if="left == 'guan'" @click="$router.push('/')">{{thislang.close}}</span>
    <span v-else @click="prev" class="icon icon-Left" v-show="!judge"></span>
    <p>{{title}}</p>
    <span :class="right" v-if="right == 'jilu'" @click="togojilu">红包记录</span>
    <span :class="right" class="icon icon-moreread" v-else-if="right == 'jilui'" @click.stop="more = !more"></span>
    <q-btn v-else flat dense round aria-label="Menu" class="menu icon icon-menu" @click="menu"/>
    <ul class="more" v-show="more">
      <li :class="$route.path == '/record-hair'?'active':''" @click="$router.push('/record-hair')">发红包记录</li>
      <li :class="$route.path == '/record-closed'?'active':''" @click="$router.push('/record-closed')">收红包记录</li>
    </ul>
    <!-- <span v-show="share" class="icon icon-fenxiang3"></span> -->
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex';
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
    share:{
      type:Boolean,
      default:false
    },
    judge:{
      type:String
    }
  },
  created(){
    console.log(this.$route.path)
  },
  data(){
    return{
      more:false
    }
  },
  computed:{
    ...mapGetters([
      "infos","thislang"
    ])
  },
  methods:{
    // 后退
    prev(){
      this.$router.go(-1)
    },
    // 打开菜单
    menu(){
      this.setinfo({menu:true})
    },
    open(){
      this.more = false
    },
    togojilu(){
      let str=this.title.substring(0,this.title.length-3)
      console.log(str)
      if(str == this.infos.name){
        this.$router.push('/record-hair')
      }else{
        this.$router.push('/record-closed')
      }
    },
    ...mapMutations({
      setinfo:'SET_INFO',
    }),
  }
}
</script>
