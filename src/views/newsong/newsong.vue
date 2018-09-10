<template>
<div>
    <van-swipe :autoplay="3000">
        <van-swipe-item :key="index" v-for="(item,index) in banner">
            <img :src="item.imgurl" alt="">
        </van-swipe-item>
    </van-swipe>
    <van-list :style="{'padding-bottom' : $store.state.isplaying ? '10vh' : ''}">
    <van-cell @click="changelist(item.hash)" v-for="(item,index) in list" :key="index" :title="item.filename" />
    </van-list>
</div>
</template>
<script>
    export default {
        
        data(){
            return {
                list : [],
                banner : []
            }
        },
        methods : {
            //点击派发改变播放列表和当前播放音乐的方法
            changelist(hash){
                this.$store.commit('changeList',{
                    list : this.list,
                    hash : hash
                })
            }
        },
        async created() {
            //数据已经响应式的时候 通过ajax请求数据，获取歌曲列表及banner
            let data = await this.$api.getNewSongs();
            this.list = data.data.data;
            this.banner = data.data.banner;
            this.$store.commit('lodingEnd')
        }
    }
</script>
<style>
.van-swipe img{
    width: 100vw;
}
.van-cell{
    line-height: 15vw;
    font-size : 5vw;
}
</style>
