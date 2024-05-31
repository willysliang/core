<!--
 * @ Author: willysliang
 * @ Create Time: 2023-04-10 17:08:16
 * @ Modified by: willysliang
 * @ Modified time: 2023-04-10 18:10:12
 * @ Description: 组件缓存设置 ComponentCacheSetting
 -->

<script setup lang="ts">
import { ref } from 'vue'
import { demoPages } from '@/pages/constant'
import { useRouteCache } from '@/hooks/useRouteCache'

const { getCache, themeAddCache } = useRouteCache()

const compList = Object.values(demoPages)
const compCache = ref<string[]>(getCache())

/** 选择/修改 */
const handleSelect = (compNames: string[]) => {
  themeAddCache(compNames)
}
</script>

<template>
  <h3 class="font-bold mt-4">缓存页面</h3>
  <el-select
    v-model:model-value="compCache"
    clearable
    multiple
    placeholder="请选择需要缓存的页面"
    class="w-full"
    @change="handleSelect"
  >
    <el-option
      v-for="item in compList"
      :key="item.key"
      :label="item.title"
      :value="item.name"
    />
  </el-select>
</template>
