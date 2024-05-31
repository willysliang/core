<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 09:05:41
 * @ Modified by: willysliang
 * @ Modified time: 2022-10-20 18:51:28
 * @ Description: 歌曲信息
 -->

<script setup lang="ts">
import IconPark from '@comp/common/IconPark.vue'
import { Like } from '@icon-park/vue-next'
import { opticalDisk } from '@/assets/images'
import { toRefs, ref } from 'vue'
import { usePlayerStore } from '@/store/player'
import { first } from 'lodash'

/* 用户信息 */
const { song } = toRefs(usePlayerStore())

/* like 按钮 */
const isLike = ref<boolean>(false)
const handleLike = () => {
  isLike.value = !isLike.value
}
</script>

<template>
  <div class="w-1/3 flex flex-row">
    <img
      alt="专辑图片"
      class="w-12 h-12 rounded"
      :src="song.al?.picUrl || opticalDisk"
    />
    <div class="flex flex-col justify-around pl-2">
      <div class="flex flex-row items-center">
        <span>{{ song?.name || 'WEB云音乐' }}</span>
        <IconPark
          :icon="Like"
          :theme="isLike ? 'filled' : 'outline'"
          size="18"
          :stroke-width="3"
          :class="['pl-1 hover-text', isLike ? 'text-red-500' : '']"
          @click="handleLike"
        />
      </div>
      <span>{{ first(song.ar)?.name || 'willysliang' }}</span>
    </div>
  </div>
</template>

<style lang="scss"></style>
