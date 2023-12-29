<!--
 * @ Author: willysliang
 * @ Create Time: 2023-03-08 14:44:35
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-22 11:00:27
 * @ Description: IconPark 图标
 -->

<script setup lang="ts">
import { type Icon } from '@icon-park/vue-next/lib/runtime'

export interface WIconParkProps {
  /**
   * @description icon-park 图标
   */
  icon: Icon
  /**
   * @description 图标风格：线性、填充、双色、多色
   */
  theme?: 'outline' | 'filled' | 'two-tone' | 'multi-color'
  /**
   * @description 图标大小
   */
  size?: number | string
  /**
   * @description 是否填充
   */
  spin?: boolean
  /**
   * @description 图标填充的颜色
   */
  fill?: string | string[]
  /**
   * @description 端点类型
   */
  strokeLinecap?: 'butt' | 'round' | 'square'
  /**
   * @description 拐点类型
   */
  strokeLinejoin?: 'miter' | 'round' | 'bevel'
  /**
   * @description 线段粗细
   */
  strokeWidth?: number
}

defineOptions({
  name: 'WIconPark',
})

defineProps<WIconParkProps>()
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
