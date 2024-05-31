<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 09:05:41
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-23 09:45:39
 * @ Description: 页面布局头部
 -->

<script setup lang="ts">
import HeaderSearch from '@comp/layout/header/headerSearch/index.vue'
import UserInfo from '@comp/layout/header/userInfo/index.vue'
import { Left, Right } from '@icon-park/vue-next'
import { HeaderFullScreen } from './HeaderFullScreen'
import LockScreen from './lockscreen/index.vue'
import { HeaderLocale } from './headerLocale'
import { HeaderThemeSetting } from './headerThemeSetting'
import { useRouter } from 'vue-router'
import { HeaderGuide } from './Guide'

const router = useRouter()
</script>

<template>
  <div class="flex items-center">
    <el-tooltip :content="$t('layout.header.tooltipBack')" placement="bottom">
      <IconPark
        :icon="Left"
        size="22"
        :stroke-width="4"
        class="hover-text mx-2"
        @click="router.back()"
      />
    </el-tooltip>
    <el-tooltip
      :content="$t('layout.header.tooltipForward')"
      placement="bottom"
    >
      <IconPark
        :icon="Right"
        size="22"
        :stroke-width="4"
        class="hover-text mx-2"
        @click="router.go(1)"
      />
    </el-tooltip>
  </div>

  <!-- 搜索栏 -->
  <HeaderSearch />

  <!-- 设置类 -->
  <div class="flex items-center justify-end">
    <!-- 用户登录 -->
    <UserInfo />

    <!-- 页面指导 -->
    <HeaderGuide />

    <!-- 锁屏 -->
    <LockScreen />

    <!-- 语言设置 -->
    <HeaderLocale />

    <!-- 屏幕缩放 -->
    <HeaderFullScreen />

    <!-- 主题设置 -->
    <HeaderThemeSetting />
  </div>
</template>
