<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-04 15:15:15
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-04 16:37:15
 * @ Description: 锁屏组件
 -->
<script setup lang="ts">
import IconPark from '@comp/common/IconPark.vue'
import { Lock } from '@icon-park/vue-next'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'
import { LockscreenTransition } from './index'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { isLock } = storeToRefs(useAppStore())
const { setLockscreen } = useAppStore()
</script>

<template>
  <el-tooltip :content="t('layout.header.tooltipLock')" placement="bottom">
    <IconPark
      :icon="Lock"
      size="22"
      :stroke-width="3"
      class="hover-text mx-2"
      @click="setLockscreen(!isLock)"
    />
  </el-tooltip>

  <!-- 锁屏界面 -->
  <LockscreenTransition />
</template>
