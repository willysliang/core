<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-04 14:53:04
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-23 09:53:22
 * @ Description: 屏幕缩放组件
 -->

<script setup lang="ts">
import IconPark from '@comp/common/IconPark.vue'
import { FullScreenOne, OffScreenOne } from '@icon-park/vue-next'
import { computed, unref } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { useI18nHooks } from '@/hooks/useI18n'
const { t } = useI18nHooks()

const { toggle, isFullscreen } = useFullscreen()

/** 获取中英标题 */
const getTitle = computed(() => {
  return unref(isFullscreen)
    ? t('layout.header.tooltipExitFull')
    : t('layout.header.tooltipEntryFull')
})
</script>

<template>
  <el-tooltip :content="getTitle" placement="bottom">
    <IconPark
      :icon="!isFullscreen ? FullScreenOne : OffScreenOne"
      size="22"
      :stroke-width="3"
      class="hover-text mx-2 cursor-pointer"
      @click="toggle"
    />
  </el-tooltip>
</template>
