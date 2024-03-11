<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-11 10:01:13
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-11 17:20:30
 * @ Description: 二维码登录
 -->

<script setup lang="ts">
import { useLoginQrKey, useLoginQrCreate, useLoginQrCheck } from '@api/user'
import { onBeforeMount, onUnmounted, ref } from 'vue'
import { code } from '@/assets/images'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@store/user'

const { checkLogin } = useUserStore()

const qrimg = ref(code)
const unikey = ref<string>('')
/** 获取二维码 */
const getCode = async () => {
  unikey.value = await useLoginQrKey()
  qrimg.value = await useLoginQrCreate(unikey.value)
}

// eslint-disable-next-line no-undef
let timer: NodeJS.Timer
const showTooltip = ref<boolean>(false)
onBeforeMount(async () => {
  try {
    getCode()

    timer = setInterval(async () => {
      const statusRes = await useLoginQrCheck(unikey.value)
      showTooltip.value = false
      if (statusRes.code === 800) {
        ElMessage.warning('二维码已过期,请重新获取')
        showTooltip.value = true
        clearInterval(timer)
      } else if (statusRes.code === 803) {
        clearInterval(timer)
        ElMessage.success('授权登录成功')
        await checkLogin(statusRes.cookie)
      }
    }, 3000)
  } catch {}
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="w-full h-60 flex justify-center items-center relative qrcode">
    <img
      :src="qrimg"
      alt="二维码"
      class="w-44 h-44 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      @click="getCode"
    />
    <div v-show="showTooltip" class="qrcode-tooltip">二维码已过期</div>
  </div>
</template>

<style lang="scss">
.qrcode {
	.qrcode-tooltip {
		@apply text-gray-900 font-bold;
		@apply bg-gray-400 opacity-90;
		@apply absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2;
		@apply flex items-center justify-center;
		@apply w-44 h-44;
	}
}
</style>
