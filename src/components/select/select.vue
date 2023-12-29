<!--
 * @ Author: willy
 * @ CreateTime: 2023-12-26 16:26:58
 * @ Modifier: willy
 * @ ModifierTime: 2023-12-29 19:27:06
 * @ Description: Select 选择器
 -->

<script setup lang="ts">
import { getValueType, isMobile } from '@/utils'
import { computed, ref } from 'vue'

defineOptions({
  name: 'WSelect',
})

export interface ISelectProps {
  /**
   * @description 选中项的值
   */
  modelValue: string | number | boolean | Record<string, unknown> | unknown[]
  /**
   * @description 选项列表
   */

  /**
   * @description 是否禁用选择器
   */
  disabled?: boolean
  /**
   * @description 作为 value 唯一标识的键名
   */
  valueKey?: string | number
  /**
   * @description 作为展示 label 的键名
   */
  labelKey?: string | number
  /**
   * @description 是否可清空选项
   */
  clearable?: boolean
  /**
   * @description 是否多选
   */
  multiple?: boolean
  /**
   * @description 在多选时可以选择的项目数量上限
   */
  multipleLimit?: number
  /**
   * @description 是否弃用搜索功能
   */
  filterable?: boolean
}

const props = withDefaults(defineProps<ISelectProps>(), {
  modelValue: '',
  disabled: false,
  valueKey: 'value',
  labelKey: 'label',
  clearable: false,
  multiple: false,
  multipleLimit: 5,
  filterable: true,
}) as Required<ISelectProps>

const labelValue = computed(() =>
  getValueType(props.modelValue) === 'object'
    ? props.modelValue[props.labelKey]
    : props.modelValue,
)

const showWrapper = ref<boolean>(true)
</script>

<template>
  <div v-if="isMobile" class="w-select">
    <div class="w-select__label">
      <slot name="label">
        <span>{{ labelValue.value }}</span>
      </slot>
    </div>

    <div v-show="showWrapper" class="w-select__wrapper"></div>
  </div>

  <div
    v-else
    class="w-select"
    @mouseenter="showWrapper = true"
    @mouseleave="showWrapper = false"
  >
    <div class="w-select__label">
      <slot name="label">
        <span>{{ labelValue.value }}</span>
      </slot>
    </div>

    <div v-show="showWrapper" class="w-select__wrapper">
      <div v-for="item in 1000" :key="item" class="w-select__item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.w-select {
  --select-height: 1.5rem;
  --select-width: 100%;
  --select-border-color: var(
    #{getCssVarName('border', 'color')},
    rgba(0, 0, 0, 0.2)
  );
  --select-text-color: var(#{getCssVarName('text', 'color', 'primary')}, #000);
  --select-border-color-hover: #409eff;
  --select-box-shadow: var(#{getCssVarName('box-shadow', '')});

  --select-list-max-height: 10rem;

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
    background-color: var(#{getCssVarName('bg-color')}, transparent);

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
    // height: 10rem;
    max-height: var(--select-list-max-height);
    border: 1px solid var(--select-border-color);
    box-shadow: var(--select-box-shadow);
    cursor: pointer;
    background-color: var(#{getCssVarName('bg-color')}, transparent);
    overflow: auto;
    @include scrollbar();
  }

  .w-select__item {
    height: var(--select-height);
    text-align: center;
  }
}
</style>
