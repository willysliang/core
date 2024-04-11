/**
 * @ Author: willy
 * @ CreateTime: 2024-02-26 10:16:07
 * @ Modifier: willy
 * @ ModifierTime: 2024-03-21 16:53:20
 * @ Description: 日志
 */

/**
 * 输出日志类
 */
export class Logger {
  private logLevel: number
  constructor(logLevel: number = 0) {
    this.logLevel = logLevel
  }

  log(...message): void {
    if (this.logLevel < 1) {
      console.info(`info: `, ...message)
    }
  }

  info(...message): void {
    if (this.logLevel < 1) {
      console.info(`info: `, ...message)
    }
  }

  debug(...message): void {
    if (this.logLevel < 2) {
      console.log(`debug: `, ...message)
    }
  }

  warn(...message): void {
    if (this.logLevel < 3) {
      console.warn(`warn: `, ...message)
    }
  }

  error(...message): void {
    if (this.logLevel < 4) {
      console.error(`error: `, ...message)
    }
  }
}

/** 日志控制器 */
export const logger = new Logger(0)
