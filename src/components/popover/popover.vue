<!--
 * @ Author: willy
 * @ CreateTime: 2024-01-02 21:41:39
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-07 19:31:58
 * @ Description: Popover - 弹出层（气泡卡片）
 -->

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { createBEM } from '@/utils'
import { calcAbsoluteLocation, calcFixedLocation } from './utils'
import type { IContentInfoType, IPopoverProps, IStyleType } from './types'

defineOptions({ name: 'WPopover' })

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
const emits = defineEmits(['update:visible', 'changeVisible'])
const updateVisible = (status: boolean) => {
  emits('update:visible', status)
  emits('changeVisible', status)
}

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
 * @description 获取并计算容器的宽高
 */
const contentInfo = computed<IContentInfoType>(() => {
  const getBoundingClientRect = triggerRef.value?.getBoundingClientRect()
  let clientRect = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  }
  clientRect = getBoundingClientRect || clientRect

  const unit = 'px'
  const arrowHeight = 5
  const contentHeight = clientRect.bottom - clientRect.top || 0
  const contentWidth = clientRect.right - clientRect.left || 0

  return {
    unit,
    arrowHeight,
    contentHeight,
    contentWidth,
  }
})

/**
 * @description 计算弹层所在位置的样式
 */
const contentStyle = computed<IStyleType>(() => {
  const placement = createBEM('popover', 'content')(props.placement)

  let styleObj: IStyleType = {}

  const isFixed = props.positionMode === 'fixed'

  styleObj = isFixed
    ? calcFixedLocation(placement)
    : calcAbsoluteLocation(placement, contentInfo.value)

  return styleObj
})

/**
 * @description 计算弹层主内容区域的样式
 */
const contentTextStyle = computed<IStyleType>(() => {
  const isFixed = props.positionMode === 'fixed'
  if (isFixed) return ''
  return `max-width: ${contentInfo.value.contentWidth + contentInfo.value.unit}`
})
</script>

<template>
  <div class="w-popover">
    <div ref="triggerRef" class="w-popover__trigger">
      <slot name="default" />
    </div>

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
        :style="contentStyle"
      >
        <div v-if="props.showArrow" class="w-popover__arrow"></div>
        <slot name="content">
          <span
            class="w-popover__content--text"
            :style="contentTextStyle"
            v-html="$props.content"
          ></span>
        </slot>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.w-popover {
  position: relative;
  display: inline-block;

  &__trigger {
    display: inline-block;
  }

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

    &--text {
      display: inline-block;
      box-sizing: border-box;
      word-wrap: break-word;
      padding: p2r(5);
      font-size: var(#{getVarName('font-size')}, 1rem);
      line-height: var(#{getVarName('font-size')}, 1rem);
    }
  }
}
</style>
