<template>
    <ul class="singeritem">
        <li 
            @click="tosingerinfo(item.singerid)" 
            :key="index" 
            v-for="(item,index) in list"
        >
            <img v-lazy="item.imgurl.replace('{size}',240)" :src="item.imgurl.replace('{size}',240)" alt="">
            <span>{{item.singername}}</span>
            <i class="iconfont icon-arrow-right-copy-copy-copy"></i>
        </li>
    </ul>
</template>
<script>
    export default {
        data(){
            return {
                list : []
            }
        },
        async created() {
            let data = await this.$api.getSingerList({classid : this.$route.params.id});
            this.list = data.data.singers.list.info;
            this.$store.commit('lodingEnd')
        },
        methods : {
            tosingerinfo(id){
                this.$router.push({
                    name : 'Singersongs',
                    params : {id : id}
                })
            }
        }
    }
</script>
<style>
    .singeritem{
        margin-top:2vh; 
    }
    .singeritem li{
        height : 17vh;
        line-height: 15vh;
        border-bottom: 1px solid #acacac;
        padding: 1vh 0;
    }
    .singeritem li img{
        width: 13vh;
        height: 13vh;
        margin: 1vh;
        margin-left: 4vw;
    }
    .singeritem li span{
        margin-left: 2vw;
    }
    .singeritem li i{
        font-size: 7vw;
        font-weight: 200;
        float: right;
        margin-right: 4vw; 
    }
    
</style>

