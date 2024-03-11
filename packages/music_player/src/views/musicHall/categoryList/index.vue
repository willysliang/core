<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-10 19:05:22
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-11 18:31:53
 * @ Description: 分类歌单
 -->

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue'
import Title from '@comp/common/Title.vue'
import { PlaylistHot } from './index'
import CoverPlay from '@comp/common/CoverPlay.vue'
import { Pages } from '@/router/constant'
import { useRouter } from 'vue-router'
import { PlayListDetail } from '@/types/playlist'
import { useTopPlaylistHighquality } from '@api/musicHall'

const router = useRouter()

const list = ref<PlayListDetail[]>([] as PlayListDetail[])
const pageData = reactive({
  init: false,
  loading: false,
  limit: 35,
  before: 0,
  more: false,
  cat: '全部',
})
const getData = async () => {
  pageData.loading = true
  try {
    const { playlists, lasttime, more } = await useTopPlaylistHighquality({
      limit: pageData.limit,
      before: pageData.before,
      cat: pageData.cat,
    })
    if (pageData.before <= 0) {
      list.value = playlists
    } else {
      list.value?.push(...playlists)
    }
    pageData.init = true
    pageData.loading = false

    pageData.before = lasttime
    pageData.more = more
  } catch {}
}
onBeforeMount(getData)

/** 切换歌单 */
const changeCat = (newCat: string) => {
  pageData.cat = newCat
  pageData.before = 0
  pageData.more = false
  getData()
}
</script>

<template>
  <!-- 热门分类歌单 -->
  <PlaylistHot @change-cat="changeCat" />

  <Title :title="pageData.cat + '歌单'" />

  <div
    class="gap-5 grid grid-flow-row grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7"
  >
    <div
      v-for="(item, index) in list"
      :key="index"
      @click="
        router.push({ name: Pages.PLAYLIST.name, query: { id: item.id } })
      "
    >
      <CoverPlay
        :name="item.name"
        :pic-url="item.coverImgUrl"
        :play-count="item.playCount"
        show-play-count
      />
      <div class="mt-2 text-xs text-main leading-5">{{ item.name }}</div>
      <div class="mt-2 text-xs text-main truncate text-dc">
        {{ item.creator.nickname }}
      </div>
    </div>
  </div>

  <div v-if="pageData.more" class="py-10">
    <el-button
      class="text-center w-full"
      :loading="pageData.loading"
      text
      @click="getData"
    >
      <span class="tool-main">加载更多</span>
    </el-button>
  </div>
</template>
