<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 09:05:41
 * @ Modified by: willysliang
 * @ Modified time: 2022-10-10 18:41:44
 * @ Description: 页面脚部 -> 播放控制器
 -->

<script setup lang="ts">
import { toRefs } from 'vue'
import { usePlayerStore } from '@/store/player'
import IconPark from '@comp/common/IconPark.vue'
import {
  Play,
  PauseOne,
  LoopOnce,
  ShuffleOne,
  PlayOnce,
  GoEnd,
  GoStart,
  TextMessage,
} from '@icon-park/vue-next'
import { formatDuring } from '@/utils/format'

/* 播放滑动条 */
const { currentTime, duration, onSliderChange, onSliderInput } = toRefs(
  usePlayerStore(),
)

/* 播放图标 */
const { loopType, isPlaying, toggleLoop, togglePlay, toggleNextSong } = toRefs(
  usePlayerStore(),
)
</script>

<template>
  <div class="h-full flex-1 flex flex-col justify-between items-center">
    <div class="w-full flex flex-row justify-between items-center">
      <IconPark
        :icon="
          loopType === 0 ? PlayOnce : loopType === 1 ? LoopOnce : ShuffleOne
        "
        size="24"
        :stroke-width="3"
        class="hover-text"
        :title="
          loopType === 0 ? '单曲循环' : loopType === 1 ? '列表循环' : '随机播放'
        "
        @click="toggleLoop"
      />
      <IconPark
        :icon="GoStart"
        size="28"
        theme="filled"
        class="hover-text"
        title="上一首"
      />
      <IconPark
        :icon="!isPlaying ? Play : PauseOne"
        size="30"
        theme="filled"
        class="button-active"
        :title="!isPlaying ? '播放' : '暂停'"
        @click="togglePlay"
      />
      <IconPark
        :icon="GoEnd"
        size="28"
        class="hover-text"
        title="下一首"
        @click="toggleNextSong"
      />
      <IconPark
        :icon="TextMessage"
        size="24"
        :stroke-width="3"
        class="hover-text"
        title="歌词"
      />
    </div>
    <div class="w-full flex flex-row items-center justify-between">
      <span>{{ formatDuring(currentTime) }}</span>
      <el-slider
        v-model="currentTime"
        :show-tooltip="false"
        :min="0"
        :max="duration"
        class="px-1"
        @change="onSliderChange"
        @input="onSliderInput"
      />
      <span>{{ formatDuring(duration) }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.el-slider {
	height: 8px;

	--el-slider-main-bg-color: var(--theme-tool-bg-color);
	--el-slider-stop-bg-color: var(--theme-tool-second-bg-color);

	.el-slider__bar,
	.el-slider__runway {
		height: 4px;
	}

	.el-slider__button,
	.el-slider__button-wrapper {
		height: 9px;
		width: 9px;
	}

	.el-slider__button-wrapper {
		top: -6px;

		@apply opacity-0 transition-opacity;
	}

	&:hover {
		.el-slider__button-wrapper {
			@apply opacity-100;
		}
	}

	.el-slider__button {
		width: 8px;
		height: 8px;
	}
}
</style>
