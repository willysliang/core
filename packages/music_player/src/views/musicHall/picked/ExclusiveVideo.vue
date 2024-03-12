<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-11 19:05:11
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-11 19:14:32
 * @ Description: 独家视频 ExclusiveVideo
 -->

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import Title from '@comp/common/Title.vue'
import CoverPlay from '@comp/common/CoverPlay.vue'
import type { PersonalizedPrivateContent } from '@type/musicHall'
import { usePersonalizedPrivateContentList } from '@api/musicHall'
import { useRouter } from 'vue-router'
import { Pages } from '@/router/constant'

const personalizedPrivateContent = ref<PersonalizedPrivateContent[]>([])
const getPersonalizedPrivateContent = async () => {
  if (personalizedPrivateContent.value.length) return
  personalizedPrivateContent.value = await usePersonalizedPrivateContentList(4)
}
onBeforeMount(getPersonalizedPrivateContent)

const router = useRouter()
</script>

<template>
  <Title title="独家放送" />
  <div class="grid grid-flow-row grid-cols-2 lg:grid-cols-4 gap-5">
    <div
      v-for="item in personalizedPrivateContent"
      :key="item.id"
      @click="router.push({ name: Pages.MV.name, query: { id: item.id } })"
    >
      <CoverPlay :pic-url="item.sPicUrl" video :name="item.name" />
      <div class="truncate text-xs mt-2">{{ item.name }}</div>
    </div>
  </div>
</template>
