<!--
 * @ Author: willysliang
 * @ Create Time: 2023-02-13 15:41:22
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-13 15:49:26
 * @ Description: FileUpload 文件上传
 -->

<script setup lang="ts">
import { list } from './'
</script>

<template>
  <el-row v-for="item in list" :key="item.title" class="mb-4">
    <el-col :offset="1" :span="22">
      <el-card>
        <template #header>
          <span class="text-base">{{ item.title }}</span>
        </template>
        <div class="w-full flex flex-col items-center justify-center">
          <component :is="item.components"></component>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
