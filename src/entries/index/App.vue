<!--
 * @ Author: willy
 * @ Create Time: 2023-11-01 16:25:03
 * @ Modifier by: willy
 * @ Modifier time: 2023-11-03 11:50:33
 * @ Description: APP 主入口
 -->

<script setup lang="ts">
import { useAppIndexStore } from '@store/app/index'

const { name } = useAppIndexStore()
</script>

<template>
  <header class="px-header">
    <a class="logo">
      <img src="@img/app/common/logo.jpg" :alt="name" class="logo-icon" />
      <span class="project-name">{{ name }}</span>
    </a>
  </header>

  <div class="container">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<style lang="scss">
@import '@/styles/funs.scss';
@import '@/styles/animation.scss';

header {
  height: p2r(56);
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  background-color: var(--blurBg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: p2r(24);

  .logo {
    display: flex;
    align-items: center;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0 p2r(20);
    will-change: filter;
    transition: filter 300ms;

    &:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
      // 心跳动态
      animation: breath 2s ease-in-out infinite;
    }

    img {
      max-height: 90%;
      margin-right: p2r(18);
    }
  }
}

.container {
  //
}
</style>
