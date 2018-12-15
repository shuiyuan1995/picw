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
</style>


<template>
  <q-page class="column home no-scroll">
    <div class="nav">
      <!-- table切换列表 -->
      <swiper :options="{slidesPerView:2,initialSlide}" class="btn-group swiper-no-swiping">
        <swiper-slide class="item" v-for="(item, index) in roomList" :key="index">
          <div @click="changeE(index)" class="btn-item" :class="initialSlide === index ?'active':''">1 EOS</div>
          <!-- <span class="more" v-show="">{{item[index]}}</span> -->
        </swiper-slide>
      </swiper>
    </div>
    <div class="content">
      <!-- 红包数据展示 -->
      <div class="info scroll column" ref="myscroll">
        <div :is="1==1?'boxlist':'results'" :ref="`scrollitem`" :index="index" :item="item" :key="index" v-for="(item,index) in redEnvelopeList"></div>
      </div>
      <!-- <swiper :options="swiperOptionone" class="right">
        <swiper-slide class="itemright" :key="index" v-for="(item,index) in thelists" v-if="!item.none&&item.type==1">
          <img src="../common/images/bao.png" @click="scrollto(item.packetId)">
        </swiper-slide>
      </swiper> -->
      <!-- <div class="inforight icon icon-shang" v-show="outn>0&&this.infos.name" @click="scrollto(listH[0].top)">{{outn}}个红包</div> -->
    </div>
    <!-- 底部按钮 -->
    <div class="sendbtn flex">
      <div class="send">
        <p>{{$t("message.leifa")}}</p>
        <p>{{hairRedEnvelopeCount}}</p>
      </div>
      <button class="btn">{{$t("message.sendbtn")}}</button>
      <div class="send">
        <p class="icon">{{$t("message.lucky")}}</p>
        <p>{{prizeCount}}</p>
      </div>
    </div>
    <!-- <rules v-show="rules" bgc="white" @openrule="openrule" :therules="therules"></rules> -->
    <!-- <gobao :win="win" v-show="inshow" @myshow="myshow"></gobao> -->
  </q-page>
</template>

<script>
import rules from '@/components/rules.vue'
import gobao from '@/components/gobao.vue'
import boxlist from '@/components/boxlist.vue'
import results from '@/components/results.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {mapGetters,mapMutations, mapActions} from 'vuex';
import {SET_CLICK_ROOMID_RED_EVELOPE_LIST} from "@store/mutation-types"
// import {prizePool} from '../scattereos'
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
    console.log(111)
    console.log(this.redEnvelopeList,this.roomList)
    // this.swiperOption.initialSlide = this.packages.this
  },
  mounted(){
    // 滚到底部
    // this.scrollbottom()
  },
  data() {
    return {
      initialSlide: 0,
      roomList: ["1 Eos", "5 Eos", "10 Eos", "20eos", "50 eos", "100 eos"],
      // therules: false,
      // rules: false
    }
  },
  methods: {
    changeE(index) {
      this.initialSlide = index;
      let roomid = index;
      // 修改焦点数据
      this.SET_CLICK_ROOMID_RED_EVELOPE_LIST({roomid, redEnvelopeList: this.roomRedEnvelopeList[index]})
    },
    // openrule(status) {
    //   this.openrule = status;
    // },
    ...mapActions({
      SET_CLICK_ROOMID_RED_EVELOPE_LIST
    })
  },
  computed:{
    ...mapGetters([
      "userInfo",
      "redEnvelopeList",
      "roomRedEnvelopeList",
      "hairRedEnvelopeCount",
      "prizeCount"
    ]),
  }
}
</script>
