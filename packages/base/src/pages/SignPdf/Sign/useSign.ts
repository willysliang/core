/**
 * @ Author: willysliang
 * @ CreateTime: 2025-07-10 15:21:48
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-07-10 15:49:04
 * @ Description: 电子签名组件的抽取
 */

import { ref, reactive, watch, onMounted, onBeforeUnmount } from 'vue'

/**
 * @typedef {Object} SignReturn
 * @property {HTMLCanvasElement} canvasRef 画布的DOM引用
 * @property {CanvasRenderingContext2D} ctx 画布的上下文
 * @property {Object} signature 签名配置项
 * @property {Object} ctxConfig 画笔配置项
 * @property {() => void} clearCanvas 清除画布
 * @property {() => void} saveSignature 保存签名
 * @property {() => void} exportSignature 导出签名
 */

/**
 * @function useSign 电子签名
 * @returns {SignReturn}
 */
export const useSign = () => {
  const canvasRef = ref<HTMLCanvasElement>()
  const ctx = ref<CanvasRenderingContext2D>()
  const lastPoint = reactive({ x: 0, y: 0 })

  /**
   * 签名配置项
   */
  const signature = reactive({
    /** 是否在绘制 */
    isDrawing: false,
    /** 是否存在签名图 */
    hasSignature: false,
    /** 签名图 */
    signatureDataUrl: '',
  })

  /**
   * 画笔配置项
   */
  const ctxConfig = reactive({
    lineWidth: 5,
    lineJoin: 'round',
    lineCap: 'round',
    strokeStyle: '#34495e',
    background: 'rgba(255, 255, 255, 0)',
  })
  /** 监听画笔样式变化，动态调整画笔样式 */
  watch([() => ctxConfig.lineWidth, () => ctxConfig.strokeStyle], () => {
    if (ctx.value) {
      ctx.value.strokeStyle = ctxConfig.strokeStyle
      ctx.value.lineWidth = ctxConfig.lineWidth
    }
  })

  /**
   * 初始化画板
   */
  const setupCanvas = () => {
    if (!canvasRef.value) return
    ctx.value = canvasRef.value!.getContext('2d')!

    // 设置canvas尺寸为元素实际尺寸（支持HiDPI设备）
    const dpr = window.devicePixelRatio || 1
    const rect = canvasRef.value!.getBoundingClientRect()
    canvasRef.value!.width = rect.width * dpr
    canvasRef.value!.height = rect.height * dpr

    // 缩放画布以匹配CSS像素
    ctx.value.scale(dpr, dpr)

    // 设置画笔样式
    Object.keys(ctxConfig).forEach((key) => {
      ctx.value![key] = ctxConfig[key]
    })
  }
  onMounted(() => {
    setupCanvas()
    window.addEventListener('resize', setupCanvas)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', setupCanvas)
  })

  /**
   * 开始绘制
   */
  /** 开始绘制 - pc */
  const startDrawing = (e) => {
    signature.isDrawing = true
    const rect = canvasRef.value!.getBoundingClientRect()
    lastPoint.x = e.clientX - rect.left
    lastPoint.y = e.clientY - rect.top
  }
  /** 开始绘制 - mobile */
  const startDrawingTouch = (e) => {
    signature.isDrawing = true
    e.preventDefault()
    const rect = canvasRef.value!.getBoundingClientRect()
    const touch = e.touches[0]
    lastPoint.x = touch.clientX - rect.left
    lastPoint.y = touch.clientY - rect.top
  }

  /**
   * 持续绘制线条
   */
  const drawLine = (x: number, y: number) => {
    ctx.value!.beginPath()
    ctx.value!.moveTo(lastPoint.x, lastPoint.y)
    ctx.value!.lineTo(x, y)
    ctx.value!.stroke()
    lastPoint.x = x
    lastPoint.y = y
    signature.hasSignature = true
  }
  /** 持续绘制线条 - pc */
  const draw = (e) => {
    if (!signature.isDrawing) return
    const rect = canvasRef.value!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    drawLine(x, y)
  }
  /** 持续绘制线条 - mobile */
  const drawTouch = (e) => {
    if (!signature.isDrawing) return
    e.preventDefault()
    const rect = canvasRef.value!.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    drawLine(x, y)
  }

  /**
   * 结束绘制
   */
  const stopDrawing = () => {
    signature.isDrawing = false
  }

  onMounted(() => {
    if (canvasRef.value) {
      canvasRef.value.addEventListener('mousedown', startDrawing)
      canvasRef.value.addEventListener('mousemove', draw)
      canvasRef.value.addEventListener('mouseup', stopDrawing)
      canvasRef.value.addEventListener('mouseleave', stopDrawing)
      canvasRef.value.addEventListener('touchstart', startDrawingTouch)
      canvasRef.value.addEventListener('touchmove', drawTouch)
      canvasRef.value.addEventListener('touchend', stopDrawing)
    }
  })
  onBeforeUnmount(() => {
    if (canvasRef.value) {
      canvasRef.value.removeEventListener('mousedown', startDrawing)
      canvasRef.value.removeEventListener('mousemove', draw)
      canvasRef.value.removeEventListener('mouseup', stopDrawing)
      canvasRef.value.removeEventListener('mouseleave', stopDrawing)
      canvasRef.value.removeEventListener('touchstart', startDrawingTouch)
      canvasRef.value.removeEventListener('touchmove', drawTouch)
      canvasRef.value.removeEventListener('touchend', stopDrawing)
    }
  })

  /**
   * 签名操作
   */
  /** 清除签名 */
  const clearCanvas = () => {
    const rect = canvasRef.value!.getBoundingClientRect()
    ctx.value!.clearRect(0, 0, rect.width, rect.height)
    signature.hasSignature = false
    signature.signatureDataUrl = ''
  }

  /** 保存/预览签名图 */
  const saveSignature = () => {
    signature.signatureDataUrl = canvasRef.value!.toDataURL('image/png')
  }

  /** 导出签名图片 */
  const exportSignature = () => {
    saveSignature()
    if (signature.hasSignature) {
      const link = document.createElement('a')
      link.href = signature.signatureDataUrl
      link.download = 'signature.png'
      link.click()
    }
  }

  return {
    canvasRef,
    ctx,
    ctxConfig,

    signature,

    clearCanvas,
    saveSignature,
    exportSignature,
  }
}
