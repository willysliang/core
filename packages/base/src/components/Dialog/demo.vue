<!--
 * @ Author: willy
 * @ CreateTime: 2024-06-03 18:08:37
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-06 18:29:52
 * @ Description: Dialog 组件的案例使用
 -->

<script setup lang="ts">
import WDialog from '@comp/Dialog/index.vue'
import { ref } from 'vue'
import { showConfirmDialog } from './showDialog'

const isShow = ref<boolean>(false)
const handleDialogStatus = (status: boolean) => {
  isShow.value = status
}

const contentEl = '<span style="color:red;">ssss</span>'
const handleShowDialog = () => {
  showConfirmDialog({
    title: '弹窗标题',
    content: contentEl,
  })
}
</script>

<template>
  <el-card>
    <template #header>
      <span>Dialog</span>
    </template>
    <div
      class="inline-block border-b-2 border-dotted border-b-indigo-500 cursor-pointer"
      @click="handleDialogStatus(true)"
    >
      弹窗显隐开关{{ '<组件版>' }}
    </div>
    <br />
    <div
      class="inline-block mt-4 border-b-2 border-dotted border-b-indigo-500 cursor-pointer"
      @click="handleShowDialog"
    >
      弹窗显隐开关{{ '<命令版>' }}
    </div>
  </el-card>

  <WDialog v-model="isShow" :content="contentEl" @close="handleDialogStatus">
    <div>ahjkhhhhhhhhh</div>
  </WDialog>
</template>
