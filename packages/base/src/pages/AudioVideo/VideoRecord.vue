<!--
 * @ Author: willysliang
 * @ CreateTime: 2025-04-03 19:32:07
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-20 16:47:14
 * @ Description: 视频录制 & 黑屏检测
 -->

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BlackScreenDetector } from './utils/BlackScreenDetector'
import { CheckBlackVideo } from './utils/CheckBlackVideo'
import { VideoRecorder, getCameraList } from './utils/VideoRecorder'

/**
 * 检测说明
 */
const descriptions = [
  {
    title: '开始录制',
    contents: [
      '1. 获取屏幕共享和摄像头媒体流',
      '2. 录制屏幕和摄像头内容，并合成视频',
      '3. 合成屏幕共享和摄像头的视频流',
      '4. 在合成的录制视频中添加时间戳水印',
      '5. 在合成的音视频流中绘制频谱声波图',
    ],
  },
  '结束录制',
  '保存视频',
  {
    title: '视频检测',
    contents: [
      '1. 选择视频文件',
      '2. 获取视频帧',
      '3. 计算视频帧的平均亮度',
      '4. 判断平均亮度是否低于阈值',
      '5. 如果低于阈值，则认为视频存在黑屏',
    ],
  },
]

const videoRef = ref<HTMLVideoElement>()
const canvasRef = ref<HTMLCanvasElement>()

// ================== 视频录制 ==================
const recorder = new VideoRecorder()
/** 是否展示镜头视图 */
const showPreview = ref<boolean>(true)

/**
 * 摄像头列表
 */
const cameraList = ref<MediaDeviceInfo[]>([])
const currentCamera = ref<MediaDeviceInfo['deviceId']>('')
getCameraList().then((list) => {
  cameraList.value = list
  currentCamera.value = list[0]?.deviceId
})

/** 开始录制 */
const handleStartRecord = async () => {
  await recorder.startRecording(
    currentCamera.value,
    canvasRef.value!,
    showPreview.value ? videoRef.value! : undefined,
  )
}

/** 结束录制 */
const handleStopRecord = async () => {
  recorder.stopRecording()
}

/** 保存视频 */
const handleSaveVideo = async () => {
  recorder.saveAsFile()
}

// ================== 视频检测 ==================
/**
 * 选择文件
 */
onMounted(() => {
  fetch('./video/demo.mp4').then(async (response) => {
    const blob = await response.blob()
    const file = new File([blob], 'demo.mp4', { type: 'video/mp4' })
    videoRef.value!.src = URL.createObjectURL(file)
  })
})
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
  <!-- 操作控制区域 -->
  <el-card class="mb-2">
    <template #header>视频控制</template>
    <el-space direction="vertical" size="large" fill>
      <!-- 录制说明 -->
      <el-space wrap alignment="flex-start">
        <div v-for="(desc, idx) in descriptions" :key="idx" class="mr-3">
          <div class="text-orange-500">
            {{ idx + 1 }}. {{ typeof desc === 'string' ? desc : desc.title }}
          </div>
          <div
            v-if="typeof desc !== 'string'"
            v-html="`${idx + 1}.${desc.contents.join(`<br/>${idx + 1}.`)}`"
          ></div>
        </div>
      </el-space>

      <!-- 录制前置配置 -->
      <el-space wrap>
        <el-switch
          v-model="showPreview"
          inline-prompt
          active-text="显示摄像头画面"
          inactive-text="隐藏摄像头画面"
        />
        <el-select v-model="currentCamera" style="min-width: 240px">
          <el-option
            v-for="item in cameraList"
            :key="item.deviceId"
            :label="item.label"
            :value="item.deviceId"
          />
        </el-select>
      </el-space>

      <!-- 录制控制 -->
      <el-space wrap>
        <el-button type="primary" plain round @click="handleStartRecord">
          开始录制
        </el-button>
        <el-button type="danger" plain round @click="handleStopRecord">
          结束录制
        </el-button>
        <el-button type="warning" plain round @click="handleSaveVideo">
          保存视频
        </el-button>
      </el-space>

      <!-- 检测控制 -->
      <el-space wrap>
        <el-button
          type="info"
          plain
          round
          icon="Upload"
          @click="handleSelectFile"
        >
          选择视频文件
        </el-button>

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

  <!-- 视频预览区域 -->
  <el-card class="mb-2">
    <template #header>视频预览</template>
    <div class="preview-wrap">
      <canvas ref="canvasRef" width="20px" height="360px"></canvas>
      <video ref="videoRef" controls height="360px"></video>
    </div>
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
.preview-wrap {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0 2px;

  canvas {
    border: 1px solid #eee;
    background: #f9f9f9;
    margin-right: 0.5rem;
  }

  video {
    height: 360px;
  }
}

.result-card {
  transition: all 0.3s ease;

  .result-detail {
    margin-top: 4px;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 8px;
    font-family: monospace;
    white-space: pre-wrap;
  }
}
</style>
