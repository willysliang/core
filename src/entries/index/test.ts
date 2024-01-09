/**
 * @ Author: willysliang
 * @ Create Time: 2024-01-07 20:50:16
 * @ Modified by: willysliang
 * @ Modified time: 2024-01-07 22:34:56
 * @ Description: 测试
 */

/** 链表单个节点数据字段约束 */
interface ILinkedNode<T = number> {
  next: ILinkedNode<T> | null
  value: T
}

/** 当前节点数据字段约束 */
type ICurListNode<T = number> = null | ILinkedNode<T>

/** 链表节点类 */
export class ListNode<T = number> implements ILinkedNode<T> {
  next: ICurListNode<T>
  value: T

  constructor(nodeValue: T, next: ICurListNode<T> = null) {
    this.next = next
    this.value = nodeValue
  }
}

/**
 * 约瑟夫环问题
 * @param {number} n 参与游戏的总人数
 * @param {number} m 每报数到 m 的人出列
 * @returns {number} 存活的人的编号（仅能剩下一个人）
 */
function josephus(n: number, m: number): number {
  /** 边界条件 */
  if (n < 1 || m < 1) return -1

  const head: ICurListNode = new ListNode(1)
  let current: ICurListNode = head

  // 循环生成长度为 n 的链表
  for (let i = 2; i <= n; i++) {
    current.next = new ListNode(i)
    current = current.next
  }

  // 构成环状链表
  current.next = head

  /** 指针的前一个节点 */
  let prev: ICurListNode = current
  /** 计数值 */
  let count: number = 0
  /** 当前指针 */
  let cur: ICurListNode = head

  /** 直到只有一个节点为止 */
  while (cur !== cur.next) {
    if (++count === m) {
      // 每当报数到达 m 时，就将当前节点从链表中移除（通过修改前一个节点的指针），并将计数器重置为 0
      prev.next = cur.next
      count = 0
    } else {
      // 如果报数未达到 m，就简单地将当前节点指针移动到下一个节点。
      prev = cur
    }

    // 指针后移
    cur = cur.next as ListNode<number>
  }

  return cur.value
}

/**
 * 约瑟夫环问题
 * @param {number} n 参与游戏的总人数
 * @param {number} m 每报数到 m 的人出列
 * @returns {number} 存活的人的编号（可剩下多个人）
 */
function josephusAsArr(n, m) {
  const persons = Array.from({ length: n }).map((_, idx) => idx + 1)

  let index = 0
  //   while (persons.length > 1) {
  while (persons.length >= m) {
    index = ((index + m) % persons.length) - 1
    if (index >= 0) {
      persons.splice(index, 1)
    } else {
      persons.splice(persons.length - 1, 1)
      index = 0
    }
  }

  return persons
}

/** 测试代码 */
console.log(josephus(11, 3), josephusAsArr(11, 3)) // 输出：4
