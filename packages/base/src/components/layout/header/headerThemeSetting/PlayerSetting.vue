<!--
 * @ Author: willy
 * @ CreateTime: 2024-06-06 14:59:08
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-26 16:02:34
 * @ Description: 音乐设置
 -->

<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@store/app/setting'

const { showPlayerModule } = storeToRefs(useSettingStore())
const emits = defineEmits(['close'])
watch(showPlayerModule, () => emits('close'))
</script>

<template>
  <h3 class="font-bold mt-6">音乐模块显隐</h3>
  <el-switch v-model="showPlayerModule" />
</template>
