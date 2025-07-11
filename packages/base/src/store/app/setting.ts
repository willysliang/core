/**
 * @ Author: willy
 * @ CreateTime: 2024-06-06 21:32:48
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-07-11 10:26:02
 * @ Description: 页面设置
 */

import { defineStore } from 'pinia'
import { BASE_URL } from '@/config/constant/cache'
import { Storage } from '@/utils/cache'
import { MODULE_CONTROL } from '@/config/constant/app'

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
    showPlayerModule:
      !!BASE_URL && Storage.get(MODULE_CONTROL, {}).showPlayerModule,
  }),
  actions: {
    /**
     * @function 音乐模块的显隐开关控制
     * @description
     *  1. 核心 - 将音乐模块的显隐开关存储到 localStorage 中，防止刷新后重置开关控制
     *  2. 优化 - 将开关状态变更 同步存储到全局，便于操作读取
     */
    changeShowPlayerModule(status: boolean) {
      // 更新本地存储保存配置项
      const moduleConfig = Storage.get(MODULE_CONTROL, {})
      moduleConfig.showPlayerModule = status
      Storage.set(MODULE_CONTROL, moduleConfig)

      // 全局状态的更新
      this.showPlayerModule = status
    },
  },
})
