<!--
 * @ Author: willy
 * @ CreateTime: 2024-05-08 20:28:05
 * @ Modifier: willy
 * @ ModifierTime: 2024-05-09 14:10:18
 * @ Description: 拖拽相关的导航
 -->

<script setup lang="ts">
import { ref } from 'vue'
import vueDragger from './index.vue'
import NativeDragger from './NativeDragger.vue'

const navList = [
  {
    name: '原生拖拽',
    value: 'NativeDragger',
    type: 'success',
    component: NativeDragger,
  },
  {
    name: 'vue-dragger',
    value: 'VueDragger',
    type: 'danger',
    component: vueDragger,
  },
]
const actNavIdx = ref(0)
const handleClickNav = (index) => {
  if (actNavIdx.value === index) return
  actNavIdx.value = index
}
</script>

<template>
  <div class="mb-4">
    <el-button
      v-for="(nav, index) in navList"
      :key="nav.value"
      :type="nav.type"
      @click="handleClickNav(index)"
    >
      {{ nav.name }}
    </el-button>
  </div>
  <component :is="navList[actNavIdx].component"></component>
</template>
