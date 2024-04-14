/**
 * @ Author: willysliang
 * @ Create Time: 2024-01-07 22:19:48
 * @ Modified by: willysliang
 * @ Modified time: 2024-01-07 23:03:49
 * @ Description: dom 相关的工具类
 */

/**
 * @class checkDom 检查DOM 元素
 * @memberof CheckDom.isInViewport 检查元素是否在可视区域（视口）内
 */
export class CheckDom {
  /**
   * 检查元素是否在可视区域（视口）内
   * @param ele DOM节点
   * @returns {boolean}
   */
  public isInViewport(ele: HTMLElement): boolean {
    const rect = ele.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }
}

export const checkDom = new CheckDom()
