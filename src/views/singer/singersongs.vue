<template>
    <div class="singersong">
        <img :style="{width:'100vw',height:'60vw'}" :src="info.imgurl ? info.imgurl.replace('{size}',400) : '' " alt="">
        <van-list
            :style="{'padding-bottom' : $store.state.isplaying ? '10vh' : ''}"
        >
         <van-cell @click="changelist(item.hash)" v-for="(item,index) in list" :key="index" :title="index+1 + ' '+ item.filename" />
        </van-list>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                list : [],
                info : {}
            }
        },
        async created() {
            let {data} = await this.$api.getSingerInfo({singerid : this.$route.params.id})
            this.list = data.songs.list;
            this.info = data.info
            this.$store.commit('lodingEnd')
        },
        methods : {
            changelist(hash){
                this.$store.commit('changeList',{
                    list : this.list,
                    hash : hash
                })
            }
        }
    }
</script>
<style>
    .singersong .van-cell{
        line-height: 15vw;
        font-size: 4.7vw;
        color: black;
        font-weight: 400;
    }
</style>

