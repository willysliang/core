/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-05-23 20:15:03
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-05-23 20:22:46
 * @ Description: utils - 工具类
 */

/** ====================== PV 相关工具类 ============================= */

/***
 * Event 创建自定义事件
 * dispatchEvent 派发事件
 * addEventListener 监听事件
 * removeEventListener 删除事件
 * ===> 等同于 发布订阅模式
 */
interface CreateHistoryEventReturn<T = any> {
  (type: T): any
}
export const createHistoryEvent = <T extends keyof History>(
  type: T,
): CreateHistoryEventReturn => {
  const origin = history[type]
  return function (this: any) {
    // eslint-disable-next-line prefer-rest-params
    const res = origin.apply(this, arguments)
    // 通过 type 来创建自定义事件
    const e = new Event(type)
    window.dispatchEvent(e)
    return res
  }
}
