<!--
 * @ Author: willysliang
 * @ Create Time: 2022-12-07 13:21:30
 * @ Modified by: willysliang
 * @ Modified time: 2022-12-14 10:01:25
 * @ Description: 抽奖组件
 -->

<script setup lang="ts">
import { CellLottery, RoundLottery } from './'
</script>

<template>
  <!-- 九宫格抽奖 -->
  <CellLottery />

  <div class="my-8"></div>

  <!-- 转盘抽奖 -->
  <RoundLottery />
</template>
