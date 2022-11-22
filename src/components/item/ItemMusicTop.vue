<!--
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-17 15:23:25
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-11-18 02:25:47
 * @FilePath: \yiyunMusic\music\src\components\item\ItemMusicTop.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="itemMusicTop">
        <!-- 背景图片 -->
        <img :src="msg.coverImgUrl" alt="" srcset="" class="bgimg">
        <div class="itemLeft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="itemRight">
            <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao"></use>
            </svg>
        </div>
    </div>
    <div class="itemMusicMain">
        <div class="itemMainTop">
            <div class="TopImg">
                <img :src="msg.coverImgUrl + '?param=300y300'" :alt="msg.algTags" @error.once="imgloaderror">
            </div>
            <div class="itemMainTopInfo" v-if="show">
                <span>{{ msg.name }}</span>
                <div class="itemMainTopInfoCreator">
                    <img style="{width:.4rem;}" :src="msg.creator.avatarUrl" alt="">
                    <span class="CreatorSpan">
                        {{ msg.creator.nickname }}
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-xiangyoujiantou"></use>
                        </svg>
                    </span>
                </div>
                <span class="van-multi-ellipsis--l2">{{ msg.creator.signature }}</span>
            </div>
            <!-- <span>{{msg.creator.nickname}}</span> -->
            <!-- <span>{{msg.creator.signature}}</span> -->
        </div>
        <div class="itemMainBottom">
            <div class="itemMainBottomInfo">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiaoxi"></use>
                </svg>
                <span>{{ playcount(msg.commentCount) }}</span>
            </div>
            <div class="itemMainBottomInfo">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
                <span>{{ playcount(msg.shareCount) }}</span>
            </div>

            <div class="itemMainBottomInfo">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
                </svg>
                <span>下载</span>

            </div>
            <div class="itemMainBottomInfo">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xuanze-duoxuan-tianchong"></use>
                </svg>
                <span>多选</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from '@vue/reactivity';
import { onMounted, watch, ref } from 'vue';
// props传值，判断数据是否获取到值
let props = defineProps(['playlist'])
let show = ref(null)

show.value = props.playlist.hasOwnProperty('creator')
// console.log(props.playlist.hasOwnProperty('creator'));
// console.log(props);
// console.log(props.playlist);

// onMounted(() => { // 失效。由于业务变化，获取本地数据需要watch监听获取
//     // 获取sessionStorage放在onMounted里面是为了等待父组件的onMounted先执行setItem
//     if (!props.playlist.hasOwnProperty('creator')) {
//         // console.log(22222);
//         props.playlist.creator = JSON.parse(sessionStorage.getItem('itemDetail')).playlist.creator
//         // console.log(props.playlist.creator);
//     }
// })
watch(() => props.playlist, (newVal, oldVal) => {
    // console.log('watch:', newVal, oldVal);
    if (!props.playlist.hasOwnProperty('creator')) {
        // console.log(22222);
        props.playlist.creator = JSON.parse(sessionStorage.getItem('itemDetail')).playlist.creator
        console.log(props.playlist.creator);
    }
    // console.log(33333);

})
/* let msg = ref({});
let bmsg = watch(() => props.playlist, (a, pre) => {
    // console.log("2345：", a);
    // console.log("2345pre：", pre);
    msg.value = a;
    console.log('b23:', msg.value);
    // }, { immediate: true }) // 立即监听
}) */
// 图片加载的时候显示的图片
let imgloaderror = (event) => {
    // console.log(event);
    // event.srcElement.src = ''
    // event.srcElement.src = msg.coverImgUrl + '?param=300y300'

    event.target.src = 'https://p1.music.126.net/kZb9DO4vykqiYEx0HHx86w==/109951163065542645.jpg?param=100y100'
}

let msg = computed(() => {
    let playlist = props.playlist
    // console.log('computed:', playlist);
    show.value = props.playlist.hasOwnProperty('creator')

    return playlist
})

let playcount = (count) => {
    if (count >= 100000000) {
        return count = (count / 100000000).toFixed(1) + '亿'
    } else if (count >= 10000) {
        return count = (count / 10000).toFixed(1) + '万'
    } else {
        return count
    }
}

</script>
<style lang="less" scoped>
.itemMusicTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding: .2rem;
    position: relative;

    .itemLeft,
    .itemRight {
        width: 25%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 .2rem;

        span {
            font-size: .40rem;
            color: white;
        }

        .icon {
            fill: white;
        }
    }

    .bgimg {
        width: 100%;
        height: 11rem;
        position: fixed;
        z-index: -1;
        filter: blur(30px); // 虚化
    }

}

.itemMusicMain {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: .4rem;
    // align-items: center;

    .itemMainTop {
        display: flex;
        justify-content: space-around;

        .TopImg {
            padding: 0 .2rem;

            img {
                width: 3rem;
                height: 3rem;
                display: block;
                border: 1px solid transparent;
                border-radius: .2rem;
                object-fit: cover;
            }
        }




        span {
            color: white;
            font-weight: 900;
        }

        .itemMainTopInfo {
            display: flex;
            flex-flow: column nowrap;
            padding: 0 .2rem;
            // overflow: hidden;

            .itemMainTopInfoCreator {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                // overflow: hidden;
                padding: .2rem 0;


                img {
                    width: .75rem;
                    border-radius: 50%;
                }

                @CreatorColor: rgb(192, 164, 164);
                @IconWidth: .2rem;

                .CreatorSpan {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding-left: .1rem;
                    font-size: .3rem;
                    font-weight: 700;
                    // overflow: hidden;
                    color: @CreatorColor;


                    .icon {
                        margin-left: .1rem;
                        width: @IconWidth;
                        height: @IconWidth;
                        vertical-align: -0.15em;
                        fill: @CreatorColor;
                        overflow: hidden;
                    }
                }


            }

            span:last-child {
                font-size: .24rem;
                font-weight: 100;
                height: .8rem;
                overflow: hidden;
            }
        }

    }

    @IconWidth: .5rem;

    .itemMainBottom {
        padding-top: .4rem;
        display: flex;
        justify-content: space-around;

        .itemMainBottomInfo {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .icon {
                width: @IconWidth;
                height: @IconWidth;
                vertical-align: -0.15em;
                overflow: hidden;
                fill: white;
            }

            span {
                padding-top: .1rem;
                color: white;
                font-size: .2rem;
            }
        }

    }
}
</style>