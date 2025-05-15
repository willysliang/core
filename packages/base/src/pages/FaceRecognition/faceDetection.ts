/**
 * @ Author: willysliang
 * @ CreateTime: 2025-05-13 14:11:56
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-15 19:31:01
 * @ Description: 人脸识别
 */

import * as faceapi from 'face-api.js'
import markImg from '@/assets/images/default.png'

interface IOptions {
  /** 视频区域的宽高配置 */
  mediaSize: {
    width: number
    height: number
  }
  /** 匹配的阈值 */
  matchedScore: number
  /** 是否为视频人脸打码（如果否则绘制人脸框，是则绘制人脸打码图） */
  showMark: boolean
  /** 人脸识别成功的回调 */
  successCallback: () => void
  /** 是否立即检测 */
  immediate: boolean
}

export class FaceDetection {
  /** 模型的配置参数 */
  options: IOptions
  /** 视频区域 */
  videoEl: HTMLVideoElement
  /** 人脸框绘制区域 */
  trackBoxEl: HTMLCanvasElement
  /** 摄像头媒体流 */
  mediaStream?: any = null
  /** 打码图 */
  markImg: HTMLImageElement = new Image()

  /** 检测到的人脸位置 */
  detectedFaces: Array<faceapi.Box<any>> = []
  /** 提取的人脸图 */
  faceImages: HTMLCanvasElement[] = []

  /** 调用人脸识别倒计时 */
  timer: null | NodeJS.Timeout = null

  constructor(
    options: Partial<IOptions>,
    container: HTMLElement = document.body,
  ) {
    this.options = Object.assign(
      {
        mediaSize: {
          width: 540,
          height: 325,
        },
        matchedScore: 0.9,
        showMark: false,
        immediate: true,
        successCallback: () => {},
      },
      options,
    )

    const { width, height } = this.options.mediaSize
    this.markImg.src = markImg

    // 创建 video 元素
    this.videoEl = document.createElement('video')
    this.videoEl.setAttribute('autoplay', 'true')
    this.videoEl.setAttribute('playsinline', 'true') // 移动端兼容
    this.videoEl.style.width = width + 'px'
    this.videoEl.style.height = height + 'px'
    this.videoEl.style.objectFit = 'cover'

    // 创建 canvas 元素
    this.trackBoxEl = document.createElement('canvas')
    this.trackBoxEl.style.position = 'absolute'
    this.trackBoxEl.style.top = '0'
    this.trackBoxEl.style.left = '0'
    this.trackBoxEl.style.width = width + 'px'
    this.trackBoxEl.style.height = height + 'px'
    this.trackBoxEl.style.pointerEvents = 'none' // 防止遮挡视频

    container.appendChild(this.videoEl)
    container.appendChild(this.trackBoxEl)

    // 初始化
    this.initDetection()
  }

  /** 加载所需模型 */
  private async loadModels() {
    const MODEL_URL = './models' // 确保模型文件放在public/models目录下

    try {
      await Promise.all([
        // 加载模型 用于检测人脸
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        // 加载模型 用于检测68个面部关键点
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        // 加载面部特征模型
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        // 加载面部识别模型
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        // 加载年龄性别模型
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ])
    } catch (err) {
      this.errorInfo({ name: 'LoadModelsError' }, err)
      throw err // 抛出错误以便外部处理
    }
  }

  /** 获取媒体流错误处理 */
  private errorInfo(errorMsg, err?: unknown) {
    const errorMap = {
      LoadModelsError: '模型加载失败，请检查网络连接',

      NotAllowedError: '摄像头已被禁用，请在当前浏览器设置中开启后重试',
      AbortError: '硬件问题，导致无法访问摄像头',
      NotFoundError: '未检测到可用摄像头',
      NotReadableError:
        '操作系统上某个硬件、浏览器或者网页层面发生错误，导致无法访问摄像头',
      OverConstrainedError: '未检测到可用摄像头',
      SecurityError: '摄像头已被禁用，请在系统设置或者浏览器设置中开启后重试',
      TypeError: '类型错误，未检测到可用摄像头',
    }

    const errorName =
      errorMap[errorMsg.name] ||
      errorMsg.name ||
      '未知错误，请检查摄像头权限或浏览器设置'
    console.error(errorName, err)
    alert(errorName)
  }

  /** 初始化人脸识别 */
  public async initDetection() {
    try {
      await this.loadModels()
    } catch (err) {
      // 如果模型加载失败，停止初始化
      return
    }

    try {
      // 获取 WebRTC 媒体视频流
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      })

      // 初始化视频流
      if ('srcObject' in this.videoEl) {
        this.videoEl.srcObject = this.mediaStream
      } else {
        // 兼容旧版浏览器
        ;(this.videoEl as any).src = window.URL.createObjectURL(
          this.mediaStream,
        )
      }

      // 等待视频元数据加载完成
      await new Promise<void>((resolve) => {
        this.videoEl.onloadedmetadata = () => resolve()
      })

      // 开始检测
      this.options.immediate && this.onPlay()
    } catch (error) {
      this.errorInfo(error)
    }
  }

  /** 循环监听扫描视频流中的人脸特征 */
  public async onPlay() {
    // 判断视频对象是否暂停结束
    if (this.videoEl.paused || this.videoEl.ended) {
      this.timer = setTimeout(() => this.onPlay(), 100)
      return
    }

    // 使用 requestAnimationFrame 提高性能
    requestAnimationFrame(() => {
      this.detectFace()

      this.timer = setTimeout(() => this.onPlay(), 100)
    })
  }

  /** 检测人脸并绘制 */
  private async detectFace() {
    try {
      // 设置 TinyFaceDetector 模型参数
      const faceDetectionTask = await faceapi
        .detectAllFaces(
          this.videoEl,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 512,
            scoreThreshold: 0.6,
          }),
        )
        .withFaceLandmarks() // 获取人脸的标志点
        .withFaceExpressions() // 获取面部表情
        .withFaceDescriptors() // 获取面部特征
        .withAgeAndGender() // 获取年龄和性别

      // 清除之前的绘制
      this.clearFaceBox()

      // 判断人脸扫描结果(如果存在人脸，则把第一个人脸作为扫描结果)
      if (faceDetectionTask?.[0]) {
        await this.drawFaceBox(this.trackBoxEl, faceDetectionTask)

        // 如果配置非打码 & 人脸匹配度超过阈值，则停止扫描
        const score = faceDetectionTask[0].detection?.score
        if (!this.options.showMark && score > this.options.matchedScore) {
          console.log(`检测到人脸，匹配度大于 ${this.options.matchedScore}`)

          // 扫描到人脸，则暂停视频，并清除摄像头数据流，返回扫描成功回调
          this.videoEl.pause()
          this.mediaStream.getTracks().forEach((track) => track.stop())
          this.detectedFaces = faceDetectionTask.map((d) => d.detection.box)
          this.options.successCallback()
        }
      }
    } catch (error) {
      console.error('人脸检测错误:', error)
    }
  }

  /** 人脸框绘制 */
  private async drawFaceBox(trackBox: HTMLCanvasElement, detections) {
    const { width, height } = this.options.mediaSize
    const displaySize = { width, height }

    // 设置canvas和检测数据源的尺寸相同
    faceapi.matchDimensions(trackBox, displaySize)
    // 将检测到的面部结果调整为显示大小
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const ctx = trackBox.getContext('2d')!
    ctx.clearRect(0, 0, width, height)

    /**
     * 在canvas上绘制图像
     */
    const drawFace = () => {
      // 面框分值
      faceapi.draw.drawDetections(trackBox, resizedDetections)
      // 面部表情
      faceapi.draw.drawFaceExpressions(trackBox, resizedDetections)
      // 人脸的标志点
      faceapi.draw.drawFaceLandmarks(trackBox, resizedDetections)
      // 年龄和性别
      resizedDetections.forEach((detection) => {
        const { age, gender, genderProbability } = detection
        new faceapi.draw.DrawTextField(
          [
            `${Math.round(age)} Age`,
            `${gender} (${Math.round(genderProbability)})`,
          ],
          detection.detection.box.topRight,
        ).draw(trackBox)
      })
    }

    /**
     * 视频人脸打码
     */
    const drawMark = () => {
      ctx.drawImage(this.videoEl, 0, 0, width, height)
      // 遍历检测到的物体并绘制
      resizedDetections.forEach((item) => {
        const box = item.detection.box
        // 绘制物体
        ctx.drawImage(this.markImg, box.x, box.y, box.width, box.height)
      })
    }

    this.options.showMark ? drawMark() : drawFace()

    /** 提取识别到的人脸 */
    try {
      const faceImages = await faceapi.extractFaces(
        this.videoEl,
        detections.map((d) => d.detection),
      )
      this.faceImages = faceImages
    } catch (error) {
      console.error('提取人脸时出错:', error)
    }
  }

  /** 清除人脸框绘制 */
  private clearFaceBox() {
    const ctx = this.trackBoxEl.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, this.trackBoxEl.width, this.trackBoxEl.height)
    }
  }

  /** 销毁实例 */
  public destroy() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop())
    }
    if (this.videoEl.parentNode) {
      this.videoEl.parentNode.removeChild(this.videoEl)
    }
    if (this.trackBoxEl.parentNode) {
      this.trackBoxEl.parentNode.removeChild(this.trackBoxEl)
    }
  }
}
