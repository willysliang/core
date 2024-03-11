<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-31 18:09:51
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-14 11:09:21
 * @ Description: 屏幕锁屏加载组件
 -->

<script setup lang="ts">
import { Pages } from '@/router/constant'
import { useAppStore } from '@store/app'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { LockScreenIndex } from './index'

const route = useRoute()
const lockscreenStore = useAppStore()
const isLock = computed(() => lockscreenStore.isLock)
const lockTime = computed(() => lockscreenStore.lockTime)
const isMouted = ref<boolean>(false)

/** 锁屏计时器 */
let timer: number

/** 锁屏倒计时函数 */
const timeKeeping = () => {
  if (timer) clearInterval(timer)

  // 如果为 登录页 或 锁屏 则不需要计时
  if (route.name === Pages.LOGIN.name || isLock.value) return

  // 设置不锁屏
  lockscreenStore.setLockscreen(false)
  lockscreenStore.setLockTime()

  /** 直接使用setInterval方法会报错，需要使用window.setInterval */
  timer = window.setInterval(() => {
    // 锁屏倒计时递减
    lockscreenStore.setLockTime(lockTime.value - 1)

    if (lockTime.value <= 0) {
      // 设置锁屏
      lockscreenStore.setLockscreen(true)
      return clearInterval(timer)
    }
  }, 1000)
}

/** 挂载锁屏函数 */
onMounted(() => {
  document.addEventListener('mousedown', timeKeeping)
  setTimeout(() => {
    isMouted.value = true
  })
})

/** 移除锁屏函数 */
onUnmounted(() => document.removeEventListener('mousedown', timeKeeping))
</script>

<template>
  <transition name="slide-up">
    <LockScreenIndex
      v-if="isLock && isMouted && route.name != Pages.LOGIN.name"
    />
  </transition>
</template>

<style lang="scss" scoped>
.slide-up-enter-active {
	animation: slide-up 0.5s;
}

.slide-up-leave-active {
	animation: slide-up 0.5s reverse;
}
@keyframes slide-up {
	0% {
		transform: translateY(-100%);
	}

	100% {
		transform: translateY(0);
	}
}
</style>
