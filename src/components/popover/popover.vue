<!--
 * @ Author: willy
 * @ CreateTime: 2024-01-02 21:41:39
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-03 21:10:29
 * @ Description: Popover - 弹出层（气泡卡片）
 -->

<script setup lang="ts">
import { createBEM } from '@/utils'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({ name: 'WPopover' })

export type ITrigger = ('click' | 'contextmenu' | 'focus') &
  keyof WindowEventMap

export interface IPopoverProps {
  /** Popover 是否显示 */
  visible: boolean
  /** 触发时机 */
  trigger?: ITrigger
  /** 显示的内容，会被 slot 的内容替换掉 */
  content?: string | HTMLElement
  /** 是否显示 Tooltip 箭头 */
  showArrow?: boolean
  /** 定位方式 */
  positionMode?: 'absolute' | 'fixed'
  /** 出现的位置 */
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'center'
    | 'center-start'
    | 'center-end'
}

const props = withDefaults(defineProps<IPopoverProps>(), {
  visible: false,
  trigger: 'click',
  content: '',
  placement: 'bottom',
  showArrow: true,
  positionMode: 'fixed',
}) as Required<IPopoverProps>

/**
 * 更新 visible 的状态
 */
const emits = defineEmits(['update:visible'])
const updateVisible = (status: boolean) => emits('update:visible', status)

/**
 * 添加触发方式的事件 ref
 */
const triggerRef = ref<HTMLDivElement>()
const triggerFunc = () => updateVisible(!props.visible)
onMounted(() => {
  triggerRef.value!.addEventListener(props.trigger, triggerFunc)
})
onBeforeUnmount(() => {
  triggerRef.value!.removeEventListener(props.trigger, triggerFunc)
})

/**
 * 计算可视区域的高度
 */
const clientRect = computed(() => {
  const getBoundingClientRect = triggerRef.value?.getBoundingClientRect()
  if (getBoundingClientRect) {
    return getBoundingClientRect
  }
  return {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
})
console.log(clientRect.value)
</script>

<template>
  <div ref="triggerRef" class="w-popover">
    <slot name="default" />

    <template v-if="props.visible">
      <div class="w-popover__mask" @click.stop="updateVisible(false)"></div>
      <div
        :class="[
          'w-popover__content',
          createBEM(
            'popover',
            'content',
          )([props.positionMode, props.placement]),
        ]"
      >
        <div v-if="props.showArrow" class="w-popover__arrow"></div>
        <slot name="content">
          <span class="w-popover__content--text" v-html="$props.content"></span>
        </slot>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.w-popover {
  display: inline-block;
  position: relative;

  &__mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: var(getVarName('z-index', 'mask'));
    background-color: var(#{getVarName('mask-color', 'transparent')});
  }

  &__arrow {
    --arrow-width: 0.4rem;

    position: absolute;
    bottom: calc(-1 * var(--arrow-width) * 2 + 0.01rem);
    left: 50%;
    width: 0;
    height: 0;
    border-left: var(--arrow-width) solid transparent;
    border-right: var(--arrow-width) solid transparent;
    border-bottom: calc(var(--arrow-width) * 2) solid
      var(#{getVarName('border-color')});
    transform: translateX(-50%) rotate(180deg) translateY(0.01rem);

    &::after {
      content: '';
      position: absolute;
      top: 0px;
      left: 0.01rem;
      width: 0;
      height: 0;
      border-left: calc(var(--arrow-width) - 0.005rem) solid transparent;
      border-right: calc(var(--arrow-width) - 0.005rem) solid transparent;
      border-bottom: calc(var(--arrow-width) * 2 - 0.005rem) solid
        var(#{getVarName('bg-color')}, #fff);
      transform: translateX(-50%);
      z-index: 1;
    }

    &::before {
      content: '';
      position: absolute;
      top: 8px;
      left: 2px;
      width: 0;
      height: 0;
      border-left: calc(var(--arrow-width) - 4px) solid transparent;
      border-right: calc(var(--arrow-width) - 4px) solid transparent;
      border-bottom: calc(var(--arrow-width) * 2 - 4px) solid
        var(#{getVarName('bg-color')}, #fff);
      transform: translateX(-50%);
      z-index: 2;
    }
  }

  &__content {
    z-index: var(getVarName('z-index', 'popup'));
    box-shadow: var(#{getVarName('box-shadow')});
    background-color: var(#{getVarName('bg-color')}, #fff);
    border-radius: var(#{getVarName('border-radius')}, 1rem);
    border: 1px solid var(#{getVarName('border-color')});

    &--absolute {
      position: absolute;
    }

    &--fixed {
      position: fixed;
    }

    &--bottom,
    &--bottom-start,
    &--bottom-end,
    &--right-end,
    &--left-end {
      bottom: 0;
    }

    &--right,
    &--right-start,
    &--right-end,
    &--bottom-end,
    &--top-end,
    &--center-end {
      right: 0;
    }

    &--top,
    &--top-start,
    &--top-end,
    &--right-start,
    &--left-start {
      top: 0;
    }

    &--left,
    &--left-start,
    &--left-end,
    &--bottom-start,
    &--top-start,
    &--center-start {
      left: 0;
    }

    &--bottom,
    &--top {
      left: 50%;
      transform: translateX(-50%);
    }

    &--center-start,
    &--center-end,
    &--left,
    &--right {
      top: 50%;
      transform: translateY(-50%);
    }

    &--center {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &--text {
      display: inline-block;
      box-sizing: border-box;
      padding: p2r(5);
      font-size: var(#{getVarName('font-size')}, 1rem);
      line-height: var(#{getVarName('font-size')}, 1rem);
    }
  }
}
</style>
