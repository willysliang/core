<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-14 10:16:11
 * @ Modified by: willysliang
 * @ Modified time: 2022-12-02 17:13:59
 * @ Description: 系统页
 -->

<script setup lang="ts">
import { computed, reactive } from 'vue'
import axios from 'axios'
import { useAppStore } from '@store/app'
import { bgWelcome } from '@/assets/svg'

const pageData = reactive({
  host: 'http://localhost:4000',
  loading: false,
  error: false,
})

const { setHost } = useAppStore()

const baseUrl = computed(() => {
  return pageData.host.trimEnd('/')
})

const sub = async () => {
  pageData.loading = true
  try {
    await axios.get(baseUrl.value + '/banner')
    setHost(baseUrl.value)
  } catch (e) {
    pageData.error = true
    setTimeout(() => {
      pageData.error = false
    }, 5000)
  }
  pageData.loading = false
}
</script>

<template>
  <div
    class="overflow-hidden w-screen h-screen flex flex-col items-center justify-center"
  >
    <img :src="bgWelcome" alt="背景logo" class="w-1/2 h-1/3 object-center object-scale-down">
    <div class="text-2xl mt-5">欢迎体验 VUE3-MUSIC</div>
    <div class="mt-5 w-1/2 xl:w-1/3">
      <div v-if="pageData.error" class="mb-5">
        <el-alert center type="error"> 地址请求失败，请检查后重试！ </el-alert>
      </div>
      <el-input
        v-model="pageData.host"
        size="large"
        placeholder="http://127.0.0.1:3000"
      >
        <template #prepend>API 地址</template>
        <template #append>
          <el-button
            :disabled="!pageData.host"
            :loading="pageData.loading"
            @click="sub"
            >确定</el-button
          >
        </template>
      </el-input>
      <div class="text-sm mt-5 flex justify-center">
        <span>如何搭建？</span>
        <a
          class="hover-text text-emerald-400"
          href="https://binaryify.github.io/NeteaseCloudMusicApi"
          target="_blank"
          >网易云音乐-API 文档</a
        >
      </div>
    </div>
  </div>
</template>
