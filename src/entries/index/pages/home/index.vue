<!--
 * @ Author: willy
 * @ Create Time: 2023-11-02 21:09:14
 * @ Modifier by: willy
 * @ Modifier time: 2023-11-03 11:12:47
 * @ Description: 主页
 -->

<script setup lang="ts">
import { useAppIndexStore } from '@store/app/index'
import { featureOther, featureUI, featureWeb } from '@img/index'

const { name, desc } = useAppIndexStore()

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
  <div class="banner">
    <h1>{{ name }}</h1>
    <p class="description">{{ desc }}</p>

    <div class="features">
      <div v-for="(feature, index) in features" :key="index" class="feature">
        <img :src="feature.icon" class="feature-icon" alt="feature-img" />
        <p class="feature-title">{{ feature.title }}</p>
        <p class="feature-desc">{{ feature.desc }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/funs.scss';

.banner {
  height: p2r(530);
  width: 100%;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABOSURBVFhH7c6xCQAgDAVRR9A6E4hLu4uLiWJ7tSnuQcIvr2TRYsw3/zOGGEOMIcYQY4gxxBhiDDGGGEOMIcYQY4gxxBhiDLkx52W4Gn1tuslCtHJvL54AAAAASUVORK5CYII=)
    rgb(40, 40, 45);
  color: #fff;
  text-align: center;
  box-sizing: border-box;
  @extend %flex;
  flex-direction: column;
  font-size: p2r(24);

  h1 {
    font-size: p2r(56);
    line-height: p2r(56);
  }

  .description {
    margin-top: p2r(26);
    font-size: p2r(18);
  }

  .features {
    @extend %flex;
    margin-top: p2r(78);

    .feature {
      padding: 0 p2r(75);
      @extend %flex;
      flex-direction: column;
      cursor: pointer;
      &:hover {
        color: var(--textLightenColor);
      }

      .feature-icon {
        width: p2r(160);
        @include btn();
      }

      .feature-title {
        margin-top: p2r(22);
        font-size: p2r(24);
      }

      .feature-desc {
        margin-top: p2r(22);
        font-size: p2r(18);
      }
    }
  }
}
</style>
