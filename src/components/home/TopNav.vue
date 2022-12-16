<!--
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-16 15:34:44
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-12-16 16:41:03
 * @FilePath: \yiyunMusic\music\src\components\home\TopNav.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="topNav">
        <div class="topleft">
            <svg class="icon" aria-hidden="true" @click="showSidebar = true">
                <use xlink:href="#icon-liebiao"></use>
            </svg>
            <!-- 弹出框&侧边框 -->
            <van-popup v-model:show="showSidebar" position="left" :style="{ width: '80%', height: '100%' }">
                <van-sidebar v-model="active" @change="onChange">
                    <div :style="{ padding: '20px 12px' }" @click="router.push('/infoUser')">
                        <h3 v-if="(infoUser?.data?.code !== 200)">点击登录</h3>
                        <div class="imgtop" v-else>
                            <van-image round width="1.2rem" height="1.2rem" fit="cover" position="center"
                                :src="infoUser.data.profile.avatarUrl">
                                <template v-slot:loading>
                                    <van-loading type="spinner" size="20" />
                                </template>
                                <template v-slot:error>加载失败</template>
                            </van-image>
                            <div class="imgtop-right">
                                <div class="imgtop-right-content">
                                    <span class="name">{{ infoUser.data.profile.nickname }}</span>
                                    <span><van-tag mark plain type="success">LV.{{ infoUser.data?.level
                                    }}</van-tag></span>
                                </div>
                                <div class="imgtop-right-content">
                                    <span>今天是我们相遇的第<span class="day">{{ infoUser.data?.createDays }}</span>天</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <van-sidebar-item class="item" v-for="item in routeInfo" :title="item.title"
                        :disabled="!item.show" />
                    <div class="button">
                        <van-button plain hairline type="success" block @click="quit">退出登录</van-button>
                    </div>
                </van-sidebar>
            </van-popup>
        </div>
        <div class="topContent">
            <span @click="router.push('/infoUser')">我的</span>
            <span class="active">发现</span>
            <span @click="toYunCun">云村</span>
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
import { computed } from '@vue/reactivity';
import { showToast } from 'vant';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { usePlayListStore } from '../../stores/playlist';

let state = usePlayListStore()
let router = useRouter()
let showSidebar = ref(false)
const active = ref(0);
let routeInfo = ref([])
routeInfo.value = [
    { title: '导航', path: '/', show: false },
    { title: '推荐', path: '/everydaysongs', show: true },
    { title: '喜欢', path: '/lovelist', show: true },
    { title: '云村', path: '/', show: false },
    { title: '歌单', path: '/catlistsongs', show: true },
    { title: '排行', path: '/ranklist', show: true },
]

const onChange = (index) => {
    console.log(index)
    router.push(`${routeInfo.value[index].path}`)
};
let todolist = 0;
let timeclick = null;
let toYunCun = () => {
    showToast('云村暂未开放！')
    todolist++;
    timeclick = setTimeout(() => {
        todolist = 0;
    }, 2000);

    if (todolist >= 5) {
        router.push('/todolist')
    }
    console.log(todolist);
}
console.log(1111);

// 获取登录信息
// 没有登录，则显示未登录
state.updatagetdataUser() // 获取登录信息
let infoUser = computed(() => {
    // console.log(state.user);
    return state.user
})
console.log('34:', infoUser.value);
console.log(2222);
// 登录后显示，基本个人信息


// 退出登录
let quit = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('cookie')
    sessionStorage.removeItem('userinfo')
    localStorage.removeItem('id')
    // router.push('/login')
    // infoUser?.data?.code
    // infoUser.value = {data:{code:999}}
    state.updatagetdataUser() // 获取登录信息
}
</script>
<style lang="less" scoped>
.topNav {
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .topleft,
    .topright {
        display: flex;
    }

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

    :deep(.van-sidebar) {
        width: 100%;

    }

    .button {
        margin: 20px 12px;
        // border: 1px solid #ccc;
    }

    .item {
        &::after {
            content: ">";
            position: absolute;
            right: 12px;
            top: 18px;
            // z-index: 9000;
        }
    }

    .imgtop {
        display: flex;

        .imgtop-right {
            margin: 0 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .imgtop-right-content {
                display: flex;
                justify-content: center;

                font-size: 0.3rem;

                .name {
                    font-size: .33rem;
                    font-weight: 600;
                    padding-right: 5px;
                }

                .day {
                    color: skyblue;
                    padding: 0 3px;
                }
            }
        }

    }

}
</style>


