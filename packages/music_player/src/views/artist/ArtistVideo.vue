<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-11 10:18:02
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-09 09:40:07
 * @ Description: 歌手详情视频
 -->

<script setup lang="ts">
import { useArtistMv } from '@api/artist'
import type { Mv } from '@/types/mv'
import { watch, reactive, ref } from 'vue'
import CoverPlay from '@comp/common/CoverPlay.vue'
import { useRouter } from 'vue-router'
import { Pages } from '@/router/constant'
import Paging from '@/components/songList/Paging.vue'

const props = defineProps<{
  id: number
}>()
const router = useRouter()

const list = ref<Mv[]>([] as Mv[])
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
    const { mvs } = await useArtistMv(props.id, pageData.limit, pageData.offset)
    if (pageData.page === 1) {
      list.value = mvs
    } else {
      list.value.push(...mvs)
    }
    if (mvs.length < pageData.limit) pageData.noMore = true
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
      class="grid grid-flow-row gap-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
    >
      <div
        v-for="(mv, index) in list"
        :key="index"
        @click="router.push({ name: Pages.MV.name, query: { id: mv.id } })"
      >
        <CoverPlay
          :pic-url="mv.imgurl16v9"
          :name="mv.name"
          :play-count="mv.playCount"
          show-play-count
          video
        />
        <div class="mt-2 text-xs truncate hover-text">
          {{ mv.name }}
        </div>
      </div>
    </div>

    <Paging v-model:page="pageData" :list="list" :get-data="getData" />
  </div>
</template>
