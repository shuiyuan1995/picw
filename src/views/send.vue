<style lang="stylus" scoped>
  .home
    z-index 2000
    background #ebebeb
    max-width 16rem
    margin 0 auto
  .send
    min-height calc(100vh - 50px)
    background-size 100%
    padding 0.04rem 0.8rem 0 0.8rem
    position relative
    max-width 16rem
    margin  0 auto
    & > p
      margin 1.12rem 0 0.64rem
      font-size 0.56rem
      color #222222
    .content
      height 9.88rem
      background-color rgba(#f5f5f5,0.9)
      border-radius 0.2rem
      box-sizing border-box
      padding 1rem 26px 0 26px
      .one
        align-items center
        height 1.44rem
        span 
          font-size 0.56rem
          color #e30714
      .inputone
        width 4.8rem
        height 1.44rem
        background-color #ffffff
        border solid 0.04rem #b5b5b5
        margin-left 0.24rem
        font-size 0.56rem
      p
        font-size 0.56rem
        line-height 0.72rem
        color #222222
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
      box-sizing border-box
      margin-top 2.08rem
      font-weight bold
      border none
      outline none
      position relative
    .classify
      width 100%
      height 1.64rem
  .numlist
    justify-content space-between
    li
      width 2.16rem
      height 1.5rem
      background-color #ffffff
      border-radius 0.08rem
      margin-top 0.12rem
      font-size 0.56rem
      color #222222
      text-align center
      line-height 1.5rem
      cursor pointer
      &.active
        background #e0010d
        color #ffffff
</style>

<template>
  <div class="home fullscreen">
    <smallhead :title='thislang.sendbtn1'></smallhead>
    <div class="send column">
      <p>{{thislang.choosenum}}</p>
      <classify class="classify"></classify>
      <p>{{thislang.chooseluck}}</p>
      <div class="content">
        <ul class="numlist flex">
          <li :class="number == item-1?'active':'shadow-1'" :key="item" v-for="item in 10" @click="gonum(item)">{{item-1}}</li>
        </ul>
        <p>{{thislang.explain}}</p>
        <div class="two flex"><span>{{thislang.explain1}}</span></div>
      </div>
      <!-- <q-btn dense :label="thislang.sendbtn1" class="gobtn" @click="send"/> -->
      <button class="gobtn" @click="send" v-ripple>{{thislang.sendbtn1}}</button>
    </div>
  </div>
</template>

<script>
import classify from '@/components/classify.vue'
import smallhead from '@/components/smallhead.vue'
import {mapGetters,mapMutations} from 'vuex';
import {createRedPacket,getjin} from '../scattereos'
import {post} from '../api'
export default {
  data(){
    return{
      number:Math.floor(Math.random()*9), //尾数
      eosnum:[1,5,10,20,50,100] //房间钱数
    }
  },
  components: {
    classify,
    smallhead
  },
  methods:{
    // 保留一位数字
    gonum(i){
      this.number = i-1
    },
    // 发红包
    send(){
      // 判断登录
      if(this.infos.name.length == 0){
        alert('请先登录')
        return false
      }
      // loading
      this.$q.loading.show()
      // 创建红包
      console.log('发的参数',this.infos.name, this.eosnum[this.packages.this], Number(this.number), "qizhan","eosio.token")
      createRedPacket(this.infos.name, this.eosnum[this.packages.this], Number(this.number), "qizhan","eosio.token").then(response=>{
        console.log(response)
        // 查询余额
        getjin('EOS').then((val)=>{
          this.setinfo({eos:parseFloat(val[0])})
        })
        let data = {
          index:this.packages.this,
          data:{
            name:this.infos.name,
            packetId:response.packetId,
            txId:response.txId,
            type:1,
            num:this.number,
            eos:this.eosnum[this.packages.this],
            time:new Date(),
            none:false
          }
        }
        let data1 ={
          token:this.$q.sessionStorage.get.item('token'),
          userid:this.$q.sessionStorage.get.item('userid'),
          issus_sum:this.eosnum[this.packages.this],
          tail_number:this.number,
          count:10,
          eosid:response.packetId,
          blocknumber:response.txId,
          addr:this.infos.B_name
        }
        // 关闭loading
        this.$q.loading.hide()
        // 向房间展示红包
        this.setpackage(data)
        this.$q.notify({
          message: this.thislang.sendok,
          timeout: 100,
          type: 'positive',
          position:"center"
        })
        this.$router.push('/')
        // 上传红包信息
        post('/issus_packet',data1).then(()=>{
        })
      }).catch((e) => {
        console.log(e)
        this.$q.loading.hide()
        this.$q.notify({
          message: "发送失败",
          timeout: 400,
          type: 'negative',
          position:"center"
        })
      });
    },
    ...mapMutations({
      setpackage:'SET_PACKAGE',
      setinfo:'SET_INFO',
    }),
  },
  computed:{
    ...mapGetters([
      "thislang","packages","infos"
    ])
  },
}
</script>
