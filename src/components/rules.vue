<style lang="stylus" scoped>
  .bg
    background rgba(#000000,0.4)
    z-index 999
  .rulesin
    width 13.4rem
    max-height 100%
    box-sizing border-box
    min-height: 13.92rem;
    background-color: #303551;
    border-radius: 0.3333rem;
    padding-bottom 1.52rem
    z-index 1000
    &.first
      padding 0 0.4rem 1.52rem
      p
        margin-bottom 0.2rem
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
    .ptitle
      font-size 0.56rem
      color #222222
      font-weight bold
    .ptxt1
      font-size 0.48rem
      color #222222
      word-break break-all
    .ptxt2
      font-size 0.48rem
      color #666666
      word-break break-all
    .pbtn
      height 1.14rem
      background-color #e51c23
      border-radius 0.6rem
      outline none 
      font-size 0.48rem
      color #ffffff
      border none
      padding 0 0.8rem
      margin-left 50%
      transform translate3d(-50%,0,0)
      &:first-of-type
        margin-bottom 0.8rem
  .ahref
    color blue !important
    text-decoration underline
</style>

<template>
  <div class="rules fullscreen">
    <div class="bg fullscreen" @click="closein"></div>
    <div class="rulesin fixed-center first scroll" :class="bgc == 'white'?'white':''" v-if="therules == 0">
      <h4>{{$t("message.how")}}</h4>
      <h5>{{$t("message.sendbtn1")}} ({{$t("message.lieren")}})</h5>
      <p>{{$t("message.hair")}}</p>
      <h5>{{$t("message.robtitle")}} ({{$t("message.yeshou")}})</h5>
      <p>{{$t("message.rob")}}</p>
      <p>{{$t("message.rob1")}}</p>
      <p>{{$t("message.rob2")}}</p>
      <h5>{{$t("message.steptitle")}}</h5>
      <p>{{$t("message.step")}}</p>
      <h5>{{$t("message.watitle")}}</h5>
      <p>{{$t("message.wa")}}</p>
      <h5>{{$t("message.jiangtitle")}}</h5>
      <p>{{$t("message.jiang")}}</p>
      <h5 @click="openu" class="ahref">{{$t("message.morerule")}}</h5>
      <button class="close absolute-top-right icon icon-close" @click.stop="closein"></button>
    </div>
    <div class="rulesin fixed-center" :class="bgc == 'white'?'white':''"  v-else-if="therules == 1">
      <h4>{{$t("message.lucky")}}</h4>
      <p>{{$t("message.luckytxt")}}</p>
      <div class="rulebox">
        <div class="title flex">
          <span>{{$t("message.jiangxiang")}}</span>
          <span>{{$t("message.prize")}}</span>
        </div>
        <div class="tr flex">
          <div class="flex"><span>{{$t("message.dui")}}</span><p><span>0.0022</span></p></div>
          <p>{{$t("message.jiangchi")}} 0.5 %</p>
        </div>
        <div class="tr flex">
          <div class="flex"><span>{{$t("message.san")}}</span><p><span>0.0111</span><br /><span>0.2999</span></p></div>
          <p>{{$t("message.jiangchi")}} 1 %</p>
        </div>
        <div class="tr flex">
          <div class="flex"><span>{{$t("message.zhen")}}</span><p><span>0.1000</span><br /><span>1.6000</span></p></div>
          <p>{{$t("message.jiangchi")}} 1 %</p>
        </div>
        <div class="tr flex">
          <div class="flex"><span>{{$t("message.shun")}}</span><p><span>0.1234</span><br /><span>0.5678</span></p></div>
          <p>{{$t("message.jiangchi")}} 2 %</p>
        </div>
        <div class="tr flex">
          <div class="flex"><span>{{$t("message.si")}}</span><p><span>0.1111</span><br /><span>0.6666</span></p></div>
          <p>{{$t("message.jiangchi")}} 3 %</p>
        </div>
      </div>
      <button class="close absolute-top-right icon icon-close" @click.stop="closein"></button>
    </div>
    <div class="rulesin fixed-center" :class="bgc == 'white'?'white':''" v-else>
      <h4 class="ptitle">{{$t("message.PC")}}</h4>
      <p class="ptxt1">{{$t("message.PC1")}}</p>
      <p class="ptxt2">{{$t("message.PC2")}}</p>
      <button class="pbtn" @click="openu(1)">{{$t("message.xiazai")}}</button>
      <p class="ptxt1">{{$t("message.PC3")}}</p>
      <p class="ptxt2">{{$t("message.PC4")}}</p>
      <button class="pbtn" @click="openu(2)">{{$t("message.xiazai")}}</button>
      <h4 class="ptitle">{{$t("message.phone")}}</h4>
      <p class="ptxt1">{{$t("message.phone1")}}</p>
      <p class="ptxt2">{{$t("message.phone2")}}</p>
      <button class="close absolute-top-right icon icon-close" @click.stop="closein"></button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import { openURL} from "quasar";
export default {
  props:{
    // 背景
    bgc:{
      type:String
    },
    // 游戏规则或者奖励规则
    therules:{
      type:Number,
      default:0
    }
  },
  methods:{
    // 关闭页面
    closein(){
      this.$emit('openrule')
    },
    openu(){
      openURL("https://assets.pickown.com/PickOwnV1.pdf")
    }
  },
  computed:{
    ...mapGetters([
      "thislang","packages"
    ])
  }
}
</script>
