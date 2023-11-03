/**
 * @ Author: willy
 * @ Create Time: 2023-11-02 20:01:46
 * @ Modifier by: willy
 * @ Modifier time: 2023-11-02 20:21:41
 * @ Description: 路由索引表
 */

import { type IPagesMap } from '#/routes'
import { Home } from '@icon-park/vue-next'

/** index.html 的路由表 */
export const indexPagesMap: IPagesMap = {
  /** 首页 */
  HOME: {
    path: '/home',
    name: 'home',
    component: async () => await import('./pages/home/index.vue'),
    icon: Home,
    title: '首页',
  },
}
