<script setup lang="ts">
import IconPark from '@comp/common/IconPark.vue'
import { Music } from '@icon-park/vue-next'
import { useMenuHooks } from './MenuHooks'
import { menuList } from '@/router/constant'
import { useThemeStore } from '@store/app/theme'
import { storeToRefs } from 'pinia'

const {
  themeLayoutIsVertical,
  menuActiveTextColor,
  menuBgColor,
  menuTextColor,
} = storeToRefs(useThemeStore())
const { handleMenuSelect, currentMenuKey } = useMenuHooks()
</script>

<template>
  <el-menu
    :active-text-color="menuActiveTextColor"
    :background-color="menuBgColor"
    :text-color="menuTextColor"
    :default-active="currentMenuKey"
    :unique-opened="themeLayoutIsVertical"
    :mode="themeLayoutIsVertical ? 'horizontal' : 'vertical'"
    :collapse-transition="false"
    :class="[
      'menus',
      themeLayoutIsVertical ? 'overflow-y-hidden' : 'overflow-x-hidden',
    ]"
    @select="handleMenuSelect"
  >
    <el-menu-item index="logo">
      <IconPark
        :icon="Music"
        size="28"
        theme="multi-color"
        :fill="['#d42121', '#e07813', '#da1616', '#d8ba24']"
        :stroke-width="3"
      />
      <span class="ml-2">WILLY云音乐</span>
    </el-menu-item>
    <el-sub-menu
      v-for="menuItem in menuList"
      :key="menuItem.key"
      :index="menuItem.name"
    >
      <template #title>{{ menuItem.title }}</template>
      <el-menu-item
        v-for="menu in menuItem.children"
        :key="menu.key"
        :index="menu.name"
      >
        <IconPark :icon="menu.icon" size="18" theme="outline" />
        <span class="pl-2">{{ menu.title }}</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped lang="scss">
.active {
	@apply bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-50 cursor-default;
}

.menus {
	height: 100%;
	width: 100%;

	&::-webkit-scrollbar {
		width: 4px;
	}

	/* 滚动条 */
	&::-webkit-scrollbar-thumb {
		box-sizing: border-box;
		border-radius: 10px;
		box-shadow: inset 0 0 5px rgb(0 0 0 / 20%);
		background: #ccc;
	}

	/* 滚动条框 */
	&::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px rgb(0 0 0 / 20%);
		border-radius: 0;
		background: rgb(63 52 52);
		box-sizing: border-box;
	}
}
</style>
