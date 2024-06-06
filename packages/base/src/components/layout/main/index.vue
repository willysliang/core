<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 09:05:41
 * @ Modified by: willysliang
 * @ Modified time: 2023-04-10 18:09:53
 * @ Description: 主内容区域
 -->

<script setup lang="ts">
import { useRouteCache } from '@/hooks/useRouteCache'

/** 路由缓存 */
const { getCache } = useRouteCache()
</script>

<template>
  <div class="my-main">
    <router-view v-slot="{ Component }">
      <transition name="fade" :duration="{ enter: 500, leave: 800 }">
        <el-scrollbar class="w-full h-full">
          <Suspense>
            <keep-alive :include="getCache()">
              <component :is="Component" />
            </keep-alive>
          </Suspense>
        </el-scrollbar>
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.my-main {
  /* 格子背景色 */
  background-image: linear-gradient(
      90deg,
      rgb(50 0 0 / 5%) 3%,
      rgb(0 0 0 / 0%) 3%
    ),
    linear-gradient(360deg, rgb(50 0 0 / 5%) 3%, rgb(0 0 0 / 0%) 3%);
  background-size: 20px 20px;
  background-repeat: repeat;
  background-position: center center;

  @apply mx-auto py-5 px-4 box-border w-full h-full;

  :deep(.el-scrollbar__view) {
    width: 100%;
    height: 100%;
  }
}

// 开始过度
.fade-enter-from {
  background-color: red;
  width: 0;
  height: 0;
  transform: rotate(360deg);
}

// 开始过度了
.fade-enter-active {
  transition: all 2.5s linear;
}

// 过度完成
.fade-enter-to {
  background-color: yellow;
  width: 200px;
  height: 200px;
}

// 离开的过度
.fade-leave-from {
  width: 200px;
  height: 200px;
  transform: rotate(360deg);
}

// 离开中过度
.fade-leave-active {
  transition: all 1s linear;
}

// 离开完成
.fade-leave-to {
  width: 0;
  height: 0;
}
</style>
