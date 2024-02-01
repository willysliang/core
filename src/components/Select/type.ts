/**
 * @ Author: willy
 * @ CreateTime: 2024-01-15 14:45:04
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-30 17:56:20
 * @ Description: 类型定义
 */

export interface ISelectOption {
  /**
   * @description 作为 value 唯一标识的键名
   */
  valueKey?: string | number
  /**
   * @description 作为展示 label 的键名
   */
  labelKey?: string | number
  /**
   * @description 叶子节点的键名
   */
  leafKey?: string | number

  /**
   * @description 是否多选
   */
  multiple?: boolean
  /**
   * @description 在多选时可以选择的项目数量上限
   */
  multipleLimit?: number
}

export interface ISelectProps extends ISelectOption {
  /**
   * @description 选中项的值
   */
  modelValue: string | number | boolean | Record<string, unknown> | unknown[]
  /**
   * @description 选项列表
   */
  options: unknown[]
  /**
   * @description 是否弃用搜索功能
   */
  filterable?: boolean
  /**
   * @description 是否禁用选择器
   */
  disabled?: boolean
  /**
   * @description 分隔符，在 modelValue 为数组时将 modelValue 的值拼接在 label 中显示
   */
  delimiter?: string
  /**
   * @description 是否可清空选项
   */
  clearable?: boolean
}
