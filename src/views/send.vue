<style lang="stylus" scoped>
  .send
    min-height: calc(100vh - 50px)
    background-size 100%
    padding 0.04rem 0.8rem 0 0.8rem
    position relative
    max-width 16rem
    margin  0 auto
    & > p
      margin 1.48rem 0 0.64rem
      font-size 0.56rem
      color #222222
    .content
      height 7.72rem
      background-color rgba(#f5f5f5,0.9)
      border-radius 0.2rem
      box-sizing border-box
      padding 1rem 1.36rem 0 1.04rem
      .one
        align-items center
        height 1.44rem
        span 
          font-size: 0.56rem;
          color: #e30714;
      .inputone
        width 4.8rem
        height 1.44rem
        background-color: #ffffff;
        border: solid 0.04rem #b5b5b5;
        margin-left 0.24rem
        font-size 0.56rem
      p
        font-size 0.56rem
        line-height 0.72rem
        color #ec0707
        margin 0.6rem 0 1rem
      .two
        align-items center
        height 1.2rem
        span 
          font-size 0.56rem
          color #333333
        .inputtwo
          width 1.98rem
          height 1.2rem
          background-color #f62d40
          border-radius 0.2rem
          margin 0 0.16rem
          font-size 14px
          color #ffffff
    .gobtn
      width 100%
      background-color #56b416
      height 1.82rem
      border-radius 1.84rem
      font-size 0.64rem
      color #ffffff
      font-weight 600
      box-sizing border-box
      margin-top 2.08rem
    .classify
      width 100%
      height 1.64rem
</style>

<template>
  <div class="send column">
    <p>{{thislang.choosenum}}</p>
    <classify class="classify"></classify>
    <p>{{thislang.chooseluck}}</p>
    <div class="content">
      <div class="one flex"><span>No.</span><q-input hide-underline @keyup="lastnum" maxlength="1" class="inputone" v-model="number" align="center" type="number"/></div>
      <p>{{thislang.explain}}</p>
      <div class="two flex"><span>{{thislang.explain1}}</span></div>
    </div>
    <q-btn :label="thislang.sendbtn1" class="gobtn" @click="send"/>
  </div>
</template>

<script>
import classify from '@/components/classify.vue'
import {mapGetters,mapMutations} from 'vuex';
import {createRedPacket} from '../scattereos'
import {post} from '../api'
export default {
  data(){
    return{
      number:0, //尾数
      eosnum:[1,5,10,20,50,100]
    }
  },
  components: {
    classify
  },
  methods:{
    lastnum(){
      // 保留一位数字
      this.number = String(this.number).substr(0,1)
    },
    send(){
      this.$q.loading.show()
      let data1 ={
        ame:"wenbo",
        token:"123",
        userid:"12",
        issus_sum:this.eosnum[this.packages.this],
        tail_number:this.number,
        count:10,
        eosid:'response.packetId',
        blocknumber:'response.txId',
        addr:this.infos.B_name
      }
      post('/issus_packet',data1).then((val)=>{
        console.log(val)
        this.$q.loading.hide()
      })
      // createRedPacket("wenbo", this.eosnum[this.packages.this], Number(this.number), "qizhan").then(response=>{
      //   let data = {
      //     index:this.packages.this,
      //     data:{
      //       name:"wenbo",
      //       packetId:response.packetId,
      //       txId:response.txId,
      //       type:1,
      //       num:this.number,
      //       eos:this.eosnum[this.packages.this],
      //       time:new Date(),
      //       none:false
      //     }
      //   }
      //   let data1 ={
      //     token:"123",
      //     userid:"435",
      //     issus_sum:this.eosnum[this.packages.this],
      //     tail_number:this.number,
      //     count:10,
      //     eosid:'response.packetId',
      //     blocknumber:'response.txI'd,
      //     addr:this.infos.B_name
      //   }
      //   post('/issus_packet',data1).then((val)=>{
      //     console.log(val)
      //   })
      //   this.setpackage(data)
      //   this.$q.loading.hide()
      //   this.$q.notify({
      //     message: this.thislang.sendok,
      //     timeout: 100,
      //     type: 'positive',
      //     position:"center"
      //   })
      //   this.$router.push('/')
      //   this.setchange({home:true})
      // }).catch(e => {
      //   this.$q.loading.hide()
      //   alert(e)
      // });
    },
    ...mapMutations({
      setchange:'SET_CHANGE',
      setpackage:'SET_PACKAGE',
    }),
  },
  computed:{
    ...mapGetters([
      "thislang","packages","infos"
    ])
  },
}
</script>
