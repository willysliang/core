/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 09:05:41
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-15 11:24:12
 * @ Description: App 相关的持久化数据
 */

import { defineStore } from 'pinia'
import { LOCALE_KEY, IS_LOCKSCREEN } from '@/config/constant/app'
import { Storage } from '@util/cache'
import { LocaleType } from '@/locales/config'
import store from '@/store'
import { BASE_URL, API_TARGET_URL } from '@/config/constant/cache'

const initLockTime = 5 * 60 * 1000

/** app数据集的约束 */
interface IAppStore {
  /** 后端接口地址 */
  baseUrl: string

  /** 国际化语言类型 */
  localeType: LocaleType

  /** 是否锁屏 */
  isLock: boolean
  /** 自动锁屏时限 */
  lockTime: number
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): IAppStore => ({
    /** 后端接口地址 */
    baseUrl: localStorage.getItem(BASE_URL) || API_TARGET_URL,

    /** 国际多语言模块 */
    localeType: Storage.get(LOCALE_KEY, 'zh_CN'),

    /** 锁屏模块 */
    isLock: Storage.get(IS_LOCKSCREEN, false),
    lockTime: Storage.get(IS_LOCKSCREEN, false) ? initLockTime : 0,
  }),

  getters: {
    isInit: () => localStorage.getItem(BASE_URL),

    /** 获取国际化语言类型 */
    getLocale: (state): LocaleType => state.localeType ?? 'zh_CN',
  },

  actions: {
    /** 设置系统后端地址 */
    setHost (host: string) {
      localStorage.setItem(BASE_URL, host)
      location.reload()
    },

    /** 切换语言类型，并设置国际化语言缓存 */
    setLocale (locale: LocaleType) {
      this.localeType = locale
      Storage.set(LOCALE_KEY, locale)
    },

    /***
     * 锁屏模块
     */
    /** 设置锁屏状态 */
    setLockscreen (isLock: boolean) {
      this.isLock = isLock
      Storage.set(IS_LOCKSCREEN, this.isLock)
    },
    /** 设置锁屏默认时间 */
    setLockTime (lockTime = initLockTime) {
      this.lockTime = lockTime
    },
  },
})

/** 在非 setup 函数外面使用 */
export function useAppStoreWithOut () {
  return useAppStore(store)
}
