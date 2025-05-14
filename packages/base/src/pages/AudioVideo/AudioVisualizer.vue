<!--
 * @ Author: willysliang
 * @ CreateTime: 2025-04-10 11:21:12
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-04-10 16:48:45
 * @ Description: 声波图
 -->

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { AudioVisualizer } from './utils/AudioVisualizer'

// DOM 引用
const canvasEl = ref<HTMLCanvasElement | null>(null)
const mediaElement = ref<HTMLMediaElement | null>(null)

// 状态
const visualizer = ref<AudioVisualizer | null>(null)
const isMicActive = ref(false)

// 初始化画布
onMounted(() => {
  if (!canvasEl.value) return
  canvasEl.value.width = 800
  canvasEl.value.height = 200
  visualizer.value = new AudioVisualizer(canvasEl.value)
})

// 处理文件上传
const handleFileUpload = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file || !visualizer.value) return

  try {
    // 创建可视化实例
    const newVisualizer = await AudioVisualizer.createFromFile(
      canvasEl.value!,
      file,
    )

    // 销毁旧实例
    visualizer.value?.destroy()
    visualizer.value = newVisualizer

    // 保存媒体元素引用
    mediaElement.value = newVisualizer.mediaElement || null
  } catch (err) {
    console.error('文件加载失败:', err)
    alert('不支持的媒体格式')
  }
}

// 播放控制
const playMedia = () => {
  if (mediaElement.value && mediaElement.value.paused) {
    mediaElement.value.play().catch(() => {
      alert('请先点击页面任意位置授权播放')
    })
  }
}

const stopMedia = () => {
  mediaElement.value?.pause()
  mediaElement.value && (mediaElement.value.currentTime = 0)
}

// 麦克风控制
let mediaStream: MediaStream | null = null

const toggleMicrophone = async () => {
  if (!visualizer.value) return

  if (isMicActive.value) {
    // 关闭麦克风
    mediaStream?.getTracks().forEach((track) => track.stop())
    visualizer.value.stopVisualization()
    isMicActive.value = false
  } else {
    // 开启麦克风
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      visualizer.value.connectMediaStream(mediaStream)
      isMicActive.value = true
    } catch {
      alert('需要麦克风权限')
    }
  }
}

// 清理资源
onBeforeUnmount(() => {
  visualizer.value?.destroy()
  mediaStream?.getTracks().forEach((track) => track.stop())
})
</script>

<template>
  <div>
    <!-- 文件上传 -->
    <div class="controls">
      <input type="file" accept="audio/*,video/*" @change="handleFileUpload" />
      <button :disabled="!mediaElement" @click="playMedia">播放</button>
      <button :disabled="!mediaElement" @click="stopMedia">停止</button>
    </div>

    <!-- 可视化画布 -->
    <canvas ref="canvasEl" width="20px" height="360px"></canvas>

    <!-- 麦克风控制 -->
    <div class="controls">
      <button @click="toggleMicrophone">
        {{ isMicActive ? '关闭' : '开启' }}麦克风
      </button>
    </div>
  </div>
</template>

<style scoped>
.controls {
  margin: 20px 0;
}

canvas {
  border: 1px solid #eee;
  background: #f9f9f9;
}

button {
  margin-right: 10px;
  padding: 8px 15px;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
