<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-10 18:05:31
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-11 17:52:47
 * @ Description: 推荐MV
 -->

<script setup lang="ts">
import Title from '@comp/common/Title.vue'
import { onBeforeMount, ref } from 'vue'
import type { PersonalizedMv } from '@type/discover'
import { usePersonalizedMv } from '@api/discover'
import { Pages } from '@/router/constant'
import { useRouter } from 'vue-router'
import CoverPlay from '@comp/common/CoverPlay.vue'

const router = useRouter()

const personalizedMv = ref<PersonalizedMv[]>([] as PersonalizedMv[])
const getPersonalizedMv = async () => {
  if (personalizedMv.value.length) return
  personalizedMv.value = await usePersonalizedMv()
}
onBeforeMount(async () => {
  getPersonalizedMv()
})
</script>

<template>
  <Title title="推荐MV" />

  <div class="grid grid-flow-row grid-cols-2 lg:grid-cols-4 gap-5">
    <div
      v-for="item in personalizedMv"
      :key="item.id"
      @click="router.push({ name: Pages.MV.name, query: { id: item.id } })"
    >
      <CoverPlay
        :pic-url="item.picUrl"
        video
        :name="item.name"
        :play-count="item.playCount"
        show-play-count
      />
      <div class="truncate text-xs mt-2">{{ item.name }}</div>
      <div class="truncate text-xs mt-1.5 text-slate-400">
        <small>{{ item.artistName }}</small>
      </div>
    </div>
  </div>
</template>
