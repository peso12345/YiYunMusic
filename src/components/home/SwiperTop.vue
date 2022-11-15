<!--
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-16 16:17:46
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-11-10 16:19:51
 * @FilePath: \yiyunMusic\music\src\components\home\SwiperTop.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE>
-->
<template>
    <div id="swiperTop">
        <van-swipe :autoplay="3000" lazy-render @click="">
            <van-swipe-item v-for="image in state.images" :key="image" @click="clickTo(image)">
                <!-- <RouterLink :to="{path:'/itemMusic',query:{id:image.song.id}}"> -->
                <img :src="image.pic" />
                <!-- </RouterLink> -->
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script setup>
import axios from 'axios'
import { getBanner } from '../../request/api/home.js'
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { usePlayListStore } from '../../stores/playlist';
let _state = usePlayListStore()
let router = useRouter()
const state = reactive({
    images: [
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ]
})
onMounted(async () => {
    // axios.get('/banner?type=2')
    //     .then((res) => {
    //         console.log(res);
    //         state.images = res.data.banners
    //         console.log(state.images);
    //     })
    // console.log(!(_state.banner?.length === 0));
    // console.log(_state.banner?.length);
    _state.updataBanner()


    if (!_state.banner) {
        console.log(_state.banner);
        let { data } = await getBanner();
        console.log(data);
        state.images = data.banners
        sessionStorage.setItem('banner', JSON.stringify(data.banners))
        _state.updataBanner()
    } else {
        _state.updataBanner()
        state.images = _state.banner
        // console.log(_state.banner);
    }

})
const clickTo = (data) => {
    console.log(data);
    if (data.url) {
        window.open(data.url)

    } else if (data.song) {
        console.log('song');
        // TODO: 获取歌曲然后跳转
        // router.push({ path: '/itemMusic', query: { id: data.song.id } })
    } else {
        console.log('other');
    }
}
</script>
<style lang="less" scoped>
#swiperTop {
    // padding: 0.2rem;

    .van-swipe {
        width: 100%;
        height: 3rem;

        .van-swipe__track {
            .van-swipe-item {
                padding: 0 0.2rem;

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    border-radius: 0.2rem;
                }
            }

        }

        :deep(.van-swipe__indicator--active) {
            background-color: rgb(219, 130, 130);
        }
    }
}
</style>