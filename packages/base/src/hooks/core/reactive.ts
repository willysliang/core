/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-06-01 09:39:51
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-06-01 10:20:36
 * @ Description:  VUE3 reactive 响应式系统的实现
 *
 * 1. 借助 Proxy 将一个对象 obj 变成响应式数据,拦截其 get 和 set 操作
 * 2. 通过 effect 注册副作用函数,并在其首次执行副作用函数时完成 obj 对象的以来收集(track)
 * 3. 当数据发生变化时,第 2 步注册的副作用函数会重新执行(trigger)
 */

console.log('------------- START -----------------')

const bucket = new WeakMap()
const effectStack: Array<any> = []
// 重新定义 bucket 数据类型为 WeakMap
let activeEffect: any = null

/**
 * 清除副作用函数
 */
const cleanup = (effectFn) => {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}

/**
 * 注册副作用函数
*/
const effect = function (fn) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    // 入栈
    effectStack.push(effectFn)
    fn()
    // 出栈
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
  }

  // 用来存储那些依赖集合包含这个副作用函数
  effectFn.deps = []
  effectFn()
  // activeEffect = null
}

/**
 * tracket 追踪
*/
function track (target, key) {
  // activeEffect 无值意味着没有执行 effect 函数,无法收集以来,直接 return
  if (!activeEffect) {
    return undefined
  }

  // 每个 target 在 bucket 中都是一个 Map 类型, key => effects
  let depsMap = bucket.get(target)

  // 第一次拦截时 depsMap 不存在,所以需要先创建联系
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }

  // 根据当前读取的 key,尝试读取 key 的 effect 函数
  let deps = depsMap.get(key)

  // deps 本质是 Set 结构,即一个 key 可以存在多个 effect 函数,被多个 effect 所依赖
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }

  // 将激活的 effectFn 存入桶中
  deps.add(activeEffect)
}

/**
 * trigger 执行依赖
*/
function trigger (target, key) {
  // 读取 depsMap,其结构为 key => effects
  const depsMap = bucket.get(target)
  if (!depsMap) {
    return undefined
  }

  // 真正读取依赖当前属性值 key 的 effects
  const effects = depsMap.get(key)

  // 解决 cleanup 执行会无限执行的问题
  const effectsToRun = new Set(effects)

  // 循环逐个执行
  effectsToRun && effectsToRun.forEach((fn: any) => fn())
}

/** 同意对外暴露响应式函数 */
const reactive = (state) => {
  return new Proxy(state, {
    get (target, key) {
      const value = target[key]
      track(target, key)
      return value
    },
    set (target, key, newValue) {
      // 设置属性值
      target[key] = newValue
      trigger(target, key)
      return true
    }
  })
}

/**
 * 测试
 */
const state = reactive({
  name: 'willys',
  age: 999,
})
effect(() => {
  console.log('name', state.name)

  effect(() => {
    console.log('age', state.age)
  })
})

state.name = 'willysliang'
state.age = 1200
console.log('------------- END -----------------')

export {
  effect,
  reactive,
}
