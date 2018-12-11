<style lang="stylus" scoped>
  .head
    max-width 16rem
    margin  0 auto
    height 2rem
    background #c7412f
    color #ffba41
    padding 0 0.8rem
    align-items center
    font-size 0.56rem
    span 
      flex 0 0 2.4rem
      &:not(.title)
        cursor pointer
    .title
      flex 1
      text-align center
      font-size 0.64rem
      font-weight bold
</style>

<template>
  <div class="head flex">
    <span @click="close">{{thislang.close}}</span>
    <span class="title">{{title}}</span>
    <span @click="recordpage">{{jiang?thislang.record:''}}</span>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  props:{
    // 标题
    title:{
      type:String,
    },
    // 右侧是否展示
    jiang:{
      type:Boolean,
      default:true
    }
  },
  computed:{
    ...mapGetters([
      "thislang"
    ]),
  },
  methods:{
    // 收发红包选择
    recordpage(){
      this.$q.actionSheet({
        actions: [
          {
            label: this.thislang.fa,
            handler: () => {
              this.$router.push({
                path: "/record-hair",
              })
            }
          },
          {
            label: this.thislang.shou,
            handler: () => {
              this.$router.push({
                path: "/record-closed",
              })
            }
          }
        ],
      }).then(() => {
      }).catch(() => {
      })
    },
    close(){
      this.$router.push('/')
    }
  }
}
</script>
