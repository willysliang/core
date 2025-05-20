<!--
 * @ Author: willysliang
 * @ CreateTime: 2025-05-14 17:32:46
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-15 19:24:11
 * @ Description: 多图片人脸比对
 -->

<script setup lang="ts">
import { ref } from 'vue'
import * as tf from '@tensorflow/tfjs-core'
import * as faceapi from 'face-api.js'

/**
 * 模型配置
 */
const MODEL_CONFIG = {
  backend: 'webgl', // WebGL 后端
  confidenceThreshold: 0.6, // 动态置信度阈值
  similarityThreshold: 0.7, // 相似度阈值
}

/**
 * 加载状态管理
 */
const LOADING_STAGES = {
  INIT: '正在初始化系统...',
  PREPROCESSING: '正在预处理图像...',
  MODEL_LOADING: '正在加载AI模型 (30%)',
  IMAGE_PROCESSING: '正在分析人脸特征 (70%)',
  COMPARING: '正在计算相似度 (90%)',
}
const loadingStage = ref('')
const errorStage = ref('')

/**
 * 对比结果
 */
const DEFAULT_RESULT = {
  similarity: -1,
  file1Index: -1, // 原图索引
  file2Index: -1,
  passed: false,
}
const result = ref<typeof DEFAULT_RESULT | null>(null)

/** 选择的文件 */
const selectedFiles = ref<File[]>([])
const imagePreviews = ref<string[]>([])

/** 人脸描述 */
const descriptors = ref<
  {
    descriptor: Float32Array
    fileIndex: number
  }[]
>([])

const handleError = (error: unknown, context: string) => {
  const message = error instanceof Error ? error.message : String(error)
  errorStage.value = `${context}: ${message}`
  console.error(`[Error] ${context}:`, error)
}

/**
 * 加载模型
 */
const loadModels = async () => {
  try {
    loadingStage.value = LOADING_STAGES.MODEL_LOADING

    // 优先设置 WebGL 后端
    await tf.setBackend(MODEL_CONFIG.backend)
    await tf.ready()
    console.log(`TF后端: ${tf.getBackend()} | 版本: ${tf.version_core}`)

    // 并行加载模型
    const MODEL_PATH = './models'
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_PATH),
      faceapi.nets.mtcnn.loadFromUri(MODEL_PATH),
      faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_PATH),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_PATH),
    ])

    // 模型预热：使用实际检测方法进行预热
    const dummyTensor = tf.ones([1, 224, 224, 3])
    await faceapi
      .detectSingleFace(dummyTensor as any)
      .withFaceLandmarks(true)
      .withFaceDescriptor()
    dummyTensor.dispose()
  } catch (error: any) {
    handleError(error, '模型加载失败')

    // 降级策略
    if (MODEL_CONFIG.backend === 'webgl') {
      MODEL_CONFIG.backend = 'cpu'
      return loadModels()
    }
  } finally {
    loadingStage.value = ''
  }
}

// ================== 核心处理流程 ==================
/**
 * 人脸特征提取
 */
const extractFeatures = async () => {
  try {
    loadingStage.value = LOADING_STAGES.IMAGE_PROCESSING

    const promises = selectedFiles.value.map(async (file, fileIndex) => {
      const img = await faceapi.bufferToImage(file)
      const options = new faceapi.SsdMobilenetv1Options({
        minConfidence: MODEL_CONFIG.confidenceThreshold,
      })
      const detections = await faceapi
        .detectSingleFace(img, options)
        .withFaceLandmarks(true)
        .withFaceDescriptor()

      if (detections) {
        return {
          fileIndex,
          descriptor: detections.descriptor,
        }
      }
    })

    // descriptors.value = await Promise.all(promises)

    /** 只提取识别到人脸的图片进行对比 */
    descriptors.value = []
    const results = await Promise.allSettled(promises)
    results.forEach((res, idx) => {
      // 如果 promises 没报错，且返回有值，则提取该图片成功
      if (res.status === 'fulfilled') {
        res.value && descriptors.value.push(res.value)
      } else {
        console.warn(
          `[Warning] 提取第${idx + 1}张图片的人脸特征失败:`,
          res.reason,
        )
      }
    })
  } catch (err: any) {
    errorStage.value = err.message || '处理图片时出错'
  } finally {
    loadingStage.value = ''
  }
}

/**
 * 人脸对比
 */
const compareFaces = () => {
  if (descriptors.value.length < 2) {
    errorStage.value = '至少需要两张图片进行比对'
    return
  }

  try {
    loadingStage.value = LOADING_STAGES.COMPARING
    result.value = null

    // 使用高效的比较算法
    let bestMatch = { ...DEFAULT_RESULT }
    descriptors.value.forEach((desc1, i) => {
      descriptors.value.slice(i + 1).forEach((desc2) => {
        const distance = faceapi.euclideanDistance(
          desc1.descriptor,
          desc2.descriptor,
        )

        // 转换为相似度分数 (0-1)
        const similarity = 1 / (1 + distance)

        // 记录最佳匹配
        if (similarity > bestMatch.similarity) {
          bestMatch = {
            similarity,
            file1Index: desc1.fileIndex,
            file2Index: desc2.fileIndex,
            passed: similarity >= MODEL_CONFIG.similarityThreshold,
          }
        }
      })
    })

    result.value = bestMatch
  } catch (err: any) {
    handleError(err, '比对过程中出错')
  } finally {
    loadingStage.value = ''
  }
}

// ================== 用户交互 ==================
/**
 * 文件上传
 */
const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files) return

  selectedFiles.value = Array.from(input.files)
  imagePreviews.value = []
  result.value = null
  errorStage.value = ''

  if (selectedFiles.value.length === 0) return

  // 预览图片
  loadingStage.value = LOADING_STAGES.PREPROCESSING
  // 图片顺序插入不能乱，否则会导致识别结果在视图上显示异常
  for (const [fileIndex, file] of selectedFiles.value.entries()) {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      imagePreviews.value[fileIndex] = e.target.result
    }
    reader.readAsDataURL(file)
  }

  await loadModels()
  await extractFeatures()
}

/**
 * 重置
 */
const fileInputRef = ref<HTMLInputElement>()
const reset = () => {
  selectedFiles.value = []
  imagePreviews.value = []
  descriptors.value = []
  result.value = null
  errorStage.value = ''
  loadingStage.value = LOADING_STAGES.INIT
  fileInputRef.value!.value = ''
}
</script>

<template>
  <!-- 文件上传 -->
  <div class="upload-section">
    <input
      id="imageUpload"
      ref="fileInputRef"
      type="file"
      accept="image/*"
      multiple
      @change="handleFileUpload"
    />
    <label for="imageUpload" class="upload-btn">
      选择图片{{
        selectedFiles.length ? `已选择 ${selectedFiles.length} 张图片` : ''
      }}
    </label>
    <button
      :disabled="selectedFiles.length < 2 || !!loadingStage"
      @click="compareFaces"
    >
      {{ loadingStage ? '处理中...' : '开始比对' }}
    </button>
    <button :disabled="!!loadingStage" @click="reset">重置</button>
  </div>

  <!-- 状态提示 -->
  <div v-if="loadingStage" class="loading-text">{{ loadingStage }}</div>
  <div v-if="errorStage" class="errorStage-text">{{ errorStage }}</div>

  <!-- 用户引导区 -->
  <div v-if="imagePreviews.length" class="result-section">
    <!-- 图片预览区 -->
    <div class="image-gallery">
      <div
        v-for="(img, index) in imagePreviews"
        :key="index"
        class="image-box"
        :class="{
          highlight:
            result && [result.file1Index, result.file2Index].includes(index),
        }"
      >
        <img :src="img" alt="预览" />
        <p>图片 {{ index + 1 }}</p>
      </div>
    </div>

    <!-- 结果展示 -->
    <template v-if="result && !loadingStage">
      <h3 :class="{ success: result.passed, fail: !result.passed }">
        {{ result.passed ? '✅ 匹配成功' : '❌ 匹配失败' }}
      </h3>
      <p>最高相似度: {{ (result.similarity * 100).toFixed(2) }}%</p>
      <p>
        图片 {{ result.file1Index + 1 }} 和 图片 {{ result.file2Index + 1 }}
      </p>
    </template>
  </div>
</template>

<style scoped lang="scss">
/* 新增SCSS变量和混合 */
$primary-color: #2196f3;
$success-color: #4caf50;
$errorStage-color: #f44336;
$transition-duration: 0.3s;

.upload-section {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    background: $primary-color;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    transition: all $transition-duration;
    color: #fff;
    font-family: 'Segoe UI', system-ui, sans-serif;

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      transform: translateY(-2px);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    }
  }

  #imageUpload {
    display: none;
  }

  .upload-btn {
    background-color: #4caf50;
    color: #fff;
    padding: 0.8rem 1.2rem;
    border-radius: 8px;
    transition: background-color $transition-duration;
    cursor: pointer;

    &:hover {
      background: darken(#4caf50, 10%);
    }
  }
}

.loading-text {
  margin-top: 1rem;
  color: #666;
  font-size: 1.1rem;
}

.errorStage-text {
  color: red;
  margin-top: 1rem;
}

.result-section {
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .success {
    color: $success-color;
  }
  .fail {
    color: $errorStage-color;
  }

  .image-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
    text-align: center;

    .image-box {
      border: 2px solid #eee;
      border-radius: 8px;
      overflow: hidden;
      transition: transform $transition-duration;

      &.highlight {
        border: 2px solid $primary-color;
        box-shadow: 0 2px 6px rgba($primary-color, 0.2);
      }

      img {
        width: 100%;
        height: 180px;
        object-fit: contain;
      }
    }
  }
}
</style>
