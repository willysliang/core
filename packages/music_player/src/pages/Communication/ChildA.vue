<!--
 * @ Author: willysliang
 * @ Create Time: 2022-12-10 08:00:21
 * @ Modified by: willysliang
 * @ Modified time: 2022-12-10 08:40:04
 * @ Description: 子组件B
 -->

<script setup lang="ts">
import { useEventbus } from '@/hooks'

const { emitter, customEmit } = useEventbus()

const send1 = () => {
  emitter.emit('test', ['sasa', 'bbb', 'ccc', new Date()])
}
const send2 = () => {
  customEmit('demo', ['a', 'b', 'c', new Date()])
}
</script>

<template>
  <el-button round plain type="success" @click="send1">发送消息1</el-button>
  <el-button round plain type="success" @click="send2">发送消息2</el-button>
</template>
