/*
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-16 17:39:27
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-11-16 19:35:17
 * @FilePath: \yiyunMusic\music\src\request\api\home.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE 
 */
import service from "..";

// 获取首页轮播图的数据
export function getBanner() {
    return service({
        method: "GET",
        url: "/banner?type=2"
    })
}
// 获取发现好歌单
export function getMusicList() {
    return service({
        method: "GET",
        url: "/personalized?limit=10"
    })
}
// 获取搜索列表
export function getSearchMusic(data) {
    return service({
        method: "GET",
        url: `/search?keywords=${data}`
    })
}

// /login/cellphone?phone=xxx&password=yyy
// 手机登录
export function getPhoneLogin(data) {
    return service({
        method: "GET",
        url: `/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}

// /user/detail?uid=32953014
// 用户详情
export function getLoginUser(data) {
    return service({
        method: "GET",
        url: `/user/detail?uid=${data}`
    })
}

// 只能返回部分成功信息，不实用
// 手机验证码
export function sendLoginMark(data) {
    return service({
        method: "GET",
        url: `/captcha/sent?phone=${data}`
    })
}

// /captcha/verify?phone=13xxx&captcha=1597
// 手机验证码登录验证
export function sendLoginMarkUser(data) {
    return service({
        method: "GET",
        url: `/captcha/verify?phone=${data.isPhones}&captcha=${data.isCheck}`
    })
}

// /personalized/mv
// 推荐mv
export function getPersonaMv() {
    return service({
        method: "GET",
        url: `/personalized/mv`
    })
}
// /mv/url?id=5436712
// 获取mv地址
export function getPersonaMvAddr(data) {
    return service({
        method: "GET",
        url: `/mv/url?id=${data}`
    })
}

// // 调用例子 : /login/status (无效)
// // 刷新登录
export function getLoginRefresh(data) {
    return service({
        method: "GET",
        url: `/login/status`
    })
}

// 获得每日推荐歌曲 ( 需要登录 ) （无效）
// /recommend/songs
// 获取推荐新音乐 /personalized/newsong
export function getEveryDaySongs(data) {
    return service({
        method: "GET",
        url: `/personalized/newsong?limit=${data}`
    })
}

//  获取已喜欢音乐ids
// /likelist?uid=32953014+cookie
export function getLoveList(id,cookie) {
    return service({
        method: "GET",
        url: `/likelist?uid=${id}&cookie=${cookie}`
    })
}

//  获取ids歌曲详情
// /song/detail?ids=347230,/song/detail?ids=347230,347231
export function getLoveListAndThen(ids) {
    return service({
        method: "GET",
        url: `/song/detail?ids=${ids}`
    })
}

// 精品歌单标签列表
// /playlist/highquality/tags
export function getSongsCatlist() {
    return service({
        method: "GET",
        url: `/playlist/highquality/tags`
    })
}

// 获取精品歌单
// 可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
// limit: 取出歌单数量 , 默认为 50
// before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
// /top/playlist/highquality?before=1503639064232&limit=3
export function getSongsCatlistAll(tag,updateTime=0,limit=10) {
    return service({
        method:'GET',
        url:`/top/playlist/highquality?cat=${tag}&before=${updateTime}&limit=${limit}`
    })
}

// 获取所有榜单
// /toplist
export function getAllRankList(){
    return service({
        method:'GET',
        url:`/toplist`
    })
}

// 音乐是否可用
// /check/music?id=33894312
export function getMusicOk(id){
    return service({
        method:'GET',
        url:`/check/music?id=${id}`
    })
}