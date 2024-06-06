/**
 * @ Author: willy
 * @ CreateTime: 2024-06-06 15:10:52
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-06 15:13:59
 * @ Description: 音乐相关的设置
 */

import { defineStore } from 'pinia'

interface IPlayerSettingState {
  /** 是否显示音乐播放器相关的模块 */
  showPlayerModule: boolean
}

export const usePlayerSettingStore = defineStore({
  id: 'playerSetting',
  state: (): IPlayerSettingState => ({
    showPlayerModule: false,
  }),
})
