<!--
 * @ Author: willysliang
 * @ CreateTime: 2022-11-11 10:01:13
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-26 17:55:39
 * @ Description: 二维码登录
 -->

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { code } from '@/assets/images'
import { useUserStore } from '@store/user'
import { useLoginQrKey, useLoginQrCreate, useLoginQrCheck } from '@api/user'

const { checkLogin } = useUserStore()

const qrimg = ref(code)
const unikey = ref<string>('')

/**
 * 获取二维码
 */
const getCode = async () => {
  unikey.value = await useLoginQrKey()
  qrimg.value = await useLoginQrCreate(unikey.value)
}

/**
 * 轮询更新二维码状态
 */
let timer: NodeJS.Timeout | null = null
const showTooltip = ref<boolean>(false)
const hanldeClearTimer = () => {
  timer && clearInterval(timer)
}

/** 更新二维码状态 */
const handleUpdateCodeStatus = async () => {
  try {
    const statusRes = await useLoginQrCheck(unikey.value)
    showTooltip.value = false

    if (statusRes.code === 800) {
      ElMessage.warning('二维码已过期,请重新获取')
      showTooltip.value = true
      hanldeClearTimer()
    } else if (statusRes.code === 803) {
      hanldeClearTimer()
      ElMessage.success('授权登录成功')
      await checkLogin(statusRes.cookie)
    }
  } catch {
    hanldeClearTimer()
  }
}
onBeforeMount(() => {
  getCode()
  timer = setInterval(handleUpdateCodeStatus, 3000)
})
onBeforeUnmount(hanldeClearTimer)
</script>

<template>
  <div class="qrcode">
    <img :src="qrimg" alt="二维码空图" @click="getCode" />
    <div v-show="showTooltip" class="qrcode-tooltip">二维码已过期</div>
  </div>
</template>

<style lang="scss" scoped>
.qrcode {
  @apply w-full h-60 flex justify-center items-center relative;

  img {
    @apply w-44 h-44;
    @apply absolute left-1/2 top-1/2;
    @apply transform -translate-x-1/2 -translate-y-1/2;
  }

  .qrcode-tooltip {
    @apply text-gray-900 font-bold;
    @apply bg-gray-400 opacity-90;
    @apply absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2;
    @apply flex items-center justify-center;
    @apply w-44 h-44;
  }
}
</style>
