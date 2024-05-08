<!--
 * @ Author: willy
 * @ CreateTime: 2024-05-08 20:28:05
 * @ Modifier: willy
 * @ ModifierTime: 2024-05-08 20:37:34
 * @ Description: 拖拽相关的导航
 -->

<script setup lang="ts">
import { ref } from 'vue'
import vueDragger from './index.vue'
import NativeDragger from './NativeDragger.vue'

const navList = [
  {
    name: '原生拖拽',
    value: 'NativeDragger',
    type: 'success',
    component: NativeDragger,
  },
  {
    name: 'vue-dragger',
    value: 'VueDragger',
    type: 'danger',
    component: vueDragger,
  },
]
const actNav = ref(navList[0])
const handleClickNav = (nav) => {
  if (actNav.value.value === nav.value) return
  actNav.value = nav
}
</script>

<template>
  <div class="mb-4">
    <el-button
      v-for="nav in navList"
      :key="nav.value"
      :type="nav.type"
      @click="handleClickNav(nav)"
    >
      {{ nav.name }}
    </el-button>
  </div>
  <component :is="actNav.component"></component>
</template>

<style lang="scss" scoped></style>
