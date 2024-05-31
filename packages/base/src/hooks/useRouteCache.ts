/**
 * @ Author: willysliang
 * @ Create Time: 2023-04-10 14:01:22
 * @ Modified by: willysliang
 * @ Modified time: 2023-04-10 18:09:35
 * @ Description: 路由缓存 hooks
 */

import { nextTick } from 'vue'
import { Storage } from '@/utils/cache'
import { COMP_CACHE_KEY } from '@/config/constant/cache'
import { demoPages } from '@/pages/constant'

/** 路由缓存 */
export function useRouteCache () {
  /** 获取缓存的记录信息列表 */
  const getCache = (): string[] => {
    return Storage.get(COMP_CACHE_KEY, [demoPages.TEST.name])
  }

  /** 添加缓存的路由组件 */
  function addCache (componentName: string | string[]) {
    if (Array.isArray(componentName)) {
      componentName.forEach(addCache)
      return
    }

    if (!componentName || getCache().includes(componentName)) return

    Storage.set(COMP_CACHE_KEY, [...getCache(), componentName])
  }

  /** 移除缓存的路由组件 */
  function removeCache (componentName: string): boolean {
    const index = getCache().indexOf(componentName)
    if (index > -1) {
      Storage.set(COMP_CACHE_KEY, [...getCache()].splice(index, 1))
      return true
    }
    return false
  }

  /** 移除缓存的路由组件的实例 */
  async function removeCacheEntry (componentName: string) {
    if (removeCache(componentName)) {
      await nextTick()
      addCache(componentName)
    }
  }

  /** 主体设置的添加/修改缓存的路由组件 */
  const themeAddCache = (componentNames: string[]) => {
    Storage.set(COMP_CACHE_KEY, componentNames)
  }

  return {
    getCache,
    addCache,
    removeCache,
    removeCacheEntry,
    themeAddCache,
  }
}
