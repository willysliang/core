/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-06-25 20:38:17
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-06-26 10:42:57
 * @ Description: immer core
 */

export class ImmerProduce {
  /** 用于存储被代理的对象，key 为原对象，value 为代理对象 */
  private proxies: any
  /** 用于存储被修改的对象，key 为原对象，value 为修改后的对象 */
  private copies: any
  private handler: Record<string, (...args) => any>

  constructor() {
    this.proxies = new Map()
    this.handler = {
      /** 拦截对象 key 的查找方式：in查找符、Object.keys() 等 */
      has(target, props) {
        return props in this.getCurrentSource(target)
      },
      ownKeys(target) {
        return Reflect.ownKeys(this.getCurrentSource(target))
      },
      get(target, prop) {
        // 获取访问对象的拷贝，不使用 target 是因为 target 可能被代理并且修改过多次
        const currentSource = this.getCurrentSource(target)
        // 给访问的对象的属性进行创建代理
        return this.createProxy(currentSource[prop])
      },
      set(target, prop, value) {
        // 值没有变化，则不处理
        if (target[prop] === value) {
          return true
        }
        // 值有变化，则进行拷贝再赋值
        const copy = this.getOrCreateCopy(target)
        copy[prop] = value // 给拷贝对象设置值
        return true
      },
      deleteProperty(target, property) {
        // 有拷贝的删除拷贝的属性，不能删除原对象
        const copy = this.getOrCreateCopy(target)
        delete copy[property]
        return true
      },
    }
  }

  /** 返回当前资源对象，有 copy 返回 copy，否则返回 base */
  getCurrentSource(base) {
    const copy = this.copies.get(base)
    return copy || base
  }

  /** 判断是否是计划中的普通对象 */
  isPlainObject(value) {
    if (value === null || typeof value !== 'object') return false
    const proto = Object.getPrototypeOf(value)
    return proto === Object.prototype || proto === null
  }

  /** 获取 copy 原对象，没有则进行创建 */
  getOrCreateCopy(base) {
    let copy = this.copies.get(base)
    if (!copy) {
      // 浅拷贝
      copy = Array.isArray(base) ? [...base] : { ...base }
      // 备案
      this.copies.set(base, copy)
    }
    return copy
  }

  /** 创建代理 */
  createProxy(base) {
    // 对对象和数组进行代理
    if (this.isPlainObject(base) || Array.isArray(base)) {
      let proxy = this.proxies.get(base)
      // 避免重复设置 Proxy 代理
      if (!proxy) {
        proxy = new Proxy(base, this.handler)
        // 备案
        this.proxies.set(base, proxy)
      }
      return proxy
    }
    return base
  }

  /** 检测对象是否修改，需要检测子对象是否被修改 */
  hasChanges(base) {
    const proxy = this.proxies.get(base)
    // 没有被代理，说明没有修改过子对象
    if (!proxy) return false

    // 一个对象被复制，那一定是被改变了
    if (this.copies.has(base)) return true

    // 递归检查子数据
    const keys = Object.keys(base)
    for (let i = 0; i < keys.length; i++) {
      const value = base[keys[i]]
      // 对象或者数组需要再次使用 hasChanges 递归检查
      if (
        (Array.isArray(value) || this.isPlainObject(value)) &&
        this.hasChanges(value)
      ) {
        return true
      }
    }

    // 基本数据类型直接返回 false
    return false
  }

  /** 处理数据，返回被修改后的数据 */
  finalize(state) {
    if (this.isPlainObject(state) || Array.isArray(state)) {
      // 未改变直接返回
      if (!this.hasChanges(state)) {
        return state
      }

      // 改变的对象，则获取副本进行递归检查
      const copy = this.getOrCreateCopy(state)
      if (Array.isArray(copy)) {
        // 数组处理方式，检查子节点
        copy.forEach((_, index) => {
          copy[index] = this.finalize(copy[index])
        })
      } else {
        // 普通对象处理方式，检查子属性值
        Object.keys(copy).forEach((prop) => {
          copy[prop] = this.finalize(copy[prop])
        })
      }

      return Object.freeze(copy)
    }
    return state
  }

  /** 调用 immer */
  doImmer(baseState, recipe) {
    const proxy = this.createProxy(baseState)
    // 把代理后的数据传递给 recipe 函数，让用户修改被代理的对象
    recipe(proxy)
    // 返回被修改后的数据。
    return this.finalize(baseState)
  }
}
