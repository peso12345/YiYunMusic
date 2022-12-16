<!--
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-23 16:45:59
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-12-16 15:19:40
 * @FilePath: \yiyunMusic\music\src\views\InfoUser.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <!-- <div>个人中心</div> -->
    <div class="box">
        <svg class="icon" aria-hidden="true" @click="router.push('/')">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <img class="bgImg" :src="user.data?.profile?.backgroundUrl" alt="">
        <div class="infoUserTop">
            <div class="imgTop"><img :src="user.data?.profile?.avatarUrl" alt="" class="profileimg">
                <div class="name">{{ user.data?.profile?.nickname }}</div>
            </div>
            <div class="boxSpan">
                <span class="level">
                    <div>当前等级:</div><em> LV.{{ user.data?.level }}</em>
                </span>
                <span>
                    <div>创建天数:</div><em>{{ user.data?.createDays }}</em>
                </span>
                <span>
                    <div>听歌数量:</div><em>{{ user.data?.listenSongs }}</em>
                </span>
                <span>
                    <div>省份:</div><em class="province">{{ province() }}</em>
                </span>
                <span>
                    <div>城市:</div><em class="province">{{ city() }}</em>
                </span>
                <span>
                    <div>关注:</div><em>{{ user.data?.profile?.playlistCount }}</em>
                </span>
            </div>
            <div class="infoUserFooter">
                <button @click="quit">退出登录</button>
                <button @click="back">返回</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePlayListStore } from '../stores/playlist';
import citycode from '../js/citycode';
import allcitycode from '../js/allcitycode';
import { getLoginUser, getLoginRefresh } from '../request/api/home';

let router = useRouter()

let state = usePlayListStore()
// let { getdataUser } = storeToRefs(state) // storeToRefs不能用来解构函数

// TODO: 确认登录状态，过期重新登录
// let refresh = async() =>{
//    let res = await getLoginRefresh()
//    console.log(res);
// }
// refresh()


state.updatagetdataUser(); // 每次新开页面更新用户信息
// console.log('qqq1:', user);
// console.log('qqq2:', state.user);
let user = state.user
console.log(user);
// console.log(user.data.profile?.nickname);
// console.log(user.data?.profile?.nickname);

if (user.data?.profile == undefined || user.data?.profile == null || !state.getCookie()) { //如果profile不存在，返回登录页面
    // console.log(1111);
    router.push('/login')
    // console.log(2222);
}

let quit = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('cookie')
    sessionStorage.removeItem('userinfo')
    localStorage.removeItem('id')

    router.push('/login')
}
let back = () => {
    router.push('/')
}
// console.log(citycode.cityCode);
let province = () => {
    // console.log(11);
    if (user.data?.profile?.province) {
        //    citycode.cityCode.forEach((item,i)=>{
        //     console.log(item);
        //    })
        // ==user.data.profile.province
        let index = citycode.cityCode.map(x => x.adcode).indexOf(user.data.profile.province)
        return citycode.cityCode[index].name
    } else {
        return '(:'
    }
}
let city = () => {
    // console.log(111);
    // console.log(allcitycode.allcitycode);
    if (user.data?.profile?.province) {
        if (user.data.profile.city in allcitycode.allcitycode) {
            return allcitycode.allcitycode[user.data.profile.city]
        } else {
            console.log('无法获取城市信息或为空！');
            return ':)'
        }
    }

}

</script>
<style lang="less" scoped>
.icon {
    fill: #ffffff;
    width: .6rem;
    height: .6rem;
    margin: .1rem;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
}

.bgImg {
    width: 100%;
    height: 60vh;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
}

.box {
    position: relative;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    width: 100%;
    height: 100vh;
    // overflow: auto;

    .infoUserTop {
        width: 100%;
        height: 100%; // 
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .imgTop {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            margin-top: 1.5rem;

            .profileimg {
                display: block;
                width: 1.5rem;
                height: 1.5rem;
                border-radius: 50%;
            }

            .name {
                margin-top: .3rem;
                font-weight: 700;
                font-size: .4rem;
            }

        }




        .boxSpan {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: center;

            span {
                // padding-bottom: .6rem;
                width: 2rem;
                height: 2rem;

                margin: .2rem;
                padding: .15rem;
                font-size: .2rem;
                color: #836464;

                position: relative;
                overflow: hidden;

                border-radius: 8px;
                background: linear-gradient(145deg, #d4d4d4, #fbfbfb);
                box-shadow: 5px 5px 14px #7f7f7f,
                    -5px -5px 14px #ffffff;


                em {
                    color: black;
                    position: absolute;
                    display: block;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: .45rem;
                    font-weight: 500;
                }

                .province {
                    line-height: .5rem;
                    // font-size: .3rem;
                }

                .level {
                    span {
                        // padding: 0;
                        // border-radius: 0;
                        // background: none;
                        // box-shadow: none;
                        font-size: .4rem;
                        font-weight: 900;
                    }

                }
            }


        }
    }

    .infoUserFooter {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        position: relative;
        bottom: 0;
        left: 0;
        padding: 0px;

        button {
            width: 50%;
            height: 1rem;
        }

    }
}
</style>