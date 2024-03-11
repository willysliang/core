<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-11 09:22:06
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-07 09:54:21
 * @ Description: 歌手详情 -> 头部
 -->
<script setup lang="ts">
import type { ArtistDetail } from '@/types/artist'

import IconPark from '@comp/common/IconPark.vue'
import { Plus, Fm, More } from '@icon-park/vue-next'
import Collapses from '@comp/common/Collapses.vue'
import { Pages } from '@/router/constant'

defineProps<{
  keys: string // 'SONG' | 'ALBUM' | 'ARTIST'
  detailData: ArtistDetail
  coverImg: string // 封面图路径
  title: string // 标题名
  musicSize?: number // 单曲数
  albumSize?: number // 专辑数
  mvSize?: number // MV数
  description: string // 简介
}>()
</script>

<template>
  <div class="flex flew row items-stretch">
    <img
      :src="coverImg"
      alt="封面图"
      class="w-44 h-44 object-cover flex-shrink-0"
      :class="[keys === Pages.ARTIST.key ? 'rounded-full' : 'rounded-xl']"
    />

    <div class="flex-1 flex flex-col items-stretch box-border pl-4">
      <div class="flex flex-row">
        <div class="flex items-center justify-center flex-shrink-0 mr-2">
          <span class="border-main box-border p-1 tool-main">
            {{ Pages[keys].name }}
          </span>
        </div>
        <span class="flex-1 text-2xl font-bold">
          {{ title }}
        </span>
      </div>

      <!-- 触件 -->
      <div class="justify-self-stretch mt-5 gap-x-2 flex items-center">
        <button class="w-32 button flex flex-row justify-around">
          <IconPark :icon="Plus" size="18" class="mr-1" />
          <span>关注</span>
          <span></span>
        </button>
        <button class="w-32 button-outline flex flex-row justify-around">
          <IconPark :icon="Fm" size="18" class="mr-1" />
          <span>歌手电台</span>
          <span></span>
        </button>
        <button class="button-outline w-8 flex flex-row justify-around">
          <IconPark :icon="More" />
        </button>
      </div>

      <!-- 标签 -->
      <div class="flex text-xs gap-x-5 text-slate-500 my-3">
        <div>
          单曲数：<span>{{ musicSize }}</span>
        </div>
        <div>
          专辑数：<span>{{ albumSize }}</span>
        </div>
        <div>
          MV数: <span>{{ mvSize }}</span>
        </div>
      </div>

      <!-- 歌单描述 -->
      <Collapses :text="'简介：' + description" />
    </div>
  </div>
</template>
