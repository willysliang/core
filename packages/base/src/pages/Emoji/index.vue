<!--
 * @ Author: willysliang
 * @ Create Time: 2022-12-02 17:41:22
 * @ Modified by: willysliang
 * @ Modified time: 2023-04-10 16:40:25
 * @ Description: Emoji 表情包
 -->
<script setup lang="ts">
import emojiJson from './emoji.json'
import { demoPages } from '../constant'

defineOptions({
  name: demoPages.EMOJI.name,
  inheritAttrs: false,
})

const emojiList = emojiJson.data.split(',')
</script>

<template>
  <div class="flex flex-wrap mx-4 rounded bg-slate-50">
    <div
      v-for="emoji in emojiList"
      :key="JSON.stringify(emoji)"
      class="rounded w-10 h-10 flex items-center justify-center text-base cursor-pointer hover:bg-slate-200"
    >
      <span>{{ emoji }}</span>
    </div>
  </div>
</template>
