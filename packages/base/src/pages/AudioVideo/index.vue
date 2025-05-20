<!--
 * @ Author: willysliang
 * @ CreateTime: 2022-12-02 15:40:08
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-20 14:45:11
 * @ Description: 音视频组件
 -->

<script lang="ts" setup>
import VideosPlay from './VideosPlay.vue'
import VideoRecord from './VideoRecord.vue'
import { demoPages } from '../constant'

defineOptions({
  name: demoPages.AUDIO_VIDEO.name,
  inheritAttrs: false,
})

const list = [
  {
    title: '视频录制 & 频谱声波图 & 黑屏检测',
    components: VideoRecord,
    span: 22,
  },
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
