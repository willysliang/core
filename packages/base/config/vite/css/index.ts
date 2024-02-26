/**
 * @ Author: willy
 * @ CreateTime: 2024-02-26 15:18:16
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-26 15:46:30
 * @ Description: css 相关配置
 */

import { CSSOptions } from 'vite'
/**
 * postcss 解析
 */
import autoprefixer from 'autoprefixer'
import postCssPxToRem from 'postcss-pxtorem'

export const cssConfig = (): CSSOptions => {
  return {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            'Android 4.1',
            'iOS 7.1',
            'Chrome > 31',
            'ff > 31',
            'ie >= 8',
          ],
        }),
        postCssPxToRem({
          // 自适应，px>rem转换
          rootValue: 75, // 75表示750设计稿，37.5表示375设计稿
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
          selectorBlackList: ['.willy', '.px', 'body', 'html'], // 过滤掉 willy- 开头的 class，不进行rem转换
          exclude: '../../../node_modules', // 忽略包文件转换rem
        }),
      ],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "./src/styles/var.scss" as *;
        `,
      },
    },
  }
}
