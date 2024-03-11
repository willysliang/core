<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-08 18:02:28
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-09 08:57:23
 * @ Description: 歌手个人信息描述组件
 -->

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ArtistDesc } from '@type/artist'
import { useArtistDesc } from '@api/artist'

const props = defineProps<{ id: number }>()

const artistDesc = ref<ArtistDesc>()

onMounted(async () => {
  artistDesc.value = await useArtistDesc(props.id)
})
</script>

<template>
  <div v-loading="!artistDesc" style="min-height: 200px">
    <template v-if="artistDesc && artistDesc?.introduction?.length > 0">
      <div v-for="(item, index) in artistDesc?.introduction" :key="index">
        <div class="py-5 font-bold text-sm">{{ item.ti }}</div>
        <div
          class="text-xs text-slate-500 leading-7"
          style="white-space: pre-wrap"
          v-html="item.txt"
        ></div>
      </div>
    </template>

    <el-empty v-else description="暂无数据" />
  </div>
</template>
