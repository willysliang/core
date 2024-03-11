/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-07-04 09:02:11
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-08-15 09:54:31
 * @ Description: VUEX
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let Vue: any = null

const forEachValue = (obj = {}, fn) => {
  Object.keys(obj).forEach((key) => {
    fn(obj[key], key)
  })
}

/**
 * @function Module
 * @description 通过 new Module 便可以得到格式化后的树形数据结构
 */
class Module {
  _raw: any
  _children: Record<string, any>
  state: Record<string, any>

  constructor(rootModule) {
    this._raw = rootModule
    this._children = {}
    this.state = rootModule.state
  }

  /** 获取子模块 */
  getChild = (key) => {
    return this._children[key]
  }

  /** 追加子模块 */
  addChild = (key, module) => {
    this._children[key] = module
  }

  /** 遍历当前模块的child */
  forEachChild = (fn) => {
    forEachValue(this._children, fn)
  }

  /**
   * @function forEachGetters - 遍历 getters
   */
  forEachGetters = () => {
    // c
  }
}

/**
 * @description 实现将用户传入的参数转化为格式化后的结果
 */
/**
    this.root = {   // 模块的配置：包含当前模块的 state、getters、mutations、actions
        _raw: xxx,
        _children: { // 子模块
        a模块: {
            _raw: xxx,
            _children: {},
            state: xxx.state
        },
        b模块: {
            _raw: xxx,
            _children: {},
            state: xxx.state
        }
        },
        state: xxx.state
    }
 */
class ModuleCollection {
  root: any

  constructor(options) {
    /** 注册模块 []表示路径 递归注册模块 */
    this.register([], options)
  }

  register = (path: Array<string>, rootModule: any) => {
    const newModule = new Module(rootModule)
    if (path.length === 0) {
      // 根模块
      this.root = newModule
    } else {
      const parent = path.slice(0, -1).reduce((pre, next) => {
        return pre.getChild(next)
      }, this.root)
      parent.addChild(path[path.length - 1], newModule)
    }

    // 注册子模块
    if (rootModule.modules) {
      forEachValue(rootModule.modules, (moduleValue, moduleName) => {
        // 递归
        this.register([...path, moduleName], moduleValue)
      })
    }
  }
}

/**
 * @function installModule
 * @description 将创建的树形结构上的状态、方法安装到 Store 实例上，就可以通过$store方式获取到对应的数据
 */
function installModule(store, rootState, path, module) {
  // 收集所有模块的状态
  if (path.length > 0) {
    const parent = path.slice(0, -1).reduce((pre, next) => {
      return pre[next]
    }, rootState)
    // 将属性设置为响应式，可新增属性
    Vue.set(parent, path[path.length - 1], module.state)
  }
  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child)
  })
}

interface StoreOptions {
  /** 存储状态的数据，也就是全局要共享的数据 */
  state: Record<string, any>
  /** 包含一些函数，用于对 state 进行计算操作 */
  getters?: Record<string, any>
  /** 包含一些函数，用于改变 state 的值 */
  mutations?: Record<string, any>
  /** 包含一些函数，用于处理异步操作或者一些逻辑处理 */
  actions?: Record<string, any>
  _module: any
}

class Store {
  /** 存储状态的数据，也就是全局要共享的数据 */
  state: Record<string, any>
  /** 包含一些函数，用于对 state 进行计算操作 */
  getters: Record<string, any>
  /** 包含一些函数，用于改变 state 的值 */
  mutations: Record<string, any>
  /** 包含一些函数，用于处理异步操作或者一些逻辑处理 */
  actions: Record<string, any>
  _module: any
  _vm: any

  constructor(options: StoreOptions) {
    const { state = {}, getters = {}, mutations = {}, actions = {} } = options

    this.state = Vue.observable(state)

    this.getters = {}
    for (const [key, value] of Object.entries(getters)) {
      Object.defineProperty(this.getters, key, {
        get: () => value(this.state),
      })
    }

    this.mutations = mutations
    this.actions = actions

    this._module = new ModuleCollection(options)
    installModule(this, this._module.root.state, [], this._module.root)

    const rootState = this._module.root.state
    // 实现 state 响应式
    this.resetStoreVM(this, rootState)
  }

  get states() {
    return this._vm._data.$$state
  }

  /** 接受一个类型和有效载荷参数，并调用与类型匹配的 mutation 函数来更改状态 */
  commit = (type, payload) => {
    if (!this.mutations[type]) {
      throw new Error(`Mutation "${type}" not found`)
    }
    this.mutations[type](this.state, payload)
  }

  /** 接受一个类型和有效载荷参数，并调用与类型匹配的 action 函数。注意，我们将 commit 和 state 作为参数传递给 action 函数，以便在需要更改状态时使用 */
  dispatch = (type, payload) => {
    if (!this.mutations[type]) {
      throw new Error(`Action "${type}" not found`)
    }
    return this.actions[type]({ commit: this.commit, state: this.state })
  }

  /**
   * @function resetStoreVm - 实现 state 数据响应式响应式
   */
  resetStoreVM = (store, state) => {
    const wrappedGetters = store._wrappedGetters
    const computed = {}
    store.getters = Object.create(null)

    // 通过使用 vue 的 computed 实现缓存
    forEachValue(wrappedGetters, (fn, key) => {
      computed[key] = () => fn()
      // 代理
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key],
      })
    })

    // 将状态实现响应式
    store._vm = new Vue({
      data() {
        return {
          $$state: state,
        }
      },
      computed,
    })
  }
}

function install(_Vue) {
  Vue = _Vue
}

export default {
  Store,
  install,
}
