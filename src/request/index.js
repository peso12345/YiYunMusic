/*
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-16 17:32:45
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-11-05 13:53:05
 * @FilePath: \yiyunMusic\music\src\request\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEa
 */
import axios from 'axios';
let service = axios.create({
  baseURL: 'http://43.138.175.144:3005/',
  timeout: 5000,
  withCredentials:true,
});
export default service;