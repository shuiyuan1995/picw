<style lang="stylus" scoped>
  .recordHair
    max-width 16rem
    margin  0 auto
    z-index 2000
    background #ffffff
  .fixed-top
    z-index 999
  .nav
    margin-top 0.46rem
    height 1.54rem
    border-bottom 0.1rem solid #eeeeee
    padding 0 0.8rem
    .nav-item
      text-align center
      font-size 0.56rem
      height 1.53rem
      line-height 1.53rem
      font-weight bold
      position relative
      &.active
        color #eb1726
        &::after
          position absolute
          bottom 0rem
          left 0rem
          content ""
          height 0.1rem
          width 100%
          background #eb1726
  .center
    padding 0 0.8rem
    .ren,.jiangold,.jiang
      width 100%
      margin-top 0.6rem
      height 4.46rem
      background-color #f7f7f7
      border-radius 0.24rem
      padding-left 1.2rem
      padding-top 1.16rem
      .txt
        font-size: 0.48rem;
        color: #999999;
      .info
        font-size: 0.96rem;
        margin-top 0.64rem
        span 
          color #f99c3b
      .lin
        width 4.28rem
        height 1.28rem
        background-color #e51c23
        border-radius 0.2rem
        border none
        font-size 0.48rem
        color #ffffff
        margin-top 1.28rem
        margin-left 3.36rem
        outline none
    .jiang
      height 6.88rem
</style>

<template>
  <div class="recordHair fullscreen scroll" :class="$q.platform.is.desktop?'desktop':''">
    <smallhead :title='$t("message.myjiang")' :right="false"></smallhead>
    <div class="nav">
      <div class="nav-item active">{{$t("message.yaojiang")}}</div>
    </div>
    <div class="center">
      <div class="ren">
        <p class="txt">{{$t("message.leiyao")}}</p>
        <p class="info"><span>{{sum}}</span>人</p>
      </div>
      <div class="jiangold">
        <p class="txt">{{$t("message.leijiang")}}</p>
        <p class="info"><span>{{tixian_sum}}</span>EOS</p>
      </div>
      <div class="jiang">
        <p class="txt">{{$t("message.weilinjiang")}}</p>
        <p class="info"><span>{{shengyu_sum}}</span>EOS</p>
        <button :disabled="Number(shengyu_sum)<=0" class="lin" @click="lin">{{$t("message.lin")}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import smallhead from '@/components/smallhead.vue'
import {scatWithdrawref} from "@common/js"
import {mapGetters} from 'vuex';
import {get,post} from "@api"
export default {
  created(){
    this._getInfo();
  },
  components:{
    smallhead
  },
  computed:{
    ...mapGetters([
      "userInfo"
    ])
  },
  data(){
    return{
      shengyu_sum: "0",
      sum: "0",
      tixian_sum: "0"
    }
  },
  methods:{
    lin(){
      // 余额判断
      if(Number(this.shengyu_sum)<=0){
        return false
      }
      // 余额提现
      this.$q.loading.show();
      scatWithdrawref().then((val)=>{
        console.log(val)
        post('/post_tixian', {
          money:(val/10000).toFixed(4)
        }).then(json => {
          this.$q.loading.hide();
          const {shengyu_sum, sum, tixian_sum} = json.data;
          this.shengyu_sum = shengyu_sum;
          this.sum = sum;
          this.tixian_sum = tixian_sum;
        }).catch(e => {
          this.$q.loading.hide();
        })
      }).catch(e =>{
        if(e == 10002){
          post('/post_tixian', {
            money:this.shengyu_sum
          }).then(json => {
            this.SET_LOADING(false)
            const {shengyu_sum, sum, tixian_sum} = json.data;
            this.shengyu_sum = shengyu_sum;
            this.sum = sum;
            this.tixian_sum = tixian_sum;
            return false
          }).catch(e => {
            this.SET_LOADING(false)
            return false
          })
        }
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
        this.$q.notify({
          message: errObje[e] || "服务器繁忙，请稍后再试",
          timeout: 1500,
          color: 'red',
          position:"center"
        })
        this.$q.loading.hide();
      })
    },
    _getInfo() {
      this.$q.loading.show();
      get('/get_tixian_info').then(json => {
        this.$q.loading.hide();
        const {shengyu_sum, sum, tixian_sum} = json.data;
        this.shengyu_sum = shengyu_sum;
        this.sum = sum;
        this.tixian_sum = tixian_sum;
      })
    }
  }
}
</script>

