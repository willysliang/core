<!--
 * @ Author: willysliang
 * @ CreateTime: 2022-10-08 16:53:18
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-06-18 14:30:25
 * @ Description: 页面大框展现
 -->

<script lang="ts" setup>
import MyLayout from '@comp/layout/layout.vue'
import Host from './Host.vue'
import { useAppStore } from '@store/app/index'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@store/app/setting'

const { isInit } = storeToRefs(useAppStore())
const { showPlayerModule } = storeToRefs(useSettingStore())
</script>

<template>
  <Host v-if="!isInit && showPlayerModule" />
  <my-layout v-else />
</template>
