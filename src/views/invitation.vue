<style lang="stylus" scoped>
  .invitation
    text-align center
    h2
      text-align center
      font-size 0.72rem
      color #222222
      margin 0.88rem 0
    .info
      margin 0 0.8rem 0.28rem
      align-items center
      flex-wrap nowrap
      display flex
      input 
        flex 1
        width: 100%;
        margin-right 0.32rem
        height: 1.28rem;
        background-color: #f4f4f4;
        outline none
        border-radius: 0.08rem;
        font-size 0.48rem
        padding-left 0.2rem
      button 
        flex 0 0 3.32rem;
        width: 3.32rem;
        height: 1.28rem;
        background-color: #eb1726;
        border-radius: 0.08rem;
        border none
        font-size 0.56rem
        color #ffffff
    .txt
      padding 0 0.8rem
      font-size 0.56rem
    h3
      width 5.76rem
      height 3rem
      background url("../common/images/icon32.png") no-repeat center
      background-size 100% 100%
      margin 0 auto
      text-align center
      font-size 0.6rem
      color #b32023
      font-weight bold
      box-sizing border-box
      padding-top 1.84rem
      margin-top 1.8rem
    .myreward
      margin 0.52rem 0.8rem
      height: 3.04rem;
      background-color: #ba02c6;
      border-radius: 0.16rem;
      background #e51c23
      padding 0.4rem
      box-sizing border-box
      div
        height 100%
        display flex
        align-items center
        justify-content center
        border-radius: 0.1rem;
        border: solid 0.04rem #fd851a;
        font-size 0.96rem
        font-weight bold
        color #ffffff
        span 
          font-weight bold
          color #ffc000
    .receive
      height 1.44rem
      min-width 4rem
      background url("../common/images/btn.png") no-repeat center
      background-size 100% 100%
      border none 
      outline none
      font-size 0.56rem
      color #ffffff
      padding 0 0.4rem
    .footer
      padding 0 0.8rem
      border-top 0.28rem solid #f5f5f5
      margin-top 0.8rem
      li
        width 100%
        height 1.8rem
        line-height 1.8rem
        font-size 0.56rem
        color #000000
        justify-content space-between
        display flex
        border-bottom 0.04rem solid #f5f5f5
  .orange
    color #ff9600
</style>

<template>
  <div class="invitation">
    <smallhead left="rule" center="logo" right="menu"></smallhead>
    <h2>{{$t("message.yaoqin")}}</h2>
    <div class="info flex">
      <input readonly type="text" :value="href" id="copyObj">
      <button @click="copy">{{$t("message.copy")}}</button>
    </div>
    <p class="txt">{{$t("message.yaolin")}}</p>
    <h3>{{$t("message.myjiang")}}</h3>
    <div class="myreward">
      <div><span>{{Number(shengyu_sum).toFixed(4)}}</span>&nbsp;EOS</div>
    </div>
    <button class="receive" @click="lin">{{$t("message.tolin")}}</button>
    <ul class="footer">
      <li @click="openinvitation">
        <p>{{$t("message.leiyao")}}（{{$t("message.player")}}）</p>
        <p><span class="orange">{{sum?sum:0}}</span><i class="icon icon-pagenext"></i></p>
      </li>
      <li @click="openinvitation">
        <p>{{$t("message.leijiang")}}</p>
        <p><span class="orange">{{Number(tixian_sum).toFixed(4)}}</span>EOS<i class="icon icon-pagenext"></i></p>
      </li>
    </ul>
    <invitationlist v-show="invitation" :list="list" :invitation="invitation"></invitationlist>
  </div>
</template>

<script>
import invitationlist from "@/components/invitationlist.vue";
import smallhead from "@/components/smallhead.vue";
import {mapGetters,mapMutations} from 'vuex';
import {SET_LOADING} from "@store/mutation-types"
import {post,get} from "@api"
export default {
  created(){
    this._getInfo();
  },
  data(){
    return{
      shengyu_sum:"",
      sum:"",
      tixian_sum:"",
      list:[],
      invitation:false
    }
  },
  components:{
    smallhead,
    invitationlist
  },
  computed:{
    ...mapGetters([
      "userInfo"
    ]),
    href() {
      return window.location.origin + "?ref=" + this.userInfo.name;
    }
  },
  methods:{
    ...mapMutations({
      SET_LOADING
    }),
    // 点击复制
    copy(){
      let url = document.querySelector('#copyObj');
      var NValue=url.value;
      var valueLength = NValue.length;
      this.selectText(url, 0, valueLength);
      document.execCommand("Copy");
      const toast = this.$createToast({
        txt: "复制成功",
        time: 2000,
        type: 'txt'
      })
      toast.show()
      this.$emit('invitashow')
    },
    selectText(textbox, startIndex, stopIndex) {
      if(textbox.createTextRange) {//ie
          var range = textbox.createTextRange();
          range.collapse(true);
          range.moveStart('character', startIndex);//起始光标
          range.moveEnd('character', stopIndex - startIndex);//结束光标
          range.select();//不兼容苹果
      }else{//firefox/chrome
          textbox.setSelectionRange(startIndex, stopIndex);
          textbox.focus();
      }
    },
    lin(){
      // 余额判断
      if(Number(this.shengyu_sum)<=0){
        return false
      }
      // 余额提现
      this.SET_LOADING(true)
      scatWithdrawref().then((val)=>{
        post('/post_tixian', {
          money:(val/10000).toFixed(4)
        }).then(json => {
          this.SET_LOADING(false)
          const {shengyu_sum, sum, tixian_sum,list} = json.data;
          this.shengyu_sum = shengyu_sum;
          this.sum = sum;
          this.tixian_sum = tixian_sum;
          this.list = list;
        }).catch(e => {
          this.SET_LOADING(false)
        })
      }).catch(e =>{
        // 提示信息
        const errObje = {
          "3081001": "Transaction reached the deadline set due to leeway on account CPU limits",
          "3080004": "Transaction exceeded the current CPU usage limit imposed on the transaction",
          "3040005": "交易超时",
          "3123456": "找不到对应红包",
          "3123457": "发送失败",
          "3080001": "Account using more than allotted RAM usage",
          "10001":"没有该推荐人的信息",
          "10002":"无可提取余额"
        }
        if(e == 10002){
          post('/post_tixian', {
            money:this.shengyu_sum
          }).then(json => {
            this.SET_LOADING(false)
            const {shengyu_sum, sum, tixian_sum,list} = json.data;
            this.shengyu_sum = shengyu_sum;
            this.sum = sum;
            this.tixian_sum = tixian_sum;
            this.list = list;
            return false
          }).catch(e => {
            this.SET_LOADING(false)
            return false
          })
        }
        const toast = this.$createToast({
          txt: errObje[e] || "服务器繁忙，请稍后再试",
          time: 2000,
          type: 'txt'
        })
        toast.show()
        this.SET_LOADING(false)
      })
    },
    // 获取信息
    _getInfo() {
      this.SET_LOADING(true)
      get('/get_tixian_info').then(json => {
        console.log(json)
        this.SET_LOADING(false)
        const {shengyu_sum, sum, tixian_sum,list} = json.data;
        this.shengyu_sum = shengyu_sum;
        this.sum = sum;
        this.tixian_sum = tixian_sum;
        this.list = list;
      })
    },
    openinvitation(){
      this.invitation = !this.invitation
    }
  }
}
</script>
