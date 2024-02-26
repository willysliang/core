<!--
 * @ Author: willy
 * @ CreateTime: 2023-12-22 11:13:33
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-26 11:27:51
 * @ Description: 特征页
 -->
<script setup lang="ts">
import {
  featureOther,
  featureUI,
  featureWeb,
} from '../../../../../assets/index'

/** 特征列表 */
const features = [
  {
    icon: featureWeb,
    title: '前端',
    desc: 'JavaScript、ES6、Vue框架等前端技术',
  },
  {
    icon: featureUI,
    title: '页面',
    desc: 'html(5)/css(3)，前端页面相关技术',
  },
  {
    icon: featureOther,
    title: '技术',
    desc: '技术文档、教程、技巧、总结等文章',
  },
] as const
</script>

<template>
  <div class="features">
    <div
      v-for="(feature, index) in features"
      :key="index"
      class="features-item"
      :title="feature.title + ': ' + feature.desc"
    >
      <img
        :src="feature.icon"
        class="features-item__icon ani__breath"
        alt="features-item__img"
      />
      <p class="features-item__title">
        {{ feature.title }}
      </p>
      <p class="features-item__desc" :title="feature.desc">
        {{ feature.desc }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.features {
  --feature-width: var(--col-width);
  --feature-icon-height: var(--col-height);
  --feature-title-size: var(--text-size-md);
  --feature-desc-size: var(--text-size-sm);

  margin-top: p2r(40);
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;

  &-item {
    box-sizing: border-box;
    padding: 0 p2r(20);
    @extend %flex;
    flex-direction: column;
    cursor: pointer;
    width: var(--feature-width);
    margin-bottom: p2r(20);

    &:hover {
      color: var(--textLightenColor);
    }

    &__icon {
      max-width: 100%;
      max-height: var(--feature-icon-height);
      @include btn();
    }

    &__title {
      margin-top: p2r(10);
      font-size: var(--feature-title-size);
      line-height: var(--feature-title-size);
      font-weight: bold;
    }

    &__desc {
      margin-top: p2r(8);
      width: 100%;
      font-size: var(--feature-desc-size);
      line-height: calc(var(--feature-desc-size) + 0.1rem);
      font-style: italic;
      @include text-ell(3);
    }
  }
}
</style>
