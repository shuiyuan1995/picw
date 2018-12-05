<style lang="stylus" scoped>
  .smallhead
    flex 1
    align-items center
    .icon
      margin 0 0.68rem
      &:before
        font-size 0.8rem
      &:last-of-type  
        margin-right 0.6rem
    p
      font-size 0.64rem
      flex 1
      text-align center
</style>

<template>
  <div class="smallhead flex">
    <span @click="prev" class="icon icon-Left" v-show="!judge"></span>
    <p>{{title}}</p>
    <span v-show="share" class="icon icon-fenxiang3"></span>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
  props:{
    title:{
      type:String
    },
    share:{
      type:Boolean,
      default:false
    },
    judge:{
      type:String
    }
  },
  methods:{
    prev(){
      this.setchange({home:true})
      this.$router.go(-1)
    },
    ...mapMutations({
      setchange:'SET_CHANGE'
    }),
  }
}
</script>
