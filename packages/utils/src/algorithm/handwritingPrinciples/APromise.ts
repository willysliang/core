/**
 * @ Author: willy
 * @ CreateTime: 2024-04-24 11:47:06
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-24 16:14:32
 * @ Description: 遵循 Promises/A+ 规范实现的 Promise
 */

import { logger } from '../../utils'

type IValue<T> = T | PromiseLike<T> | null | undefined
type IResolver<T> = (value?: IValue<T>) => void
type IRejector = (reason?: any) => void
type IExecutor<T> = (resolve: IResolver<T>, reject: IRejector) => void

enum PromiseState {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

/**
 * @class APromise - 遵循 Promises/A+ 规范实现的 Promise
 *
 * @memberof APromise#then 允许你指定 fulfilled 和 rejected 状态的回调函数。
 * @memberof APromise#catch 是 `then(null, rejection)` 的别名，用于指定发生错误时的回调函数。
 * @memberof APromise#resolve 返回一个以给定值解析后的 Promise 对象。
 * @memberof APromise#reject 返回一个以给定原因拒绝的 Promise 对象。
 * @memberof APromise#all 用于将多个 Promise 实例包装成一个新的 Promise 实例。
 * @memberof APromise#race 返回一个 promise，一旦迭代器中的某个promise解析或拒绝，返回的 promise就会解析或拒绝。
 *
 * @see https://tsejx.github.io/javascript-guidebook/standard-built-in-objects/control-abstraction-objects/promise-standard/
 */
export class APromise<T> {
  /** 状态 */
  private state: PromiseState = PromiseState.PENDING
  /** 指reslove出来的值，可以是任何合法的JS值(包括 undefined , thenable 和 promise等) */
  private value: IValue<T> = null
  /** 拒绝原因，是reject里面传的参数，表示reject的原因 */
  private reason: any = null
  /** 成功回调 */
  private onFulfilledCallbacks: Array<(...arg) => any> = []
  /** 失败回调 */
  private onRejectedCallbacks: Array<(...arg) => any> = []

  constructor(executor: IExecutor<T>) {
    // 成功
    const resolve: IResolver<T> = (value: IValue<T>) => {
      if (this.state === PromiseState.PENDING) {
        this.state = PromiseState.FULFILLED
        this.value = value
        this.onFulfilledCallbacks.forEach((callback) => callback(value))
      }
    }

    // 失败
    const reject: IRejector = (reason: any) => {
      if (this.state === PromiseState.PENDING) {
        this.state = PromiseState.REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach((callback) => callback(reason))
      }
    }

    // 执行 executor，并捕获错误
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  public then(
    onFulfilled?: IResolver<T> | any,
    onRejected?: IRejector,
  ): APromise<T> {
    // 赋予默认函数
    const defaultOnFulfilled = (value: T) => value
    const defaultOnRejected = (reason) => {
      throw reason
    }
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : defaultOnFulfilled
    onRejected =
      typeof onRejected === 'function' ? onRejected : defaultOnRejected

    // 触发promise2的微任务
    const promise2 = new APromise<T>((resolve, reject) => {
      // 成功触发的微任务
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          // 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
          try {
            if (typeof onFulfilled !== 'function') {
              resolve(this.value as T)
            } else {
              const x = onFulfilled(this.value as T)!
              this.resolvePromise(promise2, x, resolve, reject)
            }
          } catch (error) {
            reject(error)
          }
        })
      }

      // 失败触发的微任务
      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          // 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因
          try {
            if (typeof onRejected !== 'function') {
              reject(this.reason)
            } else {
              const x = onRejected(this.reason)
              this.resolvePromise(promise2, x, resolve, reject)
            }
          } catch (error) {
            reject(error)
          }
        })
      }

      // 状态判断
      switch (this.state) {
        case PromiseState.FULFILLED:
          fulfilledMicrotask()
          break
        case PromiseState.REJECTED:
          rejectedMicrotask()
          break
        case PromiseState.PENDING:
          this.onFulfilledCallbacks.push(fulfilledMicrotask)
          this.onRejectedCallbacks.push(rejectedMicrotask)
          break
      }
    })

    return promise2
  }

  private resolvePromise(
    promise2: APromise<T>,
    x: IValue<T> | any,
    resolve: IResolver<T>,
    reject: IRejector,
  ): void {
    // 防止死循环：如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise'))
    }

    let called = false // 防止多次调用
    if (x instanceof Object || x instanceof Function) {
      try {
        const then = (x as PromiseLike<T>).then
        if (typeof then === 'function') {
          then.call(
            x,
            (y) => {
              if (called) return
              called = true
              this.resolvePromise(promise2, y, resolve, reject)
            },
            (r) => {
              if (called) return
              called = true
              reject(r)
            },
          )
        } else {
          resolve(x as T)
        }
      } catch (error) {
        if (called) return
        called = true
        reject(error)
      }
    } else {
      resolve(x as T)
    }
  }

  public catch(onRejected?: IRejector): APromise<T> {
    return this.then(undefined, onRejected)
  }

  static resolve<U>(value: U | PromiseLike<U>): APromise<U> {
    if (value instanceof APromise) return value
    return new APromise((resolve) => resolve(value))
  }

  static reject<U>(reason: any): APromise<U> {
    return new APromise<U>((_, reject) => reject(reason))
  }

  /**
   * `all` 方法用于将多个 Promise 实例包装成一个新的 Promise 实例
   */
  static all<U>(promises: Array<U | PromiseLike<U>>): APromise<U[]> {
    return new APromise<U[]>((resolve, reject) => {
      const values: U[] = []
      let completed = 0
      promises.forEach((promise, index) => {
        APromise.resolve(promise).then((value) => {
          values[index] = value
          completed++
          if (completed === promises.length) resolve(values)
        })
      }, reject)
    })
  }

  /**
   * `race` 方法返回一个 promise，一旦迭代器中的某个promise解析或拒绝，返回的 promise就会解析或拒绝
   */
  static race<U>(promises: Array<U | PromiseLike<U>>): APromise<U> {
    return new APromise<U>((resolve, reject) => {
      promises.forEach((promise) => {
        APromise.resolve(promise).then(resolve, reject)
      })
    })
  }
}

setTimeout(() => {
  logger.warn('遵循 Promises/A+ 规范实现的 Promise', APromise.name)
  // case1: 链式调用
  new APromise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 500)
  })
    .then((value) => {
      console.log(value) // 应该输出 1
      return new APromise((resolve) => resolve(value + 1))
    })
    .then((value) => {
      console.log(value) // 应该输出 2
    })

  // case2: 错误捕获
  new APromise((_, reject) => {
    setTimeout(() => {
      reject(new Error('失败了！'))
    }, 500)
  })
    .then((value) => {
      console.log(value)
    })
    .catch((error) => {
      console.error(error.message) // 应该输出 "失败了！"
    })

  // case3: 异步链式调用
  new APromise((resolve) => {
    setTimeout(() => {
      resolve(10)
    }, 500)
  })
    .then((firstResult) => {
      console.log(firstResult) // 应该输出 10
      return new APromise((resolve) => {
        setTimeout(() => {
          resolve(firstResult * 2)
        }, 500)
      })
    })
    .then((secondResult) => {
      console.log(secondResult) // 应该输出 20
    })

  // case4: then方法未提供回调函数
  new APromise((resolve) => {
    setTimeout(() => {
      resolve('Hello, world!')
    }, 500)
  })
    .then()
    .then((value) => {
      console.log(value) // 应该输出 "Hello, world!"
    })

  // case5: 静态 resolve 和 reject 方法
  APromise.resolve('Resolved value').then((value) => {
    console.log(value) // 应该输出 "Resolved value"
  })
  APromise.reject('Rejected reason').catch((reason) => {
    console.error(reason) // 应该输出 "Rejected reason"
  })
}, 6000)
