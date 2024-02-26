/**
 * @ Author: willy
 * @ CreateTime: 2024-01-04 21:47:21
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-26 11:25:41
 * @ Description: 选择器 - 操作区
 */

import { FunctionalComponent } from 'vue'
import { createBEM } from '@willy/utils'

interface WPickerActionProps {
  visible?: boolean
}

interface WPickerActionMethods {
  onCancel?: () => void
  onConfirm?: () => void
}

/**
 * @description 选择器的操作区
 * @param {WPickerActionProps & WPickerActionMethods} props 属性
 * @param {unknown} context 上下文，包含 slot、emit
 * @returns {JSX.Element}
 */
export const WPickerAction: FunctionalComponent<
  WPickerActionProps & WPickerActionMethods
> = (_, { emit }) => {
  const handleButton = (type: 'confirm' | 'cancel' = 'cancel') => {
    emit(type)
  }

  return (
    <div class="w-picker__action">
      <div
        class={createBEM('picker', 'button')(['default', 'cancel'])}
        onClick={() => handleButton('cancel')}
      >
        取消
      </div>
      <div
        class={createBEM('picker', 'button')(['default', 'confirm'])}
        onClick={() => handleButton('confirm')}
      >
        确定
      </div>
    </div>
  )
}
