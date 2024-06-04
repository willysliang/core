/**
 * @ Author: willy
 * @ CreateTime: 2024-06-04 10:54:44
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-04 12:01:46
 * @ Description: 通过方法来拉起组件
 */

import WDialog from './index.vue'
import { createVNode, render, h } from 'vue'
import type { IDialogProps } from './types'

const divEl = document.createElement('div')
divEl.setAttribute('class', 'w-dialog-container')
document.body.appendChild(divEl)

export const showConfirmDialog = (props: Partial<IDialogProps>) => {
  return new Promise((resolve, reject) => {
    const confirmCallback = () => {
      resolve(true)
    }

    const cancelCallback = () => {
      reject(false)
    }

    const closeCallback = () => {
      /** 清除 Dom 上渲染的节点内容 */
      render(null, divEl)
    }

    /** 使用插槽，并用 v-html 的形式来插入内容 */
    const defaultSlotEl = () => [
      h('div', {
        innerHTML: props.content,
      }),
    ]

    const vNode = createVNode(
      WDialog,
      {
        ...props,
        modelValue: true,
        confirmCallback,
        cancelCallback,
        closeCallback,
      },
      {
        default: defaultSlotEl,
      },
    )

    render(vNode, divEl)
  })
}
