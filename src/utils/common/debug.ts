/**
 * @ Author: willy
 * @ CreateTime: 2024-01-09 19:59:29
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-09 20:00:14
 * @ Description: 测试内容相关
 */

import { isEnvDev } from '../index'

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
      console[type](...value)
    }
  }

  info(...value) {
    this.commonInfo(value, 'info')
  }

  warn(...value) {
    this.commonInfo(value, 'warn')
  }

  error(...value) {
    this.commonInfo(value, 'error')
  }
}

/**
 * 输出日志
 */
export const logger = new Logger()
