<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-10 17:48:36
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-08 14:32:01
 * @ Description: 推荐新音乐
 -->

<script setup lang="ts">
import Title from '@comp/common/Title.vue'
import { usePlayerStore } from '@store/player'
import { onBeforeMount, ref } from 'vue'
import type { PersonalizedNewSong } from '@type/discover'
import { usePersonalizedNewSong } from '@api/discover'

const { getPlay } = usePlayerStore()

const personalizedNewSong = ref<PersonalizedNewSong[]>(
  [] as PersonalizedNewSong[],
)
const getPersonalizedNewSong = async () => {
  if (personalizedNewSong.value.length) return
  try {
    personalizedNewSong.value = await usePersonalizedNewSong()
  } catch {}
}
onBeforeMount(async () => {
  getPersonalizedNewSong()
})
</script>

<template>
  <Title title="推荐新音乐" />

  <div
    class="grid grid-flow-row grid-cols-2 2xl:grid-cols-5 gap-y-2.5 gap-x-5 cursor-pointer"
  >
    <div
      v-for="(item, index) in personalizedNewSong"
      :key="index"
      class="hover-bg-view transition-all flex items-center"
      @click="getPlay(item.id)"
    >
      <img
        :src="item.picUrl"
        alt=""
        class="w-12 h-12 object-cover rounded flex-shrink-0"
      />
      <div class="px-2 text-xs flex-auto flex flex-col w-1/3">
        <div class="text-xs flex-1 truncate">
          {{ item.name }}
        </div>
        <div class="mt-1.5 text-dc">
          {{ item.song.artists[0].name }}
        </div>
      </div>
    </div>
  </div>
</template>
