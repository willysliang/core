/**
 * @ Author: willysliang
 * @ CreateTime: 2024-04-13 12:58:42
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-04-13 13:11:43
 * @ Description: 查询DOM
 */

/**
 * @class SearchDom 查询 DOM 元素
 * @memberof SearchDom.getParentsUntil 查找元素的所有祖先
 * @memberof SearchDom.getSiblingElements 获取包含给定元素的所有同级标签
 */
export class SearchDom {
  /**
   * @function getParentsUntil 查找元素的所有祖先
   * @description 查找元素的所有祖先，直到元素与指定的选择器匹配为止
   * @param {HTMLElement} el - 所要查找的元素
   * @param {string[]} selector - 所要查找的父元素的标签名称
   * @example getParentsUntil(document.querySelector('#app'), 'html') // [html, body]
   */
  public getParentsUntil(el: HTMLElement | null, selector: string): string[] {
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
   * @method getSiblingElements 获取包含给定元素的所有同级标签
   * @param element DOM节点
   * @returns {ChildNode[]}
   * @example
   *    getSiblingElements(document.querySelector('head')) // ['body']
   */
  public getSiblingElements(element: HTMLElement | null): ChildNode[] {
    if (element === null) return []
    return [...element.parentNode!.childNodes].filter(
      (node) => node !== element,
    )
  }
}

export const searchDom = new SearchDom()
