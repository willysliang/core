<!--
 * @ Author: willysliang
 * @ Create Time: 2022-12-02 15:40:08
 * @ Modified by: willysliang
 * @ Modified time: 2023-04-10 16:41:24
 * @ Description: 视频 & 弹幕组件
 -->

<script lang="ts" setup>
import { onActivated } from 'vue'
import VideosBarrage from './VideosBarrage.vue'
import VideosPlay from './VideosPlay.vue'
import { demoPages } from '../constant'

// eslint-disable-next-line no-undef
defineOptions({
  name: demoPages.BARRAGE.name,
  inheritAttrs: false,
})

onActivated(() => {
  console.log(demoPages.BARRAGE.name)
})
</script>

<template>
  <VideosBarrage />

  <hr class="my-8" />

  <VideosPlay />
</template>
