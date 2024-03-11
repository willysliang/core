<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-11 17:26:37
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-11 18:06:25
 * @ Description: 热门歌单分类
 -->

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import type { PlaylistHighqualityTag } from '@type/playlist'
import { usePlaylistHighqualityTags } from '@api/musicHall'

/** 歌单分类 */
const tags = ref<PlaylistHighqualityTag[]>([
  { id: 0, name: '全部', type: 0, category: 0, hot: true },
])
onBeforeMount(async () => {
  try {
    const res = await usePlaylistHighqualityTags()
    tags.value.push(...res)
  } catch {}
})

/** 歌单选择 */
const emit = defineEmits<{
  (e: 'changeCat', cat: string): void
}>()
const activeCat = ref<string>('全部')
const handleCat = (cat: string) => {
  activeCat.value = cat
  emit('changeCat', cat)
}
</script>

<template>
  <div class="grid grid-flow-row grid-cols-8 2xl:grid-cols-12 gap-2.5">
    <div
      v-for="tag in tags"
      :key="tag.id"
      class="button-dc hover-text"
      :class="{ 'text-red-600': tag.name === activeCat }"
      @click="handleCat(tag.name)"
    >
      {{ tag.name }}
    </div>
  </div>
</template>

<style lang="scss">
.button-dc {
	@apply bg-[#e6e6e6] rounded  h-8 text-sm transition-all;
	@apply flex justify-center items-center;
	@apply cursor-pointer;
}
</style>
