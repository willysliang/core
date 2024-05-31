<!--
 * @ Author: willysliang
 * @ Create Time: 2022-12-02 17:41:22
 * @ Modified by: willysliang
 * @ Modified time: 2023-04-10 16:40:25
 * @ Description: Emoji 表情包
 -->
<script setup lang="ts">
import { onActivated } from 'vue'
import emojiJson from './emoji.json'
import { demoPages } from '../constant'

// eslint-disable-next-line no-undef
defineOptions({
  name: demoPages.EMOJI.name,
  inheritAttrs: false,
})

onActivated(() => {
  console.log(demoPages.EMOJI.name)
})

const emoji = emojiJson.data
</script>

<template>
  <div>{{ emoji }}</div>
</template>
