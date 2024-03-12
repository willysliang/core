<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-04 15:02:18
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-04 16:29:38
 * @ Description: 主题设置按钮
 -->

<script setup lang="ts">
import { ThemeSetting } from './index'
import IconPark from '@comp/common/IconPark.vue'
import { Config } from '@icon-park/vue-next'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@store/app/theme'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { drawer } = storeToRefs(useThemeStore())

</script>

<template>
  <el-tooltip
    :content="t('layout.header.tooltipThemeSetting')"
    placement="bottom"
  >
      <IconPark
        :icon="Config"
        size="22"
        :stroke-width="3"
        class="hover-text mx-2"
        @click="drawer = true"
      />
  </el-tooltip>

  <!-- 个性化主题设置弹层 -->
  <ThemeSetting />
</template>
