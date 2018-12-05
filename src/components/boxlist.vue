<style lang="stylus" scoped>
  .boxlist
    width 10.04rem
    cursor pointer
  .over
    opacity 0.5
  .sendname
    font-size 12px
    margin-bottom 0.32rem
    .time
      color: #cccccc;
  .box
    width 100%
    height: 3.7rem;
    border-radius: 0.48rem;
    border: solid 0.04rem #dedede;
    overflow hidden
    margin-bottom 0.98rem
    .box-top
      height: 2.58rem;
      background #f99c3b
      align-items center
      img 
        width: 1.54rem;
        height: 1.9rem;
        margin 0 0.44rem 0 0.48rem;
      p:first-of-type
        color: #ffffff;
        font-size: 0.6rem;
        margin-bottom 0.28rem
      p:last-of-type
        color: #ffffff;
        font-size: 0.48rem;
    .box-bottom
      height 1.12rem
      line-height 1.12rem
      margin-left 0.48rem
      font-size 0.48rem
</style>

<template>
  <div class="boxlist" :class="item.none?'over':''" @click="go">
    <p class="sendname">{{item.name}} <span class="time">( {{timer}} )</span></p>
    <div class="box">
      <div class="box-top flex">
        <img src="../common/images/bao.png">
        <div>
          <p>{{thislang.baotxt}}</p>
          <p>{{thislang.baotxt1}}</p>
        </div>
      </div>
      <div class="box-bottom">{{thislang.baotxt2}}：{{item.num}}</div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { date } from 'quasar'
import {selectPacket} from '../scattereos'
import {post} from '../api'
export default {
  props:{
    item:{
      type:Object
    }
  },
  data(){
    return{
      over:true
    }
  },
  methods:{
    go(){
      // this.$q.loading.show()
      // selectPacket("wenbo",Number(this.item.packetId),"qizhan","5JqRdMU696xCvtFoMutNBz88N9Q7EdX42W4Hy9rp9VPhxug7jJN").then((data)=>{
      //   this.$q.loading.hide()
      //   console.log(data)
      // }).catch(e => {
      //   this.$q.loading.hide()
      //   console.log(e)
      // });

    }
  },
  computed:{
    ...mapGetters([
      "thislang"
    ]),
    timer(){
      return date.formatDate(this.item.time, 'HH:mm:ss')
    }
  },
}
</script>
