<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-09 12:47:43
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-10 17:22:22
 * @ Description: 歌单列表详情页
 -->
<script setup lang="ts">
import PlayListInfo from './PlaylistInfo.vue'
import type { PlayListDetail } from '@/types/playlist'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePlayListDetail, usePlayListTrackAll } from '@/api/module/playlist'
import { Song } from '@/types/song'
import SongList from '@comp/songlist/SongList.vue'
import Comments from '@/components/songList/Comments.vue'

/***
 * 歌单列表详情
 * - 获取路由上传递的ID来获取相应的歌单详情数据
 */
const route = useRoute()
const playlist = ref<PlayListDetail>({} as PlayListDetail) // 歌单详情信息
const songlist = ref<Song[]>([] as Song[]) // 歌曲列表
const routerId = ref<number>(0)
watch(
  () => route.query.id,
  async () => {
    /* 对route传递的参数进行断言 & 获取 */
    routerId.value = Number.parseInt((route.query?.id || 0) as string)
    try {
      playlist.value = await usePlayListDetail(routerId.value)
      songlist.value = await usePlayListTrackAll(routerId.value)
    } catch {}
  },
  { immediate: true, deep: true },
)

/** 歌单列表详情 */
const tab = ref<string>('tracks')
</script>

<template>
  <!-- 歌单列表头部信息 -->
  <PlayListInfo :songlist="songlist" :playlist="playlist" />

  <!-- 歌单列表详情 -->
  <el-tabs v-model="tab" class="mt-3">
    <el-tab-pane lazy :label="`歌曲 ${songlist.length}`" name="tracks">
      <SongList :songlist="songlist" />
    </el-tab-pane>
    <el-tab-pane lazy label="评论" name="comments">
      <Comments :id="routerId" api="/comment/playlist" />
    </el-tab-pane>
  </el-tabs>
</template>
