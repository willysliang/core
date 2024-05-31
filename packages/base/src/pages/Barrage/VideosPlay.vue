<!--
 * @ Author: willysliang
 * @ Create Time: 2022-12-02 15:34:44
 * @ Modified by: willysliang
 * @ Modified time: 2022-12-02 15:35:06
 * @ Description: 视频播放插件
 -->

<script lang="ts" setup>
import { reactive } from 'vue'
import VideoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css
import { demoVideo, demoJpg } from '@/assets/images'

const options = reactive({
  width: '80%', // 播放器高度
  height: '70%', // 播放器高度
  color: '#409eff', // 主题色
  title: '仙剑奇侠传三', // 视频名称
  type: 'video/mp4',
  src: demoVideo, // 视频源
  muted: false, // 静音
  webFullScreen: false,
  speedRate: ['2.0', '1.25', '1.5', '1.0', '0.75', '0.5'], // 播放倍速
  autoPlay: false, // 自动播放
  loop: false, // 循环播放
  mirror: false, // 镜像画面
  ligthOff: false, // 关灯模式
  volume: 0.5, // 默认音量大小
  control: true, // 是否显示控制
  controlBtns: [
    'audioTrack',
    'quality',
    'speedRate',
    'volume',
    'setting',
    'pip',
    'pageFullScreen',
    'fullScreen',
  ], // 显示所有按钮,
  playsinline: true,
  preload: 'auto',
})
</script>

<template>
  <VideoPlay v-bind="options" :poster="demoJpg" />
</template>
