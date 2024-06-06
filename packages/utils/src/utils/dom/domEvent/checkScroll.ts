/**
 * @ Author: willysliang
 * @ CreateTime: 2024-04-13 13:20:50
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-05 11:46:14
 * @ Description: 检查滚动相关
 */

/**
 * @class CheckScroll 检查滚动相关
 * @memberof CheckScroll.isScrollable 检查元素是否可滚动
 * @memberof CheckScroll.isScrollAtBottom 检查元素是否滚动到底部
 */
export class CheckScroll {
  /**
   * @descption 检查元素是否可滚动
   */
  public isScrollable(ele: Element): boolean {
    // 比较高度以查看元素是否具有可滚动内容
    const hasScrollableContent = ele.scrollHeight > ele.clientHeight

    // 考虑元素的 overflow-y 样式是否设置为 hidden 或 hidden !important
    // 在这些情况下，不会显示滚动条。
    const overflowYStyle = window.getComputedStyle(ele).overflowY
    const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1

    return hasScrollableContent && !isOverflowHidden
  }

  /**
   * @descption 检查元素是否滚动到底部
   */
  public isScrollAtBottom(): boolean {
    return (
      document.documentElement.clientHeight + window.scrollY >=
      document.documentElement.scrollHeight
    )
  }
}

export const checkScroll = new CheckScroll()
