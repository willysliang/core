/**
 * @ Author: willy
 * @ CreateTime: 2024-04-25 15:19:51
 * @ Modifier: willy
 * @ ModifierTime: 2024-05-09 14:20:42
 * @ Description: 埋点功能
 */

import {
  IDefaultOptions,
  IOptions,
  IReportTrackerData,
  TrackerConfig,
} from './types'
import { createHistoryEvent } from './utils'

export class TrackerUtils {
  public createHistoryEvent() {}
}

export class Tracker {
  private options: IOptions
  private version: TrackerConfig.VERSION
  private targetKey: Record<string, string> = {
    /** 页面错误 */
    jsError: 'js-error',
    promiseError: 'promise-reject',
    /** 页面访问 */
    hashPv: 'hash-pv',
    historyPv: 'history-pv',
    /** 用户行为 */
    behaviorUv: 'behavior-uv',
    /** 页面性能 */
    performancePv: 'performance-pv',
    /** 资源加载 */
    resourcePv: 'resource-pv',
  }

  constructor(options: IOptions) {
    this.options = Object.assign(this.defaultOptions(), options)
    this.version = TrackerConfig.VERSION

    this.installInnerTrack()
  }

  /** 初始化 */
  private defaultOptions(): IDefaultOptions {
    /** 重写 window.history 方法 */
    window.history.pushState = createHistoryEvent('pushState')
    window.history.replaceState = createHistoryEvent('replaceState')

    return {
      sdkVersion: this.version,
      historyTracker: false,
      hashTracker: false,
      domTracker: false,
      jsError: false,
    }
  }

  /**
   * 埋点上报
   * @desc 使用 navigator.sendBeacon 发送数据到后端
   * navigator.sendBeacon 即使页面关闭了也会完成请求，而 XMLHttpRequest 则不一定
   */
  private reportTracker<T extends IReportTrackerData>(data: T) {
    /**  */
    const params = { ...this.options, ...data, time: new Date().getTime() }
    console.log('send tracker', params)
    const headers = { type: 'application/x-www-form-urlencoded' }
    const blob = new Blob([JSON.stringify(params)], headers)
    navigator.sendBeacon(this.options.requestUrl, blob)

    /** 发送 gif 携带参数到后端 */
    const send = () => {
      const img = new Image()
      const imgParams = new URLSearchParams(data).toString()
      img.src = `${this.options.requestUrl}/track.gif?${imgParams}`
      console.log('发送的数据', data)
    }

    // 防抖发送数据
    let timer: null | NodeJS.Timeout = null
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      send()
      timer = null
    }, 10000)
  }

  /** 自定义事件初始化函数 */
  private installInnerTrack() {
    const {
      historyTracker,
      hashTracker,
      domTracker,
      jsError,
      behaviorTracker,
      performanceTracker,
      resourceTracker,
    } = this.options

    if (historyTracker) {
      const eventList = ['pushState', 'replaceState', 'popState']
      this.captureEvents(eventList, this.targetKey.historyPv)
    }
    if (hashTracker) this.captureEvents(['hashChange'], this.targetKey.hashPv)
    if (domTracker) this.targetKeyReport()
    if (jsError) this.jsError()
    if (behaviorTracker) this.behaviorMonitor()
    if (performanceTracker) this.performanceMonitor()
    if (resourceTracker) this.resourceMonitor()
  }

  /** 遍历注入 window 自定义事件 */
  private captureEvents<T>(
    eventTypeList: Array<string>,
    targetKey: string,
    data?: T,
  ) {
    eventTypeList.forEach((event) => {
      const listener = () => {
        this.reportTracker({ event, targetKey, data })
      }
      window.removeEventListener(event, listener)
      window.addEventListener(event, listener)
    })
  }

  /** DOM 点击上报 */
  private targetKeyReport() {
    /** 设定监听鼠标的监听事件 */
    const MouseEventList: Array<string> = [
      'click',
      'dblclick',
      'contentmenu',
      'mousedown',
      'mouseup',
      'mouseenter',
      'mouseout',
      'mouseover',
    ]

    MouseEventList.forEach((event) => {
      window.addEventListener(event, (e) => {
        const target = e.target as HTMLElement
        const targetValue = target.getAttribute('target-key')
        if (targetValue) {
          console.log('触发', event)
          this.reportTracker({
            targetKey: targetValue,
            event,
          })
        }
      })
    })
  }

  /** js错误上报 */
  private jsError() {
    /** 捕获 js 错误 */
    const errorEvent = () => {
      /** 监听错误事件 */
      window.addEventListener('error', (event: Event | any) => {
        const { message, filename, lineno, colno } = event
        const reportParams = {
          targetKey: this.targetKey.jsError,
          event: 'error',
          message,
          filename,
          lineno,
          colno,
        }
        this.reportTracker(reportParams)
      })
    }

    /** 劫持 console.error */
    const consoleError = () => {
      const originConsoleError = console.error
      // 上报每一个 error
      console.error = (...errors) => {
        errors.forEach((error) => {
          // handleError(error) // 处理错误并上报 emit
          console.log('劫持到错误信息', error)
        })
        originConsoleError.apply(console, errors)
      }
    }

    /** 捕获 promise 错误 */
    const promiseReject = () => {
      window.addEventListener('unhandledrejection', (event) => {
        event.promise.catch((error) => {
          const reportParams = {
            targetKey: this.targetKey.promiseError,
            event: 'promise',
            message: error,
          }
          this.reportTracker(reportParams)
        })
      })
    }

    errorEvent()
    consoleError()
    promiseReject()
  }

  /**
   * 用户行为监控
   * @desc 针对用户点击、滚动、输入行为监控
   */
  private behaviorMonitor() {
    /** 监听点击事件 */
    document.addEventListener('click', (event: Event) => {
      // 获取点击的元素
      const target: EventTarget | any = event.target

      // 获取元素的相关信息，例如 ID、类名等
      const id = target.id
      const className = target.className

      const targetValue = target.getAttribute('target-key')
      const reportParams = {
        targetKey: `${this.targetKey.behaviorUv}-${targetValue}`,
        event: 'click',
        id,
        className,
      }
      if (targetValue) this.reportTracker(reportParams)
    })

    /** 监听滚动事件 */
    document.addEventListener('scroll', () => {
      // 获取滚动位置
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      const reportParams = {
        targetKey: `${this.targetKey.behaviorUv}-scroll`,
        event: 'scroll',
        scrollTop,
      }
      this.reportTracker(reportParams)
    })

    /** 监听输入事件 */
    document.addEventListener('input', (event: Event) => {
      // 获取输入的元素和值
      const target: EventTarget | any = event.target
      const value = target.value

      const targetValue = target.getAttribute('target-key')
      const reportParams = {
        targetKey: `${this.targetKey.behaviorUv}-input`,
        event: 'input',
        value,
      }
      if (targetValue) this.reportTracker(reportParams)
    })
  }

  /** 性能监控 */
  private performanceMonitor() {
    /** 监听页面加载事件 */
    window.addEventListener('load', () => {
      // 获取性能数据，主要用于测量浏览器加载 HTML 文档所需的时间
      const [performanceData] = performance.getEntriesByType('navigation') as
        | PerformanceEntry[]
        | any[]

      // 计算页面加载时间
      const { loadEventEnd, domComplete } = performanceData
      const pageLoadTime = loadEventEnd - domComplete

      // 计算请求响应时间
      const { responseEnd, responseStart } = performanceData
      const requestResponseTime = responseEnd - responseStart

      // 计算 DNS 查询时间
      const { domainLookupEnd, domainLookupStart } = performanceData
      const dnsLookupTime = domainLookupEnd - domainLookupStart

      // 计算 TCP 连接时间
      const { connectEnd, connectStart } = performanceData
      const tcpConnectTime = connectEnd - connectStart

      // 计算白屏时间
      const { domInteractive } = performanceData
      const whiteScreenTime = domInteractive - responseStart

      // 获取 FCP 时间
      let lcpTime = 0
      const lcpEntries = performance.getEntriesByType(
        'largest-contentful-paint',
      ) as PerformanceEntry[] | any[]
      if (lcpEntries.length) {
        lcpTime = lcpEntries.at(-1)?.renderTime || lcpEntries.at(-1)?.loadTime
      }

      // Paint Timing
      const paintMetrics = performance.getEntriesByType('paint')
      paintMetrics.forEach((metrics) => {
        console.log(metrics.name + ': ' + metrics.startTime + 'ms')
      })

      // 监听长任务
      let tti = 0
      let tbt = 0
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // 计算 TBT
          if (entry.duration > 50) tbt += entry.duration - 50
        }
      })
      // 计算 TTI
      if (tti === 0 && tbt < 50) tti = performance.now()
      observer.observe({ entryTypes: ['longtask'] })

      const reportParams = {
        targetKey: `${this.targetKey.performancePv}`,
        event: 'performance',
        pageLoadTime,
        dnsLookupTime,
        tcpConnectTime,
        whiteScreenTime,
        requestResponseTime,
        lcpTime,
        tbt,
        tti,
      }
      this.reportTracker(reportParams)
    })
  }

  /**
   * 资源监控
   * @desc 获取资源（css，脚本，图片等）的时间
   */
  private resourceMonitor() {
    // 获取资源
    const resourceData = performance.getEntriesByType('resource')

    // 遍历资源数据
    resourceData.forEach((resource: PerformanceEntry | any, index) => {
      // 获取资源的相关信息，例如名称、类型、大小等
      const { name, type, size } = resource

      // 可计算的资源时间
      console.log(`== 资源 [${index}] - ${name}`)

      // 重定向时间
      let t = resource.redirectEnd - resource.redirectStart
      console.log(`… 重定向时间 = ${t}`)

      // DNS查询时间
      t = resource.domainLookupEnd - resource.domainLookupStart
      console.log(`… DNS查询时间 = ${t}`)

      // TCP握手时间
      t = resource.connectEnd - resource.connectStart
      console.log(`… TCP握手时间 = ${t}`)

      // 响应时间
      t = resource.responseEnd - resource.responseStart
      console.log(`… 响应时间 = ${t}`)

      // 获取直到响应结束
      t = resource.fetchStart ? resource.responseEnd - resource.fetchStart : 0
      console.log(`… 获取直到响应结束时间 = ${t}`)

      // 请求开始直到响应结束
      const { requestStart, responseEnd } = resource
      t = requestStart ? responseEnd - requestStart : 0
      console.log(`… 请求开始直到响应结束时间 = ${t}`)

      // 开始直到响应结束
      t = resource.startTime ? resource.responseEnd - resource.startTime : 0
      console.log(`… 开始直到响应结束时间 = ${t}`)

      /** 异步资源加载监控 */
      // const asyncResourceMonitor = () => {
      //   const observer = new PerformanceObserver((entryList) => {
      //     for (const entry of entryList.getEntries()) {
      //       console.log(`Resource ${entry.name} loaded in ${entry.duration}ms`)
      //     }
      //   })
      //   observer.observe({ entryTypes: ['resource'] })
      // }
      // asyncResourceMonitor()

      // 构造要发送的数据
      const reportParams = {
        targetKey: this.targetKey.resourcePv,
        event: 'resource',
        name,
        resourceType: type,
        size,
      }
      this.reportTracker(reportParams)
    })
  }
}
