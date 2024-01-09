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
 * 用来删除重复链表节点
 * @param {ICurListNode<T>} head - 链表的头节点
 * @returns {ICurListNode<T>} 删除重复节点后的链表头节点
 */
function deleteDuplicatesNode<T = number>(
  head: ICurListNode<T>,
): ICurListNode<T> {
  /** 如果是链表为空 或 链表只有一个节点，则直接返回 */
  if (head === null || head.next === null) return head

  const listNodeMap = new Map<T, boolean>()
  let currentNode: ICurListNode<T> = head
  let prev: ICurListNode<T> = null

  while (currentNode !== null) {
    if (listNodeMap.has(currentNode.value)) {
      // 删除重复节点
      prev!.next = currentNode.next
    } else {
      listNodeMap.set(currentNode.value, true)
      prev = currentNode
    }

    currentNode = currentNode.next
  }

  return head
}

/** 测试用例 */
// 创建链表
const node1 = new ListNode(1)
const node2 = new ListNode(2)
const node3 = new ListNode(2)
const node4 = new ListNode(3)
node1.next = node2
node2.next = node3
node3.next = node4

// 调用函数删除重复节点
const newHead = deleteDuplicatesNode(node1)
console.log(newHead)
