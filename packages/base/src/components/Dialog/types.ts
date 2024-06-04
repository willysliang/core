/**
 * @ Author: willy
 * @ CreateTime: 2024-06-03 10:38:22
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-04 11:55:34
 * @ Description: Dialog 的类型声明
 */

export interface IDialogProps {
  /** 是否显示 */
  modelValue: boolean
  /** 标题 */
  title?: string
  /** 内容（在不使用插槽时显示出来） */
  content?: any

  /** 是否点击esc关闭 */
  escCloseable?: boolean
  /** 点击遮罩层关闭 */
  maskClosable?: boolean
  /** 距离顶部距离 */
  top?: number | string
  /** 距离底部距离 */
  bottom?: number | string
  /** modal宽度 */
  width?: number | string

  showCloseIcon?: boolean

  /**
   * 底部按钮相关属性
   */
  /** 是否显示底部 */
  showFooter?: boolean
  /** 确认按钮的文本 */
  okText?: string
  /** 是否显示取消按钮 */
  showCancel?: boolean
  /** 取消按钮文字 */
  cancelText?: string

  /**
   * 事件回调
   */
  /** 取消按钮的事件回调 */
  cancelCallback?: () => void
  /** 确认按钮的事件回调 */
  confirmCallback?: () => void
  /** 关闭事件回调 */
  closeCallback?: () => void
}

/** 所有事件的名称 */
export type IEventName = 'update:modelValue' | 'confirm' | 'cancel' | 'close'

/** 回传给父组件的事件 */
export interface IDialogEmits {
  (event: Extract<IEventName, 'update:modelValue'>, state: boolean): void
  (event: Extract<IEventName, 'confirm' | 'cancel' | 'close'>): void
}
