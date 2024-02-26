<!--
 * @ Author: willy
 * @ CreateTime: 2024-01-02 16:31:30
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-26 11:26:51
 * @ Description: 移动端与 WEB 端的触发时机
 -->

<script setup lang="ts">
import { ref, watch } from 'vue'
import { isMobile } from '@willy/utils'

defineOptions({ name: 'WTrigger' })

interface ITriggerProps {
  /** 是否触发 */
  modelValue: boolean
}

const props = withDefaults(defineProps<ITriggerProps>(), {
  modelValue: false,
}) as Required<ITriggerProps>

const showTrigger = ref<boolean>(props.modelValue)

const emits = defineEmits(['update:modelValue'])
watch(
  () => showTrigger.value,
  () => {
    emits('update:modelValue', showTrigger.value)
  },
  { immediate: true },
)
</script>

<template>
  <div
    v-if="isMobile"
    class="w-trigger"
    @click.stop="showTrigger = !showTrigger"
  >
    <slot></slot>
  </div>
  <div
    v-else
    class="w-trigger"
    @mouseenter="showTrigger = true"
    @mouseleave="showTrigger = false"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss">
.w-trigger {
  width: 100%;
}
</style>
