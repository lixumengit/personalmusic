import Vue from 'vue'
import Router from 'vue-router'
import Newsong from '../views/newsong/newsong'
import Rank from '../views/rank/rank'
import Singer from '../views/singer/singer'
import Songlist from '../views/songlist/songlist'//这样引用 @/views/songlist/songlist.vue 有报错
import Detail from '../components/detail.vue'
import Search from '../views/search/search'
import SonglistItem from '../views/songlist/songlistItem.vue'
import Singeritem from '../views/singer/singeritem.vue'
import Singersongs from '../views/singer/singersongs.vue'
Vue.use(Router)
export default new Router({
  mode : 'history',
  routes: [
    {
      path : '/',
      name : 'Newsong',//新歌页面
      component : Newsong,
      meta : {isShowSearch : false}
    },
    {
        path : '/rank',//排行页面
        name : 'Rank',
        component : Rank,
        meta : {isShowSearch : false}
    },
    {
        path : '/plist',//歌单页面
        name : 'Songlist',
        component : Songlist,//这个是又是遇见的一个坑 把component写成components 报错:Cannot read property '$createElement' of undefined
        meta : {isShowSearch : false}//跳转路由的时候带一条属性，可以通过this.$route.meta获取到
    },
    {
        path : '/plist/list/:id',//歌单的动态页面
        name : 'SonglistItem',
        component : SonglistItem,
        meta : {isShowSearch : true}
    },
    {
        path : '/singer',//歌手页面
        name : 'Singer',
        component : Singer,
        meta : {isShowSearch : false}
    },
    {
      path : '/rank/info/:rankid',//排行动态页面
      name : 'Detail',
      component : Detail,
      meta : {isShowSearch : true}
    },
    {
      path : '/search',//搜索页面
      name : 'Search',
      component : Search,
      meta : {isShowSearch : true}
    },
    {
      path : '/singer/list/:id',//搜索的动态页面
      name : 'Singeritem',
      component : Singeritem,
      meta : {isShowSearch : true}
    },
    {
      path : '/singer/info/:id',//歌手动态页面，显示每个歌手对用的歌曲
      name : 'Singersongs',
      component : Singersongs,
      meta : {isShowSearch : true}
    },
    {
      path: '*',
      redirect:'/'
    }
  ]
})
