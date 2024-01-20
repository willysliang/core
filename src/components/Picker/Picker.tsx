/* eslint-disable multiline-ternary */
/**
 * @ Author: willy
 * @ CreateTime: 2024-01-02 20:48:20
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-19 18:30:11
 * @ Description: 移动端 - 选择器
 */

import { defineComponent, ref } from 'vue'
import WPopover from '@comp/Popover/Popover.vue'
import { WPickerAction } from './PickerAction'
import WPickerOptions from './PickerOptions'
import { pickerProps, IPickerProps } from './type'
import './Picker.scss'
import { Type, getValueType } from '@/utils'

export default defineComponent({
  name: 'WPicker',
  props: pickerProps,
  emits: ['update:visible', 'updateValue', 'select'],

  setup(props: Required<IPickerProps>, { emit }) {
    const selectValue = ref(props.modelValue)

    /** 切换显隐 */
    const handleChangeVisible = (status: boolean) =>
      emit('update:visible', status)

    /**
     * @description 确定按钮触发事件
     */
    const handleConfirm = () => {
      //

      handleChangeVisible(false)
    }

    /** 获取 item 的值 */
    const getItem = (option, type: 'label' | 'value' = 'label') => {
      const getProp = type === 'label' ? props.labelKey : props.valueKey
      if (getValueType(option) === Type.Object) return option[getProp]
      return option
    }

    const handleUpdateValue = (value) => emit('updateValue', value)

    const handleSelectOption = (option) => {
      handleUpdateValue(getItem(option, 'value'))
    }

    return () => (
      <>
        <WPopover
          visible={props.visible}
          showArrow={false}
          onChangeVisible={handleChangeVisible}
        >
          {{
            content: () => (
              <>
                <div class="w-picker">
                  <WPickerAction
                    onCancel={() => handleChangeVisible(false)}
                    onConfirm={handleConfirm}
                  />
                  <WPickerOptions
                    {...props}
                    v-model:modelValue={selectValue.value}
                    onUpdateValue={handleUpdateValue}
                    onSelect={handleSelectOption}
                  />
                </div>
              </>
            ),
          }}
        </WPopover>
      </>
    )
  },
})
