/**
 * @ Author: willysliang
 * @ CreateTime: 2024-04-13 13:25:13
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-04-13 13:25:36
 * @ Description: JS操作CSS样式
 */

/**
 * @class OpeateCss 操作样式表
 * @memberof OpeateCss.removeAllCssStyle 删除所有CSS样式
 */
export class OperateCss {
  /**
   * @descption 从页面中删除所有 CSS 样式（包括内联样式和链接的CSS）
   */
  public removeAllCssStyle(): void {
    document
      .querySelectorAll('style,link[rel="stylesheet"]')
      .forEach((item) => item.remove())
  }
}

export const operateCss = new OperateCss()
