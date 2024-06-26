/**
 * @ Author: willysliang
 * @ Create Time: 2022-12-05 14:18:00
 * @ Modified by: willysliang
 * @ Modified time: 2022-12-05 14:53:46
 * @ Description: echarts hooks
 */

import { nextTick, onMounted, onUnmounted, Ref, unref } from 'vue'
import type { EChartsOption } from 'echarts'
import echarts from './lib'
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers'

/** 渲染类型 */
export enum RenderType {
  SVGRenderer,
  CanvasRenderer,
}
/** 主题类型 */
export enum ThemeType {
  Light = 'light',
  Dark = 'dark',
  Default = 'default',
}

export default function useChart(
  elRef: Ref<HTMLDivElement>,
  autoChartSize = false,
  animation = false,
  render: RenderType = RenderType.SVGRenderer,
  theme: ThemeType = ThemeType.Default,
) {
  // 渲染模式
  echarts.use(render === RenderType.SVGRenderer ? SVGRenderer : CanvasRenderer)
  // echart实例
  let chartInstance: echarts.ECharts | null = null

  // 初始化echart
  const initCharts = () => {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }
    chartInstance = echarts.init(el, theme)
  }

  // 显示加载状
  function hideLoading() {
    if (!chartInstance) {
      initCharts()
    }
    chartInstance?.hideLoading()
  }

  // 更新/设置配置
  const setOption = (option: EChartsOption) => {
    nextTick(() => {
      if (!chartInstance) {
        initCharts()
        if (!chartInstance) return
      }

      chartInstance.setOption(option)
      hideLoading()
    })
  }

  // 获取echart实例
  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts()
    }
    return chartInstance
  }

  // 更新大小
  function resize() {
    chartInstance?.resize()
  }

  // 监听元素大小
  function watchEl() {
    // 给元素添加过渡
    if (animation) {
      elRef.value.style.transition = 'width 1s, height 1s'
    }
    const resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(elRef.value as Element)
  }

  // 显示加载状
  function showLoading() {
    if (!chartInstance) {
      initCharts()
    }
    chartInstance?.showLoading()
  }

  onMounted(() => {
    window.addEventListener('resize', resize)
    if (autoChartSize) watchEl()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resize)
  })

  return {
    setOption,
    getInstance,
    showLoading,
    hideLoading,
  }
}
