/**
 * @ Author: willysliang
 * @ CreateTime: 2025-04-09 17:32:37
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-04-10 16:52:14
 * @ Description: 音视频可视化-音频声波图（通过 canvas 对视频或音频绘制声波图）
 */

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext
  }
}

type MediaSource = HTMLAudioElement | HTMLVideoElement

export class AudioVisualizer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private audioContext: AudioContext
  private analyser: AnalyserNode
  private animationFrameId: number | null = null
  private mediaSourceNode: MediaElementAudioSourceNode | null = null
  private streamSourceNode: MediaStreamAudioSourceNode | null = null
  public mediaElement?: MediaSource

  constructor(canvas: HTMLCanvasElement, mediaElement?: MediaSource) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!

    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    this.analyser = this.audioContext.createAnalyser()
    this.analyser.fftSize = 2048

    this.mediaElement = mediaElement

    this.initMediaElement()
  }

  // 初始化媒体元素连接
  private initMediaElement() {
    if (!this.mediaElement) return

    this.mediaElement.addEventListener('play', () => {
      this.connectMediaElement(this.mediaElement!)
      this.startVisualization()
    })

    this.mediaElement.addEventListener('pause', () => this.stopVisualization())
  }

  // 连接媒体元素（音频/视频）
  private connectMediaElement(element: MediaSource) {
    // 清理现有连接
    this.disconnectSources()

    this.mediaSourceNode = this.audioContext.createMediaElementSource(element)
    this.connectAnalyser()
  }

  // 连接媒体流（用于麦克风/屏幕共享）
  public async connectMediaStream(stream: MediaStream) {
    this.streamSourceNode?.disconnect()
    this.streamSourceNode = this.audioContext.createMediaStreamSource(stream)
    this.connectAnalyser()
    this.startVisualization()
  }

  // 通用Analyser连接逻辑
  private connectAnalyser() {
    if (this.mediaSourceNode) {
      this.mediaSourceNode.connect(this.analyser)
    } else if (this.streamSourceNode) {
      this.streamSourceNode.connect(this.analyser)
    }
    this.analyser.connect(this.audioContext.destination)
  }

  // 启动可视化渲染
  public startVisualization() {
    if (!this.animationFrameId) {
      this.animationFrameId = requestAnimationFrame(this.draw.bind(this))
    }
  }

  // 停止可视化
  public stopVisualization() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
      this.clearCanvas()
    }
  }

  // 绘制逻辑（可切换波形/频谱）
  private draw() {
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount)
    const dataArrayLength = dataArray.length
    this.analyser.getByteTimeDomainData(dataArray) // 改用时域数据绘制波形
    // this.analyser.getByteFrequencyData(dataArray) // 使用频域数据绘制频谱

    const { width, height } = this.canvas
    const sliceWidth = width / dataArrayLength

    this.ctx.clearRect(0, 0, width, height)
    this.ctx.beginPath()
    this.ctx.lineWidth = 2
    this.ctx.strokeStyle = '#2196f3'

    for (let i = 0; i < dataArrayLength; i++) {
      const value = dataArray[i] / 128.0 - 1.0 // -1到1的范围
      const y = (value * height) / 2 + height / 2 // 居中显示

      if (i === 0) {
        this.ctx.moveTo(0, y)
      } else {
        this.ctx.lineTo(i * sliceWidth, y)
      }
    }

    this.ctx.stroke()

    // const WIDTH = this.canvas.width
    // const HEIGHT = this.canvas.height - 2
    // const meterWidth = 2 // 频谱条宽度
    // const gap = 2 // 频谱条间距
    // const capHeight = 100 // 频谱条高度
    // const capStyle = 'rgb(6, 247, 8)' // #2196f3 频谱条颜色
    // const meterNum = 20 / (gap + 2) // 频谱条数量
    // const capYPositionArray: number[] = [] // 频谱条顶点位置数组

    // this.ctx.clearRect(0, 0, WIDTH, HEIGHT) // 清空画布
    // this.ctx.fillStyle = capStyle // 设置频谱条颜色

    // const step = Math.round(dataArrayLength / meterNum) // 采样步长

    // for (let i = 0; i < meterNum; i++) {
    //   // const value = dataArray[i] / 128.0 - 1.0 // -1到1的范围
    //   // const y = (value * height) / 2 + height / 2 // 居中显示
    //   const value = dataArray[i * step] // 获取当前能量值

    //   if (capYPositionArray.length < Math.round(meterNum)) {
    //     capYPositionArray.push(value) // 初始化顶点位置数组，并将第一个画面数据压入
    //   }
    //   if (value < capYPositionArray[i]) {
    //     this.ctx.fillRect(
    //       i * 4,
    //       HEIGHT - --capYPositionArray[i],
    //       meterWidth,
    //       capHeight,
    //     )
    //   } else {
    //     this.ctx.fillRect(i * 4, HEIGHT - value, meterWidth, capHeight)
    //     capYPositionArray[i] = value
    //   }
    //   this.ctx.fillRect(
    //     i * 4,
    //     HEIGHT - value + capHeight,
    //     meterWidth,
    //     capHeight,
    //   )
    // }

    this.animationFrameId = requestAnimationFrame(this.draw.bind(this))
  }

  // 清空画布
  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  // 处理文件输入（支持音频/视频）
  public static async createFromFile(
    canvas: HTMLCanvasElement,
    file: File,
  ): Promise<AudioVisualizer> {
    const url = URL.createObjectURL(file)
    const isVideo = file.type.startsWith('video/')

    const mediaElement = isVideo
      ? this.createVideoElement(url)
      : this.createAudioElement(url)

    document.body.appendChild(mediaElement)

    // 视频需要静音才能自动播放
    if (isVideo) (mediaElement as HTMLVideoElement).muted = true

    return new Promise((resolve, reject) => {
      mediaElement.addEventListener('loadedmetadata', () => {
        const visualizer = new AudioVisualizer(canvas, mediaElement)
        resolve(visualizer)
      })

      const errorHandler = () => {
        reject(new Error('Failed to load media file'))
        mediaElement.removeEventListener('error', errorHandler)
      }
      mediaElement.addEventListener('error', errorHandler)
    })
  }

  private static createAudioElement(url: string): HTMLAudioElement {
    const audio = new Audio()
    audio.src = url
    audio.controls = true
    audio.style.position = 'fixed'
    audio.style.opacity = '0'
    audio.style.pointerEvents = 'none'
    return audio
  }

  private static createVideoElement(url: string): HTMLVideoElement {
    const video = document.createElement('video')
    video.src = url
    video.controls = true
    video.style.position = 'fixed'
    video.style.opacity = '0'
    video.style.pointerEvents = 'none'
    return video
  }

  // 统一断开连接的方法
  private disconnectSources() {
    this.mediaSourceNode?.disconnect()
    this.streamSourceNode?.disconnect()
    this.analyser.disconnect()

    this.mediaSourceNode = null
    this.streamSourceNode = null

    // 保持目的地的连接
    this.analyser.connect(this.audioContext.destination)
  }

  // 释放资源
  public destroy() {
    this.stopVisualization()
    this.disconnectSources()

    if (this.audioContext.state !== 'closed') {
      this.audioContext.close()
    }

    if (this.mediaElement) {
      this.mediaElement.pause()
      // this.mediaElement.removeAttribute('src');
    }
  }
}
