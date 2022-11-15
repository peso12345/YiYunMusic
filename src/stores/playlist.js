/*
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-20 18:37:46
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-11-12 17:30:46
 * @FilePath: \yiyunMusic\music\src\stores\playlist.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { getMusicLyric } from "../request/api/item";
import { getLoginUser, getPhoneLogin } from "../request/api/home"

export const usePlayListStore = defineStore('playlist', () => {
    const playlist = ref([{
        al: {
            id: 3154175,
            name: "绅士",
            picUrl: "http://p4.music.126.net/qpvBqYIqkRhO9Ry2qOCdJQ==/2942293117852634.jpg",
            pic: 2942293117852634
        },
        name: "演员",
        id: 32507038,
        ar: [{
            name: "薛之谦"
        }]
        // ${{state.playlist[state.playListIndex].id}}
    }])
    let playListIndex = ref(0) // 默认下标为0
    let isbtnShow = ref(true) // 切换播放按钮
    let detailShow = ref(false) // 歌曲详情页的显示
    let lyricList = ref({}) // 歌词
    let currentTime = ref(0) // 当前时间
    let duration = ref(0) // 歌曲总时长
    let isLogin = ref(false) // 判断是否登录
    let isFooterMusic = ref(true) // 判断是否显示底部播放组件
    let token = ref('') // token
    let user = ref({}) // 用户信息
    let accountid = ref(0) // 用户ID
    let cookie = ref('') // cookie
    let hotSongsList = ref([]) // 热门歌单列表
    let rankList = ref([]) // 排行榜各大榜单列表
    let banner = ref([]) // 轮播图
    function updataIsbtnShow(value) {
        isbtnShow.value = value
    }
    function updataPlayList(value) {
        playlist.value = value
    }
    function updataPlayListIndex(value) {
        playListIndex.value = value
    }
    function updataDetailShow() {
        detailShow.value = !detailShow.value
    }
    async function getLyric(id) {
        let res = await getMusicLyric(id)
        // console.log(res);
        updataLyricList(res.data.lrc)
    }
    function updataLyricList(value) {
        lyricList.value = value
    }
    function updataCurrentTime(value) {
        // console.log(currentTime.value);
        currentTime.value = value
    }
    function updataDuration(value) {
        // console.log(value);
        duration.value = value
        // console.log("duration:",duration.value);
    }
    function pushPlayList(value) {
        playlist.value.push(value)
    }

    async function getLogin(value) {
        let res = await getPhoneLogin(value)
        // console.log(res);
        return res
    }
    function updataIsLogin(value) {
        isLogin.value = value
    }
    function updataToken(value) {
        token.value = value
        localStorage.setItem('token', token.value)
    }
    function updataUser(value) {
        user.value = value
        sessionStorage.setItem('userinfo', JSON.stringify(user.value))
    }
    async function updatagetdataUser() {
        // console.log('jiji:', user.value);
        if (sessionStorage.getItem('userinfo')) {
            user.value = JSON.parse(sessionStorage.getItem('userinfo'))
        } else {
            // if(localStorage.getItem('token')){
            user.value = await getLoginUser(JSON.parse(localStorage.getItem('id')))
            console.log(user.value);
            // }
        }
        // console.log('jiji2:', user.value);
        // return user.value
    }
    function updataAccountId(id) {
        accountid.value = id
        localStorage.setItem('id', JSON.stringify(id))
    }
    function updataCookie(value) {
        cookie.value = value
        localStorage.setItem('cookie', cookie.value)
    }
    function getCookie() {
      return  localStorage.getItem('cookie')
    }
    function updataHotSongsList() {
        hotSongsList.value = JSON.parse(sessionStorage.getItem('hotSongList'))
    }
    function updataRankList() {
        rankList.value = JSON.parse(sessionStorage.getItem('rankList'))
    }
    function updataBanner() {
        banner.value = JSON.parse(sessionStorage.getItem('banner'))
    }
    return {
        playlist, playListIndex, isbtnShow, detailShow, lyricList, currentTime, duration, isLogin, isFooterMusic, token, user, cookie, hotSongsList, rankList, banner
        , updataIsbtnShow, updataPlayList, updataPlayListIndex, updataDetailShow, getLyric, updataCurrentTime, updataDuration, pushPlayList, getLogin, updataIsLogin, updataToken, updataUser, updatagetdataUser, updataAccountId, updataCookie, updataHotSongsList, updataRankList, updataBanner,getCookie
    }
})