<style lang="stylus" scoped>
.smallhead
  height 2rem
  max-width 16rem
  width 100%
  margin 0 auto
  background #e51c23
  color #ffffff
  display flex
  justify-content space-between
  z-index 10
  &>div
    flex 1
.logo
  cursor pointer
  text-align left
  line-height 2.4rem
  margin-left 0.8rem
  img
    width 4.32rem
    height 1.04rem
.menu
  display inline-block
  text-align center
  width 1.5rem
  height 1.14rem
  border-radius 0.16rem
  border solid 0.0208rem #ffffff
  float right
  margin-right 0.8rem
  margin-top 0.4rem
  cursor pointer
  &:before
    font-size 1.12rem
.huitui
  font-size 18px
  line-height 2rem
  font-weight bold
  margin-left 0.8rem
.title
  text-align center
  font-size 0.64rem
  font-weight bold
  line-height 2rem
.jilu
  font-size 0.48rem
  line-height 2rem
  float right
  margin-right 0.8rem
.guanbi
  margin-left 0.8rem
  line-height 2rem
  font-size 0.48rem
.more
  float right
  line-height 2rem
  margin-right 0.8rem
  font-size 0.88rem
.money
  float right
  font-size 0.56rem
  line-height 2rem
  margin-right 0.4rem
  display flex
  align-items center
  position relative
  cursor pointer
  &:hover .moneydown
    display block
.moneyeos
  width 0.64rem
  height 0.94rem
  background url('../common/images/icon28.png')
  background-size 100% 100%
  margin-right 0.16rem
.moneyown
  width 0.94rem
  height 0.94rem
  background url('../common/images/icon29.png')
  background-size 100% 100%
  margin-right 0.16rem
.moneydown
  position absolute
  display none
  background red
  top 2rem
  left -1.52rem
  width 5.1rem
  z-index 2
  border-radius 0px 0rem 0.12rem 0.12rem
  li
    display flex
    height 1.6rem
    align-items center
    cursor pointer
    justify-content center
    border-top 0.04rem solid #b70000
    div 
      margin-right 0.36rem
</style>

<template>
  <div class="smallhead">
    <div class="left">
      <div class="logo"><img @click="$router.push('/')" src="../common/images/logo.png"></div>
      <span @click="$router.push('/')" v-if="left=='guanbi'" class="guanbi icon">{{$t("message.close")}}</span>
    </div>
    <div class="right">
      <span class="menu icon icon-menu" @click="openright"></span>
      <!-- <div class="money">
        <div :class="thismoney=='EOS'?'moneyeos':'moneyown'"></div>
        <span>{{thismoney}}</span>
        <i class="icon icon-xiangxia"></i>
        <ul class="moneydown">
          <li @click="changemoney(0)">
            <div class="moneyeos"></div>
            <span>EOS</span>
          </li>
          <li @click="changemoney(1)">
            <div class="moneyown"></div>
            <span>OWN</span>
          </li>
        </ul>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {SET_GOOGLE_MENU,SET_THISMONEY} from "@store/mutation-types"
export default {
  props:{
    left:{
      type:String,
      default:''
    },
    center:{
      type:String,
      default:''
    },
    right:{
      type:String,
      default:''
    }
  },
  computed:{
    ...mapGetters([
      "thismoney"
    ])
  },
  methods:{
    ...mapMutations({
      SET_GOOGLE_MENU,
      SET_THISMONEY
    }),
    openright(){
      this.SET_GOOGLE_MENU(true)
    },
    // 切换币种
    changemoney(i){
      switch (i) {
        case 0:
          this.SET_THISMONEY('EOS')
          break;
        default:
          this.SET_THISMONEY('OWN')
          break;
      }
    },
    tomore(){
      this.$createActionSheet({
        title: '红包记录',
        pickerStyle: true,
        active:this.$route.path == '/record-hair'?0:1,
        data: [
          {
            content: '发红包记录'
          },
          {
            content: '抢红包记录'
          }
        ],
        onSelect: (item, index) => {
          switch (index) {
            case 0:
              this.$router.push('/record-hair')
              break;
            default:
              this.$router.push('/record-closed')
              break;
          }
        }
      }).show()
    }
  }
}
</script>
