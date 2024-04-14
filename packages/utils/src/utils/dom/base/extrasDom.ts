/**
 * @ Author: willysliang
 * @ CreateTime: 2024-04-13 12:56:41
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-04-14 23:11:55
 * @ Description: extra-dom - DOM的扩展类
 */

import ClipboardJS from 'clipboard'
import { logger } from '../../common/logger'

/**
 * @class ExtrasDom - DOM的扩展类
 * @memberof ExtrasDom.copyText 复制文本到剪切板
 */
export class ExtrasDom {
  /**
   * @function copyText 复制文本到剪切板
   * @param {string | number} text 复制的文本内容
   * @param {Function=} successCallback 复制成功的回调函数
   * @param {Function=} errorCallback 复制失败的回调函数
   */
  public copyText(
    text: string | number,
    successCallback?: () => void,
    errorCallback?: () => void,
  ) {
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
      successCallback ? successCallback() : logger.info('复制成功~')
    })

    clipboard.on('error', () => {
      document.body.removeChild(spanEle)
      clipboard.destroy()
      errorCallback ? errorCallback() : logger.error('复制失败~')
    })
  }
}

export const extrasDom = new ExtrasDom()
