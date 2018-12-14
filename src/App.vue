<style lang="stylus" scoped>
  .q-item
    font-size 12px !important
  #app
    background rgb(31,41,36)
</style>


<template>
  <div id="app" v-cloak class="scroll no-scroll">
    <router-view/>
  </div>
</template>

<script>
import {mapMutations,mapGetters} from 'vuex';
import io from "socket.io-client";
import {get} from './api'
import { date } from 'quasar'
export default {
  created(){
    // 调用可抢红包

    // 登录
    
    // 调用可抢红包
    get('/get_money_list').then((val)=>{
      console.log(1)
      console.log(val)
      let newval = val.data
      let newdata = [[],[],[],[],[],[]]
      for(let i =0;i<newval.length;i++){
        let obj = {
          name:newval[i].name,
          packetId:newval[i].packetId,
          txId:newval[i].txId,
          type:1,
          num:newval[i].num,
          eos:newval[i].eos,
          time:newval[i].time*1000,
          none:newval[i].none,
          isgo:0
        }
        if (newdata[newval[i].index]) {
          newdata[newval[i].index] = [
            ...newdata[newval[i].index],
            obj
          ]
        }
      }
      this.setpackage(newdata)
      this.setpackdatal(newdata[0])
    })
  },
  mounted(){
    // 调用socket
    const socket = process.env.NODE_ENV !== "production" ? io('http://pickown.test:6001') : io(window.location.origin);
    let self = this
    socket.on('connect',()=>{});
    // 接收红包广播
    socket.on('issus_packet', (val)=>{
      console.log("接收红包",val)
      const {in_packet_count, in_packet_sum, out_packet_count, transaction_info_count, user_count, xinyunjiangchi} = val.info || {};
      // 更新信息
      let info = {
        in_packet_count,
        in_packet_sum,
        out_packet_count,
        transaction_info_count,
        user_count,
        xinyunjiangchi
      }
      self.setinfo({info:info})
      // 判断是否是自己发的红包
      if(self.infos.name == val.name){
        return false
      }
      if(val.index>self.packages.data.length){
        return false
      }
      let {out_packet} = val
      let data = {
        index:val.index,
        data:{
          name:val.name,
          packetId:out_packet.eosid,
          txId:out_packet.blocknumber,
          type:1,
          num:out_packet.tail_number,
          eos:out_packet.issus_sum,
          time:out_packet.created_at*1000,
          none:false
        }
      }
      self.setpackage(data)
      self.setpackdatal(self.packages.data[self.packages.this])
    })
    // 接收领完消息
    socket.on('income_packet', function(val) {
      const {in_packet_count, in_packet_sum, out_packet_count, transaction_info_count, user_count, xinyunjiangchi} = val.data || {}
      let info = {
        in_packet_count,
        in_packet_sum,
        out_packet_count,
        transaction_info_count,
        user_count,
        xinyunjiangchi
      }
      self.setinfo({info:info})
      if(val.type == 2){
        let item = {}
        // 查找当前领完红包标识
        let tempd = self.packages.data[val.index]
        if(tempd.length>0){
          for(let i=0;i<tempd.length;i++){
            if(tempd[i].packetId == val.out_packet.eosid){
              item = {
                index:val.index,
                index1:i,
                data:{
                  none:1
                }
              }
            }
          }
        }
        if(Object.keys(item).length != 0){
          self.setpackdata(item)
        }
        // 发出信息
        let newlist = {
          index:val.index,
          data:{
            name:val.name,
            num:val.out_packet.tail_number,
            time:date.formatDate(val.out_packet.created_at*1000, 'HH:mm:ss'),
            in_packet_data:val.in_packet_data,
            type:2
          }
        }
        self.setpackage(newlist)
        self.setpackdatal(self.packages.data[self.packages.this])
      }
    })
    socket.on('disconnect', function(){
    });
  },
  methods:{
    ...mapMutations({
      setpackage:'SET_PACKAGE',
      setpackdata:'SET_PACKDATA',
      setinfo:'SET_INFO',
      setpackdatal:'SET_PACKDATAL',
    }),
  },
  computed:{
    ...mapGetters([
      "packages","infos"
    ])
  }
}
</script>

