/**
 * @ Author: willy
 * @ CreateTime: 2024-01-20 19:52:27
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-31 10:34:56
 * @ Description: 工具类
 */

import { ISelectOption } from './type'

export interface DeepActItemReturnType {
  result: (any | any[])[]
  labels: (any | any[])[]
  selectAllOptions: (any | any[])[]
}

/**
 * @function deepFindActItem 递归获取选中的item
 * @param {unknown[]} options 列表
 * @param {any} value 值
 * @param {string | number} valueKey 值对应的key
 * @param {string | number} labelKey label对应的key
 * @param {string | number} leafKey 子节点的 key
 * @param {(unknown | unknown[])[]} result 存储的级联列表（正序）
 * @param {(unknown | unknown[])[]} labels 展示的标签（正序）
 * @param {(unknown | unknown[])[]} selectAllOptions 存储 select 选中的展现的列表 (平铺化)
 *
 * @description 逻辑描述
    0. 判断是否为单多选
    1. 如果 value 的值为 非数组(单选)，则断言为单选，只需运行一次，把值找出来
    2. 如果 value 的值为 数组(多选/单选)，则需要把数组里面所有值都查找出来
        - 数组长度等于 1 时可能为 单选/多选
        - 数组长度大于 1 时必为 多选
        注意：多选的两个必为同一个层级节点

    最后会返回 result
        注意：result 存储的值，索引值越大，则里面的内容越精细化
            即 result[result.length - 1] 存储的数据为列表中所展示的
            result[0]  的数据最广泛，包含了所有值

    更新流程
    1. 如果非数组，直接更新
    2. 如果为数组，则先校验新旧 叶子节点 的上级节点的差异，
        如果不同，则再往上一级对比，直到找到相同的上级节点 or 不再存在上级为止（此时直接替换）
        如果相同，则保留相同上级节点，然后再找到要更新的节点来替换

 *
 *  @example
    // 测试用例
    const options = Array.from({ length: 100 }).map((_, i) => ({
    value: i,
    test: i + Math.floor(Math.random() * 50 + 2),
    children: Array.from({ length: 100 }).map((_, j) => ({
        value: +`${i}${j}`,
        test: i + Math.floor(Math.random() * 50 + 2),
    })),
    }))
    const value = [4, 999]
    console.log(deepFindActItem(options, value, 'value', 'test', 'children'))
 */
export const deepFindActItem = (
  options: any[] = [],
  value: any = undefined,
  valueKey: string | number = 'value',
  labelKey: string | number = 'label',
  leafKey: string | number = 'children',
  result: (any | any[])[] = [],
  labels: (any | any[])[] = [],
  selectAllOptions: (any | any[])[] = [],
): DeepActItemReturnType => {
  /**
   * 辅助函数
   */
  /** 是否为对象 */
  const isObject = (obj) => obj && typeof obj === 'object'
  /** 移除传入的数据中包含的 proxy 对象 */
  const removeProxy = (obj) =>
    isObject(obj) ? JSON.parse(JSON.stringify(obj)) : obj
  /** 获取值 */
  const getValue = (obj, key: 'value' | 'key' | 'default') => {
    const keyMap = {
      key: labelKey,
      value: valueKey,
      default: valueKey,
    }
    if (isObject(obj)) return obj[keyMap[key] || keyMap.default]
    return obj
  }

  options = removeProxy(options) // 移除 Proxy 中的 Proxy 对象

  // 边界条件判定（递归的中止条件）
  if (
    value === undefined ||
    value === null ||
    (Array.isArray(value) && !value.length) ||
    !options.length
  ) {
    selectAllOptions.push(options)
    return { result, labels, selectAllOptions }
  }

  // 非数组（单选）
  if (!Array.isArray(value)) {
    const currentValue = isObject(value) ? value[valueKey] : value

    for (const option of options) {
      const optionValue = getValue(option, 'value')
      const optionLabel = getValue(option, 'key')

      if (currentValue === optionValue) {
        selectAllOptions.unshift(options)
        result.unshift(removeProxy(option))
        labels.unshift(optionLabel)

        return { selectAllOptions, result, labels }
      }

      if (
        isObject(option) &&
        Array.isArray(option[leafKey]) &&
        option[leafKey].length
      ) {
        const deepResult = deepFindActItem(
          option[leafKey],
          value,
          valueKey,
          labelKey,
          leafKey,
          result,
          labels,
          selectAllOptions,
        )

        if (deepResult.result?.length) {
          selectAllOptions.unshift(options)
          // 如果在子节点找到了匹配的项，将当前节点也加入到结果中
          result.unshift(removeProxy(option))
          labels.unshift(option[labelKey])

          return { selectAllOptions, result, labels }
        }
      }
    }
  } else {
    // 数组（多选/单选）-> 拆解成单个来处理
    value.forEach((singleValue) => {
      const singleResult = deepFindActItem(
        options,
        singleValue,
        valueKey,
        labelKey,
        leafKey,
        [],
        [],
        [],
      )

      selectAllOptions.push(singleResult?.selectAllOptions || [])
      result.push(singleResult?.result || [])
      labels.push(singleResult?.labels || [])
    })
  }

  // 返回最终的结果
  return { selectAllOptions, result, labels }
}

/**
 * @function deepUpdateActItem 递归更新选中项
 *
 * @description
    更新流程
      1. 如果非数组，直接更新
      2. 如果为数组，则先校验新旧 叶子节点 的上级节点的差异，
          如果不同，则再往上一级对比，直到找到相同的上级节点 or 不再存在上级为止（此时直接替换）
          如果相同，则保留相同上级节点，然后再找到要更新的节点来替换

 * @example
 */
export const deepUpdateActItem = <T = any>(
  oldStoreData: DeepActItemReturnType,
  oldValue: any,
  allParentOptions: T[],
  option: T,
  configOption: ISelectOption,
) => {
  const newStoreData: DeepActItemReturnType = {
    result: [],
    labels: [],
    selectAllOptions: [],
  }

  // 如果为单选
  if (!Array.isArray(oldValue)) {
  }

  console.log(
    newStoreData,
    oldStoreData,
    allParentOptions,
    option,
    oldValue,
    configOption,
  )
}

/**
 * @function showLabelValue 显示 label 的值
 * @param storeData 存储的数据
 * @param delimiter 每个标签之间的分隔符
 * @returns {string} 返回串联后的标签内容
 */
export const showLabelValue = (
  storeData: DeepActItemReturnType,
  delimiter: string,
): string => {
  /** 展示的标签列表 */
  const labels = storeData.labels

  if (!Array.isArray(labels) || (Array.isArray(labels) && !labels.length)) {
    return ''
  }

  // 根据第一个 labels 的值来判断是否为单选
  const labelsIsSingle = !Array.isArray(labels[0])

  if (labelsIsSingle) {
    return labels.join(delimiter)
  } else {
    const result: string[] = []

    labels.forEach((label) => {
      // 防止数组为空的情况出现
      if (Array.isArray(label) && label.length) {
        result.push(label.join(delimiter))
      }
    })

    return result.join(', ')
  }
}

/**
 * @function getAllOptions 获取所有的列表，把列表平铺化（把单选的一层数组和双选的中转化）
 * @param storeData 存储的数据
 * @description
 *  如果为多选，则会默认取层级最多的数据，但可能存在不同层级时会有 Bug
 *  注意：如果为多选时，且多个值之前的层级不在同一级，则可能会产生问题。
 */
export const getAllOptions = (storeData: DeepActItemReturnType) => {
  const labels = storeData.labels
  // 根据 label 来判断是否是多选（只需要判断 lables 是否为双重数组就行）
  const isMultiSelect =
    Array.isArray(labels) && labels.length && Array.isArray(labels[0])

  // 如果为单选，则取全部值
  if (!isMultiSelect) return storeData.selectAllOptions

  // 如果为多选，取数组中层级最长的值
  let result = []
  storeData.selectAllOptions.forEach((currentOption) => {
    if (currentOption.length > result.length) result = currentOption
  })
  return result
}
