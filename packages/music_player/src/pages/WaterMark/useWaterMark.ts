/**
 * @ Author: willysliang
 * @ Create Time: 2023-01-12 14:00:21
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-12 14:06:19
 * @ Description: useWaterMark 生成水印的类
 */
/** 描绘水印类 */
class WaterMark {
  /** 水印文字 */
  waterTexts: any[]
  /** 需要添加水印的 dom 集合 */
  needAddWaterElements: any
  /** 保存添加水印的 dom */
  saveWaterMarkElement: any[]

  constructor (
    waterTexts = ['默认水印文字', '2023-01-12'],
    needAddWaterElements: Element[] = [],
  ) {
    this.waterTexts = waterTexts
    this.needAddWaterElements = needAddWaterElements
    this.saveWaterMarkElement = []
  }

  /** 添加水印 */
  startWaterMark () {
    if (this.needAddWaterElements.length > 0) {
      this.saveWaterMarkElement.push(...this.needAddWaterElements)
    } else {
      this.saveWaterMarkElement = Array.from(
        document.getElementsByTagName('img'),
      )
    }

    this.saveWaterMarkElement.forEach((el) => {
      this.startWaterMarkToElement(el)
    })
  }

  /** 添加水印到 dom 对象 */
  async startWaterMarkToElement (el: Element) {
    if (el instanceof HTMLImageElement) {
      // 图片，需加载完成进行操作
      if (!el.complete) {
        await new Promise((resolve) => {
          el.onload = resolve
        })
      }
    }

    // 给加载完成的图片 or 普通 dom 添加水印
    this.addWaterMarkToNormalEle(el)
  }

  /** 给加载完成的图片 or 普通 dom 添加水印 */
  addWaterMarkToNormalEle (el) {
    const canvas = document.createElement('canvas')
    canvas.width = el.width ? el.width : el.clientWidth
    canvas.height = el.height ? el.height : el.clientHeight
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const maxSize = Math.max(canvas.height, canvas.width)
    const fontSize = maxSize / 25
    ctx.font = fontSize + 'px "微软雅黑"'
    ctx.fillStyle = 'rgba(195, 195, 195, 1)'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.save()

    const angle = -Math.PI / 10.0
    // 进行平移，计算平移的参数
    const translateX = canvas.height * Math.tan(Math.abs(angle))
    const translateY = (canvas.width - translateX) * Math.tan(Math.abs(angle))
    ctx.translate(-translateX / 2.0, translateY / 2.0)
    ctx.rotate(angle)

    // 起始坐标
    let x = 0
    let y = 0
    // 一组文字之间的间隔
    const sepY = fontSize / 2.0
    while (y < canvas.height) {
      // 当前行的 y 值
      let rowCurrentMaxY = 0
      while (x < canvas.width) {
        let totleMaxX = 0
        let currentY = 0
        // 绘制水印
        this.waterTexts.forEach((text, index) => {
          currentY += index * (sepY + fontSize)
          const rect = this.drawWater(ctx, text, x, y + currentY)
          const currentMaxX = rect.x + rect.width
          totleMaxX = currentMaxX > totleMaxX ? currentMaxX : totleMaxX
          rowCurrentMaxY = currentY
        })
        x = totleMaxX + 20
      }
      // 重置 x, y 值
      x = 0
      y += rowCurrentMaxY + (sepY + fontSize + canvas.height / 5)
    }
    ctx.restore()
    // 添加canvas
    this.addCanvas(canvas, el)
  }

  /** 绘制水印 */
  drawWater (ctx, text, x, y) {
    // 绘制文字
    ctx.fillText(text, x, y)
    // 计算尺度
    const textRect = ctx.measureText(text)
    const width = textRect.width
    const height = textRect.height
    return { x, y, width, height }
  }

  /** 添加canvas到当前标签的父标签上 */
  addCanvas (canvas, el) {
    // 设置canvas的样式
    // overfolow: hidden: position: absolute; top: 0; left: 0; bottom: 0; right: 0;
    canvas.className = 'absolute overflow-hidden inset-0'
    // 添加水印到父标签
    el.parentNode.appendChild(canvas)
  }
}

export { WaterMark }
