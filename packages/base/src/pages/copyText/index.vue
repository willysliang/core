<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-21 15:38:28
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-22 10:00:33
 * @ Description: 复制文本
 -->

<script setup lang="ts">
import InputCopy from './InputCopy.vue'
import TableCopy from './TableCopy.vue'
</script>

<template>
  <div class="w-full h-full">
    <el-divider content-position="left">文本复制</el-divider>
    <div class="mb-4">
      <span>{{ $t('demo.copyText.copyTextContent') }}</span>
      <el-link type="success" href="https://clipboardjs.com/">
        clipboardjs
        <el-tooltip
          effect="dark"
          :content="$t('demo.copyText.clipboardJsTip')"
          placement="top-start"
        >
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
      </el-link>
    </div>

    <!-- 长文本内容复制场景 -->
    <InputCopy />

    <!-- 多数据拼接复制场景 -->
    <TableCopy class="mt-4" />
  </div>
</template>
