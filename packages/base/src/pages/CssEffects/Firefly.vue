<!--
 * @ Author: willysliang
 * @ CreateTime: 2024-09-19 14:06:34
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-19 14:49:20
 * @ Description: 萤火虫特效
 -->

<script setup lang="ts">
/*
  1. 有一个跟随鼠标移动的圆点
  2. 按钮悬停时有高亮发光的效果
  3. 悬停时按钮周边的萤火中效果
  */
</script>

<template>
  <div class="firefly-container">
    <div class="firefly-button-wrapper">
      <span v-for="i in 7" :key="i" :class="`dot dot-${i}`"></span>
      <span
        class="firefly-button bg-yellow-500 px-16 py-4 rounded-full uppercase"
        >Button</span
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.firefly-container {
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 20rem;
  height: 14rem;
  position: relative;
  box-shadow:
    0px 0px 8px 0px #fdfca9 inset,
    0px 0px 24px 0px #ffeb3b,
    0px 0px 8px 0px #ffffff42;
  mix-blend-mode: multiply;
}

.firefly-button-wrapper {
  position: relative;

  .firefly-button {
    z-index: 1;
    position: relative;
    text-decoration: none;
    text-align: center;
    appearance: none;
    display: inline-block;

    &::before {
      content: '';
      box-shadow: 0px 0px 24px 0px #ffeb3b;
      mix-blend-mode: screen;
      transition: opacity 0.3s;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      border-radius: 999px;
      opacity: 0;
    }

    &::after {
      content: '';
      box-shadow:
        0px 0px 23px 0px #fdfca9 inset,
        0px 0px 8px 0px #ffffff42;
      transition: opacity 0.3s;

      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      border-radius: 999px;
      opacity: 0;
    }
  }

  .dot {
    display: block;
    position: absolute;
    transition: transform calc(var(--speed) / 12) ease;
    width: var(--size);
    height: var(--size);
    transform: translate(var(--starting-x), var(--starting-y))
      rotate(var(--rotatation));

    &::after {
      content: '';
      animation:
        hoverFirefly var(--speed) infinite,
        dimFirefly calc(var(--speed) / 2) infinite calc(var(--speed) / 3);
      animation-play-state: paused;
      display: block;
      border-radius: 100%;
      background: yellow;
      width: 100%;
      height: 100%;
      box-shadow:
        0px 0px 6px 0px #ffeb3b,
        0px 0px 4px 0px #fdfca9 inset,
        0px 0px 2px 1px #ffffff42;
    }

    &.dot-1 {
      --rotatation: 0deg;
      --speed: 14s;
      --size: 6px;
      --starting-x: 30px;
      --starting-y: 20px;
      top: 2px;
      left: -16px;
      opacity: 0.7;
    }

    &.dot-2 {
      --rotatation: 122deg;
      --speed: 16s;
      --size: 3px;
      --starting-x: 40px;
      --starting-y: 10px;
      top: 1px;
      left: 0px;
      opacity: 0.7;
    }

    &.dot-3 {
      --rotatation: 39deg;
      --speed: 20s;
      --size: 4px;
      --starting-x: -10px;
      --starting-y: 20px;
      top: -8px;
      right: 14px;
    }

    &.dot-4 {
      --rotatation: 220deg;
      --speed: 18s;
      --size: 2px;
      --starting-x: -30px;
      --starting-y: -5px;
      bottom: 4px;
      right: -14px;
      opacity: 0.9;
    }

    &.dot-5 {
      --rotatation: 190deg;
      --speed: 22s;
      --size: 5px;
      --starting-x: -40px;
      --starting-y: -20px;
      bottom: -6px;
      right: -3px;
    }

    &.dot-6 {
      --rotatation: 20deg;
      --speed: 15s;
      --size: 4px;
      --starting-x: 12px;
      --starting-y: -18px;
      bottom: -12px;
      left: 30px;
      opacity: 0.7;
    }

    &.dot-7 {
      --rotatation: 300deg;
      --speed: 19s;
      --size: 3px;
      --starting-x: 6px;
      --starting-y: -20px;
      bottom: -16px;
      left: 44px;
    }
  }

  &:hover {
    .firefly-button::before,
    .firefly-button::after {
      opacity: 1;
    }

    .dot {
      transform: translate(0, 0) rotate(var(--rotatation));

      &::after {
        animation-play-state: running;
      }
    }
  }
}

@keyframes dimFirefly {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@keyframes hoverFirefly {
  0% {
    transform: translate(0, 0);
  }
  12% {
    transform: translate(3px, 1px);
  }
  24% {
    transform: translate(-2px, 3px);
  }
  37% {
    transform: translate(2px, -2px);
  }
  55% {
    transform: translate(-1px, 0);
  }
  74% {
    transform: translate(0, 2px);
  }
  88% {
    transform: translate(-3px, -1px);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
