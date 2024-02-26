/**
 * @ Author: willy
 * @ CreateTime: 2024-02-26 10:32:54
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-26 10:33:49
 * @ Description: 类型相关
 */

/**
 * @description 获取数据类型
 * @param {any} value 需获取数据类型的值
 * @returns {} 返回的数据类型
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
