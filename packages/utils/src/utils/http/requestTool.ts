/**
 * @ Author: willysliang
 * @ Create Time: 2023-01-25 10:31:55
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-01 10:09:32
 * @ Description: 请求的工具类
 */

export const urlMap = {
  API: {
    prefix: 'api',
    url: 'http://localhost:4000',
  },
  MOCK: {
    prefix: 'mock',
    url: 'http://localhost:4002',
  },
  DEFAULT: {
    prefix: 'default',
    url: 'http://localhost:3999',
  },
} as const

/** 是否为 开发环境 | 生产环境 */
export const isDev = import.meta.env.MODE === 'development'

/**
 * 自动匹配接口前缀
 * @params prefix 接口前缀
 * @params isDev 是否为开发环境（否则为正式环境）
 */
export const autoMathPrefix = (prefix: string): string => {
  // 开发环境，通过 proxy 配置转发请求
  if (isDev) {
    return ``
  }

  // 生产环境根据实际配置 prefix 匹配 url
  // 配置来源 根据实际应用场景更改配置（1.全局读取，2.线上配置中心读取）
  for (const key in urlMap) {
    if (urlMap[key].prefix === prefix) {
      return urlMap[key].url
    }
  }

  // 防止未找到返回值
  return urlMap.DEFAULT.url
}
