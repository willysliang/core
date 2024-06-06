/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 09:05:41
 * @ Modified by: willysliang
 * @ Modified time: 2023-04-18 11:38:30
 * @ Description: 路由配置
 */

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { demoPages } from '@/pages/constant'
import { MPRoutes } from '../views/constants'
import { IPages, Pages } from './constant'
import { createRouterGuards } from './routerGuards'
import { demoRoutes } from './routes/demoRoutes'

// 如果不使用TS扩展 将会是unknow 类型
declare module 'vue-router' {
  interface RouteMeta extends IPages {
    title: string
    keepAlive?: boolean
    requireAuth?: boolean
  }
}

/** 路由 */
const routes: Array<RouteRecordRaw> = [
  {
    path: Pages.LOGIN.path,
    name: Pages.LOGIN.name,
    meta: {
      ...Pages.LOGIN,
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import('../views/system/Login.vue'),
  },
  {
    path: '/',
    name: Pages.INDEX.name,
    meta: {
      ...Pages.INDEX,
      keepAlive: true,
      requireAuth: true,
    },
    redirect: { name: demoPages.TEST.name },
    component: () => import('../views/system/root.vue'),
    children: [
      /**
       * 404 页面
       */
      {
        path: Pages.NOT_FOUND.path,
        name: Pages.NOT_FOUND.name,
        component: () => import('../views/system/NotFound.vue'),
        meta: {
          ...Pages.NOT_FOUND,
          keepAlive: true,
        },
      },
      {
        path: '/:pathMatch(.*)*',
        name: Pages.NOT_FOUND.name,
        component: () => import('../views/system/NotFound.vue'),
        meta: {
          ...Pages.NOT_FOUND,
          keepAlive: true,
        },
      },

      /** 音乐播放器相关 */
      ...MPRoutes,

      /** demo 相关 */
      ...demoRoutes,
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PATH as string),
  scrollBehavior() {
    return {
      top: 0,
    }
  },
  routes,
})

createRouterGuards(router)

export default router
