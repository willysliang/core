<!--
 * @ Author: willysliang
 * @ Create Time: 2023-01-05 19:41:19
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-17 11:48:15
 * @ Description: PictureEffects 图片特效
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
        <div class="flex flex-col items-center justify-center">
          <component :is="item.components"></component>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
