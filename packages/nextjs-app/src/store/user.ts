/**
 * @ Author: willy
 * @ CreateTime: 2024-04-11 15:49:16
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-11 16:12:13
 * @ Description: 用户的公共信息
 */

import { create } from 'zustand'
import { produce } from 'immer'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface IUserInfo {
  name: string
  age: number
}

interface IUserState {
  userInfo: IUserInfo
  token: string
  otherInfo: unknown

  updateUserInfo(userInfo: IUserInfo): void
  updateAge(age: number): void
  updateToken(token: string): void
}

export const useUserStore = create<IUserState>((set, get) => ({
  userInfo: {
    name: 'willysliang',
    age: 25,
  },
  token: 'DEFAULT_TOKEN',
  otherInfo: {
    desc: '其他描述',
  },

  // 更新整个对象
  updateUserInfo: (userInfo) => set({ userInfo }), // 合并 userInfo
  // 更新对象中某个对象
  updateAge: (age) =>
    set(
      produce((state) => {
        state.userInfo.age = age
      }),
    ),
  // 更新原始数据类型
  updateToken: (token) => set({ token }),
  // 异步操作
  fetch: async (pond: string) => {
    const response = await fetch(pond)
    set((state) => {
      console.log(get().otherInfo, state.userInfo)
      return { otherInfo: response.json() }
    })
  },
}))

// state 每次发生变化都将输出日志
const logMiddleware = (config: any) => (set: any, get: any, api: any) =>
  config(
    (...args: any[]) => {
      console.log('  applying', args)
      set(...args)
      console.log('  new state', get())
    },
    get,
    api,
  )

export const useTestStore = create(
  logMiddleware((set: any) => ({
    bees: false,
    setBees: (input: boolean) => set({ bees: input }),
  })),
)

// (localStorage/cookie/数据库等)将 store 中的 state 进行持久化存储
export const useFishStore = create(
  persist(
    (set, get: any) => ({
      fishes: 0,
      addAFish: () => set({ fishes: get().fishes + 1 }),
    }),
    {
      name: 'food-storage', // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

export const useBeeStore = create(
  immer((set) => ({
    bees: 0,
    addBees: (by: any) =>
      set((state: any) => {
        state.bees += by
      }),
  })),
)
