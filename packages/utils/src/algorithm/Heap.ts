/**
 * @ Author: willy
 * @ CreateTime: 2024-04-02 15:48:03
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-03 19:12:34
 * @ Description: 堆 - Heap
 */

import { logger } from '../utils/index'

/** **************************************************************************************** */
/** ----------------------------------- 堆的基本操作 ------------------------------------------ */
/** **************************************************************************************** */
/**
 * 堆的基本操作
      1. 堆的构建
        1-1. 大顶堆 createMaxHeap
          从第一个非叶子节点开始依次对数组中的元素进行下沉操作。
            和孩子节点的最大值 max 比较。
                - 大于 max: 不需要再下沉。
                - 小于 max: 和 max 交换位置，然后继续和下一层孩子节点比较，直到队列末尾。

        1-2. 小顶堆 createMinHeap
          从第一个非子节点开始依次堆数组中的元素进行下沉操作。
            和孩子节点的最小值 min 比较。
              - 小于 min: 不需要下沉
              - 大于 min: 和 min 交换位置(下沉) - 继续和下一层孩子节点比较，直到队列末尾。

      2. 堆的插入
        由于堆属于优先队列，只能从末尾添加
        添加后有可能会破坏堆的结构，需要从下到上进行调整
        如果元素小于父元素，则上浮

      3. 堆的移除
        由于堆属于优先队列，只能从头部移除
        移除头部后，使用末尾元素填充头部，开始头部下沉操作
 */
/**
 * @class Heap
 * 堆(Heap)的类模板，包括大顶堆和小顶堆的基本操作
 */
export class Heap<T = number> {
  private heapType: 'max' | 'min'
  /** 存储的堆元素的数组 */
  private heap: T[]
  /** 比较函数，确定堆的类型（大顶堆或小顶堆） */
  private compare: (a: T, b: T) => boolean

  constructor(heapType: 'max' | 'min' = 'max', initHeap: T[] = []) {
    const maxCompareFn = (a, b) => a > b
    const minCompareFn = (a, b) => a < b

    this.heapType = heapType
    this.compare = heapType === 'max' ? maxCompareFn : minCompareFn
    this.heap = []

    // 初始化堆
    initHeap.forEach((value) => this.insert(value))
  }

  /** 堆的大小 */
  get size(): number {
    return this.heap.length
  }

  /** 获取堆顶元素 */
  get top(): T | undefined {
    return this.heap?.[0]
  }

  /** 获取所有堆元素(排序 -> 大顶堆:从大到小，小顶堆:从小到大) */
  get getHeap(): T[] {
    const minSortFn = (a, b) => a - b
    const maxSortFn = (a, b) => b - a
    return this.heap.sort(this.heapType === 'max' ? maxSortFn : minSortFn)
  }

  /** 父节点索引 */
  private getParentIndex(i: number): number {
    return Math.floor((i - 1) / 2)
  }

  /** 左节点索引 */
  private getLeftChildIndex(i: number): number {
    return 2 * i + 1
  }

  /** 右节点索引 */
  private getRightChildIndex(i: number): number {
    return 2 * i + 2
  }

  /** 交换堆中两个元素的位置 */
  private swap(i: number, j: number): void {
    ;[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
  }

  /** 向堆中插入一个元素 */
  public insert(value: T): void {
    this.heap.push(value)
    let index = this.size - 1
    let parentIndex = this.getParentIndex(index)

    // 上浮调整，以满足堆的性质
    while (
      index > 0 &&
      this.compare(this.heap[index], this.heap[parentIndex])
    ) {
      this.swap(index, parentIndex)
      index = parentIndex
      parentIndex = this.getParentIndex(index)
    }
  }

  /** 删除: 从堆中取出最大元素（堆顶元素） */
  public extract(): T | undefined {
    const size = this.size
    if (size === 0) return undefined
    const root = this.heap[0]
    const last = this.heap.pop()!
    if (size > 1) {
      this.heap[0] = last
      this.heapify(0)
    }
    return root
  }

  /** 下沉调整，确保堆的性质 */
  public heapify(index: number): void {
    const left = this.getLeftChildIndex(index)
    const right = this.getRightChildIndex(index)
    let largestOrSmallest = index

    // 比较当前节点与左子节点，更新最大（或最小）值的索引
    if (
      left < this.size &&
      this.compare(this.heap[left], this.heap[largestOrSmallest])
    ) {
      largestOrSmallest = left
    }

    // 比较当前（或更新后的）节点与右子节点，更新最大（或最小）值的索引
    if (
      right < this.size &&
      this.compare(this.heap[right], this.heap[largestOrSmallest])
    ) {
      largestOrSmallest = right
    }

    // 如果最大（或最小）值的索引已变化，执行交换并递归调用 heapify
    if (largestOrSmallest !== index) {
      this.swap(index, largestOrSmallest)
      this.heapify(largestOrSmallest)
    }
  }
}
logger.warn('堆(Heap)的类模板', Heap.name)

console.log('创建大顶堆示例 --->')
const maxHeap = new Heap('max', [3, 4])
maxHeap.insert(1)
console.log(maxHeap.getHeap) // [4, 3, 1]
console.log(maxHeap.extract(), maxHeap.extract(), maxHeap.extract()) // 4 3 1

console.log('创建小顶堆示例 --->')
const minHeap = new Heap('min', [3, 4])
minHeap.insert(1)
console.log(minHeap.getHeap) // [1, 3, 4]
console.log(minHeap.extract(), minHeap.extract(), minHeap.extract()) // 1 3 4

/** **************************************************************************************** */
/** ----------------------------------- 数据流中的中位数 ------------------------------------------ */
/** **************************************************************************************** */
/**
 * 题目:
    因为数据流是动态的，意味着数据会不断地添加进来。中位数是指在一组数字中处于中间位置的数字。
    如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。
    如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。
  思路:
    使用一个最大堆来存储当前所有数字中较小的一半，- 一个最小堆来存储当前所有数字中较大的一半。
      1. 当最大堆的元素个数比最小堆多1个时，将最小堆中的元素插入到最大堆中
      2. 如果最大堆的个数比最小堆少时，取出最小堆中的堆顶元素到最大堆中
 */
/**
 * @class MiniHeap
 * 简化版的堆结构
 */
export class MiniHeap<T = number> {
  /** 存储的堆元素的数组 */
  private heap: T[]
  /** 比较函数，确定堆的类型（大顶堆或小顶堆） */
  private compare: (a: T, b: T) => number

  constructor(heapType: 'max' | 'min' = 'max') {
    this.heap = []
    const maxCompareFn = (a, b) => a - b
    const minCompareFn = (a, b) => b - a
    this.compare = heapType === 'max' ? maxCompareFn : minCompareFn
  }

  public insert(value: T): void {
    this.heap.push(value)
    this.heap.sort(this.compare)
  }

  public extract(): T | undefined {
    return this.heap.shift()
  }

  public top(): T | undefined {
    return this.heap?.[0]
  }

  get size(): number {
    return this.heap.length
  }
}

/**
 * @class MedianFinder
 * 中位数查找器
 */
export class MedianFinder<T = number> {
  /** 最大堆: 存储当前所有数字中较小的一半 */
  private maxHeap: MiniHeap<T>
  /** 最小堆: 存储当前所有数字中较大的一半 */
  private minHeap: MiniHeap<T>

  constructor() {
    this.maxHeap = new MiniHeap<T>('max')
    this.minHeap = new MiniHeap<T>('min')
  }

  /** 数据流中增加数据(往堆结构中添加数据) */
  public addNum(value: T): void {
    // 先插入最大堆中排序存储，然后再取出顶点元素放入最小堆 (最大堆的顶点元素一定是最大堆中最大的元素)
    this.maxHeap.insert(value)
    this.minHeap.insert(this.maxHeap.extract()!)

    // 两个堆保持数量均衡
    if (this.maxHeap.size < this.minHeap.size) {
      this.maxHeap.insert(this.minHeap.extract()!)
    }
  }

  /** 在数据流中查找中位数 */
  public findMedian(): T | number {
    if (this.maxHeap.size > this.minHeap.size) return this.maxHeap.top()!
    return (Number(this.maxHeap.top()) + Number(this.minHeap.top())) / 2
  }
}

/** 示例代码 */
logger.warn('数据流中的中位数', MedianFinder.name)
const medianFinder = new MedianFinder()
medianFinder.addNum(1)
medianFinder.addNum(2)
console.log(medianFinder.findMedian()) // 1.5
medianFinder.addNum(3)
console.log(medianFinder.findMedian()) // 2

/** **************************************************************************************** */
/** ----------------------------------- 最小的 K 个数 ------------------------------------------ */
/** **************************************************************************************** */
/**
 * 题目: 最小的 K 个数
    思路1:
      先排序，再取出前 k 个数，最小时间复杂度 nlogn。

    思路2:
      1. 把前 k 个数构建一个大顶堆。
      2. 从第 k 个数开始，和大顶堆的最大值进行比较，若比最大值小，则交换两个数的位置，重新构建大顶堆。
      3. 一次遍历之后大顶堆里的数就是整个数据里最小的 k 个数。
      时间复杂度 nlogk。
 */
export const getLeastNumbers = (nums: number[], k: number): number[] => {
  if (k === 0 || nums.length === 0) return []

  /** 创建大顶堆 */
  const maxHeap = new Heap('max')

  // 先填充大小为 k 的最大堆
  for (let i = 0; i < k; i++) maxHeap.insert(nums[i])

  // 对数组中的剩余元素与堆中元素对比，如果比堆顶元素小，则替换堆顶元素
  for (let i = k; i < nums.length; i++) {
    if (nums[i] < maxHeap.top!) {
      maxHeap.extract()
      maxHeap.insert(nums[i])
    }
  }

  return maxHeap.getHeap.reverse()
}

/** 示例 */
logger.warn('最小的 K 个数', getLeastNumbers.name)
console.log(getLeastNumbers([4, 5, 1, 6, 2, 7, 3, 8], 4)) // [1,2,3,4]
