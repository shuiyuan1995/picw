<style lang="stylus" scoped>
  .bg
    background rgba(0,0,0,0.6)
  .purse-dashboard
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100
    background-color: #ffffff;
    width: 13.4rem;
    min-height: 10.16rem;
    padding-bottom: 0.8rem;
    border-radius: 0.32rem;
    box-shadow: 0 0 2px #cccccc;
    overflow: hidden;
    user-select: none;
    h2
      font-size: 0.96rem;
      color: #000000;
      text-align: center;
      height: 2.08rem;
      font-weight: 600;
      line-height: 2.08rem;
      margin: 0;
    ul
      display: flex;
      border-bottom 0.08rem solid #cecece
      li
        flex: 1;
        height: 1.8rem;
        line-height: 1.8rem;
        white-space: nowrap;
        cursor: pointer;
        text-align: center;
        font-size: 0.72rem;
        &.active
          background: #e50c07
          color #ffffff
    .input-wrap
      padding: 0.64rem 0.64rem;
      position relative
      .el-input__inner
        border-bottom: 1px solid #cecece;
        box-sizing: border-box;
        display: inline-block;
        height: 1.6rem;
        line-height: 1.6rem;
        outline: 0;
        padding: 0 2rem 0 0.6rem;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
        font-size: 0.76rem;
        color: #4b4b4b;
      em
        position absolute
        color: #babb7a;
        font-size: 0.64rem;
        bottom: 1.2rem;
        right: 0.8rem;
    .purse-btn
      width: 50vw;
      max-width: 7.6rem;
      line-height: 1.44rem;
      border: 0.08rem solid #e50c07;
      cursor: pointer;
      border-radius: 0.28rem;
      color: #fff;
      font-size: 0.76rem;
      text-align: center;
      background-color: #e50c07;
      box-shadow: 0 0 0.48rem #ffffff inset;
      margin: 0.48rem auto;
    .icon-close
      position absolute
      font-size 0.88rem
      top 0.64rem
      right 0.64rem
</style>

<template>
  <div class="recharge">
    <div class="bg" @click="close"></div>
    <div class="purse-dashboard">
      <h2>平台充值</h2>
      <ul>
        <li @click="change(0)" :class="thetable==0?'active':''">充值</li>
        <li @click="change(1)" :class="thetable==1?'active':''">提现</li>
      </ul>
      <div class="input-wrap">
        <input v-model="money" type="text" autocomplete="off" placeholder="请输入金额" class="el-input__inner">
        <em>{{thismoney.name}}</em>
      </div>
      <div v-show="thetable==1" style=" text-align: center; font-size: 13px;">
        <span>最多可提现:</span>
        <span style="padding: 0px 6px; font-size: 1.05em;">{{allInfo.user_money}}</span>
        <span>{{thismoney.name}}</span>
      </div>
      <div class="purse-btn" @click="thechange">{{thetable==0?'充值':'提现'}}</div>

      <i class="icon icon-close" @click="close"></i>
      <div v-show="thetable==0" style=" text-align: center; font-size: 13px;">
        <span>可充值余额:</span>
        <span style="padding: 0px 6px; font-size: 1.05em;">{{eosbalance}}</span>
        <span>{{thismoney.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {arbitrarySignature} from "@common/js"
import { mapGetters } from "vuex";
import {post} from '@api';
export default {
  data(){
    return{
      thetable:0,
      money:''
    }
  },
  computed:{
    ...mapGetters([
      "allInfo",
      "thismoney",
      "eosbalance"
    ]),
  },
  methods:{
    change(num){
      this.thetable = num
    },
    // 充值提现
    thechange(){
      if(this.thetable){
        post('/reflect',{sum:this.money}).then(json=>{
          this.money = '';
          this.$createToast({
            txt: "提现成功，请等待确认",
            time: 2000,
            type: 'txt'
          }).show()
        })
      }else{
        this.money = Number(this.money).toFixed(4)
        let amount = `${this.money} ${this.thismoney.name}`
        arbitrarySignature(amount).then(json=>{
          console.log('json: ',json.transaction_id)
          this.$createToast({
            txt: "充值成功，请等待确认",
            time: 2000,
            type: 'txt'
          }).show()
          post('/recharge',{sum:this.money,txid:json.transaction_id}).then(()=>{})
          this.money = '';
        }).catch(err=>{
          this.$createToast({
            txt: err.details[0].message,
            time: 2000,
            type: 'txt'
          }).show()
        })
      }
    },
    close(){
      this.$parent.close(false)
    },
    // 获取钱包余额
    getmone(){
      
    }
  }
};
</script>
