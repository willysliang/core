/**
 * @ Author: willysliang
 * @ Create Time: 2024-01-07 20:50:16
 * @ Modified by: willysliang
 * @ Modified time: 2024-01-07 22:34:56
 * @ Description: 测试
 */

/**
 * @function findNumberWithSum 和为 S 的连续正整数序列
 * @description 输入一个正数S，打印出所有和为S的连续正数序列
 * @param {number} target 正整数
 * @returns {number[][]} 连续正整数序列
 * @example FindContinuousSequence(15) // 预期结果：[[1, 2, 3, 4, 5], [4, 5, 6], [7, 8]]
 */
function FindContinuousSequence(target: number): number[][] {
  const result: number[][] = []
  let low: number = 1
  let high: number = 2
  let sum: number = low + high

  while (low < high && high < target) {
    if (sum < target) {
      high++
      sum += high
    } else if (sum > target) {
      sum -= low
      low++
    } else {
      // sum === target：找到连续序列，将其插入结果中
      const sequence: number[] = []
      for (let i = low; i <= high; i++) {
        sequence.push(i)
      }
      result.push(sequence)
      sum -= low
      low++
    }
  }

  return result
}

/** 测试用例 */
const case1 = FindContinuousSequence(15) // 预期结果：[[1, 2, 3, 4, 5], [4, 5, 6], [7, 8]]
console.log(case1)
