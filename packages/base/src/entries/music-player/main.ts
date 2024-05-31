/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 09:05:41
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-04 18:40:51
 * @ Description: 入口文件
 */

import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'
import router from './router'

import 'element-plus/dist/index.css'
import { setupI18n } from '@/locales'
import {
  setupAssets,
  setupElementUI,
  setupCustomComponents,
  setupGlobalMethods,
} from '@/config/plugins'

const app = createApp(App)

function setupPlugins() {
  /** 引入静态资源 */
  setupAssets()

  /** 引入 element UI 组件库 */
  setupElementUI(app)

  /** 挂载全局组件 */
  setupCustomComponents(app)

  /** 注入全局方法 */
  setupGlobalMethods(app)
}

async function setupApp() {
  app.use(store)

  /** 挂载 i18n 语言国际化 */
  await setupI18n(app)

  app.use(router)

  app.mount('#app')
}

setupPlugins()
setupApp()
