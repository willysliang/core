<!--
 * @ Author: willysliang
 * @ CreateTime: 2022-12-10 07:59:28
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-04-03 19:30:21
 * @ Description: 组件通信
 -->

<script setup lang="ts">
import { onMounted } from 'vue'
import ChildA from './ChildA.vue'
import ChildB from './ChildB.vue'

onMounted(() => {
  // 主线程
  const worker = new Worker('./worker.js')
  const uInt8Array = new Uint8Array(new ArrayBuffer(10))
  for (let i = 0; i < uInt8Array.length; ++i) {
    uInt8Array[i] = i * 2 // [0, 2, 4, 6, ...]
  }
  worker.postMessage(uInt8Array)

  worker.onmessage = (e) => {
    console.log(e.data)
  }
})
</script>

<template>
  <el-row>
    <el-col :offset="1" :span="22">
      <el-card>
        <template #header>
          <span class="text-base">兄弟组件通信 MITT</span>
        </template>
        <el-row :gutter="10">
          <el-col :span="12">
            <ChildA />
          </el-col>
          <el-col :span="12">
            <ChildB />
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>
