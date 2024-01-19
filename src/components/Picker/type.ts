/**
 * @ Author: willy
 * @ CreateTime: 2024-01-15 15:15:19
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-19 18:32:15
 * @ Description: 选择项的类型声明
 */

import { PropType } from 'vue'
import { ISelectProps } from '../Select/type'

export const selectProps = {
  modelValue: {
    default: '',
    type: [String, Number, Boolean, Object, Array] as PropType<
      string | number | boolean | Record<string, unknown> | unknown[]
    >,
  },
  options: {
    type: Array as PropType<unknown[]>,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  valueKey: {
    type: [String, Number] as PropType<string | number>,
    default: 'value',
  },
  labelKey: {
    type: [String, Number] as PropType<string | number>,
    default: 'label',
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  multipleLimit: {
    type: Number,
    default: 5,
  },
  filterable: {
    type: Boolean,
    default: true,
  },
  delimiter: {
    type: String,
    default: '/',
  },
}

export const pickerProps = Object.assign({}, selectProps, {
  visible: {
    type: Boolean,
  },
})

export interface IPickerProps extends ISelectProps {
  visible: boolean
}
