<!--
 * @ Author: willy
 * @ CreateTime: 2023-12-24 16:31:31
 * @ Modifier: willy
 * @ ModifierTime: 2024-05-31 11:59:30
 * @ Description: case 组件案例
 -->

<script setup lang="ts">
import WTooltip from '@comp/Tooltip/Tooltip.vue'
import WSelect, { ISelectProps } from '@comp/Select/Select.vue'
import Popover from '@comp/Popover/Popover.vue'
import { ref } from 'vue'
import { generateRandomChina } from '@willy/utils'

const test = ref<ISelectProps>({
  modelValue: ['2-2-2', 4, null],
  // modelValue: '2-2-2',
  // modelValue: [null],
  options: Array.from({ length: 53 }).map((_, i) => ({
    value: i,
    label: i + generateRandomChina(Math.floor(Math.random() * 24)),
    children: Array.from({ length: 10 }).map((_, j) => ({
      value: `${i}-${j}`,
      label: i + generateRandomChina(Math.floor(Math.random() * 4)),
      children: Array.from({ length: 10 }).map((_, k) => ({
        value: `${i}-${j}-${k}`,
        label: i + generateRandomChina(Math.floor(Math.random() * 4)),
      })),
    })),
  })),
  labelKey: 'label',
})

const showPopver = ref(false)
</script>

<template>
  <div class="case">
    <WTooltip :content="'212178'">
      <span>十端口接收端口</span>
      <template #content>
        <span>ashajkshk</span>
      </template>
    </WTooltip>

    <WSelect v-bind="test" v-model="test.modelValue" />
    <Popover
      v-model:visible="showPopver"
      :content="`<span style='color:red'>23728379273927398</span>`"
      >assahjskahksj</Popover
    >
    <div id="root"></div>
  </div>
</template>
