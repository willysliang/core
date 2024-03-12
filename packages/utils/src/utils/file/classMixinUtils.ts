/**
 * @ Author: willy
 * @ CreateTime: 2024-03-06 12:53:26
 * @ Modifier: willy
 * @ ModifierTime: 2024-03-06 14:15:13
 * @ Description: class 的混入模式（实现同时继承多个父类）
 */

/** 类的声明 */
export type Constructor<T = any> = new (...args: any[]) => T | any

/** 将联合类型转换为交叉类型的辅助类型 */
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

/**
 * 使用 Mixins 类的混入方法后的返回类型
 * const mixins = [class A{}, class B{}]
 * class AllUtils extends Mixins(class {}, ...mixins) {}
 * const allUtils = new AllUtils() as IMixinsReturnType<typeof AllUtils>
 */
export type IMixinsReturnType<T> = Omit<
  T,
  | 'apply'
  | 'arguments'
  | 'bind'
  | 'call'
  | 'constructor'
  | 'Symbol'
  | 'prototype'
>

/**
 * @function applyMixins 使用混入模式实现继承多个父类
 * @param derivedCtor 继承自基类的类名
 * @param baseConstructors 继承自基类的类数组
 *
 * @example
    class A {
      constructor(public aProp: string) { this.aProp = aProp }
      a() { console.log('a: ' + this.aProp) }
    }
    class B {
      constructor(public bProp: number) { this.bProp = bProp }
      b() { console.log('b: ' + this.bProp) }
    }

    class All {
      aProp: string = ''
      bProp: number = 0
      constructor(aProp: string, bProp: number) {
        this.aProp = aProp
        this.bProp = bProp
      }
    }
    // 使用 Mixins 函数创建 All 类，继承自 A, B
    const mixins = [A, B]
    type IMixins = All & A & B
    applyMixins(All, mixins)
    const all = new All('test', 42) as unknown as IMixins
    all.a() // 调用 A 的 a 方法，输出 "a: test"
    all.b() // 调用 B 的 b 方法，输出 "b: 42"
 */
export const applyMixins = (
  derivedCtor: Constructor,
  baseConstructors: Array<Constructor>,
) => {
  baseConstructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      // derivedCtor.prototype[name] = baseCtor.prototype[name]
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null),
      )
    })
  })
  return baseConstructors
}

/**
 * @function Mixins 使用混入模式实现继承多个父类
 * @param {Constructor} BaseClass 基类
 * @param {Constructor[]} mixins 需要继承的类数组
 * @returns {} 继承自基类的类名
 *
 * @example
    class A {
      constructor(public aProp: string) { this.aProp = aProp }
      a() { console.log('a: ' + this.aProp) }
    }
    class B {
      constructor(public bProp: number) { this.bProp = bProp }
      b() { console.log('b: ' + this.bProp) }
    }

    // 使用 Mixins 函数创建 All 类，继承自 A, B
    const All = Mixins(
      class {
        aProp: string = ''
        bProp: number = 0
        constructor(aProp: string, bProp: number) {
          this.aProp = aProp
          this.bProp = bProp
        }
      },
      A,
      B,
    )
    const all = new All('test', 42) as IMixinsReturnType<typeof All>
    all.a() // 调用 A 的 a 方法，输出 "a: test"
    all.b() // 调用 B 的 b 方法，输出 "b: 42"
 */
export function Mixins<
  TBase extends Constructor,
  TMixins extends Constructor[],
>(
  BaseClass: TBase,
  ...mixins: TMixins
): TBase & UnionToIntersection<InstanceType<TMixins[number]>> {
  // 创建一个动态类继承自 BaseClass
  class Base extends BaseClass {
    // 保留构造函数，传递参数给基类以及执行初始化工作
    /* eslint-disable no-useless-constructor */
    constructor(...args: any[]) {
      super(...args)
      // 这里可以添加一些初始化代码，如果有的话
    }
  }

  // 将 mixins 中的所有方法拷贝到 Base 类
  mixins.forEach((mixin) => {
    Object.getOwnPropertyNames(mixin.prototype).forEach((name) => {
      const descriptor = Object.getOwnPropertyDescriptor(mixin.prototype, name)
      if (descriptor && name !== 'constructor') {
        Object.defineProperty(Base.prototype, name, descriptor)
      }
    })
  })

  return Base as TBase & UnionToIntersection<InstanceType<TMixins[number]>>
}
