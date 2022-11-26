/*
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-17 15:04:24
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-11-22 23:25:07
 * @FilePath: \yiyunMusic\music\src\request\api\item.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import service from "..";

// 获取歌单详情页的数据
export function getMusicItemList(data) {
    return service({
        method: "GET",
        url: `/playlist/detail?id=${data}`
    })
}

// 获取歌单所有歌曲
// /playlist/track/all?id=24381616&limit=10&offset=1
export function getMusicItemListSong(data, limit = 20, offset = 0) {
    return service({
        method: "GET",
        url: `/playlist/track/all?id=${data}&limit=${limit}&offset=${offset}`
        // url: `/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`
    })
}
// 获取歌词
export function getMusicLyric(id) {
    // /lyric?id=33894312
    return service({
        method: "GET",
        url: `/lyric?id=${id}`
    })
}

// 喜欢音乐
// /like?id=347230  // 第二个参数传boolean布尔值，默认true // &timestamp=1503019930000 1668611274034
export function getLoveMusic(id, like = true, cookie) {
    // /lyric?id=33894312
    return service({
        method: "GET",
        url: `/like?id=${id}&like=${like}&cookie=${cookie}`
    })
}

// 新版评论接口
// /comment/new?type=0&id=1407551413&sortType=3&cursor=1602072870260&pageSize=20&pageNo=2
/**
 * @id 资源 id, 如歌曲 id,mv id
 * @type 数字 , 资源类型 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台节目 5: 视频 6: 动态 7: 电台
 * @pageNo 分页参数,第 N 页,默认为 1
 * @pageSize 分页参数,每页多少条数据,默认 20
 * @sortType 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
 * @cursor 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
 */
export function getTalkAbout(data,cookie='',timestamp=0) {
    // /lyric?id=33894312
    return service({
        method: "GET",
        url: `/comment/new?type=${data.type}&id=${data.id}&sortType=${data.sortType}&cursor=${data.time}&pageSize=${data.pageSize}&pageNo=${data.pageNo}&cookie=${cookie} &timestamp=${timestamp}`
    })
}

// 给评论点赞
// 说明 : 调用此接口 , 传入 type, 资源 id, 和评论 id cid 和 是否点赞参数 t 即可给对 应评论点赞 ( 需要登录 )
// 必选参数 : id : 资源 id, 如歌曲 id,mv id
// cid : 评论 id
// t : 是否点赞 , 1 为点赞 ,0 为取消点赞
// type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
// 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台节目 5: 视频 6: 动态 7: 电台
// 接口地址 : /comment/like

// 调用例子 : /comment/like?id=29178366&cid=12840183&t=1&type=0 对应给 https://music.163.com/#/song?id=29178366 最热门的评论点赞
export function getTalkAboutClick(data) {
    // /lyric?id=33894312
    return service({
        method: "GET",
        url: `/comment/like?type=${data.type}&id=${data.id}&cid=${data.cid}&t=${data.t}&cookie=${data.cookie}`
    })
}

// 获取客户端歌曲下载 url
// 说明 : 使用 /song/url 接口获取的是歌曲试听 url, 但存在部分歌曲在非 VIP 账号上可以下载无损音质而不能试听无损音质, 使用此接口可使非 VIP 账号获取这些歌曲的无损音频
// 必选参数 : id : 音乐 id (仅支持单首歌曲)
// 可选参数 : br : 码率, 默认设置了 999000 即最大码率, 如果要 320k 则可设置为 320000, 其他类推
// 接口地址 : /song/download/url

export function getDownloadSong(id,br) {
    return service({
        method: "GET",
        url: `/song/url?id=${id}&br=${br}`
    })
}