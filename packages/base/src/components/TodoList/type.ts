/**
 * @ Author: willysliang
 * @ CreateTime: 2025-07-11 11:29:15
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-07-11 11:34:16
 * @ Description: todolist 的类型声明
 */

import type { Icon } from '@icon-park/vue-next/lib/runtime'

export const DEFAULT_THEMES = [
  {
    border: '#ff7e5f',
    bg: 'rgba(255, 126, 95, 0.2)',
    color: '#ff7e5f',
  },
  {
    border: '#4a69bd',
    bg: 'rgba(74, 105, 189, 0.2)',
    color: '#4a69bd',
  },
  {
    border: '#6a89cc',
    bg: 'rgba(106, 137, 204, 0.2)',
    color: '#6a89cc',
  },
  {
    border: '#3dc1d3',
    bg: 'rgba(61, 193, 211, 0.2)',
    color: '#3dc1d3',
  },
]

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
