/**
 * @ Author: willy
 * @ CreateTime: 2023-12-22 14:49:27
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-02 16:21:24
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

/**
 * @description 获取数据类型
 * @param {any} value 需获取数据类型的值
 * @returns {IType} 返回的数据类型
 */
export const getValueType = (value: any): string =>
  Object.prototype.toString.call(value).slice(8, -1)

export const Type = {
  Object: 'Object', // ：普通对象
  Array: 'Array', // ：数组
  String: 'String', // ：字符串
  Number: 'Number', // ：数字
  Boolean: 'Boolean', // 布尔值
  Function: 'Function', // ：函数
  Date: 'Date', // 日期对象
  RegExp: 'RegExp', //  ：正则表达式对象
  Set: 'Set', // Set 对象
  Map: 'Map', // Map 对象
  Error: 'Error', // 错误对象
  WeakSet: 'WeakSet',
  WeakMap: 'WeakMap',
  ArrayBuffer: 'ArrayBuffer',
  // [object DataView]：DataView 对象
  // [object Int8Array]：Int8Array 数组
  // [object Uint8Array]：Uint8Array 数组
  // [object Uint8ClampedArray]：Uint8ClampedArray 数组
  // [object Int16Array]：Int16Array 数组
  // [object Uint16Array]：Uint16Array 数组
  // [object Int32Array]：Int32Array 数组
  // [object Uint32Array]：Uint32Array 数组
  // [object Float32Array]：Float32Array 数组
  // [object Float64Array]：Float64Array 数组
  // [object BigInt64Array]：BigInt64Array 数组
  // [object BigUint64Array]：BigUint64Array 数组
}
