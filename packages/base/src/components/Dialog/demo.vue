<!--
 * @ Author: willy
 * @ CreateTime: 2024-06-03 18:08:37
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-03 21:53:23
 * @ Description: Dialog 组件的案例使用
 -->

<script setup lang="ts">
import WDialog from '@comp/Dialog/index.vue'
import { ref } from 'vue'

const isShow = ref<boolean>(false)

const handleClick = () => {
  isShow.value = true
}

const handleClose = (status) => {
  isShow.value = status
}
</script>

<template>
  <div @click="handleClick">弹窗显隐开关</div>

  <WDialog v-model="isShow" @close="handleClose">
    <div>ahjkhhhhhhhhh</div>
  </WDialog>
</template>
