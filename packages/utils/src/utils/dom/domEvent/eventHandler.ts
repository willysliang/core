/**
 * @ Author: willysliang
 * @ CreateTime: 2024-04-13 13:22:05
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-04-13 13:22:29
 * @ Description: 事件处理的帮手
 */

type IHander = () => unknown

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
  public handler: IHander

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
    handler: IHander,
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
    handler: IHander,
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
    callback: IHander,
    delay: number = 200,
  ): void {
    if (!targetEle) {
      throw new Error('targetEle is required and must be HTMLElement type.')
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
