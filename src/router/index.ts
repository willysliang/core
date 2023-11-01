/**
 * @ Author: willy
 * @ Create Time: 2023-11-01 15:26:01
 * @ Modifier by: willy
 * @ Modifier time: 2023-11-01 16:21:55
 * @ Description: 路由入口
 */

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/core', // 默认首页
    redirect: '/aaa',
    children: [
      // {
      //   path: 'a',
      //   name: 'a',
      //   component: async () => await import('../pages/test/index.vue'),
      // },
    ],
  },
  {
    path: '/aaa',
    name: 'aaa',
    component: async () => await import('../pages/test/index.vue'),
  },
  {
    path: '/bbb',
    name: 'bbb',
    component: async () => await import('../pages/md/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_PATH),
  scrollBehavior() {
    return {
      top: 0,
    }
  },
  routes,
})

export default router
