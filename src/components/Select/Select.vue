<!--
 * @ Author: willy
 * @ CreateTime: 2023-12-26 16:26:58
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-20 19:57:53
 * @ Description: Select 选择器
 -->

<script setup lang="ts">
import { computed, onMounted, ref, onBeforeUnmount } from 'vue'
import Picker from '@comp/Picker/Picker.tsx'
import { ISelectProps as IProps } from './type'
import { getValueType, Type, isMobile } from '@/utils'
import { deepFindActItem } from './utils'

defineOptions({ name: 'WSelect' })

export interface ISelectProps extends IProps {}

/** 是否展示选择层 */
const showWrapper = ref<boolean>(false)
const handleWrapper = (status: boolean) => (showWrapper.value = status)

/** 挂载事件 */
const selectRef = ref<HTMLDivElement>()
const labelRef = ref<HTMLDivElement>()
onMounted(() => {
  if (isMobile) {
    labelRef.value!.addEventListener('click', () =>
      handleWrapper(!showWrapper.value),
    )
  } else {
    selectRef.value!.addEventListener('mouseenter', () => handleWrapper(true))
    selectRef.value!.addEventListener('mouseleave', () => handleWrapper(false))
  }
})
onBeforeUnmount(() => {
  if (isMobile) {
    labelRef.value!.removeEventListener('click', () =>
      handleWrapper(!showWrapper.value),
    )
  } else {
    selectRef.value!.removeEventListener('mouseenter', () =>
      handleWrapper(true),
    )
    selectRef.value!.removeEventListener('mouseleave', () =>
      handleWrapper(false),
    )
  }
})

const props = withDefaults(defineProps<ISelectProps>(), {
  modelValue: '',
  options: () => [],
  disabled: false,
  valueKey: 'value',
  labelKey: 'label',
  leafKey: 'children',
  clearable: false,
  multiple: false,
  multipleLimit: 5,
  filterable: true,
  delimiter: '/',
}) as Required<ISelectProps>

/**
 * 初始化获取值
 */
console.log(deepFindActItem(props.options, props.modelValue, 'value', 'test'))

/**
 * label
 */
/** 显示 label 的值 */
const labelValue = computed(() => {
  if (getValueType(props.modelValue) === Type.Object) {
    return props.modelValue[props.labelKey]
  } else if (Array.isArray(props.modelValue)) {
    return props.modelValue.join(` ${props.delimiter} `)
  } else return props.modelValue
})

/**
 * 获取
 */
/** 获取 item 的值 */
const getItem = (option, type: 'label' | 'value' = 'label') => {
  const getProp = type === 'label' ? props.labelKey : props.valueKey
  if (getValueType(option) === Type.Object) return option[getProp]
  return option
}

/**
 * 更新
 */
const emits = defineEmits(['select', 'update:modelValue'])

const handleUpdateValue = (value) => emits('update:modelValue', value)

/**
 * 选择
 */
/** 选择相应的 item */
const selectItem = (option) => {
  if (props.disabled) return undefined

  handleUpdateValue(getItem(option, 'value'))
  emits('select', option)

  showWrapper.value = false
}
</script>

<template>
  <div ref="selectRef" class="w-select">
    <div ref="labelRef" class="w-select__label">
      <slot name="label">
        <span>{{ labelValue }}</span>
      </slot>
    </div>

    <template v-if="isMobile">
      <Picker
        v-model:visible="showWrapper"
        v-bind="props"
        @update-value="handleUpdateValue"
      />
    </template>

    <template v-else>
      <div v-show="showWrapper" class="w-select__wrapper">
        <div
          v-for="(option, index) in props.options"
          :key="index"
          class="w-select__item"
          @click="selectItem(option)"
        >
          <span>{{ getItem(option, 'label') }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.w-select {
  --select-height: 2rem;
  --select-width: 100%;
  --select-border-color: var(
    #{getVarName('border', 'color')},
    rgba(0, 0, 0, 0.2)
  );
  --select-text-color: var(#{getVarName('text', 'color', 'primary')}, #000);
  --select-border-color-hover: #409eff;
  --select-box-shadow: var(#{getVarName('box-shadow', '')});

  --select-wrapper-max-height: calc(var(--select-height) * 5);
  --select-picker-max-height: 40vh;
  --select-item-hover-bg-color: #f5f7fa;
  --select-item-font-size: var(#{getVarName('font-size', 'sm')});

  width: var(--select-width);
  height: var(--select-height);
  line-height: var(--select-height);
  padding: 0 p2r(5);
  box-sizing: border-box;
  position: relative;
  color: var(--select-text-color);

  &__label {
    width: 100%;
    height: var(--select-height);
    border: 1px solid var(--select-border-color);
    border-radius: p2r(2);
    box-sizing: border-box;
    text-align: center;
    @include text-ell();
    background-color: var(#{getVarName('bg-color')}, transparent);

    &:hover {
      border: 1px solid var(--select-border-color-hover);
    }
  }

  &__wrapper {
    position: absolute;
    top: calc(var(--select-height) + p2r(0));
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - #{p2r(10)});
    max-height: var(--select-wrapper-max-height);
    border: 1px solid var(--select-border-color);
    box-shadow: var(--select-box-shadow);
    cursor: pointer;
    background-color: var(#{getVarName('bg-color')}, transparent);
    overflow: auto;
    @include scrollbar();
  }

  .w-select__item {
    width: 100%;
    font-size: var(--select-item-font-size);
    line-height: calc(var(--select-item-font-size) + #{p2r(5)});
    text-align: center;
    box-sizing: border-box;
    padding: p2r(8) p2r(5);

    &:hover {
      background-color: var(--select-item-hover-bg-color);
    }
  }

  &__mask {
    width: 100%;
    height: 100%;
    background-color: var(#{getVarName('mask', 'color')});
  }

  &__picker {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    width: 100%;
    max-height: var(--select-picker-max-height);
    border: 1px solid var(--select-border-color);
    box-shadow: var(--select-box-shadow);
  }
}
</style>
