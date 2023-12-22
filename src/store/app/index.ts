/**
 * @ Author: willy
 * @ Create Time: 2023-11-02 20:49:42
 * @ Modifier by: willy
 * @ Modifier time: 2023-11-16 14:01:54
 * @ Description: index app 相关的持久化数据
 */

import { defineStore } from 'pinia'
import store from '@/store'
import { logoDefault, logoDark, avatar } from '@/assets'

/** 项目配置类 */
interface IAppConfig {
  /** 是否为暗模式 */
  isDark: boolean
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
interface IAppIndexSate {
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

export const useAppIndexStore = defineStore({
  id: 'app-index',
  state: (): IAppIndexSate => ({
    appName: `Willy`,
    appDesc: '落叶缤纷诉秋意，风雪飘摇牵梅舞',

    appConfig: {
      isDark: false,
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
})

/** 在非 setup 函数外面使用 */
export function useAppStoreWithOut() {
  return useAppIndexStore(store)
}
