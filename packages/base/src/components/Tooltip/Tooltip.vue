<!--
 * @ Author: willy
 * @ CreateTime: 2023-12-24 16:59:54
 * @ Modifier: willy
 * @ ModifierTime: 2023-12-24 17:35:13
 * @ Description: 文字提示
 -->

<script setup lang="ts">
defineOptions({
  name: 'WTooltip',
})

export interface WToolTipProps {
  content: string
}

const props = defineProps<WToolTipProps>()
</script>

<template>
  <div class="w-tooltip">
    <slot v-if="$slots.default"></slot>

    <div class="w-tooltip-content">
      <slot name="content">
        <span v-html="props.content"></span>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.w-tooltip {
  position: relative;

  &-content {
    position: absolute;
    bottom: p2r(0);
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
