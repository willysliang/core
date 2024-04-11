<template>
  <!-- <div @click="handleClick">按钮</div> -->
  <teleport to="body">
    <transition :name="namespace" appear>
      <mask-layer v-if="modelValue" @click-mask="handleClickMask">
        <div
          class="absolute flex-col"
          :class="namespace"
          :style="{
            width: width ? `${width}px` : 'auto',
            top: `${top}px`,
            maxHeight: `calc(100vh - ${top}px - ${bottom}px)`,
          }"
        >
          <div class="flex-y-center pb-l" :class="`${namespace}-header`">
            <span class="fw-bold no-select" :class="`${namespace}-title`">{{
              title
            }}</span>
            <div class="flex-1"></div>
            <button @click.stop="handleCloseModal">关闭</button>
          </div>
          <div class="over-y-auto flex-1" :class="`${namespace}-content`">
            <slot></slot>
          </div>
        </div>
      </mask-layer>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import MaskLayer from './mask-layer.vue'

export interface IProps {
  /** 是否显示 */
  modelValue?: boolean
  /** 标题 */
  title?: string
  /** 是否点击esc关闭 */
  escCloseable?: boolean
  /** 点击遮罩层关闭 */
  maskClosable?: boolean
  /** 距离顶部距离 */
  top?: number | string
  /** 距离底部距离 */
  bottom?: number | string
  /** modal宽度 */
  width?: number | string

  /**
   * 底部按钮相关属性
   */
  /** 取消按钮属性 */
  cancelBtnOpts?: object
  /** 确认按钮属性 */
  confirmBtnOpts?: object
  /** 确认按钮的文本 */
  okText?: string
  /** 是否显示取消按钮 */
  showCancel?: boolean
  /** 取消按钮文字 */
  cancelText?: string
  /** 是否显示底部 */
  showFooter?: boolean
}

export interface IEmits {
  (event: 'update:modelValue', state: boolean): void
  (event: 'confirm' | 'cancel' | 'close'): void
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: true,
  title: '示例标题',
  escCloseable: true,
  maskClosable: true,
  okText: '确认',
  showCancel: false,
  cancelText: '取消',
  showFooter: true,
  top: 150,
  bottom: 150,
  width: 450,
  cancelBtnOpts: () => ({
    type: 'default',
    size: 'medium',
    customClass: '',
  }),
  confirmBtnOpts: () => ({
    type: 'primary',
    size: 'medium',
    customClass: '',
  }),
})

const emits = defineEmits<IEmits>()

const namespace = 'modal'

// const handleClick = () => {
//   emits('update:modelValue', true)
// }

const closeModal = (): void => {
  emits('close')
  emits('update:modelValue', false)
}

const handleClickMask = (): void => {
  if (!props.maskClosable) {
    return
  }
  closeModal()
}

const handleCloseModal = (): void => {
  closeModal()
}
</script>

<style lang="scss">
@import './style.scss';
$namespace: 'modal';

.#{$namespace} {
  left: 50%;
  transform: translateX(-50%);
  border: 2px solid #000;
  .#{$namespace}-header {
    .#{$namespace}-title {
      font-size: 18px;
      color: #000;
    }
  }
  .#{$namespace}-content {
    &::-webkit-scrollbar {
      width: 24px;
      height: 8px;
    }
    &::-webkit-scrollbar-thumb {
      border-left: 16px solid transparent;
      background-clip: padding-box;
      background-color: yellow;
    }
    &::-webkit-scrollbar-track {
      background-color: yellow;
    }
  }
}

.#{$namespace}-enter-active,
.#{$namespace}-leave-active {
  transition: all 1.2s ease;
}
.#{$namespace}-enter-from {
  opacity: 0;
  transform: scale(1.05);
  color: red;
}
.#{$namespace}-leave-to {
  opacity: 0;
  transform: scale(1.05);
  color: yellow;
}
</style>
