<!--
 * @ Author: willysliang
 * @ Create Time: 2022-12-05 11:56:49
 * @ Modified by: willysliang
 * @ Modified time: 2022-12-05 15:20:28
 * @ Description: 仪表盘 Dashboard
 -->

<template>
  <div ref="chartEl" class="w-96 h-80"></div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref, computed, nextTick } from 'vue'
import type { EChartsOption } from 'echarts'
import useChart, { RenderType, ThemeType } from './useEcharts/useEcharts'

const option = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: '2%',
    left: 'center',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '20',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
      ],
    },
  ],
}))

const chartEl = ref<HTMLDivElement | null>(null)

const { setOption, showLoading } = useChart(
  chartEl as Ref<HTMLDivElement>,
  true,
  true,
  RenderType.CanvasRenderer,
  ThemeType.Light,
)

onMounted(() => {
  nextTick(() => {
    // 显示loading
    showLoading()
    // 渲染图表
    setOption(option.value)
  })
})
</script>
