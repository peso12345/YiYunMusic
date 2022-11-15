/*
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-16 11:49:43
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-10-16 12:12:14
 * @FilePath: \yiyunMusic\music\public\js\rem.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function remSize() {
    // 获取设备宽度
    let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    if (deviceWidth >= 750) {
        deviceWidth = 750;
    }
    if (deviceWidth <= 320) {
        deviceWidth = 320;
    }
    // 750px-->1rem = 100px,375px-->1rem = 50px
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
    // 设计字体大小
    document.querySelector('body').style.fontSize = 0.3 + 'rem'
}
remSize();
// 当窗口发生变化时调用
window.onresize = function () {
    remSize();
} 