/**
 * @ Author: willy
 * @ CreateTime: 2024-02-26 15:33:35
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-06 17:55:41
 * @ Description: 打包优化的插件
 */

import { PluginOption } from 'vite'

/**
 * 打包优化相关
 */
/** vite 打包压缩 gzip */
import viteCompression from 'vite-plugin-compression'

export const buildPlugins = (): PluginOption[] => {
  return [
    viteCompression({
      verbose: true, // 默认即可
      disable: false, // 开启压缩(不禁用)，默认即可
      deleteOriginFile: false, // 删除源文件
      threshold: 10240, // 压缩前最小文件大小
      algorithm: 'gzip', // 压缩算法
      ext: '.gz', // 文件类型
    }),
  ]
}
