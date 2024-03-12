<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-11 10:16:36
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-09 10:21:42
 * @ Description: 歌手详情 -> 歌曲列表模块
 -->
<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { Song } from '@/types/song'
import SongList from '@comp/songList/SongList.vue'
import { useArtistSongs } from '@api/artist'
import SongOperation from '@/components/songList/SongOperation.vue'
import Paging from '@/components/songList/Paging.vue'
import type { PageType } from '@comp/songList/types'

const props = defineProps<{ id: number }>()

/***
 * 歌曲分次加载
 */
const pageData = reactive<PageType>({
  order: 'hot', // 类别
  limit: 20, // 分页数量
  page: 1, // 当前所在页
  offset: 0, // 数据偏移量
  loading: false, // 加载更多时触发的判定
  noMore: false, // 是否还能加载更多
  total: 0, // 歌曲总数
})

/***
 * 获取歌曲列表
 * - 动态监听路由参数中id 的变化，来重新请求
 */
const songlist = ref<Song[]>([] as Song[])
const getData = async () => {
  pageData.loading = true
  try {
    const { songs, total } = await useArtistSongs(
      props.id,
      pageData.order,
      pageData.limit,
      pageData.offset,
    )
    /* 歌曲列表的赋值 */
    if (pageData.page === 1) {
      songlist.value = songs
      pageData.total = total || 0
    } else {
      songlist.value.push(...songs)
      pageData.total = total || 0
    }

    pageData.loading = false
  } catch {
    pageData.page--
    pageData.loading = false
  }
}
watch(() => props.id, getData, { immediate: true, deep: true })
</script>

<template>
  <!-- 歌曲列表 - 操作栏 -->
  <SongOperation
    is-order
    :get-data="getData"
    :page="pageData"
    :songlist="songlist"
  />

  <!-- 歌曲列表 -->
  <SongList :songlist="songlist" />

  <!-- 加载更多 -->
  <Paging v-model:page="pageData" :list="songlist" :get-data="getData" />
</template>
