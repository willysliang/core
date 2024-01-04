/**
 * @ Author: willy
 * @ CreateTime: 2024-01-04 17:09:30
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-04 17:20:48
 * @ Description: 类型定义
 */

/** 可触发时机事件的类型 */
export type ITrigger = ('click' | 'contextmenu' | 'focus') &
  keyof WindowEventMap

/** Props 定义约束 */
export interface IPopoverProps {
  /** Popover 是否显示 */
  visible: boolean
  /** 触发时机 */
  trigger?: ITrigger
  /** 显示的内容，会被 slot 的内容替换掉 */
  content?: string | HTMLElement
  /** 是否显示 Tooltip 箭头 */
  showArrow?: boolean
  /** 定位方式 */
  positionMode?: 'absolute' | 'fixed'
  /** 出现的位置 */
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'center'
    | 'center-start'
    | 'center-end'
}

/** 容器相关信息的类型约束 */
export interface IContentInfoType {
  /** 宽高使用的单位 */
  unit: 'px' | 'vh' | 'vw' | 'rem' | 'em' | '%'
  /** 箭头的高度 */
  arrowHeight: number
  /** 盒子内容的高度 */
  contentHeight: number
  /** 盒子内容的宽度 */
  contentWidth: number
}

/** CSS 属性对象 */
export type IStyleType = Record<string, number | string>
