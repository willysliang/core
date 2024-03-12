<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-09 14:07:32
 * @ Modified by: willysliang
 * @ Modified time: 2022-10-09 16:30:14
 * @ Description: 折叠面板组件
 -->
<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: '默认描述',
  },
  textEnd: {
    type: Number,
    default: 50,
  },
})

/* 文本变量 && 计算文本显示是否溢出 */
const isOverflow = ref<boolean>(true) // 文本是否溢出
const isShow = ref<boolean>(false) // 控制是否展现所有文本
const htmls = ref<string>('')
watch(() => props.text, (newVal) => {
  htmls.value = newVal.replace(/\n/g, '<br>')
})
if (props.text && props.text.length > props.textEnd) {
  isOverflow.value = true
}

/* 控制详情开关 */
const handleShow = () => {
  isShow.value = !isShow.value
}
</script>

<template>
  <div class="leading-4 w-full text-xs text-gray-500">
    <template v-if="isOverflow">
      <span v-if="isShow"  v-html="htmls"></span>
      <span v-else v-html="htmls.substring(0, textEnd) + '...'"></span>
      <span class="ml-5 hover-text text-main" @click="handleShow">
        [&nbsp;{{ isShow ? '收起' : '详情' }}&nbsp;]
      </span>
    </template>
    <span  v-else v-html="htmls"></span>
  </div>
</template>
