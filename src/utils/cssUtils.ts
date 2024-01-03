/**
 * @ Author: willy
 * @ CreateTime: 2024-01-03 15:22:53
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-03 17:16:59
 * @ Description: css 相关的工具类
 */

/**
 * @method createBEM - 创建 BEM 类名
 * @param {string} block - 块
 * @param {string} [element] - 元素
 * @param {string} [prefix] - 前缀
 * @param {string | string[]} [modifys] - 修饰符
 * @returns {string}
 *
 * @example 不定义 element
 * const bem = createBEM('button')
 * bem() // 'w-button
 * bem('disabled') // 'w-button--disabled'
 * bem(['diabled', 'primary]) // 'w-button--disabled w-button--primary'
 *
 * @example 定义 element
 * const bem = createBEM('button', 'text')
 * bem() // 'w-button__text'
 * bem('disabled') // 'w-button__text--disabled'
 * bem(['disabled', 'primary']) // 'w-button__text--disabled w-button__text--primary'
 */
export const createBEM = (
  block: string,
  element: string = '',
  prefix: string = 'w',
) => {
  return (modifys?: string | string[]): string => {
    const B = prefix ? `${prefix}-${block}` : block
    const BE = element ? `${B}__${element}` : block

    // 数组 & 长度大于0
    if (Array.isArray(modifys) && modifys.length > 0) {
      const BEMS: string[] = []
      modifys.forEach((modify) => {
        BEMS.push(`${BE}--${modify}`)
      })
      return BEMS.join(' ')
    }

    // 字符串 & 长度大于0
    if (typeof modifys === 'string' && modifys.length > 0) {
      return `${BE}--${modifys}`
    }

    // 数组&长度为0 || 字符串&长度为0 || 未定义undefined
    return `${BE}`
  }
}

export type BEM = ReturnType<typeof createBEM>
