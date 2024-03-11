import { defineStore } from 'pinia'
import type { UserProfile } from '@/types/user'
import { useLogin, useLoginStatus } from '@/api/module/user'
import { Storage } from '@util/cache'
import $md5 from 'js-md5'
import { USER_TOKEN, USER_COOKIE, USER_NAME } from '@/config/constant/cache'

interface IUserState {
  token: string // token
  cookie: string // cookie
  showLogin: boolean // 是否展现登录弹层
  profile: UserProfile // 用户信息
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserState => ({
    token: Storage.get(USER_TOKEN, ''),
    cookie: Storage.get(USER_COOKIE, null),
    showLogin: false,
    profile: Storage.get(USER_NAME, { nickname: 'willy' } as UserProfile),
  }),
  getters: {
    isLogin: (state): boolean => {
      return state.profile?.userId > 0
    },
  },
  actions: {
    /** 登录 */
    async login (phone: string, password: string) {
      const res = await useLogin(phone, $md5(password))
      this.token = res?.token || ''
      this.cookie = res?.cookie || ''
      document.cookie = res?.cookie || ''

      const expire = 7 * 24 * 60 * 60 * 1000
      Storage.set(USER_TOKEN, this.token, expire)
      Storage.set(USER_COOKIE, this.cookie, expire)
      this.checkLogin(this.cookie)
    },

    /** 检查登录状态 */
    async checkLogin (cookie = '') {
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
    resetData () {
      this.token = ''
      Storage.clear()
    },

    /** 退出登录 */
    async LOGOUT () {
      try {
        // await useLogout(this.uid)
        this.resetData()
      } catch {}
    },
  },
})
