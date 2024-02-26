/**
 * @ Author: willy
 * @ CreateTime: 2024-01-30 17:06:13
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-31 09:57:59
 * @ Description: Select Hooks
 */

import { computed, reactive, ref } from 'vue'
import {
  deepFindActItem,
  deepUpdateActItem,
  getAllOptions,
  showLabelValue,
} from './utils'
import { ISelectOption, ISelectProps } from './type'

export const useSelectOptions = (props: Required<ISelectProps>) => {
  /** 配置项 */
  const configOption = reactive<Required<ISelectOption>>({
    valueKey: props.valueKey,
    labelKey: props.labelKey,
    leafKey: props.leafKey,
    multiple: props.multiple,
    multipleLimit: props.multipleLimit,
  })

  /**
   * 初始化获取值
   */
  const storeData = ref(
    deepFindActItem(
      props.options,
      props.modelValue,
      props.valueKey,
      props.valueKey,
      props.leafKey,
    ),
  )

  console.log('storeData', props.options, storeData.value)

  /**
   * 展示
   */
  /** 显示 label 的值 */
  const labelValue = computed(() =>
    showLabelValue(storeData.value, props.delimiter),
  )

  /** 要展示的所有列表 */
  const allOptions = computed(() => getAllOptions(storeData.value))

  /**
   * 获取
   */
  /** 获取 item 的值 */
  const getItem = (option, key: 'label' | 'value' | 'default') => {
    const propKeyMap = {
      label: props.labelKey,
      value: props.valueKey,
      default: props.valueKey,
    }
    const getProp = propKeyMap[key] || propKeyMap.default
    if (option && typeof option === 'object') return option[getProp]
    return option
  }

  /**
   * 选择
   */
  /** 选择相应的 item */
  const handleSelectItem = (
    option,
    currentOptionsIndex,
    callback: (...arg) => any = () => {},
  ) => {
    /** 选择器禁用 */
    if (props.disabled) return undefined

    // 获取选中的 item 的所有父节点
    const allParentOptions = allOptions.value.slice(0, currentOptionsIndex + 1)

    /** 更新值 */
    deepUpdateActItem(
      storeData.value,
      props.modelValue,
      allParentOptions,
      option,
      configOption,
    )

    /** 扩展使用 */
    callback(allParentOptions, option)
  }

  return {
    /** 变量 */
    storeData,
    labelValue,
    allOptions,

    /** 方法 */
    getItem,
    handleSelectItem,
  }
}
