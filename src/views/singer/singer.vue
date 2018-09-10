<template>
<ul class="singerList">
    <li :key="index" v-for="(item,index) in list" @click="toSingerItem(item.classid)">
        {{item.classname}}
        <i class="iconfont icon-arrow-right-copy-copy-copy"></i>
    </li>
</ul>
</template>
<script>
    import Aplayer from 'vue-aplayer'
    export default {
        data(){
            return {
                list : []
            }
        },
        components : {
            Aplayer
        },
        async created() {
            let data = await this.$api.getSingers();
            this.list = data.data.list;

            this.$store.commit('lodingEnd')
        },
        methods : {
            toSingerItem(id){
                this.$router.push({
                    name : 'Singeritem',
                    params : {id : id}
                })
            }
        }
    }
</script>
<style>
    .singerList{
        width: 100vw;
    }
    .singerList li{
        line-height: 7vh;
        border: 1px solid #c3c3cc;
        text-indent: 3vw;
        margin: 2vw;
        border-radius: 2vw;
    }
    .singerList .icon-arrow-right-copy-copy-copy{
        float: right;
        margin-right: 4vw; 
        font-size: 6vw;
    }
</style>
