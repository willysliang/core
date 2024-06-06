<!--
 * @ Author: willy
 * @ CreateTime: 2024-06-06 14:59:08
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-06 17:48:31
 * @ Description: 音乐设置
 -->

<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { usePlayerSettingStore } from '@store/player/playerSetting'

const { showPlayerModule } = storeToRefs(usePlayerSettingStore())
const emits = defineEmits(['close'])
watch(showPlayerModule, () => emits('close'))
</script>

<template>
  <h3 class="font-bold mt-6">音乐模块显隐</h3>
  <el-switch v-model="showPlayerModule" />
</template>
