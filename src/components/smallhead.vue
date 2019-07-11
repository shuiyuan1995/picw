<style lang="stylus" scoped>
@import "../common/styl/index";
.smallhead
  height 2rem
  max-width 16rem
  width 100%
  margin 0 auto
  background #e51c23 url("../assets/images/chun11.jpg") no-repeat center
  background-size 100% 100%
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
  cursor pointer
.moneyeos
  width 0.96rem
  height 0.96rem
  margin-right 0.16rem
.moneydownbg
  position absolute
  top 0px
  left 0px
  width 100%
  height 100%
  z-index 2
.moneydown
  position absolute
  background red
  font-size 0.56rem
  top 1.92rem
  right 2rem
  width 4.48rem
  z-index 2
  border-radius 0px 0rem 0.12rem 0.12rem
  li
    display flex
    height 1.6rem
    align-items center
    cursor pointer
    padding-left 0.88rem
    border-top 0.04rem solid #b70000
    div 
      margin-right 0.36rem
</style>

<template>
  <div class="smallhead">
    <div class="left">
      <div class="logo"><img @click="$router.push('/')" src="../assets/images/logo.png"></div>
      <span @click="$router.push('/')" v-if="left=='guanbi'" class="guanbi icon">{{$t("message.close")}}</span>
    </div>
    <div class="right">
      <span class="menu icon icon-menu" @click="openright"></span>
      <div class="money" @click="openchangemoney">
        <img class="moneyeos" :src="thismoney.img" :alt="thismoney.name">
        <span>{{thismoney.name}}</span>
        <i class="icon icon-xiangxia"></i>
      </div>
      <div class="moneydownbg" v-show="moneydownbg" @click="openchangemoney">
        <ul class="moneydown">
          <li v-for="(item,index) in this.allInfo.coin_list" :key="index" @click="changemoney(item)">
            <img class="moneyeos" :src="item.img" :alt="item.name">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {SET_GOOGLE_MENU,SET_THISMONEY,SET_ALL_INFO,SET_LOADING} from "@store/mutation-types"
import {getMoneyListget} from "@common/js";
import {post} from '@api';
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
  inject:['reload'],
  data(){
    return{
      moneydownbg:false
    }
  },
  computed:{
    ...mapGetters([
      "thismoney",
      "allInfo"
    ])
  },
  methods:{
    ...mapMutations({
      SET_GOOGLE_MENU,
      SET_THISMONEY,
      SET_ALL_INFO,
      SET_LOADING
    }),
    openright(){
      this.SET_GOOGLE_MENU(true)
    },
    // 打开切换币列表
    openchangemoney(){
      this.moneydownbg = !this.moneydownbg
    },
    // 切换币种
    changemoney(item){
      this.SET_LOADING(true)
      post('/coin_switch',{coin:item.name}).then(json=>{
        this.SET_THISMONEY(item)
        const {data} = json.data.data;
        this.SET_ALL_INFO(data)
        this.reload()
        getMoneyListget(null,item.name)
      })
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
