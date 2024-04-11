/**
 * @ Author: willy
 * @ CreateTime: 2024-04-07 11:36:05
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-07 11:56:06
 * @ Description: 哈希表 - HashTable
 */

import { logger } from '../utils'

/** **************************************************************************************** */
/** ----------------------------------- 字符流中第一个不重复的字符 ------------------------------------------ */
/** **************************************************************************************** */
/**
  题目: 字符流中第一个不重复的字符
    请实现一个函数用来找出字符流中第一个只出现一次的字符。
    例如:
      - 当从字符流中只读出前两个字符"go"时，第一个只出现一次的字符是"g"。
      - 当从该字符流中读出前六个字符"google"时，第一个只出现一次的字符是"l"。
      - 如果当前字符流没有存在出现一次的字符，返回'#'字符。
  思路:
    要求是获得第一个出现，且只出现一次的
    错误解法：
      - 使用一个有序的存储结构(Object/Map)为每个数字计数，再遍历整个对象，第一个出现次数为 1 的即为结果。
      - 因为对象遍历在所有浏览器中的实现并不是都是有序的，而且直接使用对象存储，当字符流中出现数字时也会有问题。
    正确解法：
      通过维护一个字符出现次数的哈希表和一个队列来实现。哈希表用于记录每个字符出现的次数，而队列用于记录字符出现的顺序。
      每次读取一个字符，都更新哈希表，并检查队列的前端字符是否仍然只出现一次，如果不是，则从队列中移除，直到队列的前端字符是只出现一次的字符。
 */
/**
 * @class FirstUniqueCharInStream
 * 字符流中第一个不重复的字符
 */
export class FirstUniqueCharInStream {
  private charCount: Map<string, number>
  private queue: Array<string>

  constructor(initQueue: string[] = []) {
    this.charCount = new Map<string, number>()
    this.queue = initQueue

    // 初始化时如果有数据，则需要处理
    if (initQueue.length) {
      initQueue.forEach((char) => this.readChar(char))
    }
  }

  /** 处理每个来自字符流的字符 */
  public readChar(char: string): void {
    if (this.charCount.has(char)) {
      this.charCount.set(char, this.charCount.get(char)! + 1)
    } else {
      this.charCount.set(char, 1)
      this.queue.push(char)
    }

    // 清除队列中不再是唯一的字符
    while (this.queue.length && this.charCount.get(this.queue[0])! > 1) {
      this.queue.shift()
    }
  }

  /** 获取当前字符流中第一个只出现一次的字符 */
  get getFirstUniqueChar(): string | null {
    if (this.queue.length) return this.queue[0]
    return null
  }
}

logger.warn('字符流中第一个不重复的字符', FirstUniqueCharInStream.name)
const stream = new FirstUniqueCharInStream(['a', 'b', 'a'])
console.log("['a', 'b', 'a'] =>", stream.getFirstUniqueChar) // 输出 'b'，因为 'b' 是目前为止唯一出现一次的字符
stream.readChar('c')
console.log("['a', 'b', 'a', 'c'] =>", stream.getFirstUniqueChar) // 输出 'b'
stream.readChar('b')
console.log("['a', 'b', 'a', 'c', 'b'] =>", stream.getFirstUniqueChar) // 输出 'c'
