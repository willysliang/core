/**
 * @ Author: willy
 * @ CreateTime: 2024-01-09 17:49:58
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-26 11:25:46
 * @ Description: 选择器选项区
 */

import { computed, defineComponent, ref } from 'vue'
import './Picker.scss'
import { selectProps } from './type'
import { Type, getValueType } from '@willy/utils'
import { ISelectProps } from '../Select/type'

export default defineComponent({
  name: 'WPickerOptions',
  props: selectProps,
  emits: ['select', 'updateValue'],
  setup(props: Required<ISelectProps>, { emit }) {
    const options = ref<Array<Record<string, any>>>([])
    console.log(options.value, props.delimiter, props)

    /** 获取 item 的值 */
    const getItem = (option, type: 'label' | 'value' = 'label') => {
      const getProp = type === 'label' ? props.labelKey : props.valueKey
      if (getValueType(option) === Type.Object) return option[getProp]
      return option
    }

    /** 选择相应的 item */
    const selectItem = (option) => {
      if (props.disabled) return undefined

      emit('updateValue', getItem(option, 'value'))
      emit('select', option)
    }

    /**
     * label 相关
     */
    const showLabel = computed<boolean>(
      () => Array.isArray(props.modelValue) && props.modelValue.length > 1,
    )
    const labelValue = computed<unknown>(() => {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.join(` ${props.delimiter} `)
      }
      if (typeof props.modelValue === 'object') {
        return props.modelValue[props.labelKey]
      }
      return props.modelValue
    })

    return () => (
      <div class="w-picker-options">
        {showLabel.value && (
          <div class="w-picker-options__label">{labelValue.value}</div>
        )}
        <ul class="w-picker-options__column">
          {props.options.map((option) => (
            <li onClick={() => selectItem(option)}>
              <span>{getItem(option, 'label')}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  },
})
