<template>
    <div class="itemList">
        <div class="item" v-for="(item, i) in info" :key="i">
            <div class="itemLeft" @click="playMusic(i, item)">
                <span class="leftSpan">{{ i + 1 }}</span>
                <div>
                    <p>{{ item.name }}</p>
                    <div class="rightSpan">
                        <span v-for="(item1, i) in item.ar" :key="i">{{ item1.name }}</span>
                    </div>
                </div>
            </div>
            <div class="itemRight">
                <svg class="icon" aria-hidden="true" v-if="(item.mv != 0 && item.mv)" @click="playVideo(item.mv, i)">
                    <use xlink:href="#icon-shipin"></use>
                </svg>
                <!-- 播放器 -->
                <van-popup v-model:show="isVideoShow[i]" round :close-on-click-overlay="true" teleport="#app"
                    :style="{ height: '100vw/16*9', width: '100vw' }" v-if="(item.mv != 0 && item.mv)">
                    <!-- <img :style="{ width:'100%' }" src="https://img2.baidu.com/it/u=617579813,2960860841&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800"> -->
                    <VideoPlayComponent v-if="isVideoShow[i]" :options="videoOptions[0]" :id="i"
                        @play="onPlayerPlay($event)">
                    </VideoPlayComponent>
                    <!-- <VideoPlayer :options="videoOptions[i]" :id="i" @play="onPlayerPlay($event)"></VideoPlayer> -->
                </van-popup>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liebiao"></use>
                </svg>
            </div>
        </div>
    </div>
</template>
<script setup>
// import 'vant/es/showToast/style';
import { showToast } from 'vant';
import { useRouter } from 'vue-router';
import { usePlayListStore } from '../../stores/playlist';
import { getMusicOk, getPersonaMvAddr } from '../../request/api/home';


import { ref, reactive, defineAsyncComponent } from 'vue';
import { computed } from '@vue/reactivity';


let state = usePlayListStore()
let props = defineProps(['msg', 'isFromEveryDaySongs'])
// let emit = defineEmits(['updataIndex'])
let router = useRouter()
let isVideoShow = ref([])
let info = computed(() => {
    console.log('object111:', props.msg);
    if (props.msg) {
        props.msg.forEach((element, i) => {
            // isVideoShow.value.push(Boolean(element.mv))
            // 初始化，隐藏所有mv弹窗
            // isVideoShow.value.push(false)
            isVideoShow.value[i] = false
        });
        console.log(isVideoShow.value);
        console.log(props.msg);
    }


    // if(props.msg.)
    return props.msg
})

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
    controls: true,
    notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
    userActions: {
        doubleClick: 'myDoubleClickHandler' //控制双击玩家/技术的操作方式
    },
    // controlBar: {
    //     timeDivider: true, // 当前时间和持续时间的分隔符
    //     durationDisplay: true, // 显示持续时间
    //     remainingTimeDisplay: false, // 是否显示剩余时间功能
    //     fullscreenToggle: true, // 是否显示全屏按钮
    // },
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
            // { name: 'remainingTimeDisplay' }, // 总时间
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

let playMusic = async (i, item = 0) => { // item原为push进歌曲列表所用，现未启用
    // console.log(state);
    // console.log(props.msg);
    // console.log(emit);
    // if(router)
    // console.log(props.isEveryDaySongs);
    // if (props.isFromEveryDaySongs) {
    //     emit('updataIndex', item)
    // }
    // 判断歌曲权限
    let res = await getMusicOk(item.id)
    console.log(res.data);
    console.log("object:", item);
    // fee：8和0可以播放，noCopyrightRcmd=null
    if (res.data.success) {
        // if ((!item.noCopyrightRcmd) && (item.fee === 8 || item.fee === 0)) {
        if (item.fee == 1 || item.fee == 4) {
            showToast('此为vip歌曲，请先开通vip或购买该专辑！')
        } else {
            // 更新播放列表
            state.updataPlayList(props.msg);
            // console.log(state.playlist);
            state.updataPlayListIndex(i);
        }
    } else {
        showToast(`${res.data.message}`);
    }


}

// src="https://raw.githubusercontent.com/Binaryify/NeteaseCloudMusicApi/master/static/mv.png"
// let updataIndex = (item) => {
//     // 添加进播放列表
//     storeState.pushPlayList(item)
//     storeState.updataPlayListIndex(storeState.playlist.length - 1)
//     console.log([newSongsBoxRef.value]);
//     newSongsBoxRef.value.style.backgroundImage = `url(${item.al.picUrl}?param=375y1200)`
// }

// 播放mv

let VideoPlayComponent = defineAsyncComponent(() => import('../mv/VideoPlayer.vue'))

let playVideo = async (id, index) => {
    // 传入id
    console.log(id);
    console.log(index);
    // 设置videoOptions
    // 设置videoOption
    // 获取当前mv的可播放url
    let res = await getPersonaMvAddr(id)
    console.log(res);
    console.log(res.data.data.url); // 获取源地址sources[0].src
    videoOptions[0].sources[0].src = res.data.data.url
    console.log(videoOptions[0]);


    // isVideoShow.value.push(1)

    // 加载video组件
    // isVideoShow.value = true
    isVideoShow.value[index] = true

}

// 播放回调
const onPlayerPlay = (player) => {
    console.log('player play!', player)
}

</script>
<style lang="less" scoped>
@colorlistRight: rgb(136, 139, 141);

.itemList {
    // padding: 0 .2rem 1.4rem;
    padding: 0 .2rem;

    .icon {
        padding: .04rem;
        margin: .1rem;
    }


    .item {
        display: flex;
        justify-content: space-between;
        padding-top: .2rem;

        &:first-child {
            padding-top: 0;
        }

        .itemLeft {
            // flex: 8%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex: 85%;

            .leftSpan {
                color: @colorlistRight;
                padding-right: .23rem;
                font-size: .35rem;
            }

            div {
                // padding: .2rem;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;

                p {
                    font-size: .36rem;
                    font-weight: 700;
                }

                .rightSpan {
                    display: flex;
                    flex-flow: row wrap;

                    span {
                        font-weight: 400;
                        color: @colorlistRight;
                        padding-right: .2rem;
                    }

                    span:last-child {
                        padding-right: 0;

                    }
                }


            }

        }

        .itemMiddle {}

        .itemRight {
            flex: 15%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
    }
}
</style>