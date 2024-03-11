/**
 * @ Author: willysliang
 * @ Create Time: 2022-11-09 10:16:59
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-09 10:17:56
 * @ Description: 数据集约束
 */

/** 排序类别 */
export type OrderType = 'time' | 'hot'

/** 分页 */
export type PageType = {
  /** 每页数量 */
  limit: number
  /** 当前所在页 */
  page: number
  /** 是否加载数据中 */
  loading: boolean
  /** 是否还有更多数据 */
  noMore: boolean
  /** 数据偏移量 */
  offset: number
  /** 总数 */
  total?: number
  /** 排序 */
  order?: OrderType
}
