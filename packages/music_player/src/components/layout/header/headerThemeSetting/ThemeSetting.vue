<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-19 08:48:17
 * @ Modified by: willysliang
 * @ Modified time: 2023-04-10 17:18:43
 * @ Description: 页面布局头部 - 设置 - 抽屉 - 主题设置
 -->

<script setup lang="ts">
import ComponentCacheSetting from './ComponentCacheSetting.vue';
import { storeToRefs } from 'pinia'
import { themeStyle, themeLayout, themeColors } from '@/config/constant/theme'
import { useThemeStore } from '@store/app/theme'

const { drawer, themeStyleCurrent, themeLayoutCurrent, themeColorsCurrent } =
  storeToRefs(useThemeStore())
const { changeThemeLayout, changeThemeStyle, changeThemeColor } =
  useThemeStore()
</script>

<template>
  <el-drawer v-model="drawer" :with-header="false">
    <!-- 整体风格 -->
    <h3 class="font-bold">整体风格</h3>
    <div class="relative flex flex-row flex-wrap items-center box-border">
      <div
        v-for="theme in themeStyle"
        :key="theme.value"
        class="relative mr-2 mb-2 mt-1 rounded-md overflow-hidden"
        @click="changeThemeStyle(theme.key)"
      >
        <el-tooltip effect="dark" :content="theme.label" placement="top">
          <img :src="theme.value" alt="整体风格图标" />
        </el-tooltip>

        <el-icon
          v-show="themeStyleCurrent === theme.key"
          class="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style="position: absolute"
          color="#16c60c"
          :size="25"
        >
          <Select />
        </el-icon>
      </div>
    </div>

    <!-- 导航模式 -->
    <h3 class="font-bold mt-4">导航模式</h3>
    <div class="relative flex flex-row flex-wrap items-center box-border">
      <div
        v-for="theme in themeLayout"
        :key="theme.value"
        class="relative mr-2 mb-2 mt-1 rounded-md overflow-hidden"
        @click="changeThemeLayout(theme.key)"
      >
        <el-tooltip effect="dark" :content="theme.label" placement="top">
          <img :src="theme.value" alt="导航模式图标" />
        </el-tooltip>

        <el-icon
          v-show="themeLayoutCurrent === theme.key"
          class="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style="position: absolute"
          color="#16c60c"
          :size="25"
        >
          <Select />
        </el-icon>
      </div>
    </div>

    <!-- 主题色 -->
    <h3 class="font-bold mt-4">主题色</h3>
    <div class="relative flex flex-row flex-wrap items-center box-border">
      <div
        v-for="theme in themeColors"
        :key="theme.key"
        class="relative mb-2 mt-1 mr-2 h-10 w-1/6 rounded-md overflow-hidden"
        @click="changeThemeColor(theme.value)"
      >
        <el-tooltip effect="dark" :content="theme.title" placement="top">
          <div
            class="w-full h-full"
            :style="{ backgroundColor: theme.value }"
          />
        </el-tooltip>
        <el-icon
          v-show="themeColorsCurrent === theme.value"
          class="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style="position: absolute"
          color="#fff"
          :size="25"
        >
          <Select />
        </el-icon>
      </div>
    </div>

    <!-- 缓存页面 -->
    <ComponentCacheSetting />
  </el-drawer>
</template>
