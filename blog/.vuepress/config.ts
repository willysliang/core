/**
 * @ Author: willy
 * @ CreateTime: 2024-02-26 19:19:37
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-03-18 17:02:50
 * @ Description: 配置文件
 */

import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import theme from './theme/defaultTheme'

const BASEURL = '/blog/'

export default defineUserConfig({
  head: [
    // 引入你的图标文件
    ['link', { rel: 'icon', href: `${BASEURL}logo__icon--default.png` }],
    [
      'link',
      { rel: 'stylesheet', type: 'text/css', href: `${BASEURL}styles.css` },
    ],
  ],

  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
  theme,

  base: BASEURL,
  port: 8080,

  lang: 'zh-CN',
  title: 'Mr.Willy',
  description: 'This is willysliang blog site.',
})
