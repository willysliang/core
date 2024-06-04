<!--
 * @ Author: willy
 * @ CreateTime: 2024-05-31 18:34:27
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-04 11:53:40
 * @ Description: 弹窗
 -->

<script setup lang="ts">
import MaskLayer from './mask-layer.vue'
import { onMounted, onBeforeUnmount } from 'vue'
import type { IDialogProps } from './types'
import { COMP_NAMESPACE } from '../constants'

const namespace = COMP_NAMESPACE.DIALOG
defineOptions({
  name: COMP_NAMESPACE.DIALOG,
})

const props = withDefaults(defineProps<IDialogProps>(), {
  modelValue: true,
  title: '提示',
  content: '',
  escCloseable: true,
  maskClosable: true,
  showCloseIcon: false,
  showFooter: true,
  okText: '确认',
  showCancel: false,
  cancelText: '取消',
  top: 150,
  bottom: 150,
  width: 450,
  cancelCallback: () => {},
  confirmCallback: () => {},
  closeCallback: () => {},
} as Required<IDialogProps>)

const emits = defineEmits(['update:modelValue', 'confirm', 'cancel', 'close'])

const handleCloseDialog = (): void => {
  emits('close')
  emits('update:modelValue', false)
  props.closeCallback()
}

/**
 * 遮罩层点击事件
 */
const handleClickMask = (): void => {
  if (!props.maskClosable) {
    return
  }
  handleCloseDialog()
}

/**
 * 按 ESC 键关闭弹窗
 */
const handleESCkeyDown = (event) => {
  if (['Esc', 'Escape'].includes(event.key)) {
    handleCloseDialog()
  }
}
onMounted(() => {
  if (props.escCloseable) {
    window.addEventListener('keydown', handleESCkeyDown)
  }
})
onBeforeUnmount(() => {
  if (props.escCloseable) {
    window.removeEventListener('keydown', handleESCkeyDown)
  }
})

/**
 * 取消/确认 按钮点击
 */
const handleActionDialog = (event: 'confirm' | 'cancel') => {
  emits(event)

  if (event === 'confirm') {
    props.confirmCallback()
  } else {
    props.cancelCallback()
  }

  handleCloseDialog()
}
</script>

<template>
  <teleport to="body">
    <transition :name="namespace" appear>
      <mask-layer v-if="modelValue" @click-mask="handleClickMask">
        <div
          :class="namespace"
          :style="{
            width: width ? `${width}px` : 'auto',
            top: `${top}px`,
            maxHeight: `calc(100vh - ${top}px - ${bottom}px)`,
          }"
        >
          <div v-if="props.title" :class="`${namespace}__header`">
            <span
              class="fw-bold no-select"
              :class="`${namespace}__header--title`"
              >{{ props.title }}</span
            >
            <button
              v-if="props.showCloseIcon"
              :class="`${namespace}__header--close`"
              @click.stop="handleCloseDialog"
            >
              x
            </button>
          </div>
          <div :class="`${namespace}__content`">
            <slot>
              <div v-html="props.content"></div>
            </slot>
          </div>
          <div v-if="props.showFooter" :class="`${namespace}__footer`">
            <button
              v-if="props.showCancel"
              :class="`${namespace}__footer--btn ${namespace}__footer--cancel`"
              @click="handleActionDialog('cancel')"
            >
              {{ props.cancelText }}
            </button>
            <button
              :class="`${namespace}__footer--btn ${namespace}__footer--confirm`"
              @click="handleActionDialog('confirm')"
            >
              {{ props.okText }}
            </button>
          </div>
        </div>
      </mask-layer>
    </transition>
  </teleport>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
