<template>
    <div>
        <img :style="{width:'100vw',height:'60vw'}" :src="imgU.replace('{size}',400) " alt="">
        <van-list
            :style="{'padding-bottom' : $store.state.isplaying ? '10vh' : ''}"
            :finished="finished"
            @load="onLoad"

        >
         <van-cell @click="changelist(item.hash)" v-for="(item,index) in info" :key="index" :title="index+1 + ' '+ item.filename" />
        </van-list>
    </div>
</template>
<script>
    import jsonp from 'jsonp'
    export default {
        
        data(){
            return {
                info : [],
                imgU : '',
                loading: false,
                finished: false
            }
        },
        methods : {
            changelist(hash){
                this.$store.commit('changeList',{
                    list : this.info,
                    hash : hash
                })
            },
            onLoad(){
                console.log(1)
            }
        },
        async created() {
            let id = this.$route.params.rankid;
            let {data} = await this.$api.getRankListById({id : id});
            
            this.info = await data.songs.list;
            this.imgU = data.info.imgurl;
            this.$store.commit('lodingEnd')
        }
    }
</script>
<style>
.van-cell{
    line-height: 15vw;
    font-size : 4.7vw;
    color: black;
    font-weight: 400;
}
</style>
