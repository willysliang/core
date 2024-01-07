/**
 * @ Author: willysliang
 * @ Create Time: 2024-01-07 22:19:48
 * @ Modified by: willysliang
 * @ Modified time: 2024-01-07 23:03:49
 * @ Description: dom 相关的工具类
 */

/**
 * 检查元素是否在可视区域（视口）内
 * @param ele DOM节点
 * @returns {boolean}
 */
export const isInViewport = function (ele: HTMLElement): boolean {
  const rect = ele.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * @description 查找元素的所有祖先，直到元素与指定的选择器匹配为止
 * @param {HTMLElement} el - 所要查找的元素
 * @param {string} selector - 所要查找的父元素的标签名称
 * @example getParentsUntil(document.querySelector('#app'), 'html') // [html, body]
 */
export const getParentsUntil = (el: HTMLElement | null, selector: string) => {
  const parents: string[] = []
  let _el: any = el?.parentNode ?? null

  // 循环向上移动元素的祖先树
  while (_el && typeof _el.matches === 'function') {
    // 将每个新祖先添加到数组的开头
    parents.unshift(_el)
    // 检查当前元素是否与指定的选择器匹配
    if (_el.matches(selector)) return parents
    else _el = _el.parentNode
  }
  return []
}

/**
 * 获取包含给定元素的所有同级标签
 * @param element DOM节点
 * @returns {ChildNode[]}
 * @example
 *    getSiblingElements(document.querySelector('head')) // ['body']
 */
export const getSiblingElements = (
  element: HTMLElement | null,
): ChildNode[] => {
  if (element === null) return []
  return [...element.parentNode!.childNodes].filter((node) => node !== element)
}
