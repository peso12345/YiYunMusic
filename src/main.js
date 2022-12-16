/*
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-15 18:26:11
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-12-16 16:30:41
 * @FilePath: \yiyunMusic\music\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

import App from './App.vue'

import './assets/main.css'
// import 'video.js/dist/video-js.css' //videojs样式
// import 'vant/es/toast/style';
import { Toast } from 'vant';

// import navTop from './components/home/navTop.vue';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast)

app.mount('#app')
