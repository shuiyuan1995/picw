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
        <p class="info"><span>{{data.sum}}</span>人</p>
      </div>
      <div class="jiangold">
        <p class="txt">{{$t("message.leijiang")}}</p>
        <p class="info"><span>{{data.tixian_sum}}</span>EOS</p>
      </div>
      <div class="jiang">
        <p class="txt">{{$t("message.weilinjiang")}}</p>
        <p class="info"><span>{{data.shengyu_sum}}</span>EOS</p>
        <button class="lin" @click="lin">{{$t("message.lin")}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import smallhead from '@/components/smallhead.vue'
import {mapGetters} from 'vuex';
import {withdrawref} from '../scattereos'
import {post} from '../api'
export default {
  data(){
    return{
      data:{} //奖金信息
    }
  },
  created(){
    let data = {
      token:this.infos.token,
      userid:this.infos.userid,
    }
    this.$q.loading.show()
    post('/get_tixian_info',data).then(val => {
      this.$q.loading.hide()
      this.data = {
        shengyu_sum:val.data.shengyu_sum,
        sum:val.data.sum,
        tixian_sum:val.data.tixian_sum
      }
    }).catch(()=>{
      this.$q.loading.hide()
      this.$q.notify({
        message: "服务器繁忙，请稍后再试",
        timeout: 100,
        color: 'green',
        position:"center"
      })
    })
  },
  methods:{
    lin(){
      // 余额判断
      // if(Number(this.data.tixian_sum) <= 0){
      //   this.$q.notify({
      //     message: "没有提现余额",
      //     timeout: 400,
      //      color: 'red',
      //     position:"center"
      //   })
      //   return false
      // }
      // 余额提现
      withdrawref(this.infos.name,"pickowngames").then((val)=>{
        console.log(val)
        let data = {
          token:this.infos.token,
          userid:this.infos.userid,
          money:(val/10000).toFixed(4)
        }
        post('/post_tixian',data).then((val)=>{
          this.data = {
            shengyu_sum:val.data.shengyu_sum,
            sum:val.data.sum,
            tixian_sum:val.data.tixian_sum
          }
          // console.log(val)
        })
      })
    }
  },
  components:{
    smallhead
  },
  computed:{
    ...mapGetters([
      "infos"
    ])
  },
}
</script>

