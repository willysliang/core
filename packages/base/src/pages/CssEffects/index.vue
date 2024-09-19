<!--
 * @ Author: willysliang
 * @ Create Time: 2023-01-05 19:41:19
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-17 01:00:54
 * @ Description: CSS特效
 -->
<script setup lang="ts">
import Lantern from './Lantern.vue'
import HeartSwitch from './HeartSwitch.vue'
import DestructionStyleClock from './destruction-style-clock.vue'
import TextReflection from './TextReflection.vue'
import Firefly from './Firefly.vue'

const list = [
  { title: '灯笼动画', components: Lantern, span: 22 },
  { title: '破坏风时钟', components: DestructionStyleClock, span: 22 },
  { title: '萤火虫', components: Firefly, span: 10 },
  { title: '心形开关', components: HeartSwitch, offset: 2, span: 10 },
  { title: '文字倒影', components: TextReflection, span: 22 },
]
</script>

<template>
  <el-row>
    <el-col
      v-for="item in list"
      :key="item.title"
      :offset="item?.offset ?? 1"
      :span="item.span"
      class="mb-4"
    >
      <el-card>
        <template #header>
          <span class="text-base">{{ item.title }}</span>
        </template>
        <div class="flex flex-col items-center justify-center">
          <component :is="item.components"></component>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
