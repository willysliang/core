/**
 * @ Author: willy
 * @ CreateTime: 2024-04-25 15:34:08
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-25 15:52:24
 * @ Description: 接口
 */

/** 埋点配置项 */
export enum TrackerConfig {
  /** 版本 */
  VERSION = 'V1.0.0',
}

export interface IDefaultOptions {
  /** sdk 版本 */
  sdkVersion: TrackerConfig.VERSION
  /** 后端接口地址 */
  requestUrl?: string
  /** 用户id */
  uuid?: string | number

  /** history上报 */
  historyTracker?: boolean
  /** hash上报 */
  hashTracker?: boolean
  /** 携带Tracker-key 点击事件上报 */
  domTracker?: boolean
  /** js埋点：js和 promise 报错异常上报 */
  jsError?: boolean
  /** 用户行为上报 */
  behaviorTracker?: boolean
  /** 页面性能监控上报 */
  performanceTracker?: boolean
  /** 资源加载监控上报 */
  resourceTracker?: boolean
  /** 透传字段 */
  extra?: Record<string, any>
}

export interface IOptions extends Partial<IDefaultOptions> {
  requestUrl: string
}

/** 上报传递的参数 */
export type IReportTrackerData = {
  event: string
  targetKey: string
  [key: string]: any
}
