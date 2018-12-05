<style lang="stylus" scoped>
  .gobtn
    background-color #56b416
    height 1.82rem
    border-radius 1.84rem
    font-size 0.64rem
    color #ffffff
    font-weight 600
    box-sizing border-box
</style>

<template>
  <q-btn :label="index == '0'?'我要发红包':'发红包'" class="gobtn" @click="inclick"/>
</template>

<script>
export default {
  props:{
    index:{
      type:String,
      default:'0'
    }
  },
  methods:{
    inclick(){
      if(this.index == '0'){
        this.$router.push('/send')
      }else{
        this.$q.notify({
          type: 'positive',
          message: `发红包成功`,
          position: 'center',
          timeout: 100,
        })
      }
    }
  }
}
</script>
