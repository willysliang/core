<!--
 * @ Author: willysliang
 * @ Create Time: 2022-09-15 09:16:46
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-27 11:47:15
 * @ Description: 页面大框
 -->

<script setup lang="ts">
import MyHeader from './header/index.vue'
import MyMenu from './menu/index.vue'
import MyMain from './main/index.vue'
import MyFooter from './footer/index.vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useThemeStore, useThemeInit } from '@store/app/theme'
import { computed } from 'vue'
import { demoPages } from '@/pages/constant'

const { themeLayoutIsVertical } = storeToRefs(useThemeStore())
useThemeInit()

const route = useRoute()
const isDemoRoute = computed(() =>
  Object.values(demoPages).some((page) => `/${page.path}` === route.path),
)
</script>

<template>
  <div class="layout flex flex-col w-full h-full overflow-hidden">
    <!-- 顶部菜单 -->
    <div
      v-if="themeLayoutIsVertical"
      class="h-12 box-border"
      style="background-color: var(--theme-second-bg-color)"
    >
      <my-menu />
    </div>

    <!-- 中间主体 -->
    <div
      class="overflow-hidden flex flex-row w-full h-full"
      :style="{
        height: `calc(100vh ${isDemoRoute ? '' : '- 4.5rem'} ${
          themeLayoutIsVertical ? '- 3rem' : ''
        })`,
      }"
    >
      <!-- 左侧菜单栏 -->
      <div
        v-if="!themeLayoutIsVertical"
        class="menus w-48 h-full box-border overflow-auto"
        style="background-color: var(--theme-second-bg-color)"
      >
        <my-menu />
      </div>

      <!-- 主内容 -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- 头部 -->
        <div class="header">
          <MyHeader />
        </div>

        <!-- 右边展示区域 -->
        <div class="mains flex-1 overflow-hidden">
          <my-main />
        </div>
      </div>
    </div>

    <!-- 脚部 -->
    <div v-if="!isDemoRoute" class="footer">
      <my-footer />
    </div>
  </div>
</template>

<style lang="scss">
/** 大框布局 */
.layout {
	@apply box-border overflow-hidden flex flex-col;
}

/* 头部配置 */
.header {
	// background-color: var(--theme-bg-color);
	// color: var(--theme-color);
	height: 3.5rem;
	border-bottom: 1px solid var(--theme-border-second-color);
	@apply w-full flex items-center justify-between;
	@apply box-border text-xl px-4;
}

/* 脚部配置 */
.footer {
	// background-color: var(--theme-bg-color);
	// color: var(--theme-color);
	height: 4.5rem;
	border-top: 1px solid var(--theme-border-second-color);
	@apply flex flex-row justify-between items-center;
	@apply box-border p-1 pt-2 w-full;
}
</style>
