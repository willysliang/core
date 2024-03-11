/**
 * @ Author: willysliang
 * @ Create Time: 2022-11-04 18:37:54
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-08 17:24:34
 * @ Description: 全局方法的配置
 */

import type { App } from 'vue'
import '@util/globalExtend'

/**
 * 注册全局方法
 * @param app
 */
export function setupGlobalMethods (app: App) {
  // 全局挂载Reflect反射对象,以便在vue模板中使用
  app.config.globalProperties.Reflect = Reflect
}
