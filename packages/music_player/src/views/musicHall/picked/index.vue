<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-10 19:02:04
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-11 19:19:12
 * @ Description: 精选
 -->

<script setup lang="ts">
import { Banner, PersonalizedMv } from '@/views/discover/index'
import { ExclusiveVideo, PersonalizedDjProgram } from './index'
</script>

<template>
  <Banner />

  <!-- 独家放送 -->
  <ExclusiveVideo />

  <!-- 推荐电台 -->
  <PersonalizedDjProgram />

  <!-- 推荐MV -->
  <PersonalizedMv />
</template>
