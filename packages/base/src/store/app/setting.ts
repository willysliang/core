/**
 * @ Author: willy
 * @ CreateTime: 2024-06-06 21:32:48
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-26 16:04:01
 * @ Description: 页面设置
 */

import { BASE_URL } from '@/config/constant/cache'
import { defineStore } from 'pinia'

interface ISettingState {
  /** 是否显示菜单栏 */
  showMenu: boolean
  /** 是否显示音乐播放器相关的模块 */
  showPlayerModule: boolean
}

export const useSettingStore = defineStore({
  id: 'setting',
  state: (): ISettingState => ({
    showMenu: true,
    showPlayerModule: !!localStorage.getItem(BASE_URL),
  }),
})
