<template>
    <div class="newSongsBox" ref="newSongsBoxRef">
        <div class="newSongsTop">
            <!-- <svg class="icon" aria-hidden="true" @click="$router.push('/')">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg> -->
            <!-- <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="$router.push('/')" /> -->
            <navTop :title="('每日新歌推荐' + limit + '首')"></navTop>
            <!-- <h1>每日新歌推荐{{ limit }}首</h1> -->
        </div>
        <div class="newSongsContain">
            <PlayerList :msg="searchList" :isFromEveryDaySongs="isFromEveryDaySongs" @updataIndex="updataIndex">
            </PlayerList>
        </div>
    </div>
</template>
<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { getEveryDaySongs } from '../request/api/home';

// import { celDuration } from '../js/timeformat'; // 格式化歌曲时间，celDuration(info,i)

import { usePlayListStore } from '../stores/playlist';
import PlayerList from '../components/item/PlayerList.vue';
import { onBeforeRouteUpdate } from 'vue-router';

let storeState = usePlayListStore()
let isFromEveryDaySongs = ref(true)
// let title = ref(`每日新歌推荐`)
// const list = ref([]);
// const loading = ref(false);
// const finished = ref(false);

// const onLoad = () => {
//     // 异步更新数据
//     // setTimeout 仅做示例，真实场景中一般为 ajax 请求
//     setTimeout(() => {
//         for (let i = 0; i < 10; i++) {
//             list.value.push(list.value.length + 1);
//         }

//         // 加载状态结束
//         loading.value = false;

//         // 数据全部加载完成
//         if (list.value.length >= 40) {
//             finished.value = true;
//         }
//     }, 1000);

/* let state = reactive([{
    name: "锚",
    id: 1994220067,
    picUrl: "http://p1.music.126.net/HC0qtLUr3ciQSo-_q9SvwA==/109951168018756524.jpg?param=500y500",
    song: {
        duration: 138358, //持续时间
        popularity: 95, //受欢迎程度
        album: {
            name: "TOTEM（图腾）",
            picUrl: "http://p4.music.126.net/HC0qtLUr3ciQSo-_q9SvwA==/109951168018756524.jpg?param=500y500",
            subType: "录音室版",
            type: "EP",
            artists: [
                {
                    picUrl: "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
                    name: "刘思鉴",
                }
            ]
        }
    }
}]) */

let searchList = ref([])
let newSongsBoxRef = ref(null)

// 限制获取数据条数
let limit = ref(50)
onMounted(() => {
    // 设置背景图片
    newSongsBoxRef.value.style.backgroundImage = `url(http://p1.music.126.net/HC0qtLUr3ciQSo-_q9SvwA==/109951168018756524.jpg?param=375y600)`
    console.log(newSongsBoxRef.value.style);
    // setTimeout(() => {
    //     newSongsBoxRef.value.style.backgroundImage = `url(http://p1.music.126.net/HC0qtLUr3ciQSo-_q9SvwA==/109951168018756524.jpg?param=375y1200)`
    // }, 1000);

})

// 获取推荐新音乐
const getSongs = async (limit = 50) => {
    let { data } = await getEveryDaySongs(limit)
    console.log(data);
    if (data.code === 200) {
        let todo = []

        data.result.map(res => {
            // console.log(res);
            todo.push({
                al: {
                    id: res.id,
                    name: res.song.album.name,
                    picUrl: res.picUrl,
                },
                name: res.name,
                id: res.id,
                ar: [{
                    name: res.song.album.artists[0].name
                }]
            })
        })
        // console.log(todo);
        searchList.value = todo
        // console.log(searchList.value);

    }
    /*  if (data.code === 200) {
         // console.log(2);
         state.pop()
         // console.log(state);
         // console.log(...data.result.map(res=>res));
         state.push(...data.result.map(res => {
             console.log(res);
             // 修改获取的图片大小
             // res.picUrl = res.picUrl + '?param=500y500'
             // 修改成符合播放器播放的数据格式
             let playlist = {
                 al: {
                     id: res.id,
                     name: res.song.album.name,
                     picUrl: res.picUrl,
                 },
                 name: res.name,
                 id: res.id,
                 ar: [{
                     name: res.song.album.artists[0].name
                 }]
             }
             return res
         }))
         console.log(state);
     } */
}
// 默认获取limit=50首新歌
getSongs(limit.value)


let updataIndex = (item) => {
    // console.log(item);
    // 添加进播放列表
    storeState.pushPlayList(item)
    storeState.updataPlayListIndex(storeState.playlist.length - 1)
    console.log([newSongsBoxRef.value]);
    newSongsBoxRef.value.style.backgroundImage = `url(${item.al.picUrl}?param=375y1200)`
}

// let times;

const listens = () => {
    // console.log(newSongsBoxRef.value);
    // console.log(searchList.value);
    // times = setTimeout(() => {
    //     newSongsBoxRef.value.style.background = `url(${searchList.value.al.picUrl}?param=500y500)`
    //     console.log(searchList.value.al.picUrl);
    // }, 200)
}
// document.addEventListener('click', listens)

onBeforeUnmount(() => {
    // clearTimeout(times)
    // document.removeEventListener('click', listens)
})

const clickPlay = (item) => {
    console.log(item);
    storeState.pushPlayList(item)
    storeState.updataPlayListIndex(storeState.playlist.length - 1)
}
</script>
<style lang="less" scoped>
.newSongsBox {
    // width: 7.5rem;
    width: 100%;
    height: 100%;
    // margin-bottom: 70px;
    position: relative;
    box-sizing: border-box;

    .newSongsTop {

        // display: flex;
        // justify-content: flex-start;
        // align-items: center;

        // .icon {
        //     fill: #ccc;
        //     width: .6rem;
        //     height: .6rem;
        //     margin: .1rem;
        //     z-index: 1;
        //     // position: absolute;
        //     // top: 0;
        //     // left: 0;
        // }

        // h1 {
        //     font-size: .55rem;
        //     margin-left: .7rem;
        // }
    }

    .newSongsContain {

        .itemList {
            @colorlistRight: rgb(136, 139, 141);
            padding: 0 .2rem 1.4rem;

            .icon {
                padding: .04rem;
                margin: .1rem;
            }


            .item {
                display: flex;
                justify-content: space-between;
                padding-top: .6rem;

                &:first-child {
                    padding-top: .4rem;
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

        .containTop {
            // th {
            //     font-size: .35rem;
            //     font-weight: 600;
            // }
        }

        .containMiddle {}


    }

}
</style>