<style lang="stylus" scoped>
  @import '~variables'
  .home
    background url(../common/images/bg.jpg) no-repeat top
    background-size 100% 100%
    // padding 0 0.8rem 1.72rem
  .top
    padding 0 0.8rem
  .footer
    background url(../common/images/bg4.png) no-repeat bottom
    background-size 100% auto
    padding-bottom 2.6458rem
    img 
      width 100%
  .toplist
    margin 0.84rem 0rem 0rem 0rem
    background-color: #ffffff
    border-radius: 0.24rem
    overflow hidden
    h5
      height: 1.32rem
      line-height 1.4rem
      background #d52027
      margin 0px
      color #ffffff
      font-size 0.56rem
    .con-ul
      height 16rem
      margin 0
      padding 0
    li
      height 1.6rem
      align-items center
      span 
        width 0.76rem
        height 0.76rem
        background-color #d52027
        border-radius 50%
        font-size 0.52rem
        line-height 0.78rem
        color #ffffff
        margin-left 0.46rem
        margin-right 0.4rem
      p
        font-size 0.48rem
        color #333333
        margin 0
        flex 1
        &:last-of-type
          flex 2
  .classify
    width 100%
    height 1.64rem
  .myul
    list-style none
    padding 0
    height 9.16rem
  .morelist
    height 1.4rem
    justify-content flex-end
    span 
      font-size 0.48rem
      color #ffffff
      line-height 1.4rem
  .topbox
    margin 0.8rem 0
    height 110px
    background #22253c
    align-items center
    div
      flex 1
      color #ffffff
      font-size 0.64rem
      line-height 0.6rem
      text-align center
      p:first-of-type
        color: #dba000
        margin-top 0.08rem
      p:last-of-type
        font-size: 0.48rem;
        margin-top 0.1667rem
    img 
      width 1.58rem
      height 1.58rem
      margin-bottom 0.28rem
  .gobtn
    background-color #56b416
    height 1.82rem
    border-radius 1.84rem
    font-size 0.64rem
    color #ffffff
    font-weight 600
    box-sizing border-box
  .listbox
    padding 0 0.8rem
    .tablecange
      height 2.22rem
      padding-left 0.6rem
      background #a41e13
      border-radius 0.2rem 0.2rem 0 0
      span
        margin-right 1.44rem
        font-size: 0.64rem
        position relative
        display block
        height 2.22rem
        line-height 2.22rem
        color #ffffff
        &.active::after
          position absolute
          bottom 0rem
          left 0rem
          content ""
          width 2rem
          height 0.08rem
          background #ffffff
    .table
        box-sizing border-box
        .title
          height 1.6rem
          line-height 1.66rem
          background #25293f
          margin-bottom 0.08rem
          span
            color #ffffff
            font-weight 500
        .tr
          height 1.28rem
          line-height 1.28rem
          background rgba(#571f23,0.8)
          margin-bottom 0.04rem
          &:nth-of-type(even)
            background rgba(#1a302c,0.8)
          span
            color #ffffff
        span
          font-size 0.52rem
          text-align center
          white-space nowrap 
          overflow hidden 
          text-overflow ellipsis
</style>


<template>
  <q-page class="column home">
    <div class="top column">
      <div class="toplist">
        <h5 class="text-center capitalize" @click="boardshow = !boardshow">{{thislang.board}}</h5>
        <q-scroll-area class="con-ul" v-if="boardshow">
          <li class="flex" :key="index" v-for="(item,index) in items2">
            <span class="text-center">{{index+1}}</span>
            <p class="text-center">{{item.name}}</p>
            <p class="text-right">{{item.amount}} EOS</p>
            <p class="text-center">{{item.prize}} EOS</p>
          </li>
        </q-scroll-area>
        <ul v-else>
          <li class="flex">
            <span class="text-center">1</span>
            <p class="text-center">{{items2[0].name}}</p>
            <p class="text-right">{{items2[0].amount}} EOS</p>
            <p class="text-center">{{items2[0].prize}} EOS</p>
          </li>
        </ul>
      </div>
      <problem></problem>
      <classify class="classify" page="home"></classify>
      <ul class="myul flex row" v-if="packages.data.length>0">
        <li class="col-4" :key="index" v-for="(item,index) in thelists" is="mylist" :item="item"></li>
      </ul>
      <div class="morelist flex"><span @click="$router.push('/hall')">{{thislang.more}} >></span></div>
      <q-btn :label="thislang.sendbtn" class="gobtn"/>
      <div class="topbox flex">
        <div>
          <img src="../common/images/icon5.png">
          <p>3746927</p>
          <p>{{thislang.packet}}</p>
        </div>
        <div>
          <img src="../common/images/icon6.png">
          <p>9999.0000</p>
          <p>EOS</p>
        </div>
        <div>
          <img src="../common/images/icon7.png">
          <p>3748927</p>
          <p>{{thislang.player}}</p>
        </div>
      </div>
    </div>
    <div class="footer">
      <img src="../common/images/bg3.png">
      <div class="listbox">
        <div class="tablecange flex items-center glossy">
          <span class="capitalize" @click="changeE(0,'y')" :class="classifiy == 0?'active':''">{{thislang.all}}</span>
          <span class="capitalize" @click="changeE(1,'y')" :class="classifiy == 1?'active':''">{{thislang.record}}</span>
          <span class="capitalize" @click="changeE(2,'y')" :class="classifiy == 2?'active':''">{{thislang.rank}}</span>
        </div>
        <div class="table">
          <div class="title flex row">
            <span class="th col-2">{{thislang.time}}</span>
            <span class="th col-4">{{thislang.user}}</span>
            <span class="th col-2">{{thislang.number}}</span>
            <span class="th col-4">{{thislang.prize}}</span>
          </div>
          <div class="tr flex row" v-for="(item,index) in items3" :key="index">
            <span class="td col-2">{{item.time}}</span>
            <span class="td col-4">{{item.name}}</span>
            <span class="td col-2">{{item.num}}</span>
            <span class="td col-4">{{item.prize}} EOS</span>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import problem from '@/components/problem.vue'
import classify from '@/components/classify.vue'
import mylist from '@/components/mylist.vue'
import {mapGetters,mapMutations} from 'vuex';
export default {
  components: {
    problem,
    mylist,
    classify
  },
  created(){
    // 添加红包数组
    this.setpackage(this.items)
    // 定时下滑记录列表
    setInterval(this.golist,500+Math.random()*500)
  },
  data(){
    return{
      classifiy:0, //记录列表当前index
      boardshow:false, //排行榜切换状态
      items:[
        [
          {num:3,status:0},
          {num:2,status:1},
          {num:3,status:1},
          {num:5,status:1},
          {num:6,status:0},
          {num:1,status:1},
          {num:1,status:1},
        ],[
          {num:1,status:1},
          {num:1,status:1},
          {num:1,status:1},
          {num:1,status:0},
          {num:1,status:0},
          {num:1,status:0}
        ],[
          {num:5,status:0},
          {num:6,status:0},
          {num:1,status:0},
          {num:1,status:1},
          {num:1,status:1},
          {num:3,status:0}
        ],[
          {num:1,status:1}
        ]
      ], //红包数组
      items2:[
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        },
        {
          name:"Yintao520",
          amount:9.0000,
          prize:758.0898
        }
      ], //排行榜数组
      items3:[], //记录列表展示数组
      items4:[
        {
          name:"2389u4u3r290110...",
          num:2,
          prize:1000.0000
        },
        {
          name:"2389u4u3r290110...",
          num:2,
          prize:1000.0000
        },
        {
          name:"2389u4u3r290110...",
          num:2,
          prize:1000.0000
        },
        {
          name:"2389u4u3r290110...",
          num:2,
          prize:1000.0000
        },
        {
          name:"2389u4u3r290110...",
          num:2,
          prize:1000.0000
        },
        {
          name:"2389u4u3r290110...",
          num:2,
          prize:1000.0000
        },
        {
          name:"2389u4u3r290110...",
          num:2,
          prize:1000.0000
        },
        {
          name:"2389u4u3r290110...",
          num:2,
          prize:1000.0000
        },
        {
          name:"2389u4u3r290110...",
          num:3,
          prize:100.0000
        },
        {
          name:"2389u4u3r290110...",
          num:2,
          prize:1000.0000
        },
        {
          name:"2389u4u3r290110...",
          num:3,
          prize:100.0000
        },
        {
          name:"2389u4u3r290110...",
          num:2,
          prize:1000.0000
        },
        {
          name:"2389u4u3r290110...",
          num:3,
          prize:100.0000
        },
        {
          name:"2389u4u3r290110...",
          num:2,
          prize:1000.0000
        },
        {
          name:"2389u4u3r290110...",
          num:3,
          prize:100.0000
        },
        {
          name:"2389u4u3r290110...",
          num:2,
          prize:1000.0000
        },
        {
          name:"2389u4u3r290110...",
          num:3,
          prize:100.0000
        },
        {
          name:"2389u4u3r290110...",
          num:2,
          prize:1000.0000
        },
        {
          name:"2389u4u3r290110...",
          num:3,
          prize:100.0000
        },
        {
          name:"2389u4u3r290110...",
          num:2,
          prize:1000.0000
        },
        {
          name:"2389u4u3r290110...",
          num:3,
          prize:100.0000
        },
        {
          name:"2389u4u3r290110...",
          num:2,
          prize:1000.0000
        },
        {
          name:"2389u4u3r290110...",
          num:3,
          prize:100.0000
        },
        {
          name:"2389u4u3r290110...",
          num:2,
          prize:1000.0000
        },
        {
          name:"2389u4u3r290110...",
          num:3,
          prize:100.0000
        },
        {
          name:"2389u4u3r290110...",
          num:2,
          prize:1000.0000
        },
        {
          name:"2389u4u3r290110...",
          num:3,
          prize:100.0000
        },
        {
          name:"2389u4u3r290110...",
          num:2,
          prize:1000.0000
        },
        {
          name:"2389u4u3r290110...",
          num:3,
          prize:100.0000
        }
      ] //all记录列表数组
    }
  },
  methods:{
    changeE(i){
      // 记录列表切换
      this.classifiy = i
    },
    thistime(){
      // 获取当前时间
      let time = new Date()
      let h = time.getHours()
      let m = time.getMinutes()
      let s = time.getSeconds()
      return `${h}:${m}:${s}`
    },
    golist(){
      // 判断列表数，裁剪赋值数组
      if(this.items3.length>=12){
        let arr = this.items4.splice(0,1)
        // 获取当前时间
        arr[0].time = this.thistime()
        this.items3 = arr.concat(this.items3);
        this.items3.splice(this.items3.length-1,1)
        this.items4 = this.items4.concat(arr);
      }else{
        let arr = this.items4.splice(0,6)
        arr.map(val=>{
          // 获取当前时间
          val.time = this.thistime()
        })
        this.items3 = arr.concat(this.items3);
        this.items4 = this.items4.concat(arr);
      }
    },
    ...mapMutations({
      setpackage:'SET_PACKAGE'
    }),
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
}
</script>
