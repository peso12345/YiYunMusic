<template>
    <div class="loginBox">
        <svg class="icon" aria-hidden="true" @click="router.push({name:'home'})">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="login">
            <h2>登录</h2>
            <br>
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="phone" name="isPhones" label="用户名" type="tel" placeholder="手机号码"
                        :rules="[{ validator: isPhones, required: true, message: '请填写手机号' }]" />
                    <van-field v-model="password" type="password" name="isCheck" label="密码" placeholder="密码"
                        :rules="[{ isCheck, required: true, message: '请填写验证码' }]">
                        <!-- <template #button>
                            <van-button class="buttonText" size="mini" type="primary" @click="getmark" :disabled="disShowBtn">{{buttonText()}}</van-button>
                        </template> -->
                    </van-field>
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>
            <!-- <div>{{ times + 's' }}</div> -->
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import router from '../router';
import { usePlayListStore } from '../stores/playlist';
import { getLoginUser, sendLoginMark, sendLoginMarkUser } from '../request/api/home'

let phone = ref('')
let password = ref('')
let state = usePlayListStore()
let times = ref(0)
let disShowBtn = ref(false)


const pattern = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
const isPhones = (val) => {
    if (!pattern.test(val)) {
        return `${val} 不合法，请重新输入`
    }
}
const isCheck = (val) => {
    console.log(val);
}
// 登录
const onSubmit = async (values) => {
    // console.log('submit', values);
    // 手机号正则校验 /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    let res = await state.getLogin({ phone: phone.value, password: password.value })
    console.log(res);
    if (res.data.code === 200) {
        // document.cookie = res.data.cookie
        // 登陆成功，跳转到个人中心页面
        state.updataIsLogin(true)
        state.updataToken(res.data.token)
        // 存储cookie
        state.updataCookie(res.data.cookie)
        let result = await getLoginUser(res.data.account.id)
        state.updataAccountId(res.data.account.id)
        // console.log(result);
        state.updataUser(result)
        router.push('/infoUser')
    } else {
        alert('账号密码错误，请重试！')
        password.value = ''
    }
};
/* // 发送手机验证码
const getmark = async () => {
    let res = await sendLoginMark(phone.value)
    let time;
    console.log(res);
    if (res.data.code == 200 && res.data.data == true) {
        console.log('开始倒计时60s');
        times.value = 60
        disShowBtn.value = true
        time = setInterval(() => {
            times.value--;
            if (times.value <= 0) {
                clearInterval(time)
                disShowBtn.value = false
            }
        }, 1000)
    }
    if (res.data.code == 400) {
    }
} */

/* const buttonText = ()=>{
    if(times.value == 0){
        return '获取验证码'

    }else {
        return times.value
    }
} */

// let login = async () => {
//     // console.log({phone: phone.value, password: password.value});
//     let res = await state.getLogin({ phone: phone.value, password: password.value })
//     // console.log(res);
//     if (res.data.code === 200) {
//         // 登陆成功，跳转到个人中心页面
//         state.updataIsLogin(true)
//         state.updataToken(res.data.token)
//         let result = await getLoginUser(res.data.account.id)
//         state.updataAccountId(res.data.account.id)
//         // console.log(result);
//         state.updataUser(result)
//         router.push('/infoUser')
//     } else {
//         alert('账号密码错误，请重试！')
//         password.value = ''
//     }
// }



</script>

<style lang="less" scoped>
.icon {
    fill: #ccc;
    width: .6rem;
    height: .6rem;
    margin: .1rem;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
}

.buttonText {

    width: 1.5rem;


}

.loginBox {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url(https://bpic.51yuansu.com/backgd/cover/00/42/76/5bef5385cfe0d.jpg?x-oss-process=image/resize,w_780/sharpen,100);
    background-repeat: no-repeat;
    background-size: 120%;
    background-position: -0.8rem -40px;

    .login {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>