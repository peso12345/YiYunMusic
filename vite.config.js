/*
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-15 18:26:11
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-11-24 17:12:22
 * @FilePath: \yiyunMusic\music\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 静态资源基础路径 base: './' || '',
  //  base: process.env.NODE_ENV === 'production' ? "'"+import.meta.env.VITE_BASE_URL+"'" : '/',
  base: process.env.NODE_ENV === 'production' ? '/002/serve/' : '/',
  build: {
    // 只是 bundle 文件中相应的注释将不被保留。
    sourcemap: false,
  }
})
