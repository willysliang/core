<!--
 * @ Author: willysliang
 * @ CreateTime: 2023-02-15 17:30:11
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-26 14:12:15
 * @ Description:测试组件
 -->

<script setup lang="ts">
import { demoPages } from '../constant'
import './test'

defineOptions({
  name: demoPages.TEST.name,
  inheritAttrs: false,
})
</script>

<template>
  <el-button>按钮</el-button>
  <div>111</div>
</template>
