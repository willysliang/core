<!-- eslint-disable @typescript-eslint/no-non-null-assertion -->
<!-- eslint-disable no-use-before-define -->
<!--
 * @ Author: willysliang
 * @ Create Time: 2023-01-06 10:27:04
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-09 16:11:00
 * @ Description: ParticleCountdown 粒子动画倒计时
 -->
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { TweenMax, Cubic } from 'gsap'

const canvas = reactive({
  /** 画布宽高和坐标 */
  /** canvas number */
  numberStageCtx: '' as any,
  numberStageWidth: 680,
  numberStageHeight: 420,
  numberOffsetX: 0,
  numberOffsetY: 0,

  /** canvas dots */
  stageCtx: '' as any,
  stageWidth: window.innerWidth,
  stageHeight: window.innerHeight,
  stageCenterX: window.innerWidth / 2,
  stageCenterY: window.innerHeight / 2,

  countdownFrom: 3, // 从 10 开始倒计时
  countdownTimer: 2800, // 数字显示的时长
  countdownRunning: true, // 动起来

  number: 0,
  dots: [] as any[],
  numberPixelCoordinates: [] as any[],
  circleRadius: 2,
  colors: ['61, 207, 236', '255, 244, 174', '255, 211, 218', '151, 211, 226'], // 页面上所有粒子颜色
})

const dotsRef = ref<HTMLCanvasElement>()
const numberRef = ref<HTMLCanvasElement>()

/** 初始化canvas和数字文本 */
const init = () => {
  // 初始化canvas-number
  canvas.numberStageCtx = numberRef.value!.getContext('2d')

  // 设置文字文本的窗口大小
  numberRef.value!.width = canvas.numberStageWidth
  numberRef.value!.height = canvas.numberStageHeight

  // 初始化canvas-dots和窗口大小
  canvas.stageCtx = dotsRef.value!.getContext('2d')
  dotsRef.value!.width = canvas.stageWidth
  dotsRef.value!.height = canvas.stageHeight

  // 设置一定的偏移量，让文字居中
  canvas.numberOffsetX = (canvas.stageWidth - canvas.numberStageWidth) / 2
  canvas.numberOffsetY = (canvas.stageHeight - canvas.numberStageHeight) / 2
}

/** 创建点 */
class Dot {
  x: any
  y: any
  color: any
  alpha: any
  constructor(x, y, color, alpha) {
    this.x = x
    this.y = y
    this.color = color
    this.alpha = alpha
  }

  draw() {
    canvas.stageCtx.beginPath()
    canvas.stageCtx.arc(
      this.x,
      this.y,
      canvas.circleRadius,
      0,
      2 * Math.PI,
      false,
    )
    canvas.stageCtx.fillStyle = 'rgba(' + this.color + ', ' + this.alpha + ')'
    canvas.stageCtx.fill()
  }
}

/** 随机数 */
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

/** 每个点的动画 */
const tweenDots = (dot, pos, type) => {
  if (type === 'space') {
    TweenMax.to(dot, 3 + Math.round(Math.random() + 100) / 100, {
      x: randomNumber(0, canvas.stageWidth),
      y: randomNumber(0, canvas.stageHeight),
      alpha: 0.3,
      ease: Cubic.easeInOut,
      onComplete: () => {
        tweenDots(dot, '', 'space')
      },
    })
  } else {
    TweenMax.to(dot, 1.5 + Math.round(Math.random() * 100) / 100, {
      x: pos.x + canvas.numberOffsetX,
      y: pos.y + canvas.numberOffsetY,
      delay: 0,
      alpha: 1,
      ease: Cubic.easeInOut,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onComplete: () => {},
    })
  }
}

/** 循环创建一定数量的点 */
const createSomeDots = () => {
  for (let i = 0; i < 2240; i++) {
    const dot = new Dot(
      randomNumber(0, canvas.stageWidth),
      randomNumber(0, canvas.stageHeight),
      canvas.colors[randomNumber(1, canvas.colors.length)],
      0.3,
    )
    canvas.dots.push(dot)
    tweenDots(dot, '', 'space')
  }
}

const breakNumber = () => {
  for (let i = 0; i < canvas.numberPixelCoordinates.length; i++) {
    tweenDots(canvas.dots[i], '', 'space')
  }

  if (canvas.countdownRunning) {
    setTimeout(() => {
      countdown()
    }, canvas.countdownTimer)
  }
}

const formNumber = () => {
  for (let i = 0; i < canvas.numberPixelCoordinates.length; i++) {
    tweenDots(canvas.dots[i], canvas.numberPixelCoordinates[i], '')
  }
  if (canvas.countdownRunning && canvas.countdownFrom > 0) {
    setTimeout(() => {
      breakNumber()
    }, canvas.countdownTimer)
  }
}

const drawNumber = (num) => {
  canvas.numberStageCtx.clearRect(
    0,
    0,
    canvas.numberStageWidth,
    canvas.numberStageHeight,
  )
  // canvas.numberStageCtx.fillStyle = '#24282f'
  canvas.numberStageCtx.fillStyle = 'lightgreen'
  canvas.numberStageCtx.textAlign = 'center'
  canvas.numberStageCtx.font = 'bold 5rem Lato'
  canvas.numberStageCtx.fillText(num, 400, 300)

  const ctx = numberRef.value!.getContext('2d')
  const imageData = ctx!.getImageData(
    0,
    0,
    canvas.numberStageWidth,
    canvas.numberStageHeight,
  ).data
  canvas.numberPixelCoordinates = []
  for (let i = imageData.length; i >= 0; i -= 4) {
    if (imageData[i] !== 0) {
      const x = (i / 4) % canvas.numberStageWidth
      const y = Math.floor(Math.floor(i / canvas.numberStageWidth) / 4)
      if (
        x &&
        x % (canvas.circleRadius * 2 + 3) === 0 &&
        y &&
        y % (canvas.circleRadius * 2 + 3) === 0
      ) {
        canvas.numberPixelCoordinates.push({ x, y })
      }
    }
  }

  formNumber()
}

/** 倒计时 */
const countdown = () => {
  // 发送倒计时数字
  drawNumber(canvas.countdownFrom.toString())

  // 倒计时为 0 时停止
  if (canvas.countdownFrom === 0) {
    canvas.countdownRunning = false
    drawNumber('willysliang')
  }

  canvas.countdownFrom--
}

/** 循环绘制 */
const loop = () => {
  canvas.stageCtx.clearRect(0, 0, canvas.stageWidth, canvas.stageHeight)
  for (let i = 0; i < canvas.dots.length; i++) {
    canvas.dots[i].draw(canvas.stageCtx)
  }
  requestAnimationFrame(loop)
}

onMounted(() => {
  init()
  createSomeDots()
  countdown()
  loop()
})
</script>

<template>
  <div class="ParticleAnimation-page">
    <canvas id="canvas-number" ref="numberRef"></canvas>
    <canvas id="canvas-dots" ref="dotsRef"></canvas>
  </div>
</template>

<style lang="scss">
.ParticleAnimation-page {
  width: 100%;
  min-height: 30rem;
  background-color: #24282f;
  position: relative;

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
