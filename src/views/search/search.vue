<template>
<div class="searchpage">
    <form action="/">
    <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
    />
    </form>
    <!-- 热门 -->
    <!-- 没进行搜索操作 -->
    <van-list v-show="!isSearched">
    <van-cell @click="goHotPage(item.keyword)"  v-for="(item,index) in list" :key="index" :title="item.keyword" />
    </van-list>
    <!-- 搜索结果显示页面 -->
    <!-- 进行了搜索操作 -->
    <van-list v-show="isSearched" @load="onLoad">
        <van-cell  @click="changelist(item.hash)"  v-for="(item,index) in list" :key="index" :title="item.filename" />
    </van-list>
</div>
</template>
<script>
    import jsonp from 'jsonp'
    export default {
        data(){
            return {
                value : '',
                list : [],
                total : 0,
                isSearched : false//控制显示的视图，如果为false，则为热门，取关键字keyword，如果为true，说明进行了搜索操作，则显示搜索对应的视图
            }
        },
        methods : {
            onSearch(){//点击搜索，发送jsonp请求
                jsonp('http://mobilecdn.kugou.com/api/v3/search/song',{
                    param :`format=jsonp&keyword=${this.value}&page=1&pagesize=30&showtype=1&callback`
                },(err,data) => {
                    if(err){
                    console.log(err)
                    }else{
                        this.list = data.data.info;
                        this.total = data.data.total;
                        this.isSearched = true;//搜索之后，把视图变为搜索的视图
                        this.value = '';
                    }
                })
            },
            onCancel(){

            },
            changelist(hash){//点击播放歌曲
                this.$store.commit('changeList',{
                    list : this.list,
                    hash : hash
                })
            },
            goHotPage(kw){
                jsonp('https://mobiles.service.kugou.com/api/v3/search/song',{
                    param :`format=jsonp&keyword=${kw}&page=1&pagesize=30&showtype=1&callback`
                },(err,data) => {
                    if(err){
                    console.log(err)
                    }else{
                        this.list = data.data.info;
                        this.total = data.data.total;
                        this.isSearched = true;
                    }
                })
            },
            onLoad(){
                console.log(111111111)
            }
        },
        created() {
            this.isSearched = false;//每次进来的时候，要把视图切换为热门对应的视图
            jsonp('http://mobilecdn.kugou.com/api/v3/search/hot',{
                param :'format=jsonp&plat=0&count=30&callback'
                },(err,data) => {
                if(err){
                    console.log(err)
                }else{
                    this.list = data.data.info;
                }
            })
            this.$store.commit('lodingEnd')
        },
    }
</script>
<style>
    .searchpage .van-list .van-cell{
        line-height: 15vw;
        font-size: 4.7vw;
        color: black;
        font-weight: 400; 
    }

</style>
