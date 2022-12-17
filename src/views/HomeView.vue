<!--
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-15 18:26:11
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-12-17 18:53:53
 * @FilePath: \yiyunMusic\music\src\views\HomeView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { ref } from 'vue';
import TopNav from '../components/home/TopNav.vue'
import SwiperTop from '../components/home/SwiperTop.vue'
import IconList from '../components/home/IconList.vue';
import MusicList from '../components/home/MusicList.vue';
import CatlistSongs from './CatlistSongs.vue';

import { showToast } from 'vant';

let catOptions = {
  showTop: false, // 显示顶部导航栏
  showListNumber: 4,// 显示几个列表
  finishedText: '更多请点击歌单！',
}

const show = ref(true);
const isPc = (() => {
  let ua = window.navigator.userAgent,
    agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod', 'iPad'],
    isPC = true;
  for (var i = 0, len = agents.length; i < len; i++) {
    if (ua.indexOf(agents[i]) > 0) {
      // 如果找到一个手机标识, 就设置为false并跳出循环
      isPC = false;
      break;
    }
  }
  if (isPC) {
    showToast('请使用手机端体验完整功能！')
  }
})()


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
    <!-- 提醒 -->
    <!-- <van-toast v-model:show="show" style="padding: 0" position="top">
      <template #message>
        <div>请使用手机体验所有功能！</div>
      </template>
    </van-toast> -->
  </main>
</template>
