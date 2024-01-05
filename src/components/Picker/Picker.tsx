/* eslint-disable multiline-ternary */
/**
 * @ Author: willy
 * @ CreateTime: 2024-01-02 20:48:20
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-04 21:48:35
 * @ Description: 移动端 - 选择器
 */

import { defineComponent } from 'vue'
import WPopover from '@comp/Popover/Popover.vue'
import { WPickerAction } from './PickerAction'
import './Picker.scss'

interface WPickerProps {
  visible: boolean
}

export default defineComponent({
  name: 'WPicker',
  props: {
    visible: {
      type: Boolean,
    },
  },
  emits: ['update:visible'],

  setup(props: WPickerProps, { emit }) {
    const handleChangeVisible = (status: boolean) => {
      emit('update:visible', status)
    }

    /**
     * @description 确定按钮触发事件
     */
    const handleConfirm = () => {
      //

      handleChangeVisible(false)
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
                </div>
              </>
            ),
          }}
        </WPopover>
      </>
    )
  },
})
