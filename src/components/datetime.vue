<style lang="stylus" scoped>
  .bg
    background rgba(#000000,0.3)
    z-index 1
  .fixed-center
    z-index 2
</style>

<template>
  <div class="datetime fullscreen">
    <div class="bg fullscreen" @click="closetime"></div>
    <q-datetime-picker class="fixed-center" :min="timej.first" :max="timej.last" v-model="model" type="date" minimal dark color="red"/>
  </div>
</template>

<script>
export default {
  props:{
    timej:{
      type:Object
    }
  },
  data(){
    return{
      model:''
    }
  },
  methods:{
    // 关闭页面
    closetime(){
      this.$emit('newtime')
    }
  },
  watch:{
    // 时间监听
    model(model){
      this.$emit('newtime',model)
    }
  }
}
</script>
