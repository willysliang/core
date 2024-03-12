<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-09 17:47:58
 * @ Modified by: willysliang
 * @ Modified time: 2022-10-12 14:11:40
 * @ Description: 歌曲列表
 -->

<script setup lang="ts">
import type { Song } from '@/types/song'
import { first } from 'lodash'
import { formatDuring } from '@/utils/format'
import IconPark from '@/components/common/IconPark.vue'
import {
  Add,
  DownTwo,
  Like,
  MoreTwo,
  PlayOne,
  PlayTwo,
} from '@icon-park/vue-next'
import { usePlayerStore } from '@/store/player'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

defineProps<{
  songlist: Song[]
}>()

/***
 * 播放控制
 */
const { playId } = storeToRefs(usePlayerStore())
const { getPlay } = usePlayerStore()

/* like 按钮 */
const handleLike = (item) => {
  item.isLike = !item?.isLike
}

/***
 * 路由跳转控制
 */
const router = useRouter()
/* 跳转专辑详情页 */
const navToAlbum = (id: number) => {
  router.push({
    path: 'album',
    query: { id },
  })
}

/* 跳转歌手详情页 */
const navToArtist = (id: number) => {
  router.push({
    path: 'artist',
    query: { id },
  })
}
</script>

<template>
  <div class="mt-2 text-main">
    <div class="song-item desc-main">
      <div class="w-16 text-center">操作</div>
      <div class="flex-auto">歌曲</div>
      <div class="w-32">歌手</div>
      <div class="w-1/4">专辑</div>
      <div class="w-20">时长</div>
    </div>
    <div
      v-for="(song, index) in songlist"
      :key="song.id"
      class="song-item"
      :class="{ playing: playId === song.id }"
      @dblclick="getPlay(song.id)"
    >
      <!-- 歌单排列 && 添加/移除喜欢 -->
      <div class="w-16 flex flex-row items-center">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <IconPark
          :icon="Like"
          :theme="song?.isLike ? 'filled' : 'outline'"
          size="18"
          :stroke-width="3"
          class="pl-1 hover:text-red-400 ml-2"
          :class="[song?.isLike ? 'text-red-500' : 'text-gray-300']"
          @click="handleLike(song)"
        />
      </div>

      <!-- 歌曲信息 && 操作 -->
      <div class="flex-1 flex flex-row items-center truncate">
        <div class="flex-1 flex flex-row items-center truncate">
          <span class="max-w-full truncate">{{ song.name }}</span>
          <IconPark
            v-if="song.mv > 0"
            class="mx-2 text-orange-400 cursor-pointer"
            size="18"
            :icon="PlayTwo"
          />
        </div>
        <!-- 鼠标悬停该行时，浮现此列按钮 -->
        <div class="hidden icon-action flex-shrink-0">
          <div class="flex flex-row items-center gap-x-1 text-gray-400 mx-2">
            <IconPark
              title="播放"
              :icon="PlayOne"
              size="18"
              class="hover-text"
              @click="getPlay(song.id)"
            />
            <IconPark title="添加到" :icon="Add" size="18" class="hover-text" />
            <IconPark
              title="下载"
              :icon="DownTwo"
              size="18"
              class="hover-text"
            />
            <IconPark
              title="更多操作"
              :icon="MoreTwo"
              size="18"
              class="hover-text"
            />
          </div>
        </div>
      </div>

      <!-- 歌手信息 -->
      <div class="w-32 truncate">
        <span class="hover-text" @click="navToArtist(first(song.ar).id)">
          {{ first(song.ar).name }}
        </span>
      </div>

      <!-- 专辑名称 -->
      <div class="w-1/4 truncate">
        <span class="hover-text" @click="navToAlbum(song.al.id)">
          {{ song.al.name }}
        </span>
      </div>

      <!-- 时长 -->
      <div class="w-20">
        <span>{{ formatDuring(song.dt / 1000) }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.song-item {
	@apply flex flex-row items-center;
	@apply w-full text-xs box-border py-4 pl-2;

	@apply border-b border-solid border-gray-300;

	&:nth-child(2n + 1) {
		// background-color: var(--theme-tab-bg-color);
	}

	&:hover {
		background-color: var(--theme-tab-hover-color);

		.icon-action {
			@apply inline-block;
		}
	}
}

.playing {
	@apply bg-emerald-50 dark:bg-stone-800;
}
</style>
