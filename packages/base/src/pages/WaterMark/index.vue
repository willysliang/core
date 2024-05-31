<!--
 * @ Author: willysliang
 * @ Create Time: 2023-01-12 13:58:13
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-12 14:14:40
 * @ Description: WaterMark 页面水印（防删除）
 -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { WaterMark } from './useWaterMark'
import { useMutationObserver } from './useMutationObserver'
// import { avactor } from '@/assets/images'

const div1Ref = ref()
const div2Ref = ref()
onMounted(() => {
  const waterMark1 = new WaterMark()
  waterMark1.startWaterMark()
  const waterMark2 = new WaterMark(
    ['willysliang', '1998-09-22'],
    [div1Ref.value, div2Ref.value],
  )
  waterMark2.startWaterMark()
})
/**
 * 恢复被删除的节点
 * 注意：需要在生成水印之后使用
 */
useMutationObserver()
</script>

<template>
  <div style="width: 100%; height: 20rem; position: relative">
    <img
      style="width: 20rem; height: 20rem; position: absolute"
      src="@/assets/images/avactor.jpg"
    />
  </div>
  <div style="width: 100%; height: 20rem; position: relative">
    <div
      ref="div1Ref"
      style="
				width: 100%;
				height: 100%;
				position: absolute;
				background-color: rgb(134 239 172);
      "
    >
      这是第一段文字<br />这是第二段文字
    </div>
  </div>
  <div style="width: 100%; height: 20rem; position: relative">
    <div
      ref="div2Ref"
      style="
				width: 100%;
				height: 100%;
				position: absolute;
				background-color: rgb(0 239 172);
      "
    >
      这是第三段文字<br />这是第四段文字
    </div>
  </div>
</template>
