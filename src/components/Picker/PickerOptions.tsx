/**
 * @ Author: willy
 * @ CreateTime: 2024-01-09 17:49:58
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-09 19:30:38
 * @ Description: 选择器选项区
 */

import { defineComponent, ref } from 'vue'
import { dateColumns } from './demo/data'
import { lang } from '@utils/index'
import './Picker.scss'

export default defineComponent({
  name: 'WPickerOptions',
  setup() {
    type T = Array<Record<string, any>>
    const data = lang<T>(dateColumns as any)
    const options = ref<Array<Record<string, any>>>(data)

    console.log(options.value[0])

    return () => (
      <div class="w-picker-options">
        <ul class="w-picker-options__column">
          {options.value[0].map((item) => (
            <li>{item.text}</li>
          ))}
        </ul>
      </div>
    )
  },
})
