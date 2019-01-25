<style lang="stylus" scoped>
  .flex
    display flex
  .drawer
    position absolute
    top 0rem
    bottom 0rem
    right 0rem
    width 12rem
    z-index 101
  .contentinfo
    position absolute
    top 0rem
    right 0rem
    width 12rem
    height 100%
    background #f5f5f5
  .bigtop
    border-top: 0.38rem solid #f7f7f7;
  .smalltop
    border-top: 0.08rem solid #f7f7f7;
  .bigin
    height: 2rem;
    background: #ffffff;
    align-items: center;
    padding-left: 1.36rem;
    .bigining
      position: relative;
      height: 1.16rem;
      width: 2.76rem;
      color: #ffffff;
      border: solid 1px #eb9295;
      box-sizing: border-box;
      font-size: 0.48rem;
      background: #d6262d;
      cursor: pointer;
      outline: none;
      border-radius: 0.12rem;
      &:before
        font-size: 0.48rem;
    .logindownthis
      height: 1.6667rem;
      align-items: center;
      font-family: Helvetica;
      font-size: 0.56rem;
      color: #222222;
      span 
        margin-left: 0.1458rem;
        &:before 
          font-size: 0.48rem;
      .ren
        width: 0.8rem;
        height: 0.8rem;
        text-align: center;
        line-height: 0.7rem;
        background-color: #eeeeee;
        border-radius: 50%;
        margin-right: 0.125rem;
        &:before
          font-size: 0.48rem;
          color: #8a8a8a;
      .tuichu
        margin-left: 0.4rem;
        &:before
          font-size: 0.72rem;
          color: #999999;
  .yue
    flex-wrap: nowrap;
    padding: 0.64rem;
    div
      flex: 1;
      &:first-of-type
        border-right: 1px solid #dedede;
      p
        text-align: center;
      p:first-of-type
        font-size: 0.56rem;
        color: #222222;
      p:last-of-type
        margin-top: 0.28rem;
        font-size: 16px;
        font-weight bold
        color: #ff8200;
  .share
    height: 2rem;
    background: #ffffff;
    align-items: center;
    padding-left: 1.34rem;
    span
      width: 1.3rem;
      height: 1.3rem;
      border-radius: 50%;
      background-color: #bd0d13;
      margin: 0 0.38rem;
      text-align: center;
      line-height: 1.3rem;
      cursor: pointer;
      img
        width 1rem
        height 1rem
        margin-top 0.1rem
      &:before
        font-size: 0.56rem;
        color: #ffffff;
  .topage
    background: #ffffff;
    padding: 0.24rem 0;
    li
      height: 1.68rem;
      line-height: 1.68rem;
      font-size: 0.56rem;
      padding-left: 1.68rem;
      box-sizing: border-box;
      cursor: pointer;
  .cpu
    display flex
    padding 0.32rem 0 0.32rem 1.36rem
    background #ffffff
    div
      width 1.52rem
      height 1.52rem
      background url('../common/images/icon30.png')
      background-size 100% 100%
      padding-top 0.16rem
      margin-right 0.56rem
      p
        font-size 0.48rem
        color #ffffff
        text-align center
        line-height 0.56rem
  .tolanguage
    padding: 0.32rem 1.34rem 0.32rem;
    background: #ffffff;
    .langitem
      margin: 0 0.4rem;
      border-radius: 0.08rem;
      text-align: center;
      line-height: 0.96rem;
      &.active
        background-color: #f7f7f7;
    img
      width: 0.74rem;
      height: 0.5rem;
      margin: 0.24rem 0.28rem;
  .topbox
    justify-content: space-between;
    padding: 0.32rem 1rem;
    background: #ffffff;
    li
      text-align: center;
    img
      width: 1.92rem;
      height: 1.92rem;
    p
      text-align: center;
      &:first-of-type
        font-size: 0.64rem;
      &:last-of-type
        font-size: 0.48rem;
  .lian {
    font-size: 0.48rem;
    text-align: center;
    padding 0.8rem 0
    background #ffffff
  }
</style>

<template>
  <div class="drawer">
    <cube-scroll class="contentinfo" ref="scroll">
      <div class="bigin flex">
        <!-- 登陆 -->
        <button class="bigining icon capitalize icon-dengluyonghuming" v-if="!userInfo.islogin" @click="login">{{$t("message.login")}}</button>
        <div v-else class="logindownthis flex">
          <span class="icon ren icon-dengluyonghuming"></span>
          {{userInfo.name}}
          <!-- 推出登陆 -->
          <span class="tuichu icon icon-tuichu" @click="scatGameLoginOut"></span>
        </div>
      </div>
      <!-- 余额 -->
      <div class="yue flex">
        <div>
          <p>EOS</p>
          <p>{{eosbalance}}</p>
        </div>
        <div>
          <p>OWN</p>
          <p>{{ownbalance}}</p>
        </div>
      </div>
      <!--  分享 -->
      <div class="share flex">
        <span @click="openu('https://www.facebook.com/profile.php?id=100030822884805')" class="icon icon-fecebook"></span>
        <span @click="openu('https://t.me/gtbredlotto')" class="biyong">
          <img src="../common/images/icon21.png">
        </span>
        <span @click="openu('https://t.me/gtbredlotto')" class="icon icon-telegram"></span>
      </div>
      <!-- 路由切换 -->
      <ul class="topage smalltop">
        <li :class="page == 0?'active':''" @click="thepage(0)">{{$t("message.board")}}</li>
        <li :class="page == 1?'active':''" @click="thepage(1)">{{$t("message.record")}}</li>
        <li :class="page == 2?'active':''" @click="thepage(2)">{{$t("message.invitation")}}</li>
        <li @click="openu('https://assets.pickown.com/PickOwnV1.pdf')">{{$t("message.bai")}}</li>
        <li :class="page == 4?'active':''" @click="thepage(4)">{{$t("message.lin")}}</li>
        <li :class="page == 5?'active':''" @click="thepage(5)">{{$t("message.contact")}}</li>
        <li :class="page == 6?'active':''" @click="thepage(6)">{{$t("message.hezuo")}}</li>
      </ul>
      <!-- cpu -->
      <div class="cpu smalltop">
        <div>
          <p class="knobp">{{cpu}}%</p>
          <p class="knobp">CPU</p>
        </div>
        <div>
          <p class="knobp">{{net}}%</p>
          <p class="knobp">NET</p>
        </div>
      </div>
      <!-- 语言切换 -->
      <ul class="tolanguage smalltop flex">
        <div class="langitem" :class="changeI == 'zhCHS'?'active':''" @click="changeL('zhCHS')">
          <img src="../common/images/icon9.png">
        </div>
        <div class="langitem" :class="changeI == 'en'?'active':''" @click="changeL('en')">
          <img src="../common/images/icon1.png">
        </div>
        <div class="langitem" :class="changeI == 'zhCHT'?'active':''" @click="changeL('zhCHT')">
          <img src="../common/images/icon33.png">
        </div>
      </ul>
      <ul class="topbox smalltop flex">
        <li>
          <img :src="icon12">
          <p>{{allInfo.out_packet_count}}</p>
          <p>{{$t("message.packet")}}</p>
        </li>
        <li>
          <img :src="icon13">
          <p>{{allInfo.transaction_info_count}}</p>
          <p>EOS</p>
        </li>
        <li>
          <img :src="icon14">
          <p>{{allInfo.user_count}}</p>
          <p>{{$t("message.player")}}</p>
        </li>
      </ul>
      <p class="lian smalltop">www.pickown.com</p>
    </cube-scroll>
    <invitation v-show="invitation" @invitashow="invitashow"></invitation>
  </div>
</template>

<script>
import invitation from "@/components/invitation.vue";
import { mapGetters, mapMutations } from "vuex";
import {scatGameLoginOut, login,imgUrl} from "@common/js"
import {SET_GOOGLE_MENU} from "@store/mutation-types"
export default {
  data(){
    return{
      icon12:imgUrl + 'icon12.png',
      icon13:imgUrl + 'icon13.png',
      icon14:imgUrl + 'icon14.png',
      changeI: 'zhCHS',
      page: 10, //页面nav切换样式
      invitation: false, //邀请好友
    }
  },
  computed:{
    ...mapGetters([
      "userInfo",
      "eosbalance",
      "ownbalance",
      "cpu",
      "net",
      "menuStatus",
      "allInfo",
    ]),
  },
  components:{
    invitation
  },
  methods:{
    ...mapMutations({
      SET_GOOGLE_MENU
    }),
    close(){
      this.SET_GOOGLE_MENU(false)
    },
    // 推出登陆
    scatGameLoginOut() {
      scatGameLoginOut();
      this.$router.push("/");
    },
    // 登陆
    login() {
      login(()=>{
        this.$parent.openrule(9)
      });
      this.SET_GOOGLE_MENU(false)
    },
    // 跳转页面
    thepage(i) {
      // 判断登录
      if (JSON.stringify(this.userInfo) == "{}") {
        const toast = this.$createToast({
          txt: "请登录",
          time: 2000,
          type: 'txt'
        })
        toast.show()
        return false
      };
      this.page = i;
      this.SET_GOOGLE_MENU(false)
      let list = ["/mylist", "/record-hair", "/invitation", "", "/record-jiang","/contant","/cooperation"];
      this.$router.push(list[i]);
    },
    // 打开白皮书
    openu(i){
      console.log(i)
      window.open(i,'_blank');   
      // window.location.href = i
    },
    // 邀请好友开关
    invitashow() {
      this.invitation = false;
    },
    changeL(i) {
      this.changeI = i;
      this.$i18n.locale=i
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
  watch:{
    menuStatus(newdata){
      if(newdata){
        this.$refs.scroll.refresh()
      }
    }
  }
}
</script>
