<style lang="stylus" scoped>
  .boxlist
    width 10.04rem
    cursor pointer
  .baoright
    align-self flex-end
    // float right
  .over
    opacity 0.6
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
      flex-wrap nowrap
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
  <div class="boxlist" :class="{'over':item.none||item.isgo,'baoright':item.name == infos.name}" @click="go">
    <p class="sendname">{{item.name}} <span class="time">({{timer}})</span></p>
    <div class="box">
      <div class="box-top flex">
        <img v-if="item.none||item.isgo" src="../common/images/bao1.png">
        <img v-else src="../common/images/bao.png">
        <div class="bao">
          <p>{{$t("message.wei")}}:{{item.num}}</p>
          <p>{{item.none?$t("message.linwan"):(item.isgo?$t("message.linqu"):$t("message.baotxt1"))}}</p>
        </div>
      </div>
      <div class="box-bottom">{{$t("message.PickOwn")}}</div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import { date } from 'quasar'
import {selectPacket,getjin,getinfo} from '../scattereos'
import {post} from '../api'
export default {
  props:{
    item:{
      type:Object
    },
    index:{
      type:Number
    }
  },
  data(){
    return{
      over:true
    }
  },
  methods:{
    go(){
      // 判断登录
      if(this.infos.name.length == 0){
        alert('请先登录')
        return false
      }
      // 判断是否领完或已领取
      if(this.item.none || Number(this.item.isgo) == 1){
        this.$router.push({
          name: 'record-this',
          params: {
            txId:this.item.txId
          }
        })
        return false
      }
      this.$q.loading.show()
      // 抢红包
      console.log('抢的参数',this.infos.name,Number(this.item.packetId),"pickowngames","eosio.token",`${Number(this.item.eos).toFixed(4)} EOS`,`${!this.infos.B_name||this.infos.B_name == 'undefined'?'':this.infos.B_name}`)
      selectPacket(this.infos.name,Number(this.item.packetId),"pickowngames", "eosio.token", `${Number(this.item.eos).toFixed(4)} EOS`,`${!this.infos.B_name||this.infos.B_name == 'undefined'?'':this.infos.B_name}`).then((val)=>{
        console.log(val)
        // 判断参数
        if(!val.packetId){
          this.$q.notify({
            message: "获取失败",
            timeout: 100,
            color: 'green',
            position:"center"
          })
          return false
        }
        // 查询金钱cpu
        this.getmoney()
        // 展示上传红包data
        this.updata(val)
        this.$q.loading.hide()
      }).catch(e => {
        this.$q.loading.hide()
        // 查询金钱cpu
        this.getmoney()
        console.log(e)
        this.$q.notify({
          message: "获取失败",
          timeout: 100,
          color: 'green',
          position:"center"
        })
      });
    },
    // 查询金钱cpu
    getmoney(){
      // 查询余额
      getjin('EOS').then((val)=>{
        this.setinfo({eos:parseFloat(val[0])})
      })
      // 查询cpu
      getinfo().then(val=>{
        this.setinfo({
          cpu:val.cpu,
          net:val.net
        })
      }).catch(()=>{
        // console.log("信息获取失败")
      })
    },
    // 展示上传红包data
    updata(val){
      let item = {}
      // 判断是否为最后一个
      if(val.isLast == '1'){
        item = {
          index:this.packages.this,
          index1:this.index,
          data:{
            none:1,
            isgo:1
          }
        }
      }else{
        item = {
          index:this.packages.this,
          index1:this.index,
          data:{
            isgo:1
          }
        }
      }
      this.setpackdata(item)
      let data = {
        token:this.infos.token,
        userid:this.infos.userid,
        outid:this.item.txId,
        eosid:val.packetId,
        blocknumber:val.block_num,
        income_sum:(val.packetAmount/10000).toFixed(4),
        is_chailei:val.isBomb,
        reward_type:val.isLuck,
        reward_sum:(val.luckyAmount/10000).toFixed(4),
        addr:this.infos.B_name,
        isnone:val.isLast,
        isgo:1,
        own:(val.own/10000).toFixed(4),
        newPrizePool:(val.newPrizePool/10000).toFixed(4)
      }
      let win = {
        print:(val.packetAmount/10000).toFixed(4),
        is_chailei:val.isBomb,
        reward:val.isLuck,
        rewardsum:(val.luckyAmount/10000).toFixed(4),
        num:this.item.num,
        eos:this.item.eos,
        packetId:Number(this.item.packetId),
        outid:this.item.txId,
        own:(val.own/10000).toFixed(4)
      }
      // 展示抢红包结果
      this.$emit('myshow',win)
      this.setpackdatal(this.packages.data[this.packages.this])
      // 上传结果
      post('/income_packet',data).then((val)=>{
        console.log(val)
      }) 
    },
    ...mapMutations({
      setpackdata:'SET_PACKDATA',
      setinfo:'SET_INFO',
      setpackdatal:'SET_PACKDATAL',
    }),
  },
  created(){
    console.log(this.item)
  },
  computed:{
    ...mapGetters([
      "infos","packages"
    ]),
    // 转换时间
    timer(){
      return date.formatDate(this.item.time, 'HH:mm:ss')
    }
  },
}
</script>
