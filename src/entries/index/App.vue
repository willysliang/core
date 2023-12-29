<!--
 * @ Author: willy
 * @ Create Time: 2023-11-01 16:25:03
 * @ Modifier by: willy
 * @ Modifier time: 2023-11-28 20:50:52
 * @ Description: APP 主入口
 -->

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppIndexStore } from '@store/app/index'
import { useReadPathFiles } from '@/hooks/useReadPathFiles'

import { useRouter } from 'vue-router'
import { indexPagesMap } from './routes'
import { catchFunc } from '@utils/index'

const { fileMap } = useReadPathFiles()
console.log('fileMap', fileMap, import.meta.env.VITE_APP_ENV)

const { appName, logoIcon } = storeToRefs(useAppIndexStore())

const router = useRouter()
const handleToCase = () => {
  router
    .push({
      path: indexPagesMap.CASE.path,
    })
    .catch(catchFunc)
}
</script>

<template>
  <header class="px-header">
    <a class="logo" :title="appName">
      <img :src="logoIcon" :alt="appName" class="logo__icon" />
      <span class="logo__name">{{ appName }}</span>
    </a>

    <div class="header__actions">
      <span @click="handleToCase">CASE</span>
    </div>
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
  --header-height: 250px;
  --header-bg-color: var(--blurBg);
  --header-border-color: var(--borderColor);
  --logo-text-size: var(--text-size-lg);

  height: var(--header-height);
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: var(--header-bg-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: p2r(1) solid var(--header-border-color);
  box-sizing: border-box;
  padding: 0 1%;

  .logo {
    display: flex;
    align-items: center;
    height: 100%;
    overflow: hidden;
    will-change: filter;
    transition: filter 300ms;

    &:hover {
      filter: drop-shadow(0 0 2rem #646cffaa);
    }

    &__icon {
      max-height: 90%;
      margin-right: 0.5rem;
    }

    &__name {
      font-size: var(--logo-text-size);
      font-style: italic;
    }
  }
}

.container {
  //
}
</style>
