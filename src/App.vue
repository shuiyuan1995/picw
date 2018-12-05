<style lang="stylus" scoped>
  .q-item
    font-size 12px !important
</style>


<template>
  <div id="app" class="scroll no-scroll">
    <router-view/>
  </div>
</template>

<script>
// import {mapMutations,mapGetters,mapActions} from 'vuex';
import {mapActions,mapMutations,mapGetters} from 'vuex';
import io from "socket.io-client";
import data from '@/common/data/data.json'
export default {
  created(){
    let mydata = {
      Language:data.language,
      index:1
    }
    this.languageAsyn(mydata)
    const socket = io('http://pickown.test:6001');
    let self = this
    socket.on('connect', function(){});
    socket.on('issus_packet', function(val) {
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
          time:out_packet.created_at,
          none:false
        }
      }
      self.setpackage(data)
      self.setinfo([val.index,true])
    })
    socket.on('disconnect', function(){
    });
  },
  methods:{
    ...mapActions([
      'languageAsyn'
    ]),
    ...mapMutations({
      setpackage:'SET_PACKAGE',
      setinfo:'SET_INFO',
    }),
  },
  computed:{
    ...mapGetters([
      "packages","infos"
    ])
  }
}
</script>

