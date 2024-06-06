/**
 * @ Author: willy
 * @ CreateTime: 2024-06-06 17:51:19
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-06 17:58:57
 * @ Description: element-plus 相关插件
 */

import { PluginOption } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

/**
 * 打包优化相关
 */
export const elementUiPlugins = (): PluginOption[] => {
  return [
    /* 配置 element-plus */
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'pinia'],
      eslintrc: {
        enabled: true, // <-- this
      },
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ]
}
