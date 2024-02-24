/**
 * @ Author: willy
 * @ CreateTime: 2024-02-22 16:54:42
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-22 16:54:50
 * @ Description: 日志
 */

const logLevel: number = 0

function info(message: string): void {
  if (logLevel < 1) {
    console.log(`info: ${message}`)
  }
}

function debug(message: string): void {
  if (logLevel < 2) {
    console.log(`debug: ${message}`)
  }
}

function warn(message: string): void {
  if (logLevel < 3) {
    console.log(`debug: ${message}`)
  }
}

function error(message: string): void {
  if (logLevel < 4) {
    console.log(`debug: ${message}`)
  }
}

export default Object.freeze({
  info,
  debug,
  warn,
  error,
})
