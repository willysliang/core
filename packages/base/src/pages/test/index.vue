<!-- eslint-disable prefer-const -->
<!-- eslint-disable n/no-callback-literal -->
<!-- eslint-disable no-unmodified-loop-condition -->
<!-- eslint-disable @typescript-eslint/no-non-null-assertion -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!--
 * @ Author: willysliang
 * @ CreateTime: 2023-02-15 17:30:11
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-05-09 14:23:36
 * @ Description:测试组件
 -->

<script setup lang="ts">
import { demoPages } from '../constant'
import './test'
import VideoTest from './videoTest.vue'

defineOptions({
  name: demoPages.TEST.name,
  inheritAttrs: false,
})
</script>

<template>
  <el-button>按钮</el-button>

  <VideoTest />
</template>
