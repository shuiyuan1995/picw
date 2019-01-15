<style lang="stylus" scoped>
  .info
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-50%)
    z-index 99
    width 13.4rem
    min-height 17.48rem
    max-height 24.8rem
    background-color #ffffff
    border-radius 0.08rem
    padding 0.88rem 0.6rem
    box-sizing border-box
  .top
    display flex
    flex-wrap nowrap
    align-items center
    .select
      flex 1
      &>div
        width 2.84rem
        height 1.08rem
        background-color #f4f4f4
        border-radius 0.1rem
        border solid 0.04rem #eeeeee
        font-size 0.48rem
        line-height 0.96rem
        color #222222
        padding-left 0.24rem
        box-sizing border-box
        position relative
      .icon-xiangxia
        position absolute
        right 0.24rem
        font-size 0.48rem
      &:hover .selectlist
        display block
    .selectlist
      position absolute
      display none
      width 2.84rem
      border solid 0.04rem #eeeeee
      li
        background #f4f4f4
        height 1.04rem
        line-height 1.04rem
        color #666666
        font-size 0.48rem
        padding-left 0.24rem
        box-sizing border-box
        &.active
          background #e0e0e0
    .title
      flex 1
      font-size 0.72rem
      color #222222
      text-align center
    .icon-close 
      flex 1
      text-align right
      color rgba(194, 194, 194, 0.93)
      font-size 0.96rem
  .center
    height 3.52rem
    background url("../common/images/bg8.png") no-repeat center
    background-size 100% auto
    padding-top 0.96rem
    box-sizing border-box
    margin-top 0.4rem
    .centerT
      font-size 0.48rem
      color #ffffff
      text-align center
    .centerN
      font-size 0.88rem
      font-weight bold
      color #ffffff
      text-align center
      margin-top 0.2rem
      span 
        font-weight bold
  .footer
    margin-top 0.4rem
    .footertitle
      height 1.6rem
      background #e70000
      display flex
      align-items center
      p
        flex 1
        text-align center
        color #ffffff
        font-size 0.48rem
        font-weight bold
    .tr
      height 1.56rem
      display flex
      align-items center
      border-bottom 0.04rem solid #e8e8e8
      flex-wrap nowrap
      p
        flex 1
        text-align center
        font-size 0.48rem
    .contentinfo
      max-height 402px
  .orange
    color #ffc000
</style>

<template>
  <div class="mylist">
    <div class="bg" @click="$parent.openlist"></div>
    <div class="info">
      <div class="top">
        <div class="select">
          <div>
            12月
            <i class="icon icon-xiangxia"></i>
          </div>
          <ul class="selectlist">
            <li class="active">11月</li>
            <li>11月</li>
            <li>11月</li>
          </ul>
        </div>
        <span class="title">{{$t("message.myjiang")}}</span>
        <i class="icon icon-close" @click="$parent.openlist"></i>
      </div>
      <div class="center">
        <p class="centerT">{{$t("message.leipai")}}</p>
        <p class="centerN"><span class="orange">108.0986</span> EOS</p>
      </div>
      <div class="footer">
        <div class="footertitle">
          <p>{{$t("message.time")}}</p>
          <p>{{$t("message.rank")}}</p>
          <p>{{$t("message.prize")}}</p>
        </div>
        <cube-scroll class="contentinfo" ref="scroll">
          <ul>
            <li class="tr" v-for="(item,index) in list" :key="index">
              <p>{{item.created_at}}</p>
              <p>{{item.ranking}}</p>
              <p><span class="orange">{{item.prize}}</span> EOS</p>
            </li>
          </ul>
        </cube-scroll>
        
      </div>
    </div>
  </div>
</template>

<script>
import {get} from "@api"
import {changedata} from "@common/js"
export default {
  created(){
    get('/get_my_history_paihangbang').then(json=>{
      this.list = json.data.map(v=>{
        return {
          ...v,
          created_at:changedata(v.created_at*1000,'yyyy-MM-dd')
        }
      })
    })
  },
  props:{
    listshow:{
      type:Boolean
    }
  },
  data(){
    return{
      list:[]
    }
  },
  watch:{
    listshow(){
      this.$refs.scroll.refresh()
    }
  }
}
</script>
