<template>

    <div class="playerBoxAll">
        <img :src="musicList.al.picUrl + '?param=800y800'" alt="" class="bgimg">
        <div class="detailTop">
            <div class="detailLeft">
                <svg class="icon" aria-hidden="true" @click="backTo">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
                <div class="leftMarquee">
                    <Vue3Marquee style="font-size: 0.35rem;color: white;width: 70%;">
                        {{ musicList.name }}
                    </Vue3Marquee>
                    <div class="bottomAct">
                        <Vue3Marquee style="color: white;width: 70%;">
                            <span v-for="item in musicList.ar" :key="item">{{ item.name }}&nbsp;&nbsp;</span>
                        </Vue3Marquee>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-xiangyoujiantou"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="detailRight">
                <svg class="icon" aria-hidden="true" @click="showShare = true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
                <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="onSelect"
                    cancel-text="" />
                <QRcodes @disappear="QRcodesUnmount" v-if="aQRcodeShow" />
            </div>
        </div>
        <div class="detailContent" v-show="!isLyricShow">
            <img src="../../assets/needle-ab.png" alt="" class="img_needle" :class="{ img_needle_active: !isbtnShow }">
            <img src="../../assets/yuan.png" alt="" class="img_cd">
            <img :src="musicList.al.picUrl + '?param=300y300'" alt="" class="img_ar"
                :class="{ img_ar_active: !isbtnShow, img_ar_paused: isbtnShow }" @click="isLyricShow = true">
        </div>
        <div class="musicLyric" v-show="isLyricShow" ref="musicLyricref">
            <div @click="isLyricShow = false">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fanhuijiantou"></use>
                </svg>
                <span class="text"> </span>
            </div>
            <p v-for="item in musicLyric" :key="item"
                :class="{ active: (state.currentTime * 1000 >= item.time && state.currentTime * 1000 < item.pre) }">
                {{ item.lrc }}
            </p>
        </div>
        <div class="detailFoot">
            <div class="footTop">
                <!-- 喜欢 -->
                <svg class="icon" aria-hidden="true" @click="toLove(true)" v-if="!isLove">
                    <use xlink:href="#icon-aixin"></use>
                </svg>
                <svg class="icon" aria-hidden="true" @click="toLove(false)" v-else>
                    <use xlink:href="#icon-xihuan"></use>
                </svg>
                <!-- 下载 -->
                <svg class="icon" aria-hidden="true" @click="downLoadSong">
                    <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
                </svg>
                <!-- 播放图标 -->
                <svg class="icon" aria-hidden="true" style="fill:aliceblue" @click="isLyricShow = !isLyricShow">
                    <use xlink:href="#icon-changpian"></use>
                </svg>
                <!-- 评论 -->
                <svg class="icon" aria-hidden="true" @click="toTalkAbout">
                    <use xlink:href="#icon-xiaoxi"></use>
                </svg>
                <van-popup v-model:show="isTalkShow" round position="bottom" :style="{ height: '60%' }">
                    <component :is="talkAboutComponent" :alldata="playerSongThisTime" v-if="isTalkShow"></component>
                </van-popup>
                <!-- 循环播放列表 -->
                <svg class="icon" aria-hidden="true" @click="Toast('暂未开放！')">
                    <use xlink:href="#icon-liebiao-"></use>
                </svg>
            </div>
            <div class="footContant">
                <!-- 进度条 -->
                <input type="range" class="range" min="0" :max="duration" v-model="state.currentTime" step="0.05">
            </div>
            <div class="footFooter">
                <!-- 循环模式 -->
                <svg class="icon" aria-hidden="true" @click="Toast('暂未开放！')">
                    <use xlink:href="#icon-xunhuan"></use>
                </svg>
                <!-- 上一首 -->
                <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
                    <use xlink:href="#icon-shangyishoushangyige"></use>
                </svg>
                <!-- 播放 -->
                <svg class="icon playIcon" aria-hidden="true" v-if="isbtnShow" @click="play">
                    <use xlink:href="#icon-gl-playCircle"></use>
                </svg>
                <!-- 暂停 -->
                <svg class="icon playIcon" aria-hidden="true" v-else @click="play">
                    <use xlink:href="#icon-zanting"></use>
                </svg>
                <!-- 下一首 -->
                <svg class="icon" aria-hidden="true" @click="goPlay(1)">
                    <use xlink:href="#icon-xiayigexiayishou"></use>
                </svg>
                <!-- 当前播放列表 -->
                <svg class="icon" aria-hidden="true" @click="Toast('暂未开放！')">
                    <use xlink:href="#icon-gl-playlistMusic"></use>
                </svg>
            </div>
        </div>
    </div>

</template>
<script setup>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { computed } from '@vue/reactivity';
import { onMounted, watch, ref, onUpdated, shallowRef, defineAsyncComponent } from 'vue';
import { usePlayListStore } from '../../stores/playlist.js'
import { Toast } from 'vant';
import { getMusicOk, getLoveList } from '../../request/api/home';
import { getLoveMusic, getDownloadSong } from '../../request/api/item';
import { useRouter } from 'vue-router';

import fileDownload from "../../js/download.js";

const props = defineProps(['musicList', 'isbtnShow', 'play', 'addDuration']);

let router = useRouter()

// import * as dayjs from 'dayjs'
// import * as isLeapYear from 'dayjs/plugin/isLeapYear' // 导入插件
// import 'dayjs/locale/zh-cn' // 导入本地化语言

// dayjs.extend(isLeapYear) // 使用插件
// dayjs.locale('zh-cn') // 使用本地化语言



let state = usePlayListStore()
let isLyricShow = ref(false)
let musicLyricref = ref(null)
let isLove = ref(false)
// shallowRef使用他减少性能消耗，不会响应式地追踪组件，不使用ref。
let talkAboutComponent = shallowRef(null)
let isTalkShow = ref(false)
// let checkPoint = ref(0) // 喜欢列表的检查点（时间戳）
// props.addDuration()

watch(() => state.currentTime, (newVal, b) => {
    let p = document.querySelector('p.active')
    // console.log([p]);
    // console.log(p.offsetTop);
    // console.log(newVal);

    if (p && (p.offsetTop > 200)) {
        // console.dir(musicLyricref.value);
        // musicLyricref.value.scrollTop = p.offsetTop - 200
        musicLyricref.value.scrollTo({
            top: p.offsetTop - 200,
            behavior: 'smooth'
        })
    } else if (p && p.offsetTop < 20) {
        musicLyricref.value.scrollTo({
            top: 0,
            // behavior: 'smooth'
        })
    }
    // 循环播放
    if (newVal === duration.value) {

        if (state.playListIndex === state.playlist.length - 1) {
            state.updataPlayListIndex(0)
            play.value()
        } else {
            state.updataPlayListIndex(state.playListIndex + 1)
        }
    }
})
// console.log(props.musicList);
onMounted(() => {
    // setTimeout(() => {
    //     console.log("rrr:", props.musicList);
    // }, 2000);
    // 触发父组件的addDuration函数，更新时间的显示
    props.addDuration()
    // console.log('detail');

})
// watch(()=>props.musicList, (a, b) => { // 无法监听的原因：组件生命周期问题，需开启立即监听
//     console.log('watch.musicList:', a, b);
// },{immediate:true})

let playerSongThisTime = ref({})
// 当前歌曲信息
let musicList = computed(() => {
    console.log('computed.musicList:', props.musicList);
    // 查询是否喜欢该音乐
    // 主页面里我的喜欢，数据更新有两分钟的延迟，可去除
    // 该函数需要登录后才能成功执行，已添加相关跳转登录机制
    findLoveSong()

    // console.log(1111);
    if (isTalkShow.value) {
        playerSongThisTime.value.id = props.musicList.id
        playerSongThisTime.value.type = 0 // 0: 歌曲，3: 专辑
        // console.log('music34');
    }

    return props.musicList
})
let isbtnShow = computed(() => {
    // console.log('computed.isbtnShow:', props.isbtnShow);
    return props.isbtnShow
})
let play = computed(() => {
    // console.log('computed.musicList:', props.musicList);
    return props.play
})
let duration = computed(() => {
    // console.log('computed.duration:', state.duration);
    return state.duration
})
let musicLyric = computed(() => {
    // console.log('state.lyricList:', state.lyricList);
    let arr;
    if (state.lyricList.lyric) {
        arr = state.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
            let min = item.slice(1, 3)
            let sec = item.slice(4, 6)
            let mill = item.slice(7, 10)
            let lrc = item.slice(11, item.length)
            let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
            if (isNaN(Number(mill))) {
                mill = item.slice(7, 9)
                lrc = item.slice(10, item.length)
                time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
            }
            return { min, sec, mill, lrc, time }
        })
        arr.forEach((item, i) => {
            if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                item.pre = 1000000
            } else {
                item.pre = arr[i + 1].time
            }
        })
    }
    // console.log(arr);
    return arr
})

let timer = 0; // 定时器返回值
// 返回上层
let backTo = () => {
    // 清除定时器，停止goPlay()函数递归调用
    clearTimeout(timer)
    state.updataDetailShow()
    isLyricShow.value = false
}

// 上一首下一首
let goPlay = async (i) => {
    clearTimeout(timer)
    // console.log("播放上一首（-1）还是下一首（1）:", i);
    let index = state.playListIndex + i
    if (index < 0) {
        index = state.playlist.length - 1
    } else if (index == state.playlist.length) {
        index = 0
    }

    // 更新需要播放的歌曲序号
    state.updataPlayListIndex(index)
    // 触发父组件的addDuration函数，更新时间的显示
    props.addDuration()
    // console.log('333334:',state.duration);
    // 判断是否可以播放
    // console.log(state.playlist);
    // console.log(index);

    // 检查歌曲是否可以播放
    let res = await getMusicOk(state.playlist[index].id)
    console.log(res.data);
    if (res.data.success && (state.playlist[index].name == '演员' || state.playlist[index].fee === 8 || state.playlist[index].fee === 0)) {
        console.log(!state.playlist[index].noCopyrightRcmd);
        console.log(state.playlist[index].fee === 8 || state.playlist[index].fee === 0);
        // if ((!state.playlist[index].noCopyrightRcmd) && (state.playlist[index].fee === 8 || state.playlist[index].fee === 0)) {
        console.log('开始播放:' + state.playlist[index].name);
    } else {
        if (res.data.message != 'ok') {
            Toast(`${res.data.message}，即将播放下一首！`);
        } else {
            console.log('vip歌曲?:', state.playlist[index].name);
            Toast(`该歌曲为vip歌曲，即将播放下一首！`);

        }
        timer = setTimeout(() => {
            goPlay(1)
        }, 2000);
    }
}

onUpdated(() => {
    // props.addDuration()
    // console.log(state.duration);
})

// 查询喜欢列表里有没有喜欢该歌曲
let findLoveSong = async () => {
    // 获取喜欢的音乐列表
    let id = JSON.parse(localStorage.getItem('id'))
    // console.log(id);
    let cookie = localStorage.getItem('cookie')
    // 判断是否存在id和cookie
    // console.log(cookie);

    if (id && cookie) {
        // 获取喜爱音乐的ids
        let time = (new Date()).getTime()
        console.log(time);
        let { data } = await getLoveList(id, cookie, time)
        console.log(data);
        // console.log(musicList.value.id);
        isLove.value = data.ids.includes(musicList.value.id)
        console.log(isLove.value, '喜爱的歌曲:', musicList.value.name);
    } else {
        // Toast('没有登录，无法获取喜爱的歌曲信息！')
        console.log('没有登录，无法获取喜爱的歌曲信息！');

    }

}
// findLoveSong()

// 喜欢该音乐（传入id和true）
let two = 0;
let toLove = async (like) => {
    let id = musicList.value.id
    console.log(musicList.value);
    console.log(id, like);
    let cookie = localStorage.getItem('cookie')
    if (cookie) {
        let time = (new Date()).getTime()
        let res = await getLoveMusic(id, like, cookie, time)
        console.log(like, '喜欢该音乐:', res);
        if (res.data.code == 200) {
            isLove.value = !isLove.value
            // 查询有没有添加到喜欢列表里
            // findLoveSong()
        } else {
            Toast('操作失败，请稍后再试！')
        }
    } else {
        Toast('请先登录！')
        two++;
        if (two >= 2) {
            setTimeout(() => {
                router.push('/login')
                two = 0
            }, 1000);
        }

    }
}
"http://m801.music.126.net/20221122234310/714ed0b24c6443bdacbaadc58125abdb/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096410674/892b/2a82/ed85/1114ebfe7116d48f675e7a869ad7e8ed.mp3"
let downLoadSong = async () => {
    // console.log(state.getCookie());
    let res = await getDownloadSong(musicList.value.id, 999000)
    console.log(res.data);
    console.log(res.data.data[0].url);
    let urls = res.data.data[0].url
    // window.open(urls, '_blank');
    // window.location.href = urls;
    // 跨域资源，只传url
    fileDownload(urls)

}
// 动态引入组件
// defineAsyncComponent // 异步组件
let loadComponent = value => import(`../talk/${value}.vue`)
let toTalkAbout = () => {
    loadComponent('TalkAbout').then(component => {
        talkAboutComponent.value = component.default
        isTalkShow.value = true
        console.log('toTalkAbout');
    })
}

// 分享面板
const showShare = ref(false);
const options = [
    { name: '微信', icon: 'wechat' },
    { name: '微博', icon: 'weibo' },
    { name: '复制链接', icon: 'link' },
    { name: '二维码', icon: 'qrcode' },
];

let aQRcodeShow = ref(false)
const onSelect = (option) => {
    Toast(option.name);
    if (option.name === '微信') {
        window.open('https://weixin.qq.com/')
    }
    if (option.name === '微博') {
        window.open('https://weibo.com/')
    }
    if (option.name === '二维码') {
        aQRcodeShow.value = true
    }

    if (option.name === '复制链接') {
        let target = document.createElement('input') //创建input节点
        target.value = window.location.href; // 给input的value赋值
        document.body.appendChild(target) // 向页面插入input节点
        target.select() // 选中input
        if (document.execCommand('Copy')) {
            document.execCommand('Copy') // 执行浏览器复制命令
            Toast('复制成功')
            target.remove()
        } else {
            Toast('复制失败，请使用二维码分享！')
        }

    }
    
    showShare.value = false;
};
const QRcodes = defineAsyncComponent(() => import('../talk/QRcode.vue'))
let QRcodesUnmount = (value) => {
    // console.log(value);
    // aQRcodeShow.value = false
    aQRcodeShow.value = value
}
</script>
<style lang="less" scoped>
.playerBoxAll {
    height: 100vh;
    width: 100%;
}

.bgimg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(70px);
}

.playIcon {
    width: .8rem;
    height: .8rem;
}

.detailTop {
    width: 100%;
    height: 1rem;
    padding: .2rem;
    fill: white;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .detailLeft {
        display: flex;
        justify-content: center;
        align-items: center;

        .leftMarquee {
            width: 3rem;
            height: .48rem;
            margin-left: .4rem;

            .bottomAct {
                width: 100%;
                // height: .4rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;

                span {
                    // color: rgb(233,216,154);
                    color: rgb(225, 219, 228);
                    font-size: .28rem;
                }

                .icon {
                    width: .3rem;
                    height: .3rem;
                    fill: #999;
                }
            }
        }

    }

    // .detailRight {}
}

.detailContent {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .img_needle {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-15deg);
        transition: all 2s;
        z-index: 2;
    }

    .img_needle_active {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(1deg);
        transition: all 2s;
        z-index: 2;
    }

    .img_cd {
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 2.3rem;
        z-index: -1;
    }

    .img_ar {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        bottom: 3.14rem;
        animation: rotate_ar 10s linear infinite;
    }

    .img_ar_active {
        animation-play-state: running;
    }

    .img_ar_paused {
        animation-play-state: paused;

    }

    @keyframes rotate_ar {
        0% {
            transform: rotateZ(0deg);
        }

        100% {
            transform: rotateZ(360deg);
        }
    }

}

.musicLyric {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: .2rem;
    overflow: scroll;
    position: relative;

    @color: rgba(7, 7, 7, 0.774);

    &::-webkit-scrollbar {
        width: 0 !important
    }

    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;

    div {
        position: fixed;
        top: 11.5%;
        left: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: @color;

        .text {
            color: white;
            font-size: .2rem;
            font-weight: 100;
        }

        .icon {
            fill: white;
            height: .3rem;
            width: .3rem;
        }
    }

    p {
        color: @color;
        margin-bottom: .3rem;
    }

    .active {
        color: white;
        font-size: .42rem;
    }
}

.detailFoot {
    width: 100%;
    height: 20%;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    fill: red;

    .footTop {
        // margin: .3rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .footContant {
        margin: .2rem;

        .range {
            width: 100%;
            height: .06rem;
        }
    }

    .footFooter {
        // margin: .3rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding-bottom: .2rem;
    }
}
</style>