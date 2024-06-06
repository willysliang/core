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
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useThemeStore, useThemeInit } from '@store/app/theme'
import { demoPages } from '@/pages/constant'

const route = useRoute()
const isDemoRoute = computed(() =>
  Object.values(demoPages).some((page) => route.path.includes(`/${page.path}`)),
)

const { themeLayoutIsVertical } = storeToRefs(useThemeStore())
const { direction } = useThemeInit()
</script>

<template>
  <div class="layout flex flex-col w-full h-full overflow-hidden">
    <template v-if="themeLayoutIsVertical">
      <!-- 顶部菜单 -->
      <div :class="`layout__menu layout__menu--${direction}`">
        <my-menu />
      </div>

      <!-- 头部 -->
      <div class="layout__header">
        <MyHeader />
      </div>
    </template>

    <!-- 中间主体 -->
    <div class="layout__main">
      <!-- 左侧菜单栏 -->
      <div
        v-if="!themeLayoutIsVertical"
        :class="`layout__menu layout__menu--${direction}`"
      >
        <my-menu />
      </div>

      <!-- 主内容 -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- 头部 -->
        <div v-if="!themeLayoutIsVertical" class="layout__header">
          <MyHeader />
        </div>

        <!-- 右边展示区域 -->
        <div class="flex-1 overflow-hidden">
          <my-main />
        </div>
      </div>
    </div>

    <!-- 脚部 -->
    <div v-if="!isDemoRoute" class="layout__footer">
      <my-footer />
    </div>
  </div>
</template>

<style lang="scss">
/** 大框布局 */
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;

  /* 头部配置 */
  &__header {
    width: 100%;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    box-sizing: border-box;
    border-bottom: 1px solid var(--theme-border-second-color);
    background-color: var(--theme-bg-color);
    color: var(--theme-color);

    @apply text-xl px-4;
  }

  /** 菜单栏 */
  &__menu {
    flex-shrink: 0;
    box-sizing: border-box;
    background-color: var(--theme-second-bg-color);
  }

  &__menu--vertical {
    height: 3rem;
  }

  &__menu--horizontal {
    width: 12rem;
    height: 100%;
    overflow: hidden auto;
  }

  /** 中间主体 */
  &__main {
    flex: 1;
    display: flex;
    overflow: hidden hidden;
  }

  /* 脚部配置 */
  &__footer {
    width: 100%;
    height: 4.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    box-sizing: border-box;
    border-top: 1px solid var(--theme-border-second-color);
    background-color: var(--theme-bg-color);
    color: var(--theme-color);

    @apply p-1 pt-2;
  }
}
</style>
