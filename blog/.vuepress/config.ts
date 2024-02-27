/**
 * @ Author: willy
 * @ CreateTime: 2024-02-26 19:19:37
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-27 17:42:20
 * @ Description: 配置文件
 */

import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
// import theme from './theme/theme'
import theme from './theme/defaultTheme'

export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
  theme,

  lang: 'zh-CN',
  title: 'BLOG',
  description: 'This is my first vuepress site.',
})
