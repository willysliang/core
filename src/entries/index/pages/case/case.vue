<!--
 * @ Author: willy
 * @ CreateTime: 2023-12-24 16:31:31
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-19 18:39:26
 * @ Description: case 组件案例
 -->

<script setup lang="ts">
import WTooltip from '@comp/Tooltip/Tooltip.vue'
import WSelect, { ISelectProps } from '@comp/Select/Select.vue'
import Popover from '@comp/Popover/Popover.vue'
import { ref } from 'vue'
import { generateRandomChina } from '@/utils'

const test = ref<ISelectProps>({
  modelValue: [222],
  options: Array.from({ length: 100 }).map((_, i) => ({
    value: i,
    test: i + generateRandomChina(Math.floor(Math.random() * 50 + 2)),
  })),
  labelKey: 'test',
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
  </div>
</template>
