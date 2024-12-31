<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const captureClick = () => {
  const video = document.querySelector('#video1') as HTMLVideoElement
  // v.setAttribute('crossOrigin', 'anonymous')
  // v.crossOrigin = 'anonymous'
  // 获取视频的尺寸
  const videoWidth = video.width
  const videoHeight = video.height

  // const canvas = document.createElement('canvas')
  const canvas = document.getElementById('myCanvas') as HTMLCanvasElement
  canvas.width = videoWidth
  canvas.height = videoHeight - 100

  const ctx = canvas.getContext('2d')!

  ctx.font = '16px Microsoft JhengHei'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
  ctx.rotate(-0.35)

  ctx.font = '30px Arial'
  ctx.fillStyle = 'red'

  // 假设水印的尺寸
  const watermarkWidth = 400
  const watermarkHeight = 100

  // 计算水平和垂直方向上的重复次数
  const horizontalCount = Math.ceil(videoWidth / watermarkWidth)
  const verticalCount = Math.ceil(videoHeight / watermarkHeight)

  // 循环绘制水印
  for (let i = 0; i < horizontalCount; i++) {
    for (let j = 0; j < verticalCount; j++) {
      console.log('执行次数')
      ctx.fillText(
        `Watermark-${Date.now()}`,
        i * watermarkWidth,
        j * watermarkHeight,
      )
    }
  }

  // requestAnimationFrame(captureClick)
}

const url = ref('')
const selectFile = (e) => {
  const file = (e as any).target.files[0]
  const path = URL.createObjectURL(file)
  url.value = path
  // captureClick()
}
const div1Ref = ref()
onMounted(() => {
  captureClick()
})

onBeforeUnmount(() => {
  url.value && URL.revokeObjectURL(url.value)
})

async function start() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })

    let recordedChunks: any[] = []
    let mediaRecorder = new MediaRecorder(stream)

    mediaRecorder.ondataavailable = (event: any) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data)
      }
    }
    mediaRecorder.start()

    const video = document.getElementById('videoElement') as HTMLVideoElement
    video.srcObject = stream

    const canvas = document.getElementById('canvasElement') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')!

    canvas.width = video.width
    canvas.height = video.height
    console.log(video, video.width, video.height)

    const draw = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        ctx.font = '30px Arial'
        ctx.fillStyle = 'red'
        ctx.fillText('Watermark', canvas.width - 200, canvas.height - 50)

        // 将带有水印的 canvas 转换为视频流
        const newStream = canvas.captureStream() as any
        mediaRecorder.stop()
        mediaRecorder = new MediaRecorder(newStream)
        recordedChunks = []
        mediaRecorder.ondataavailable = (event: any) => {
          if (event.data.size > 0) {
            recordedChunks.push(event.data)
          }
        }
        mediaRecorder.start()
      }
      requestAnimationFrame(draw)
    }
    draw()
  } catch (error) {
    console.error('Error accessing media devices.', error)
  }
}

onMounted(() => {
  start()
})
</script>

<template>
  <input type="file" accept="video/*" @change="selectFile" />
  <div class="relative overflow-hidden">
    <video
      id="video1"
      ref="div1Ref"
      controls
      crossOrigin="Anonymous"
      width="520"
      height="320"
      style="object-fit: fill"
      :src="url"
    ></video>
    <canvas
      id="myCanvas"
      class="absolute top-0 left-0"
      style="z-index: 1; pointer-events: none"
    ></canvas>
  </div>

  <video id="videoElement" autoplay width="520" height="320"></video>
  <canvas id="canvasElement"></canvas>
</template>
