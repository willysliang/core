/**
 * @ Author: willy
 * @ CreateTime: 2024-06-17 15:41:40
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-17 17:22:50
 * @ Description: 测试用的插件
 */

import { extname } from 'node:path'
import type { Plugin, PluginOption } from 'vite'
import picColors from 'picocolors'

/**
 * @function vitePluginSummary 按文件后缀名对文件分类记录，并统计代码行数
 */
export const vitePluginSummary = (): Plugin => {
  /** 存储文件后缀名，跟相应的文件名集合 */
  const extnameMap = new Map<string, Set<string>>()
  /** 代码行数 */
  let totalCodeLine = 0

  /** 打包开始时触发的钩子 */
  const buildStart = () => {
    extnameMap.clear()
    totalCodeLine = 0
  }

  /** 读取具体文件触发的钩子 */
  const load = (importee: string) => {
    // 忽略 node_modules 和 vite 内置添加的内容
    // eslint-disable-next-line no-control-regex
    if (/node_modules|\x00/.test(importee)) return null

    /**
     * 文件名可能会被携带上请求参数。如：/core/index.ts?v=1.0.0
     * 期望的结果是：/core/index.ts （注：断定文件或文件名不可能使用 `?` 符号命名）
     */
    const importeeRemoveQuery = importee?.replace(/\?.*$/, '')

    /** 文件后缀名 */
    const ext = extname(importeeRemoveQuery)

    extnameMap.set(
      ext,
      extnameMap.has(ext)
        ? extnameMap.get(ext)!.add(importeeRemoveQuery)
        : new Set<string>().add(importeeRemoveQuery),
    )

    totalCodeLine++

    return null
  }

  /** 对在 load 钩子中获取到的内容给 transfrom 钩子处理 */
  const transform = (code: string, id: string) => {
    // 对 Map 中存储的文件名列表进行扁平化
    const cacheExtArr = Array.from(extnameMap.values()).reduce(
      (pre: string[], cur: Set<string>) => {
        pre.push(...cur)
        return pre
      },
      [],
    )

    // 如果文件名在扁平化后的列表中，说明该文件是需要被缓存的文件，累加代码行数
    if (cacheExtArr.includes(id)) {
      totalCodeLine += (code.split('\n') || []).length
    }
    return code
  }

  /** 结束打包后触发的钩子 */
  const closeBundle = () => {
    const { green, blue, cyan } = picColors
    for (const [key, extSet] of extnameMap.entries()) {
      console.log(`${green(key)}'s num is ${blue(extSet.size)}`)
    }
    console.log(`the total code line is ${cyan(totalCodeLine)}`)
  }

  return {
    name: 'vite-plugin-summary',
    // 在其他 transfrom 函数钩子前执行，防止内容被其他 transfrom 函数修改
    enforce: 'pre',
    buildStart,
    load,
    transform,
    closeBundle,
  }
}

export const demoPlugins: PluginOption[] = [vitePluginSummary()]
