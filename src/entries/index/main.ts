/**
 * @ Author: willy
 * @ Create Time: 2023-11-01 16:25:03
 * @ Modifier by: willy
 * @ Modifier time: 2023-11-07 16:45:28
 * @ Description: 入口文件
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

// import 'amfe-flexible'
import '@/styles/index.scss'

const app = createApp(App)

async function setupApp() {
  app.use(store)

  app.use(router)

  app.mount('#app')
}

await setupApp()
