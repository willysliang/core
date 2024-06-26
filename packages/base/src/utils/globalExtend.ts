/**
 * @ Author: willysliang
 * @ Create Time: 2022-11-08 17:17:50
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-08 17:55:48
 * @ Description: 全局 & 原型 中集成的工具类
 */
import { first, last, sampleSize, sample, chunk, trimEnd } from 'lodash-es'
import dayjs from 'dayjs'
import { formatQuantity } from '@utils/format'

declare global {
  /***
   * 数组
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * 获取数组第一个元素
     */
    first<T>(this: T[]): T

    last<T>(this: T[]): T
    sample<T>(this: T[]): T

    /**
     * 获得 n 个随机元素
     * @param size
     */
    sampleSize<T>(this: T[], size: number): T[]

    /**
     * 将数组（array）拆分成多个 size 长度的区块
     * @param size
     */
    chunk<T>(this: T[], size: number): T[][]
  }

  /***
   * 字符串
   */
  interface String {
    /** 转换成int类型 */
    toInt(this: string): number

    trimEnd(this: string, chars?: string): string
  }

  /***
   * 数字
   */
  interface Number {
    toDate(this: number, format?: string): string

    formatQuantity(this: number): string | number
  }
}

/***
 * 数组
 */
Array.prototype.first = function <T>(this: T[]): T {
  return first<T>(this) as T
}
Array.prototype.last = function <T>(this: T[]): T {
  return last<T>(this) as T
}
Array.prototype.sample = function <T>(this: T[]): T {
  return sample<T>(this) as T
}
Array.prototype.sampleSize = function <T>(this: T[], size: number): T[] {
  return sampleSize<T>(this, size) as T[]
}
Array.prototype.chunk = function <T>(this: T[], size: number): T[][] {
  return chunk<T>(this, size) as T[][]
}

/***
 * 字符串
 */
String.prototype.toInt = function (this: string): number {
  return parseInt(this)
}
String.prototype.trimEnd = function (this: string, chars = ' '): string {
  return trimEnd(this, chars)
}

/***
 * 数字
 */
Number.prototype.toDate = function (
  this: number,
  format = 'YYYY-MM-DD',
): string {
  return dayjs(this).format(format)
}
Number.prototype.formatQuantity = function (this: number): string | number {
  return formatQuantity(this)
}
