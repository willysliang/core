/**
 * @ Author: willysliang
 * @ Create Time: 2023-01-12 14:09:49
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-12 14:14:02
 * @ Description: useMutationObserver 检查页面的水印是否被删除
 */

import { onMounted } from 'vue'

/** 检查页面的水印是否被删除 */
export const useMutationObserver = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const DOMHandler: MutationCallback = (mutationList, observer) => {
    mutationList.forEach((mutation) => {
      const { target, nextSibling, removedNodes } = mutation
      // 如果列表不为空，说明触发操作的动作是删除
      if (mutation.removedNodes.length) {
        if (nextSibling) {
          // 如果存在下一个相邻子节点执行插入
          // console.log('恢复被删除的节点')
          target.insertBefore(removedNodes[0], nextSibling)
        } else {
          // 直接添加到 target 的末尾
          target.appendChild(removedNodes[0])
        }
      }
    })
  }

  onMounted(() => {
    const observer = new MutationObserver(DOMHandler)
    const node = document.body
    observer.observe(node, { attributes: true, childList: true, subtree: true })
  })
}
