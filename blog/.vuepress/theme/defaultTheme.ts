/**
 * @ Author: willy
 * @ CreateTime: 2024-02-27 17:39:40
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-29 10:21:14
 * @ Description: 默认主题
 */

import { defaultTheme } from '@vuepress/theme-default'
import navConfig from '../configs/nav'

export default defaultTheme({
  // logo: 'https://vuejs.org/images/logo.png',
  logo: '/logo__icon--dark.png',
  repo: 'https://github.com/willysliang/core.git',
  repoLabel: 'GitHub',
  // home: '/PAGES/HOME.md',
  navbar: navConfig,
  sidebar: 'auto',
  sidebarDepth: 4,
  colorMode: 'dark',

  editLink: true,
  editLinkText: '编辑此页',
  lastUpdated: true,
  lastUpdatedText: '更新时间',
  contributors: true,
  contributorsText: '贡献者',
  notFound: [
    '这里什么都没有',
    '我们怎么到这来了？',
    '这是一个 404 页面',
    '看起来我们进入了错误的链接',
  ],
  backToHome: '返回首页',

  // a11y
  openInNewWindow: '在新窗口打开',
  toggleSidebar: '切换侧边栏',

  // 文档编辑
  docsRepo: 'https://github.com/willysliang/core',
  docsBranch: 'master',
  docsDir: 'blog',
  editLinkPattern: ':repo/edit/:branch/:path',
})
