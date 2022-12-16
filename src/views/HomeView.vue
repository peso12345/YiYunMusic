<!--
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-15 18:26:11
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-12-12 02:33:46
 * @FilePath: \yiyunMusic\music\src\views\HomeView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import TopNav from '../components/home/TopNav.vue'
import SwiperTop from '../components/home/SwiperTop.vue'
import IconList from '../components/home/IconList.vue';
import MusicList from '../components/home/MusicList.vue';
import CatlistSongs from './CatlistSongs.vue';

let catOptions = {
  showTop: false, // 显示顶部导航栏
  showListNumber: 4,// 显示几个列表
  finishedText: '更多请点击歌单！',
}

</script>

<template>
  <main>
    <!-- 导航组件 -->
    <TopNav />
    <!-- 轮播组件 -->
    <SwiperTop />
    <!-- 图标组件 -->
    <IconList />
    <!-- 发现好歌单 -->
    <KeepAlive>
      <MusicList isFrom="isHome" />
    </KeepAlive>
    <!-- 其他歌单 -->
    <CatlistSongs :catOptions="catOptions"></CatlistSongs>
  </main>
</template>
