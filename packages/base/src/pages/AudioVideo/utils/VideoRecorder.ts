/**
 * @ Author: willysliang
 * @ CreateTime: 2025-05-15 22:51:28
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-16 17:16:08
 * @ Description: 视频录制
 */

/** 录制源接口 */
interface IRecordingSources {
  screen?: MediaStream
  camera?: MediaStream
}

/**
 * @class VideoRecorder 视频录制
 * @description
    1. 录制屏幕和摄像头内容，并合成视频
      - 如果有把摄像头视图渲染到页面上，录制的视频则忽略摄像头媒体流的合成，只把摄像头音频流合成到视频流中
    2. 在录制的视频中添加水印时间戳
    3. 把录制的视频保存到本地

 * @memberof #startRecording 开始录制视频
 * @memberof #stopRecording 停止录制视频
 * @memberof #saveAsFile 保存录制的视频文件
 *
 * 私有方法
 * @memberof #getSources 获取屏幕共享和摄像头媒体流
 * @memberof #compositeStream 创建合成视频流
 * @memberof #drawCompositeView 合并视图画面，可自定义画面布局样式
 * @memberof #stopTracks 关闭所有媒体轨道，并清理预览显示
 *
 * 辅助方法
 * @memberof #getMimeType 自动兼容不同浏览器的视频编码格式
 * @memberof #getBitrate 根据分辨率计算比特率
 *
 */
export class VideoRecorder {
  /** 媒体流的源 */
  private sources: IRecordingSources = {}
  /** 录制器 */
  private mediaRecorder?: MediaRecorder
  /** 录制的数据块 */
  private recordedChunks: Blob[] = []

  /** 屏幕共享和摄像头流播放的DOM */
  private videoElements: HTMLVideoElement[] = []

  /** 预览视频元素引用 */
  private previewVideo?: HTMLVideoElement

  /** 视频合成画布 */
  private canvas!: HTMLCanvasElement
  /** 视频合成画布上下文 */
  private ctx!: CanvasRenderingContext2D
  /** 视频合成动画帧ID */
  private animationFrameId?: number

  constructor() {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')!
  }

  /**
   * @method 获取屏幕共享和摄像头媒体流
   */
  private async getSources(): Promise<IRecordingSources> {
    try {
      const promises = [
        navigator.mediaDevices.getDisplayMedia({
          video: { frameRate: 24 },
          audio: false,
        }),
        navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240 },
          audio: true,
        }),
      ]
      const [screenStream, cameraStream] = await Promise.all(promises)
      const sources = { screen: screenStream, camera: cameraStream }

      // 强制检查是否存在有效轨道
      if (
        !screenStream.getVideoTracks().length ||
        !cameraStream.getVideoTracks().length
      ) {
        this.stopTracks(sources)
        throw new Error('必须提供有效的视频轨道')
      }

      return sources
    } catch (error) {
      const ERROR_MAP = {
        NotAllowedError: '请允许访问屏幕和摄像头权限 ➔',
        NotFoundError: '未找到视频设备，请检查摄像头连接 🔍',
        NotReadableError: '设备已被其他程序占用 🔒',
        OverconstrainedError: '无法满足分辨率要求',
        default: `媒体获取失败: ${error instanceof Error ? error.message : String(error)}`,
      }
      throw new Error(
        error instanceof DOMException
          ? ERROR_MAP[error.name] || ERROR_MAP.default
          : ERROR_MAP.default,
      )
    }
  }

  /**
   * @method 合并视图画面，可自定义画面布局样式(如添加时间戳、绘制边框等)
   *  - 主画面为屏幕共享内容
   *  - 右下角为摄像头画面
   *  - 左下角为水印时间戳
   *  - 画面尺寸与屏幕流一致，并根据设备性能调整画质
   *  - 同步的音频录制
   */
  private async drawCompositeView() {
    if (!this.sources.screen || !this.sources.camera) return

    this.videoElements = await Promise.all(
      [this.sources.screen, this.sources.camera].map(async (stream) => {
        const video = document.createElement('video')
        video.srcObject = stream
        video.muted = true
        video.play()
        await new Promise((resolve) => (video.onloadedmetadata = resolve))
        return video
      }),
    )
    const [screenVideo, cameraVideo] = this.videoElements

    // 初始化画布
    const setupCanvas = () => {
      // 设置画布尺寸与屏幕流一致，并根据设备性能调整画质
      const isLowEnd = /Android|webOS|iPhone|iPad/i.test(navigator.userAgent)
      const quality = isLowEnd ? 0.7 : 1
      this.canvas.width = screenVideo.videoWidth * quality
      this.canvas.height = screenVideo.videoHeight * quality

      // 优化绘制性能
      this.ctx.imageSmoothingEnabled = true
      this.ctx.imageSmoothingQuality = 'high'
    }
    setupCanvas()

    // 添加时间戳水印
    const drawTimestamp = () => {
      const watermarkStyle = {
        fontSize: 32,
        fontColor: '#ccc',
        position: 'bottom-left',
      }
      const { fontColor, fontSize, position } = watermarkStyle
      this.ctx.font = `${fontSize || 24}px Arial`
      this.ctx.fillStyle = fontColor || 'rgba(255, 0, 0, 0.7)'
      this.ctx.textBaseline = 'top'
      const timestamp = new Date().toLocaleTimeString()
      this.ctx.fillText(timestamp, 20, 20)

      const padding = 20
      const x = position?.includes('right') ? this.canvas.width - 200 : padding
      const y = position?.includes('bottom') ? this.canvas.height - 50 : padding
      this.ctx!.fillText(timestamp, x, y)
    }

    // 绘制帧
    const drawFrame = () => {
      const { width, height } = this.canvas

      // 绘制主屏幕
      if (screenVideo.readyState >= 2) {
        this.ctx.drawImage(screenVideo, 0, 0, width, height)
      }

      // 在右下角绘制摄像头画中画
      if (cameraVideo.readyState >= 2) {
        const previewWidth = width / 4
        const previewHeight =
          (previewWidth * cameraVideo.videoHeight) / cameraVideo.videoWidth

        this.ctx.drawImage(
          cameraVideo,
          width - previewWidth - 10,
          height - previewHeight - 10,
          previewWidth,
          previewHeight,
        )
      }

      drawTimestamp()

      this.animationFrameId = requestAnimationFrame(drawFrame)
    }

    drawFrame()
  }

  /**
   * @method 创建合成视频流
   * @param {boolean} needComposite 是否需要合成
   *    - 默认为true，即需要合成（把摄像头视图合成到视频流中）
   *    - false时，直接返回所有媒体轨道（在页面有设置预览视频元素时，直接返回合成后的视频流）
   */
  private async compositeStream(needComposite = true): Promise<MediaStream> {
    if (needComposite) {
      await this.drawCompositeView()
      const stream = this.canvas.captureStream(25) // 匹配屏幕刷新率
      // 添加摄像头音频
      this.sources.camera?.getTracks().forEach((t) => stream.addTrack(t))
      return stream
    }

    const merged = new MediaStream()
    this.sources.screen?.getTracks().forEach((t) => merged.addTrack(t))
    this.sources.camera?.getTracks().forEach((t) => merged.addTrack(t))
    return merged
  }

  /**
   * @method 关闭所有媒体轨道，并清理预览显示
   * @description 清除上次录制的副作用
   */
  private stopTracks(sources: IRecordingSources = this.sources) {
    sources.screen?.getTracks().forEach((t) => t.stop())
    sources.camera?.getTracks().forEach((t) => t.stop())
    sources = { screen: undefined, camera: undefined }

    // 停止媒体流
    this.mediaRecorder?.stream.getTracks().forEach((track) => track.stop())
    this.mediaRecorder = undefined

    // 清除视频元素
    this.videoElements.forEach((video) => {
      video.pause()
      video.srcObject = null
      video.remove()
    })
    this.videoElements = []

    // 清除预览显示
    if (this.previewVideo) {
      this.previewVideo.pause()
      this.previewVideo.srcObject = null
      this.previewVideo = undefined
    }

    // 停止动画绘制 & 清除画布
    this.animationFrameId && cancelAnimationFrame(this.animationFrameId)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  /**
   * @method 开始录制视频
   */
  public async startRecording(previewElement?: HTMLVideoElement) {
    this.stopTracks() // 前置处理-开始前先关闭已有流

    this.previewVideo = previewElement

    this.sources = await this.getSources()

    // 显示摄像头预览
    if (this.previewVideo && this.sources.camera) {
      this.previewVideo.srcObject = this.sources.camera
      await this.previewVideo.play()
    }

    // 获取合成后的视频流，准备录制
    const compositeStream = await this.compositeStream(!this.previewVideo)
    this.mediaRecorder = new MediaRecorder(compositeStream, {
      mimeType: this.getMimeType(),
      videoBitsPerSecond: this.getBitrate(),
    })

    this.recordedChunks = []
    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) this.recordedChunks.push(e.data)
    }

    this.mediaRecorder.start(100)
  }

  /**
   * @method 停止录制视频
   */
  public stopRecording() {
    if (!this.mediaRecorder) throw new Error('录制未开始')

    // 添加录制结束监听
    return new Promise<void>((resolve) => {
      this.mediaRecorder!.onstop = () => resolve()
      this.mediaRecorder!.stop()
      this.stopTracks()
    })
  }

  /**
   * @method 保存录制的视频文件
   */
  public saveAsFile(filename: string = 'recording') {
    if (this.recordedChunks.length === 0) return

    const mimeType = this.mediaRecorder?.mimeType || 'video/webm'
    const extension = mimeType.includes('mp4') ? 'mp4' : 'webm'
    const blob = new Blob(this.recordedChunks, { type: mimeType })

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${filename}.${extension}`
    link.click()

    setTimeout(() => {
      URL.revokeObjectURL(link.href)
      link.remove()
    }, 100)
  }

  // ================== 辅助工具方法 ==================
  /**
   * @method 自动兼容不同浏览器的视频编码格式
   * @returns {string} 检查 MediaRecorder 格式支持并返回
   */
  private getMimeType(): string {
    const MIME_TYPES = [
      'video/webm;codecs=vp9', // vp9
      'video/mp4;codecs=avc1', // h264
    ] as const

    return (
      MIME_TYPES.find((type) => MediaRecorder.isTypeSupported(type)) ||
      'video/webm'
    )
  }

  /**
   * @method 根据分辨率计算比特率
   * @returns {number} 比特率
   */
  private getBitrate(): number {
    const isHD = this.canvas.width >= 1280 || this.canvas.height >= 720
    return isHD ? 5_000_000 : 2_500_000
  }
}
