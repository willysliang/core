<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-31 17:15:11
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-10 19:09:26
 * @ Description: 音乐馆模块 musicHall
 -->

<script setup lang="ts">
import { ref, watch } from 'vue'
import { musicHallMenulist } from '@/router/constant'
import { useRoute, useRouter } from 'vue-router'

/***
 * 监听路由变化来改变当前菜单选项
 */
const route = useRoute()
const currentMenu = ref()
watch(
  () => route.name,
  (newMenu) => {
    currentMenu.value = newMenu
  },
  { immediate: true },
)

/** 菜单子路由切换 */
const router = useRouter()
const handleTab = ({ props }) => {
  router.push({ name: props.name })
}
</script>

<template>
  <div class="music-hall">
    <div class="text-3xl py-4 font-bold">音乐馆</div>

    <!-- 菜单栏 -->
    <el-affix target=".music-hall" :offset="56">
      <div class="bg-view">
        <el-tabs v-model="currentMenu" @tab-click="handleTab">
          <el-tab-pane
            v-for="menu in musicHallMenulist"
            :key="menu.name"
            :label="menu.title"
            :name="menu.name"
          />
        </el-tabs>
      </div>
    </el-affix>

    <!-- 子路由 -->
    <div class="mt-5">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
.music-hall {
	.el-tabs__nav-wrap::after {
		height: 0;
	}

	.el-tabs__header {
		@apply m-0;
	}
}
</style>
