<template>
    <div>
        <van-nav-bar class="barTopFiex" :title="title" left-text="返回" left-arrow @click-left="$router.push('/')" />
        <div class="rankListBox">
            <van-swipe ref="swipeRef" class="mySwiper" @change="onChange" :loop="false" :width="320" :autoplay="0"
                :show-indicators="false">
                <van-swipe-item class="mySwiperItem" v-for="(item, i) in datas" :key="item">
                    <div class="box">
                        <div class="boxItemTop">
                            <h2 class="topOne">{{ datas[i].name }} <span>{{ datas[i].updateFrequency }}</span>
                            </h2>
                            <div>
                                播放:{{ playcount(datas[i].playCount) }}
                                &nbsp;&nbsp;
                                订阅:{{ playcount(datas[i].subscribedCount) }}
                            </div>
                        </div>
                        <div v-if="show">
                            <div class="boxItemContain" v-if="show">
                                <PlayerList :msg="listSong[i]"></PlayerList>
                                <div class="boxItemContainButtom">
                                    <h2 class="boxBottom" @click="getSongs(i, datas[i].id, datas[i].name, 20, 20)"
                                        v-if="showMore">查看更多
                                    </h2>
                                    <h2 class="boxBottom" @click="toTop" v-else>回到顶部</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
    <!-- 榜单结束 -->
</template>
<script setup>
import { computed } from '@vue/reactivity';
import { ref, watch } from 'vue';
import PlayerList from '../components/item/PlayerList.vue';
import { getAllRankList } from '../request/api/home';
import { getMusicItemListSong } from '../request/api/item';
import { usePlayListStore } from '../stores/playlist';

let state = usePlayListStore()
let swipeRef = ref(null)
// console.log('swipeRef:',swipeRef.value);

// let active = computed(() => {
//     console.log(swipeRef.value?.state?.active);
//     return swipeRef.value?.state?.active
// })

let show = ref(false)
let showMore = ref(true)
let title = ref('排行榜')

let datas = ref([{
    coverImgUrl: "https://p1.music.126.net/pcYHpMkdC69VVvWiynNklA==/109951166952713766.jpg",
    description: "云音乐中每天热度上升最快的100首单曲，每日更新。",
    id: 19723756,
    name: "飙升榜",
    playCount: 5249040384,
    subscribedCount: 3987171, // 订阅数
    updateFrequency: "刚刚更新", // 更新频率
    updateTime: 1667789171719
}])

let listSong = ref([])

let getList = async (limit = 10) => {
    if (!sessionStorage.getItem('rankList') || limit != 10) {
        let res = await getAllRankList()
        // console.log(res);
        datas.value = res.data.list.slice(0, limit)
        // console.log(datas.value);
        sessionStorage.setItem('rankList', JSON.stringify(datas.value))
    } else {
        state.updataRankList()
        datas.value = state.rankList.slice(0, limit)
    }
}
// 1、获取各大榜单信息
getList()



// let allinfo = ref([])
let max = ref([]);


let getSongs = async (index, id = datas.value[0].id, name, limit = 20, offset = 0) => {
    return new Promise(async (resolve, reject) => {
        // 获取歌单所有歌曲:id,limit(默认20首歌)
        let res;
        if (offset == 0) { // offset == 0,代表是第一次获取数据
            console.log(listSong.value[index]);
            if (!listSong.value[index]) {
                res = await getMusicItemListSong(id, limit, 0)
                console.log('===================');
                console.log(name);
                console.log(res);
                console.log('===================');
            } else {
                return
            }

        } else {
            max.value[index] = max.value[index] ? max.value[index] : 0
            console.log(max.value[index]);
            res = await getMusicItemListSong(id, limit, max.value[index] + offset)
            console.log(res);
            console.log(res.data.songs.length);
            // max.value[index] = offset
            // console.log(max.value[index] + offset);
        }

        // allinfo.value.push(...res.data.songs)
        // console.log(allinfo.value);
        // listSong.value = allinfo.slice(0, 6)
        // listSong.value = allinfo.value
        console.log('getSongs');
        if (res.data.songs.length === 0) {
            max.value[index] = listSong.value[index].length
            console.log(max.value[index]);
            console.log(222);
            showMore.value = false
            return
        }
        if (!listSong.value[index]) { // 如果当前歌曲列表详情没有值，就添加数据进去
            // 如果歌曲列表详情没有值，就添加数据进去
            listSong.value[index] = res.data.songs
        } else {  // 有值了，就按照位置添加数据
            // console.log(`当前位置已经有数据了，请修改offset，为这个当前index为${index}的列表末尾添加更多数据`);
            // listSong.value
            console.log(res.data.songs);
            if (offset !== 0) { // 当前列表有值，且offset不等于0，才赋值
                max.value[index] += offset
                console.log(max.value);
                listSong.value[index].push(...res.data.songs)
            }
        }
        console.log(listSong.value);
        console.log("获取数据完毕的序号:", index);
        resolve()
        setTimeout(() => {
            show.value = true
        }, 50);
    })
}
// 获取各个榜单歌曲信息
let getAllSongs = async (index, start, end) => {
    // 获取所有榜单列表信息，限制显示前几个
    await getList(10)

    // console.log('swipeRef:', swipeRef.value);
    // 等待获取所有列表id后，获取所有列表所有歌曲详细信息
    // TODO:第一次只获取前2个榜单的信息，当轮播图滑动的时候获取第3个榜单的数据，并赋值
    // console.log(datas.value);
    // console.log(datas.value.slice(start, end));
    for (const item of datas.value.slice(start, end)) {
        // if (item.id == 5453912201) { return }
        await getSongs(index, item.id, item.name)
        // 这里的等待只能等待他自己的返回值，然而我的序号0和序号1的数据是同时发出的请求，不会互相等待
        // ，可尝试使用promise.all,但需要多添加代码，这里不需要严格按照时间顺序赋值
        console.log('当前加载完毕的数据序号:', index);
        // console.log(index);
    }
}
// 1.1第一次进入页面时获取序号0的数据

getAllSongs(0, 0, 1)
console.log('开始加载序号0的数据');
// let arr = [[0, 1], [2], [3], [4]]
// 滑动模块时预加载下一页的数据
let onChange = (index) => {
    console.log('index:(滑动页面后获取到的页面序号)', index);
    // 获取当前页面序号的榜单信息,打开页面不会触发该函数
    // 所以进入页面时，就应该获取序号0和序号1的歌曲列表数据
    // 当滑动页面时，要获取序号为2的页面数据，以此类推
    // getAllSongs(index, index + 1, index + 2)

}
// getSongs()
watch(() => swipeRef.value?.state?.active, (newVal, old) => {
    let active = swipeRef.value?.state?.active
    console.log('swipeRef:（当前激活的页面序号，（预加载）这里获取的是下一个序号的数据）', active);
    // 2.当前激活页面有值的时候，获取下一页的数据
    console.log('开始加载序号' + (active + 1) + '的数据');

    getAllSongs(active + 1, active + 1, active + 2)
})

let toTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

let lookMore = (num) => { // 获取的是全部数据后，用此方法实现'点击查看更多'
    if (max > allinfo.length) return
    max = max + num + 6
    listSong.value = allinfo.slice(0, max)
    // console.log(max, num);
    // console.log(listSong.value);
}
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
:deep(.van-nav-bar__title) {
    font-size: .45rem;
}

:deep(.van-nav-bar__text) {
    font-size: .38rem;
}

:deep(.van-icon) {
    font-size: .38rem;
}

.barTopFiex {
    position: sticky;
    top: 0;
}

.rankListBox {
    width: 100%;
    height: 100%;


    .mySwiper {
        height: 100%;
        display: block;

        .van-swipe-item {
            padding-left: .3rem;
        }

        .mySwiperItem {
            width: 150px;

            .box {
                position: relative;
                width: 100%;
                // width: 6.4rem;
                border: 1px solid #ccc;
                border-top-left-radius: .2rem;
                border-top-right-radius: .2rem;
                margin-bottom: 70px;

                .boxItemTop {
                    display: flex;
                    flex-flow: column nowrap;
                    padding: .2rem;
                    padding-top: 0;

                    .topOne {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;

                        font-weight: 600;
                    }

                    span {
                        font-size: .28rem;
                        overflow: hidden;
                    }

                    div {
                        display: flex;
                        justify-content: flex-end;
                    }
                }

                .boxItemContain {
                    position: relative;

                    .boxItemContainButtom {
                        width: 100%;
                        height: 36px;
                        position: relative;
                        top: 0;
                        left: 0;


                        .boxBottom {
                            color: skyblue;
                            // width: 100%;
                            // height: 1rem;
                            position: absolute;
                            bottom: 20px;
                            left: 50%;
                            transform: translate(-50%, 0);
                        }
                    }

                }
            }
        }

    }
}
</style>