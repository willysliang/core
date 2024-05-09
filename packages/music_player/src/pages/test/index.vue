<!-- eslint-disable prefer-const -->
<!-- eslint-disable n/no-callback-literal -->
<!-- eslint-disable no-unmodified-loop-condition -->
<!-- eslint-disable @typescript-eslint/no-non-null-assertion -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!--
 * @ Author: willysliang
 * @ CreateTime: 2023-02-15 17:30:11
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-05-09 14:23:36
 * @ Description:测试组件
 -->

<script setup lang="ts">
import { demoPages } from '../constant'
import Test from './test.vue'
import { ref } from 'vue'

// eslint-disable-next-line no-undef
defineOptions({
  name: demoPages.TEST.name,
  inheritAttrs: false,
})

const isShow = ref<boolean>(false)

const handleClick = () => {
  isShow.value = true
}

const handleClose = () => {
  isShow.value = false
}
// import VirtualList from './VirtualList.vue'

// const add = () => {
//   console.log('add')
// }

/* const data = ref<Array<any>>([])
for (let i = 1; i <= 1000000; i++) {
  data.value.push({
    id: i,
    value: '字符内容'.repeat(Math.random() * 100),
  })
} */
</script>

<template>
  <div @click="handleClick">按钮</div>
  <button target-key="btn">添加target-key的按钮</button>

  <Test v-model="isShow" @close="handleClose" />

  <!--  <VirtualList :list-data="data">
    <template #default="{ listItem }">
      <div> <span class="text-red-600">{{ listItem.idx }}</span> {{ listItem.value }}</div>
    </template>
  </VirtualList> -->
</template>
