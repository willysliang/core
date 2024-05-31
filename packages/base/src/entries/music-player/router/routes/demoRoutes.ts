/**
 * @ Author: willysliang
 * @ Create Time: 2022-11-15 09:39:34
 * @ Modified by: willysliang
 * @ Modified time: 2023-04-10 13:57:37
 * @ Description: 案例路由配置
 */
import { demoPages } from '@/pages/constant'

/** 获取 demo 模块的所有路由 */
const getDemoRoutes = () => {
  const demoRoutes: any = []
  for (const [, value] of Object.entries(demoPages)) {
    const { path, name, component } = value
    demoRoutes.push({
      path,
      name,
      component,
      meta: Object.assign(value, { keepAlive: true }),
    })
  }
  return demoRoutes
}

export const demoRoutes = getDemoRoutes()
