/**
 * @ Author: willy
 * @ CreateTime: 2024-04-25 15:19:51
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-25 20:12:12
 * @ Description: 埋点功能暴露出去的内容
 */
import { Tracker } from './core'

export * from './types'
export * from './core'

// 调用案例
const tracker = new Tracker({
  requestUrl: 'http://localhost:9000/tracker',
  historyTracker: true, // 开启监听页面的前进与回退的触发
  domTracker: true, // 开启监听 dom事件触发上报
  // jsError: true, // 开启监听js错误上报
  behaviorTracker: true, // 开启用户行为上报
  performanceTracker: true, // 开启页面性能监控上报
  resourceTracker: true, // 开启资源加载监控上报
})

console.log(tracker)
