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
      <swiper :options="swiperOption" class="btn-group swiper-no-swiping">
        <swiper-slide class="item">
          <div @click="changeE(0)" class="btn-item" :class="packages.this == 0?'active':''">1 EOS</div>
          <span v-show="packages.this != 0&&golist[0]>0" class="more">{{golist[0]}}</span>
        </swiper-slide>
        <swiper-slide class="item">
          <div @click="changeE(1)" class="btn-item" :class="packages.this == 1?'active':''">5 EOS</div>
          <span v-show="packages.this != 1&&golist[1]>0" class="more">{{golist[1]}}</span>
        </swiper-slide>
        <!-- <swiper-slide class="item">
          <div @click="changeE(2)" class="btn-item" :class="packages.this == 2?'active':''">10 EOS</div>
          <span v-show="packages.this != 2&&golist[2]>0" class="more">{{golist[2]}}</span>
        </swiper-slide>
        <swiper-slide class="item">
          <div @click="changeE(3)" class="btn-item" :class="packages.this == 3?'active':''">20 EOS</div>
          <span v-show="packages.this != 3&&golist[3]>0" class="more">{{golist[3]}}</span>
        </swiper-slide>
        <swiper-slide class="item">
          <div @click="changeE(4)" class="btn-item" :class="packages.this == 4?'active':''">50 EOS</div>
          <span v-show="packages.this != 4&&golist[4]>0" class="more">{{golist[4]}}</span>
        </swiper-slide>
        <swiper-slide class="item">
          <div @click="changeE(5)" class="btn-item" :class="packages.this == 5?'active':''">100 EOS</div>
          <span v-show="packages.this != 5&&golist[5]>0" class="more">{{golist[5]}}</span>
        </swiper-slide> -->
      </swiper>
    </div>
    <div class="content">
      <keep-alive>
        <div class="info scroll column" @scroll="handleScroll" ref="myscroll">
          <div :is="item.type==1?'boxlist':'results'" :ref="`scrollitem`" :index="index" :item="item" :key="index" v-for="(item,index) in packages.thisdata" @myshow="myshow"></div>
        </div>
      </keep-alive>
      <!-- <swiper :options="swiperOptionone" class="right">
        <swiper-slide class="itemright" :key="index" v-for="(item,index) in thelists" v-if="!item.none&&item.type==1">
          <img src="../common/images/bao.png" @click="scrollto(item.packetId)">
        </swiper-slide>
      </swiper> -->
      <div class="inforight icon icon-shang" v-show="outn>0&&this.infos.name" @click="scrollto(listH[0].top)">{{outn}}个红包</div>
    </div>
    <div class="sendbtn flex">
      <div class="send">
        <p>{{$t("message.leifa")}}</p>
        <p>{{infos.info.out_packet_count?Number(infos.info.out_packet_count):0}}</p>
      </div>
      <button class="btn" @click="changepage">{{$t("message.sendbtn")}}</button>
      <div class="send">
        <p class="icon" @click="openrule(false)">{{$t("message.lucky")}}</p>
        <p>{{infos.info.xinyunjiangchi?Number(infos.info.xinyunjiangchi).toFixed(4):(0).toFixed(4)}}</p>
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
import {mapGetters,mapMutations} from 'vuex';
import {prizePool} from '../scattereos'
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
    this.swiperOption.initialSlide = this.packages.this
  },
  mounted(){
    // 滚到底部
    this.scrollbottom()
  },
  data(){
    return{
      swiperOption: {
        slidesPerView:2,
        initialSlide: 0
      }, //房间类别切换滑动
      swiperOptionone: {
        direction:"vertical",
        slidesPerView:"auto",
        spaceBetween:10
      },//红包滑动
      rules:false, //规则切换
      inshow:false, //红包结果展示切换
      scrollTop:13, //滚动距离
      therules:false, //切换奖池与规则
      win:{},//单个红包信息
      listH:[],// 可选红包高度
      outn:0,
      itemH:0,//单个红包高度
    }
  },
  methods:{
    // 打开关闭游戏介绍
    openrule(b){
      this.therules = b
      this.rules = !this.rules
    },
    //打开关闭抢红包结果展示
    myshow(win){
      if(win){
        this.win = win
      }
      this.inshow = !this.inshow
    },
    //点击滚动到目标
    scrollto(i){
      // 确认目标
      let total = i - this.itemH
      let self = this
      let step = total / 25
      if (total > this.scrollTop) {
        smoothDown()
      } else {
        let newTotal = this.scrollTop - total
        step = newTotal / 25
        smoothUp()
      }
      // 向下滚动
      function smoothDown () {
        if (self.scrollTop < total) {
          self.scrollTop += step
          self.$refs.myscroll.scrollTop = self.scrollTop
          setTimeout(smoothDown, 10)
        } else {
          self.$refs.myscroll.scrollTop = total
        }
      }
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
    // 判断窗口外可选红包
    thisgobao(){
      if(!this.infos.name){
        return false
      }
      let newdata = this.packages.data[this.packages.this]
      if(!newdata.length){
        this.outn = 0
        return false
      }
      let list = []
      let temparr = []
      this.$nextTick(()=>{
        list = this.$refs.scrollitem
        if(!list){
          return false
        }
        this.itemH = list[0].$el.offsetHeight
        for(let i = 0;i<newdata.length;i++){
          if(!newdata[i].none&&newdata[i].type==1&&!newdata[i].isgo){
            temparr = [
              ...temparr,
              {
                packetId:newdata[i].packetId,
                top:list[i].$el.offsetTop + list[i].$el.offsetHeight
              }
            ]
          }
        }
        this.listH = temparr
        let n = 0
        for(let i = 0;i<this.listH.length;i++){
          if(this.scrollTop>this.listH[i].top){
            n = i+1
          }else{
            break;
          }
        }
        this.outn = n
      })
    },
    // 监听滚动
    handleScroll(e){
      this.scrollTop = e.target.pageYOffset || e.target.scrollTop
      this.thisgobao()
    },
    // 跳转发红包页面
    changepage(){
      if(this.infos.name.length == 0){
        alert('请先登录')
        return false
      }
      this.$router.push('/send')
    },
    // 房间切换
    changeE(i){
      this.setpacki(i)
      this.setpackdatal(this.packages.data[i])
    },
    ...mapMutations({
      setpacki:'SET_PACKI',
      setpackdatal:'SET_PACKDATAL',
    }),
    // 滚到底部
    scrollbottom(){
      this.$nextTick(()=>{
        this.$refs.myscroll.scrollTop = this.$refs.myscroll.scrollHeight
        this.thisgobao()
      })
    }
  },
  computed:{
    ...mapGetters([
      "packages","infos"
    ]),
    // 当前房间红包筛选
    thelists(){
      return this.packages.data[this.packages.this]
    },
    // 所有可抢红包
    golist(){
      if(!this.infos.name){
        return []
      }
      let arr = []
      this.packages.data.map((v,i)=>{
        v.map((v1)=>{
          if(!v1.none&&v1.type==1&&!v1.isgo){
            arr[i]?arr[i] += 1:arr[i] = 1
          }
        })
      })
      return arr
    },
  },
  watch:{
    // 监听列表信息
    thelists(){
      this.setpackdatal(this.packages.data[this.packages.this])
      this.scrollbottom()
    },
  }
}
</script>
