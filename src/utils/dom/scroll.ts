/**
 * @ Author: willysliang
 * @ Create Time: 2024-01-07 22:06:57
 * @ Modified by: willysliang
 * @ Modified time: 2024-01-07 22:11:07
 * @ Description: 滚动相关 DOM 的工具类
 */

/**
 * @descption 是否滚动到底部
 */
export const isScrollAtBottom = (): boolean =>
  document.documentElement.clientHeight + window.scrollY >=
  document.documentElement.scrollHeight

/**
 * @descption 检查元素是否可滚动
 */
export const isScrollable = (ele: HTMLElement): boolean => {
  // 比较高度以查看元素是否具有可滚动内容
  const hasScrollableContent = ele.scrollHeight > ele.clientHeight

  // 考虑元素的 overflow-y 样式是否设置为 hidden 或 hidden !important
  // 在这些情况下，不会显示滚动条。
  const overflowYStyle = window.getComputedStyle(ele).overflowY
  const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1

  return hasScrollableContent && !isOverflowHidden
}
