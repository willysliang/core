/// <reference types="vite/client" />

/**
 * import.meta.env 中相关定义
 */
export interface ImportMetaEnv {
  /** 环境类型：开发环境、预发布环境、生产环境 */
  readonly VITE_APP_ENV: 'development' | 'staging' | 'production'
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv
}
