/**
 * @ Author: willy
 * @ CreateTime: 2024-04-25 15:38:45
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-25 18:25:41
 * @ Description: 埋点的工具方法
 */

interface CreateHistoryEventReturn<T = any> {
  (type: T): any
}

/***
 * Event 创建自定义事件
 * dispatchEvent 派发事件
 * addEventListener 监听事件
 * removeEventListener 删除事件
 * ===> 等同于 发布订阅模式
 */

export const createHistoryEvent = <T extends keyof History>(
  type: T,
): CreateHistoryEventReturn => {
  const origin = history[type]
  return function (this: any) {
    // eslint-disable-next-line prefer-rest-params
    const res = origin.apply(this, arguments)
    const e = new Event(type)
    window.dispatchEvent(e)
    return res
  }
}
