<!--
 * @ Author: willy
 * @ Create Time: 2023-11-02 21:09:14
 * @ Modifier: willy
 * @ ModifierTime: 2023-12-22 17:20:49
 * @ Description: 主页
 -->

<script setup lang="ts">
import WCard from './components/card.vue'
import WFeatures from './components/features.vue'
import Slider from './components/slider.vue'
import { storeToRefs } from 'pinia'
import { logger } from '@utils/index'
import { useAppIndexStore } from '@store/app/index'

const { appName, appDesc, cardInfos } = storeToRefs(useAppIndexStore())

const handleToDetail = (cardInfo) => {
  logger.info(cardInfo)
}
</script>

<template>
  <div class="banner">
    <h1 class="banner__title" :title="appName">{{ appName }}</h1>
    <p class="banner__description" :title="appDesc">{{ appDesc }}</p>

    <WFeatures />
  </div>

  <div class="main-wrapper">
    <div class="cards">
      <WCard
        v-for="(cardInfo, index) in cardInfos"
        :key="index"
        v-bind="cardInfo"
        @detail="handleToDetail"
      />
    </div>

    <div class="slider">
      <Slider />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/animation.scss';

.banner {
  --banner-text-color: #fff;
  --banner-title-height: var(--text-size-xl);
  --banner-desc-height: var(--text-size-md);

  width: 100%;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABOSURBVFhH7c6xCQAgDAVRR9A6E4hLu4uLiWJ7tSnuQcIvr2TRYsw3/zOGGEOMIcYQY4gxxBhiDDGGGEOMIcYQY4gxxBhiDLkx52W4Gn1tuslCtHJvL54AAAAASUVORK5CYII=)
    rgb(40, 40, 45);
  color: var(--banner-text-color);
  text-align: center;
  box-sizing: border-box;
  @extend %flex;
  flex-direction: column;

  &__title {
    font-size: var(--banner-title-height);
    line-height: var(--banner-title-height);
    font-weight: bold;
  }

  &__description {
    margin-top: p2r(26);
    font-size: var(--banner-desc-height);
    line-height: var(--banner-desc-height);
    font-style: italic;
  }
}

.main-wrapper {
  --wrapper-bg-color: #f4f4f4;
  --cards-widht: 100%;

  @media (min-width: 767px) {
    --cards-widht: 80%;
  }

  width: 100%;
  height: auto;
  background-color: var(--wrapper-bg-color);
  box-sizing: border-box;
  padding: p2r(5) p2r(5);
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .cards {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex-shrink: 0;
    width: var(--cards-widht);
  }

  .slider {
    flex: 1;
    box-sizing: border-box;
    padding: p2r(5);
    align-self: flex-start;
  }
}
</style>
