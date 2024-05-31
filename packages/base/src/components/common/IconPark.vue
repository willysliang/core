<!--
 * @ Author: willysliang
 * @ Create Time: 2023-03-08 14:44:35
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-22 11:00:27
 * @ Description: IconPark 图标
 -->

<script setup lang="ts">
import { Icon } from '@icon-park/vue-next/lib/runtime'

interface IIconPark {
  icon: Icon // icon-park 图标
  theme?: 'outline' | 'filled' | 'two-tone' | 'multi-color' // 图标风格：线性、填充、双色、多色
  size?: number | string // 图标大小
  spin?: boolean
  fill?: string | string[] // 图标填充的颜色
  strokeLinecap?: 'butt' | 'round' | 'square' // 端点类型
  strokeLinejoin?: 'miter' | 'round' | 'bevel' // 拐点类型
  strokeWidth?: number // 线段粗细
}

// defineOptions({
//   name: 'IconPark',
// })

defineProps<IIconPark>()
</script>

<template>
  <component
    :is="icon"
    :theme="theme"
    :size="size"
    :spin="spin"
    :fill="fill"
    :stroke-linecap="strokeLinecap"
    :stroke-linejoin="strokeLinejoin"
    :stroke-width="strokeWidth"
  />
</template>
