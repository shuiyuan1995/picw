<style lang="stylus" scoped>
  .head
    background-size 100% 100% !important
    max-width 16rem
    margin  0 auto
    .headbar
      height 1.76rem
      box-sizing border-box
      overflow visible
      .menu
        height 0.8125rem
        border-radius 0.16rem
        border solid 0.0208rem #ffffff
        margin-left 0.6875rem
        &:before
          font-size 0.96rem
    .logo
      flex 1
      padding-top 0.16rem
      padding-left 0.4rem
      cursor pointer
      img 
        width 4.96rem
        height 1.36rem
    .bigin
      position relative
      height 1.16rem
      width 2.76rem
      color #ffffff
      border solid 1px #eb9295
      box-sizing border-box
      font-size 0.48rem
      background #d6262d
      cursor pointer
      outline none
      border-radius 0.12rem
      &:before
        font-size: 0.48rem;
    .logindown 
      height 1.6667rem
      margin 0 0.3875rem
      position relative
      cursor pointer
      &:hover
        .downchange
          display block
      .logindownthis
        height 1.6667rem
        align-items center
        font-family Helvetica
        font-size 0.48rem
        color #ffffff
        span
          margin-left 0.1458rem
          &:before
            font-size 0.48rem
        .ren
          width: 0.8rem;
          height: 0.8rem;
          text-align center
          line-height 0.7rem;
          background-color #9e070a
          border-radius 50%
          margin-right 0.125rem
          &:before
            font-size 12px
      .downchange
        position absolute
        display none
        width: 4.75rem;
        background #ffffff
        border-radius 0 0 0.1042rem 0.1042rem
        color: #333333;
        font-size: 0.3333rem;
        margin-left 0.16rem
        transition all 0.5s
        overflow hidden
        li
          height 1.125rem
          display flex
          align-items center
          padding-left 0.4167rem
          &:hover 
            background #eeeeee
  .icon
    &:before
      font-size 1.2rem
  .drawertitle
    height 1.76rem
    background #ffffff
  li.active
    background #f7f7f7
  .bigtop
    border-top 0.38rem solid #f7f7f7
  .smalltop
    border-top 0.08rem solid #f7f7f7
  .share
    height 2.84rem
    background #ffffff
    align-items center
    justify-content center
    span
      width 1.62rem
      height 1.62rem
      border-radius 50%
      background-color #bd0d13
      margin 0 0.38rem
      text-align center
      line-height 1.62rem
      cursor pointer
      &:before
        font-size 0.9rem
        color #ffffff
  .tolanguage
    padding 0.4rem 0
    background #ffffff
    li
      height 1.68rem
      line-height 1.68rem
      font-size 0.56rem
      padding-left 2.56rem
      box-sizing border-box
      cursor pointer
      img 
        width 0.74rem
        height 0.5rem
        margin-right 0.38rem
  .topbox
    justify-content space-between
    padding 0.64rem 1rem
    background #ffffff
    li
      text-align center
    img 
      width 1.92rem
      height 1.92rem
    p
      text-align center
      &:first-of-type
        font-size 0.64rem
      &:last-of-type
        font-size 12px
  .topage
    background #ffffff
    padding 0.4rem 0
    li
      height 1.68rem
      line-height 1.68rem
      font-size 0.56rem
      padding-left 2.56rem
      box-sizing border-box
      cursor pointer
  .statistical
    height 3rem
    background #ffffff
    justify-content center
    align-items center
    .knob
      color #bd0d13
      font-size 12px
      margin 0 0.28rem
      cursor pointer
    .knobp
      display block
      width 100%
      text-align center
</style>

<template>
  <q-layout view="lHh Lpr lFf" >
    <q-layout-header class="head">
      <q-toolbar class="headbar flex" color="red-6">
        <div class="logo" v-if="changes.home" @click="$router.push('/')">
          <img src="../common/images/logo.png">
        </div>
        <button @click="login" v-ripple class="bigin icon capitalize icon-dengluyonghuming glossy" v-if="changes.home&&islogin">{{thislang.login}}</button>
        <div class="logindown" v-else-if="changes.home&&!islogin">
          <div class="logindownthis flex"><span class="icon ren icon-dengluyonghuming"></span>{{usename}}<span class="icon icon-xiangxia"></span></div>
          <ul class="downchange">
            <li @click="login">
              {{thislang.out}}
            </li>
          </ul>
        </div>
        <smallhead v-else :title='thislang.sendbtn1'></smallhead>
        <q-btn
          flat
          dense
          round
          @click="leftopen"
          aria-label="Menu"
          class="menu icon icon-menu"
        />
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      side="right"
      content-class="bg-grey-2"
      overlay
      :breakpoint="10000"
    >
      <smallhead judge="drawer" class="drawertitle" :title='thislang.menu' @leftopen="leftopen"></smallhead>
      <div class="share bigtop flex">
        <span class="icon icon-fecebook"></span>
        <span class="icon icon-Ankerwebicon-"></span>
        <span class="icon icon-telegram"></span>
      </div>
      <ul class="topage smalltop">
        <li :class="page == 0?'active':''" @click="thepage(0)">{{thislang.board}}</li>
        <li :class="page == 1?'active':''" @click="thepage(1)">{{thislang.record}}</li>
        <li>{{thislang.invitation}}</li>
        <li>{{thislang.contact}}</li>
      </ul>
      <div class="statistical smalltop flex">
        <q-knob
          v-model="model"
          :min="0"
          :max="100"
          size="1.88rem"
          class="knob"
          readonly
        ><p class="knobp">{{model}}%</p><p class="knobp">CPU</p></q-knob>
        <q-knob
          v-model="model1"
          :min="0"
          :max="100"
          size="1.88rem"
          class="knob"
          readonly
        ><p class="knobp">{{model1}}%</p><p class="knobp">NET</p></q-knob>
      </div>
      <ul class="tolanguage smalltop">
        <li :class="changeI == 0?'active':''" @click="changeL(0)"><img src="../common/images/icon1.png"><span>English</span></li>
        <li :class="changeI == 1?'active':''" @click="changeL(1)"><img src="../common/images/icon9.png"><span>中文</span></li>
      </ul>
      <ul class="topbox smalltop flex">
        <li>
          <img src="../common/images/icon12.png">
          <p>3746927</p>
          <p>{{thislang.packet}}</p>
        </li>
        <li>
          <img src="../common/images/icon13.png">
          <p>9999.0000</p>
          <p>EOS</p>
        </li>
        <li>
          <img src="../common/images/icon14.png">
          <p>3748927</p>
          <p>{{thislang.player}}</p>
        </li>
      </ul>
      
    </q-layout-drawer>
    <q-page-container>
      <transition
        enter-active-class="animated fadeIn"
      >
        <router-view />
      </transition>
    </q-page-container>
    <invitation v-show="false"></invitation>
  </q-layout>
</template>

<script>
import smallhead from '@/components/smallhead.vue'
import invitation from '@/components/invitation.vue'
import { openURL } from 'quasar'
import {mapGetters,mapMutations} from 'vuex';
import {eoslogin,eosclose,getinfo} from '../scattereos'
// import {get} from '../api'
export default {
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop, //侧滑栏状态
      logo:require( '@/common/images/logo.png'), //logo
      islogin:true, //是否已登录
      model:45, //CPU百分比
      model1:60, //NET百分比
      changeI:0, //语言切换index
      page:5, //页面nav切换样式
      usename:"", //玩家用户名
      B_name:"" //浏览器类型
    }
  },
  computed:{
    ...mapGetters([
      "thislang","changes"
    ])
  },
  methods:{
    login(){
      // 判断登录状态
      if(this.islogin){
        // 登录
        eoslogin((val)=>{
          this.usename = val.accounts[0].name
          this.islogin = !this.islogin
          // 向后台获取token
          // let data = {
          //   name:val.accounts[0].name,
          //   publickey:val.publicKey,
          //   addr:this.B_name
          // }
          // get('/login',data).then((val)=>{
          //   // this.$q.sessionStorage.set('token', val.token)
          //   // this.$q.sessionStorage.set('token', val.token)
          // })
          this.$q.notify({
            message: this.thislang.loginok,
            timeout: 100,
            type: 'positive',
            position:"center"
          })
          getinfo((info)=>{
            this.model = info.cpu
            this.model1 = info.net
          })
        })
      }else{
        // 注销
        eosclose()
        this.islogin = !this.islogin
        this.downlogin = false
      }
    },
    thepage(i){
      // 跳转页面
      this.page = i
      let list = ['/mylist','/record-hair']
      this.$router.push(list[i])
      this.setchange({home:true})
    },
    leftopen(){
      // 侧滑展开关闭
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    changeL(i){
      // 语言切换
      this.leftDrawerOpen = !this.leftDrawerOpen
      this.changeI = i
      this.thislanguage(i)
    },
    ...mapMutations({
      setlanguage:'SET_LANGUAGE',
      thislanguage:'THIS_LANGUAG',
      setchange:'SET_CHANGE',
      setinfo:'SET_INFO',
    }),
    // 浏览器判断
    validB(){
      let u_agent = navigator.userAgent 
      if(u_agent.indexOf("MdsApp")>-1){
        this.B_name="MdsApp"; 
      }else {
        this.B_name="PC"; 
      }
      this.setinfo({B_name:this.B_name})
    },
    openURL
  },
  components:{
    smallhead,
    invitation
  },
  created(){
    this.validB()
  },
  mounted(){
    // 自动登录
    // this.login()
  },
}
</script>
