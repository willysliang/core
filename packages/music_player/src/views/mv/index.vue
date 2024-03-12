<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-07 10:41:43
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-07 11:15:58
 * @ Description: MV详情
 -->

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { MvUrl } from '@type/mv'
import { useMvUrl } from '@api/mv'
import { usePlayerStore } from '@store/player'

const route = useRoute()
const id = Number(route.query.id)
const { setPause, setPlay } = usePlayerStore()

const mvUrl = ref<MvUrl>()

/** 进入 mv 页，加载MV 并暂停音乐播放 */
onBeforeMount(async () => {
  try {
    mvUrl.value = await useMvUrl(id)
    setPause()
  } catch {}
})

/** 销毁 mv 页面钱，继续音乐播放 */
onBeforeUnmount(() => {
  setPlay()
})
</script>

<template>
  <div v-if="mvUrl" class="p-5">
    <div class="flex gap-x-5">
      <div class="flex-1">
        <video
          class="aspect-video w-full"
          :src="mvUrl?.url"
          autoplay
          controls
        ></video>
      </div>
      <div class="hidden w-80 flex-shrink-0 xl:block">
        <div>大家都在看</div>
      </div>
    </div>
  </div>
</template>
