<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-09 16:32:54
 * @ Modified by: willysliang
 * @ Modified time: 2022-10-11 12:15:49
 * @ Description: 歌曲列表头部触件
 -->
<script setup lang="ts">
import IconPark from '@/components/common/IconPark.vue'
import { PlayOne, Like, More } from '@icon-park/vue-next'
import { formatQuantity } from '@/utils/format'
import { usePlayerStore } from '@/store/player'
import type { Song } from '@/types/song'

/***
 * 获取父组件传递过来歌单详情信息
 */
defineProps<{
  songlist: Song[]
  subscribedCount: number // 收藏数量
}>()

/***
 * 播放音乐
 */
const { playAll } = usePlayerStore()
</script>

<template>
  <div class="flex items-center justify-self-stretch my-2">
    <button
      class="w-40 button flex flex-row justify-between items-center px-4"
      @click="playAll(songlist)"
    >
      <IconPark :icon="PlayOne" size="22" class="mr-1" />
      <span class="flex-1 text-center">播放全部</span>
      <span></span>
    </button>
    <button class="w-40 button-outline flex flex-row justify-between px-4 ml-4">
      <IconPark :icon="Like" size="18" class="mr-1" />
      <span>收藏</span>
      <div>({{ formatQuantity(Number(subscribedCount) || 0) }})</div>
    </button>
    <button class="button-outline w-8 flex flex-row justify-center ml-4">
      <IconPark :icon="More" />
    </button>
  </div>
</template>
