<style lang="stylus" scoped>
  @import '~variables'
  .home
    display flex
    top 0rem
    bottom 0rem
    max-width 16rem
    margin  0 auto
  .nav
    margin-top 0.46rem
    max-width 16rem
    height 1.54rem
    border-bottom 0.1rem solid #eeeeee
    padding 0 0.8rem
    .btn-group
      height 1.53rem
    .item
      width 2.84rem
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
      &.more:after
        position absolute
        content ""
        display block
        border-radius 50%
        top 0.1042rem
        right 0.1042rem
        width: 0.2083rem;
        height: 0.2083rem;
        background-color #ff0000
        border solid 0.04rem #d2d2d2
  .rule
    position absolute
    top 2rem
    // max-width 16rem
    right 0
    height 1.6rem
    justify-content flex-end
    align-items center
    padding 0 0.8rem
    .icon
      font-size 0.56rem
      cursor pointer
      margin-right 0.76rem
      position relative
      color #222222
      &:after
        position absolute
        content "\e63d"
        margin-left 0.1667rem
        font-size 0.64rem
        color #222222
  .content
    position absolute
    top 3.6rem
    bottom 4.8rem
    width 100%
    max-width 16rem
    padding 0 0.8rem
    width 100%
    display flex
    justify-content space-between
    .info 
      flex 1
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
    .right
      position absolute
      right 0.8rem
      width 1.54rem
      height 100%
      align-items center
      flex-wrap nowrap
      padding 0.4rem 0
      margin-right 0.8rem
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
    bottom 2.64rem
    .btn
      width 100%
      background-color #56b416
      height 1.82rem
      border-radius 1.84rem
      font-size 0.64rem
      color #ffffff
      font-weight bold
  .footer
    position absolute
    bottom 0
    height 1.84rem
    line-height 1.84rem
    font-size 0.56rem
    text-align left 
    padding-left 0.8rem
    color #ffffff
    width 100%
    max-width 16rem
    background #ea232f
    .icon
      position absolute
      right 0rem
      margin-right 0.8rem
      cursor pointer
      &:after
        content "\e63d"
        margin-left 0.1667rem
        font-size 0.64rem
</style>


<template>
  <q-page class="column home no-scroll">
    <div class="nav">
      <swiper :options="swiperOption" class="btn-group">
        <swiper-slide class="item">
          <div @click="changeE(0)" class="btn-item" :class="packages.this == 0?'active':'' || newmore[0]?'more':''">1 EOS</div>
        </swiper-slide>
        <swiper-slide class="item">
          <div @click="changeE(1)" class="btn-item" :class="packages.this == 1?'active':'' || newmore[1]?'more':''">5 EOS</div>
        </swiper-slide>
        <swiper-slide class="item">
          <div @click="changeE(2)" class="btn-item" :class="packages.this == 2?'active':'' || newmore[2]?'more':''">10 EOS</div>
        </swiper-slide>
        <swiper-slide class="item">
          <div @click="changeE(3)" class="btn-item" :class="packages.this == 3?'active':'' || newmore[3]?'more':''">20 EOS</div>
        </swiper-slide>
        <swiper-slide class="item">
          <div @click="changeE(4)" class="btn-item" :class="packages.this == 4?'active':'' || newmore[4]?'more':''">50 EOS</div>
        </swiper-slide>
        <swiper-slide class="item">
          <div @click="changeE(5)" class="btn-item" :class="packages.this == 5?'active':'' || newmore[5]?'more':''">100 EOS</div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="rule flex">
      <span class="icon" @click="openrule(true)">{{thislang.how}}</span>
    </div>
    <div class="content">
      <div class="info scroll" @scroll="handleScroll" ref="myscroll">
        <div :is="item.type==1?'boxlist':'results'" :item="item" :ref="item.type==1?'v'+item.packetId:''" :key="index" v-for="(item,index) in packages.data[packages.this]" @myshow="myshow"></div>
        <!-- <boxlist :ref="'v'+index" :key="index" v-for="(item,index) in 10" @myshow="myshow"></boxlist>
        <results></results> -->
      </div>
      <swiper :options="swiperOptionone" class="right">
        <swiper-slide class="itemright" :key="index" v-for="(item,index) in packages.data[packages.this]" v-show="!item.none">
          <img src="../common/images/bao.png" @click="scrollto(item.packetId)">
        </swiper-slide>
      </swiper>
    </div>
    <div class="sendbtn">
      <q-btn :label="thislang.sendbtn" class="btn" @click="changepage"/>
    </div>
    <rules v-show="rules" bgc="white" @openrule="openrule" :therules="therules"></rules>
    <gobao :win="[2]" v-show="inshow" @myshow="myshow"></gobao>
    <div class="footer">
      55.5908 EOS
      <span class="icon" @click="openrule(false)">{{thislang.lucky}}</span>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import rules from '@/components/rules.vue'
import gobao from '@/components/gobao.vue'
import boxlist from '@/components/boxlist.vue'
import results from '@/components/results.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {mapGetters,mapMutations} from 'vuex';
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
    this.setinfo([this.packages.this,false])
  },
  mounted(){
    // 滚到底部
    this.scrollbottom()
  },
  data(){
    return{
      swiperOption: {
        slidesPerView:4,
        spaceBetween:10
      }, //房间类别切换滑动
      swiperOptionone: {
        direction:"vertical",
        slidesPerView:"auto",
        spaceBetween:10
      },//红包滑动
      newmore:[false,false,false,false,false,false],
      rules:false, //规则切换
      inshow:false, //红包结果展示切换
      scrollTop:13, //滚动距离
      therules:false, //切换奖池与规则
    }
  },
  methods:{
    // 打开关闭介绍
    openrule(b){
      this.therules = b
      this.rules = !this.rules
    },
    //打开关闭红包展示
    myshow(){
      this.inshow = !this.inshow
    },
    //点击滚动到目标
    scrollto(i){
      // 确认目标
      let el = this.$refs['v'+i][0].$el
      let total = el.offsetTop
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
    // 监听滚动
    handleScroll(e){
      this.scrollTop = e.target.pageYOffset || e.target.scrollTop
    },
    // 跳转发红包页面
    changepage(){
      this.setchange({home:false})
      this.$router.push('/send')
    },
    changeE(i){
      // 记录列表切换
      this.newmore[i] = false
      this.setpacki(i)
      this.setinfo([Number(i),false])
    },
    ...mapMutations({
      setchange:'SET_CHANGE',
      setpacki:'SET_PACKI',
      setinfo:'SET_INFO',
    }),
    scrollbottom(){
      this.$refs.myscroll.scrollTop = this.$refs.myscroll.scrollHeight
    }
  },
  computed:{
    ...mapGetters([
      "thislang","packages"
    ]),
    thelists(){
      // 筛选红包数组
      if(!this.packages.data[this.packages.this]){
        return []
      }
      return this.packages.data[this.packages.this].filter((val) => {
        if(this.packages.all){
          return val.status == 1
        }else{
          return val.status == 0
        }
      })
    }
  },
  watch:{
    items(){
      this.scrollbottom()
    }
  }
}
</script>
