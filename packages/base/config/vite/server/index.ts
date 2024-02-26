/**
 * @ Author: willy
 * @ CreateTime: 2024-02-26 15:12:21
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-26 15:17:05
 * @ Description: server 相关配置
 */

import { ServerOptions } from 'vite'

const API_BASE_URL = '/api'
const API_TARGET_URL = 'http://localhost:4000'

export const serverConfig = (
  VITE_PORT: string | number = 4000,
): ServerOptions => {
  return {
    // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
    hmr: {
      overlay: false,
    },

    // 服务配置
    port: Number(VITE_PORT), // 类型： number 指定服务器端口;
    open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
    cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
    host: '0.0.0.0', // IP配置，支持从IP启动

    // 设置 https 代理
    proxy: {
      [API_BASE_URL]: {
        target: API_TARGET_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp(`^${API_BASE_URL}`), ''),
      },
    },
  }
}
