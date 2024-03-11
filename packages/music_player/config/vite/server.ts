import {
  API_BASE_URL,
  API_TARGET_URL,
  MOCK_API_BASE_URL,
  MOCK_API_TARGET_URL,
  VITE_PORT,
} from '../constant'
import { ProxyOptions, ServerOptions } from 'vite';
type ProxyTargetList = Record<string, ProxyOptions>;

const proxyInit: ProxyTargetList = {
  // server
  [API_BASE_URL]: {
    target: API_TARGET_URL,
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${API_BASE_URL}`), ''),
  },
  // mock
  [MOCK_API_BASE_URL]: {
    target: MOCK_API_TARGET_URL,
    changeOrigin: true,
    rewrite: (path) =>
      path.replace(new RegExp(`^${MOCK_API_BASE_URL}`), '/api'),
  },
}

const serverInit: ServerOptions = {
  // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
  hmr: {
    overlay: false
  },

  // 服务配置
  port: VITE_PORT, // 类型： number 指定服务器端口;
  open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
  cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
  host: '0.0.0.0', // IP配置，支持从IP启动

  // 设置 https 代理
  proxy: proxyInit,
}

export default serverInit
