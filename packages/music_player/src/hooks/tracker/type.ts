/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-05-23 19:44:38
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-05-24 20:48:26
 * @ Description: type 定义类型
 */

/** 默认的参数 */
export interface DefaultOptions {
  /** 后端接口地址 */
  requestUrl: string | undefined
  /** 用户id */
  uuid: string | number | undefined
  /** history上报 */
  historyTracker: boolean
  /** hash上报 */
  hashTracker: boolean
  /** 携带Tracker-key 点击事件上报 */
  domTracker: boolean
  /** js埋点：js和 promise 报错异常上报 */
  jsError: boolean
  /** 用户行为上报 */
  behaviorTracker: boolean
  /** 页面性能监控上报 */
  performanceTracker: boolean
  /** 资源加载监控上报 */
  resourceTracker: boolean
  /** sdk 版本 */
  sdkVersion: string | number
  /** 透传字段 */
  extra: Record<string, any> | undefined
}

/** 必传参数 */
export interface Options extends Partial<DefaultOptions> {
  requestUrl: string
}

/** 上报必传参数 */
export type ReportTrackerData = {
  [key: string]: any
  event: string
  targetKey: string
}

/** 埋点配置项 */
export enum TrackerConfig {
  /** 版本 */
  version = 'V1.0.0',
}
