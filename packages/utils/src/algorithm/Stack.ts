/**
 * @ Author: willy
 * @ CreateTime: 2024-04-07 14:53:55
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-07 15:27:33
 * @ Description: 栈 - Stack
 */

import { logger } from '../utils'

/**
 * @class Stack
 * 栈的基本操作
 */
export class Stack<T = number> {
  private storage: T[] = []

  /** 入栈操作 */
  public push(item: T): void {
    this.storage.push(item)
  }

  /** 出栈操作 */
  public pop(): T | undefined {
    return this.storage.pop()
  }

  /** 查看栈顶 */
  get peek(): T | undefined {
    return this.storage.at(-1)
  }

  /** 检查栈是否为空 */
  get isEmpty(): boolean {
    return this.storage.length === 0
  }

  /** 获取栈的大小(元素数量) */
  get size(): number {
    return this.storage.length
  }

  /** 清空栈 */
  public clear(): void {
    this.storage = []
  }

  /** 输出栈 */
  public print(): void {
    console.log(this.storage.toString())
  }
}

logger.warn('栈(Stack)的类模板', Stack.name)
const stack = new Stack<number>()
console.log(stack.isEmpty) // true
stack.push(1)
stack.push(2)
stack.print() // 1,2
console.log(stack.peek) // 2
console.log(stack.pop()) // 2
console.log(stack.size) // 1
console.log(stack.isEmpty) // false

/**
 * @class MinStack 包含min函数的栈
 * @description 定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））。
 */
export class MinStack<T = number> {
  public stack: T[] = []
  public minStack: T[] = []

  /** 入栈 */
  public push(value: T): void {
    this.stack.push(value)
    // 如果 minStack 为空，或新元素比 minStack 栈顶元素小，则将新元素推入 minStack 中
    if (!this.minStack.length || value <= this.minStack.at(-1)!) {
      this.minStack.push(value)
    }
  }

  /** 出栈 */
  public pop(): void {
    const value = this.stack.pop()
    // 如果 stack 出栈的元素等于 minStack 栈顶元素，则将 minStack 出栈
    if (value === this.minStack.at(-1)) {
      this.minStack.pop()
    }
  }

  /** 查看栈顶元素 */
  public top(): T | undefined {
    return this.stack.at(-1)
  }

  /** 获取栈中的最小元素 */
  public min(): T | undefined {
    return this.minStack.at(-1)
  }
}

logger.warn('包含min函数的栈', MinStack.name)
const minStack = new MinStack()
;[3, 4, 2, 7, 9, 0].forEach((value) => minStack.push(value))
console.log(minStack.stack, minStack.minStack) // [3, 4, 2, 7, 9, 0], [3, 2, 0]
console.log(minStack.min()) // 应输出 0
minStack.pop()
console.log(minStack.top()) // 应输出 9
console.log(minStack.min()) // 应输出 2
