<!--
 * @ Author: willysliang
 * @ CreateTime: 2025-05-12 17:03:55
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-15 19:24:25
 * @ Description: FaceRecognition 人脸识别
 -->

<script lang="ts" setup>
import FaceApi from './faceApi.vue'
import FaceComparison from './FaceComparison.vue'
import { demoPages } from '../constant'

defineOptions({
  name: demoPages.FACE_RECOGNITION.name,
  inheritAttrs: false,
})

const list = [
  {
    title: '人脸识别身份验证(face-api.js)',
    components: FaceApi,
    span: 22,
  },
  {
    title: '多图片人脸比对',
    components: FaceComparison,
    span: 22,
  },
]
</script>

<template>
  <el-row>
    <el-col
      v-for="item in list"
      :key="item.title"
      :offset="1"
      :span="item.span"
      class="mb-4"
    >
      <el-card>
        <template #header>
          <span class="text-base">{{ item.title }}</span>
        </template>
        <component :is="item.components" />
      </el-card>
    </el-col>
  </el-row>
</template>
