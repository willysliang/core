/**
 * @ Author: willy
 * @ CreateTime: 2024-02-26 15:00:58
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-26 15:45:34
 * @ Description: md 插件
 */

import fs from 'fs'
import path from 'path'

/**
 * 优化：多页面应用，动态识别构建
 * 读取根目录下的所有 HTML 文件作为键值对存储，以便构建时动态输出
 */
export const getAllBuildHtml = (): Record<string, string> => {
  const pages: Record<string, string> = {}
  const pageDir = path.join(__dirname, '../../../')
  fs.readdirSync(pageDir).forEach((file) => {
    if (file.endsWith('.html')) {
      const name = file.replace(/\.html$/, '')
      const filePath = path.join(pageDir, file)
      pages[name] = filePath
    }
  })
  return pages
}
