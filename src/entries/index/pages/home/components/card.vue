<!--
 * @ Author: willy
 * @ CreateTime: 2023-12-21 17:22:44
 * @ Modifier: willy
 * @ ModifierTime: 2023-12-22 18:59:52
 * @ Description: 卡片页
 -->

<script setup lang="ts">
import {
  Avatar,
  FolderOpen,
  HourglassFull,
  RocketOne,
  TagOne,
} from '@icon-park/vue-next'
import WIconPark from '@comp/IconPark.vue'
import { formatDate } from '@utils/index'

export interface ICardInfo {
  /**
   * @description 文档标题
   */
  title: string
  /**
   * @description 文档作者
   */
  author: string
  /**
   * @description 文档最后编辑时间
   */
  modifierTime: Date | string
  /**
   * @description 文档路径
   */
  filePath: string
  /**
   * @description 标签集
   */
  tags: Array<string | number>
  /**
   * @description 文档封面图
   */
  coverPicture?: string
  /**
   * @description 文档描述
   */
  description?: string
  /**
   * @description 是否为热门文档
   */
  isHot?: boolean
}

defineOptions({
  name: 'WCard',
})

const cardInfo = defineProps<ICardInfo>()

const emits = defineEmits(['detail'])
const handleToDetail = () => {
  emits('detail', cardInfo)
}
</script>

<template>
  <div class="card">
    <WIconPark
      v-if="cardInfo.isHot"
      :icon="RocketOne"
      class="card__hot-tag"
      :size="20"
    />
    <div class="card__title" :title="cardInfo.title" @click="handleToDetail">
      {{ cardInfo.title }}
    </div>
    <div class="card__info">
      <span class="card__info-author">
        <WIconPark :icon="Avatar" />
        &nbsp;{{ cardInfo.author }}
      </span>
      <span class="card__info-modifier-time">
        <WIconPark :icon="HourglassFull" />
        &nbsp;{{ formatDate(cardInfo.modifierTime, 'YYYY-DD-MM') }}
      </span>
      <span class="card__info-path">
        <WIconPark :icon="FolderOpen" />
        &nbsp;{{ cardInfo.filePath }}
      </span>
      <span class="card__info-tags">
        <WIconPark :icon="TagOne" />
        <span v-for="(tag, idx) in cardInfo.tags" :key="idx"
          >&nbsp;#{{ tag }}&nbsp;</span
        >
      </span>
    </div>
    <div v-if="cardInfo.coverPicture" class="card__cover">
      <img :src="cardInfo.coverPicture" alt="文档封面图" />
    </div>
    <div v-if="cardInfo.description" class="card__description">
      <span>{{ cardInfo.description }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  --card-info-paading: 0.8rem;
  --card-info-text-size: var(--text-size-sm);
  --card-info-border-color: #e0e0e0;
  --card-cover-height: 30rem;
  --card-description-text-size: var(--text-size-sm);

  position: relative;
  width: 100%;
  border-radius: var(--card-border-radius);
  background-color: var(--card-bg-color);
  margin: 0 auto var(--card-margin);
  box-sizing: border-box;
  padding: var(--card-padding) var(--card-padding) 0;
  color: var(--card-text-color);
  overflow: hidden;

  &__hot-tag {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    color: #ff7043;
    transform: rotate(45deg);
  }

  &__title {
    font-size: var(--card-title-size);
    font-weight: bold;
    @include text-ell();
    cursor: pointer;

    &:hover {
      color: var(--textLightenColor);
    }
  }

  &__info {
    margin-top: p2r(6);
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    font-size: var(--card-info-text-size);
    border-bottom: 1px solid var(--card-info-border-color);
    padding-bottom: p2r(6);
    padding-top: p2r(8);

    &-author,
    &-modifier-time,
    &-path,
    &-tags {
      display: inline-block;
      margin-right: var(--card-info-paading);
      display: flex;
      align-items: center;
      cursor: pointer;
      flex-shrink: 0;

      &:hover {
        color: var(--textLightenColor);
      }
    }
  }

  &__cover {
    width: 100%;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    margin-top: p2r(6);
    max-height: var(--card-cover-height);
    overflow: hidden;

    img {
      width: 100%;
      border-radius: var(--card-border-radius);
      object-fit: scale-down;
      overflow: hidden;
    }
  }

  &__description {
    margin-top: p2r(6);
    font-style: italic;
    font-size: var(--card-description-text-size);
    line-height: calc(var(--card-description-text-size) + 0.2rem);
  }
}
</style>
