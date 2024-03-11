<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-11 09:22:06
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-09 09:46:14
 * @ Description: 歌手详情列表
 -->
<script setup lang="ts">
import {
  ArtistInfo,
  ArtistSongs,
  ArtistAlbum,
  ArtistVideo,
  ArtistDesc,
  ArtistHotSongs,
} from './index'
import { useArtistDetail } from '@/api/module/artist'
import type { ArtistDetail } from '@/types/artist'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Pages } from '@/router/constant'

/***
 * 获取歌手详情信息
 */
const route = useRoute()
const id = ref<number>(Number(route.query?.id || 0) as number)
const artistData = ref<ArtistDetail>({} as ArtistDetail)
watch(
  () => route.query.id,
  async (newVal) => {
    const newId: number = Number(newVal) as number
    try {
      artistData.value = await useArtistDetail(newId)
    } catch {}
    id.value = newId
  },
  { immediate: true, deep: true },
)

/***
 * 控制模块切换
 */
const tab = ref<string>('music')
</script>

<template>
  <!-- 歌手详情信息 -->
  <ArtistInfo
    :keys="Pages.ARTIST.key"
    :detail-data="artistData"
    :cover-img="artistData.artist?.cover || ''"
    :title="artistData.artist?.name || ''"
    :music-size="artistData.artist?.musicSize || 0"
    :album-size="artistData.artist?.albumSize || 0"
    :mv-size="artistData.artist?.mvSize || 0"
    :description="artistData.artist?.briefDesc || ''"
  />

  <el-tabs v-model="tab" class="mt-3">
    <el-tab-pane lazy label="精选" name="hot">
      <ArtistHotSongs :id="id" />
    </el-tab-pane>
    <el-tab-pane
      lazy
      :label="`歌曲 ${artistData.artist?.musicSize || 0}`"
      name="music"
    >
      <ArtistSongs :id="id" />
    </el-tab-pane>
    <el-tab-pane
      lazy
      :label="`专辑 ${artistData.artist?.albumSize || 0}`"
      name="album"
    >
      <ArtistAlbum :id="id" />
    </el-tab-pane>
    <el-tab-pane
      lazy
      :label="`视频 ${artistData.artist?.mvSize || 0}`"
      name="mv"
    >
      <ArtistVideo :id="id" />
    </el-tab-pane>
    <el-tab-pane lazy label="歌手详情" name="desc">
      <!-- <div v-html="artistData.artist?.briefDesc || ''"></div> -->
      <ArtistDesc :id="id" />
    </el-tab-pane>
  </el-tabs>
</template>
