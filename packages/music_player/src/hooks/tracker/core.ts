/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-05-23 19:56:33
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-05-24 20:51:02
 * @ Description: core - 埋点核心功能
 */

/**
 * bug1:触发了两次事件
 * bug2:传递的event是错误的,猜测存在缓存
 */

import { DefaultOptions, Options, ReportTrackerData, TrackerConfig } from './type'
import { createHistoryEvent } from './utils'

const targetKey: Record<string, string> = {
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

/** 埋点类 */
class Tracker {
  public data: Options
  private version: string | undefined

  constructor (options: Options) {
    this.data = Object.assign(this.initDef(), options)
    this.installInnerTrack()
  }

  /** 设置 uid */
  public setUserId <T extends DefaultOptions['uuid']> (uuid: T) {
    this.data.uuid = uuid
  }

  /** 设置透传字段 */
  public setExtra <T extends DefaultOptions['extra']> (extra: T) {
    this.data.extra = extra
  }

  /** 埋点信息上报 */
  public sendTracker <T extends ReportTrackerData> (data: T) {
    this.reportTracker(data)
  }

  /** 初始化 */
  private initDef (): DefaultOptions {
    this.version = TrackerConfig.version

    /** 重写 window.history 方法 */
    // eslint-disable-next-line dot-notation
    window.history['pushState'] = createHistoryEvent('pushState')
    // eslint-disable-next-line dot-notation
    window.history['replaceState'] = createHistoryEvent('replaceState')

    return <DefaultOptions>{
      sdkVersion: this.version,
      historyTracker: false,
      hashTracker: false,
      domTracker: false,
      jsError: false,
    }
  }

  /** 遍历注入 window 自定义事件 */
  private captureEvents <T> (eventTypeList: Array<string>, targetKey: string, data?: T) {
    eventTypeList.forEach((event) => {
      const listener = () => {
        this.reportTracker({ event, targetKey, data })
      }
      window.removeEventListener(event, listener)
      window.addEventListener(event, listener)
    })
  }

  /** 自定义事件初始化函数 */
  private installInnerTrack () {
    if (this.data.historyTracker) {
      this.captureEvents(['pushState', 'replaceState', 'popState'], targetKey.historyPv)
    }

    if (this.data.hashTracker) {
      this.captureEvents(['hashChange'], targetKey.hashPv)
    }

    if (this.data.domTracker) {
      this.targetKeyReport()
    }

    if (this.data.jsError) {
      this.jsError()
    }

    // 用户行为监控
    if (this.data.behaviorTracker) {
      this.behaviorMonitor()
    }

    // 页面性能监控
    if (this.data.performanceTracker) {
      this.performanceMonitor()
    }

    /** 资源加载监控 */
    if (this.data.resourceTracker) {
      this.resourceMonitor()
    }
  }

  /**
   * 埋点上报
   * @desc navigator.sendBeacon 即使页面关闭了也会完成请求，而 XMLHttpRequest 则不一定
   */
  private reportTracker <T extends ReportTrackerData> (data: T) {
    /** 使用 navigator.sendBeacon 发送数据到后端 */
    const params = Object.assign(this.data, data, { time: new Date().getTime() })
    const headers = {
      type: 'application/x-www-form-urlencoded',
    }
    console.log("send tracker", params)
    const blob = new Blob([JSON.stringify(params)], headers)
    navigator.sendBeacon(this.data.requestUrl, blob)

    /** 发送 gif 携带参数到后端 */
    const send = () => {
      const img = new Image()
      const imgParams = new URLSearchParams(data).toString()
      img.src = `${this.data.requestUrl}/track.gif?${imgParams}`
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

  /** DOM 点击上报 */
  private targetKeyReport () {
    MouseEventList.forEach((event) => {
      window.addEventListener(event, (e) => {
        const target = e.target as HTMLElement
        const targetValue = target.getAttribute('target-key')
        if (targetValue) {
          console.log("触发", event)
          this.reportTracker({
            targetKey: targetValue,
            event,
          })
        }
      })
    })
  }

  /**
   * 用户行为监控
   * @desc 针对用户点击、滚动、输入行为监控
   */
  private behaviorMonitor () {
    /** 监听点击事件 */
    document.addEventListener('click', (event: Event) => {
      // 获取点击的元素
      const target: EventTarget | any = event.target

      // 获取元素的相关信息，例如 ID、类名等
      const id = target.id
      const className = target.className

      const targetValue = target.getAttribute('target-key')
      if (targetValue) {
        this.reportTracker({
          targetKey: `${targetKey.behaviorUv}-${targetValue}`,
          event: 'click',
          id,
          className,
        })
      }
    })

    /** 监听滚动事件 */
    document.addEventListener('scroll', () => {
      // 获取滚动位置
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop

      this.reportTracker({
        targetKey: `${targetKey.behaviorUv}-scroll`,
        event: 'scroll',
        scrollTop,
      })
    })

    /** 监听输入事件 */
    document.addEventListener('input', (event: Event) => {
      // 获取输入的元素和值
      const target: EventTarget | any = event.target
      const value = target.value

      const targetValue = target.getAttribute('target-key')
      if (targetValue) {
        this.reportTracker({
          targetKey: `${targetKey.behaviorUv}-input`,
          event: 'input',
          value,
        })
      }
    })
  }

  /** js错误上报 */
  private jsError () {
    this.errorEvent()
    this.promiseReject()
  }

  /** 捕获 js 错误 */
  private errorEvent () {
    /** 监听错误事件 */
    window.addEventListener('error', (event: Event | any) => {
      // 获取错误信息
      const { message, filename, lineno, colno } = event

      this.sendTracker({
        targetKey: targetKey.jsError,
        event: 'error',
        message,
        filename,
        lineno,
        colno,
      })
    })

    /** 劫持 console.error */
    /* const originConsoleError = console.error
    // 上报每一个 error
    console.error = (...errors) => {
      errors.forEach((error) => {
        // handleError(error) // 处理错误并上报 emit
        console.log("劫持到错误信息", error)
      })
      originConsoleError.apply(console, errors)
    } */
  }

  /** 捕获 promise 错误 */
  private promiseReject () {
    window.addEventListener('unhandledrejection', (event) => {
      event.promise.catch((error) => {
        this.sendTracker({
          targetKey: targetKey.promiseError,
          event: 'promise',
          message: error,
        })
      })
    })
  }

  /** 性能监控 */
  private performanceMonitor () {
    /** 监听页面加载事件 */
    window.addEventListener('load', () => {
      // 获取性能数据，主要用于测量浏览器加载 HTML 文档所需的时间
      const [performanceData] = performance.getEntriesByType('navigation') as
        | PerformanceEntry[]
        | any[]

      // 计算页面加载时间
      const pageLoadTime =
        performanceData.loadEventEnd - performanceData.domComplete

      // 计算请求响应时间
      const requestResponseTime =
        performanceData.responseEnd - performanceData.responseStart

      // 计算 DNS 查询时间
      const dnsLookupTime =
        performanceData.domainLookupEnd - performanceData.domainLookupStart

      // 计算 TCP 连接时间
      const tcpConnectTime =
        performanceData.connectEnd - performanceData.connectStart

      // 计算白屏时间
      const whiteScreenTime =
        performanceData.domInteractive - performanceData.responseStart

      // 获取 FCP 时间
      let lcpTime = 0
      const lcpEntries = performance.getEntriesByType(
        'largest-contentful-paint',
      ) as PerformanceEntry[] | any[]
      if (lcpEntries.length > 0) {
        lcpTime =
          lcpEntries[lcpEntries.length - 1].renderTime ||
          lcpEntries[lcpEntries.length - 1].loadTime
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
          if (entry.duration > 50) {
            tbt += entry.duration - 50
          }
        }
      })
      // 计算 TTI
      if (tti === 0 && tbt < 50) {
        tti = performance.now()
      }
      observer.observe({ entryTypes: ['longtask'] })

      // 构造要发送的性能数据
      const perfParams = {
        pageLoadTime,
        dnsLookupTime,
        tcpConnectTime,
        whiteScreenTime,
        requestResponseTime,
        lcpTime,
        tbt,
        tti,
      }

      this.reportTracker({
        targetKey: `${targetKey.performancePv}`,
        event: 'performance',
        ...perfParams,
      })
    })
  }

  /**
   * 资源监控
   * @desc 获取资源（css，脚本，图片等）的时间
   */
  private resourceMonitor () {
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
      t = resource.fetchStart > 0 ? resource.responseEnd - resource.fetchStart : 0
      console.log(`… 获取直到响应结束时间 = ${t}`)

      // 请求开始直到响应结束
      t = resource.requestStart > 0 ? resource.responseEnd - resource.requestStart : 0
      console.log(`… 请求开始直到响应结束时间 = ${t}`)

      // 开始直到响应结束
      t = resource.startTime > 0 ? resource.responseEnd - resource.startTime : 0
      console.log(`… 开始直到响应结束时间 = ${t}`)

      /** 异步资源加载监控 */
      const asyncResourceMonitor = () => {
        const observer = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            console.log(`Resource ${entry.name} loaded in ${entry.duration}ms`)
          }
        })
        observer.observe({ entryTypes: ['resource'] })
      }
      asyncResourceMonitor()

      // 构造要发送的数据
      const resParams = {
        name,
        resourceType: type,
        size,
      }

      this.reportTracker({
        targetKey: targetKey.resourcePv,
        event: 'resource',
        ...resParams,
      })
    })
  }
}

export {
  Tracker,
}
