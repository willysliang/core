<!--
 * @ Author: willysliang
 * @ CreateTime: 2022-09-15 09:16:46
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-07-11 10:05:14
 * @ Description: 菜单栏
 -->

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import IconPark from '@comp/common/IconPark.vue'
import { Music } from '@icon-park/vue-next'
import { useMenuConfig } from './useMenuConfig'
import { useThemeStore } from '@store/app/theme'

const {
  themeLayoutIsVertical,
  menuActiveTextColor,
  menuBgColor,
  menuTextColor,
} = storeToRefs(useThemeStore())
const { handleMenuSelect, currentMenuKey, menuList, menuTitle } =
  useMenuConfig()
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
      'menu',
      `menu--${themeLayoutIsVertical ? 'horizontal' : 'vertical'}`,
    ]"
    @select="handleMenuSelect"
  >
    <el-menu-item index="logo">
      <div class="menu__logo">
        <IconPark
          :icon="Music"
          size="28"
          theme="multi-color"
          :fill="['#d42121', '#e07813', '#da1616', '#d8ba24']"
          :stroke-width="3"
          class="shrink-0"
        />
        <span class="menu__logo--title">{{ menuTitle }}</span>
      </div>
    </el-menu-item>

    <!-- 列表只有一个大项时，把该大项中的所有子项展开 -->
    <template v-if="menuList.length === 1">
      <el-menu-item
        v-for="menu in menuList[0].children"
        :key="menu.key"
        :index="menu.name"
      >
        <IconPark :icon="menu.icon" size="18" theme="outline" />
        <span class="pl-2">{{ menu.title }}</span>
      </el-menu-item>
    </template>

    <template v-else>
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
    </template>
  </el-menu>
</template>

<style scoped lang="scss">
.active {
  @apply bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-50 cursor-default;
}

.menu {
  height: 100%;
  width: 100%;

  .menu__logo {
    width: 100%;
    display: flex;
    align-items: center;

    &--title {
      flex: 1;
      height: 100%;
      margin-left: 0.5rem;
      overflow: hidden;
    }
  }
}

/** 菜单垂直排列(在左侧) */
.menu--vertical {
  @apply overflow-x-hidden;

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

/** 菜单横向排列(在顶部) */
.menu--horizontal {
  @apply overflow-y-hidden;

  /* 隐藏滚动条 */
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
