/**
 * @ Author: willy
 * @ CreateTime: 2024-03-21 15:41:42
 * @ Modifier: willy
 * @ ModifierTime: 2024-03-21 21:14:11
 * @ Description: 数组相关的题目
 */

import { logger } from '../utils/index'

/** **************************************************************************************** */
/** ----------------------------------- 第一个只出现一次的字符 ------------------------------------------ */
/** **************************************************************************************** */
/**
 * 题目：在一个字符串(0<=字符串长度<=10000，全部由字母组成)中找到第一个只出现一次的字符,并返回它的位置, 如果没有则返回-1（需要区分大小写）。
    1. 思路1
      - 使用map记录每个字符出现的次数，然后遍历字符串，如果当前字符在map中只出现了一次，则返回该索引。
      - 时间复杂度：O(n)、空间复杂度：O(n)

    2. 思路2
      - 遍历字符串，比较每个第一次和最后一次出现的位置是否相同
      - 时间复杂度：O(n^2)、空间复杂度：O(0)
 */
/**
 * @function firstUniqChar 第一个只出现一次的字符
 * @param str 字符串
 * @returns {number} 返回第一个只出现一次的字符的索引，如果不存在则返回 -1
 */
export const firstUniqChar1 = (str: string): number => {
  // 用于存储字符及其出现次数的哈希表
  const charCountMap = {}

  // 计算每个字符出现的次数
  for (let i = 0; i < str.length; i++) {
    const currentChar = str[i]
    const currentCharCount = charCountMap[currentChar]
    charCountMap[currentChar] = currentCharCount ? currentCharCount + 1 : 1
  }

  // 找出第一个只出现一次的字符
  for (let i = 0; i < str.length; i++) {
    if (charCountMap[str[i]] === 1) return i
  }
  return -1
}
logger.warn('第一个只出现一次的字符(解法1)', firstUniqChar1.name)
logger.log(firstUniqChar1('leetcode')) // 输出: 0
logger.log(firstUniqChar1('loveleetcode')) // 输出: 2
logger.log(firstUniqChar1('aabb')) // 输出: -1

/**
 * @function firstUniqChar 第一个只出现一次的字符(解法2)
 * @param str 字符串
 * @returns {number} 返回第一个只出现一次的字符的索引，如果不存在则返回 -1
 */
export const firstUniqChar2 = (str: string): number => {
  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) return i
  }
  return -1
}
logger.warn('第一个只出现一次的字符(解法2)', firstUniqChar2.name)
logger.log(firstUniqChar2('leetcode')) // 输出: 0
logger.log(firstUniqChar2('loveleetcode')) // 输出: 2
logger.log(firstUniqChar2('aabb')) // 输出: -1

/** **************************************************************************************** */
/** ----------------------------------- 调整数组顺序：奇数位于偶数前面 ------------------------------------------ */
/** **************************************************************************************** */
/**
 * 题目：输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分
    思路：使用双指针，一个指针从头部开始遍历，另一个指针从尾部开始遍历。
      - 第一个指针start从数组第一个元素出发，向尾部前进
      - 第二个指针end从数组的最后一个元素出发，向头部前进
      - start遍历到偶数，end遍历到奇数时，交换两个数的位置
      - 当start>end时，完成交换
 */
/**
 * @function reorderArray 调整数组顺序：奇数位于偶数前面
 * @param {number[]} array 无序数组
 * @returns {number[]} 返回调整后的数组
 */
export const reorderArray = (array: number[]): number[] => {
  if (!Array.isArray(array) || array.length < 2) return array

  let start = 0
  let end = array.length - 1
  while (start < end) {
    // 从左边开始，找到第一个偶数
    while (array[start] % 2 === 1) start++
    // 从右边开始，找到第一个奇数
    while (array[end] % 2 === 0) end--

    // 交换这两个元素
    if (start < end) {
      ;[array[start], array[end]] = [array[end], array[start]]
    }
  }
  return array
}
logger.warn('调整数组顺序：奇数位于偶数前面', reorderArray.name)
logger.log(reorderArray([1, 2, 3, 4, 5, 6, 7])) // [1, 7, 3, 5, 4, 6, 2]

/** **************************************************************************************** */
/** ----------------------------------- 连续子数组的最大和 ------------------------------------------ */
/** **************************************************************************************** */
/**
 * 连续子数组的最大和
 * 题目：
      输入一个整型数组，数组里有正数也有负数。数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值，要求时间复杂度为O(n)
      例如:{6,-3,-2,7,-15,1,2,2},连续子向量的最大和为8(从第0个开始,到第3个为止)。
    思路：
      - 记录当前连续子数组中最大值 max
      - 记录当前连续子数组累加值 sum
      - 从数组第二个元素开始遍历
        1. 若 sum < 0，则 sum = nums[i]
        2. 若 sum > 0，则 sum += nums[i]
        3. 若 max < sum，则 max = sum
 */
/**
 * @function findGreatestSumOfSubArray 连续子数组的最大和
 * @param {number[]} nums 数组
 * @returns {number} 最大子数组和
 */
export const findGreatestSumOfSubArray = (nums: number[]): number => {
  if (!Array.isArray(nums) || nums.length === 0) return 0
  let sum = 0
  let max = 0
  for (let i = 0; i < nums.length; i++) {
    sum = sum < 0 ? nums[i] : sum + nums[i]

    if (sum > max) max = sum
  }
  return max
}
logger.warn('连续子数组的最大和', findGreatestSumOfSubArray.name)
logger.log(findGreatestSumOfSubArray([6, -3, -2, 7, -15, 1, 2, 2])) // 8

/** **************************************************************************************** */
/** ----------------------------------- 扑克牌顺子 ------------------------------------------ */
/** **************************************************************************************** */
/**
 * 扑克牌顺子
 *  题目：
      扑克牌中随机抽5张牌，判断是不是一个顺子，即这5张牌是不是连续的。
      2-10为数字本身，A为1，J为11...大小王可以看成任何数字，可以把它当作0处理。
    思路：
      1. 对数组进行排序
      2. 计算大小王的个数 (大小王数量必然 <= 2)
      3. 累计除了大小王外的连续数的差值 (因为进行排序，必然是在大小王之后)
        - 如果除了大小王外，有两个元素相等，则不能构成顺子 (对子不是顺子)
      4. 判断是否是顺子（顺子 = 大小王个数超出空缺的数量）
 */
/**
 * @function isContinuous 扑克牌顺子
 * @param {number[]} nums 扑克牌(5张牌)
 * @returns {boolean} 是否是顺子
 */
export const isContinuous = (nums: number[]): boolean => {
  // 检测输入数组是否有效
  if (!Array.isArray(nums) || nums.length !== 5) return false

  // 确保顺序正确
  nums.sort((a, b) => a - b)

  let kingNum = 0 // 大小王的数量
  let spaceNum = 0 // 空缺的数量

  for (let i = 0; i < nums.length - 1; i++) {
    // 统计大小王的数量(大小王数量必然 <= 2)
    if (nums[i] === 0) kingNum++
    else {
      // 计算相邻数字空缺的数量
      const space = nums[i + 1] - nums[i]
      // 数字相同(有对子)，则必然不能构成顺子
      if (space === 0) return false
      // 存在大于1的差值，说明暂时还未构成顺子，需要累计空缺数量
      else if (space > 1) spaceNum += space - 1
    }
  }
  // 如果大小王个数超出空缺的数量，则构成顺子
  return kingNum >= spaceNum
}
logger.warn('扑克牌顺子', isContinuous.name)
console.log(isContinuous([1, 3, 2, 5, 4])) // true，因为1到5已经构成顺子
console.log(isContinuous([0, 3, 2, 6, 4])) // true，0可以代表5，构成2到6的顺子
console.log(isContinuous([0, 0, 1, 2, 5])) // true，两个王可以代表3和4
console.log(isContinuous([11, 0, 9, 0, 10])) // true，两个王可以代表12和13，构成9到13的顺子
console.log(isContinuous([0, 5, 3, 1, 4])) // true，0可以代表任何数字，在这里可以视作2
console.log(isContinuous([2, 6, 4, 5, 3])) // true，2到6已经构成顺子
console.log(isContinuous([1, 3, 0, 7, 0])) // false，即使有两个王，也不能
