/**
 * @ Author: willy
 * @ Create Time: 2023-11-02 20:49:42
 * @ Modifier by: willy
 * @ Modifier time: 2023-11-02 21:16:00
 * @ Description: index app 相关的持久化数据
 */

import { defineStore } from 'pinia'
import store from '@/store'

interface IAppIndexSate {
  /** 项目名称 */
  name: string
  /** 项目描述 */
  desc: string
}

export const useAppIndexStore = defineStore({
  id: 'app-index',
  state: (): IAppIndexSate => ({
    name: `Willy's blog`,
    desc: '落叶缤纷诉秋意，风雪飘摇牵梅舞',
  }),
})

/** 在非 setup 函数外面使用 */
export function useAppStoreWithOut() {
  return useAppIndexStore(store)
}
