<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-09 09:25:19
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-09 10:10:22
 * @ Description: 歌手精选歌曲
 -->

<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-11 10:16:36
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-07 11:04:03
 * @ Description: 歌手详情 -> 歌曲列表模块
 -->
<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Song } from '@/types/song'
import SongList from '@comp/songList/SongList.vue'
import { useArtistTopSong } from '@api/artist'
import SongOperation from '@/components/songList/SongOperation.vue'

const props = defineProps<{
  id: number
}>()

const songlist = ref<Song[]>([] as Song[])

/** 获取歌曲列表 */
const getData = async () => {
  try {
    songlist.value = await useArtistTopSong(props.id)
  } catch {}
}
watch(() => props.id, getData, { immediate: true, deep: true })

</script>

<template>
  <!-- 歌曲列表 - 操作栏 -->
  <SongOperation :is-order="false" :get-data="() => {}" :songlist="songlist" />

  <!-- 歌曲列表 -->
  <SongList :songlist="songlist" />
</template>
