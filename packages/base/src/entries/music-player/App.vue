<!--
 * @ Author: willysliang
 * @ CreateTime: 2023-03-21 23:34:10
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-13 16:16:34
 * @ Description: 页面主入口
 -->

<script setup lang="ts">
import { usePlayerInit } from '@store/player/index'
import { useLocaleHook } from '@/locales/useLocaleHook'
import { useRouteCache } from '@/hooks/useRouteCache'
import { Pages } from './router/constant'
import { Tracker } from '@willy/utils'

/** core */
import { reactive as MyReactive } from '@/hooks/core/reactive'

/** 音乐播放初始化 */
usePlayerInit()

/** 路由缓存 */
const { getCache, addCache } = useRouteCache()
addCache(Pages.INDEX.name)

/** 获取 ElementUI 语言 */
const { getElLocale } = useLocaleHook()

// eslint-disable-next-line no-new
new Tracker({
  requestUrl: 'http://localhost:9000/tracker',
  // historyTracker: true, // 开启监听页面的前进与回退的触发
  // domTracker: true, // 开启监听 dom事件触发上报
  // jsError: true, // 开启监听js错误上报
  // behaviorTracker: true, // 开启用户行为上报
  // performanceTracker: true, // 开启页面性能监控上报
  // resourceTracker: true, // 开启资源加载监控上报
})

MyReactive({ name: 'willy' })
</script>

<template>
  <el-config-provider :locale="getElLocale">
    <router-view v-slot="{ Component }">
      <keep-alive :include="getCache()">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </el-config-provider>
</template>
