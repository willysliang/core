<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-11 19:17:17
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-11 19:24:08
 * @ Description: 推荐电台 PersonalizedDjProgram
 -->

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import Title from '@comp/common/Title.vue'
import CoverPlay from '@comp/common/CoverPlay.vue'
import type { DjProgram } from '@type/musicHall'
import { usePersonalizedDjProgram } from '@api/musicHall'
import { useRouter } from 'vue-router'
import { Pages } from '@/router/constant'

const djProgram = ref<DjProgram[]>([] as DjProgram[])
const getDjProgram = async () => {
  if (djProgram.value.length) return
  djProgram.value = await usePersonalizedDjProgram()
}
onBeforeMount(getDjProgram)

const router = useRouter()
</script>

<template>
  <Title title="推荐电台" />
  <div class="grid grid-flow-row grid-cols-3 lg:grid-cols-6 gap-5">
    <div
      v-for="item in djProgram"
      :key="item.id"
      @click="router.push({ name: Pages.VIDEO.name, query: { id: item.id } })"
    >
      <CoverPlay :pic-url="item.picUrl" :name="item.name" :play-count="0" />
      <div class="truncate text-xs mt-2">{{ item.name }}</div>
    </div>
  </div>
</template>
