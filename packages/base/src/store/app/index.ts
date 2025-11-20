/**
 * @ Author: willy
 * @ Create Time: 2023-11-02 20:49:42
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-07-11 09:37:26
 * @ Description: index app 相关的持久化数据
 */

import { defineStore } from 'pinia'
import store from '@/store'
import { logoDefault, logoDark, avatar } from '@/assets'
import { BASE_URL, API_TARGET_URL } from '@/config/constant/cache'
import { LOCALE_KEY, IS_LOCKSCREEN } from '@/config/constant/app'
import { Storage } from '@utils/cache'
import { LocaleType } from '@/locales/config'
import { IPages } from '@/entries/music-player/router/constant'

/** 项目配置类 */
interface IAppConfig {
  /** 是否为暗模式 */
  isDark: boolean

  /** 当前路由的信息 */
  routeInfo?: null | IPages
}

interface IUserInfo {
  /** 头像 */
  avatar: string
  /** 邮箱 */
  email: string
  /** 电话 */
  phone: number | string
  /** github 地址 */
  github: string
  /** 昵称 */
  nickname: string | number
  /** 个性签名 */
  sign: string
}

/** app 全局状态 */
interface IAppIndexState {
  /** 后端接口地址 */
  baseUrl: string

  /** 国际化语言类型 */
  localeType: LocaleType

  /** 是否锁屏 */
  isLock: boolean
  /** 自动锁屏时限 */
  lockTime: number

  /** 项目名称 */
  appName: string
  /** 项目描述 */
  appDesc: string

  /** 项目配置类 */
  appConfig: IAppConfig

  /** 用户信息 */
  userInfo: IUserInfo

  /** 标签列表 */
  tags: Array<string | number>
}

const initLockTime = 5 * 60 * 1000

export const useAppStore = defineStore({
  id: 'app-index',
  state: (): IAppIndexState => ({
    /** 后端接口地址 */
    baseUrl: localStorage.getItem(BASE_URL) || API_TARGET_URL,

    /** 国际多语言模块 */
    localeType: Storage.get(LOCALE_KEY, 'zh_CN'),

    /** 锁屏模块 */
    isLock: Storage.get(IS_LOCKSCREEN, false),
    lockTime: Storage.get(IS_LOCKSCREEN, false) ? initLockTime : 0,

    appName: `Willy`,
    appDesc: '落叶缤纷诉秋意，风雪飘摇牵梅舞',

    appConfig: {
      isDark: false,
      routeInfo: null,
    },

    userInfo: {
      avatar,
      email: 'willysliang@qq.com',
      github: 'https://github.com/willysliang',
      phone: '15019867311',
      nickname: 'Willy Liang',
      sign: '美梦与现实交替缠绵，遂而在这错乱磁场中迷失了方向~',
    },

    tags: [
      'CSS',
      'VUE3',
      'uni-app',
      '数据结构',
      'TypeScript',
      'ES6',
      'Git',
      'React',
    ],
  }),
  getters: {
    isInit: () => localStorage.getItem(BASE_URL),

    /** 获取国际化语言类型 */
    getLocale: (state): LocaleType => state.localeType ?? 'zh_CN',

    logoIcon: (state): string =>
      state.appConfig.isDark ? logoDark : logoDefault,
    cardInfos: () => {
      return [
        {
          title: 'VUE3的入门训练',
          author: 'willys',
          modifierTime: new Date(),
          filePath: '/前端框架/VUE3',
          tags: ['vue', 'js'],
          coverPicture:
            'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200427163531.jpg',
          description:
            '很多人喜欢选择APP或网站中的深色模式，也许他们更喜欢这样的外观，或者他们想让自己的眼睛免受疲劳。这篇文章将告诉你如何在网站中实现一个自动的CSS深色模式，根据访客的系统主题来自动响应。',
        },
        {
          title: 'VUE3的入门训练',
          author: 'willys',
          modifierTime: new Date(),
          filePath: '/前端框架/VUE3',
          tags: ['vue', 'js'],
          description:
            '很多人喜欢选择APP或网站中的深色模式，也许他们更喜欢这样的外观，或者他们想让自己的眼睛免受疲劳。这篇文章将告诉你如何在网站中实现一个自动的CSS深色模式，根据访客的系统主题来自动响应。',
        },
        {
          title: 'VUE3的入门训练',
          author: 'willys',
          modifierTime: new Date(),
          filePath: '/前端框架/VUE3',
          tags: ['vue', 'js'],
          isHot: true,
          description:
            '很多人喜欢选择APP或网站中的深色模式，也许他们更喜欢这样的外观，或者他们想让自己的眼睛免受疲劳。这篇文章将告诉你如何在网站中实现一个自动的CSS深色模式，根据访客的系统主题来自动响应。',
        },
      ]
    },
  },
  actions: {
    /**
     * 设置系统后端地址
     * @param host 后端地址
     * @description 仅在host有值时添加，如果host为空，则移除 (基于音乐模块显隐控制的支持)
     */
    setHost(host: string) {
      if (host) {
        localStorage.setItem(BASE_URL, host)
      } else {
        localStorage.removeItem(BASE_URL)
      }
      location.reload()
    },

    /** 切换语言类型，并设置国际化语言缓存 */
    setLocale(locale: LocaleType) {
      this.localeType = locale
      Storage.set(LOCALE_KEY, locale)
    },

    /***
     * 锁屏模块
     */
    /** 设置锁屏状态 */
    setLockscreen(isLock: boolean) {
      this.isLock = isLock
      Storage.set(IS_LOCKSCREEN, this.isLock)
    },
    /** 设置锁屏默认时间 */
    setLockTime(lockTime = initLockTime) {
      this.lockTime = lockTime
    },
  },
})

/** 在非 setup 函数外面使用 */
export function useAppStoreWithOut() {
  return useAppStore(store)
}
