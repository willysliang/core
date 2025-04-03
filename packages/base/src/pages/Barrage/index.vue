<!--
 * @ Author: willysliang
 * @ CreateTime: 2022-12-02 15:40:08
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-04-03 19:42:23
 * @ Description: 视频 & 弹幕组件
 -->

<script lang="ts" setup>
import VideosPlay from './VideosPlay.vue'
import BlackScreenDetector from './BlackScreenDetector.vue'
import { demoPages } from '../constant'

defineOptions({
  name: demoPages.BARRAGE.name,
  inheritAttrs: false,
})

const list = [
  { title: '黑屏检测', components: BlackScreenDetector, span: 22 },
  { title: '视频播放', components: VideosPlay, span: 22 },
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
