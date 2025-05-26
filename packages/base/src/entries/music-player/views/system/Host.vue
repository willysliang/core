<!--
 * @ Author: willysliang
 * @ CreateTime: 2022-11-14 10:16:11
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-26 15:51:30
 * @ Description: 系统页
 -->

<script setup lang="ts">
import { computed, reactive } from 'vue'
import axios from 'axios'
import { API_TARGET_URL } from '@/config/constant/cache'
import { useAppStore } from '@store/app'
import { bgWelcome } from '@/assets/svg'

const pageData = reactive({
  host: API_TARGET_URL,
  loading: false,
  error: false,
})

const { setHost } = useAppStore()
const baseUrl = computed(() => pageData.host.trimEnd('/'))

const handleSubmit = async () => {
  pageData.loading = true
  axios
    .get(baseUrl.value + '/banner')
    .then(() => {
      setHost(baseUrl.value)
      pageData.error = false
    })
    .catch(() => {
      pageData.error = true
      setTimeout(() => {
        pageData.error = false
      }, 5000)
    })
    .finally(() => {
      setHost(baseUrl.value || API_TARGET_URL) // demo需要
    })
}
</script>

<template>
  <div
    class="overflow-hidden w-screen h-screen flex flex-col items-center justify-center"
  >
    <img
      :src="bgWelcome"
      alt="背景logo"
      class="w-1/2 h-1/3 object-center object-scale-down"
    />
    <div class="text-2xl mt-5">欢迎体验 VUE3-MUSIC</div>
    <div class="mt-5 w-1/2 xl:w-1/3">
      <div v-if="pageData.error" class="mb-5">
        <el-alert center type="error"> 地址请求失败，请检查后重试！ </el-alert>
      </div>
      <el-input
        v-model="pageData.host"
        size="large"
        placeholder="如 http://127.0.0.1:3000"
      >
        <template #prepend>API 地址</template>
        <template #append>
          <el-button
            :disabled="!pageData.host"
            :loading="pageData.loading"
            @click="handleSubmit"
          >
            确定
          </el-button>
        </template>
      </el-input>
      <div class="text-sm mt-5 flex justify-center">
        <span>如何搭建？</span>
        <a
          class="hover-text text-emerald-400"
          href="https://binaryify.github.io/NeteaseCloudMusicApi"
          target="_blank"
        >
          网易云音乐-API 文档
        </a>
      </div>
    </div>
  </div>
</template>
