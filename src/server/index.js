import axios from 'axios';

let instace = axios.create({
    baseURL: '/kugou'
})
//获取新歌数据
export function getNewSongs(){
    return instace.get('?json=true')
}
//获取排行数据
export function getRankList(){
    return instace.get('rank/list?json=true')
}
//根据排行id获取排行详情
export function getRankListById(params={}){
    return instace.get(`/rank/info/${params.id}?json=true`)
}
//获取歌单数据
export function getSongList(){
    return instace.get('plist/index?json=true');
}
//根据歌单id获取数据
export function getGeDanInfo(params = { specialid: '' }){
    return instace(`/plist/list/${params.specialid}?json=true`)
}

//根据hash获取歌曲信息
export function getSong(params={}){
    return instace.get(`app/i/getSongInfo.php?cmd=playInfo&hash=${params.hash}`);
}
//根据歌曲hash获取歌词
export function getlrc(params={}){
    return instace.get(`app/i/krc.php?cmd=100&hash=${params.hash}&timelength=212000&d=0.5610875754478248`);
}

//获取歌手数据
export function getSingers(){
    return instace.get('singer/class?json=true');
}

// 根据歌手分类id，获取歌手分类歌手
export function getSingerList(params = { classid: '' }){
    return instace(`/singer/list/${params.classid}?json=true`)
}

// 根据歌手id，获取歌手歌曲
export function getSingerInfo(params = { singerid: '' }){
    return instace(`/singer/info/${params.singerid}?json=true`)
}

export default {
    install(Vue){
        Vue.prototype.$api = {
            getNewSongs,
            getSongList,
            getRankList,
            getSingers,
            getRankListById,
            getSong,
            getlrc,
            getGeDanInfo,
            getSingerList,
            getSingerInfo
        }
    }
}