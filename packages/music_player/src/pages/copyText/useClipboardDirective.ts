/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
/**
 * @ Author: willysliang
 * @ Create Time: 2022-11-21 15:41:39
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-22 10:06:07
 * @ Description: 自定义指令 - clipboard 复制文本 - useClipboardDirective
 */

import { Directive, DirectiveBinding } from 'vue'
import ClipBoard from 'clipboard'
import { ElMessage } from 'element-plus'
import { useI18nHooks } from '@/hooks/useI18n';

const { t } = useI18nHooks()

/** 检测是否导入 clipboard 依赖包并能正确引用 */
if (!ClipBoard) {
  throw new Error('you should npm install `clipboard` --save at first ')
}

interface elNode {
  vClipboard?: ClipBoard & ClipBoard.Options
  vClipSuccess?: Function
  vClipFailure?: Function
}
declare type elType = (string | Element | NodeListOf<Element>) & elNode

/** 只关注 mounted 和 update 生命周期 */
export const vClips: Directive = (el, binding: DirectiveBinding<any>) => {
  console.log(el, binding)
}

/** 自定义 v-clip 复制文本指令 */
export const vClip: Directive = {
  created: () => {},
  beforeMount () {},

  mounted (el: elType, binding: DirectiveBinding) {
    const clipboard: ClipBoard = new ClipBoard(el, {
      text () {
        return binding.value
      },
      action () {
        return binding.arg === 'cut' ? 'cut' : 'copy'
      },
    })

    clipboard.on('success', (e: ClipBoard.Event) => {
      const callback = el.vClipSuccess
      ElMessage.success(t('util.copySuccess'))
      callback && callback(e)
    })

    clipboard.on('error', (e: ClipBoard.Event) => {
      const callback = el.vClipFailure
      ElMessage.success(t('util.copyError'))
      callback && callback(e)
    })

    el.vClipboard = clipboard
  },

  beforeUpdate () {},

  updated (targetEl: elType, binding: DirectiveBinding) {
    if (binding.arg === 'success') {
      targetEl.vClipSuccess = binding.value
    } else if (binding.arg === 'error') {
      targetEl.vClipFailure = binding.value
    } else if (targetEl?.vClipboard) {
      targetEl.vClipboard.text = () => binding.value
      targetEl.vClipboard.action = () =>
        binding.arg === 'cut' ? 'cut' : 'copy'
    }
  },

  beforeUnmount () {},

  unmounted (targetEl: elType, binding: DirectiveBinding) {
    if (binding.arg === 'success') {
      delete targetEl.vClipSuccess
    } else if (binding.arg === 'error') {
      delete targetEl.vClipFailure
    } else {
      targetEl?.vClipboard?.destroy()
      delete targetEl.vClipboard
    }
  },
}
