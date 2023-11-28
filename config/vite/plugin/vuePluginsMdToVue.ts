/**
 * @ Author: willy
 * @ Create Time: 2023-11-23 16:12:21
 * @ Modifier by: willy
 * @ Modifier time: 2023-11-28 09:58:23
 * @ Description: 用于导出 md 转成 vue 的 vite 插件
 */

import { createFilter } from '@rollup/pluginutils'

interface IMdToVuePluginReturnType {
  name: string
  /**
   * @function 转换函数
   * @param {string} code 表示要转换的模块的源代码，包含了模块的原始内容
   * @param {string} path 表示模块的标识符，用于唯一标识模块的路径或名称
   * @returns {unknow}
   */
  transfrom: (code: string, path: string) => unknown
}

export const markdownTemplatePlugin = (): IMdToVuePluginReturnType => {
  return {
    name: 'markdown-template',
    transfrom: (code, path) => {
      // 在 transfrom 中进行 md 的转换
      if (path.endsWith('.md')) {
        const filter = createFilter(['**/*.md'])
        if (filter(path)) {
          code = code.replace(/&(\w+)/g, '$1')
        }
        return code
      }
    },
  }
}
