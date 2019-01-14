<style lang="stylus" scoped>
  .results
    margin-bottom 0.56rem
    font-size 0
  .sendname
    font-size 12px
    margin-bottom 0.32rem
    width 100%
  .txtinfo 
      position relative
      min-height: 20.5px;
      line-height 0.82rem;
      background-color: #dddddd;
      display inline-block
      border-radius: 0.2rem;
      font-size 0.48rem
      padding 0 0.28rem 0 0.7rem
      color: #ffffff;
      margin-left 0.4rem
      max-width 100%
      word-wrap break-word
      word-break normal
      margin 0.16rem 0;
    .img 
      width: 0.42rem;
      height: 0.52rem;
      position absolute
      top 0.16rem
      left 0.2rem
    .img1
      width: 0.82rem;
      height: 0.68rem;
      position absolute
      top 0.04rem
      left 0.12rem
  .resultsbox
    padding-bottom 0.4rem
    border-bottom 0.2rem solid #f9f9f9
  .title
    display flex
    height 1.08rem
    background #f9f9f9
    font-size 0.48rem
    color #222222
    align-items center
    span{
      flex 1
      text-align center
    }
  .tr
    margin-top 0.16rem
    align-items center
    line-height 0.68rem
    &>span 
      font-size 0.48rem
      flex 0 0 25%
      text-align center
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      &:first-of-type
        text-align left
      &:last-of-type
        text-align right
        padding-right 0.4rem
    img
      width 0.68rem
      height 0.68rem
    .lei
      width 0.8rem
      height 0.68rem
      margin-left 0.2rem
  .grey
    color #999999
  .red
    color #e51c23
  .orange
    color #ff9d36
  .orange1
    color #ff9d36
</style>

<template>
  <div class="results">
    <p class="sendname"><span class="grey">{{item.name}}</span>{{$t("message.resultstitle")}}:<span class="red">{{item.num}}</span><span class="grey">({{timer}})</span></p>
    <div class="resultsbox">
      <div class="title">
        <span>{{$t("message.player")}}</span>
        <span>EOS</span>
        <span>OWN</span>
        <span></span>
      </div>
      <div class="tr flex" :key="index" v-for="(it,index) in item.in_packet_data">
        <span class="grey">{{it.name}}</span>
        <span class="orange">{{it.income_sum}}</span>
        <span class="orange1">{{it.own}}</span>
        <span>
          <img v-if="it.reward_type != 0" :src="typetxt[it.reward_type]">
          <img class="lei" v-if="it.is_chailei == 1" src="../common/images/lei.png">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import { date } from 'quasar'
export default {
  data(){
    return{
      typetxt:['',require('../common/images/icon7.png'),require('../common/images/icon10.png'),require('../common/images/icon16.png'),require('../common/images/icon11.png'),require('../common/images/icon15.png')]
    }
  },
  props:{
    item:{
      type:Object
    }
  },
  computed:{
    // 踩雷消息处理
    cailei(){
      let lei = this.item.chailei_data
      if(lei.length<=0){
        return {show:false}
      }
      let data = {
        show:true,
        name:'',
        num:0
      }
      for(let i=0;i<lei.length;i++){
        if(i<lei.length-1){
          data.name += `${lei[i].name},`
        }else{
          data.name += `${lei[i].name}`
        }
        data.num += Number(lei[i].chailai_sum)
      }
      return data
    },
    // 转换时间
    timer(){
      return date.formatDate(this.item.time*1000, 'HH:mm:ss')
    }
  }
}
</script>
