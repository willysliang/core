<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-28 11:40:32
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-04 15:11:17
 * @ Description: 中英文语言切换
 -->

<script setup lang="ts">
import { Translate } from '@icon-park/vue-next'
import { localeList } from '@/locales/config'
import { useLocaleHook } from '@/locales/useLocaleHook'
import { useAppStore } from '@store/app'
import { storeToRefs } from 'pinia'

/** 切换语言 */
const { toggleLocale } = useLocaleHook()
const { localeType } = storeToRefs(useAppStore())
</script>

<template>
  <el-dropdown>
    <IconPark
      :icon="Translate"
      size="22"
      :stroke-width="3"
      class="hover-text mx-2"
    />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in localeList"
          :key="item.lang"
          :class="[localeType === item.lang ? 'bg-blue-200' : 'bg-white']"
          @click="toggleLocale(item.lang)"
        >
          <a href="javascript:;">{{ item.icon }} {{ item.label }}</a>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
