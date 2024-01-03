/* eslint-disable multiline-ternary */
/**
 * @ Author: willy
 * @ CreateTime: 2024-01-02 20:48:20
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-02 21:37:19
 * @ Description: 移动端 - 选择器
 */

import { FunctionalComponent, defineComponent, reactive } from 'vue'

export const FcNode: FunctionalComponent<{ data: number }> = ({ data }) => {
  return (
    <>
      <span>
        <div>
          子组件：
          {data < 10 ? (
            <span>{data}</span>
          ) : (
            <span>
              {data}:{data}
            </span>
          )}
        </div>
      </span>
    </>
  )
}

export default defineComponent({
  name: 'WPicker',
  setup() {
    const data = reactive({ count: 1000 })

    return () => (
      <div class="w-select__picker">
        <div onClick={() => data.count++}>{data.count}</div>
      </div>
    )
  },
})
