<!--
 * @ Author: willysliang
 * @ Create Time: 2023-01-06 10:27:04
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-09 14:57:17
 * @ Description: 粒子动画
 -->
<script setup lang="ts">
import { ParticlePicture, ParticleCountdown } from './'
</script>

<template>
  <!-- 图片粒子化 -->
  <el-row class="mb-4">
    <el-col :offset="1" :span="22">
      <el-card>
        <template #header>
          <span class="text-base">ParticlePicture 图片粒子化</span>
        </template>
        <ParticlePicture />
      </el-card>
    </el-col>
  </el-row>

  <!-- 粒子倒计时 -->
  <el-row class="mb-4">
    <el-col :offset="1" :span="22">
      <el-card>
        <template #header>
          <span class="text-base">ParticleCountdown 粒子动画倒计时</span>
        </template>
        <ParticleCountdown />
      </el-card>
    </el-col>
  </el-row>
</template>
