/**
 * @ Author: willy
 * @ CreateTime: 2023-12-22 14:49:27
 * @ Modifier: willy
 * @ ModifierTime: 2023-12-22 15:34:50
 * @ Description: 工具类
 */

import ClipboardJS from 'clipboard'
import { isEnvDev } from './app'

type IConsoleType =
  | 'clear'
  | 'debug'
  | 'dir'
  | 'error'
  | 'log'
  | 'info'
  | 'warn'
class Logger {
  private readonly isShowLog: boolean

  constructor() {
    this.isShowLog = isEnvDev
  }

  private commonInfo(value, type: IConsoleType = 'log') {
    if (this.isShowLog) {
      console[type](value)
    }
  }

  info(value) {
    this.commonInfo(value, 'info')
  }

  warn(value) {
    this.commonInfo(value, 'warn')
  }

  error(value) {
    this.commonInfo(value, 'error')
  }
}
export const logger = new Logger()

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
