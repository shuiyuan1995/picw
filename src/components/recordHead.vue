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
    <span @click="close">关闭</span>
    <span class="title">{{title}}</span>
    <span @click="recordpage">红包记录</span>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:'EOS红包'
    }
  },
  methods:{
    recordpage(){
      this.$q.actionSheet({
        actions: [
          {
            label: '发红包记录',
            handler: () => {
              this.$router.push({
                path: "/record-hair",
              })
            }
          },
          {
            label: '收红包记录',
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
