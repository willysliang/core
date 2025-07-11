/**
 * @ Author: willysliang
 * @ CreateTime: 2025-07-11 11:29:15
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-07-11 17:05:35
 * @ Description: todolist 的类型声明
 */

import type { Icon } from '@icon-park/vue-next/lib/runtime'

/** todo item 的类型声明 */
export interface ITodo {
  /** 任务名称 */
  taskName: string
  /** 任务的图标 */
  icon: Icon
  /** 任务描述 */
  taskDesc: string
  /** 功能描述(已完成) */
  features?: string[]
  /** 功能描述(待完成) */
  todoFeatures?: string[]
  /** 标签列表 */
  tags?: string[]
  /** todo 进度条 */
  progressNum: number
}

/** todo 的样式定义的声明 */
export interface ITodoTheme {
  /** 边框样式-颜色 */
  border: string
  /** 背景色 */
  bg: string
  /** 字体色 */
  color: string
}

/** todolist 组件的 prop 类型声明 */
export interface ITodoListProps {
  /** todolist 的标题 */
  title: string
  /** todolist 展示项 */
  todos: ITodo[]
  /** 每个 todo的样式  */
  themes?: ITodoTheme[]
}
