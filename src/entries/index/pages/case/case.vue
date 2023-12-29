<!--
 * @ Author: willy
 * @ CreateTime: 2023-12-24 16:31:31
 * @ Modifier: willy
 * @ ModifierTime: 2023-12-27 17:39:56
 * @ Description: case 组件案例
 -->

<script setup lang="ts">
import WTooltip from '@comp/tooltip/tooltip.vue'
import WSelect from '@comp/select/select.vue'

import { ref } from 'vue'

const test = ref<any>({
  key: 111,
  bbb: 2,
  value: 222,
  label: 333,
})
</script>

<template>
  <div class="case">
    <h1>THIS IS CASE PAGES~</h1>

    <WTooltip :content="'212178'">
      <span>十端口接收端口</span>
      <template #content>
        <span>ashajkshk</span>
      </template>
    </WTooltip>

    <WSelect v-model="test" />
  </div>
</template>
