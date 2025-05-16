<!--
 * @ Author: willysliang
 * @ CreateTime: 2025-05-12 17:04:56
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-16 14:08:26
 * @ Description: 人脸识别身份验证(face-api.js)
 -->

<template>
  <div class="container">
    <el-button @click="handleStartDetection">开始检测</el-button>

    <!-- 渲染摄像头流 -->
    <div ref="wraperRef" class="wraper"></div>

    <!-- 识别结果 -->
    <div v-if="detectedFaces.length > 0" class="results">
      <p>【温馨提示：请保持光线充足，并正对摄像头】</p>
      <p>检测到的人脸 ({{ detectedFaces.length }}):</p>
      <div ref="canvasImgRef"></div>
      <ul>
        <li v-for="(face, index) in detectedFaces" :key="index">
          <span>人脸 {{ index + 1 }}:{{ formatFaceData(face) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { FaceDetection } from './faceDetection'

const wraperRef = ref<HTMLElement>()
const detectedFaces = ref<any[]>([])
const faceImages = ref<HTMLCanvasElement[]>([])
const canvasImgRef = ref<HTMLDivElement>()

/** 格式化人脸数据 */
const formatFaceData = (face) => {
  return `位置: [${Math.round(face.x)}, ${Math.round(face.y)}] - [${Math.round(face.x + face.width)}, ${Math.round(face.y + face.height)}]`
}

/** 对识别出来的人图进行渲染 */
const renderCanvas = () => {
  nextTick(() => {
    canvasImgRef.value!.innerHTML = ''
    faceImages.value.forEach((faceImage) => {
      canvasImgRef.value!.appendChild(faceImage)
    })
  })
}

/**
 * 加载模型
 */
const handleStartDetection = () => {
  const faceDetection = new FaceDetection(
    {
      showMark: false,
      immediate: false,
      successCallback: () => {
        detectedFaces.value = faceDetection.detectedFaces
        faceImages.value = faceDetection.faceImages
        renderCanvas()
      },
    },
    wraperRef.value,
  )
  faceDetection.onPlay()
}
</script>

<style scoped lang="scss">
.container {
  font-family: Arial, sans-serif;

  .wraper {
    position: relative;
  }
}
</style>
