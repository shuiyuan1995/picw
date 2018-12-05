<style lang="stylus" scoped>
  .list
    list-style none
    height 4.6rem !important
    background url(../common/images/icon3.png) no-repeat center
    background-size 2.22rem 3.94rem
    position relative
    p
      font-size 0.48rem
      color #ffc600
      position absolute
      top 2.88rem
      left 1.52rem
      transform rotate(-30deg)
      margin 0
      span 
        font-size 0.84rem
    button 
      width: 2.02rem;
      height: 0.72rem;
      background url(../common/images/icon4.png) no-repeat center
      background-size 100% 100%
      border 0
      font-size 0.48rem
      color #e23026
      position absolute
      bottom 0.24rem
      right 0.3rem
      box-sizing border-box

</style>

<template>
  <li class="list OK">
    <p>NO.<span>{{item.num}}</span></p>
    <button @click="myshow">{{thislang.pick}}</button>
    <envelope  class="fullscreen" v-show="inshow" :win="Math.random()*10>5"></envelope>
  </li>
</template>

<script>
import envelope from '@/components/envelope.vue'
import {mapGetters} from 'vuex';
export default {
  props:{
    item:{
      type:Object
    }
  },
  data(){
    return{
      over:true,
      inshow:false
    }
  },
  components:{
    envelope
  },
  computed:{
    ...mapGetters([
      "thislang"
    ])
  },
  methods:{
    myshow(){
      this.inshow = !this.inshow
    }
  }
}
</script>
