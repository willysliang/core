/**
 * @ Author: willysliang
 * @ Create Time: 2024-01-07 22:06:57
 * @ Modified by: willysliang
 * @ Modified time: 2024-01-07 22:11:07
 * @ Description: 滚动相关 DOM 的工具类
 */

/**
 * @descption 是否滚动到底部
 */
export const isScrollAtBottom = (): boolean =>
  document.documentElement.clientHeight + window.scrollY >=
  document.documentElement.scrollHeight

/**
 * @descption 检查元素是否可滚动
 */
export const isScrollable = (ele: HTMLElement): boolean => {
  // 比较高度以查看元素是否具有可滚动内容
  const hasScrollableContent = ele.scrollHeight > ele.clientHeight

  // 考虑元素的 overflow-y 样式是否设置为 hidden 或 hidden !important
  // 在这些情况下，不会显示滚动条。
  const overflowYStyle = window.getComputedStyle(ele).overflowY
  const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1

  return hasScrollableContent && !isOverflowHidden
}

/**
 * @class 事件帮手类
 *
 * @example 测试用例
      const eventHandler = new EventHandler()
      const scrollableElement = document.getElementById('scrollable') as HTMLElement

      function handleScrollEnd() { console.log('Scrolled to the bottom') }

      eventHandler.addEvent(scrollableElement, 'scroll', () => {
        eventHandler.scrollToBottom(scrollableElement, handleScrollEnd)
      })

      // 清理事件监听器
      window.addEventListener('beforeunload', () => {
        eventHandler.removeEvent(scrollableElement, 'scroll', () => {
          eventHandler.scrollToBottom(scrollableElement, handleScrollEnd)
        })
      })
 */
export class EventHandler {
  /** 滚动的计时器 */
  scrollTimeout: null | NodeJS.Timeout
  handler: () => any

  constructor() {
    this.scrollTimeout = null
    this.handler = () => {}
  }

  /**
   * @function addEvent 添加监听事件
   * @param {HTMLElement | null} element HTML元素
   * @param {string} eventName 事件名
   * @param {() => any} handler 要触发的事件
   * @param {boolean} useCapture 是否为捕获监听器
   */
  addEvent(
    element: HTMLElement | null,
    eventName: string,
    handler: typeof this.handler,
    useCapture?: boolean,
  ): void {
    if (element === null) return undefined
    if (element.addEventListener) {
      element.addEventListener(eventName, handler, useCapture)
    } else if ('attachEvent' in element) {
      ;(element as any).attachEvent('on' + eventName, handler)
    } else {
      element['on' + eventName] = handler
    }
  }

  /**
   * @function removeEvent 移除监听事件
   * @param {HTMLElement | null} element HTML元素
   * @param {string} eventName 事件名
   * @param {() => any} handler 要移除的事件
   * @param {boolean} useCapture 是否为捕获监听器
   */
  removeEvent(
    element: HTMLElement | null,
    eventName: string,
    handler: typeof this.handler,
    useCapture?: boolean,
  ): void {
    if (element === null) return undefined
    if (element.removeEventListener) {
      element.removeEventListener(eventName, handler, useCapture)
    } else if ('detachEvent' in element) {
      ;(element as any).detachEvent('on' + eventName, handler)
    } else {
      element['on' + eventName] = null
    }
  }

  /**
   * @function scrollToBottom 滚动到底部触发事件（添加时延）
   * @param  {HTMLElement} targetEle HTML元素
   * @param {() => any} callback 需要调用的回调函数
   * @param {number} delay 事件回调触发的时延
   * @returns {void}
   */
  scrollToBottom(
    targetEle: HTMLElement,
    callback: typeof this.handler,
    delay: number = 200,
  ): void {
    if (!targetEle) {
      console.error('')
      return
    }

    if (this.scrollTimeout) clearTimeout(this.scrollTimeout)

    const { clientHeight, scrollHeight, scrollTop } = targetEle

    this.scrollTimeout = setTimeout(() => {
      if (scrollHeight <= clientHeight + scrollTop + 10) {
        callback()
      }
    }, delay)
  }
}
