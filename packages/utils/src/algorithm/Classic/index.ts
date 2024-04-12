/**
 * @ Author: willy
 * @ CreateTime: 2024-04-12 18:06:47
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-12 18:11:18
 * @ Description: 经典算法
 */

/** K 均值 */
export * from './KMeans'

/**
 * @method disorder 数组乱序 - 洗牌算法
 * 从最后一个元素开始，从数组中随机选出一个位置来交换，直到第一个元素为止
 */
export const disorder = (nums: number[]): number[] => {
  const length = nums.length
  let current = length - 1
  while (current > -1) {
    const randomIndex: number = Math.floor(Math.random() * length)
    ;[nums[current], nums[randomIndex]] = [nums[randomIndex], nums[current]]
    current--
  }
  return nums
}
