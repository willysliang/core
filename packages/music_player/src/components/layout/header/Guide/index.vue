<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-23 09:42:01
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-23 10:58:18
 * @ Description: 页面分页指导
 -->

<script setup lang="ts">
import { ref } from 'vue'
import IconPark from '@comp/common/IconPark.vue'
import { Oceanengine } from '@icon-park/vue-next'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'

const steps: Array<Driver.Step> = [
  {
    element: '.header',
    popover: {
      title: 'Header',
      description: '头部控制栏',
      position: 'bottom',
    },
  },
  {
    element: '.menus',
    popover: {
      title: 'Menu',
      description: '菜单选择',
      position: 'right',
    },
  },
  {
    element: '.mains',
    popover: {
      title: 'Main',
      description: '主内容区域',
      position: 'left',
    },
  },
  {
    element: '.footer',
    popover: {
      title: 'Footer',
      description: '底部音乐播放控制器',
      position: 'top',
    },
  },
]

const driver = ref(
  new Driver({
    // className: 'scoped-class', // className to wrap driver.js popover
    animate: true, // Animate while changing highlighted element
    doneBtnText: '完成', // Text on the final button
    closeBtnText: '关闭', // Text on the close button for this step
    nextBtnText: '下一步', // Next button text for this step
    prevBtnText: '上一步', // Previous button text for this step
    keyboardControl: true, // Allow controlling through keyboard (escape to close, arrow keys to move)
  }),
)
/** 展开指导场景 */
const handleShowGuide = () => {
  driver.value.defineSteps(steps)
  driver.value.start()
}
</script>

<template>
  <el-tooltip placement="bottom">
    <template #content>
      {{ $t('layout.header.tooltipGuide') }}
      <el-link
        href="https://kamranahmed.info/driver.js/#single-element-no-popover"
        type="success"
        target="_blank"
      >
        driver.js
      </el-link>
    </template>
    <IconPark
      :icon="Oceanengine"
      size="22"
      :stroke-width="3"
      class="hover-text mx-2 cursor-pointer"
      @click="handleShowGuide"
    />
  </el-tooltip>
</template>
