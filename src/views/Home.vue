<style lang="stylus" scoped>
  .home
    position absolute
    width 100%
    top 0
    height 100%
  .hometop
    height 1.64rem
    background #f9f9f9
    display flex
    justify-content space-between
    padding 0 0.8rem
    .gonggao
      font-size 0.56rem
      line-height 1.64rem
      &:before
        margin-right 0.16rem
    .rules
      font-size 0.56rem
      cursor pointer
      position relative
      margin-right 0.8rem
      line-height 1.64rem
      &:after
        position absolute
        content '\e63d'
        margin-left 0.1667rem
        font-size 0.64rem
  .content
    position absolute
    top 5.8rem
    bottom 2.2rem
    width 100%
    max-width 16rem
    padding 0 0.8rem
    box-sizing border-box
    width 100%
    display flex
    justify-content space-between
    .contentinfo
      width 100%
      height auto
    .inforight
      position absolute
      right 0
      width 4.96rem
      height 1.44rem
      background-color #fafafa
      border-radius 0.72rem 0 0 0.72rem
      border solid 1px #e5e5e5
      padding-left 0.8rem
      line-height 1.44rem
      color #16b900
      font-size 0.48rem
      z-index 3
      &:before
        margin-right 0.24rem
  .sendbtn
    width 100%
    max-width 16rem
    padding 0 0.8rem
    box-sizing border-box
    position absolute
    height 2.08rem
    bottom 0rem
    align-items center
    justify-content center
    border-top 0.02rem solid #f3f3f3
    display flex
    background #f9f9f9
    .send
      flex 1
      p:first-of-type
        font-size 0.48rem
        text-align center
        color #333333
        &.icon
          cursor pointer
          &:after
            content "\e63d"
            margin-left 0.1667rem
            font-size 12px
            color #333333
      p:last-of-type
        margin-top 0.24rem
        font-size 16px
        text-align center
        font-weight bold
        color #f99c3b
    .btn
      flex 1
      height 1.44rem
      background url("../common/images/btn.png") no-repeat
      background-size 100% 100%
      border none
      font-size 0.64rem
      color #ffffff
      font-weight bold
      outline none
</style>


<template>
  <div class="home">
    <smallhead left="rule" center="logo" right="menu"></smallhead>
    <div class="hometop">
      <span class="gonggao icon icon-gonggao" @click="openrule(2)">{{$t("message.newgonggao")}}</span>
      <span class="rules icon"  @click="openrule(0)">{{$t("message.how")}}</span>
    </div>
    <mynav :allroomred="allroomred"></mynav>
    <div class="content">
      <!-- 红包数据展示 -->
      <cube-scroll class="contentinfo" :options="options" ref="scroll" :scroll-events="['scroll']" @scroll="onScrollHandle">
        <div :is="item.type==1?'boxlist':item.type==2?'results':'dantiao'" ref="scrollitem" :index="index" :item="item" :key="index" v-for="(item,index) in redEnvelopeList" @myshow="myshow"></div>
      </cube-scroll>
      <div class="inforight icon icon-shang" v-show="outn>0&&userInfo.name" @click="scrollto(activeRedHeight[0].tops)">{{outn}}个红包</div>
    </div>
    <!-- 底部按钮 -->
    <div class="sendbtn">
      <div class="send">
        <p>{{$t("message.leifa")}}</p>
        <p>{{allInfo.out_packet_count}}</p>
      </div>
      <button class="btn" @click="send">{{$t("message.sendbtn")}}</button>
      <div class="send">
        <p class="icon" @click="openrule(1)">{{$t("message.lucky")}}</p>
        <p>{{allInfo.xinyunjiangchi}}</p>
      </div>
    </div>
    <rules v-show="rules" bgc="white" @openrule="openrule" :therules="therules"></rules>
    <gobao :win="win" v-show="inshow" @myshow="myshow"></gobao>
  </div>
</template>

<script>
// @ is an alias to /src
import boxlist from '@/components/boxlist.vue'
import results from '@/components/results.vue'
import mynav from '@/components/mynav.vue'
import dantiao from '@/components/dantiao.vue'
import gobao from '@/components/gobao.vue'
import smallhead from "@/components/smallhead.vue";
import rules from "@/components/rules.vue";
import {mapGetters,mapMutations, mapActions} from 'vuex';
import {SET_CLICK_ROOMID_RED_EVELOPE_LIST, SET_ROOM_RED_EVELOPE_LIST_UPDATA, SET_ALL_INFO, SET_ROOM_RED_EVELOPE_EXPIRED,SET_RED_RESULTS} from "@store/mutation-types"
import {login} from "@common/js"
export default {
  data(){
    return{
      options:{
        startY:true,
        click:true,
        probeType:3
      },
      inshow:false,
      win:{
        num:1234,
        eos:2,
        packetId:344,
        outid:'334555',
        name:'qwerqr',
        print:123242,
        is_chailei:1,
        reward:1,
        rewardsum:23421,
        own:2342
      },
      scrollTop:0,
      outn:0,
      itemH:0, // 单个红包高度
      therules: 1,
      rules: false,
      room:['0.1','1','5','20']
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.scrollbottom()
    })
  },
  activated(){
    this.scrollbottom()
  },
  components: {
    smallhead,
    boxlist,
    results,
    rules,
    mynav,
    dantiao,
    gobao
  },
  computed:{
    ...mapGetters([
      "userInfo",
      "redEnvelopeList",
      "roomRedEnvelopeList",
      "hairRedEnvelopeCount",
      "prizeCount",
      "allInfo",
      "token",
      "mysend",
      "roomId"
    ]),
    // 获取热点可抢红包高度
    activeRedHeight(){
      // 当前列表
      let redL = this.$refs.scroll.$children
      let redH = this.redEnvelopeList
      if(redL.length == 0||!redH){
        return false
      }
      let redTop = []
      for(let i=0;i<redH.length;i++){
        if(redH[i].isgo==0&&redH[i].none==0){
          redTop = [
            ...redTop,
            {
              top:redL[i].$el.offsetTop + redL[i].$el.offsetHeight,
              tops:redL[i].$el.offsetTop
            }
          ]
        }
      }
      return redTop
    },
    // 获取所有房间可抢红包
    allroomred(){
      if(!this.userInfo.name){
        return []
      }
      let arr = []
      this.roomRedEnvelopeList.map((v,i)=>{
        if(v){
          v.map((v1)=>{
            if(v1.type==1&&!v1.isgo&&!v1.none){
              arr[i]?arr[i] += 1:arr[i] = 1
            }
          })
        }
      })
      return arr
    },
  },
  // socket维护
  sockets: {
    // 发红包通知
    issus_packet(data) {
      console.log("接收")
      console.log(data)
      const {info, name, out_packet} = data;
      const {eosid, blocknumber, tail_number, issus_sum, created_at} = out_packet;
      const index = this.room.indexOf(String(data.index))
      // 设置展示数据
      this.SET_ALL_INFO(info);
      // 如果是自己发的红包不做处理,只同步展示数据;
      // return false
      if (this.mysend.indexOf(blocknumber) > -1) return false;
      // 红包数据
      let packetData = {
        name,
        packetId: eosid,
        txId: blocknumber,
        num: tail_number,
        eos: issus_sum,
        time: created_at,
        type: 1,
        none: false
      }
      // 更新所有红包数据
      this.SET_ROOM_RED_EVELOPE_LIST_UPDATA({packetData, index})
    },
    // 抢红包通知
    income_packet(data) {
      console.log(data)
      const {info, in_packet_data, dantiao_in_packet, out_packet, type, name} = data;
      const index = this.room.indexOf(String(data.index))
      // 更新展示数据
      this.SET_ALL_INFO(info);
      this.SET_RED_RESULTS(dantiao_in_packet)

      const {blocknumber, eosid, created_at, tail_number} = out_packet;
      if(type == 2||(type == 3&&dantiao_in_packet.name == this.userInfo.name)){
        let _roomItemEnvelopeList = this.roomRedEnvelopeList[index];
        if(_roomItemEnvelopeList=='undefined'||!_roomItemEnvelopeList){
          return false
        }
        // 找到对应抢完的红包，改变状态
        for (let i = 0; i < _roomItemEnvelopeList.length; i++) {
          if (_roomItemEnvelopeList[i].txId === blocknumber && eosid === _roomItemEnvelopeList[i].packetId) {
            console.log(index)
            console.log(i)
            console.log(_roomItemEnvelopeList[i])
            // 修改红包展示状态
            this.SET_ROOM_RED_EVELOPE_EXPIRED({roomId: index, index: i, packetData: _roomItemEnvelopeList[i],type:type});
          }
        }
      }
      let item = {
          name:name,
          name1:dantiao_in_packet.name,
          is_chailei:dantiao_in_packet.is_chailei,
          reward_type:dantiao_in_packet.reward_type,
          type:3
        }
      // 添加表格信息
      this.SET_ROOM_RED_EVELOPE_LIST_UPDATA({packetData:item, index});
      // 判断是否为抢完红包
      if (type === 2) {
        if (JSON.stringify(in_packet_data) === "{}") return false;
        let item = {
          name:name,
          num:tail_number,
          time:created_at,
          in_packet_data:in_packet_data,
          type:2
        }
        if(in_packet_data.length<=0){
          return false
        }
        // 添加表格信息
        this.SET_ROOM_RED_EVELOPE_LIST_UPDATA({packetData:item, index});
      }
    }
  },
  methods: {
    changeE(index) {
      this.initialSlide = index;
      let roomid = index;
      // 修改焦点数据
      this.SET_CLICK_ROOMID_RED_EVELOPE_LIST({roomid, redEnvelopeList: this.roomRedEnvelopeList[index]})
      this.$nextTick(()=>{
        this.scrollbottom()
      })
    },
    send(){
      if (JSON.stringify(this.userInfo) === "{}") return login();
      this.$router.push("/send")
    },
    myshow(win){
      if(win){
        this.win = win
      }
      this.inshow = !this.inshow
    },
    openrule(i){
      if(i != 'undefined'){
        this.therules = i
      }
      this.rules = !this.rules
    },
    // 滚动监听
    onScrollHandle(e){
      this.scrollTop = Math.abs(e.y)
      this.thisgobao()
    },
    // 判断窗口外可抢红包
    thisgobao(){
      // 判断登录
      if(!this.userInfo.name){
        return false
      }
      let a = 0
      for(let i=0;i<this.activeRedHeight.length;i++){
        if(this.scrollTop>this.activeRedHeight[i].top){
          a = i+1
        }else{
          break;
        }
      }
      this.outn = a
    },
    // 点击滚动
    scrollto(H){
      // 确认目标
      this.$refs.scroll.scrollTo(0,-H,1000,'ease')
    },
    // 滚到底部
    scrollbottom(){
      let x = 0
      let y = this.$refs.scroll.scroll.maxScrollY
      this.$refs.scroll.scrollTo(x,y,1)
      this.thisgobao()
    },
    // 获取vuex方法
    ...mapActions({
      SET_CLICK_ROOMID_RED_EVELOPE_LIST,
      SET_ROOM_RED_EVELOPE_LIST_UPDATA,
      SET_ROOM_RED_EVELOPE_EXPIRED
    }),
    ...mapMutations({
      SET_ALL_INFO,
      SET_RED_RESULTS
    })
  },
  watch:{
    redEnvelopeList(newlist,oldlist){
      if(!newlist||!oldlist||newlist.length==oldlist.length){
        return false
      }
      this.$nextTick(()=>{
        this.$refs.scroll.refresh()
        this.scrollbottom()
      })
    }
  }
}
</script>
