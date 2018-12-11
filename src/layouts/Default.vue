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
      margin-left 1.28rem
      img 
        width 4.26rem
        height 0.88rem
    .rules
      font-size 0.56rem
      cursor pointer
      margin-right 0.76rem
      position relative
      margin-left 0.4rem
      &:after
        position absolute
        content "\e63d"
        margin-left 0.1667rem
        font-size 0.64rem
  .icon
    &:before
      font-size 1.2rem
  li.active
    background #f7f7f7
  .bigtop
    border-top 0.38rem solid #f7f7f7
  .smalltop
    border-top 0.08rem solid #f7f7f7
  .bigin
    height 2rem
    background #ffffff
    align-items center
    padding-left 1.36rem
    .bigining
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
    .logindownthis
      height 1.6667rem
      align-items center
      font-family Helvetica
      font-size 0.56rem
      color #222222
      span
        margin-left 0.1458rem
        &:before
          font-size 0.48rem
      .ren
        width: 0.8rem;
        height: 0.8rem;
        text-align center
        line-height 0.7rem;
        background-color #eeeeee
        border-radius 50%
        margin-right 0.125rem
        &:before
          font-size 0.48rem
          color #8a8a8a
      .tuichu
        margin-left 0.4rem
        &:before
          font-size 0.72rem
          color #999999
  .yue
    height 2.76rem
    flex-wrap nowrap
    padding 0.64rem
    div
      flex 1
      &:first-of-type
        border-right 1px solid #dedede
      p
        text-align center
      p:first-of-type
        font-size 0.56rem
        color #222222
      p:last-of-type
        margin-top 0.28rem
        font-size 16px
        color #ff8200
  .share
    height 2rem
    background #ffffff
    align-items center 
    padding-left 1.34rem
    span
      width 1.3rem
      height 1.3rem
      border-radius 50%
      background-color #bd0d13
      margin 0 0.38rem
      text-align center
      line-height 1.3rem
      cursor pointer
      &:before
        font-size 0.56rem
        color #ffffff
  .tolanguage
    padding 0.32rem 1.34rem 0.32rem
    background #ffffff
    .langitem
      margin 0 0.4rem
      border-radius 0.08rem
      text-align center
      line-height 0.96rem
      &.active
        background-color #f7f7f7
    img 
      width 0.74rem
      height 0.5rem
      margin 0.24rem 0.28rem
  .topbox
    justify-content space-between
    padding 0.32rem 1rem
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
        font-size 0.48rem
  .topage
    background #ffffff
    padding 0.24rem 0
    li
      height 1.68rem
      line-height 1.68rem
      font-size 0.56rem
      padding-left 1.68rem
      box-sizing border-box
      cursor pointer
  .statistical
    height 2rem
    background #ffffff
    padding-left 1.34rem
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
  .lian
    font-size 0.48rem
    text-align center
    margin-top 0.16rem
</style>

<template>
  <q-layout view="lHh Lpr lFf" >
    <q-layout-header class="head">
      <q-toolbar class="headbar flex" color="red-6">
        <span class="rules icon" @click="openrule">{{thislang.how}}</span>
        <div class="logo" @click="$router.push('/')">
          <img src="../common/images/logo.png">
        </div>
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
      v-model="openleft"
      side="right"
      content-class="bg-grey-2"
      class="mydrawer"
      overlay
      :breakpoint="10000"
    >
      <div class="bigin flex">
        <button @click="login" v-ripple class="bigining icon capitalize icon-dengluyonghuming glossy" v-if="islogin">{{thislang.login}}</button>
        <div v-else class="logindownthis flex">
          <span class="icon ren icon-dengluyonghuming"></span>
          {{usename}}
          <span class="tuichu icon icon-tuichu" @click="login"></span>
        </div>
      </div>
      <div class="yue flex">
        <div>
          <p>EOS</p>
          <p>{{infos.eos.toFixed(4)}}</p>
        </div>
        <div>
          <p>OWN</p>
          <p>{{infos.own.toFixed(4)}}</p>
        </div>
      </div>
      <div class="share flex">
        <span class="icon icon-fecebook"></span>
        <span class="icon icon-Ankerwebicon-"></span>
        <span class="icon icon-telegram"></span>
      </div>
      <ul class="topage smalltop">
        <li :class="page == 0?'active':''" @click="thepage(0)">{{thislang.board}}</li>
        <li :class="page == 1?'active':''" @click="thepage(1)">{{thislang.record}}</li>
        <li :class="page == 2?'active':''" @click="thepage(2)">{{thislang.invitation}}</li>
        <li>白皮书</li>
        <li :class="page == 4?'active':''" @click="thepage(4)">领奖</li>
        <li>{{thislang.contact}}</li>
      </ul>
      <div class="statistical smalltop flex">
        <q-knob
          v-model="model"
          :min="0"
          :max="100"
          size="1.52rem"
          class="knob"
          readonly
        ><p class="knobp">{{model}}%</p><p class="knobp">CPU</p></q-knob>
        <q-knob
          v-model="model1"
          :min="0"
          :max="100"
          size="1.52rem"
          class="knob"
          readonly
        ><p class="knobp">{{model1}}%</p><p class="knobp">NET</p></q-knob>
      </div>
      <ul class="tolanguage smalltop flex">
        <div class="langitem" :class="changeI == 1?'active':''" @click="changeL(1)"><img src="../common/images/icon9.png"></div>
        <div class="langitem" :class="changeI == 0?'active':''" @click="changeL(0)"><img src="../common/images/icon1.png"></div>
        <div class="langitem" :class="changeI == 2?'active':''" @click="changeL(2)"><img src="../common/images/icon9.png"></div>
      </ul>
      <ul class="topbox smalltop flex">
        <li>
          <img src="../common/images/icon12.png">
          <p>{{infos.info.out_packet_count}}</p>
          <p>{{thislang.packet}}</p>
        </li>
        <li>
          <img src="../common/images/icon13.png">
          <p>{{infos.info.transaction_info_count}}</p>
          <p>EOS</p>
        </li>
        <li>
          <img src="../common/images/icon14.png">
          <p>{{infos.info.user_count}}</p>
          <p>{{thislang.player}}</p>
        </li>
      </ul>
      <p class="lian">www.pickown.com</p>
    </q-layout-drawer>
    <q-page-container>
      <transition
        enter-active-class="animated fadeIn"
      > 
        <keep-alive><router-view v-if="$route.meta.keepAlive"/></keep-alive>
      </transition>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      > 
        <router-view v-if="!$route.meta.keepAlive"/>
      </transition>
    </q-page-container>
    <invitation v-show="invitation" @invitashow="invitashow"></invitation>
    <rules v-show="rules" bgc="white" @openrule="openrule"></rules>
  </q-layout>
</template>

<script>
import smallhead from '@/components/smallhead.vue'
import invitation from '@/components/invitation.vue'
import rules from '@/components/rules.vue'
import { openURL,date } from 'quasar'
import {mapGetters,mapMutations} from 'vuex';
import {eoslogin,eosclose,getinfo,getjin} from '../scattereos'
import {get} from '../api'
export default {
  data () {
    return {
      openleft:false, //侧滑菜单
      logo:require( '@/common/images/logo.png'), //logo
      islogin:true, //是否已登录
      model:0, //CPU百分比
      model1:0, //NET百分比
      changeI:0, //语言切换index
      page:5, //页面nav切换样式
      usename:"", //玩家用户名
      B_name:"", //浏览器类型
      invitation:false, //邀请好友
      rules:false,
    }
  },
  computed:{
    ...mapGetters([
      "thislang","infos","packages"
    ]),
    // vuex中侧滑状态
    myopenleft(){
      return this.infos.menu
    }
  },
  methods:{
    login(){
      // 判断登录状态
      if(this.islogin){
        let templist = {
          index:this.packages.this,
          data:this.packages.data[this.packages.this]
        }
        for(let i = 0;i<templist.data.length;i++){
          templist.data[i].isgo = 1
        }
        this.setpackdatal(templist)
        // 登录
        eoslogin('PickOwn').then(val=>{
          console.log(val)
          this.usename = val.accounts[0].name
          this.islogin = !this.islogin
          // 判断登录人与邀请人是否一致
          if(this.usename == this.B_name){
            this.B_name = 'null'
            this.setinfo({B_name:this.B_name})
          }
          this.setinfo({name:val.accounts[0].name})
          // 获取userid，token
          let data = {
            name:val.accounts[0].name,
            publickey:val.accounts[0].publicKey,
            addr:this.B_name
          }
          get('/login',data).then((val)=>{
            this.$q.sessionStorage.set('token', val.data.data.token)
            this.$q.sessionStorage.set('userid', val.data.data.userid)
            // 获取红包列表，判断红包状态
            this.getbaoinfo({userid:val.data.data.userid})
          })
          this.$q.notify({
            message: this.thislang.loginok,
            timeout: 100,
            type: 'positive',
            position:"center"
          })
          // 获取用户cpu信息
          getinfo().then(val=>{
            this.model = val.cpu
            this.model1 = val.net
          }).catch(()=>{
            // console.log("信息获取失败")
          })
          // 获取用户余额
          getjin('EOS').then((val)=>{
            this.setinfo({eos:parseFloat(val[0])})
          })
          getjin('OWN').then((val)=>{
            if(val[0]){
              this.setinfo({own:parseFloat(val[0])})
            }else{
              this.setinfo({own:0})
            }
          })
        }).catch((code)=>{
          this.getbaoinfo({})
          let msg = '登录失败'
          if(code == '001'){
            msg = '未连接钱包，请链接钱包'
          }
          this.$q.notify({
            message: msg,
            timeout: 100,
            type: 'negative',
            position:"center"
          })
        })
      }else{
        // 注销
        eosclose()
        this.getbaoinfo({})
        this.setinfo({eos:0})
        this.setinfo({own:0})
        this.setinfo({name:''})
        this.islogin = !this.islogin
        this.downlogin = false
      }
    },
    // 获取红包列表信息
    getbaoinfo(data){
      get('/get_money_list',data).then((val)=>{
        console.log(val)
        let newval = val.data
        let newdata = [[],[],[],[],[],[]]
        for(let i =0;i<newval.length;i++){
          let obj = {
            name:newval[i].name,
            packetId:newval[i].packetId,
            txId:newval[i].txId,
            type:1,
            num:newval[i].num,
            eos:newval[i].eos,
            time:newval[i].time*1000,
            none:newval[i].none,
            isgo:newval[i].isgo
          }
          if(newdata[newval[i].index]){
            newdata[newval[i].index].push(obj)
          }else{
            newdata[newval[i].index][0] = obj
          }
        }
        console.log(newdata)
        this.setpackage(newdata)
      }) 
    },
    // 打开关闭游戏介绍
    openrule(){
      this.rules = !this.rules
    },
    // 跳转页面
    thepage(i){
      this.page = i
      if(i == 2){
        this.leftopen()
        this.invitation = !this.invitation
        return false
      }
      let list = ['/mylist','/record-hair','','','/record-jiang']
      this.$router.push(list[i])
    },
    // 侧滑开关
    leftopen(){
      this.openleft = !this.openleft
    },
    // 语言切换
    changeL(i){
      this.leftDrawerOpen = !this.leftDrawerOpen
      this.changeI = i
      this.thislanguage(i)
    },
    // 获取红包基本信息
    getinfos(){
      let self = this
      return new Promise(function(resolve, reject) {
        get('/get_info').then(val =>{
          console.log(val)
          let info = {
            in_packet_count:val.data.in_packet_count,
            in_packet_sum:val.data.in_packet_sum,
            out_packet_count:val.data.out_packet_count,
            transaction_info_count:val.data.transaction_info_count,
            user_count:val.data.user_count,
            xinyunjiangchi:val.data.xinyunjiangchi
          }
          self.setinfo({info:info})
        })
      })
    },
    ...mapMutations({
      setlanguage:'SET_LANGUAGE',
      thislanguage:'THIS_LANGUAG',
      setinfo:'SET_INFO',
      setpackage:'SET_PACKAGE',
      setpackdatal:'SET_PACKDATAL',
    }),
    // 获取邀请人
    validB(){
      this.B_name = this.$route.query.ref
      console.log(this.B_name)
      this.setinfo({B_name:this.B_name})
    },
    // 邀请好友开关
    invitashow(){
      this.invitation = false
    },
    // 外链
    openURL
  },
  components:{
    smallhead,
    invitation,
    rules
  },
  watch:{
    myopenleft(newleft){
      if(newleft){
        this.openleft = newleft
        this.setinfo({menu:false})
      }
    }
  },
  created(){
    this.validB()
    this.getinfos()
  },
  mounted(){
    // 自动登录
    this.login()
  },
}
</script>
