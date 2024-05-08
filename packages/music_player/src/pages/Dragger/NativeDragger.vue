<!--
 * @ Author: willy
 * @ CreateTime: 2024-05-08 20:20:58
 * @ Modifier: willy
 * @ ModifierTime: 2024-05-08 21:34:00
 * @ Description: 原生拖拽组件
 -->

<script setup lang="ts">
import { ref } from 'vue'
import { generateRandomChina } from '@willy/utils'

const btnType = ['primary', 'success', 'warning', 'danger', 'info']
const list = ref(
  Array.from({ length: Math.ceil(Math.random() * 10) + 15 }).map((_, i) => ({
    label: i + 1 + generateRandomChina(Math.floor(Math.random() * 4)),
    type: btnType[Math.floor(Math.random() * btnType.length)],
  })),
)

/**
 * 拖拽处理
 */
// 用于保存被拖拽的项的索引
const draggingIndex = ref(-1)
let dragPreview

function updatePreviewPosition(touch) {
  const { clientX, clientY } = touch
  dragPreview.style.left = `${clientX}px`
  dragPreview.style.top = `${clientY}px`
}

const dragStart = async (event, index) => {
  draggingIndex.value = index
  const originItem = event.target.textContent

  // 创建一个新元素用作拖拽预览
  dragPreview = document.createElement('div')
  dragPreview.style.width = '100px'
  dragPreview.style.height = '100px'
  dragPreview.style.border = '1px solid red'
  dragPreview.textContent = originItem

  // 必须将新元素暂时添加到文档中，以便可以用作拖拽预览
  document.body.appendChild(dragPreview)

  if (event?.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    // 为了IE兼容，我们需要设置一些数据
    event.dataTransfer.setData('text/html', index.toString())

    // 设置自定义的拖拽图像
    // 注意: 在Firefox中，这一行代码需要在appendChild之后
    event.dataTransfer.setDragImage(dragPreview, 50, 50)

    // 由于这个元素仅用于拖拽预览，因此立即将其从文档中移除
    // 使用setTimeout是为了确保浏览器已经捕获到了用于拖拽预览的状态
    setTimeout(() => document.body.removeChild(dragPreview), 0)
  } else {
    dragPreview.style.position = 'fixed'
    dragPreview.style.pointerEvents = 'none'
    dragPreview.style.zIndex = 1000
    dragPreview.style.transform = 'translate(-50%, -50%)'
    updatePreviewPosition(event.touches[0])
  }
}
const dragDrop = (index) => {
  if (draggingIndex.value < 0 || draggingIndex.value === index) return
  ;[list.value[draggingIndex.value], list.value[index]] = [
    list.value[index],
    list.value[draggingIndex.value],
  ]
  draggingIndex.value = -1 // 重置
}

const lastTouchY = ref(0) // 用于追踪最后的触摸位置
const touchMove = (event) => {
  updatePreviewPosition(event.touches[0])
  // 更新最后一次触摸的Y坐标
  if (event.touches.length > 0) {
    lastTouchY.value = event.touches[0].clientY
  }
}

const touchEnd = () => {
  if (dragPreview) {
    document.body.removeChild(dragPreview)
    dragPreview = null
  }

  // 使用最后一次触摸的Y坐标来估算放置的索引
  const item = document.querySelector(`.draggable-item`) as any
  const itemHeight = item.offsetHeight
  let newIndex = Math.floor(lastTouchY.value / itemHeight) - 1
  if (newIndex === list.value.length) newIndex = list.value.length - 1
  console.log(newIndex)
  if (
    draggingIndex.value !== null &&
    newIndex >= 0 &&
    newIndex <= list.value.length
  ) {
    ;[list.value[draggingIndex.value], list.value[newIndex]] = [
      list.value[newIndex],
      list.value[draggingIndex.value],
    ]
  }
  draggingIndex.value = -1 // 重置
}
</script>

<template>
  <div class="flex flex-wrap items-center">
    <div
      v-for="(item, index) in list"
      :key="`${index}-${item.label}`"
      class="draggable-item inline-block m-2"
      :draggable="true"
      @dragstart="dragStart($event, index)"
      @dragover.prevent
      @drop="dragDrop(index)"
      @touchstart="dragStart($event, index)"
      @touchmove="touchMove($event)"
      @touchend="touchEnd"
    >
      <el-button :type="item.type" tag="div">
        {{ item.label }}
      </el-button>
    </div>
  </div>
</template>
