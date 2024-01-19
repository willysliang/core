/**
 * @ Author: willy
 * @ Create Time: 2023-11-01 15:26:01
 * @ Modifier by: willy
 * @ Modifier time: 2023-11-02 20:06:24
 * @ Description: 路由入口
 */

import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router'
import { indexPagesMap } from '@/entries/index/routes'

/** 默认路由 */
const defaultRoute = indexPagesMap.CASE

/** 路由表 */
const routes: RouteRecordRaw[] = [
  {
    path: '/core', // 默认首页
    redirect: defaultRoute.path,
  },
  {
    path: '/', // 默认首页
    redirect: defaultRoute.path,
  },
  ...Object.values(indexPagesMap),
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PATH),
  scrollBehavior() {
    return {
      top: 0,
    }
  },
  routes,
})

export default router
