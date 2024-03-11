<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-11 10:17:30
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-09 09:39:14
 * @ Description: 歌手专辑模块
 -->

<script setup lang="ts">
import { useArtistAlbum } from '@api/artist'
import { reactive, ref, watch } from 'vue'
import CoverPlay from '@comp/common/CoverPlay.vue'
import { useRouter } from 'vue-router'
import { Pages } from '@/router/constant'
import Paging from '@/components/songList/Paging.vue'
import type { Album } from '@/types/album'

const props = defineProps<{
  id: number
}>()
const router = useRouter()

const list = ref<Album[]>([] as Album[])
const pageData = reactive({
  limit: 40,
  page: 1,
  loading: false,
  noMore: false,
  offset: 0,
})

/** 获取歌曲列表 */
const getData = async () => {
  try {
    pageData.loading = true
    const { hotAlbums } = await useArtistAlbum(
      props.id,
      pageData.limit,
      pageData.offset,
    )
    if (pageData.page === 1) {
      list.value = hotAlbums
    } else {
      list.value.push(...hotAlbums)
    }
    if (hotAlbums.length < pageData.limit) pageData.noMore = true
  } catch {
    pageData.page--
  }
  pageData.loading = false
}

watch(() => props.id, (newVal) => {
  if (newVal > 0) {
    pageData.page = 1
    getData()
  }
}, { immediate: true, deep: true })
</script>

<template>
  <div class="mt-2">
    <div
      class="grid grid-flow-row gap-5 grid-cols-3 lg:grid-cols-5 2xl:grid-cols-8"
    >
      <div
        v-for="(album, index) in list"
        :key="index"
        @click="
          router.push({ name: Pages.ALBUM.name, query: { id: album.id } })
        "
      >
        <CoverPlay :name="album.name" :pic-url="album.picUrl" :play-count="0" />
        <div class="mt-2 text-xs truncate hover-text">
          {{ album.name }}
        </div>
        <div class="mt-1 text-xs text-slate-400 truncate hover-text">
          {{ album.publishTime.toDate() }}
        </div>
      </div>
    </div>

    <Paging v-model:page="pageData" :list="list" :get-data="getData" />
  </div>
</template>
