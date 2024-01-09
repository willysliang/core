/**
 * @ Author: willy
 * @ CreateTime: 2023-12-24 16:39:57
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-09 19:28:38
 * @ Description: 通用类
 */

import { Type, getValueType, logger } from './utils'

export const catchFunc = (error) => {
  logger.error(error)
}

/**
 * @description 语言类型枚举
 */
export enum LangType {
  'zh-CN' = 'zh-CN',
  'en-US' = 'en-US',
}

/**
 * 语言数据获取
 * @param {Record<string, T> | T} data 所要传递的数据
 * @param {LangType} [type] 语言类型
 * @returns {T} 返回相应语言的数据
 * @example lang<number>({ aaa: 11111 }, LangType['zh-CN'])
 */
export const lang = <T>(
  data: Record<string, T> | T,
  type = LangType['zh-CN'],
): T => {
  if (getValueType(data) === Type.Object) {
    const getLangData = data[type]
    if (getLangData === undefined) return data as T
    return getLangData
  }
  return data as T
}
