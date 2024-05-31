/**
 * @ Author: willysliang
 * @ Create Time: 2022-11-01 10:41:23
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-01 14:04:05
 * @ Description: 获取本地时间的hooks
 */

import { ref, onMounted, onUnmounted } from 'vue'

/***
 * @description 获取本地时间
 */
export function useTimeHooks () {
  const year = ref<number>(0) // 年份
  const month = ref<string>('00') // 月份
  const week = ref('') // 星期周
  const day = ref<string>('00') // 天数
  const hour = ref<string>('00') // 小时
  const minute = ref<string>('00') // 分钟
  const second = ref<string>('00') // 秒

  /** 所指定时间格式化为两位字符串 */
  const formatTime = (time = new Date().getDate()) => {
    return (
      `${time}`?.padStart(2, '0') ||
      new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(time)
    )
  }

  // 原生时间格式化
  /* new Intl.DateTimeFormat('zh', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date()) */

  /** 更新时间 */
  const updateTime = () => {
    const date = new Date()
    year.value = date.getFullYear()

    month.value = formatTime(date.getMonth() + 1)
    week.value = '日一二三四五六'.charAt(date.getDay())
    day.value = formatTime(date.getDate())
    hour.value = formatTime(date.getHours())
    minute.value = formatTime(date.getMinutes())
    second.value = formatTime(date.getSeconds())
  }
  updateTime()

  /***
   * 挂载 & 移除时间计算计时器
   */
  let timer // 定时器
  onMounted(() => {
    if (timer) clearInterval(timer)
    timer = setInterval(updateTime, 1000)
  })
  onUnmounted(() => {
    clearInterval(timer)
  })

  return {
    year,
    month,
    week,
    day,
    hour,
    minute,
    second,
  }
}
