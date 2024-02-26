/**
 * @ Author: willy
 * @ CreateTime: 2024-02-26 10:26:42
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-26 10:28:02
 * @ Description: 操作 DOM
 */

import ClipboardJS from 'clipboard'
import { logger } from '../common/logger'

/**
 * @function copyText 复制文本的函数
 * @param {string | number} text 复制的文本内容
 */
export const copyText = (text: string | number) => {
  const spanEle = document.createElement('span')
  spanEle.setAttribute('class', 'copy-text-span')
  spanEle.setAttribute('data-clipboard-text', String(text))
  spanEle.style.display = 'none'
  document.body.appendChild(spanEle)

  const clipboard = new ClipboardJS('.copy-text-span')
  spanEle.click()

  clipboard.on('success', () => {
    document.body.removeChild(spanEle)
    clipboard.destroy()
    logger.info('复制成功~')
  })

  clipboard.on('error', () => {
    document.body.removeChild(spanEle)
    clipboard.destroy()
    logger.error('复制失败~')
  })
}
