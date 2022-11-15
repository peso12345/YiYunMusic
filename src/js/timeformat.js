import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // 导入插件
import 'dayjs/locale/zh-cn' // 导入本地化语言
dayjs.extend(isLeapYear) // 使用插件
dayjs.locale('zh-cn') // 使用本地化语言

export const celDuration = (info, i) => {
    // console.log(info,i);
    let time = [];
    if (info[i].song?.duration) {
        time = info[i].song.duration
    } else {
        time = info[i].duration
    }


    let times = dayjs(time).format('mm:ss')
    // console.log(info.value[i].duration);
    // console.log(times);
    return times
}