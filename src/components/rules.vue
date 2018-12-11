<style lang="stylus" scoped>
  .bg
    background rgba(#000000,0.4)
    z-index 999
  .rulesin
    width 13.4rem
    box-sizing border-box
    min-height: 13.92rem;
    background-color: #303551;
    border-radius: 0.3333rem;
    padding-bottom 1.52rem
    z-index 1000
    &.first
      padding 0 0.4rem 1.52rem
    &.white
      background-color #ffffff
      h4,h5,p
        color #222222
    h4
      color: #f7f7f7;
      font-size: 0.72rem;
      text-align center
      margin 0.8542rem 0 0.5833rem
    h5
      margin-left 0.5108rem
      font-size 0.56rem
      color #ffffff
      font-weight bold
    p
      font-size: 0.56rem;
      color: #d7d7d7;
      margin 0 0.52rem
      line-height: 0.75rem;
    .close
      outline none
      background none
      border none
      margin 0.4167rem 0.4167rem 0 0
      color rgb(194, 194, 194);
      cursor pointer
      &:before
        font-size 0.72rem
    .rulebox
      margin 0.28rem 0.52rem 0
    .title
      height: 1.48rem;
      background-color: #d6222a;
      align-items center
      span 
        flex 1
        text-align center
        font-size 12px
        color #ffffff
    .tr
      border: solid 0.04rem #eeeeee;
      border-top none
      align-items center
      &>div
        flex 1
        text-align center
        align-items center
        justify-content center
        border-right: solid 0.04rem #eeeeee;
        font-size 0.48rem
        padding 0.24rem 0
        &>span 
          width 1.6rem
      &>p
        text-align center
        flex 1
        margin 0
</style>

<template>
  <div class="rules fullscreen">
    <div class="bg fullscreen" @click="closein"></div>
    <div class="rulesin fixed-center first" :class="bgc == 'white'?'white':''" v-if="therules">
      <h4>{{thislang.how}}</h4>
      <h5>{{thislang.sendbtn1}}</h5>
      <p>1, {{thislang.hair}}</p>
      <p>2, {{thislang.hair1}}</p>
      <p>3, {{thislang.hair2}}</p>
      <h5>{{thislang.robtitle}}</h5>
      <p>{{thislang.rob}}</p>
      <h5>{{thislang.steptitle}}</h5>
      <p>{{thislang.step}}</p>
      <h5>{{thislang.watitle}}</h5>
      <p>{{thislang.wa}}</p>
      <h5>{{thislang.jiangtitle}}</h5>
      <p>{{thislang.jiang}}</p>
      <h5>{{thislang.morerule}}</h5>
      <button class="close absolute-top-right icon icon-close" @click.stop="closein"></button>
    </div>
    <div class="rulesin fixed-center" :class="bgc == 'white'?'white':''" v-else>
      <h4>幸运奖池</h4>
      <p>平台利润的5%奖励给玩家，玩家在游戏中，抽到特定幸运数字，可得到当前奖池比例的奖励。</p>
      <div class="rulebox">
        <div class="title flex">
          <span>奖项</span>
          <span>奖金</span>
        </div>
        <div class="tr flex">
          <div class="flex"><span>对子</span><p><span>0.0022</span></p></div>
          <p>奖池的 0.5 %</p>
        </div>
        <div class="tr flex">
          <div class="flex"><span>三条</span><p><span>0.0111</span><br /><span>0.2999</span></p></div>
          <p>奖池的 1 %</p>
        </div>
        <div class="tr flex">
          <div class="flex"><span>整数</span><p><span>0.1000</span><br /><span>1.6000</span></p></div>
          <p>奖池的 1 %</p>
        </div>
        <div class="tr flex">
          <div class="flex"><span>顺子</span><p><span>0.1234</span><br /><span>0.5678</span></p></div>
          <p>奖池的 2 %</p>
        </div>
        <div class="tr flex">
          <div class="flex"><span>炸弹</span><p><span>0.1111</span><br /><span>0.6666</span></p></div>
          <p>奖池的 3 %</p>
        </div>
      </div>
      <button class="close absolute-top-right icon icon-close" @click.stop="closein"></button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  props:{
    // 背景
    bgc:{
      type:String
    },
    // 游戏规则或者奖励规则
    therules:{
      type:Boolean,
      default:true
    }
  },
  methods:{
    // 关闭页面
    closein(){
      this.$emit('openrule')
    }
  },
  computed:{
    ...mapGetters([
      "thislang","packages"
    ])
  }
}
</script>
