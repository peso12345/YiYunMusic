<!--
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-19 17:15:01
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-11-23 17:43:36
 * @FilePath: \yiyunMusic\music\src\components\item\FooterMusic.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="FootMusic">
        <div class="footLeft" @click="state.updataDetailShow">
            <img :src="(state.playlist[state.playListIndex]?.al?.picUrl ?? state.playlist[state.playListIndex].picUrl) + '?param=200y200'"
                alt="">
            <div>
                <p class="van-ellipsis name">{{ state.playlist[state.playListIndex].name }}</p>
                <span class="xiangqing">点击查看详情</span>
            </div>
        </div>
        <div class="footRight">
            <svg class="icon" aria-hidden="true" @click="play" v-show="show">
                <use xlink:href="#icon-gl-playCircle"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="play" v-show="!show">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gl-playlistMusic"></use>
            </svg>
        </div>
        <audio ref="audio"
            :src="`https://music.163.com/song/media/outer/url?id=${state.playlist[state.playListIndex].id}.mp3`">
        </audio>
        <van-popup v-model:show="state.detailShow" position="right" :style="{ height: '100%', width: '100%' }">
            <MusicDetail :musicList="state.playlist[state.playListIndex]" :play="play" :isbtnShow="show"
                :addDuration="addDuration" />
        </van-popup>
    </div>
</template>
<script setup>
import { computed } from '@vue/reactivity';
import { Toast } from 'vant';
import { nextTick, onMounted, onUpdated, ref, watch } from 'vue';
import { usePlayListStore } from '../../stores/playlist.js';
import MusicDetail from './MusicDetail.vue';

let state = usePlayListStore()
// console.log(state.playListIndex);
// console.log(state.playlist);
// console.log(state);
// console.log(state.isbtnShow);
// console.log(state.updataIsbtnShow());
// console.log(state.isbtnShow);


let audio = ref(null)
// console.log(state.updataIsbtnShow(true));

// onMounted(()=>{
// console.log(audio);
// })

let interVal = 0;
let play = () => {
    console.log([audio.value]);
    if (audio.value.paused) {
        audio.value.play();
        state.updataIsbtnShow(false)
        updataTime()
    } else {
        audio.value.pause();
        state.updataIsbtnShow(true)
        clearInterval(interVal)
    }
}

let addDuration = () => {
    // console.log(typeof audio.value.duration,audio.value.duration);
    state.updataDuration(audio.value.duration)
    // console.log(state.duration);

    // 递归调用自己，确保获取有效的歌曲长度（时间）
    if (!state.duration) {
        setTimeout(() => {
            addDuration()
        }, 200);
    }
    // console.log(state.duration);
}
// let paused = () => {
//     console.log(222);
//     audio.value.pause();
//     state.updataIsbtnShow(true)
// }

let updataTime = () => {
    // console.log(audio);
    interVal = setInterval(() => {
        state.updataCurrentTime(audio.value.currentTime)
    }, 80)
}
let show = computed(() => {
    // console.log(state.isbtnShow);
    return state.isbtnShow
})

// 监听数组下标，（点击）改变则自动播放
watch([() => state.playListIndex, () => state.playlist], (newval, oldval) => {
    // console.log(newval);
    // console.log(oldval);
    audio.value.autoplay = true;
    if (audio.value.paused) {
        state.updataIsbtnShow(false)
        addDuration()
        updataTime()
    }
})
onMounted(() => {
    state.getLyric(state.playlist[state.playListIndex].id)
    // updataTime()
    addDuration()
    // console.log('footer');
})
onUpdated(() => {
    state.getLyric(state.playlist[state.playListIndex].id)
    addDuration()
})

</script>
<style lang="less" scoped>
.FootMusic {
    width: 100%;
    height: 1.4rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    z-index: 1;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    padding: .2rem;

    .footLeft {
        width: 60%;
        height: 100%;
        display: flex;

        img {
            width: 1rem;
            height: 1rem;
            display: block;
            border: 1px solid transparent;
            border-radius: 50%;
        }

        div {
            padding-left: .1rem;
            width: 80%;

            .name {
                font-size: .3rem;
                font-weight: 600;
            }

            .xiangqing {
                font-size: .25rem;
                color: rgb(8, 167, 230);
            }
        }
    }

    .footRight {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .icon {
            width: .6rem;
            height: .6rem;
        }
    }
}
</style>