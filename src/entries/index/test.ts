/**
 * @function findMajorityElement 摩尔投票法（数组中出现次数超过数组长度一半的数字）
 * @param {number[]} numbers 数组
 * @returns {number}
 * @description 摩尔投票法核心：目标值的个数比其他所有值加起来的数多（必为众数）
 */
function findMajorityElement(numbers: number[]): number {
  // 边界条件，防止数组长度为 0 时下面的错误计算
  if (!Array.isArray(numbers) || !numbers.length) return 0

  let candiate: number = numbers[0] // 候选人：数组中的某个值
  let count = 0 // candiate 的出现次数

  for (const num of numbers) {
    count += num === candiate ? 1 : -1

    // 次数为 0 后保存新值
    if (count === 0) {
      candiate = num
      count = 1
    }
  }

  count = 0 // 判断 candiate 这个数值的出现个数
  for (const num of numbers) {
    if (num === candiate) count++
  }

  return count > numbers.length / 2 ? candiate : 0
}

const case1 = findMajorityElement([1, 2, 3, 2, 2, 2, 5, 4, 2])
console.log(case1) // 2
