<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 09:05:41
 * @ Modified by: willysliang
 * @ Modified time: 2022-10-21 11:48:53
 * @ Description: 页面大框 - 歌曲列表弹层
 -->

<script setup lang="ts">
import IconPark from '@comp/common/IconPark.vue'
import { Delete } from '@icon-park/vue-next'
import { toRefs } from 'vue'
import { usePlayerStore } from '@/store/player'
import { opticalDisk } from '@/assets/images'
import { first } from 'lodash'
import { formatDuring } from '@/utils/format'

/* 歌曲列表 */
const {
  showPlayList,
  playListCount,
  clearPlayList,
  playList,
  getPlay,
  playId,
} = toRefs(usePlayerStore())
</script>

<template>
  <el-drawer
    v-model="showPlayList"
    direction="rtl"
    :with-header="false"
    size="300px"
    custom-class="play-list"
  >
    <div class="w-full h-20 box-border p-2">
      <div class="text-xl font-blod my-2">歌曲列表</div>
      <div class="flex flex-row items-center justify-between">
        <span>共&nbsp;{{ playListCount }}&nbsp;首</span>
        <div class="flex flex-row" @click="clearPlayList">
          <IconPark :icon="Delete" />
          <span>清空列表</span>
        </div>
      </div>
    </div>
    <div
      class="w-full box-border pb-4"
      style="height: calc(100vh - 5rem); overflow: hidden"
    >
      <el-scrollbar>
        <div
          v-for="song in playList"
          :key="song.id"
          class="play-list-item flex flex-row items-center justify-between box-border pl-2 pr-4 py-2 border-t border-solid border-gray-300 hover-text"
          :class="[song.id === playId ? 'text-emerald-300' : '']"
          @dblclick="getPlay(song.id)"
        >
          <img
            alt="专辑图片"
            class="w-12 h-12 rounded"
            :src="song.al?.picUrl || opticalDisk"
          />
          <span>{{ song.name }}</span>
          <span>{{ first(song.ar)?.name || 'willysliang' }}</span>
          <span>{{ formatDuring(song.dt / 1000) }}</span>
        </div>
      </el-scrollbar>
    </div>
  </el-drawer>
</template>

<style lang="scss">
.play-list {

	.el-drawer__body {
		padding: 0;
		color: #000;
	}

	/* 列表 */
	.play-list-item {
		&:last-child {
			@apply border-b border-solid border-gray-300;
		}

		&:nth-child(2n + 1) {
			@apply bg-slate-100;
		}
	}
}
</style>
