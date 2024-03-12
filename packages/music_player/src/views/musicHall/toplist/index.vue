<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-11 18:37:15
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-11 18:54:55
 * @ Description: 排行榜 toplist
 -->

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import Title from '@comp/common/Title.vue'
import CoverPlay from '@comp/common/CoverPlay.vue'
import { useTopListDetail } from '@api/musicHall'
import type { TopListDetail } from '@type/musicHall'
import { Pages } from '@/router/constant'
import { useRouter } from 'vue-router'

const topListDetailData = ref<TopListDetail[]>([] as TopListDetail[])
const getTopListDetailData = async () => {
  if (topListDetailData.value.length) return
  topListDetailData.value = await useTopListDetail()
}
onBeforeMount(getTopListDetailData)

const router = useRouter()
const toPlaylist = (topListDetail: TopListDetail) => {
  router.push({ name: Pages.PLAYLIST.name, query: { id: topListDetail.id } })
}
</script>

<template>
  <Title title="官方榜" />
  <div class="grid grid-flow-row grid-cols-2 2xl:grid-cols-4 gap-5">
    <div
      v-for="item in topListDetailData.slice(0, 4)"
      :key="item.id"
      class="flex bg-gray-100 rounded-lg items-center cursor-pointer"
      @click="toPlaylist(item)"
    >
      <CoverPlay
        :name="item.name"
        :pic-url="item.coverImgUrl"
        :play-count="item.playCount"
        class="w-36 flex-shrink-0"
        show-play-count
      />
      <div class="px-5 flex-1 flex-shrink-0 flex flex-col">
        <div class="text-xl font-bold">{{ item.name }}</div>
        <div class="text-xs text-main mt-2">
          <div v-for="(track, index) in item.tracks" :key="index" class="mt-2">
            <div class="flex">
              <span class="mr-1">{{ index + 1 }}</span>
              <div class="flex-auto w-20 truncate">
                {{ track.first }} - {{ track.second }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Title title="特色榜" />
  <div class="grid grid-flow-row grid-cols-5 2xl:grid-cols-10 gap-5">
    <div
      v-for="item in topListDetailData.slice(4)"
      :key="item.id"
      @click="toPlaylist(item)"
    >
      <CoverPlay
        :name="item.name"
        :pic-url="item.coverImgUrl"
        :play-count="item.playCount"
      />
      <div class="text-xs mt-2">{{ item.name }}</div>
    </div>
  </div>
</template>
