<template>
<div class="rankwrap" :style="{'padding-bottom' : $store.state.isplaying ? '10vh' : ''}">
    <div class="ranklist clearfix" 
        v-for="(item,index) in info.list" 
        :key="index"
        @click="toDetailPage(item.rankid)"
        
    >
        <span><img :src="(item.imgurl.replace('{size}',400))" alt=""></span>
        <span>{{item.rankname}}</span>
        <i class="iconfont icon-youjiantou"></i>
    </div>
</div>
</template>
<script>
    export default {
        name : 'rank',
        data(){
            return {
                info : []
            }
        },
        async created() {
          let {data} = await this.$api.getRankList();
          this.info = data.rank;
          this.$store.commit('lodingEnd')
        
        },
        methods : {
            //点击跳转到排行的详情页,通过params拼接二级地址
            toDetailPage(id){
                this.$router.push({
                    name : 'Detail',
                    params : {rankid : id}
                })
            }
        }
    }
</script>
<style>
    .ranklist{
        box-sizing: border-box;
        padding: 5vw;
        padding-left: 3vw;
        line-height: 30vw;
        border-bottom: .3vw solid #c3c3c3; 
    }
    .ranklist span{
        display: inline-block;
        
        vertical-align: top;
    }
    .ranklist span:nth-of-type(1){
        box-sizing: border-box;
        width: 30vw;
        height: 30vw;
    }
    .ranklist span:nth-of-type(1) img{
        width: 100%;
        height: 100%;
    }
    .ranklist span:nth-of-type(2){
        font-size: 5vw;
        font-weight: 300;
    }
    .ranklist i{
        float: right;
        margin-right: 4vw;
    }
    .clearfix::after{
        content: '';
        display: block;
        clear: both;
    }
</style>
