<template>
<div class="songList" :style="{'padding-bottom' : $store.state.isplaying ? '10vh' : ''}">
    <div class="songlists clearfix" 
        v-for="(item,index) in info" 
        :key="index"
        @click="toDetailPage(item.specialid)"
        
    >
        <span><img v-lazy="(item.imgurl.replace('{size}',240))" :src="(item.imgurl.replace('{size}',240))" alt=""></span>
        <span>
            {{item.specialname}}
            <p><i class="iconfont icon-yinle"></i>{{item.playcount}}</p>
        </span>
        <i class="iconfont icon-youjiantou"></i>
    </div>
</div>
</template>
<script>
    export default {
        name : 'rank',
        data(){
            return {
                info : [], //歌单列表
                pages : 0, //总页数
                total : 0 //歌单总数
            }
        },
        async created() {
          let {data} = await this.$api.getSongList();
          this.info = data.plist.list.info;
          this.total = data.plist.list.total;
          this.pages = data.plist.pagesize;
          this.$store.commit('lodingEnd')
        
        },
        methods : {
            //点击跳转到排行的详情页,通过params拼接二级地址
            toDetailPage(id){
                this.$router.push({
                    name : 'SonglistItem',
                    params : {id : id}
                })
            }
        }
    }
</script>
<style>
    .songlists{
        box-sizing: border-box;
        padding: 5vw;
        padding-left: 3vw;
        /* line-height: 30vw; */
        border-bottom: .3vw solid #c3c3c3; 
    }
    .songlists span{
        display: inline-block;
        
        vertical-align: top;
    }
    .songlists span:nth-of-type(1){
        box-sizing: border-box;
        width: 30vw;
        height: 30vw;
    }
    .songlists span:nth-of-type(1) img{
        width: 100%;
        height: 100%;
    }
    .songlists span:nth-of-type(2){
        font-size: 5vw;
        font-weight: 300;
        width: 24vh;
        margin-top: 1vh;
        margin-left: 3vw;
    }
    .songlists span:nth-of-type(2) p{
        font-size: 4vw;
        font-weight: 200;
    }
    i.iconfont.icon-yinle {
        margin-right: 1vw;
    }
    .songlists > i{
        float: right;
        margin-right: 4vw;
        margin-top: 5vh;
    }
    .clearfix::after{
        content: '';
        display: block;
        clear: both;
    }
</style>
