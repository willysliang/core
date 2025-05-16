<!--
 * @ Author: willysliang
 * @ CreateTime: 2025-04-03 19:32:07
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-16 17:41:45
 * @ Description: 视频录制 & 黑屏检测
 -->

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BlackScreenDetector } from './utils/BlackScreenDetector'
import { CheckBlackVideo } from './utils/CheckBlackVideo'
import { VideoRecorder } from './utils/VideoRecorder'

const videoRef = ref<HTMLVideoElement>()
onMounted(() => {
  fetch('./video/demo.mp4').then(async (response) => {
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

/**
 * 开始录制
 */
const recorder = new VideoRecorder()
const showPreview = ref<boolean>(true)
const handleStartRecord = async () => {
  await recorder.startRecording(showPreview.value ? videoRef.value! : undefined)
}

/**
 * 结束录制
 */
const handleStopRecord = async () => {
  recorder.stopRecording()
  recorder.saveAsFile()
}
</script>

<template>
  <!-- 视频预览区域 -->
  <el-card class="mb-2">
    <template #header>视频预览</template>
    <video ref="videoRef" controls class="w-full"></video>
  </el-card>

  <!-- 操作控制区域 -->
  <el-card class="mb-2">
    <template #header>视频控制</template>

    <el-space direction="vertical" size="large" fill>
      <!-- 录制控制 -->
      <el-space wrap>
        <el-switch
          v-model="showPreview"
          inline-prompt
          active-text="显示摄像头画面"
          inactive-text="隐藏摄像头画面"
          size="large"
        />
        <el-button type="primary" plain round @click="handleStartRecord">
          开始录制
        </el-button>
        <el-button type="danger" plain round @click="handleStopRecord">
          结束录制
        </el-button>
      </el-space>

      <!-- 文件选择 -->
      <el-button
        type="info"
        plain
        round
        icon="Upload"
        @click="handleSelectFile"
      >
        选择视频文件
      </el-button>

      <!-- 检测控制 -->
      <el-space wrap>
        <el-button
          type="success"
          :loading="checkLoading"
          plain
          round
          icon="Search"
          @click="handleCheck1"
        >
          快速黑屏检测(起始帧按1s一次检测)
        </el-button>
        <el-button
          type="warning"
          :loading="checkLoading"
          plain
          round
          icon="Clock"
          @click="handleCheck2"
        >
          全视频黑屏检测(根据视频时长按间隔检测)
        </el-button>
      </el-space>
    </el-space>
  </el-card>

  <!-- 检测结果区域 -->
  <el-card v-if="!checkLoading && checkResult" class="result-card">
    <template #header>检测结果</template>

    <el-alert
      :title="`存在黑屏: ${isBlack}`"
      :type="isBlack ? 'error' : 'success'"
      :closable="false"
      show-icon
    >
    </el-alert>

    <div class="result-detail" v-html="checkResult"></div>
  </el-card>
</template>

<style scoped>
.result-card {
  transition: all 0.3s ease;
}

.result-detail {
  margin-top: 4px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  font-family: monospace;
  white-space: pre-wrap;
}
</style>
