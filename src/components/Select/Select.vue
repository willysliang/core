<!--
 * @ Author: willy
 * @ CreateTime: 2023-12-26 16:26:58
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-30 17:33:06
 * @ Description: Select 选择器
 -->

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import Picker from '@comp/Picker/Picker.tsx'
import { ISelectProps as IProps } from './type'
import { isMobile } from '@/utils'
import { useSelectOptions } from './hooks'

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

const { labelValue, allOptions, getItem, handleSelectItem } =
  useSelectOptions(props)

/**
 * 更新
 */
const emits = defineEmits(['select', 'update:modelValue'])

const handleUpdateValue = (value) => emits('update:modelValue', value)

/**
 * 选择
 */
/** 选择相应的 item */
const selectItemCallback = (option, currentOptionsIndex) => {
  console.log(option, currentOptionsIndex)
  emits('select', option)
  handleWrapper(false)
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
          v-for="(currentOptions, currentOptionsIndex) in allOptions"
          :key="`w-select-inner-${currentOptionsIndex}`"
          class="w-select__inner"
        >
          <div
            v-for="(option, optionIndex) in currentOptions"
            :key="`w-select-inner-${currentOptionsIndex}-w-select-item-${optionIndex}`"
            class="w-select__item"
            @click="
              handleSelectItem(option, currentOptionsIndex, selectItemCallback)
            "
          >
            <span>{{ getItem(option, 'label') }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
