import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

let store = new Vuex.Store({
    state : {
        isLoding : true,
        hash : '', //记录当前播放的歌曲
        songsList : [], //记录播放列表
        isplaying : false
    },
    mutations : {
        lodingEnd(state){
            state.isLoding = !state.isLoding;
        },
        changeList(state,newV){
            state.hash = newV.hash;
            state.songsList = newV.list;
        },
        isPlaying(state,newV){
            state.isplaying = newV.bl
        }
    }
})

export default store;