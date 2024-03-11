<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-09 09:51:56
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-10 17:45:54
 * @ Description: 歌曲列表的单个封面 item
 -->

<script setup lang="ts">
import IconPark from '@comp/common/IconPark.vue'
import { Play, Headset, PlayOne } from '@icon-park/vue-next'
import { formatQuantity } from '@/utils/format'

defineProps<{
  picUrl: string // 封面图片
  name?: string // 歌单名
  playCount?: number // 播放次数
  showPlayCount?: boolean // 是否打开歌单
  onPlay?:() => void // 点击播放事件
  video?: boolean // 是否为音频
}>()
</script>

<template>
  <div class="cover-play">
    <!-- 歌单封面图片 -->
    <el-image
      :src="picUrl"
      :alt="name || '封面图片'"
      class="w-full bg-gray-50 object-cover"
    />

    <!-- 鼠标悬浮遮罩层 -->
    <div class="mask">
      <IconPark
        :icon="PlayOne"
        theme="filled"
        :size="50"
        class="text-white opacity-0 transition-opacity hover-text play-icon"
        @click="onPlay ?? (() => undefined)"
      />
    </div>

    <!-- 播放次数显示 -->
    <div v-if="showPlayCount" class="play-count">
      <IconPark :icon="video ? Play : Headset" class="mr-1" :size="12" />
      <span>{{ formatQuantity(playCount || 0) }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cover-play {
	@apply relative rounded-lg cursor-pointer overflow-hidden  transition-all;

	.mask {
		@apply absolute inset-0;
		@apply flex justify-center items-center;
		@apply transition-all duration-500;
		@apply bg-black bg-opacity-0;
	}

	.play-count {
		@apply flex flex-row items-center;
		@apply absolute right-1 bottom-1;
		@apply text-white bg-black bg-opacity-80;
		@apply px-2 py-1;
		@apply rounded-full transition-all;
	}

	&:hover {
		.mask {
			@apply bg-opacity-50;

			.play-icon {
				@apply opacity-100;
			}
		}

		.play-count {
			@apply opacity-0;
		}
	}
}
</style>
