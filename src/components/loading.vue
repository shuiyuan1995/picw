<style lang="stylus" scoped>
  .loading
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    background rgba(0,0,0,0.2)
    display flex
    justify-content center
    align-items center
    z-index 9999
</style>

<template>
  <div class="loading">
    <cube-loading :size="100"></cube-loading>
  </div>
</template>

<script>
export default {
  
}
</script>
