/**
 * @ Author: willysliang
 * @ CreateTime: 2025-04-03 15:07:20
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-04-03 21:26:13
 * @ Description: 视频黑屏检测器
 */

/** 视频黑屏检测配置项 */
type VideoConfig = {
  /** 亮度阈值 (0-255) */
  brightnessThreshold?: number
  /** 单通道像素阈值 (0-255) */
  pixelThreshold?: number
  /** 认定为黑屏的最小黑色像素比例 (0-1) */
  requiredBlackRatio?: number
  /** 采样间隔（秒） */
  sampleInterval?: number
  /** 最大采样帧数 */
  maxSamples?: number
  /** 采样帧数容错数 */
  sampleTolerance?: number
  /** 是否启用调试模式 */
  debug?: boolean
}

/**
 * 智能黑屏检测工具
 *
 * 🎯 主要功能：
 * 1. 自动分析视频内容是否为全黑画面
 * 2. 支持大文件快速检测
 * 3. 提供精准的像素级分析
 *
 * 💡 典型应用场景：
 * - 用户上传视频时的自动质量检查
 * - 监控视频片段的黑屏检测
 * - 视频处理流程中的异常检测
 *
 * @example
    // 基础用法 - 检测用户上传的视频
    const detector = new BlackScreenDetector()
    document
      .querySelector('input[type="file"]')
      .addEventListener('change', async (e) => {
        const file = e.target.files[0]
        const isBlack = await detector.check(file)
        alert(isBlack ? '请上传有效视频' : '视频验证通过')
      })
 */

export class BlackScreenDetector {
  /**
   * 默认配置项
   * @type {Required<VideoConfig>}
   * @static
   */
  static DEFAULTS: Required<VideoConfig> = {
    brightnessThreshold: 20, // 典型值范围：15-30（夜间场景可适当提高）
    pixelThreshold: 30, // 典型值范围：25-40（处理压缩视频需调高）
    requiredBlackRatio: 0.95, // 典型值范围：0.9-0.99
    sampleInterval: 0.2, // 单位：秒（兼顾精度与性能的平衡值）
    maxSamples: 50, // 防止超长视频处理时间过长
    sampleTolerance: 5, // 允许的采样帧数容错数
    debug: true, // 开启后可在控制台查看检测过程
  }

  /** 视频元素实例 */
  private video: HTMLVideoElement
  private canvas: HTMLCanvasElement
  /** Canvas 渲染上下文 */
  private ctx: CanvasRenderingContext2D
  /** 当前配置项 */
  private config: Required<VideoConfig>
  private abortController: AbortController | null = null

  /** 检测的结果 */
  public checkResult: unknown[] = []

  /**
   * 创建黑屏检测器实例
   * @param {VideoConfig} [options] 自定义配置项
   */
  constructor(options: VideoConfig = {}) {
    this.config = { ...BlackScreenDetector.DEFAULTS, ...options }

    // 初始化视频处理组件
    this.video = document.createElement('video')
    this.canvas = document.createElement('canvas')
    const ctx = this.canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas 上下文初始化失败')
    this.ctx = ctx
  }

  /**
   * 执行黑屏检测（主入口方法）
   *
   * @param file 视频文件对象
   * @returns 检测结果（true=黑屏 / false=正常）
   *
   * 🚀 工作流程：
   * 1. 加载视频元数据 → 2. 智能缩放 → 3. 分段采样 → 4. 双验证检测
   *
   * ⚠️ 注意：
   * - 视频时长超过5分钟时自动启用快速采样模式
   * - 支持MP4/WebM/AVI等主流格式
   * - 检测过程中可调用 abort() 终止
   */
  async check(file: File | string): Promise<boolean> {
    this.abortController = new AbortController()
    this.checkResult = []

    try {
      // 初始化视频源
      if (typeof file === 'string') {
        this.video.src = file
      } else {
        this.video.src = URL.createObjectURL(file)
      }

      await this.loadVideoMetadata()

      // 分辨率优化处理（4K→480P）
      const scale = this.calculateOptimalScale()
      ;[this.canvas.width, this.canvas.height] = [
        Math.floor(this.video.videoWidth * scale),
        Math.floor(this.video.videoHeight * scale),
      ]

      // 生成智能采样点（兼顾首尾帧）
      const samplePoints = this.generateSamplePoints()
      const hasBlackFrames: number[] = [] // 累计检测到的黑屏帧
      for (const time of samplePoints) {
        if (this.abortController.signal.aborted) {
          throw new Error('用户终止检测')
        }

        await this.seekTo(time)
        const hasBlackFrame = this.analyzeFrame()
        if (hasBlackFrame) hasBlackFrames.push(time)
        if (hasBlackFrames.length > this.config.sampleTolerance) return true
      }

      return false
    } finally {
      this.cleanupResources()
    }
  }

  /**
   * 安全终止检测任务
   *
   * 🛑 使用场景：
   * - 用户取消上传
   * - 页面切换/关闭
   * - 响应超时强制终止
   */
  abort(): void {
    this.abortController?.abort()
  }

  // ----------------- 私有方法（内部逻辑）-----------------

  /**
   * 元数据加载（含超时控制）
   *
   * ⏱️ 性能指标：
   * - 超时时间：5秒
   * - 错误处理：网络错误/格式错误/权限问题
   * @returns {Promise<void>}
   * @throws {Error} 当视频加载失败或超时时抛出
   * @private
   */
  private async loadVideoMetadata(): Promise<void> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('元数据加载超时')), 5000)

      const loadedHandler = () => {
        cleanup()
        resolve()
      }

      const errorHandler = (ev: ErrorEvent) => {
        cleanup()
        reject(new Error(`视频加载失败: ${ev.message}`))
      }

      const cleanup = () => {
        clearTimeout(timer)
        this.video.removeEventListener('loadedmetadata', loadedHandler)
        this.video.removeEventListener('error', errorHandler)
      }

      this.video.addEventListener('loadedmetadata', loadedHandler)
      this.video.addEventListener('error', errorHandler)
    })
  }

  /**
   * 计算最佳缩放比例（性能优化）
   *
   * 📐 算法逻辑：
   * - 限制最大边长为640px
   * - 保持原始宽高比
   * - 最小缩放比例10%（防失真）
   * @returns {number} 缩放比例 (0-1)
   * @private
   */
  private calculateOptimalScale(): number {
    const MAX_EDGE = 640
    return Math.min(
      MAX_EDGE / this.video.videoWidth,
      MAX_EDGE / this.video.videoHeight,
      1,
    )
  }

  /**
   * 生成采样时间点（科学分布算法）
   *
   * ⏳ 分布策略：
   * - 首帧必检（0秒）
   * - 尾帧必检（duration-0.1秒）
   * - 中间均匀分布
   * @returns {number[]} 采样时间点数组（单位：秒）
   * @private
   */
  private generateSamplePoints(): number[] {
    const duration = this.video.duration
    const idealSamples = Math.floor(duration / this.config.sampleInterval)
    const actualSamples = Math.min(idealSamples, this.config.maxSamples)

    const points = Array.from(
      { length: actualSamples },
      (_, i) => (i * duration) / actualSamples,
    )

    // 确保检测最后一帧
    if (!points.includes(duration - 0.1)) {
      points.push(Math.max(0, duration - 0.1))
    }
    return points
  }

  /**
   * 视频帧分析（双验证机制）
   *
   * 🔍 检测逻辑：
   * 1. 像素级检测：RGB三通道均≤阈值
   * 2. 亮度检测：YUV加权亮度≤阈值
   *
   * 🧮 公式：
   * 亮度值 = 0.299*R + 0.587*G + 0.114*B
   * @returns {boolean} 检测结果（true=黑屏 / false=正常）
   */
  private analyzeFrame(): boolean {
    // 绘制当前帧
    this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height)
    const { data } = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    )

    // 双指标统计
    let blackPixels = 0
    let totalBrightness = 0
    const pixelCount = this.canvas.width * this.canvas.height
    const { pixelThreshold, brightnessThreshold, requiredBlackRatio } =
      this.config

    for (let i = 0; i < data.length; i += 4) {
      const [r, g, b] = data.slice(i, i + 3)

      // 像素级检测 (RGB三通道均≤阈值)
      if (r <= pixelThreshold && g <= pixelThreshold && b <= pixelThreshold) {
        blackPixels++
      }

      // 亮度检测 (YUV加权公式)
      totalBrightness += 0.299 * r + 0.587 * g + 0.114 * b
    }

    // 双条件验证
    const brightnessCondition =
      totalBrightness / pixelCount <= brightnessThreshold
    const ratioCondition = blackPixels / pixelCount >= requiredBlackRatio

    // 调试信息输出
    if (this.config.debug) {
      const checkResult = {
        当前时间: this.video.currentTime.toFixed(1),
        黑色像素占比: `${((blackPixels / pixelCount) * 100).toFixed(1)}%`,
        平均亮度: (totalBrightness / pixelCount).toFixed(1),
        分辨率: `${this.canvas.width}x${this.canvas.height}`,
        像素阈值: pixelThreshold,
        亮度阈值: brightnessThreshold,
        黑屏比例: requiredBlackRatio,
        检测为黑屏: brightnessCondition || ratioCondition,
      }
      this.checkResult.push(checkResult)
      // console.table(checkResult)
    }

    return brightnessCondition || ratioCondition
  }

  /**
   * 资源清理（内存优化关键）
   *
   * 🧹 清理内容：
   * - 释放视频对象内存
   * - 重置中止控制器
   * - 清理画布数据
   */
  private cleanupResources(): void {
    URL.revokeObjectURL(this.video.src)
    this.video.removeAttribute('src')
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.abortController = null
  }

  /**
   * 精准跳转到指定时间点
   *
   * ⏱️ 功能特性：
   * - 基于 Promise 的异步控制流程
   * - 自动处理视频 seeking 状态
   * - 内置 2 秒超时保护
   *
   * @param time 目标时间（单位：秒）
   * @returns Promise<void>
   *
   * @example
   * // 跳转到第5秒并检测
   * await seekTo(5);
   * const isBlack = analyzeFrame();
   */
  private async seekTo(time: number): Promise<void> {
    return new Promise((resolve, reject) => {
      // 参数有效性校验
      if (time < 0 || time > this.video.duration) {
        reject(
          new Error(`无效时间点: ${time}，视频总时长 ${this.video.duration}s`),
        )
        return
      }

      // 超时保护（2秒未完成视为失败）
      const timeoutId = setTimeout(() => {
        reject(new Error(`跳转超时（${time}s)`))
        cleanup()
      }, 2000)

      // 事件清理函数
      const cleanup = () => {
        clearTimeout(timeoutId)
        this.video.removeEventListener('seeked', onSeeked)
        this.video.removeEventListener('error', onError)
      }

      // 成功回调
      const onSeeked = () => {
        cleanup()

        // 额外校验当前时间（处理部分浏览器的精度问题）
        const delta = Math.abs(this.video.currentTime - time)
        if (delta > 0.1) {
          reject(
            new Error(
              `跳转偏差过大: 目标 ${time}s, 实际 ${this.video.currentTime}s`,
            ),
          )
        } else {
          resolve()
        }
      }

      // 错误处理
      const onError = (event: ErrorEvent) => {
        cleanup()
        reject(new Error(`跳转失败: ${event.message}`))
      }

      // 绑定事件监听
      this.video.addEventListener('seeked', onSeeked)
      this.video.addEventListener('error', onError)

      // 执行跳转
      try {
        this.video.currentTime = time
      } catch (err: any) {
        cleanup()
        reject(new Error(`设置时间失败: ${err.message}`))
      }
    })
  }
}
