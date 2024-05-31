<script setup lang="ts">
import { COMP_NAMESPACE } from '../contants'

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
  <div class="fixed" :class="namespace" @click.self="handleClickMask">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.mask-layer {
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
