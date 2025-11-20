<!--
 * @ Author: willysliang
 * @ CreateTime: 2025-07-09 09:52:08
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-07-10 16:03:50
 * @ Description: pdf电子签字
 -->

<script setup lang="ts">
import { demoPages } from '../constant'
import Sign from './Sign/index.vue'

defineOptions({
  name: demoPages.SIGN_PDF.name,
  inheritAttrs: false,
})

/**
 * 1.电子签字组件
 * 2.pdf展示组件(使用dom来展示pdf)
 * 3.动态pdf签字(通过点击dom调整pdf签字位置)
 * 4.签字pdf导出/下载
 */
const list = [
  {
    title: '电子签名',
    components: Sign,
    span: 23,
    offset: 0,
  },
  {
    title: '动态pdf & 签名',
    components: '',
    span: 23,
    offset: 0,
  },
]
</script>

<template>
  <el-row>
    <el-col
      v-for="item in list"
      :key="item.title"
      :span="item.span"
      :offset="item.offset"
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
