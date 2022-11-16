<!--
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-16 18:52:39
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-11-16 19:08:57
 * @FilePath: \yiyunMusic\music\src\components\home\MusicList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEiv
-->
<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">{{ state.title }}</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="swipeWidth" :height="swipeHeight" class="my-Swiper"
                :show-indicators="false" ref="swipeRef">
                <van-swipe-item class="my-item" v-for="item in state.musicList" :key="item.id">
                    <RouterLink :to="{ path: '/itemMusic', query: { id: item.id } }">
                        <!-- 这个div必须添加，不然会导致css定位失效 -->
                        <div>
                            <img :src="item.picUrl + '?param=300y300'" alt="" srcset="" />
                            <span class="playCount">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-gl-play"></use>
                                </svg>
                                {{ playcount(item.playCount) }}
                            </span>
                            <span class="name">{{ item.name }}</span>
                        </div>
                    </RouterLink>
                </van-swipe-item>
            </van-swipe>
        </div>

    </div>
</template>
<script setup>
import { computed } from '@vue/reactivity';
import { onMounted, reactive, watch,ref } from 'vue';
import { getMusicList } from '../../request/api/home';

// 获取浏览器窗口的视口宽度和高度，并在窗口大小变化时自动更新。
import { useWindowSize } from '@vant/use';
const { width, height } = useWindowSize();
let swipeWidth = ref(0)
let swipeHeight = ref(0)
let swipeRef = ref(null)

watch([width, height], ([newVal, new1], [oldVal, old1]) => {
    console.log('window resized');
    console.log(newVal);
    //     //   console.log(new1);
    swipeWidth.value = newVal / 2.5
    swipeHeight.value = swipeWidth.value
    console.log(swipeWidth.value);

    console.log(swipeRef.value);

    swipeRef.value?.resize()
}, { immediate: true });

let props = defineProps(['options', 'isFrom'])

// console.log(props.options);

let state = reactive({
    musicList: [],
    title: '发现好歌单',
})
onMounted(async () => {
    swipeRef.value?.resize({width:swipeWidth.value,height:swipeHeight.value})

    // 是主页就请求数据，发现好歌单（默认）；其他页面，则采用props的数据渲染
    if (props.isFrom == 'isHome') {
        let { data } = await getMusicList()
        // console.log(data.result);
        state.musicList = data.result
        // console.log(state.musicList);
    } else {
        // console.log('来自主页面外的数据');
        // state.musicList = props.options.
        // console.log(props.options);
        state.title = props.options.title
        state.musicList = props.options.playlists
    }
})
// watch(() => props.options?.playlists, (newVal, oldVal) => {
//     console.log(newVal);
//     console.log(props.options);
//     state.title = props.options.title
//     state.musicList = props.options.playlists
// }, { deep: true ,immediate:true})
let playcount = (count) => {
    if (count >= 100000000) {
        return count = (count / 100000000).toFixed(1) + '亿'
    } else if (count >= 10000) {
        return count = (count / 10000).toFixed(1) + '万'
    } else {
        return count
    }
}
// let playcount = computed(() => {
//     // 直接使用computed((count) => { return count})会报错TypeError: $setup.playcount is not a function
//     // 上面的报错告诉我们，playcount不是一个函数
//     // vue3中computed返回值不固定，而computed现在返回的是一个普通的值，所以我们尝试返回一个函数，成功。
//     return (count) => {
//         if (count >= 100000000) {
//             return count = (count / 100000000).toFixed(1) + '亿'
//         } else if (count >= 10000) {
//             return count = (count / 10000).toFixed(1) + '万'
//         }
//         // return count
//     }
// })
</script>
<style lang="less" scoped>
.musicList {
    width: 100%;
    height: 5rem;
    padding: 0.2rem;
    // margin-bottom: 140px;

    .musicTop {
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;

        .title {
            font-size: 0.4rem;
            font-weight: 900;
            overflow: hidden;
        }

        .more {
            border: 1px solid #ccc;
            text-align: center;
            line-height: 0.6rem;
            padding: 0 0.2rem;
            border-radius: 0.4rem;
            overflow: hidden;
        }
    }

    .musicContent {
        width: 100%;
        height: 4rem;

        .my-Swiper {
            height: 100%;
            display: block;

            .van-swipe-item {
                padding: 0 .1rem;
            }


            .my-item {
                width: 3rem;
                position: relative;


                img {
                    width: 100%;
                    height: 3rem;
                    display: block;
                    border-radius: .2rem;
                }

                .playCount {
                    position: absolute;
                    top: 2%;
                    right: 2%;
                    color: rgb(255, 255, 255);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: 500;

                    .icon {
                        width: .35rem;
                        height: .35rem;
                        fill: white;
                        padding-right: 2px;
                    }
                }

                .name {}
            }
        }
    }
}

a {
    color: black;
}
</style>