<template>
    <div>
        <!-- 播放器组件 -->
        <!--    <video :id="`my-video-${props.id}`" class="video-js vjs-theme-city vjs-big-play-cent-center" :controls="true"
            :autoplay="false" :preload="info.preload" :language="info.language" :width="info.width"
            :height="info.height" :poster="info.poster" :playbackRates="info.playbackRates"
            :notSupportedMessage="info.notSupportedMessage" :controlBar="info.controlBar" data-setup='{}'>
            <source :src="info.sources[0].src" :type="info.sources[0].type">
            <p class="vjs-no-js">
                查看这个视频请启用JavaScript,和考虑升级您的网页浏览器
                <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
            </p>
        </video> -->
        <!-- videojs-mobile-ui  -->
        <!-- <video :id="`my-video-${props.id}`" class="video-js vjs-theme-city videojs-mobile-ui vjs-big-play-centered"> -->
        <video :ref="`videoRef${props.id}`" :id="`my-video-${props.id}`"
            :style="{ height: '100vw/16*9', width: '100vw' }" class="video-js vjs-default-skin vjs-big-play-centered"
            playsinline="true" webkit-playsinline="true">
            <!-- <source :src="info.sources[0].src" :type="info.sources[0].type"> -->
            <p class="vjs-no-js">
                查看这个视频请启用JavaScript,和考虑升级您的网页浏览器
                <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
            </p>
        </video>
    </div>
</template>
<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
//info[props.id].controls
//info[props.id].autoplay
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// City
// import '@videojs/themes/dist/city/index.css';
import { Toast } from 'vant';


// Forest
// import '@videojs/themes/dist/forest/index.css';

// Sea
// import '@videojs/themes/dist/sea/index.css';

// vjs-default-skin vjs-sublime-skin
// import "videojs-sublime-skin/dist/videojs-sublime-skin.min.css"

// 全屏
// import 'videojs-landscape-fullscreen'

// mobile-ui插件
// import 'videojs-mobile-ui';
// import 'videojs-mobile-ui/dist/videojs-mobile-ui.css';


let player = ref('')
// console.log(player.value);

let props = defineProps(['options', 'id'])
let emits = defineEmits(['play'])
// console.log(props);
// console.log(props.options[0]);
// console.log(props.options[0].sources[0]);
// console.log(props.options[0].sources[0].src);



// console.log(info.value);
let myDoubleClickHandler = (event) => {
    // `this` is the player in this context
    // console.log('db:', event);
    player.value.pause();
}
let userActions = {
    doubleClick: myDoubleClickHandler, //控制双击玩家/技术的操作方式
    hotkeys: function (event) {
        // `this` is the player in this context

        // `x` key = pause
        if (event.which === 88) {
            player.value.pause();
        }
        // `y` key = play
        if (event.which === 89) {
            player.value.play();
        }
    }
}

let info = computed(() => {
    console.log('computed:', props.options);
    console.log('computed:', props.id);
    console.log(userActions);
    // console.log('computed:',props.options[0].sources[0].src);
    if (props.options) {
        props.options['userActions'] = userActions
    }
    return props.options
})
// console.log(info.value);

onMounted(() => {
    player.value = videojs(`my-video-${props.id}`, info.value, function onPlayerReady() {
        videojs.log('播放器已经准备好了!');
        // 隐藏控制条
        player.value.controlBar.hide()

        // In this context, `this` is the player that was created by Video.js.<br>  // 注意，这个地方的上下文， `this` 指向的是Video.js的实例对像player
        // player.value.play();
        // emits('play', '播放器已经准备好了!')
        player.value.volume(0.5); //音量调整为0.3
        // player.value.requestFullscreen();
        this.on("play", function () {
            // 显示控制条
            player.value.controlBar.show()
            console.log("视频开始播放！")
        });
        player.value.on('pause', function () {
            // 隐藏控制条
            // console.log(player.value);
            // player.value.controlBar.hide()
            // player.value.bigPlayButton.show()
            videojs.log('播放已暂停!');
        })
        player.value.on("stalled", function () {
            Toast("网速异常！请稍后...");
        })

        // How about an event listener?<br>  // 如何使用事件监听？
        player.value.on('ended', function () {
            videojs.log('播放结束了!');
        });
    });

    // console.log(player.value);
    // plugins 全屏插件
    // player.value.landscapeFullscreen({
    //     fullscreen: {
    //         enterOnRotate: true, //在横向旋转设备时进入全屏模式
    //         exitOnRotate: true, //在纵向旋转设备时退出全屏模式
    //         alwaysInLandscapeMode: true, //总是进入全屏横向模式，即使当设备在纵向模式
    //         iOS: true //是否在iOS上使用假全屏(用于显示玩家控件而不是系统控件)
    //     }
    // })

    // mobile-ui插件
    // player.value.mobileUi({
    //     fullscreen: {
    //         enterOnRotate: true,
    //         exitOnRotate: true,
    //         lockOnRotate: true
    //     },
    //     touchControls: {
    //         seekSeconds: 10,
    //         tapTimeout: 300,
    //         disableOnEnd: false
    //     }
    // });
})


onBeforeUnmount(() => {
    if (player.value) {
        player.value.dispose()
        console.log('视频占用内存已释放！');
    }
})



</script>
<style lang="less" scoped>
div {
    z-index: 3000;
    // display: block;
    height: 100%;
    width: 100%;
    // box-sizing: border-box;
    // border-radius: 20px;
    // overflow: hidden;
    // border: 1px solid #ccc;
    // transform: rotate(0.25turn); // 旋转90度
    // padding: .1rem;

    // margin: 0 auto;
    // text-align: center;
    position: relative;

    :deep(.video-js .vjs-control-bar) {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
    }

    :deep(.video-js .vjs-icon-placeholder::before) {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    :deep(.video-js .vjs-progress-control:hover .vjs-play-progress::before) {
        display: block;
    }

    :deep(.video-js .vjs-play-progress::before) {
        display: none;
    }

    :deep(.video-js .vjs-volume-level::before) {
        // display: flex;
        // justify-content: center;
        // align-items: center;
        left: -0.45em;
    }

    // :deep(.video-js.vjs-paused .vjs-big-play-button) {
    //     /* 视频暂停时显示播放按钮 */
    //     display: block;
    // }

    .video-js {
        font-size: 10px;
    }
}
</style>