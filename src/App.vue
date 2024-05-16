<template>
<div>
  <div id="app">



    
    <div class="header">
      这不是音乐播放器
      <!-- 点击进入搜索界面 -->
      <i @click="searchFn" class="iconfont icon-sousuo"></i>
    </div>
    <!-- 带搜索的头部 -->
    <div
      class="searchDiv" 
      :style="{top : $route.meta.isShowSearch ? '13vw' : '25vw'}" 
      v-if="$route.meta.isShowSearch"
    >
      <i class="iconfont icon-zuojiantou" @click="goback"></i>
      <span>{{this.$route.name === 'Search' ? '搜索' : 'Go Back'}}</span>
    </div>
    <!-- 这是导航栏 -->
    <van-tabs  @click="turn"  v-model="active" swipeable>
      <van-tab 
        v-show="!$route.meta.isShowSearch"  
        :key="item.name" v-for="item in navConfig" 
        :title="item.title"
        
      >
      
      </van-tab>
      <!-- 是否loading，数据请求完成后，像vuex派发loding结束的事件lodingEnd -->
      <img class="load" src="./assets/loading.gif" alt="" v-show="$store.state.isLoding">
      <!-- 这是匹配到路由后显示的组件 -->
      <div class="wrapper" ref="bscroll" >
        <router-view v-show="!isClickImg"/>
      </div>
      
    </van-tabs>
    <!-- 播放器 -->
    <div class="playDiv" v-if="currentSong">
      <!-- 真正的播放器 -->
      <audio 
        id="player"
        @ended="nextSong" autoplay 
        :src="currentSong ? currentSong.data.url : ''"
        ref="play"
        @loadedmetadata="loadedmetadata"
        @timeupdate="timeupdate"
      ></audio>
      <div><img @click="goGeciPage" :src="currentSong ? currentSong.data.imgUrl.replace('{size}',200) : ''" alt=""></div>
      <!-- 显示播放的名字、头像和歌手 -->
      <div class="songTitle">
        <p>{{currentSong ? currentSong.data.songName : ''}}</p>
        <p>{{currentSong ? currentSong.data.choricSinger : ''}}</p>
      </div>
      <!-- 上一首、下一首、播放按钮 -->
      <div class="controlsong">
        <i @click="preSong" class="iconfont icon-houtui"></i>
        <img @click="playOrPause" :src="isPlay ? isPlayIcon[1] : isPlayIcon[0]" ref="playbtn" alt="">
        <i class="iconfont icon-qianjin" @click="nextSong"></i>
      </div>
    </div>
    
  </div>
  <!-- 显示歌词的遮罩层 -->
  <div class="geciwrap" v-if="isClickImg" >
      <!-- 模糊背景图 -->
      <div class="mask" :style="{'background-image' : 'url('+currentSong.data.imgUrl.replace('{size}',200)+')'}"></div>
      <!-- 黑色的遮罩层 -->
      <div class="play-overlay"></div>
      <div class="theme">
        <div class="geciheader">
          <i class="iconfont icon-zuojiantou" @click="hiddengeci"></i>
          <span>{{currentSong ? currentSong.data.songName : ''}}</span>
        </div>
        <!-- 显示头像 -->
        <div class="touxiang" >
          <img ref="rotateimg" :src="currentSong ? currentSong.data.imgUrl.replace('{size}',200) : ''" alt="">
        </div>
        <!-- 进度条 -->
        <div class="audiowrap" @touchmove="moving">
          <Slider @on-change="changetime" v-model="value1" show-tip="never"></Slider>
        </div>
        <div  class="controlsong">
          <i @click="preSong" class="iconfont icon-houtui"></i>
          <img @click="playOrPause" :src="isPlay ? isPlayIcon[1] : isPlayIcon[0]" ref="playbtn" alt="">
          <i class="iconfont icon-qianjin" @click="nextSong"></i>
        </div>
        
      </div>
      <!-- 显示歌词 -->
      
      <div class="displaygeci">
        <div class="tc font30 mb15">{{g}}</div>
      </div>
      
    </div>
</div>
</template>

<script>
import navConfig from './router/navConfig.js'
import axios from 'axios';
import BScroll from "better-scroll";
export default {
  name: 'App',
  data() {
    return {
      value1: 25,
      active: 0,//记录当前导航的位置
      navConfig,
      currentSong : '',
      currentSongIndex : 0,
      isClickImg : false,//记录是否点击播放时的头像，true的话显示播放详情页
      isPlay : true,
      isPlayIcon : ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAflBMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+yfIzaAAAAKXRSTlMAAQMFDA4QFhknLDAzNDVhZmtscHGGn6Woqaqrra/L0NLX2t3e9vf4+tzedSgAAACdSURBVEjH7dS7FoIwFETRoBJUjErEN6hAJM7//6CVjZWnNtPvtfK4d4xJSflkssBkr8MMkpvULRl5SHpuMZGOOSbqS0w0ekykS46JBoeJosdEulpMFBwmvxzum0jNFBNtOKkxGQpKWguv/6oz+GJhTb+ytXBg4i6DMxYcHf7GwhWLni5yv6J1cSYFY+7SyGrMnNSVsGDnFa3klL/KG0mGMtEjjEKyAAAAAElFTkSuQmCC',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAYFBMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8GYpHzAAAAH3RSTlMADxcbHSAoLC0zPEpLYGNmf4iPlJmqsrzDx9L1+f3+jAil4gAAAF9JREFUSMftlTkOgDAMBEO4z3DfkP//EmxTp0mFtNONtCOXVgr8Ad0YImMJapbcnSyWOTTJJHLGzmSXleUz6ycFEiRIkCDxTjYZXRHJLHInziTtx5ehYgnbjijxEIEHD+B6Onn0GTrqAAAAAElFTkSuQmCC'],
      g:'',
      gd:{
        up:null,
        down:null
      },
      p:null,
      lrc:'',//歌词
      lrcObj:null,
      height:'auto',
      aBScroll : '',
      duration : 0,//音乐总时间
      currentTime : 0,//当前播放的时间
      isSlider: false
    };
  },
  mounted() {
    console.log(11111);
    console.log(22222);
    this.$nextTick(() => {
        let bscrollDom = this.$refs.bscroll;
        console.log(2222);
        console.log(2222);
        console.log(2222);
        console.log(2222);
        this.aBScroll = new BScroll(bscrollDom,{
          click : true,
          pullUpLoad: {
            threshold: -30 // 当上拉距离超过30px时触发 pullingUp 事件
          }
        })
        
        this.aBScroll.on('pullingUp',()=>{
          console.log(11111111111)
        this.aBScroll.finishPullUp(); // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
        })
    })
    

  },
  methods : {
    loadedmetadata(){//音乐加载完成后获取总时间
      this.duration = this.$refs.play.duration;
      console.log(333333);
      console.log(333333);
    },
    changetime(v){//进度条在松开滑动时触发，返回当前的选值，在滑动过程中不会触发
      this.$refs.play.currentTime = v/100*this.$refs.play.duration;
      this.isSlider = false;
    },
    timeupdate(){//音乐播放时实时获取当前播放时间
      if(this.isSlider) return;
      this.currentTime = this.$refs.play.currentTime;
      this.value1 = this.$refs.play.currentTime/this.$refs.play.duration*100;
    },
    moving(){
      this.isSlider = true;
    },
    jx(){//格式化歌词
      var lyrics = this.lrc.split("\n");
      var lrcObj = {};
      for(var i=0;i<lyrics.length;i++){
          var lyric = decodeURIComponent(lyrics[i]);
          var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
          var timeRegExpArr = lyric.match(timeReg);
          if(!timeRegExpArr)continue;
          var clause = lyric.replace(timeReg,'');
          for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
              var t = timeRegExpArr[k];
              var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                  sec = Number(String(t.match(/\:\d*/i)).slice(1));
              var time = min * 60 + sec;
              lrcObj[time] = clause;
          }
      }
      return lrcObj;
    },
    //点击切换之后，切换路由
    turn(index){
      this.$router.push({
        name : this.navConfig[index].name
      });
    },
    goback(){//返回上一步
      this.$router.go(-1);
      this.active = this.navConfig.findIndex(item => item.name === this.$route.name)
    },
    async nextSong(){//下一首歌
      //下一首 更新下标、如果超出播放列表的数量，则从第一首重新开始
      let index = ++this.currentSongIndex;
      if(index > this.$store.state.songsList.length-1){
          index = 0;
          this.currentSongIndex = 0;
      }
      let nextHash = this.$store.state.songsList[index].hash;
      this.currentSong = await this.$api.getSong({
        hash : nextHash
      });
      let geci = await this.$api.getlrc({
        hash : nextHash
      });
      this.lrc = geci.data;
      this.lrcObj = this.jx();
    },
    async preSong(){//上一首
      let index = --this.currentSongIndex;
      if(index < 0){//如果切换到最上面一首的时候，自动到最后一首
          index = this.$store.state.songsList.length-1;
          this.currentSongIndex = this.$store.state.songsList.length-1;
      }
      let preHash = this.$store.state.songsList[index].hash;
      this.currentSong = await this.$api.getSong({
        hash : preHash
      });
      let geci = await this.$api.getlrc({
        hash : this.$store.state.hash
      });
      this.lrc = geci.data;
    },
    async playOrPause(){//暂停或者播放
      let audio = this.$refs.play;
      if(audio.paused){
        if(this.isClickImg){
          this.$refs.rotateimg.style.animationPlayState="running";//播放时动画继续
        }
        audio.play();
      }else{
        if(this.isClickImg){
          this.$refs.rotateimg.style.animationPlayState="paused";//暂停时动画结束
        }
        audio.pause();
      }
      this.isPlay = !this.isPlay;
    },
    async searchFn(){
      this.$router.push({
        name : 'Search'
      })
    },
    async goGeciPage(){//显示歌词页
      this.isClickImg = true;
      this.p = document.querySelector("#player")
      let _this = this;
      this.lrcObj = this.jx();
      this.p.addEventListener("timeupdate",function(){
        let obj = _this.lrcObj[Math.floor(this.currentTime)];
        if(obj!=undefined){
          _this.g = obj;//更新歌词
        }
      });
      
    },
    hiddengeci(){//点击隐藏歌词页面
      this.isClickImg = false;
    }

  },
  created() {
    //刷新的时候，导航哪一个显示高亮
    this.active = this.navConfig.findIndex(item => item.name === this.$route.name) 

  },
  watch : {
    $route(){//每次路由改变时，判断是否正在loading
      this.$store.commit('lodingEnd');
      this.active = this.navConfig.findIndex(item => item.name === this.$route.name)
      //每次路由改变的时候重新获取dom，然后滚动
      this.$nextTick(() => {
        let bscrollDom = this.$refs.bscroll;
        this.aBScroll = new BScroll(bscrollDom,{
          click : true,
          pullUpLoad: {
            threshold: -30 // 当上拉距离超过30px时触发 pullingUp 事件
          }
        })
         this.aBScroll.on('pullingUp',()=>{
          console.log(11111111111)
          this.aBScroll.finishPullUp(); // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
        })
    })
    },
    async '$store.state.hash'(){//监听hash值是否改变，即点击一首歌时触发，点击同一首歌不会改变
      this.currentSong = await this.$api.getSong({
        hash : this.$store.state.hash
      });
      this.isPlay = true;
      //当hash值改变时，重新计算当前播放歌曲的位置
      this.currentSongIndex = await this.$store.state.songsList.findIndex(item => item.hash === this.$store.state.hash)
      let geci = await this.$api.getlrc({
        hash : this.$store.state.hash
      });
      this.lrc = geci.data;

      this.$store.commit('isPlaying',{
        bl : true
      })

      
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  font-size: 5vw;
  /* margin-top: 60px; */
}
img{
  vertical-align: top;
}
p{
  margin: 0;
}
.header{
    height: 13vw;
    line-height: 13vw;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    background: #acacac;
    background: linear-gradient(45deg,rgb(179, 176, 178) 0%,rgb(28, 149, 219) 100%);
    z-index: 99;
    text-align: center;
}
.header .iconfont{
  font-size: 8vw;
  float: right;
  margin-right: 8vw;
}
.van-tabs__content {
    /* height: 1800px; */
    padding-top: 25vw;
    /* padding-bottom: 10vh; */
    overflow: hidden;
    /* box-shadow: inset 0px -10vh 0px 0px rgba(0,0,0,.2);  */
}
.wrapper{
  width: 100%;
  height: 85vh;
  overflow: hidden;
}
.van-tabs__wrap {
    top: 13vw;
    left: 0;
    right: 0;
    z-index: 99;
    overflow: hidden;
    position: fixed;
}
.van-tabs--line {
    padding-top: 0px;
}

.van-tabs--line .van-tabs__wrap {
    height: 12vw;
}
.van-nav-bar{
  top : 25vw;
}
.searchDiv{
  height: 13vw;
  position: fixed;
  width: 100vw;
  z-index:900;
  line-height: 13vw;
  padding-left: 3vw;
  background: white;
  font-weight: bold;
}
.searchDiv span{
  margin-left: 3vw;
  font-weight: 400;
}
.load{
  width: 100vw;
  height: 60vw;
}
.playDiv{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 10vh;
  background: rgba(0,0,0,.9);
  color: white;
}
.playDiv div{
  float: left;
}
.playDiv .songTitle{
  width: 43vw;
  padding-top: 1.5vw;
}
.playDiv .songTitle p:nth-of-type(1){
    width: 100%;
    line-height: 1.7;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 4vw;
    color: #fff;
}
.playDiv .songTitle p:nth-of-type(2){
    line-height: 1.3;
    font-size: 3vw;
    color: #888;
}


.playDiv div:nth-of-type(1){
  margin: 1.7vw;
}
.playDiv div:nth-of-type(1) img{
  width: 15vw;
  height: 15vw;
  border-radius: 1.5vw;
}
.playDiv .controlsong{
  float: right;
  margin-right: 5vw;
  padding-top: 3vw;

}
.controlsong i {
  font-size: 6.8vw;
  display: inline-block;
  padding-top: 0.6vw;
}
.playDiv .controlsong img{
  width: 10vw;
  height: 10vw;
  display: inline-block;
  margin-top: .4vh;
}


.geciwrap{
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,.5);
  z-index: 9999;
  top:0;
  left:0;
  
}
.mask{
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover; 
  background-repeat: no-repeat;
  background-position: center center;
  -webkit-filter: blur(15px);
  filter: blur(15px);
}
.play-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.6);
}
.theme{
  position: relative;
  z-index: 1;
  height: 100%;
}
.theme .touxiang{
  width: 58vw;
  height: 58vw;
  margin: 0 auto;
  margin-top: 9vh;
  
}
.theme .touxiang img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation: mymove 10s linear infinite;
}
@keyframes mymove{
  from {transform:rotate(0);}
  to {transform:rotate(360deg);}
}
.theme .controlsong{
  text-align: center;
  margin-top: 3vh;
}

.theme .controlsong i {
  font-size: 7.8vw;
  display: inline-block;
}
.theme .controlsong img{
  width: 10vw;
  height: 10vw;
  display: inline-block;
  margin-top: .5vh;
}
.tc {
  text-align: center;
  margin: 0 auto;
}
.displaygeci{
  color:yellow;
  font-size: 5.6vw;
  position: absolute;
  bottom: 36vh;
  width: 100%;
}
.theme .iconfont{
  font-size: 5vh;
  font-weight: bold;
  color: white;
  vertical-align: top;
}
.theme span{
  vertical-align: top;
  margin-left: 16vw;
}
.theme .geciheader{
  padding-top: 3vh;
  padding-left: 2vh;
  height: 6vh;
  line-height: 6vh;
  vertical-align: center;
  color: white;
  font-size: 3vh;
}
.ivu-slider{
  margin-top: 22vh;
}
.ivu-slider-wrap{
  margin: 16px auto;
  width: 80%;
}
</style>
