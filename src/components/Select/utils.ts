/**
 * @ Author: willy
 * @ CreateTime: 2024-01-20 19:52:27
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-20 19:58:13
 * @ Description: 工具类
 */

/**
 * @function deepFindActItem 递归获取选中的item
 * @param options 列表
 * @param value 值
 * @param result 存储的级联列表（倒序）
 * @param labels 展示的标签（正序）
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
            即 result[result.length - 1]  的数据最广泛，包含了所有值，
            result[0] 存储的数据为列表中所展示的
            result[1] 存储的数据为 modelValue 的值（如果value 为 `undefined | null | []` 时不会拥有 result[1]）

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
  options: unknown[] = [],
  value: any = undefined,
  valueKey: string | number = 'value',
  labelKey: string | number = 'label',
  delimiter: string | number = 'children',
  result: unknown[] | unknown[][] = [],
  labels: unknown[] | unknown[][] = [],
) => {
  // 边界条件判定（递归的中止条件）
  if (
    value === undefined ||
    value === null ||
    (Array.isArray(value) && !value.length) ||
    !options.length
  ) {
    return { result, labels }
  }

  /** 工具类 */
  const isObject = (obj) => typeof obj === 'object'
  const removeProxy = (obj) =>
    isObject(obj) ? JSON.parse(JSON.stringify(obj)) : obj
  const getLabelValue = (obj) => (isObject(obj) ? obj[labelKey] : obj)

  // 非数组（单选）
  if (!Array.isArray(value)) {
    const currentValue = isObject(value) ? value[valueKey] : value
    let currentSelectedItem = options.find(
      (item) => (isObject(item) ? item![valueKey] : item) === currentValue,
    )

    if (currentSelectedItem) {
      result.unshift(removeProxy(currentSelectedItem))
      labels.push(getLabelValue(currentSelectedItem))

      return { result, labels }
    } else {
      // 如果没找到，则要遍历并深度查找
      options.forEach((_, i) => {
        result.unshift(removeProxy(options[i]))
        labels.push(getLabelValue(currentSelectedItem))

        currentSelectedItem = deepFindActItem(
          options[i]?.[delimiter] || [],
          value,
          valueKey,
          labelKey,
          delimiter,
          result,
          labels,
        )
      })
    }
  } else {
    // 数组（多选/单选）-> 拆解成单个来处理
    value.forEach((_, i) => {
      const currentSelectedItem = deepFindActItem(
        options,
        value[i],
        valueKey,
        labelKey,
        delimiter,
        [],
        [],
      )
      result.push(currentSelectedItem?.result || [])
      labels.push(currentSelectedItem?.labels || [])
    })

    return { result, labels }
  }
}
