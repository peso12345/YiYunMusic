<!--
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-11-04 13:56:53
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-11-20 14:20:59
 * @FilePath: \yiyunMusic\music\src\views\CatlistSongs.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="$router.push('/')" v-if="otherOptions.showTop" />
    <div class="listBox">
        <van-list v-model:loading="loading" :finished="finished" :finished-text="otherOptions.finishedText" @load="onLoad">
            <div class="listBoxItem" v-for="(item, i) in options" :key="item">
                <MusicList :options="options[i]" :isFrom="isCatList"></MusicList>
            </div>
        </van-list>
    </div>
</template>
<script setup>
import { computed } from '@vue/reactivity';
import { ref, watch } from 'vue';
import MusicList from '../components/home/MusicList.vue';
import { getSongsCatlist, getSongsCatlistAll } from '../request/api/home';
import { usePlayListStore } from '../stores/playlist';

const props = defineProps(['catOptions']);

// 其他配置项
const otherOptions = ref({
    showTop: true, // 显示顶部导航栏
    showListNumber: 999,// 显示几个列表
    finishedText:'没有更多了！'
})

// console.log(props);
if (props.catOptions) {
    otherOptions.value = props.catOptions
}

let state = usePlayListStore()
let list = ref([]);
let loading = ref(false);
let finished = ref(false);

const title = ref('热门歌单分类')
const isCatList = ref('isCatList')
const options = ref([{
    title: '华语',
    playlists: [],
}])

let getAllList = async () => {
    // 获取精品歌单标签列表
    let { data } = await getSongsCatlist()

    // console.log(data);
    // data.tags.name
    // 歌单列表标题赋值
    /*   data.tags.map((res, i) => {
          // console.log(res,i);
          i == 0 ? (options.value[0].title = res.name) : (options.value.push({
              title: res.name,
          }))
          // options.value
          // console.log(options.value);
          return res
      }) */

    /*  // options.value.title = data.tags[0].name
     // 获取单个精品歌单,如：华语
     let res = await getSongsCatlistAll(data.tags[0].name)
     let res1 = await getSongsCatlistAll(data.tags[1].name)
     let res2 = await getSongsCatlistAll(data.tags[2].name)
     // console.log(data.tags[0].name, res);
     // console.log(data.tags[1].name, res1);
     // console.log(data.tags[2].name, res2);
 
     // console.log(res.data);
     // 处理数据，符合子组件的数据格式
     res.data.playlists.map(result => {
         // console.log(res);
         result['picUrl'] = result.coverImgUrl
         return result
     })
 
     // // console.log(res);
     // // 歌单列表数据赋值
     // options.value.playlists = res.data.playlists
     options.value[0].playlists = res.data.playlists
     options.value[1].playlists = res1.data.playlists
     options.value[2].playlists = res2.data.playlists
  */

    // console.log(options.value);
    // console.log(data.tags);
    // 设置缓存
    sessionStorage.setItem('hotSongList', JSON.stringify(data.tags))
    // 在pinia里更新缓存，以便computed能正确识别更新
    state.updataHotSongsList()
};


const hotSongList = computed(() => {
    // console.log(state);
    return state.hotSongsList
})
// console.log(hotSongList.value);
// 获取热门歌单列表
getAllList()

// 定义下标为0
let index = 0;

const onLoad = async () => {

    // 异步更新数据
    // 如果没有值就获取

    // if (!hotSongList.value) {
    //     console.log(hotSongList.value);

    //     getAllList()
    // }
    // console.log(hotSongList.value);

    // console.log(hotSongList.value);
    // hotSongList.value.map((res, i) => {
    //     i == 0 ? (options.value[0].title = res.name) : (options.value.push({
    //         title: res.name,
    //     }))
    //     return res
    // })
    // console.log(options.value);



    // 如果有值就请求数据
    if (hotSongList.value.length !== 0) {
        // 如果配置的显示列表数小于api获取的列表数，就剪切api获取的列表数
        if (otherOptions.value.showListNumber < hotSongList.value.length) {
            hotSongList.value.splice(otherOptions.value.showListNumber, hotSongList.value.length)
        }
        // console.log("hotSongList.value:", hotSongList.value);
        // 限制每次请求3个，但进入页面会先请求一次，所以第一次有6个歌单
        for (let i = index, max = index + 3; i < max; i++) {
            // list.value.push(list.value.length + 1);

            // console.log(index);
            // console.log(i);
            // 执行到这里hotSongList还是没有获取到值
            // console.log(hotSongList.value[index].name);
            // console.log(options.value[index].title);
            // console.log(hotSongList.value[i]);
            // console.log(hotSongList.value);
            // console.log(i);
            if (!hotSongList.value[i]) {
                // console.log(2345);
                break
            }
            let tag = hotSongList.value[i].name
            if (tag.indexOf('Soul') !== -1) {
                tag = 'Soul'
            }

            // 获取每个tags的热门歌单数据
            let res = await getSongsCatlistAll(tag)
            // 处理每个数据的格式
            res.data.playlists.map(result => {
                result['picUrl'] = result.coverImgUrl
                return result
            })
            // 赋值
            let data = {
                title: hotSongList.value[index]?.name,
                playlists: res.data.playlists
            }
            // 赋值给options变量，传到下一个页面
            if (index == 0) {
                options.value[0] = data
            } else {
                options.value.push(data)
            }
            // console.log(data);
            // console.log(res);
            // console.log(options.value);

            // options.value[i]['playlists'] = res.data.playlists
            // console.log(hotSongList.value.length - 1);

            index++

            // console.log('iiii:', i);
            // console.log('index:', index);
            // console.log('hotSongList.value.length:', hotSongList.value.length);
            // 需要展示的列表数小于等于循环的i，跳出循环
            if (hotSongList.value.length <= index) {
                // console.log('break');
                // return
                // javascript的return会跳出函数，不执行后面的语句
                // break跳出当前for循环
                break
            }
        }

        // console.log('index2222:', index);
        // console.log('hotSongList.value.length2222:', hotSongList.value.length);
        if (index >= hotSongList.value.length) {
            console.log("max:", index, '个歌单');
            // return
        }
        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (options.value.length >= hotSongList.value?.length) {
            finished.value = true;
        }
    } else {
        // 清空列表数据
        // finished.value = false;

        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        // loading.value = true;
        // 设置宏任务，让加载函数下一轮循环时再执行
        // console.log(11);
        setTimeout(() => {
            onLoad();
        }, 20);
    }
    // console.log(options.value);
    // console.log(hotSongList.value)
};
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

.listBox {
    margin-bottom: 1.4rem;

    .listBoxItem {
        padding-bottom: .4rem;
    }
}
</style>