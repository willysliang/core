<!--
 * @ Author: willysliang
 * @ CreateTime: 2025-07-11 14:05:32
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-07-11 17:11:10
 * @ Description: 当前路由详情
 -->

<script setup lang="ts">
import TodoList from '@/components/TodoList/index.vue'

import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Left, Right, AlignTextLeft, AlignTextRight } from '@icon-park/vue-next'
import { useAppStore } from '@store/app'
import { useThemeStore } from '@store/app/theme'
import { useSettingStore } from '@store/app/setting'
import { useTodoList } from './useTodoList'

const router = useRouter()
const { appConfig } = storeToRefs(useAppStore())

/**
 * 菜单栏显隐控制
 */
const { showMenu } = storeToRefs(useSettingStore())
const toggleMenuStatus = () => {
  showMenu.value = !showMenu.value
}

/**
 * 菜单栏显隐图标相关
 */
const { themeLayoutIsVertical } = storeToRefs(useThemeStore())
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

/**
 * 当前路由可能要展示的 todolist
 */
const { todolistConfig, showTodoDialog, handleShowTodoDrawer } = useTodoList()
</script>

<template>
  <div class="flex items-center">
    <!-- 菜单栏显隐 -->
    <el-tooltip :content="$t(menuConfig.tooltipName)" placement="bottom">
      <IconPark
        :icon="menuConfig.icon"
        size="22"
        :stroke-width="4"
        :class="`hover-text mr-2 ${menuConfig.class}`"
        @click="toggleMenuStatus"
      />
    </el-tooltip>

    <!-- 路由回退 -->
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
      class="flex items-center text-base opacity-50 underline underline-offset-[5px] select-none"
      :class="`${todolistConfig ? 'cursor-pointer hover-text' : 'cursor-default'}`"
      @click="handleShowTodoDrawer"
    >
      {{ appConfig.routeInfo.title }}
    </div>

    <!-- 路由前进 -->
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

  <!-- 当前路由页面的todolist弹窗 -->
  <el-dialog
    v-model="showTodoDialog"
    :show-close="false"
    width="90%"
    style="background-color: transparent"
    align-center
  >
    <TodoList v-bind="todolistConfig" />
  </el-dialog>
</template>
