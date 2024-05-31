<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 14:19:02
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-10 17:22:54
 * @ Description: 专辑详情页
 -->

<script setup lang="ts">
import { AlbumInfo } from './index'
import SongList from '@/components/songList/SongList.vue'
import type { Album } from '@/types/album'
import type { Song } from '@/types/song'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAlbum } from '@/api/module/album'
import Comments from '@/components/songList/Comments.vue'

/***
 * 专辑列表详情
 * - 获取路由上传递的ID来获取相应的歌单详情数据
 */
const route = useRoute()
const songlist = ref<Song[]>([] as Song[]) // 歌曲列表
const albumData = ref<Album>({} as Album)
const routerId = ref<number>(0)
watch(
  () => route.query.id,
  async () => {
    /* 对route传递的参数进行断言 & 获取 */
    routerId.value = Number.parseInt((route.query?.id || 0) as string)
    try {
      const { album, songs } = await useAlbum(routerId.value)
      albumData.value = album
      songlist.value = songs
    } catch {}
  },
  { immediate: true, deep: true },
)

/***
 * 专辑列表详情
 */
const tab = ref<string>('tracks')
</script>

<template>
  <!-- 专辑列表头部信息 -->
  <AlbumInfo :album="albumData" :songlist="songlist" />

  <!-- 专辑列表详情 -->
  <el-tabs v-model="tab" class="mt-3">
    <el-tab-pane lazy :label="`歌曲 ${songlist.length}`" name="tracks">
      <SongList :songlist="songlist" />
    </el-tab-pane>
    <el-tab-pane
      lazy
      :label="`评论 ${albumData.info?.commentCount || 0}`"
      name="comments"
    >
      <!-- <AlbumComments :id="routerId" /> -->
      <Comments :id="routerId" api="/comment/album" />
    </el-tab-pane>
    <el-tab-pane lazy label="专辑详情" name="desc">
      <div
        class="text-xs text-slate-500 leading-7"
        style="white-space: pre-wrap"
        v-html="albumData?.description"
      ></div>
    </el-tab-pane>
  </el-tabs>
</template>
