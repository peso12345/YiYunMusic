/*
 * @Author: peso12345 157223121@qq.com
 * @Date: 2022-10-15 18:26:11
 * @LastEditors: peso12345 157223121@qq.com
 * @LastEditTime: 2022-12-12 22:18:28
 * @FilePath: \yiyunMusic\music\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from 'vue-router'
import { usePlayListStore } from '../stores/playlist'
import HomeView from '../views/HomeView.vue'

let state; // 获取pinia实例

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // redirect:'/home'
      name: 'home',
      component: HomeView
    },
    // {
    //   path: '/home',
    //   name: 'Home',
    //   component: HomeView
    // },
    {
      path: '/todolist',
      name: 'todolist',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TodoList.vue')
    },
    {
      path: '/itemMusic',
      name: 'ItemMusic',
      component: () => import('../views/ItemMusicView.vue')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('../views/Search.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/infoUser',
      name: 'InfoUser',
      component: () => import('../views/InfoUser.vue'),
      beforeEnter: (to, from, next) => {
        state = usePlayListStore()
        if (state.isLogin || state.token || localStorage.getItem('token')) {
          next();
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/video',
      name: 'Video',
      component: () => import('../views/VideoView.vue')
    },
    {
      path: '/everydaysongs',
      name: 'EveryDaySongs',
      component: () => import('../views/EveryDaySongs.vue')
    },
    {
      path: '/lovelist',
      name: 'LoveList',
      component: () => import('../views/LoveList.vue')
    },
    {
      path: '/catlistsongs',
      name: 'CatlistSongs',
      component: () => import('../views/CatlistSongs.vue')
    },
    {
      path: '/ranklist',
      name: 'RankList',
      component: () => import('../views/RankList.vue')
    },
  ]
})

router.beforeEach((to, from) => {
  state = usePlayListStore()
  // console.log(to.path);
  if (to.path == '/login' || to.path == '/infoUser' || to.path == '/video'|| to.path == '/todolist') {
    state.isFooterMusic = false;
  } else {
    state.isFooterMusic = true;
  }
})

export default router
