<!--
 * @ Author: willy
 * @ CreateTime: 2023-12-22 16:03:59
 * @ Modifier: willy
 * @ ModifierTime: 2023-12-22 17:24:13
 * @ Description: slider 模块
 -->

<script setup lang="ts">
import { useAppIndexStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import { Github, MailReview, TagOne } from '@icon-park/vue-next'
import WIconPark from '@comp/IconPark.vue'
import { copyText, randomColor } from '@utils/index'
import { panda } from '@/assets'

const { userInfo, tags } = storeToRefs(useAppIndexStore())
</script>

<template>
  <div class="userinfo">
    <div class="userinfo__avatar">
      <img :src="userInfo.avatar" alt="用户头像" />
    </div>
    <div class="userinfo__connect">
      <a :href="`mailto:${userInfo.email}`" target="_blank">
        <WIconPark :icon="MailReview" theme="filled" :size="18" />
      </a>
      <a :href="userInfo.github" target="_blank">
        <WIconPark :icon="Github" theme="filled" :size="18" />
      </a>
      <span @click="copyText(userInfo.phone)">
        <WIconPark :icon="MailReview" theme="filled" :size="18" />
      </span>
    </div>
    <div class="userinfo__nickname">
      <span>{{ userInfo.nickname }}</span>
    </div>
    <div class="userinfo__sign">
      <span>{{ userInfo.sign }}</span>
    </div>
  </div>

  <div class="tags">
    <div class="tags__title">
      <WIconPark :icon="TagOne" :size="24" theme="filled" fill="#85d69e" />
      <span>&nbsp;热门标签</span>
    </div>
    <div
      v-for="(tag, index) in tags"
      :key="index"
      class="tags__item"
      :style="`background-color: ${randomColor('hsl')};`"
    >
      <span>{{ tag }}</span>
    </div>
  </div>

  <div class="welcome">
    <div class="welcome__title">WELCOME</div>
    <div class="welcome__icon"><img :src="panda" alt="" /></div>
  </div>
</template>

<style lang="scss" scoped>
.userinfo {
  --userinfo-nickname-size: var(--text-size-md);
  --userinfo-sign-size: var(--text-size-sm);

  border-radius: var(--card-border-radius);
  background-color: var(--card-bg-color);
  width: 100%;
  overflow: hidden;

  &__avatar {
    width: 100%;

    img {
      max-width: 100%;
    }
  }

  &__connect {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: p2r(5);

    a,
    span {
      cursor: pointer;
      color: #335b63;

      &:hover {
        color: #41b9d7;
      }
    }
  }

  &__nickname {
    font-size: var(--userinfo-nickname-size);
    box-sizing: border-box;
    padding: p2r(10) p2r(10) p2r(0);
  }

  &__sign {
    font-size: var(--userinfo-sign-size);
    font-style: italic;
    box-sizing: border-box;
    padding: p2r(6) p2r(10) p2r(6);
  }
}

.tags {
  border-radius: var(--card-border-radius);
  background-color: var(--card-bg-color);
  width: 100%;
  margin-top: var(--card-margin);
  box-sizing: border-box;
  padding: var(--card-padding);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &__title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: var(--card-title-size);
    color: #9daf9f;
    margin-bottom: p2r(10);
  }

  &__item {
    box-sizing: border-box;
    padding: p2r(5);
    color: #fff;
    font-size: var(--text-size-sm);
    margin-right: p2r(10);
    margin-bottom: p2r(8);
    border-radius: 0.3rem;
    @extend %flex;

    &:hover {
      animation: tagItemScale 0.8s 1 ease-in forwards;

      @keyframes tagItemScale {
        0% {
          transform: scale(0.96);
        }

        100% {
          transform: scale(1.1);
        }
      }
    }
  }
}

.welcome {
  border-radius: var(--card-border-radius);
  background-color: var(--card-bg-color);
  width: 100%;
  margin-top: var(--card-margin);
  box-sizing: border-box;
  padding: var(--card-padding);

  &__title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: var(--card-title-size);
    color: #9daf9f;
    margin-bottom: p2r(10);
  }

  &__icon {
    img {
      max-width: 100%;
    }
  }
}
</style>
