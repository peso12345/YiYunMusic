<!--
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-17 14:40:44
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-12-04 02:08:44
 * @FilePath: \yiyunMusic\music\src\views\ItemMusicView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <!-- 顶部栏 -->
        <ItemMusicTop :playlist="state.playlist" />
        <!-- 歌曲列表栏 -->
        <ItemMusicList :itemList="state.itemList" :subscribedCount="state.playlist.subscribedCount" />
    </div>
</template>
<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { getMusicItemList, getMusicItemListSong } from '../request/api/item';
import ItemMusicTop from '../components/item/ItemMusicTop.vue';
import ItemMusicList from '../components/item/ItemMusicList.vue';

const state = reactive({
    playlist: {}, // 歌单详情页数据
    itemList: [] // 歌单歌曲信息
})
// 歌单id
let id = useRoute().query.id
// console.log(id);
onMounted(async () => {
    // 获取歌单详情
    let res = await getMusicItemList(id)
    // console.log(res.data.playlist);
    state.playlist = res.data.playlist;
    // console.log(state.playlist);
    // 防止页面刷新，数据丢失，保存到sessionStotage中.setItem('itemDetail')
    sessionStorage.setItem('itemDetail', JSON.stringify(state))

    // 获取歌单歌曲
    let res2 = await getMusicItemListSong(id)
    // console.log(res2);
    state.itemList = res2.data.songs;
    // console.log(state.itemList);
})
</script>