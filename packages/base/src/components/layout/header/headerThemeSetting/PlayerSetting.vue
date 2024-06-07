<!--
 * @ Author: willy
 * @ CreateTime: 2024-06-06 14:59:08
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-06 21:34:10
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
