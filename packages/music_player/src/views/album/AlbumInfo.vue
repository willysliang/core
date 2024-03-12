<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 14:29:05
 * @ Modified by: willysliang
 * @ Modified time: 2022-10-11 10:12:43
 * @ Description: 专辑列表详情页 - 头部
 -->

<script setup lang="ts">
import Collapses from '@/components/common/Collapses.vue'
import SongHeadLabel from '@comp/songlist/SongHeadLabel.vue'
import { formatDateTemp } from '@/utils/format'
import type { Album } from '@/types/album'
import type { Song } from '@/types/song'

/***
 * 获取父组件传递过来歌单详情信息
 */
defineProps<{
  album: Album // 头部详情信息
  songlist: Song[] // 歌曲列表
}>()
</script>

<template>
  <!-- 歌单列表头部信息 -->
  <div class="flex flex-row items-stretch">
    <img
      :src="album.picUrl"
      alt="歌单封面图"
      class="w-44 h-44 object-cover rounded-xl flex-shrink-0"
    />
    <div class="flex-1 flex flex-col items-stretch box-border pl-4">
      <div class="flex flex-row">
        <div class=" flex items-center justify-center flex-shrink-0 mr-2 ">
          <span class="border-main box-border p-1 tool-main">专辑</span>
        </div>
        <span class="flex-1 text-2xl font-bold">
          {{ album.name }}
        </span>
      </div>

      <!-- 歌单用户信息 -->
      <div class="flex flex-row items-center">
        <span class="ml-2 py-4">
          {{ album.artist?.name || '默认用户名' }}
        </span>
        <span class="ml-2 desc-main">
          {{ formatDateTemp(new Date(album.publishTime)) }}创建
        </span>
      </div>

      <!-- 触件 -->
      <SongHeadLabel
        :songlist="songlist"
        :subscribed-count="album.info?.likedCount || 0"
      />

      <!-- 歌单描述 -->
      <Collapses :text="'简介：' + album.description" />
    </div>
  </div>
</template>
