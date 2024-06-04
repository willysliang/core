/**
 * @ Author: willysliang
 * @ Create Time: 2023-01-24 17:50:27
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-04 18:03:17
 * @ Description: http 状态码
 */

import { logger } from '../common'

/** 错误码解析 */
export const errorMessage = (
  status: unknown,
  mes = '',
): { status: unknown; msg: string } => {
  let errorInfo = ''
  switch (status) {
    case 400:
      errorInfo = '请求错误(400)'
      break
    case 401:
      errorInfo = '未授权，请重新登录(401)'
      break
    case 403:
      errorInfo = '拒绝访问(403)'
      break
    case 404:
      errorInfo = '资源不存在(404)'
      break
    case 405:
      errorInfo = '请求未允许(405)'
      break
    case 408:
      errorInfo = '请求超时(408)'
      break
    case 500:
      errorInfo = '访问服务失败(500)'
      break
    case 501:
      errorInfo = '服务未实现(501)'
      break
    case 502:
      errorInfo = '无效网关(502)'
      break
    case 503:
      errorInfo = '服务不可用(503)'
      break
    case 504:
      errorInfo = '网络超时(504)'
      break
    case 505:
      errorInfo = 'HTTP版本不受支持(505)'
      break
    default:
      errorInfo = `连接出错(${status})，请检查网络或联系管理员！`
  }

  logger.warn(`请求错误：${!mes ? errorInfo : mes}`)
  return {
    status,
    msg: `${!mes ? mes : errorInfo}`,
  }
}
