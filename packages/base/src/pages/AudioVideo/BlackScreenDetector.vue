<!--
 * @ Author: willysliang
 * @ CreateTime: 2025-04-03 19:32:07
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-04-10 11:21:55
 * @ Description: 黑屏检测
 -->

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BlackScreenDetector } from './utils/BlackScreenDetector'
import { CheckBlackVideo } from './utils/CheckBlackVideo'

const videoRef = ref<HTMLVideoElement>()
onMounted(() => {
  fetch('/video/demo.mp4').then(async (response) => {
    const blob = await response.blob()
    const file = new File([blob], 'demo.mp4', { type: 'video/mp4' })
    videoRef.value!.src = URL.createObjectURL(file)
  })
})

/**
 * 选择文件
 */
const handleSelectFile = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'video/*'
  input.onchange = async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      videoRef.value!.src = URL.createObjectURL(file)
    }
  }
  input.click()
}

/**
 * 黑屏检测
 */
const checkLoading = ref<boolean>(false)
const isBlack = ref<boolean>(false)
const checkResult = ref<string>('')

/**
 * 黑屏检测(起始帧按1s一次检测)
 */
const handleCheck1 = () => {
  // 需要视频处于播放然后再获取实时的帧页面来处理
  if (videoRef.value?.paused) {
    videoRef.value?.play()
  }

  checkResult.value = ''

  if (!checkLoading.value) {
    checkLoading.value = true
    const instance = new CheckBlackVideo(videoRef.value!)
    instance
      .check()
      .then((result) => {
        isBlack.value = result
        checkResult.value = instance.checkResult.join('<br/>')
      })
      .finally(() => {
        checkLoading.value = false
      })
  }
}

/**
 * 全视频检测(根据视频时长按间隔检测)
 */
const detector = new BlackScreenDetector({
  maxSamples: 5,
  sampleTolerance: 1,
})
const handleCheck2 = async () => {
  checkLoading.value = true
  checkResult.value = ''

  detector
    .check(videoRef.value!.src)
    .then((result) => {
      isBlack.value = result
      checkResult.value = detector.checkResult
        .map((item) => JSON.stringify(item, null, 2).replace(/\n/g, '<br>'))
        .join('<br/>')
    })
    .finally(() => {
      checkLoading.value = false
    })
}
</script>

<template>
  <video ref="videoRef" controls class="mb-2"></video>
  <el-button round plain type="primary" @click="handleSelectFile">
    选择文件
  </el-button>
  <span>➡</span>
  <el-button
    round
    plain
    type="success"
    :loading="checkLoading"
    @click="handleCheck1"
  >
    黑屏检测(起始帧按1s一次检测)
  </el-button>
  <span>➡</span>
  <el-button
    round
    plain
    type="success"
    :loading="checkLoading"
    @click="handleCheck2"
  >
    全视频检测(根据视频时长按间隔检测)
  </el-button>
  <div v-if="!checkLoading" class="w-full mt-4">
    <span class="text-red-500"
      >检测结果: {{ isBlack ? '' : ' 不' }}存在黑频</span
    >
    <br />
    <span v-html="checkResult"></span>
  </div>
</template>
