/**
 * @ Author: willy
 * @ CreateTime: 2024-04-02 15:48:03
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-02 19:40:17
 * @ Description: 堆 - Heap
 */

import { logger } from '../utils/index'

/**
 * @class Heap
 * 堆(Heap)的类模板，包括大顶堆和小顶堆的基本操作
 */
export class Heap<T = number> {
  /** 存储的堆元素的数组 */
  private heap: T[]
  /** 比较函数，确定堆的类型（大顶堆或小顶堆） */
  private compare: (a: T, b: T) => boolean

  constructor(heapType: 'max' | 'min' = 'max') {
    this.heap = []
    const maxCompareFn = (a, b) => a > b
    const minCompareFn = (a, b) => a < b
    this.compare = heapType === 'max' ? maxCompareFn : minCompareFn
  }

  /** 堆的大小 */
  get size(): number {
    return this.heap.length
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
const maxHeap = new Heap('max')
maxHeap.insert(3)
maxHeap.insert(4)
maxHeap.insert(1)
console.log(maxHeap.extract()) // 4

console.log('创建小顶堆示例 --->')
const minHeap = new Heap('min')
minHeap.insert(3)
minHeap.insert(4)
minHeap.insert(1)
console.log(minHeap.extract()) // 1
