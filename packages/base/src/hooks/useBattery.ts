/**
 * @ Author: willysliang
 * @ Create Time: 2022-11-03 10:50:32
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-03 14:31:06
 * @ Description: 检测设备电池电量函数
 */

import { computed, onMounted, reactive } from 'vue'

/** 电池状态 */
export type Battery = {
  /** 当前电池是否充电 */
  charging: boolean

  /** 距离充电完毕还需多少秒，如果为 0 则充电完毕 */
  chargingTime: number

  /** 距离电池耗电至空且挂起需要多少秒 */
  dischargingTime: number

  /**  代表电量的放大等级，这个值在 0.0 至 1.0 之间 */
  level: number

  [key: string]: any
}
/** 电源状态 */
export type BatterStatus = '直连电源' | '已充满' | '充电中' | '已断开电源'

export const useBatteryHooks = () => {
  /** 电池数据状态 */
  const battery = reactive<Battery>({
    charging: false,
    chargingTime: 0,
    dischargingTime: 0,
    level: 1,
  })

  /** 坚持当前设备是否支持 Battery API */
  const isSupportedBattery = navigator && 'getBattery' in navigator

  /** 计算电池剩余可用时间 */
  const calcFormmatTime = (calcTime: number): number | string => {
    // 如果为非可计算数值，则跳出计算
    if (!Number.isFinite(calcTime) || calcTime === 0) return 0

    const hour = calcTime / 3600
    const minute = (calcTime / 60) % 60
    if (hour === 0 && minute === 0) return 0
    return `${~~hour}小时${~~minute}分钟`
  }

  /** 电池状态 */
  const batteryStatus = computed<BatterStatus>(() => {
    // 如果为不支持 Battery API的，则返回 '直连电源'
    if (!isSupportedBattery) {
      return '直连电源'
    }
    if (battery.charging && battery.level >= 100) {
      return '已充满'
    } else if (battery.charging) {
      return '充电中'
    } else {
      return '已断开电源'
    }
  })

  /** 更新电池使用状态  */
  const updateBattery = (target) => {
    for (const key in battery) {
      battery[key] = target[key]
    }
    battery.level = battery.level * 100
  }

  onMounted(async () => {
    /** 获取当前设备的电池信息 */
    const BatteryManager: Battery = (await (
      window.navigator as any
    ).getBattery?.()) || { ...battery }
    updateBattery(BatteryManager)

    /** 电池充电状态更新时被调用 */
    BatteryManager.onchargingchange = ({ target }) => {
      updateBattery(target)
    }

    /** 电池充电时间更新时被调用 */
    BatteryManager.onchargingtimechange = ({ target }) => {
      updateBattery(target)
    }
    /** 电池断开充电时间更新时被调用 */
    BatteryManager.ondischargingtimechange = ({ target }) => {
      updateBattery(target)
    }
    /** 电池电量更新时被调用 */
    BatteryManager.onlevelchange = ({ target }) => {
      updateBattery(target)
    }
  })

  return {
    battery,
    isSupportedBattery,
    calcFormmatTime,
    batteryStatus,
  } as const
}
