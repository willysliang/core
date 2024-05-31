<!--
 * @ Author: willysliang
 * @ Create Time: 2023-01-06 15:08:15
 * @ Modified by: willysliang
 * @ Modified time: 2023-04-10 15:23:53
 * @ Description: ParticlePicture 图片粒子化
 -->

<!--
  # 1. 流程
    1.1 实例化一个ParticleCanvas对象prtCanvas
    1.2 点击某个图片clickLogo时调用prtCanvas.changeImg(particleData)方法传入其粒子数组信息。
        1.2.1 首次 changeImg，直接赋值
        1.2.2 非首次，对比粒子数组 移除/生成粒子，并随机映射

  # 2. 吸引/排斥
    2.1 鼠标在实例对象prtCanvas对应的画布移动时触发mousemove回调，根据回调参数重新计算鼠标位置mouseX/mouseY
      2.1.1 prtCanvas的绘制画布方法drawCanvas一直随着事件循环在执行，drawCanvas中遍历画布粒子数组并调用每一项的update方法并传入重新计算后的mouseX/mouseY
      2.1.2 particle.update中又根据距离和设置好的引力/斥力重新计算vx/vy

  # 3. 动画实现步骤
    3.1 解析图片转换为粒子
    3.2 绘制时添加动画
    3.3 根据鼠标位置对粒子进行排斥

  # 4. 像素操作
    4.1 canvas提供了 绘制图片 和 获取图片像素 的方法，但在绘制图片或者获取图片信息用于操作之前，首先要获取目标图片源。
    4.2 通过在JS里创建 Image 对象，在onload回调时读取数据源
    4.3 一旦获得了源图对象，我们就可以使用 drawImage 方法将它渲染到 canvas 里
    4.4 通过canvas的getImageData方法可以获得ImageData对象，而ImageData.data属性中存储着canvas对象真实的像素数据。
    4.5 ImageData的data属性为 Uint8ClampedArray 类型的一维数组，包含了指定区域里每个像素点的RGBA格式的整型数据，范围在0至255之间（包括255）

  # 5. canvas动画
    5.1 canvas的动画主要是通过 在一些定时方法中去执行重绘操作实现的。
    5.2 canvas实现动画的过程通常是 清理->绘制->清理->绘制...  不断重复的过程。
    5.3 一般通过 setTimeOut、setInterval、requestAnimationFrame 等定时执行的方法去调用重绘，实现动画的操控。

  # 6. 生成粒子/绘制画布
    - 实现原理：像素会经过一系列操作转换为粒子，粒子绘制到画布后初始位置随机，并逐渐向目标方向移动。画布不断调用粒子中的更新方法和绘制方法，重新绘制画布。
    6.1 粒子类：创建粒子类Particle，其构造器接收 像素对象 为参数转换为 粒子实例对象。
    6.2 筛选像素：因为并不是每一个像素点都需要绘制，所以在获得了上文ImageData.data的像素数据后，先对数据进行一遍筛选，同时将符合条件的像素点生成为粒子。
    6.3 创建粒子：首先我们观察到动画中的粒子是从随机位置（或者有一套算法确定位置，但肯定不在原位置）出现的，并逐渐位移向目标位置，同时会逐渐清晰（不透明度++）。
    6.4 绘制画布：在明确怎么创建粒子后，需要将粒子绘制到画布上，画布不断更新其中的粒子实现动画效果。

  # 7. 切换动画
    - 在切换图片（即粒子数据源）时，复用页面上已存在的粒子，将其随机映射到新的位置。由粒子数量对比分为 相同、大于、小于 3种情况，根据情况画布中的粒子数组进行移除或添加。
    7.1 在切换图片的时候并不是清空画布并重新生成所有粒子，已存在的粒子会按比例复用并移动到新的目标位置，即旧粒子随机对应新粒子
    7.2 在画布类ParticleCanvas.changeImg切换数据源时对比新旧粒子数量，遍历新粒子数组，每次循环判断复用arr[idx].change(...);,还是生成新粒子。
    7.3 之后对比newLen < oldLen，变少了就通过splice删除，变多了则在上述遍历中已通过new Particle(...)添加。
    7.4 最后随机打乱粒子最终对应的位置，每次循环随机的取一个粒子arr[randomIdx] 和 倒序的取一个粒子arr[tmp_len]，并且上限逐渐递减tmp_len--（避免多个粒子映射到同一个粒子上）。

  # 8. 粒子排斥
    - 每个粒子会根据与鼠标距离的比例受到x、y方向的力，在转换为对应方向上的速度后重新计算粒子的移动轨迹（这涉及到一些三角函数），即可实现粒子排斥效果。
    8.1 画布会以鼠标为中心对粒子进行一定范围的排斥，越接近中心排斥的速度越快。
        以向particle对象的update方法中传入鼠标在canvas画布中的位置mouseX, mouseY。
        并结合粒子当前位置(x, y) 和 排斥力度Inten 重新计算移动速度vx、vy。由此使粒子不断远离中心。
    8.2 设计方案：调整粒子类Particle的update方法，重新计算vx、vy：
        1. 设置固定值 Radius(斥力影响范围)、Inten(斥力标准值)。
        2. 设置鼠标位置 (mouseX, mouseY) 为斥力中心。
        3. 计算每个粒子与中心的 直线距离distance。
        4. 通过 Radius / distance 获得 中心影响范围 与 直线距离 的比例disPercent。比例越大越接近中心，受到的斥力也越大。
        5. 将 粒子与中心形成的 夹角angle、比例disPercent和斥力值Inten，转换为粒子x、y轴的速度repX、repY。
        6. vx += repX & vy += repY，粒子逐渐远离中心。
-->
<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import {
  demoParticlePicture1,
  demoParticlePicture2,
  demoParticlePicture3,
  demoParticlePicture4,
  demoParticlePicture5,
} from '@/assets/images'

const logolist = reactive([
  { label: 'kazimierz', url: demoParticlePicture1 },
  { label: 'rhine', url: demoParticlePicture2 },
  { label: 'rhodes', url: demoParticlePicture3 },
  { label: 'victoria', url: demoParticlePicture4 },
  { label: 'yan', url: demoParticlePicture5 },
])

const constant = {
  /** 设置画布大小 */
  width: 360,
  height: 360,
  /** 设置粒子动画时长 */
  animateTime: 30,
  opacityStep: 1 / 30,
  /** 中心影响的半径 */
  Radius: 40,
  /** 排斥/吸引 力度 */
  Inten: 0.95,
}

/**
 * @ParticleCanvas 画布类
 * 记录目标画布、画布中的粒子数组和鼠标在画布中的位置
 * @drwaCanvas 提供绘制画布方法
 * @changImg 改变粒子数组方法
 */
class ParticleCanvas {
  canvasEle: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  ParticleArr: any[]
  mouseX?: number // 鼠标X轴位置
  mouseY?: number // 鼠标Y轴位置
  constructor (targetEle: HTMLCanvasElement) {
    // 设置画布 获取画布上下文
    this.canvasEle = targetEle
    this.ctx = targetEle.getContext('2d') as CanvasRenderingContext2D
    this.width = targetEle.width
    this.height = targetEle.height
    this.ParticleArr = []
    // this.listenerMousemove()

    // 监听鼠标移动
    this.canvasEle.addEventListener('mousemove', (e) => {
      const { left, top } = this.canvasEle.getBoundingClientRect()
      const { clientX, clientY } = e
      this.mouseX = clientX - left
      this.mouseY = clientY - top
    })
    this.canvasEle.onmouseleave = () => {
      this.mouseX = 0
      this.mouseY = 0
    }
  }

  /** 改变图片 如果已存在图片则根据情况额外操作 */
  changeImg (img: LogoImg) {
    if (this.ParticleArr.length) {
      // 获取新旧两个粒度数组与它们的长度
      const newPrtArr = img.particleData
      const newLen = newPrtArr.length
      let arr = this.ParticleArr
      const oldLen = arr.length

      // 调用 change 修改已存在粒子
      for (let idx = 0; idx < newLen; idx++) {
        const { totalX, totalY, color } = newPrtArr[idx]
        if (arr[idx]) {
          // 找到已存在的粒子，调用change 接收新粒子的属性
          arr[idx].change(totalX, totalY, color)
        } else {
          // 新粒子数组较大，生成缺少的粒子
          arr[idx] = new Particle(totalX, totalY, constant.animateTime, color)
        }
      }

      // 新粒子数组较小，删除多余的粒子
      if (newLen < oldLen) this.ParticleArr = arr.splice(0, newLen)
      arr = this.ParticleArr
      let tempLen = arr.length

      // 随机打乱粒子最终对应的位置，使切换效果更自然
      while (tempLen) {
        // 随机的一个粒子 与 倒序的一个粒子
        const randomIdx = ~~(Math.random() * tempLen--)
        const randomPrt = arr[randomIdx]
        const { totalX: tx, totalY: ty, color } = randomPrt

        // 交换目标位置与颜色
        randomPrt.totalX = arr[tempLen].totalX
        randomPrt.totalY = arr[tempLen].totalY
        randomPrt.color = arr[tempLen].color
        arr[tempLen].totalX = tx
        arr[tempLen].totalY = ty
        arr[tempLen].color = color
      }
    } else {
      this.ParticleArr = img.particleData.map(
        (item) =>
          new Particle(
            item.totalX,
            item.totalY,
            constant.animateTime,
            item.color,
          ),
      )
    }
  }

  /**
   * @drawCanvas 绘制画布方法
   * 该方法会一致随着时间循环在执行，遍历画布粒子数组并调用每一项的 update() 并传入重新计算后的 mouseX/mouseY
   */
  drawCanvas () {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ParticleArr.forEach((particle) => {
      particle.update(this.mouseX, this.mouseY)
      particle.draw()
    })
    window.requestAnimationFrame(() => this.drawCanvas())
  }
}

/** 画布参数配置 */
const canvas = reactive({
  /** 画布的上下文 */
  context: {} as CanvasRenderingContext2D,
  // /** canvas实体对象 */
  particleCanvas: {} as ParticleCanvas,
})
const canvasRef = ref<HTMLCanvasElement>()

/**
 * @Particle 粒子类
 * 记录粒子位置、颜色、大小、动画耗时 和 x/y 方向上的移动速度
 * 该构造器接收 像素对象 为参数转换为 粒子实例对象
 * @draw 绘制粒子方法
 * @update 更新方法
 * @change 替换方法
 */
class Particle {
  x: number // 粒子x轴的初始位置
  y: number // 粒子y轴的初始位置
  totalX: number // 粒子x轴的目标位置
  totalY: number // 粒子y轴的目标位置
  mx?: number // 粒子x轴需要移动的距离
  my?: number // 粒子y轴需要移动的距离
  vx?: number // 粒子x轴移动速度
  vy?: number // 粒子y轴移动速度
  time: number // 粒子移动耗时
  r: number // 粒子的半径
  color: number[] // 粒子的颜色
  opacity: number // 粒子的透明度
  constructor (totalX: number, totalY: number, time: number, color: number[]) {
    // 设置粒子的初始位置x、y，目标位置totalX、totalY，总耗时time
    this.x = (Math.random() * constant.width) >> 0
    this.y = (Math.random() * constant.height) >> 0
    this.totalX = totalX
    this.totalY = totalY
    this.time = time

    // 设置粒子的颜色和半径
    this.r = 1.2
    this.color = [...color]
    this.opacity = 0
  }

  /** 在画布中绘制粒子 */
  draw () {
    canvas.context.fillStyle = `rgba(${this.color.toString()})`
    canvas.context.fillRect(this.x, this.y, this.r * 2, this.r * 2)
    canvas.context.fill()
  }

  /** 更新粒子
   * @param {number} mouseX 鼠标X位置
   * @param {number} mouseY 鼠标Y位置
   * 根据距离和设置好的 引力/斥力重新计算 vx/vy
   */
  update (mouseX?: number, mouseY?: number) {
    // 设置粒子需要移动的距离
    this.mx = this.totalX - this.x
    this.my = this.totalY - this.y

    // 设置粒子移动速度
    this.vx = this.mx / this.time
    this.vy = this.my / this.time

    // 计算粒子与鼠标的距离
    if (mouseX && mouseY) {
      const dx = mouseX - this.x
      const dy = mouseY - this.y
      const distance = Math.sqrt(dx ** 2 + dy ** 2)

      // 粒子相对鼠标距离的比例，判断受到的力度大小
      let disPercent = constant.Radius / distance
      // 设置阈值，避免粒子受到的斥力过大
      disPercent = disPercent > 7 ? 7 : disPercent

      // 获得夹角值、正弦值、余弦值
      const angle = Math.atan2(dy, dx)
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)

      // 将力度转换为速度，并重新计算 vh、vy
      const repX = cos * disPercent * -constant.Inten
      const repY = sin * disPercent * -constant.Inten
      this.vx += repX
      this.vy += repY
    }

    this.x += this.vx
    this.y += this.vy
    if (this.opacity < 1) this.opacity += constant.opacityStep
  }

  /** 切换粒子 */
  change (x: number, y: number, color: number[]) {
    this.totalX = x
    this.totalY = y
    this.color = [...color]
  }
}

/**
 * @LogoImg logo图片类
 * 记录图片解析后的数组信息 particleData
 */
class LogoImg {
  src: string
  name: string
  particleData: Particle[] // 用于保存筛选后的粒子
  constructor (src: string, name: string) {
    this.src = src
    this.name = name
    this.particleData = []
    // this.imgOnload()

    /** 图片加载后进行粒子化解析 */
    const img = new Image()
    img.crossOrigin = ''
    img.src = this.src

    // canvas 解析数据源获取粒子数据
    img.onload = () => {
      // 获取图片像素数据
      const tempCanvas = document.createElement('canvas')
      const tempCtx = tempCanvas.getContext('2d')
      const imgW = constant.width
      const imgH = ~~(imgW * (img.height / img.width))
      tempCanvas.width = imgW
      tempCanvas.height = imgH

      // 将图片绘制到 canvas 中
      tempCtx?.drawImage(img, 0, 0, imgW, imgH)

      // 获取像素点数据
      const imgData =
        tempCtx?.getImageData(0, 0, imgW, imgH).data ||
        ('' as unknown as Uint8ClampedArray)
      tempCtx?.clearRect(0, 0, constant.width, constant.height)

      // 筛选像素点
      for (let y = 0; y < imgH; y += 5) {
        for (let x = 0; x < imgW; x += 5) {
          // 像素点的序号
          const index = (x + y * imgW) * 4

          // 在数组中对应的值
          const r = imgData[index]
          const g = imgData[index + 1]
          const b = imgData[index + 2]
          const a = imgData[index + 3]
          const colors = [r, g, b, a]
          const sum = r + g + b + a

          // 筛选条件
          if (sum > 100) {
            const particle = new Particle(x, y, constant.animateTime, colors)
            this.particleData.push(particle)
          }
        }
      }
    }
  }
}

/** 存储由 logolist 生成的logoImg对象 */
const logoImg = reactive({
  list: [] as LogoImg[],
  currentIdx: 0,
  currentLogoItem: {} as LogoImg,
})

/** 激活logo */
const handleLogoImg = (particleCanvas: ParticleCanvas, logoItem: LogoImg) => {
  particleCanvas.changeImg(logoItem)
  logoImg.currentLogoItem = logoItem
}

onBeforeMount(() => {
  /** 将logo数据实例化为logoImg对象 */
  for (const item of logolist) {
    logoImg.list.push(new LogoImg(item.url, item.label))
  }
})

/**
 * 1. 实例化一个 ParticleCanvas 对象 prtCanvas
 * 2. 当点击某个图片 handleLogoImg 时调用 prtCanvas.changImg(particleCanvas) 方法传入其粒子数组信息
 *   2.1 首次调用 changeImg 方法，直接赋值
 *   2.2 非首次，对比粒子数组。移除/生成粒子，并随机映射
 */
onMounted(() => {
  if (canvasRef.value) {
    canvas.context = canvasRef.value.getContext(
      '2d',
    ) as CanvasRenderingContext2D
    canvas.particleCanvas = new ParticleCanvas(canvasRef.value)
    canvas.particleCanvas.drawCanvas()
  }
})
</script>

<template>
  <div class="ParticlePicture-page">
    <div class="flex flex-col items-center justify-center">
      <canvas
        ref="canvasRef"
        :width="constant.width"
        :height="constant.height"
      ></canvas>
    </div>

    <ul
      class="w-11/12 mx-auto flex flex-row justify-around box-border py-2 border border-solid border-gray-300 rounded-2xl"
    >
      <li
        v-for="(item, index) in logoImg.list"
        :key="index"
        class="flex flex-col items-center justify-between w-1/6 box-border p-2"
        :class="{ 'bg-gray-500 rounded-2xl': logoImg.currentLogoItem === item }"
        data-cursor="pointer"
        @click="handleLogoImg(canvas.particleCanvas as ParticleCanvas, item)"
      >
        <img :src="item.src" class="w-full" />
        <span class="text-gray-200">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.ParticlePicture-page {
	width: 100%;
	background-color: #000;
	box-sizing: border-box;
	padding: 1rem 0;
	cursor: url('src/assets/images/ParticlePicture_mouse.png') 4 4, default;
}
</style>
