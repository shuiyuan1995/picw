<style lang="stylus" scoped>
  .hall
    min-height: calc(100vh - 50px)
    background url(../common/images/bg1.jpg) no-repeat top
    background-size 100%
    padding 0.04rem 0.8rem 0 0.8rem
    position relative
  .classify
    width 100%
    height 1.64rem
  .myul
    list-style none
    padding 0
    height 9.16rem
  .btn
    width 100%
    padding 0rem 0.8rem
    bottom 0.8rem
    .gobtn
      width 100%
      background-color #56b416
      height 1.82rem
      border-radius 1.84rem
      font-size 0.64rem
      color #ffffff
      font-weight 600
      box-sizing border-box
</style>


<template>
  <q-page>
    <div class="hall column">
      <problem></problem>
      <classify class="classify" page="home"></classify>
      <ul class="myul flex row">
        <li class="col-4" :key="index" v-for="(item,index) in thelists" is="mylist" :item="item"></li>
      </ul>
      <div class="btn fixed-bottom">
        <q-btn :label="thislang.sendbtn" class="gobtn" @click="$router.push('/send')"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import problem from '@/components/problem.vue'
import classify from '@/components/classify.vue'
import mylist from '@/components/mylist.vue'
import {mapGetters} from 'vuex';
export default {
  components: {
    problem,
    classify,
    mylist
  },
  computed:{
    ...mapGetters([
      "thislang","packages"
    ]),
    thelists(){
      // 筛选红包数组
      if(!this.packages.data[this.packages.this]){
        return []
      }
      return this.packages.data[this.packages.this].filter((val) => {
        if(this.packages.all){
          return val.status == 1
        }else{
          return val.status == 0
        }
      })
    }
  },
}
</script>
