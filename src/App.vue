<!--
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-15 18:26:11
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-12-04 03:02:30
 * @FilePath: \yiyunMusic\music\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import FooterMusic from './components/item/FooterMusic.vue';
import { usePlayListStore } from './stores/playlist';
// import HelloWorld from './components/HelloWorld.vue'

let state = usePlayListStore()
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      <!-- <HelloWorld msg="You did it!" /> -->

      <nav>
        <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->
      </nav>
    </div>
  </header>

  <RouterView />
  <!-- <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in">
        <KeepAlive>
          <Suspense>

            <component :is="Component"></component>

            <template #fallback>
              正在加载...
            </template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </template>
  </RouterView> -->
  <FooterMusic v-show="state.isFooterMusic" />

</template>

<style lang="less">
.icon {
  width: 0.5rem;
  height: 0.5rem;
}
</style>
