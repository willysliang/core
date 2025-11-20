<!--
 * @ Author: willysliang
 * @ CreateTime: 2022-12-02 15:40:08
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-30 08:42:26
 * @ Description: 音视频组件
 -->

<script lang="ts" setup>
import DPlayer from './DPlayer.vue'
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
    offset: 1,
  },
  {
    title: 'dPlayer视频播放 & 视频缩略图(聚焦进度条显示预览图)',
    components: DPlayer,
    span: 22,
    offset: 1,
  },
  {
    title: '视频播放',
    components: VideosPlay,
    span: 22,
    offset: 1,
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
