<!--
 * @ Author: willysliang
 * @ CreateTime: 2022-10-10 09:05:41
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-26 16:08:25
 * @ Description: 页面布局头部
 -->

<script setup lang="ts">
import HeaderSearch from '@comp/layout/header/headerSearch/index.vue'
import UserInfo from '@comp/layout/header/userInfo/index.vue'
import HeaderFullScreen from './HeaderFullScreen/index.vue'
import LockScreen from './lockscreen/index.vue'
import HeaderThemeSetting from './headerThemeSetting/index.vue'
import HeaderGuide from './Guide/index.vue'
import HeaderLocale from './headerLocale/index.vue'
import { Left, Right, AlignTextLeft, AlignTextRight } from '@icon-park/vue-next'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@store/app'
import { useSettingStore } from '@store/app/setting'
import { useThemeStore } from '@store/app/theme'

const router = useRouter()

const { appConfig } = storeToRefs(useAppStore())
const { showMenu, showPlayerModule } = storeToRefs(useSettingStore())
const { themeLayoutIsVertical } = storeToRefs(useThemeStore())
const toggleMenuStatus = () => {
  showMenu.value = !showMenu.value
}
const menuConfig = computed(() => {
  const className = themeLayoutIsVertical.value ? 'rotate-90' : 'rotate-0'
  return showMenu.value
    ? {
        tooltipName: 'layout.header.tooltipHideMenu',
        icon: AlignTextLeft,
        class: className,
      }
    : {
        tooltipName: 'layout.header.tooltipShowMenu',
        icon: AlignTextRight,
        class: className,
      }
})
</script>

<template>
  <div class="flex items-center">
    <el-tooltip :content="$t(menuConfig.tooltipName)" placement="bottom">
      <IconPark
        :icon="menuConfig.icon"
        size="22"
        :stroke-width="4"
        :class="`hover-text mr-2 ${menuConfig.class}`"
        @click="toggleMenuStatus"
      />
    </el-tooltip>

    <el-tooltip :content="$t('layout.header.tooltipBack')" placement="bottom">
      <IconPark
        :icon="Left"
        size="22"
        :stroke-width="4"
        class="hover-text mx-2"
        @click="router.back()"
      />
    </el-tooltip>

    <!-- 当前路由的标题 -->
    <div
      v-if="appConfig?.routeInfo"
      class="flex items-center text-gray-400 text-base underline underline-offset-[5px] select-none"
    >
      {{ appConfig.routeInfo.title }}
    </div>

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
  <HeaderSearch v-if="showPlayerModule" />

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
