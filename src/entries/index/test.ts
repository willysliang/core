/**
 * @function moreThanHalfNum 数组中出现次数超过数组长度一半的数字
 * @param {number[]} numbers 数组
 * @returns {number}
 */
function moreThanHalfNum(numbers: number[]): number {
  // 边界条件，防止数组长度为 0 时下面的错误计算
  if (!Array.isArray(numbers) || !numbers.length) return 0

  const len = numbers.length
  const map = new Map() // 计算每个数字的出现次数

  let largestNumber = numbers[0] // 记录出现最多的值（默认取第一个）
  let largestNumberCount = 1 // 记录出现最多的值的次数（因为默认取第一个值，所以必然存在次数为1）

  for (let i = 0; i < len; i++) {
    // 查看 map 中是否记录过该数字，如果没有，则初始化该 number 的次数为 1
    if (map.has(numbers[i])) {
      const targetNumber = numbers[i]
      const targetNumberCount = map.get(targetNumber) + 1

      map.set(targetNumber, targetNumberCount)

      if (targetNumberCount > largestNumberCount) {
        largestNumberCount = targetNumberCount
        largestNumber = targetNumber
      }
    } else {
      // 因为在初始化时已经取了第一个值，所以这里必然不用赋值，largestNumberCount 的次数必然 >= 该 number
      const targetNumber = numbers[i]
      map.set(targetNumber, 1)
    }
  }

  // 如果数组长度为 0 或者 数组中没有超过该数组的长度的一半(务必向上取整，防止奇数时出现小数)时，此时返回 0，否则返回出现最多次数的值
  return len && largestNumberCount >= Math.ceil(len / 2) ? largestNumber : 0
}

const case1 = moreThanHalfNum([1, 2, 3, 2, 2, 2, 5, 4, 2])
console.log(case1) // 2
