/**
 * @ Author: willysliang
 * @ Create Time: 2022-11-04 17:53:34
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-04 18:15:44
 * @ Description: 全局注册自定义组件
 */

import type { App } from 'vue'
import IconPark from '@/components/common/IconPark.vue'

/**
 * 全局注册自定义组件
 * @param app
 */
export function setupCustomComponents (app: App) {
  // app.component(IconPark.name, IconPark)
  app.component('IconPark', IconPark)
}
