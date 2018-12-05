<style lang="stylus" scoped>
  .navlist
    height 1.52rem
    background: #df000c;
    border-radius: 0.2083rem 0.2083rem 0 0;
    color #333333
    margin 0.8rem 0 0.4rem
    div
      font-size 0.56rem
      color: #ffffff;
    .icon
      font-size: 0.48rem;
      cursor pointer
      margin-right 1.2rem
      position relative
      &:after
        margin-top -0.04rem
        position absolute
        content "\e63d"
        margin-left 0.1667rem
        font-size 0.6rem
    .radiobtn
      margin-left 0.44rem
      span
        padding 0.25rem 0.6rem 0.12rem
        cursor pointer
        text-align center
        border-radius: 0.6rem;
      .active
        background-color #ffffff
        color #ff0000
      span:first-of-type
        margin-right 0.2708rem
</style>

<template>
  <div class="navlist flex justify-between items-center">
    <div class="radiobtn flex">
      <span class="capitalize" :class="changeb?'active':''" @click="change(true)">{{thislang.all}}</span>
      <span class="capitalize" :class="changeb?'':'active'" @click="change(false)">{{thislang.my}}</span>
    </div>
    <div class="icon" @click="openrule">{{thislang.how}}</div>
    <rules v-show="rules"></rules>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex';
import rules from '@/components/rules.vue'
export default {
  data(){
    return{
      changeb:true,
      rules:false
    }
  },
  methods:{
    change(b){
      this.changeb = b
      this.setpackageA(b)
    },
    openrule(){
      this.rules = !this.rules
    },
    ...mapMutations({
      setpackageA:'SET_PACKIA'
    }),
  },
  components:{
    rules
  },
  computed:{
    ...mapGetters([
      "thislang"
    ])
  },
}
</script>
