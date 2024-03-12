<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 09:05:41
 * @ Modified by: willysliang
 * @ Modified time: 2022-10-20 18:49:12
 * @ Description: 页面脚部 -> 操作按钮组件
 -->

<script setup lang="ts">
import PlayerList from './PlayerList.vue'
import IconPark from '@comp/common/IconPark.vue'
import { DownTwo, MoreTwo, Comment, MusicList } from '@icon-park/vue-next'
import { toRefs } from 'vue'
import { usePlayerStore } from '@/store/player'

/* 歌曲列表 */
const { showPlayList } = toRefs(usePlayerStore())
</script>

<template>
  <div
    class="player-action w-1/3 flex flex-row justify-end items-center box-border"
  >
    <el-badge :value="1000" :max="999" class="badge mr-6">
      <IconPark
        :icon="Comment"
        size="22"
        :stroke-width="3"
        class="hover-text"
        title="评论"
      />
    </el-badge>
    <span class="text-sm mx-3">标准</span>
    <IconPark
      :icon="DownTwo"
      size="22"
      :stroke-width="3"
      class="hover-text mx-3"
      title="下载"
    />
    <IconPark
      :icon="MoreTwo"
      size="22"
      :stroke-width="3"
      class="hover-text mx-3"
      title="更多"
    />
    <IconPark
      :icon="MusicList"
      size="22"
      :stroke-width="3"
      class="hover-text ml-3"
      title="播放列表"
      @click="showPlayList = true"
    />
  </div>

  <!-- 歌曲列表弹层 -->
  <PlayerList />
</template>

<style lang="scss">
.badge {
	.el-badge__content {
		color: var(--theme-second-color);
		background-color: var(--theme-second-bg-color);
		font-size: 0.1rem;
		padding: 0 3px;
		height: 0.8rem;
		top: 0;
		right: 0.7rem;
	}
}
</style>
