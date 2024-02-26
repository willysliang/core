/**
 * @ Author: willy
 * @ CreateTime: 2024-02-26 15:02:35
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-26 15:08:07
 * @ Description: vue 解析核心
 */

import { PluginOption } from 'vite'
import createVuePlugin from '@vitejs/plugin-vue'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
/** 获取 git 分支名 */
import { execSync } from 'child_process'

const vuePlugin = createVuePlugin({ include: [/\.vue$/, /\.md$/] })

/** 获取 git 分支名 */
const getGitBranch = (): string => {
  /** git 分支名：默认为开发分支 */
  let branchName = 'development'
  try {
    branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
  } catch {}
  return branchName
}

export const baseVuePlugin = (importMetaEnv, packageJSON): PluginOption[] => {
  return [
    vuePlugin,
    vueJsxPlugin({}),
    ViteEjsPlugin({
      /** 项目运行模式 */
      PROJ_ENV: importMetaEnv.VITE_PROJ_ENV,
      /** 项目名称 */
      PROJ_TITLE: packageJSON.title,
      /** git 分支名 */
      BRANCH_NAME: getGitBranch(),
    }),
  ]
}
