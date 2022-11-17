/*
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-17 15:04:24
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-11-16 23:10:31
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
export function getMusicItemListSong(data,limit=20,offset=0) {
    return service({
        method: "GET",
        url: `/playlist/track/all?id=${data}&limit=${limit}&offset=${offset}`
        // url: `/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`
    })
}
// 获取歌词
export function getMusicLyric(id){
    // /lyric?id=33894312
    return service({
        method: "GET",
        url: `/lyric?id=${id}`
    })
}

// 喜欢音乐
// /like?id=347230  // 第二个参数传boolean布尔值，默认true // &timestamp=1503019930000 1668611274034
export function getLoveMusic(id,like=true,cookie){
    // /lyric?id=33894312
    return service({
        method: "GET",
        url: `/like?id=${id}&like=${like}&cookie=${cookie}`
    })
}