<!--
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-11-04 01:45:12
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-11-22 21:54:05
 * @FilePath: \yiyunMusic\music\src\views\PersonalFm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="songsTop">
    <svg class="icon" aria-hidden="true" @click="$router.push('/')">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <h1>喜爱的歌曲{{ songsNumber }}首</h1>
  </div>
  <van-empty description="加载中......" v-if="showList" />

  <PlayerList :msg="ListSongs" v-else></PlayerList>
</template>
<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import PlayerList from '../components/item/PlayerList.vue';
import { getLoveList, getLoveListAndThen } from '../request/api/home';
import { useRouter } from 'vue-router'

// 改造yinghua.js，并导入
import { startSakura, stopp } from '../js/yinghua.js';
onBeforeMount(() => {
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
let songsNumber = ref(0)
let showList = ref(true)
let router = useRouter()
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
    let res = await getLoveListAndThen(data.ids.toString())
    console.log(res);
    ListSongs.value = res.data.songs
    showList.value = false
  } else {
    router.push('/login')
  }

}
getLoves()
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
}
</style>