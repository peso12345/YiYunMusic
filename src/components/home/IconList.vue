<!--
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-16 17:48:23
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-11-07 16:54:13
 * @FilePath: \yiyunMusic\music\src\components\home\IconList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="iconList">
        <div class="iconItem" @click="$router.push('/everydaysongs')">
                <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tuijian"></use>
            </svg>
            <span>每日推荐</span>
        </div>
        <div class="iconItem" @click="$router.push('/lovelist')">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-aixin1"></use>
            </svg>
            <span>我的喜欢</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true" @click="$router.push('/catlistsongs')">
                <use xlink:href="#icon-gedan"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true" @click="$router.push('/ranklist')">
                <use xlink:href="#icon-paihangbang"></use>
            </svg>
            <span>排行榜</span>
        </div>
    </div>
</template>
<style lang="less" scoped>
.iconList {
    width: 100%;
    height: 2rem;
    margin-top: .2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .iconItem{
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
            width: 1rem;
            height: 1rem;
        }
    }
}
</style>