/*
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-15 18:26:11
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-12-11 19:34:47
 * @FilePath: \yiyunMusic\music\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

import viteCompression from 'vite-plugin-compression'
import removeConsole from 'vite-plugin-remove-console'; // 清除console


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    removeConsole(), // 清除console
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 静态资源基础路径 base: './' || '',
  //  base: process.env.NODE_ENV === 'production' ? "'"+import.meta.env.VITE_BASE_URL+"'" : '/',
  base: process.env.NODE_ENV === 'production' ? '/002/yiyunmusic/' : '/',
  build: {
    // 构建后是否生成 source map 文件,只是 bundle 文件中相应的注释将不被保留。
    sourcemap: false,
    // sourcemap: true,
    // minify:'terser',
    // terserOptions: {
    //   compress: {
    //     drop_console: true,
    //     drop_debugger: true,
    //   }
    // },
    rollupOptions: {
      output: { //静态资源分类打包
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) { //静态资源分拆打包
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      }
    }
  }
})
