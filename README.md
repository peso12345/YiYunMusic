<!--
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-11-15 21:46:36
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-12-17 16:42:18
 * @FilePath: \gitclone\README.md
 * @Description: 音乐
-->
# music

这个web项目是一个基于开源音乐api开发的手机端h5音乐平台。
使用vue3+vant+pinia

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
```
TODO;
    等待反馈，修改线上bug;
    待添加组件缓存，添加过度动画;
    可添加一个透明层，覆盖在旋转动画上，因为v-show切换后会让动画重新渲染;(MusicDetail.vue)
```
```
    <!--（已完成） 播放量已修改,mv容器宽高已自适应,修改video的UI显示逻辑,将mv弹出层挂载到#app节点 -->
    <!--（已完成） 添加侧边导航 -->
    <!--（未完成） [需官方修复]修复歌单评论总数与可获取评论数不符的问题 -->
    <!--（已完成） 优化视频模块的显示逻辑 -->
    <!--（已完成） 为喜爱模块添加分页加载,提高加载速度;优化播放模块的数据添加方式 -->
    <!--（已完成） 视频模块线上无法进入，视频模块请求顺序错乱 -->
    <!--（已完成） 热门歌单页面无数据，已修复，为回调增加延迟；视频模块空白，已修复。 -->
    <!--（已完成） **UI美化**;修复pc端界面比例失调的问题;升级vant组件库到4.0.3; -->
    <!--（已完成） 修复已知问题，添加进度条事件，显示播放时间 -->
```

