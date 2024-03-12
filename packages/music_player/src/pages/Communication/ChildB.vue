<!--
 * @ Author: willysliang
 * @ Create Time: 2022-12-10 08:00:21
 * @ Modified by: willysliang
 * @ Modified time: 2022-12-10 08:37:19
 * @ Description: 子组件B
 -->

<script setup lang="ts">
import { useEventbus } from '@/hooks'
import { onMounted, reactive } from 'vue'

const { emitter, customOn } = useEventbus()

const form = reactive({
  msg1: '',
  msg2: '',
})
onMounted(() => {
  emitter.on('test', (res) => {
    form.msg1 = JSON.stringify(res)
  })

  customOn('demo', (params) => {
    form.msg2 = JSON.stringify(params)
  })
})
</script>

<template>
  <div class="w-full">消息1：{{ form.msg1 }}</div>
  <div class="w-full mt-2">消息2：{{ form.msg2 }}</div>
</template>
