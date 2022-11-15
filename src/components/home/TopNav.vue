<!--
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-16 15:34:44
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-10-27 15:57:24
 * @FilePath: \yiyunMusic\music\src\components\home\TopNav.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="topNav">
        <div class="topleft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao"></use>
            </svg>
        </div>
        <div class="topContent">
            <span @click="router.push('/infoUser')">我的</span>
            <span class="active">发现</span>
            <span>云村</span>
            <span @click="router.push('/video')">视频</span>
        </div>
        <div class="topright">
            <svg class="icon" aria-hidden="true" @click="router.push('/search')">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
    </div>
    <!-- <van-button type="primary" >你好</van-button> -->

</template>
<script setup>
import { useRouter } from 'vue-router';

let router = useRouter()
</script>
<style lang="less" scoped>
.topNav {
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .topContent {
        width: 65%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        // align-items: center;
        font-size: .36rem;

        span {
            overflow: hidden;
        }

        .active {
            font-weight: 900;
        }
    }
}
</style>


