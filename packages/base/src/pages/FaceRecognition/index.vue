<!--
 * @ Author: willysliang
 * @ CreateTime: 2025-05-12 17:03:55
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-14 11:26:34
 * @ Description: FaceRecognition 人脸识别
 -->

<script lang="ts" setup>
import FaceApi from './faceApi.vue'
import { demoPages } from '../constant'

defineOptions({
  name: demoPages.FACE_RECOGNITION.name,
  inheritAttrs: false,
})

const list = [
  { title: '人脸识别身份验证(face-api.js)', components: FaceApi, span: 22 },
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
