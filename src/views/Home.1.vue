<style lang="stylus" scoped>
  @import "../common/styl/index";
  .home
    position absolute
    width 100%
    top 0vh
    height 100%
  .hometop
    height 1.64rem
    background #f9f9f9
    display flex
    justify-content space-between
    padding 0 0.8rem
    .gonggao
      font-size 0.56rem
      line-height 1.64rem
      display flex
      align-items center
      img 
        width 0.88rem
        height 1.56rem
        margin-right 0.16rem
    .rules
      font-size 0.56rem
      cursor pointer
      position relative
      margin-right 0.8rem
      line-height 1.64rem
      &:after
        position absolute
        content '\e63d'
        margin-left 0.1667rem
        font-size 0.64rem
  .content
    position absolute
    top 5.8rem
    bottom 2.2rem
    width 100%
    max-width 16rem
    padding 0 0.8rem
    box-sizing border-box
    width 100%
    display flex
    justify-content space-between
    .contentinfo
      width 100%
      height auto
    .inforight
      position absolute
      right 0
      width 4.96rem
      height 1.44rem
      background-color #eb0000
      border-radius 0.72rem 0 0 0.72rem
      border solid 1px #e5e5e5
      padding-left 0.8rem
      line-height 1.44rem
      color #ffffff
      font-size 0.56rem
      z-index 3
      &:before
        margin-right 0.24rem
      .deng
        &:before
          content ""
          position absolute
          width 0.88rem
          height 1.56rem
          background url("../assets/images/chun12.png") no-repeat center
          background-size contain
          top 1.44rem
          right 2.84rem
          transform-origin top center
          animation moveleft 3s ease-in-out 0.2s infinite
        &:after
          content ""
          position absolute
          width 2.08rem
          height 2.2rem
          background url("../assets/images/chun12.png") no-repeat center
          background-size contain
          top 1.44rem
          right 1.08rem
          transform-origin top center
          animation moveleft 3s ease-in-out infinite
  .sendbtn
    width 100%
    max-width 16rem
    padding 0 0.8rem
    box-sizing border-box
    position absolute
    height 2.08rem
    bottom 0rem
    align-items center
    justify-content center
    border-top 0.02rem solid #f3f3f3
    display flex
    background #f9f9f9
    .send
      flex 1
      p:first-of-type
        font-size 0.48rem
        text-align center
        color #333333
        &.icon
          cursor pointer
          &:after
            content "\e63d"
            margin-left 0.1667rem
            font-size 12px
            color #333333
      p:last-of-type
        margin-top 0.24rem
        font-size 16px
        text-align center
        font-weight bold
        color #f99c3b
    .btn
      flex 1
      height 1.44rem
      background url("../assets/images/btn.png") no-repeat
      background-size 100% 100%
      border none
      font-size 0.64rem
      color #ffffff
      font-weight bold
      outline none
  @keyframes moveleft
    0%
      transform rotate(0deg)
    30%
      transform rotate(45deg)
    45%
      transform rotate(15deg)
    70%
      transform rotate(45deg)
    100%
      transform rotate(0deg)
</style>


<template>
  <div class="home">
    <smallhead left="rule" center="logo" right="menu"></smallhead>
    <div class="hometop">
      <span class="gonggao" @click="openrule(2)"><img src="../assets/images/chun8.png" alt="">{{$t("message.newgonggao")}}</span>
      <span class="rules icon"  @click="openrule(0)">{{$t("message.how")}}</span>
    </div>
    <mynav :allroomred="allroomred"></mynav>
    <div class="content">
      <!-- 红包数据展示 -->
      <cube-scroll class="contentinfo" :options="options" :ref="key" :scroll-events="['scroll']" @scroll="onScrollHandle" :key="index" v-for="(items,key,index) in roomRedEnvelopeList" v-show="roomId==key">
        <div :is="item.type==1?'boxlist':item.type==2?'results':'dantiao'" ref="scrollitem" :index="index" :item="item" :key="index" v-for="(item,index) in items"></div>
      </cube-scroll>
      <div class="inforight icon icon-shang" v-show="outn>0&&userInfo.name" @click="scrollto(activeRedHeight[0].tops)"><i class="deng"></i>{{outn}}个红包</div>
    </div>
    <!-- 底部按钮 -->
    <div class="sendbtn">
      <div class="send">
        <p>{{$t("message.leifa")}}</p>
        <p>{{allInfo.user_send_num}}</p>
      </div>
      <button class="btn" @click="send">{{$t("message.sendbtn")}}</button>
      <div class="send">
        <p class="icon" @click="openrule(1)">{{$t("message.lucky")}}</p>
        <p>{{allInfo.jackpot}}</p>
      </div>
    </div>
    <rules v-show="rules" bgc="white" @openrule="openrule" :therules="therules"></rules>
    <gobao :win="win" v-show="inshow" @myshow="myshow"></gobao>
    <loadingbao v-show="loadingbao" :loadingbaodata="loadingbaodata" @myshow="myshow"></loadingbao>
  </div>
</template>

<script>
// @ is an alias to /src
import boxlist from '@/components/boxlist.vue'
import results from '@/components/results.vue'
import mynav from '@/components/mynav.vue'
import dantiao from '@/components/dantiao.vue'
import loadingbao from '@/components/loadingbao.vue'
import gobao from '@/components/gobao.vue'
import smallhead from "@/components/smallhead.vue";
import rules from "@/components/rules.vue";
import {mapGetters,mapMutations, mapActions} from 'vuex';
import {SET_CLICK_ROOMID_RED_EVELOPE_LIST, SET_ROOM_RED_EVELOPE_LIST_UPDATA, SET_ALL_INFO, SET_ROOM_RED_EVELOPE_EXPIRED} from "@store/mutation-types"
import {login} from "@common/js"
export default {
  data(){
    return{
      options:{
        startY:true,
        click:true,
        probeType:3
      },
      inshow:false,
      scrollTop:0,
      win:{},
      outn:0,
      therules: 1,
      rules: false,
      loadingbao:false,
      loadingbaodata:{}
    }
  },
  components: {
    smallhead,
    boxlist,
    results,
    rules,
    mynav,
    dantiao,
    gobao,
    loadingbao
  },
  computed:{
    ...mapGetters([
      "userInfo",
      "redEnvelopeList",
      "roomRedEnvelopeList",
      "hairRedEnvelopeCount",
      "prizeCount",
      "allInfo",
      "mysend",
      "roomId"
    ]),
    // 获取热点可抢红包高度
    activeRedHeight(){
      // 当前列表
      let redL = this.$refs.scroll.$children
      let redH = this.redEnvelopeList
      if(redL.length == 0||!redH){
        return false
      }
      let redTop = []
      for(let i=0;i<redH.length;i++){
        if(redH[i].isgo==0&&redH[i].none==0){
          redTop = [
            ...redTop,
            {
              top:redL[i].$el.offsetTop + redL[i].$el.offsetHeight,
              tops:redL[i].$el.offsetTop
            }
          ]
        }
      }
      return redTop
    },
    // 获取所有房间可抢红包
    allroomred(){
      if(!this.userInfo.name){
        return []
      }
      let arr = []
      Object.keys(this.roomRedEnvelopeList).map((v,i)=>{
        if(this.roomRedEnvelopeList[v]){
          this.roomRedEnvelopeList[v].map(v1=>{
            if(v1.type==1&&!v1.isgo&&!v1.none){
              arr[i]?arr[i] += 1:arr[i] = 1
            }
          })
        }
      })
      return arr
    },
  },
  methods: {
    changeE(index) {
      let roomid = index;
      // 修改焦点数据
      let data = this.roomRedEnvelopeList[index]
      this.SET_CLICK_ROOMID_RED_EVELOPE_LIST({roomid, redEnvelopeList: data})
      this.$nextTick(()=>{
        this.scrollbottom()
      })
    },
    send(){
      if (JSON.stringify(this.userInfo) === "{}") return login();
      this.$router.push("/send")
    },
    myshow(win){
      if(win){
        this.win = win
      }
      this.inshow = !this.inshow
    },
    openrule(i){
      if(i != 'undefined'){
        this.therules = i
      }
      this.rules = !this.rules
    },
    // 滚动监听
    onScrollHandle(e){
      this.scrollTop = Math.abs(e.y)
      this.thisgobao()
    },
    // 判断窗口外可抢红包
    thisgobao(){
      // 判断登录
      if(!this.userInfo.name){
        return false
      }
      let a = 0
      for(let i=0;i<this.activeRedHeight.length;i++){
        if(this.scrollTop>this.activeRedHeight[i].top){
          a = i+1
        }else{
          break;
        }
      }
      this.outn = a
    },
    // 点击滚动
    scrollto(H){
      // 确认目标
      this.$refs.scroll.scrollTo(0,-H,1000,'ease')
    },
    // 滚到底部
    scrollbottom(){
      let x = 0
      // let y = this.$refs.scroll.scroll.maxScrollY
      let y = this.$refs.scroll.scroll.scrollerHeight-this.$refs.scroll.scroll.scroller.clientHeight
      if(y<0){
        this.$refs.scroll.scrollTo(x,y,1)
      }
      this.thisgobao()
    },
    // 获取vuex方法
    ...mapActions({
      SET_CLICK_ROOMID_RED_EVELOPE_LIST,
      SET_ROOM_RED_EVELOPE_LIST_UPDATA,
      SET_ROOM_RED_EVELOPE_EXPIRED
    }),
    ...mapMutations({
      SET_ALL_INFO
    }),
    // 打开红包loading
    openloadingbao(loadingbaodata){
      this.loadingbaodata = loadingbaodata
      this.loadingbao = !this.loadingbao
    },
    // 关闭红包
    closeloadingbao(){
      this.loadingbao = !this.loadingbao
    }
  },
  // watch:{
  //   redEnvelopeList(newlist,oldlist){
  //     if(!newlist||!oldlist||newlist.length==oldlist.length){
  //       return false
  //     }
  //     this.$nextTick(()=>{
  //       this.$refs.scroll.refresh()
  //       this.scrollbottom()
  //     })
  //   }
  // }
}
</script>
