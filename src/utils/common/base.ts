/**
 * @ Author: willy
 * @ CreateTime: 2024-01-22 17:51:28
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-22 17:56:40
 * @ Description: 基础的工具类
 */

/**
 * @function deepEqual 深度对比两个值是否相等
 * @param {any} value1 要对比的值
 * @param {any} value2 要对比的值
 * @returns {boolean} 是否相等
 * @example deepEqual([], [])
 */
export const deepEqual = (value1: any, value2: any): boolean => {
  // 两边类型是否一致
  const valueType = (v) => Object.prototype.toString.call(v)
  if (valueType(value1) !== valueType(value2)) return false

  /** 类型判断仅需要判断一边就行 */
  if (value1 && typeof value1 === 'object') {
    // 数组的对比
    if (Array.isArray(value1)) {
      // 是否等长
      if (value1.length !== value2.length) return false

      // 是否存在不同的值
      for (let i = 0; i < value1.length; i++) {
        if (!deepEqual(value1[i], value2[i])) return false
      }

      // 排除了上述所有检查，则必为相同
      return true
    }

    // Map 的对比
    if (value1 instanceof Map) {
      if (value1.size !== value2.size) return false
      for (const [key, value] of value1) {
        if (!value2.has(key) || value2.get(key) !== value) return false
      }

      return true
    }

    // Set 的对比
    if (value1 instanceof Set) {
      if (value1.size !== value2.size) return false
      for (const item of value1) {
        if (!value2.has(item)) return false
      }

      return true
    }

    // 其他情况的对比
    const valueKeys1 = Object.keys(value1)
    const valueKeys2 = Object.keys(value2)
    if (valueKeys1.length !== valueKeys2.length) return false
    for (const key of valueKeys1) {
      if (!(key in value2) || !deepEqual(value1[key], value2[key])) return false
    }
    return true
  }

  // 是否直接相等
  return value1 === value2
}

/**
   * @function removeDuplicates 删除数组的重复项对象
   * @param {Record<string, unknown>[]} arr 可能具有重复项的数组
   * @returns {Record<string, unknown>[]} 去重后的对象数组
   * @example
      const test1 = [
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
      ]
      console.log(removeDuplicates(test1))
      // 期望： [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]

      const test2 = [
          { id: 1, name: 'Alice' },
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
      ]
      console.log(removeDuplicates(test2))
      // 期望：[{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]

      const test3 = [
          { id: 1, name: 'Alice' },
          { id: 1, name: 'Alice' },
          { id: 1, name: 'Alice' },
      ]
      console.log(removeDuplicates(test3))
      // 期望：[{ id: 1, name: 'Alice' }]

      const test4 = [
          { id: 1, name: 'Alice', age: 30 },
          { id: 1, name: 'Alice' },
          { id: 1, name: 'Alice', gender: 'female' },
      ]
      console.log(removeDuplicates(test4))
      // 期望：[{ id: 1, name: 'Alice', age: 30 }, { id: 1, name: 'Alice' }, { id: 1, name: 'Alice', gender: 'female' }]

      const test5 = [
          { id: 1, data: { score: 10, passed: true } },
          { id: 1, data: { score: 10, passed: true } },
          { id: 1, data: { passed: true, score: 10 } },
          { id: 2, data: { score: 8, passed: false } },
      ]
      console.log(removeDuplicates(test5))
      // 期望：[{ id: 1, data: { score: 10, passed: true } }, { id: 2, data: { score: 8, passed: false } }]

      const test6 = [
          { id: 1, tags: ['science', 'math'] },
          { id: 1, tags: ['science', 'math'] },
          { id: 2, tags: ['science'] },
      ]
      console.log(removeDuplicates(test6))
      // 期望：[{ id: 1, tags: ['science', 'math'] }, { id: 2, tags: ['science'] }]
   */
export function removeDuplicates(arr: Record<string, unknown>[]) {
  /** 已经去重的数组 */
  const result: Record<string | number, unknown>[] = []

  /** 重复索引 */
  const duplicatesIndices = new Map<number, boolean>()

  for (let index = 0; index < arr.length; index++) {
    // 如果已经重复，则无需检查
    if (duplicatesIndices.has(index)) continue

    const current = arr[index]

    // 此时必然是不重复的，直接加入该对象
    result.push(current)

    // 遍历数组当前项之后的其他项
    for (
      let comparisonIndex = index + 1;
      comparisonIndex < arr.length;
      comparisonIndex++
    ) {
      // 如果之前就已经计算到这里重复，则无需检查
      if (duplicatesIndices.has(comparisonIndex)) continue

      const valuesEqual = deepEqual(current, arr[comparisonIndex])

      // 检查值是否全部相等，以此来加入重复对象
      if (valuesEqual) duplicatesIndices.set(comparisonIndex, true)
    }
  }

  return result
}
