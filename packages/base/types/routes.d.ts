/**
 * @ Author: willy
 * @ Create Time: 2023-11-02 20:10:41
 * @ Modifier by: willy
 * @ Modifier time: 2023-11-02 20:21:11
 * @ Description: 路由表的定义
 */

import { type Icon } from '@icon-park/vue-next/lib/runtime'
import { type RouteRecordRaw } from 'vue-router'

/** 自定义的路由表字段 */
export interface IPagesMapCustom {
  /** 图标 */
  icon: Icon
  /** 标题 */
  title: string
}

/** 路由表对象的定义 */
export type IPagesMap = Record<string, RouteRecordRaw & IPagesMapCustom>
