/**
 * @ Author: willy
 * @ CreateTime: 2024-02-26 15:11:26
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-26 15:24:34
 * @ Description: md 相关插件
 */

import { PluginOption } from 'vite'
import markdown from 'vite-plugin-md'

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
        const template = `<template>\n${code}\n</template>`
        return template
      }
    },
  }
}

export const mdPlugins = (): PluginOption[] => {
  return [markdownTemplatePlugin(), markdown()]
}
