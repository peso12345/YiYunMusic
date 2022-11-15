<template>
    <div class="itemMusicList">
        <div class="itemListTop">
            <div class="listLeft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gl-playCircle"></use>
                </svg>
                <span>播放全部<span>(共{{ msg.length }}首)</span></span>
            </div>
            <div class="listRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao1"></use>
                </svg>
                <span>收藏({{ playcount(count) }})</span>
            </div>
        </div>
        <!--  <div class="itemList">
            <div class="item" v-for="(item,i) in msg" :key="i">
                <div class="itemLeft" @click="playMusic(i)">
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
        <PlayerList :msg="msg"></PlayerList>
    </div>
</template>
<script setup>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
// import { usePlayListStore } from '../../stores/playlist';
import PlayerList from './PlayerList.vue';
let props = defineProps(['itemList', 'subscribedCount'])
onMounted(() => {
    // console.log(props.itemList);
})
// 歌曲信息
let msg = computed(() => {
    // console.log(props.itemList.length);
    return props.itemList
})
// 收藏量
let count = computed(() => {
    return props.subscribedCount
})

let playcount = (count) => {
    if (count >= 100000000) {
        return count = (count / 100000000).toFixed(1) + '亿'
    } else if (count >= 10000) {
        return count = (count / 10000).toFixed(1) + '万'
    } else {
        return count
    }
}
// let state = usePlayListStore()
// let playMusic = (i) => {
//     console.log(state);
//     // console.log(msg.value);

//     state.updataPlayList(msg.value);
//     // console.log(state.playlist);
//     state.updataPlayListIndex(i);
// }
</script>
<style lang="less" scoped>
.itemMusicList {
    display: flex;
    flex-direction: column;

    @iconWidth: .6rem;
    @iconWidth-2: .3rem;
    @color: white;
    @colorlistRight: rgb(136, 139, 141);



    margin-top: .2rem;
    border: 1px solid transparent;
    border-top-left-radius: .4rem;
    border-top-right-radius: .4rem;
    background: @color;



    .icon {
        width: @iconWidth;
        height: @iconWidth;
        fill: rgb(77, 77, 77);
        overflow: hidden;
    }

    .itemListTop {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin: .2rem .2rem;

        .listLeft {
            display: flex;
            justify-content: center;
            align-items: center;

            .icon {}

            span {
                padding-left: .2rem;
                color: black;
                font-size: large;
                font-weight: 600;

                span {
                    color: @colorlistRight;
                    font-size: small;
                    font-weight: 600;
                }
            }
        }


        .listRight {
            height: .8rem;
            display: flex;
            justify-content: center;
            align-items: center;

            background: rgb(255, 23, 0);
            border: 1px solid transparent;
            border-radius: .4rem;

            .icon {
                margin: 5px;
                width: @iconWidth-2;
                height: @iconWidth-2;
                fill: @color;
            }

            span {
                color: @color;
                font-size: .3rem;
                padding: 5px;
                padding-left: 0;
            }
        }
    }

    .itemList {
        padding: 0 .2rem 1.4rem;

        .icon {
            padding: .04rem;
            margin: .1rem;
        }


        .item {
            display: flex;
            justify-content: space-between;
            padding-top: .2rem;

            &:first-child {
                padding-top: 0;
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
    }
}
</style>