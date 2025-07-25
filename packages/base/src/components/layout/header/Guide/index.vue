<!--
 * @ Author: willysliang
 * @ CreateTime: 2022-11-23 09:42:01
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-07-25 16:25:28
 * @ Description: 页面分页指导
 -->

<script setup lang="ts">
import IconPark from '@comp/common/IconPark.vue'
import { Oceanengine } from '@icon-park/vue-next'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@store/app/theme'
import { demoPages } from '@/pages/constant'

const route = useRoute()
const { themeLayoutIsVertical } = storeToRefs(useThemeStore())

/**
 * 页面指导配置项（根据页面样式动态调整样式/方向）
 */
const driverSteps = computed<Array<Driver.Step>>(() => {
  const result = [
    {
      element: '.layout__header',
      popover: {
        title: 'Header',
        description: '头部控制栏',
        position: 'bottom',
      },
    },
    {
      element: '.layout__content',
      popover: {
        title: 'Main',
        description: '主内容区域',
        className: 'driverjs__theme--layout-content',
        position: 'right',
      },
    },
  ]

  // 判断menu是在左侧，还是在顶部，以此来不同样式显示指引
  const menuDriver = {
    element: '.layout__menu',
    popover: {
      title: 'Menu',
      description: '菜单选择',
      className: 'driverjs__theme--layout-menu-left',
      position: 'right',
    },
  }
  if (themeLayoutIsVertical.value) {
    menuDriver.popover.className = 'driverjs__theme--layout-menu-top'
    menuDriver.popover.position = 'bottom'
  }
  result.push(menuDriver)

  /* 只在音乐模块(非demo模块)才有 footer 模块显示在dom */
  const isDemoRoute = Object.values(demoPages).some((page) =>
    route.path.includes(`/${page.path}`),
  )
  if (!isDemoRoute) {
    result.push({
      element: '.layout__footer',
      popover: {
        title: 'Footer',
        description: '底部音乐播放控制器',
        className: 'driverjs__theme--layout-footer',
        position: 'top',
      },
    })
  }

  return result
})

const driver = new Driver({
  // className: 'scoped-class', // className to wrap driver.js popover
  animate: true, // Animate while changing highlighted element
  doneBtnText: '完成', // Text on the final button
  closeBtnText: '关闭', // Text on the close button for this step
  nextBtnText: '下一步', // Next button text for this step
  prevBtnText: '上一步', // Previous button text for this step
  keyboardControl: true, // Allow controlling through keyboard (escape to close, arrow keys to move)
})

/** 展开指导场景 */
const handleShowGuide = () => {
  driver.defineSteps(driverSteps.value)
  driver.start()
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

<style lang="scss">
.driverjs__theme--layout-menu-left {
  top: 20px !important;
}

.driverjs__theme--layout-menu-top {
  left: 20px !important;
}

.driverjs__theme--layout-content {
  top: 80px !important;
  left: 80px !important;
}

.driverjs__theme--layout-footer {
  left: 20px !important;
}
</style>
