/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-08-14 15:49:20
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-08-14 15:49:57
 * @ Description: 获取数据
 */

/**
 * @description 可以安全地获取无限多层次的数据，一旦数据不存在不会报错，会返回undefined，相当于ts的安全导航符
 * @param {Object} o data 如 {a: {b:2}}
 * @param {String} p 路径 如 'a.b'
 * @return {String | Number | Object | Boolean | Function} 对应的key值
 * @example
 * const data = {a: {b:2}}
 * const b = this.safeGet(data, 'a.b') // 返回2
 * const b = this.safeGet(data, 'a.b.c.d.f') // 返回undefined
 */
export const safeGet = (o, p) => {
  try {
    return p.split('.').reduce((o, k) => o[k], o)
  } catch {
    return null
  }
}

// const result = safeGet(res, 'data.data.0.data') || {}
