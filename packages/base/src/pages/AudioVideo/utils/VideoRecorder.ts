/**
 * @ Author: willysliang
 * @ CreateTime: 2025-05-15 22:51:28
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-26 14:35:56
 * @ Description: 视频录制
 */

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext
  }
}

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
    2. 在录制的视频中添加时间戳水印
    3. 录制过程中的音频可视化绘制为频谱图
    3. 把录制的视频保存到本地

 * @memberof #startRecording 开始录制视频
 * @memberof #stopRecording 停止录制视频
 * @memberof #saveAsFile 保存录制的视频文件
 *
 * 私有方法
 * @memberof #getSources 获取屏幕共享和摄像头媒体流
 * @memberof #compositeStream 创建合成视频流
 * @memberof #drawCompositeView 合并视图画面，可自定义画面布局样式
 * @memberof #drawAudioVisualization 可视化渲染音频-绘制频谱图
 * @memberof #stopTracks 关闭所有媒体轨道，并清理预览显示
 *
 * 辅助方法
 * @memberof #getMimeType 自动兼容不同浏览器的视频编码格式
 * @memberof #getBitrate 根据分辨率计算比特率
 *
 * @example
    const videoRef = ref<HTMLVideoElement>()
    const canvasRef = ref<HTMLCanvasElement>()
    const recorder = new VideoRecorder()
    const showPreview = ref<boolean>(true) // 是否展示镜头视图

    // 摄像头列表
    const cameraList = ref<MediaDeviceInfo[]>([])
    const currentCamera = ref<MediaDeviceInfo['deviceId']>('')
    getCameraList().then((list) => {
      cameraList.value = list
      currentCamera.value = list[0]?.deviceId
    })

    // 开始录制
    const handleStartRecord = async () => {
      await recorder.startRecording(
        currentCamera.value,
        canvasRef.value!,
        showPreview.value ? videoRef.value! : undefined,
      )
    }

    // 结束录制
    const handleStopRecord = async () => {
      recorder.stopRecording()
    }

    // 保存视频
    const handleSaveVideo = async () => {
      recorder.saveAsFile()
    }
 */
export class VideoRecorder {
  /** 媒体流的源 */
  private sources: IRecordingSources = {}
  /** 媒体录制器 */
  private mediaRecorder?: MediaRecorder
  /** 录制的数据块 */
  private recordedChunks: Blob[] = []

  /** 屏幕共享和摄像头流播放的DOM */
  private videoElements: HTMLVideoElement[] = []
  /** 预览视频元素 */
  private previewVideo?: HTMLVideoElement

  /** 视频合成画布 */
  private canvas!: HTMLCanvasElement
  private ctx!: CanvasRenderingContext2D
  private animationFrameId?: number

  /** 频谱图 */
  private audioContext?: AudioContext
  private audioRAFId?: number

  constructor() {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')!
  }

  /**
   * @method 获取屏幕共享和摄像头媒体流
   */
  private async getSources(
    cameraDeviceId: MediaDeviceInfo['deviceId'],
  ): Promise<IRecordingSources> {
    try {
      const promises = [
        navigator.mediaDevices.getDisplayMedia({
          video: { frameRate: 24, deviceId: cameraDeviceId },
          audio: {
            echoCancellation: true, // 回声消除
            noiseSuppression: true, // 开启降噪 噪音抑制
            autoGainControl: false, // 自动增益控制(在原有录音基础上是否增加音量)
          },
        }),
        navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
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
   * @method 合并视图画面，绘制视频帧（含布局和水印）
   * @description 可自定义画面布局样式(如添加时间戳、绘制边框等)
   *  - 主画面为屏幕共享内容
   *  - 右下角为摄像头画面
   *  - 左下角为水印时间戳
   *  - 画面尺寸与屏幕流一致，并根据设备性能调整画质
   *  - 同步的音频录制
   */
  private async drawCompositeView() {
    if (!this.sources.screen || !this.sources.camera) return

    /**
     * 初始化视频元素
     */
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

    // 初始化画布尺寸
    const setupCanvas = () => {
      // 设置画布尺寸与屏幕流一致，并根据设备性能调整画质
      const isMobile = /Android|webOS|iPhone|iPad/i.test(navigator.userAgent)
      const quality = isMobile ? 0.7 : 1
      this.canvas.width = screenVideo.videoWidth * quality
      this.canvas.height = screenVideo.videoHeight * quality

      // 优化绘制性能
      this.ctx.imageSmoothingEnabled = true
      this.ctx.imageSmoothingQuality = 'high'
    }
    setupCanvas()

    /**
     * 动态时间戳水印绘制
     */
    const drawTimestampWatermark = () => {
      const watermarkStyle = {
        fontSize: 32,
        fontColor: 'rgba(255,255,255,0.8)',
        position: 'bottom-left',
      }
      const { fontColor, fontSize, position } = watermarkStyle
      this.ctx.font = `bold ${fontSize || 24}px Arial`
      this.ctx.fillStyle = fontColor || 'rgba(255, 0, 0, 0.7)'
      this.ctx.textBaseline = 'top'
      const timestamp = new Date().toLocaleTimeString()

      const padding = 20
      const x = position?.includes('right') ? this.canvas.width - 200 : padding
      const y = position?.includes('bottom') ? this.canvas.height - 50 : padding

      // 文字阴影效果
      this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
      this.ctx.shadowBlur = 4
      this.ctx.shadowOffsetX = 2
      this.ctx.shadowOffsetY = 2
      this.ctx.fillText(timestamp, x, y)
      this.ctx.restore()
    }

    /**
     * 画中画布局
     */
    const drawFrame = () => {
      const { width, height } = this.canvas
      this.ctx.clearRect(0, 0, width, height)

      // 绘制主屏幕
      if (screenVideo.readyState >= 2) {
        this.ctx.drawImage(screenVideo, 0, 0, width, height)
      }

      // 如果没有摄像头没有展示到页面，在右下角绘制摄像头画中画
      if (!this.previewVideo && cameraVideo.readyState >= 2) {
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

      // 绘制时间戳水印
      drawTimestampWatermark()

      this.animationFrameId = requestAnimationFrame(drawFrame)
    }

    drawFrame()
  }

  /**
   * @method 可视化渲染音频-绘制频谱图
   * @description 音视频可视化-音频声波图（通过 canvas 对视频或音频绘制声波图）
   */
  private drawAudioVisualization(
    stream: MediaStream,
    canvasElement: HTMLCanvasElement,
  ) {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
      latencyHint: 'interactive', // 超低延迟模式
      sampleRate: 48000, // 专业音频采样率
    })
    const source = this.audioContext.createMediaStreamSource(stream)

    // 创建分析器节点
    const analyser = this.audioContext.createAnalyser()
    analyser.fftSize = 256
    source.connect(analyser)

    const canvas = canvasElement
    const ctx = canvas.getContext('2d')!

    const dataArray = new Uint8Array(analyser.frequencyBinCount)
    const dataArrayLength = dataArray.length

    /**
     * 轮询绘制频谱
     */
    const draw = () => {
      // analyser.getByteTimeDomainData(dataArray) // 改用时域数据绘制波形
      analyser.getByteFrequencyData(dataArray) // 使用频域数据绘制频谱

      const WIDTH = canvas.width
      const HEIGHT = canvas.height - 2
      const meterWidth = 2 // 频谱条宽度
      const gap = 2 // 频谱条间距
      const capHeight = 100 // 频谱条高度
      const capStyle = 'rgb(6, 247, 8)' // #2196f3 频谱条颜色
      const meterNum = 20 / (gap + 2) // 频谱条数量
      const capYPositionArray: number[] = [] // 频谱条顶点位置数组

      ctx.clearRect(0, 0, WIDTH, HEIGHT) // 清空画布
      ctx.fillStyle = capStyle // 设置频谱条颜色

      const step = Math.round(dataArrayLength / meterNum) // 采样步长

      for (let i = 0; i < meterNum; i++) {
        const value = dataArray[i * step] // 获取当前能量值

        if (capYPositionArray.length < Math.round(meterNum)) {
          capYPositionArray.push(value) // 初始化顶点位置数组，并将第一个画面数据压入
        }
        if (value < capYPositionArray[i]) {
          ctx.fillRect(
            i * 4,
            HEIGHT - --capYPositionArray[i],
            meterWidth,
            capHeight,
          )
        } else {
          ctx.fillRect(i * 4, HEIGHT - value, meterWidth, capHeight)
          capYPositionArray[i] = value
        }
        ctx.fillRect(i * 4, HEIGHT - value + capHeight, meterWidth, capHeight)
      }

      this.audioRAFId = requestAnimationFrame(draw)
    }

    draw()
  }

  /**
   * @method 创建合成视频流
   * @param {boolean} needVideoComposite 是否需要合成
   *    - needVideoComposite=true，需要合成（把摄像头视图合成到视频流中）
   *    - needVideoComposite=false，直接返回所有媒体轨道（在页面有设置预览视频元素时，直接返回合成后的视频流）
   */
  private async compositeStream(): Promise<MediaStream> {
    // 视频合成
    await this.drawCompositeView()

    // 创建合成视频流
    const stream = this.canvas.captureStream(25) // 25fps

    // 合并所有音频轨道到视频中
    ;[this.sources.screen!, this.sources.camera!].forEach((source) => {
      source.getAudioTracks().forEach((track) => stream.addTrack(track))
    })
    return stream
  }

  /**
   * @method 关闭所有媒体轨道，并清理预览显示
   * @description 清除上次录制的副作用
   */
  private stopTracks(sources: IRecordingSources = this.sources) {
    Object.values(sources).forEach((stream) =>
      stream?.getTracks().forEach((t) => t.stop()),
    )
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

    // 关闭音频上下文
    if (this.audioContext) {
      this.audioContext.close()
      this.audioContext = undefined
    }
    // 停止音频绘制
    this.audioRAFId && cancelAnimationFrame(this.audioRAFId)

    // 停止动画绘制 & 清除画布
    this.animationFrameId && cancelAnimationFrame(this.animationFrameId)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  // ================== 暴露给外部用的调用方法 ==================
  /**
   * @method 开始录制视频
   */
  public async startRecording(
    cameraDeviceId: MediaDeviceInfo['deviceId'],
    canvasElement: HTMLCanvasElement,
    previewElement?: HTMLVideoElement,
  ) {
    this.stopTracks() // 前置处理-开始前先关闭已有流

    this.previewVideo = previewElement
    this.sources = await this.getSources(cameraDeviceId) // 获取媒体流
    const stream = await this.compositeStream() // 获取合成后的视频流

    // 绘制频谱图
    this.drawAudioVisualization(stream, canvasElement)

    // 显示摄像头预览
    if (this.previewVideo && this.sources.camera) {
      this.previewVideo.srcObject = this.sources.camera
      // this.previewVideo.srcObject = stream
      await this.previewVideo.play()
    }

    // 准备录制
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: this.getMimeType(),
      videoBitsPerSecond: this.getBitrate(),
      audioBitsPerSecond: 128_000, // 每秒音频比特率
    })

    this.recordedChunks = []
    this.mediaRecorder.ondataavailable = (e) => {
      e.data.size && this.recordedChunks.push(e.data)
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
      this.mediaRecorder?.stop()
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
      'video/mp4;codecs=avc1', // h264
      'video/webm;codecs=vp9', // vp9
      'video/webm;codecs=vp8', // vp8
    ] as const

    return MIME_TYPES.find(MediaRecorder.isTypeSupported) || 'video/webm'
  }

  /**
   * @method 根据分辨率计算比特率
   * @returns {number} 比特率
   */
  private getBitrate(): number {
    // const isHD = this.canvas.width >= 1280 || this.canvas.height >= 720
    // return isHD ? 5_000_000 : 2_500_000

    return this.canvas.width * this.canvas.height * 24 * 0.15 // 基于分辨率和帧率的动态比特率
  }
}

/**
 * @method 获取摄像头设备列表
 * @return {Promise<MediaDeviceInfo[]>} 摄像头设备列表
 */
export const getCameraList = async (): Promise<MediaDeviceInfo[]> => {
  const devices = await navigator.mediaDevices.enumerateDevices()
  return devices.filter((d) => d.kind === 'videoinput')
}
