<style lang="stylus" scoped>
  /* 广告 */
  .entry {
    width: 100%;
    height: 100%;
    max-width 400px;
    margin 0 auto;
    z-index: 10000;
    position: fixed;
  }
  #entry
    width 100%
    height 100%
  #svgContainer {
    position: absolute;
    z-index: 10001;
    top: 0rem;
    right: 0rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width 2rem
  }
  #svgContainer > svg {
    position: absolute;
  }
  circle {
    -webkit-transition: stroke-dasharray .25s;
    transition: stroke-dasharray .25s;
  }
  #leftTime
    color #ffffff
    font-size 12px
    text-align center
  .btn
    position absolute
    right 0.4rem
    top 0.4rem
    background #ca0c16
    border none
    color #ffffff
    padding 0.16rem 0.32rem
</style>

<template>
  <div class="entry">
    <img id="entry" @load="gotime" ref="entry" :src="imgsrc">
    <div id="svgContainer" v-show="issvg&&opengo">
      <svg width="50" height="50">
          <circle cx="25" cy="25" r="12" stroke-width="2" stroke="#D1D3D7" fill="none"></circle>
          <circle cx="25" cy="25" r="12" stroke-width="2" stroke="#00A5E0" fill="none" transform="matrix(0,-1,1,0,0,50)" stroke-dasharray="1069 0"></circle>
      </svg>
      <span id="leftTime">{{initTime}}</span>
    </div>
    <button class="btn" v-show="!issvg&&opengo" @click="closeentry">点击关闭</button>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex';
import {SET_IFENTRY} from "@store/mutation-types";
export default {
  created(){
    let index = Math.floor(Math.random()*(this.ifentryurl.length));
    if(index==this.ifentryurl.length) index==this.ifentryurl.length-1
    this.imgsrc = this.ifentryurl[index]
  },
  data(){
    return{
      imgsrc:'',
      initTime:3,
      issvg:true,
      opengo:false
    }
  },
  computed:{
    ...mapGetters([
      "ifentryurl",
    ]),
  },
  methods:{
    // 关闭广告
    closeentry(){
      this.SET_IFENTRY(false)
      this.opengo = false
    },
    gotime(){
      this.opengo = true
      //获得第二个圆的引用
      var circle = document.getElementsByTagName('circle')[1];
      var leftTime = setInterval(() => {
        this.initTime--;
        if (this.initTime < 0) {
          clearInterval(leftTime)
          this.issvg = false;
        }
        var percent = this.initTime / 3;
        //圆的周长
        var perimeter = Math.PI * 2 * 12;
        //stroke-dasharray属性的两个参数和必须为周长
        circle.setAttribute('stroke-dasharray', perimeter * percent + ' ' + perimeter * (1 - percent));
      }, 1000)
    },
    ...mapMutations({
      SET_IFENTRY
    }),
  }
}
</script>
