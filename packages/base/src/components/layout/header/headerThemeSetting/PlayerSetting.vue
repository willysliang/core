<!--
 * @ Author: willy
 * @ CreateTime: 2024-06-06 14:59:08
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-07-11 14:23:56
 * @ Description: 音乐设置
 -->

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@store/app/setting'
import { Pages } from '@/entries/music-player/router/constant'

const route = useRoute()
const router = useRouter()
const emits = defineEmits(['close'])

const { showPlayerModule } = storeToRefs(useSettingStore())
const { changeShowPlayerModule } = useSettingStore()

/**
 * @function 音乐模块的显隐开关控制
 * @description
 *  1. 核心 - 将音乐模块的显隐开关存储到 localStorage 中，防止刷新后重置开关控制
 *  2. 优化 - 将开关状态变更 同步存储到全局，便于操作读取
 *  3. 问题 - 如果不展示音乐相关模块，且当前在音乐模块路由中，则重新跳转首页
 */
const handleChangeSwitch = (status: boolean) => {
  changeShowPlayerModule(status)

  // 如果不展示音乐相关模块，且当前在音乐模块路由中，则重新跳转首页
  if (!status) {
    // 根路由(包含二级路由)
    const curRootPath = route.path.match(/\/([^?]+)/)?.[1] ?? ''
    // 获取一级路由
    const level1Path = curRootPath.split('/')[0]
    const isMPRoute = Object.values(Pages).some(
      (menu) => menu.path === level1Path,
    )
    if (isMPRoute) {
      router.replace('/')
    }
  }

  emits('close')
}
</script>

<template>
  <h3 class="font-bold mt-6">音乐模块显隐</h3>
  <el-switch :model-value="showPlayerModule" @change="handleChangeSwitch" />
</template>
