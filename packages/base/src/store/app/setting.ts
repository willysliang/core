/**
 * @ Author: willy
 * @ CreateTime: 2024-06-06 21:32:48
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-06 21:35:08
 * @ Description: 页面设置
 */

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
    showPlayerModule: false,
  }),
})
