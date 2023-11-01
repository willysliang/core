/**
 * @ Author: willy
 * @ Create Time: 2023-11-01 15:31:40
 * @ Modifier by: willy
 * @ Modifier time: 2023-11-01 15:32:00
 * @ Description: pinia 全局状态管理
 */

import type { App } from 'vue'
import { createPinia } from 'pinia'

const store = createPinia()

export function setupStore(app: App<Element>) {
  app.use(store)
}

export default store
