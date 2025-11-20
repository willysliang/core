/**
 * @ Author: willysliang
 * @ CreateTime: 2022-11-11 10:01:13
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-26 16:21:42
 * @ Description: 用户信息
 */

import { defineStore } from 'pinia'
import $md5 from 'js-md5'
import { Storage } from '@utils/cache'
import { USER_TOKEN, USER_COOKIE, USER_NAME } from '@/config/constant/cache'
import { useLogin, useLoginStatus } from '@/api/module/user'
import type { UserProfile } from '@/types/user'

interface IUserState {
  token: string
  /** cookie */
  cookie: string
  /** 是否展现登录弹层 */
  showLogin: boolean
  /** 用户信息 */
  profile: UserProfile
}

/** 用户信息相关 store */
export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserState => ({
    token: Storage.get(USER_TOKEN, ''),
    cookie: Storage.get(USER_COOKIE, null),
    showLogin: false,
    profile: Storage.get(USER_NAME, { nickname: 'willy' } as UserProfile),
  }),
  getters: {
    isLogin: (state): boolean => state.profile?.userId > 0,
  },
  actions: {
    /** 登录 */
    async login(phone: string, password: string) {
      const res = await useLogin(phone, $md5(password)).catch(() => {})
      this.token = res?.token || ''
      this.cookie = res?.cookie || ''
      document.cookie = res?.cookie || ''

      const expire = 7 * 24 * 60 * 60 * 1000
      Storage.set(USER_TOKEN, this.token, expire)
      Storage.set(USER_COOKIE, this.cookie, expire)
      this.checkLogin(this.cookie)
    },

    /** 检查登录状态 */
    async checkLogin(cookie = '') {
      try {
        const { data } = await useLoginStatus(null)
        this.profile = data.profile

        const expire = 7 * 24 * 60 * 60 * 1000
        Storage.set(USER_NAME, JSON.stringify(data.profile), expire)
        Storage.set(USER_COOKIE, cookie, expire)

        this.showLogin = false
      } catch {}
    },

    /** 清除信息 */
    resetData() {
      this.token = ''
      Storage.clear()
    },

    /** 退出登录 */
    async LOGOUT() {
      try {
        // await useLogout(this.uid)
        this.resetData()
      } catch {}
    },
  },
})
