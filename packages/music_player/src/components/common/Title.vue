<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-09 09:08:03
 * @ Modified by: willysliang
 * @ Modified time: 2022-12-05 16:56:21
 * @ Description: 菜单头部信息
 -->

<!-- <script setup lang="ts">
import IconPark from '@comp/common/IconPark.vue'
import { Right } from '@icon-park/vue-next'

defineProps<{
  title: string | number
}>()
</script>

<template>
  <div class="flex flex-row items-center py-3 mt-2 text-xl font-bold">
    <span class="text-xl font-bold">{{ title }}</span>
    <IconPark :icon="Right" size="25" :stroke-width="2" />
  </div>
</template> -->

<script lang="tsx">
import { createVNode, h, defineComponent } from 'vue'
import IconPark from '@comp/common/IconPark.vue'
import { Right } from '@icon-park/vue-next'

export default defineComponent({
  name: 'CommonTitle',
  props: {
    title: { type: String, default: '默认标题' },
  },
  render (props) {
    return h(
      'div',
      { class: 'flex flex-row items-center py-3 mt-2 text-xl font-bold' },
      [
        h('span', { class: 'text-xl font-bold' }, props.title),
        createVNode(IconPark, { icon: Right, size: '15', strokeWidth: 2 }),
      ],
    )
  },
})
</script>
