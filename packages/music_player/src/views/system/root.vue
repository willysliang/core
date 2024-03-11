<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-08 16:53:18
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-14 10:33:07
 * @ Description: 页面大框展现
 -->

<script lang="ts" setup>
import MyLayout from '@comp/layout/layout.vue'
import Host from './Host.vue'
import { useAppStore } from '@store/app'
import { storeToRefs } from 'pinia'

const { isInit } = storeToRefs(useAppStore())
</script>

<template>
  <my-layout v-if="isInit" />
  <Host v-else />
</template>
