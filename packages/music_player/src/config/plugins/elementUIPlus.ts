/**
 * @ Author: willysliang
 * @ Create Time: 2022-11-04 17:47:07
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-04 17:50:01
 * @ Description: elementUI Plus 组件库引入的相关配置
 */

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App } from 'vue'

export function setupElementUI (app: App) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  app.use(ElementPlus)
}
