<!--
 * @ Author: willy
 * @ CreateTime: 2024-05-31 18:34:27
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-03 17:43:58
 * @ Description: 遮罩层
 -->

<script setup lang="ts">
import { COMP_NAMESPACE } from '../constants'

const namespace = COMP_NAMESPACE.MASK_LAYER
defineOptions({
  name: COMP_NAMESPACE.MASK_LAYER,
})

const emits = defineEmits<{
  (event: 'clickMask'): void
}>()

const handleClickMask = (): void => {
  emits('clickMask')
}
</script>

<template>
  <div :class="namespace" @click.self="handleClickMask">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.w-mask-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(
    #{getVarName('mask-color', 'extra-dark')},
    rgba(0, 0, 0, 0.3)
  );
}
</style>
