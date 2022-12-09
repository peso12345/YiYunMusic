<template>
    <div class="playerBoxAll">
        <div class="playerBoxTop">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <Vue3Marquee style="color: #999;width: 100%;">
                <h2>热门MV每天更新</h2>
            </Vue3Marquee>
        </div> <!-- playerBoxTop end -->
        <!-- <h1>最新热门MV推荐</h1> -->
        <br>
        <div class="mvTop">
            <div class="mvBox" v-for="(item, i) in videoOptions" :key="item">
                <div class="playerBox" ref="playerRef" v-if="show[i]">
                    <div class="playerBoxTop">
                        <span class="playerCountIcon">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-gl-play"></use>
                            </svg>
                            <span>{{ info[i].playCount }}</span>
                        </span>
                        <span class="midSpan">{{ info[i].name }}</span>
                        <!-- +info[i].duration / 1000 + 's'  -->
                        <span>{{ celDuration(info, i) }}</span>
                    </div>
                    <!-- 播放器 -->
                    <VideoPlayer :options="videoOptions[i]" :id="i" @play="onPlayerPlay($event)"></VideoPlayer>
                </div>
                <!-- <span>视频介绍</span> -->
            </div>
        </div>
    </div>
</template>
<script setup>
import { nextTick, onBeforeMount, onMounted, reactive, ref } from 'vue';
import { getPersonaMv, getPersonaMvAddr } from '../request/api/home'
import VideoPlayer from '../components/mv/VideoPlayer.vue';
// 跑马灯
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'

import * as dayjs from 'dayjs'
// import * as isLeapYear from 'dayjs/plugin/isLeapYear' // 导入插件
import 'dayjs/locale/zh-cn' // 导入本地化语言

// dayjs.extend(isLeapYear) // 使用插件
dayjs.locale('zh-cn') // 使用本地化语言

// import { celDuration } from '../js/timeformat'; // 格式化视频时间

// console.log(celDuration(1));
console.log('videoview');

let show = ref([])
let info = ref([])
let videoOptions = reactive([{
    poster: '', //
    sources: [ // 源地址
        {
            src: "http://vodkgeyttp8.vod.126.net/cloudmusic/759e/core/6e08/0236f65c221d9ed692a476eaa7023865.mp4?wsSecret=d849f2ddb10a333b9a0fb7a1cac9dd8f&wsTime=1666980762",
            type: "video/mp4",
        },
    ],
    // 取消比例和流体布局自适应才可以设置有效宽高
    aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
    // fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
    width: "",
    height: "",
    autoplay: false, // 如果为true,浏览器准备好时开始回放。
    muted: false, // 默认情况下将会消除任何音频。
    loop: false, // 是否视频一结束就重新开始。
    preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
    language: "zh-CN",
    playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
    controls: true, // 是否显示控制条
    notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
    // userActions: {
    //     doubleClick: myDoubleClickHandler //控制双击玩家/技术的操作方式
    // },
    controlBar: { // 设置控制条组件
        // timeDivider: true, // 当前时间和持续时间的分隔符
        // durationDisplay: true, // 显示持续时间
        // remainingTimeDisplay: false, // 是否显示剩余时间功能
        // fullscreenToggle: true, // 是否显示全屏按钮
        // currentTimeDisplay:true,

        /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
        children: [
            { name: 'playToggle' }, // 播放按钮
            { name: 'currentTimeDisplay' }, // 当前已播放时间
            { name: 'progressControl' }, // 播放进度条
            { name: 'durationDisplay' }, // 总时间
            { // 倍数播放
                name: 'playbackRateMenuButton',
                playbackRates: [0.5, 1.0, 1.5, 2.0],
            },
            {
                name: 'volumePanel', // 音量控制
                inline: false, // 不使用水平方式
            },
            { name: 'FullscreenToggle' } // 全屏
        ]
    },

}])

const getOneMV = (id) => {
    return new Promise((res, rej) => {
        getPersonaMvAddr(id).then(result => res(result)).catch(err => console.log(err))
    })
}
// 获取所有的MV信息
const getMvinfo = async () => {
    // 获取推荐mv的列表
    let { data } = await getPersonaMv()
    console.log(data.result);
    data.result.forEach(element => {
        show.value.push(false)
        // console.log(element);
    });
    console.log(show.value);
    let mapData = data.result.map(async (item, i) => {

        info.value.push({ // mv信息
            picUrl: item.picUrl, // 地址
            artistName: item.artistName, // 歌手名
            duration: item.duration, // 持续时间
            name: item.name, // mv名字
            playCount: item.playCount, // 播放次数
        })

        // 获取每个id的mv的播放地址
        // let res = await getPersonaMvAddr(data.result[i].id)
        let res = await getOneMV(data.result[i].id)
        console.table(i + ':' + data.result[i].id + ':' , res);
        if (i === 0) {
            videoOptions[0].poster = item.picUrl
            videoOptions[0].sources[0].src = res.data.data.url

            // show.value = true
        } else {
            videoOptions.push({
                poster: item.picUrl,//
                sources: [{ // 源地址
                    src: res.data.data.url,
                    type: "video/mp4",
                }],
                // fluid: true,
                aspectRatio: "16:9",
                width: "",
                height: "",
                autoplay: false,
                muted: false,
                loop: false,
                preload: "auto",
                language: "zh-CN",
                playbackRates: [0.5, 1.0, 1.5, 2.0],
                controls: true,
                notSupportedMessage: "此视频暂无法播放，请稍后再试",
                controlBar: {
                    // timeDivider: true,
                    // durationDisplay: true,
                    // remainingTimeDisplay: false,
                    // fullscreenToggle: true,
                    children: [
                        { name: 'playToggle' }, // 播放按钮
                        { name: 'currentTimeDisplay' }, // 当前已播放时间
                        { name: 'progressControl' }, // 播放进度条
                        { name: 'durationDisplay' }, // 总时间
                        { // 倍数播放
                            name: 'playbackRateMenuButton',
                            playbackRates: [0.5, 1.0, 1.5, 2.0],
                        },
                        {
                            name: 'volumePanel', // 音量控制
                            inline: false, // 不使用水平方式
                        },
                        { name: 'FullscreenToggle' } // 全屏
                    ]
                },
            })

        }

        // if (i === 3) show.value = true
        show.value[i] = true

        return res.data.data
    })


}
getMvinfo()
console.log('object.173');

// 播放回调
const onPlayerPlay = (player) => {
    console.log('player play!', player)
}

// let aae = []
// aae[0]  =  4
// aae[9] = 8
// console.log('aae:',aae);
// console.log('aae:',aae[6]);
// console.log('aae:',aae[0]);
// console.log('aae:',aae[8]);
// console.log('aae:',aae[9]);
// 输出：
// aae: (10) [4, empty × 8, 8] 0: 4 9: 8 length: 10 [[Prototype]]: Array(0)
// VideoView.vue:195 aae: undefined
// VideoView.vue:196 aae: 4
// VideoView.vue:197 aae: undefined
// VideoView.vue:198 aae: 8

// 格式化时间

let celDuration = (a, i) => {

    console.log(i, info.value);
    let time = info.value[i].duration

    let times = dayjs(time).format('mm:ss')
    console.log(info.value[i].duration);
    console.log(times);
    return times
}

</script>
<style lang="less" scoped>
.icon {
    fill: #ccc;
    width: .6rem;
    height: .6rem;
    margin: .1rem;
    z-index: 1;
    // position: absolute;
    // top: 0;
    // left: 0;

}

.playerCountIcon {

    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
        fill: rgba(255, 0, 0, 0.315);
        width: .4rem;
        height: .4rem;
        margin: .1rem;
    }
}

.midSpan {
    margin: 0 .2rem;
}

.playerBoxAll {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .playerBoxTop {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 0 .2rem;
    }

    .mvTop {
        box-sizing: border-box;
        width: 100%;
        height: 40%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .mvBox {
            width: 100%;
            height: 100%;
            margin: 0 .5rem .6rem;
            padding: .1rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .playerBox {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                border: 1px solid #ccc;
                border-radius: .2rem;
                overflow: hidden;

                .playerBoxTop {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    align-items: center;

                    span {
                        font-size: .3rem;
                        font-weight: 600;
                    }
                }

            }
        }

    }

}
</style>