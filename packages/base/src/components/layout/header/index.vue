<!--
 * @ Author: willysliang
 * @ CreateTime: 2022-10-10 09:05:41
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-07-11 14:23:20
 * @ Description: 页面布局头部
 -->

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import HeaderRouteDetail from './HeaderRouteDetail/index.vue'
import HeaderSearch from '@comp/layout/header/headerSearch/index.vue'
import UserInfo from '@comp/layout/header/userInfo/index.vue'
import HeaderFullScreen from './HeaderFullScreen/index.vue'
import LockScreen from './lockscreen/index.vue'
import HeaderThemeSetting from './headerThemeSetting/index.vue'
import HeaderGuide from './Guide/index.vue'
import HeaderLocale from './headerLocale/index.vue'
import { useSettingStore } from '@store/app/setting'
import { Pages } from '@/entries/music-player/router/constant'

const route = useRoute()
const { showPlayerModule } = storeToRefs(useSettingStore())

/**
 * 是否显示搜索栏
 */
const showSearch = computed(() => {
  if (!showPlayerModule.value) return false

  // 根路由(包含二级路由)
  const curRootPath = route.path.match(/\/([^?]+)/)?.[1] ?? ''
  // 获取一级路由
  const level1Path = curRootPath.split('/')[0]
  const isMPRoute = Object.values(Pages).some(
    (menu) => menu.path === level1Path,
  )
  return isMPRoute
})
</script>

<template>
  <!-- 路由详情 -->
  <HeaderRouteDetail />

  <!-- 搜索栏 -->
  <HeaderSearch v-if="showSearch" />

  <!-- 设置类 -->
  <div class="flex items-center justify-end">
    <!-- 用户登录 -->
    <UserInfo />

    <!-- 页面指导 -->
    <HeaderGuide />

    <!-- 锁屏 -->
    <LockScreen />

    <!-- 语言设置 -->
    <HeaderLocale />

    <!-- 屏幕缩放 -->
    <HeaderFullScreen />

    <!-- 主题设置 -->
    <HeaderThemeSetting />
  </div>
</template>
