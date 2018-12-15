<style lang="stylus" scoped>
  .bg
    background rgba(#000000,0.4)
    z-index 999
  .info
    width 13.4rem
    height 7.4rem
    background #ffffff
    border-radius 0.16rem
    z-index 1000
    color #222222
    h2
      font-size 0.72rem
      text-align center
      margin-top 1.44rem
    p
      font-size 0.48rem
      margin 0 1rem
    .conent
      margin 1.4rem 1rem 0.28rem
      align-items center
      flex-wrap nowrap
      input 
        flex 1
        width: 8.32rem;
        margin-right 0.32rem
        height: 1.28rem;
        background-color: #f4f4f4;
        outline none
        border-radius: 0.08rem;
        font-size 0.48rem
        padding-left 0.2rem
      button 
        flex 0 0 2.44rem;
        width: 2.44rem;
        height: 1.28rem;
        background-color: #eb1726;
        border-radius: 0.08rem;
        border none
        font-size 0.56rem
        color #ffffff
  .close
    outline none
    background none
    border none
    margin 0.4167rem 0.4167rem 0 0
    color rgb(194, 194, 194);
    cursor pointer
    &:before
      font-size 0.72rem
</style>

<template>
  <div class="invitation fullscreen">
    <div class="bg fullscreen" @click.stop="closein"></div>
    <div class="info fixed-center">
      <h2>{{$t("message.yaoqin")}}</h2>
      <div class="conent flex">
        <input readonly type="text" :value="copytxt" id="copyObj">
        <button @click="copy">{{$t("message.copy")}}</button>
      </div>
      <p>{{$t("message.yaolin")}}</p>
      <button class="close absolute-top-right icon icon-close" @click.stop="closein"></button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  methods:{
    // 点击复制
    copy(){
      let url = document.querySelector('#copyObj');
      url.select();
      document.execCommand("Copy");
      this.$q.notify({
        message: "复制成功",
        timeout: 100,
        color: 'green',
        position:"center"
      })
      this.$emit('invitashow')
    },
    // 关闭
    closein(){
      this.$emit('invitashow')
    }
  },
  computed:{
    ...mapGetters([
      "infos"
    ]),
    // 获奖类型判断
    copytxt(){
      return this.infos.name?`${window.location.origin}?ref=${this.infos.name}`:window.location.origin
    }
  },
}
</script>
