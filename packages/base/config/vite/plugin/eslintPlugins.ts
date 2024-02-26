/**
 * @ Author: willy
 * @ CreateTime: 2024-02-26 15:29:14
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-26 15:36:28
 * @ Description: eslint 相关
 */

import { PluginOption } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import checkerEslint from 'vite-plugin-checker'

export const eslintPlugins = (): PluginOption[] => {
  return [
    /* eslint取消缓存 */
    eslintPlugin({
      cache: false, // 禁用 eslint 缓存
    }),
    /* eslint自动校检 */
    checkerEslint({
      vueTsc: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,vue}"',
      },
    }),
  ]
}
