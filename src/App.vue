<style lang="stylus">
#app
  background #ffffff
  max-width 16rem
  height 100%
  margin 0 auto
  overflow hidden
  position relative
  .faderight-enter-active, .faderight-leave-active {
    transition: all 0.3s;s;
  }
  .faderight-enter, .faderight-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform translateX(100%)
  }
  .bg
    position absolute
    top 0
    width 100%
    height 100%
    background rgba(0,0,0,0.2)
    z-index 99
  .transitionRouter-enter-active,
  .transitionRouter-leave-active {
    transition: all .5s;
  }
  .transitionRouter-enter,
  .transitionRouter-leave-to{
    opacity: 0;
  }
</style>

<template>
  <div id="app">
    <!-- 主窗口 -->
    <transition name="transitionRouter">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive&&isRouterAlive"/>
      </keep-alive>
    </transition>
    <transition name="transitionRouter">
      <router-view v-if="!$route.meta.keepAlive&&isRouterAlive"/>
    </transition>
    <!-- 规则 -->
    <rules v-show="rules" bgc="white" @openrule="openrule" :therules="therules"></rules>
    <!-- loading -->
    <loading v-show="loading"></loading>
    <!-- 侧边栏 -->
    <transition name="faderight">
      <drawer v-show="menuStatus"></drawer>
    </transition>
    <!-- 充值 -->
    <recharge v-show="recharge"></recharge>
    <!-- 幕布 -->
    <div v-show="menuStatus" class="bg" @click="theclose"></div>
    <!-- 广告 -->
    <entry v-if="ifentry"></entry>
  </div>
</template>

<script>
import {mapMutations, mapActions,mapGetters} from 'vuex';
import {SET_IFENTRYURL,SET_LOADING,SET_ALL_INFO,SET_GOOGLE_MENU,SET_ROOM_RED_EVELOPE_LIST_UPDATA,SET_ROOM_RED_EVELOPE_EXPIRED} from "@store/mutation-types";
import {login, getMoneyListget,imgUrl} from "@common/js";
import rules from "@/components/rules.vue";
import {get} from '@api';
import loading from "@/components/loading.vue";
import entry from "@/components/entry.vue";
import drawer from "@/components/drawer.vue";
import recharge from "@/components/recharge.vue";
export default {
  created(){
    // 获取红包列表
    this.SET_LOADING(true)
    getMoneyListget(true);
    // 自动登陆
    login(()=>{
      // this.openrule(9)
      this.$socket.emit('login', this.userInfo.name);
      this.$children[0].scrollbottom()
    },()=>{
      this.openrule(9)
    });
    // 
    this._getInfo()
    //预加载图片
    // this.preload()
  },
  mounted(){
    this.$socket.on('issus_packet', json => {
      const {data,info} = json;
      const index = data.eos;
      // 设置展示数据
      this.SET_ALL_INFO({...this.allInfo,...info});
      // 更新所有红包数据
      this.SET_ROOM_RED_EVELOPE_LIST_UPDATA({packetData:data, index})
    })
    this.$socket.on('income_packet', json => {
      const {info,data} = json;
      const index = data.eos;
      // // 设置展示数据
      this.SET_ALL_INFO({...this.allInfo,...info});
      let item = {
        name:data.send_user,
        name1:data.get_user,
        is_chailei:data.is_cailei,
        reward_type:data.send_user,
        type:3
      }
      // 更新所有红包数据
      this.SET_ROOM_RED_EVELOPE_LIST_UPDATA({packetData:item, index});

      // 改变红包状态
      let _roomItemEnvelopeList = this.roomRedEnvelopeList[index];
      // 判断列表是否为空
      if(_roomItemEnvelopeList=='undefined'||!this.roomRedEnvelopeList){
        return false
      }
      // 找到对应抢完的红包，改变状态
      if(data.type||data.get_user==this.userInfo.name){
        for (let i = 0; i < _roomItemEnvelopeList.length; i++) {
          if (_roomItemEnvelopeList[i].type==1&&data.packetId === _roomItemEnvelopeList[i].packetId) {
            // 修改红包展示状态
            this.SET_ROOM_RED_EVELOPE_EXPIRED({roomId: index, index: i, packetData: _roomItemEnvelopeList[i],type:data.type?2:1});
            break;
          }
        }
      }
      if(data.type){
        let item = {
          name:data.send_user,
          num:data.num,
          time:data.time,
          in_packet_data:data.in_packet_data,
          type:2
        }
        // 添加表格信息
        this.SET_ROOM_RED_EVELOPE_LIST_UPDATA({packetData:item, index});
      }
    })
    this.$socket.on('user_money', json=>{
      let data = {
        ...this.allInfo,
        ...json
      }
      this.SET_ALL_INFO(data)
    })
  },
  data(){
    return{
      rules: false,
      therules:2,
      num:0,
      recharge:false,
      isRouterAlive: true,
    }
  },
  computed:{
    ...mapGetters([
      "allInfo",
      "userInfo",
      "loading",
      "menuStatus",
      "roomRedEnvelopeList",
      "ifentry"
    ])
  },
  components:{
    loading,
    rules,
    drawer,
    recharge,
    entry
  },
  methods:{
    // 获取vuex方法
    ...mapActions({
      SET_ROOM_RED_EVELOPE_LIST_UPDATA,
      SET_ROOM_RED_EVELOPE_EXPIRED
    }),
    // 获取vuex方法
    ...mapMutations({
      SET_LOADING,
      SET_ALL_INFO,
      SET_GOOGLE_MENU,
      SET_IFENTRYURL
    }),
    theclose(){
      this.SET_GOOGLE_MENU(false)
    },
    // 获取展示数据，只展示一次
    _getInfo() {
      get("/get_info").then(json => {
        const {data,imgs} = json.data;
        this.SET_ALL_INFO(data)
        this.SET_IFENTRYURL(imgs)
        this.preload(imgs)
      })
    },
    //打开关闭游戏介绍
    openrule(b) {
      this.therules = b
      this.rules = !this.rules;
    },
    //预加载图片
    preload(imgs){
      imgs.map((img,i)=>{
        let image = new Image()
        image.src = img
        image.onload = () => {
          if(i+1==imgs.length) console.log('图片加载完成')
        }
      })
    },
    close(b){
      this.recharge = b
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
  // 刷新页面
  provide() {
    return {
      reload: this.reload
    };
  },
}
</script>
