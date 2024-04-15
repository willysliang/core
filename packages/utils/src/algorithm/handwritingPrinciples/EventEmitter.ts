/**
 * @ Author: willy
 * @ CreateTime: 2024-04-15 21:02:43
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-15 21:12:22
 * @ Description: EventEmitter 自定义事件 (事件总线)
 */

/**
 * @class EventEmitter 自定义事件 (事件总线)
 * @description 实现自定义事件函数 EventBus，使其的实例具有监听事件、触发事件、解除绑定功能。
 * 注意：实例可能监听多个不同的事件，也可以去除监听事件
 *
 * @memberof EventEmitter#on 监听事件
 * @memberof EventEmitter#emit 触发事件
 * @memberof EventEmitter#off 解除绑定事件
 */
export class EventEmitter {
  /** 存储事件 */
  eventsMap: Map<string, any>

  constructor(eventsMap?: Map<string, unknown[]>) {
    this.eventsMap = eventsMap || new Map()
  }

  /**
   * @memberof EventEmitter#on 监听事件
   * @param eventName 事件名
   * @param handler 执行事件的回调
   * @description 利用数组储存同一个事件的所有回调
   */
  on(eventName: string, handler) {
    const currentEvent = this.eventsMap[eventName]
    currentEvent
      ? currentEvent.push(handler)
      : this.eventsMap.set(eventName, [handler])
  }

  /**
   * @memberof EventEmitter#emit 触发事件
   */
  emit(eventName: string, ...params) {
    const currentEvent = this.eventsMap.get(eventName)
    if (Array.isArray(currentEvent)) {
      currentEvent.forEach((currentFn) => {
        currentFn(...params)
      })
    }
  }

  /**
   * @memberof EventEmitter#off 解除绑定事件
   */
  off(eventName: string, callback) {
    const currentEvent = this.eventsMap.get(eventName)
    if (Array.isArray(currentEvent)) {
      this.eventsMap.set(
        eventName,
        currentEvent.filter((cbk) => cbk !== callback),
      )
    }
  }
}

/* 以下为测试代码 */
const say1 = (greeting) => {
  console.log(`${greeting}, nice meeting you.`)
}

const say2 = (greeting) => {
  console.log(`${greeting}, nice meeting you, too.`)
}

const jerry = new EventEmitter()
jerry.on('greeting', say1)
jerry.on('greeting', say2)

jerry.emit('greeting', 'Hi')
// => 输出：'Hi, nice meeting you.' 和 'Hi, nice meeting you, too'

jerry.off('greeting', say1)
jerry.emit('greeting', 'Hi')
// => 只输出：'Hi, nice meeting you, too'
