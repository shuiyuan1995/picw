<style lang="stylus" scoped>
  @import '~variables'
  .home
    display flex
    top 0rem
    bottom 0rem
    max-width 16rem
    margin  0 auto
    background #ffffff
  .nav
    margin-top 0.46rem
    max-width 16rem
    height 1.54rem
    border-bottom 0.1rem solid #eeeeee
    padding 0 0.8rem
    .btn-group
      height 1.53rem
    .item
      width 50%
      height 1.53rem
      text-align center
    .btn-item
      font-size 0.56rem
      height 1.53rem
      line-height 1.53rem
      font-weight bold
      position relative
      cursor pointer
      &.active
        color #eb1726
        &::after
          position absolute
          bottom 0rem
          left 0rem
          content ""
          height 0.1rem
          width 100%
          background #eb1726
    .more
      position absolute
      top 0px
      right 0px
      width 1.06rem
      height 0.62rem
      background-color #ff0000
      border-radius 0.28rem
      font-size 0.48rem
      color #ffffff
      line-height 0.62rem
      text-align center
  .content
    position absolute
    top 2.4rem
    bottom 2.1rem
    width 100%
    max-width 16rem
    // padding 0 0.8rem
    width 100%
    display flex
    justify-content space-between
    .info 
      flex 1
      flex-wrap nowrap
      padding 0 0.8rem
      // &::-webkit-scrollbar
      //   display: none;
      // &::-webkit-scrollbar-track
      //   box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      //   border-radius: 10px;
      //   background-color: #F5F5F5;
      // &::-webkit-scrollbar
      //   width: 12px;
      //   background-color: #F5F5F5;
      // &::-webkit-scrollbar-thumb
      //   border-radius: 10px;
      //   -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      //   background-color: #dddddd;
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
      &:before
        margin-right 0.24rem
    .right-num
      position absolute
      right 0.8rem
      width: 1.54rem
      height: 0.8rem
      line-height 0.8rem
      border-radius: 0.4rem
      border: solid 0.04rem #eeeeee
      font-size: 12px
      text-align center
    .right
      position absolute
      top 0.8rem
      bottom 0
      right 0.8rem
      width 1.54rem
      align-items center
      flex-wrap nowrap
      padding 0.4rem 0
    .itemright
      width 1.54rem
      height 1.9rem
      align-self center
      cursor pointer
      img 
        width 100%
        height 100%
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
      margin-left 0.24rem
      max-width 6rem
      background-color #56b416
      height 1.44rem
      margin 0 0.4rem
      border-radius 1.84rem
      font-size 0.64rem
      color #ffffff
      font-weight bold
      border none
      outline none
</style>


<template>
  <q-page class="column home no-scroll">
    <div class="nav">
      <!-- table切换列表 -->
      <swiper :options="{slidesPerView:3,initialSlide}" class="btn-group swiper-no-swiping">
        <swiper-slide class="item" v-for="(item, index) in roomList" :key="index">
          <div @click="changeE(index)" class="btn-item" :class="roomId === index ?'active':''">{{item}}</div>
          <span class="more" v-show="roomId != index&&allroomred[index]>0">{{allroomred[index]}}</span>
        </swiper-slide>
      </swiper>
    </div>
    <div class="content">
      <!-- 红包数据展示 -->
      <div class="info scroll column myscroll" @scroll="handleScroll" ref="myscroll">
        <div :is="item.type==1?'boxlist':'results'" ref="scrollitem" :index="index" :item="item" :key="index" v-for="(item,index) in redEnvelopeList" @myshow="myshow"></div>
      </div>
      <!-- <swiper :options="swiperOptionone" class="right">
        <swiper-slide class="itemright" :key="index" v-for="(item,index) in thelists" v-if="!item.none&&item.type==1">
          <img src="../common/images/bao.png" @click="scrollto(item.packetId)">
        </swiper-slide>
      </swiper> -->
      <!-- <div class="inforight icon icon-shang" v-show="outn>0&&this.infos.name" @click="scrollto(listH[0].top)">{{outn}}个红包</div> -->
      <div class="inforight icon icon-shang" v-show="outn>0&&userInfo.name" @click="scrollto(activeRedHeight[0].tops)">{{outn}}个红包</div>
    </div>
    <!-- 底部按钮 -->
    <div class="sendbtn flex">
      <div class="send">
        <p>{{$t("message.leifa")}}</p>
        <p>{{allInfo.out_packet_count}}</p>
      </div>
      <button class="btn" @click="send">{{$t("message.sendbtn")}}</button>
      <div class="send">
        <p class="icon" @click="openrule">{{$t("message.lucky")}}</p>
        <p>{{allInfo.xinyunjiangchi}}</p>
      </div>
    </div>
    <rules v-show="rules" bgc="white" @openrule="openrule" :therules="therules"></rules>
    <gobao :win="win" v-show="inshow" @myshow="myshow"></gobao>
  </q-page>
</template>

<script>
import rules from '@/components/rules.vue'
import gobao from '@/components/gobao.vue'
import boxlist from '@/components/boxlist.vue'
import results from '@/components/results.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {mapGetters,mapMutations, mapActions} from 'vuex';
import {SET_CLICK_ROOMID_RED_EVELOPE_LIST, SET_ROOM_RED_EVELOPE_LIST_UPDATA, SET_ALL_INFO, SET_ROOM_RED_EVELOPE_EXPIRED,SET_RED_RESULTS} from "@store/mutation-types"
import {login} from "@common/js"
export default {
  components: {
    swiper,
    "swiper-slide":swiperSlide,
    rules,
    gobao,
    boxlist,
    results
  },
  created(){
    console.log(this.redEnvelopeList,this.roomList)
    // this.swiperOption.initialSlide = this.packages.this
  },
  mounted(){
    this.$nextTick(()=>{
      this.scrollbottom()
    })
  },
  activated(){
    this.scrollbottom()
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
      let redL = this.$refs.myscroll.children
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
              top:redL[i].offsetTop + redL[i].offsetHeight,
              tops:redL[i].offsetTop
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
        v.map((v1)=>{
          if(v1.type==1&&!v1.isgo&&!v1.none){
            arr[i]?arr[i] += 1:arr[i] = 1
          }
        })
      })
      return arr
    },
  },
  data() {
    return {
      initialSlide: 0,
      roomList: ["0.1EOS", "1 EOS", "5 EOS"],
      inshow:false,
      win:{},
      scrollTop:0,
      outn:0,
      itemH:0, // 单个红包高度
      therules: 1,
      rules: false
    }
  },
  // socket维护
  sockets: {
    // 发红包通知
    issus_packet(data) {
      console.log("接收")
      console.log(data)
      const {index, info, name, out_packet} = data;
      const {eosid, blocknumber, tail_number, issus_sum, created_at} = out_packet;
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
        time: created_at * 1000,
        type: 1,
        none: false
      }
      // 更新所有红包数据
      this.SET_ROOM_RED_EVELOPE_LIST_UPDATA({packetData, index})
    },
    // 抢红包通知
    income_packet(data) {
      const {info, in_packet_data, dantiao_in_packet, out_packet, type, index, name} = data;
      // 更新展示数据
      this.SET_ALL_INFO(info);
      this.SET_RED_RESULTS(dantiao_in_packet)
      // 判断是否需要处理数据类型
      if(type === 3) return false;
      // 判断是否为抢完红包
      if (type === 2) {
        const {blocknumber, eosid, created_at, tail_number} = out_packet;
        let _roomItemEnvelopeList = this.roomRedEnvelopeList[index];
        if(_roomItemEnvelopeList=='undefined'||!_roomItemEnvelopeList){
          return false
        }
        // 找到对应抢完的红包，改变状态
        for (let i = 0; i < _roomItemEnvelopeList.length; i++) {
          if (_roomItemEnvelopeList[i].txId === blocknumber && eosid === _roomItemEnvelopeList[i].packetId) {
            // 修改红包展示状态
            this.SET_ROOM_RED_EVELOPE_EXPIRED({roomId: index, index: i, packetData: _roomItemEnvelopeList[i]});
          }
        }
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
    openrule(){
      this.rules = !this.rules
    },
    // 滚动监听
    handleScroll(e){
      this.scrollTop = e.target.pageYOffset || e.target.scrollTop
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
      let total = H
      let newtotal = this.scrollTop - total
      let self = this
      let step = newtotal / 25
      smoothUp()
      // 向上滚动
      function smoothUp () {
        if (self.scrollTop > total) {
          self.scrollTop -= step
          self.$refs.myscroll.scrollTop = self.scrollTop
          setTimeout(smoothUp, 10)
        } else {
          self.$refs.myscroll.scrollTop = total
        }
      }
    },
    // 滚到底部
    scrollbottom(){
      this.$refs.myscroll.scrollTop = this.$refs.myscroll.scrollHeight
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
      if(!newlist||newlist.length==oldlist.length){
        return false
      }
      this.$nextTick(()=>{
        this.scrollbottom()
      })
    }
  }
}
</script>
