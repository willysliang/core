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
import DialogDemo from '@comp/Dialog/demo.vue'
import { demoPages } from '../constant'
import './test'

// eslint-disable-next-line no-undef
defineOptions({
  name: demoPages.TEST.name,
  inheritAttrs: false,
})

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
  <button target-key="btn">添加target-key的按钮</button>

  <DialogDemo />

  <!--  <VirtualList :list-data="data">
    <template #default="{ listItem }">
      <div> <span class="text-red-600">{{ listItem.idx }}</span> {{ listItem.value }}</div>
    </template>
  </VirtualList> -->
</template>
