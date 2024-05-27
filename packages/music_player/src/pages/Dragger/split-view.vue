<!--
 * @ Author: willy
 * @ CreateTime: 2024-05-09 17:15:06
 * @ Modifier: willy
 * @ ModifierTime: 2024-05-09 21:36:25
 * @ Description: 创建可调整大小的拆分视图
 -->

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { Message } from '@element-plus/icons-vue'

const leftPanel = ref<HTMLElement>()
const rightPanel = ref<HTMLElement>()
const resizer = ref<HTMLElement>()

const mousePosition = reactive({
  clientX: 0,
  clientY: 0,
})

const splitViewInfo = reactive({
  leftWidth: 0, // 左侧的宽度
})

const mouseMoveHandler = (event: MouseEvent) => {
  const removeX = event.clientX - mousePosition.clientX
  const rootWidth =
    (resizer.value!.parentNode as any).getBoundingClientRect().width ?? 1
  const newLeftWidth = ((splitViewInfo.leftWidth + removeX) * 100) / rootWidth
  leftPanel.value!.style.width = `${newLeftWidth}%`

  resizer.value!.style.cursor = 'col-resize'
  document.body.style.cursor = 'col-resize'
  leftPanel.value!.style.userSelect = 'none'
  leftPanel.value!.style.pointerEvents = 'none'
  rightPanel.value!.style.userSelect = 'none'
  rightPanel.value!.style.pointerEvents = 'none'
}

const mouseUpHandler = () => {
  resizer.value!.style.cursor = 'ew-resize'
  document.body.style.cursor = 'default'
  leftPanel.value!.style.removeProperty('user-select')
  leftPanel.value!.style.removeProperty('pointer-events')
  rightPanel.value!.style.removeProperty('user-select')
  rightPanel.value!.style.removeProperty('pointer-events')

  document.removeEventListener('mousemove', mouseMoveHandler)
  document.removeEventListener('mouseup', mouseUpHandler)
}

const mouseDownHandler = (event: MouseEvent) => {
  event.preventDefault()
  const { clientX, clientY } = event
  Object.assign(mousePosition, { clientX, clientY })

  splitViewInfo.leftWidth = leftPanel.value?.getBoundingClientRect().width ?? 0

  document.addEventListener('mouseover', mouseMoveHandler)
  document.addEventListener('mouseup', mouseUpHandler)
}
const initResizer = () => {
  if (!resizer.value) return setTimeout(initResizer, 10)
  resizer.value.addEventListener('mousedown', mouseDownHandler)
}
onMounted(initResizer)
</script>

<template>
  <div class="w-full flex items-center justify-end mb-2">
    <el-button :icon="Message" circle />
  </div>
  <div class="split-view">
    <div ref="leftPanel" class="panel left"></div>
    <div ref="resizer" class="splitter"></div>
    <div ref="rightPanel" class="panel right"></div>
  </div>
</template>

<style scoped lang="scss">
.split-view {
  display: flex;
  border: 1px solid rgb(187 247 208 / var(--tw-border-opacity, 1));
  border-radius: 0.25rem;
  width: 100%;
  min-height: 24rem;

  .panel {
    overflow: hidden auto;

    &.left {
      background-color: lightblue;
    }

    &.right {
      background-color: lightcoral;
    }
  }

  .splitter {
    background-color: #aaa;
    cursor: ew-resize;
    width: 5rem;
  }
}
</style>
