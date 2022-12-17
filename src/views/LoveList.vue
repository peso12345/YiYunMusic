<!--
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-11-04 01:45:12
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-12-18 02:47:46
 * @FilePath: \yiyunMusic\music\src\views\PersonalFm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <!-- <van-nav-bar class="sizeBar" :title="('喜爱的歌曲' + songsNumber + '首')" left-text="返回" left-arrow
      @click-left="onClickLeft" /> -->
    <navTop :title="('喜爱的歌曲' + songsNumber + '首')"></navTop>

    <!-- <div class="songsTop">
      <svg class="icon" aria-hidden="true" @click="$router.push('/')">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <h1>喜爱的歌曲<span class="Subtitle">({{ songsNumber }})</span></h1>
    </div> -->
    <!-- <KeepAlive> -->
    <van-empty description="加载中......" v-if="showList" />
    <PlayerList class="list" :msg="ListSongs" v-else></PlayerList>
    <!-- </KeepAlive> -->
    <van-pagination class="pages" v-model="currentPage" :total-items="songsNumber" :items-per-page="25"
      :show-page-size="getPage()" @change="onChange" v-show="!showList" force-ellipses />
  </div>
</template>
<script setup>
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import PlayerList from '../components/item/PlayerList.vue';
import { getLoveList, getLoveListAndThen } from '../request/api/home';
import { useRouter } from 'vue-router'

// 改造yinghua.js，并导入
import { startSakura, stopp } from '../js/yinghua.js';

// 获取浏览器窗口的视口宽度和高度，并在窗口大小变化时自动更新。
import { useWindowSize } from '@vant/use';
const { width, height } = useWindowSize();

onMounted(() => {
  // 每次进入此组件前执行函数
  // yinghua()
  startSakura()
})
onBeforeUnmount(() => {
  // 退出组件前，删除canvas_sakura元素
  // let aa = document.getElementById('canvas_sakura')
  // aa.remove()
  stopp()
})

let ListSongs = ref([])
let songsNumber = ref(0) // 歌曲数
let showList = ref(true)
let router = useRouter()
let allData = ref([]) // 所有喜爱歌曲的id
// let currentData = ref([]) // 当前页面的歌曲id
let currentPage = ref(1)

const getPage = () => {
  let num = 1;
  // console.log(width);
  console.log(width.value);
  width.value < 280 ? num = 1 : width.value < 320 ? num = 3 : num = 5

  return num
}

const onClickLeft = () => history.back();

const currentData = (num = 25) => { // 一页显示歌曲的数量
  return allData.value.slice(num * (currentPage.value - 1), num * currentPage.value)
}

/**
 * 描述
 * @date 2022-12-12
 * @text 获取喜欢音乐列表
 * @returns {any}
 */
const getLoves = async () => {
  // 获取喜欢的音乐列表
  let id = JSON.parse(localStorage.getItem('id'))
  console.log(id);
  let cookie = localStorage.getItem('cookie')
  // 判断是否存在id和cookie
  if (id && cookie) {
    // 获取喜爱音乐的ids
    let { data } = await getLoveList(id, cookie)
    console.log(data);
    songsNumber.value = data.ids.length
    console.log(songsNumber.value);
    // 获取歌曲详情
    // let ids;
    // console.log(data.ids.toString());
    allData.value = data.ids
    console.log(allData.value);
    // currentData.value = allData.value.splice(0, 25)
    let dataID = currentData()
    // console.log('yyyyyy:', dataID);
    // console.log('yyyyyy:', allData.value);
    let res = await getLoveListAndThen(dataID.toString())
    console.log(res);
    ListSongs.value = res.data.songs
    showList.value = false
  } else {
    router.push('/login')
  }

}
getLoves()

const onChange = async () => {

  // console.log(currentPage.value);
  // console.log(currentData());
  // 获取当前要展示的所有歌曲id
  let dataID = currentData()
  // console.log('yyyyyy:', dataID);
  // console.log('yyyyyy:', allData.value);
  // 获取当前所有歌曲的信息
  let res = await getLoveListAndThen(dataID.toString())
  // console.log(res);
  // 赋值给歌曲列表
  ListSongs.value = res.data.songs
  // 显示列表
  showList.value = false

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>
<style lang="less" scoped>
.icon {
  fill: #ccc;
  width: .6rem;
  height: .6rem;
  margin: .1rem;
  z-index: 1;
  // position: absolute;
  // top: 0;
  // left: 0;
}



.songsTop {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  h1 {
    padding: 0 0.8rem 0.2rem;
    font-size: 0.55rem;
  }

  .Subtitle {
    font-size: .3rem;
    color: #ccc;
  }
}

.list {
  position: relative;
  // padding-bottom: 320px;
}

.pages {
  width: 100%;
  // position: absolute;
  // bottom: 72px;
  left: 0;
  padding-bottom: 1.4rem;

}
</style>