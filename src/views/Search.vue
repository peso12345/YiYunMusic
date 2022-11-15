<!--
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-22 20:46:22
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-11-04 11:18:33
 * @FilePath: \yiyunMusic\music\src\views\Search.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEdiv

-->
<template>
    <div class="serchTop">
        <svg class="icon" aria-hidden="true" @click="router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <input type="text" placeholder="薛之谦" v-model="searchKey" @keydown.enter="enterKey">
    </div>
    <div class="srarchHistory">
        <p>历史:</p>
        <span v-for="item in keyWorldList" :key="item" @click="searchHistory(item)">{{item}}</span>
        <svg class="icon" aria-hidden="true" @click="delHistory">
            <use xlink:href="#icon-lajixiang"></use>
        </svg>
    </div>
    <!-- <div class="itemList">
        <div class="item" v-for="(item,i) in searchList" :key="i">
            <div class="itemLeft" @click="updataIndex(item)">
                <span class="leftSpan">{{i+1}}</span>
                <div>
                    <p>{{item.name}}</p>
                    <div class="rightSpan">
                        <span v-for="(item1,i) in item.ar" :key="i">{{item1.name}}</span>
                    </div>
                </div>
            </div>
            <div class="itemRight">
                <svg class="icon" aria-hidden="true" v-if="item.mv != 0">
                    <use xlink:href="#icon-shipin"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liebiao"></use>
                </svg>
            </div>
        </div>
    </div> -->
    <PlayerList :msg="searchList"></PlayerList>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PlayerList from '../components/item/PlayerList.vue';
import { getSearchMusic } from '../request/api/home';
import { usePlayListStore } from '../stores/playlist';

let state = usePlayListStore()
let router = useRouter()

let keyWorldList = ref([])
let searchKey = ref('')
let searchList = ref([])
let enterKey = async () => {
    if (searchKey.value !== '') {
        // console.log(searchKey.value);

        keyWorldList.value.unshift(searchKey.value)
        //  去重
        keyWorldList.value = [...new Set(keyWorldList.value)]
        // 限制搜索历史条数
        if (keyWorldList.value.length > 5) {
            keyWorldList.value.splice(keyWorldList.value.length - 1)
        }
        localStorage.setItem('keyWorldList', JSON.stringify(keyWorldList.value))
        let res = await getSearchMusic(searchKey.value)
        console.log(res);
        searchList.value = res.data.result.songs
    }
    searchKey.value = ''
}
let delHistory = () => {
    localStorage.removeItem('keyWorldList')
    keyWorldList.value = []
}
let searchHistory = async (item) => {
    let res = await getSearchMusic(item)
    console.log(res);
    searchList.value = res.data.result.songs
}
let updataIndex = (item) => {
    state.pushPlayList(item)
    state.updataPlayListIndex(state.playlist.length - 1)
}
onMounted(() => {
    keyWorldList.value = JSON.parse(localStorage.getItem('keyWorldList')) ? JSON.parse(localStorage.getItem('keyWorldList')) : []
})
</script>
<style lang="less" scoped>
.serchTop {
    width: 100%;
    height: 1rem;
    padding: 0 .2rem;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    input {
        margin-left: .2rem;
        border: none;
        border-bottom: 1px solid #999;
        width: 90%;
        padding: .05rem;
    }
}

.srarchHistory {
    width: 100%;
    padding: .2rem;
    position: relative;

    p {
        // font-size: .36rem;
        font-weight: 700;
    }

    span {
        display: inline-block;
        padding: .1rem .2rem;
        background: rgba(185, 173, 173, 0.37);
        border-radius: .4rem;
        margin: .1rem .2rem;
    }

    .icon {
        width: .4rem;
        height: .4rem;
        position: absolute;
        right: .2rem;
        // top: 30%;
    }
}

/* .itemList {
    @colorlistRight: rgb(136, 139, 141);
    padding: 0 .2rem 1.4rem;

    .icon {
        padding: .04rem;
        margin: .1rem;
    }


    .item {
        display: flex;
        justify-content: space-between;
        padding-top: .6rem;

        &:first-child {
            padding-top: .4rem;
        }

        .itemLeft {
            // flex: 8%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex: 85%;

            .leftSpan {
                color: @colorlistRight;
                padding-right: .23rem;
                font-size: .35rem;
            }

            div {
                // padding: .2rem;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;

                p {
                    font-size: .36rem;
                    font-weight: 700;
                }

                .rightSpan {
                    display: flex;
                    flex-flow: row wrap;

                    span {
                        font-weight: 400;
                        color: @colorlistRight;
                        padding-right: .2rem;
                    }

                    span:last-child {
                        padding-right: 0;

                    }
                }


            }

        }

        .itemMiddle {}

        .itemRight {
            flex: 15%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
    }
} */
</style>