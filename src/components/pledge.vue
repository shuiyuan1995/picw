<style lang="stylus" scoped>
  .pledge
    position absolute
    top 0rem
    width 100%
    height 100%
  .orange
    color #ff8c14
  .info
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-50%)
    z-index 99
    width 13.4rem
    height 17.48rem
    background-color #ffffff
    border-radius 0.08rem
    padding 0.88rem 0.6rem
    box-sizing border-box
  .top
    display flex
    justify-content space-between
    flex-wrap nowrap
    align-items center
    p
      font-size 0.64rem
      color #222222
    i 
      font-size 18px
      color #bebebe
      &:last-of-type
        font-size 21px
  .banner
    height 5.36rem
    background url("../assets/images/bg7.png") no-repeat center
    background-size 100% 100%
    display flex
    flex-direction column
    align-items center
    margin-top 0.68rem
    .pledgenum
      font-size 0.48rem
      color #ffffff
      align-self flex-start
      margin 0.6rem 0 0 0.6rem
    .num
      font-size 22px
      font-weight bold
      color #ffffff
      margin-top 0.4rem
      span 
        font-weight bold
    .txt
      font-size 0.48rem
      color #ffffff
      margin-top 0.32rem
  .mybox
    height 3.08rem
    background-color #ffffff
    border solid 0.04rem #eeeeee
    box-shadow 0px 0px 4px #eeeeee
    margin-top 0.6rem
    padding 0.52rem 0.56rem
    box-sizing border-box
    .boxtitle
      display flex
      flex-wrap nowrap
      justify-content space-between
      font-size 0.48rem
    .boxcenter
      display flex
      flex-wrap nowrap
      justify-content space-between
      height 1rem
      margin-top 0.44rem
      input 
        width 8.36rem
        border 1px solid #cdcdcd
        border-radius 0.16rem
        padding-left 0.4rem
        font-size 0.48rem
        box-sizing border-box
        &::-webkit-inner-spin-button
          appearance: none
      button  
        min-width 2.44rem
        height 1rem
        background-color #ff8c14
        border-radius 0.1rem
        color #ffffff
        border none
        outline none
        cursor pointer
  .text
    font-size 0.48rem
    margin-top 0.48rem
</style>

<template>
  <div class="pledge">
    <div class="bg" @click="$parent.openpledge"></div>
    <div class="info">
      <div class="top">
        <i class="icon icon-close" @click="$parent.openpledge"></i>
        <p>{{$t("message.pledgemy")}} OWN</p>
        <i class="icon icon-bangzhu" @click="openrule(3)"></i>
      </div>
      <div class="banner">
        <p class="pledgenum">OWN{{$t("message.pledgeallnum")}}</p>
        <img src="../assets/images/icon29.png">
        <p class="num"><span class="orange">{{Number(data.allOWN).toFixed(4)}}</span> OWN</p>
        <!-- <p class="txt">({{$t("message.zhan")}} 236467758 OWN 87.90%)</p> -->
      </div>
      <div class="mybox">
        <div class="boxtitle">
          <p>{{$t("message.zhiya")}}</p>
          <p><span class="orange">{{ownbalance}}</span> OWN</p>
        </div>
        <div class="boxcenter">
          <input type="number" v-model="zhiyaOWN" :placeholder="ownbalance">
          <button @click="pledgeOWN">{{$t("message.pledge")}}</button>
        </div>
      </div>
      <div class="mybox">
        <div class="boxtitle">
          <p>{{$t("message.shuhui1")}}</p>
          <p><span class="orange">{{Number(data.balown).toFixed(4)}}</span> OWN</p>
        </div>
        <div class="boxcenter">
          <input type="number" v-model="drawownoown" :placeholder="Number(data.balown).toFixed(4)">
          <button @click="withdrawown">{{$t("message.shuhui")}}</button>
        </div>
      </div>
      <p class="text">{{$t("message.shuhui2")}}</p>
    </div>
    <rules v-show="rules" bgc="white" @openrule="openrule" :therules="therules"></rules>
  </div>
</template>

<script>
import rules from "@/components/rules.vue";
import {mapGetters} from 'vuex';
import {pledgeOWN,withdrawown} from "@common/js"
export default {
  props:{
    data:{
      type:Object
    }
  },
  data(){
    return{
      zhiyaOWN:'',
      drawownoown:'',
      rules:false,
      therules: 1,
    }
  },
  components:{
    rules
  },
  computed:{
    ...mapGetters([
      "ownbalance"
    ])
  },
  methods:{
    pledgeOWN(){
      if(Number(this.zhiyaOWN)>0){
        if(Number(this.zhiyaOWN)>Number(this.ownbalance)){
          this.$createToast({
            txt: "请输入正确金额",
            time: 2000,
            type: 'txt'
          }).show()
          return false
        }
        let own = Number(this.zhiyaOWN).toFixed(4)+' OWN'
        pledgeOWN(own).then(()=>{
          this.zhiyaOWN = ""
          this.$createToast({
            txt: "质押成功",
            time: 2000,
            type: 'txt'
          }).show()
          this.$parent.getdata()
        }).catch(()=>{
          this.$createToast({
            txt: "系统繁忙，请再次提交",
            time: 2000,
            type: 'txt'
          }).show()
        })
      }
    },
    withdrawown(){
      if(Number(this.drawownoown)>0){
        if(Number(this.drawownoown)>Number(this.data.balown)){
          this.$createToast({
            txt: "请输入正确金额",
            time: 2000,
            type: 'txt'
          }).show()
          return false
        }
        let own = Number(this.drawownoown)*10000
        withdrawown(own).then(()=>{
          this.$parent.getdata()
          this.drawownoown = ""
          this.$createToast({
            txt: "赎回成功",
            time: 2000,
            type: 'txt'
          }).show()
        })
      }
    },
    openrule(i){
      if(i != 'undefined'){
        this.therules = i
      }
      this.rules = !this.rules
    },
  }
}
</script>
