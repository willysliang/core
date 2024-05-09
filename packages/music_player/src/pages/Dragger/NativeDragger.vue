<!--
 * @ Author: willy
 * @ CreateTime: 2024-05-08 20:20:58
 * @ Modifier: willy
 * @ ModifierTime: 2024-05-09 18:00:15
 * @ Description: 原生拖拽组件
 -->

<script setup lang="ts">
import { ref } from 'vue'
import { generateRandomChina } from '@willy/utils'

/**
 * 测试随机渲染的列表
 */
const btnType = ['primary', 'success', 'warning', 'danger', 'info']
const list = ref(
  Array.from({ length: Math.ceil(Math.random() * 10) + 15 }).map((_, i) => ({
    label: i + 1 + generateRandomChina(Math.floor(Math.random() * 4)),
    type: btnType[Math.floor(Math.random() * btnType.length)],
  })),
)

/**
 * WEB端拖拽: draggable
 */
// 用于保存被拖拽的项的索引
const draggingIndex = ref(-1)
const handleDragStart = (event: DragEvent, index: number) => {
  draggingIndex.value = index

  if (event?.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    // 为了IE兼容需要设置一些数据
    event.dataTransfer.setData('text/html', index.toString())
  }
}
const handleDragDrop = (index: number) => {
  if (draggingIndex.value < 0 || draggingIndex.value === index) return
  ;[list.value[draggingIndex.value], list.value[index]] = [
    list.value[index],
    list.value[draggingIndex.value],
  ]
  draggingIndex.value = -1 // 重置
}

/**
 * 移动端拖拽: touch
 */
/** 追踪最后的触摸位置 */
const lastTouchPosition = ref({ clientY: 0, clientX: 0 })

/** 更新触摸坐标 */
const updatePosition = (event: TouchEvent) => {
  if (!event.touches.length) return
  lastTouchPosition.value = {
    clientX: event.touches[0].clientX,
    clientY: event.touches[0].clientY,
  }
}
const handleTouchStart = (event: TouchEvent, index: number) => {
  draggingIndex.value = index
  updatePosition(event)
}

const handleTouchMove = (event: TouchEvent) => updatePosition(event)

/** 找出顶层的 element 的索引 */
const getElementIndex = (rootEl, element): number => {
  const children = Array.from(rootEl.children)

  // 尝试在当前层级的子元素中找到目标元素的索引
  const findIndex = children.indexOf(element)
  if (findIndex !== -1) return findIndex

  // 如果没有在当前层级找到元素，递归搜索每个子元素
  for (let i = 0; i < children.length; i++) {
    const indexInChildren = getElementIndex(children[i], element)
    // 如果在子元素中找到了目标元素，返回索引
    if (indexInChildren !== -1) return i
  }

  // 兜底：查询所有子节点都没找到(正常情况不会出现)
  return -1
}

const handleTouchEnd = () => {
  const main = document.querySelector(`.draggable-main`) as any
  const curItem = document.elementFromPoint(
    lastTouchPosition.value.clientX,
    lastTouchPosition.value.clientY,
  )
  const newIndex = getElementIndex(main, curItem)

  if (draggingIndex.value !== null && newIndex >= 0) {
    ;[list.value[draggingIndex.value], list.value[newIndex]] = [
      list.value[newIndex],
      list.value[draggingIndex.value],
    ]
  }
  draggingIndex.value = -1 // 重置
}
</script>

<template>
  <div class="draggable-main flex flex-wrap items-center">
    <div
      v-for="(item, index) in list"
      :key="`${index}-${item.label}`"
      class="draggable-item inline-block m-2"
      :draggable="true"
      @dragstart="handleDragStart($event, index)"
      @dragover.prevent
      @drop="handleDragDrop(index)"
      @touchstart="handleTouchStart($event, index)"
      @touchmove="handleTouchMove($event)"
      @touchend="handleTouchEnd"
    >
      <el-button :type="item.type" tag="div" text bg>
        {{ item.label }}
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.draggable-item {
  cursor: move;
  user-select: none;
}
</style>
