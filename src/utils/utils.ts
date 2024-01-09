/**
 * @ Author: willy
 * @ CreateTime: 2023-12-22 14:49:27
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-09 20:02:30
 * @ Description: 工具类
 */

import ClipboardJS from 'clipboard'
import { logger } from '.'

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
