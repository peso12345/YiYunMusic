<template>
    <div class="itemList">
        <div class="item" v-for="(item, i) in props.msg" :key="i">
            <div class="itemLeft" @click="playMusic(i, item)">
                <span class="leftSpan">{{ i + 1 }}</span>
                <div>
                    <p>{{ item.name }}</p>
                    <div class="rightSpan">
                        <span v-for="(item1, i) in item.ar" :key="i">{{ item1.name }}</span>
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
    </div>
</template>
<script setup>
// import 'vant/es/toast/style';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
import { usePlayListStore } from '../../stores/playlist';
import { getMusicOk } from '../../request/api/home';


let state = usePlayListStore()
let props = defineProps(['msg', 'isFromEveryDaySongs'])
// let emit = defineEmits(['updataIndex'])
let router = useRouter()

let playMusic = async (i, item = 0) => { // item原为push进歌曲列表所用，现未启用
    // console.log(state);
    // console.log(props.msg);
    // console.log(emit);
    // if(router)
    // console.log(props.isEveryDaySongs);
    // if (props.isFromEveryDaySongs) {
    //     emit('updataIndex', item)
    // }
    // 判断歌曲权限
    let res = await getMusicOk(item.id)
    console.log(res.data);
    console.log("object:", item);
    // fee：8和0可以播放，noCopyrightRcmd=null
    if (res.data.success) {
        // if ((!item.noCopyrightRcmd) && (item.fee === 8 || item.fee === 0)) {
        if (item.fee == 1 || item.fee == 4) {
            Toast('此为vip歌曲，请先开通vip或购买该专辑！')
        } else {
            // 更新播放列表
            state.updataPlayList(props.msg);
            // console.log(state.playlist);
            state.updataPlayListIndex(i);
        }
    } else {
        Toast(`${res.data.message}`);
    }


}
// let updataIndex = (item) => {
//     // 添加进播放列表
//     storeState.pushPlayList(item)
//     storeState.updataPlayListIndex(storeState.playlist.length - 1)
//     console.log([newSongsBoxRef.value]);
//     newSongsBoxRef.value.style.backgroundImage = `url(${item.al.picUrl}?param=375y1200)`
// }

</script>
<style lang="less" scoped>
@colorlistRight: rgb(136, 139, 141);

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
</style>