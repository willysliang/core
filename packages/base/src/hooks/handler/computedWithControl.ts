/**
 * @ Author: willysliang
 * @ CreateTime: 2024-08-23 09:20:43
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-08-23 10:12:43
 * @ Description: 响应式实现 computed 的非响应式数据变化
 */

import type {
  ComputedGetter,
  ComputedRef,
  WatchSource,
  WritableComputedOptions,
  WritableComputedRef,
} from 'vue'
import { customRef, ref, watch } from 'vue'

/**
 * 因为非响应式数据变化时，computed 不会触发更新
 */

export interface ComputedWithControlRefExtra {
  /** 手动调用更新 */
  trigger(): void
}
export interface ComputedRefWithControl<T>
  extends ComputedRef<T>,
    ComputedWithControlRefExtra {}
export interface WritableComputedRefWithControl<T>
  extends WritableComputedRef<T>,
    ComputedWithControlRefExtra {}

/**
 * 响应式实现 computed 的非响应式数据变化
 */
export function computedWithControl<T, S>(
  /** 监听源 */
  source: WatchSource<S> | WatchSource<S>[],
  /** 计算函数 */
  fn: ComputedGetter<T>,
): ComputedRefWithControl<T>

export function computedWithControl<T, S>(
  /** 监听源 */
  source: WatchSource<S> | WatchSource<S>[],
  /** 计算函数 */
  fn: WritableComputedOptions<T>,
): WritableComputedRefWithControl<T>

export function computedWithControl<T, S>(
  /** 监听源 */
  source: WatchSource<S> | WatchSource<S>[],
  /** 计算函数 */
  fn: ComputedGetter<T> | WritableComputedOptions<T>,
) {
  let v: T = undefined!
  let track: () => void
  let trigger: () => void
  const dirty = ref<boolean>(true)

  /** 更新函数：每次都能触发 computed 的更新 */
  const update = () => {
    dirty.value = true
    trigger()
  }

  // 检测数据变化触发更新
  watch(source, update, { flush: 'sync' })

  const get = typeof fn === 'function' ? fn : fn.get
  const set = typeof fn === 'function' ? undefined : fn.set

  const result = customRef<T>((_track, _trigger) => {
    track = _track
    trigger = _trigger

    return {
      get: () => {
        if (dirty.value) {
          v = get()
          dirty.value = false
        }
        track()
        return v
      },
      set: (value) => {
        set?.(value)
      },
    }
  }) as ComputedRefWithControl<T>

  // 将 update 返回，提供一个手动更新的途径
  if (Object.isExtensible(result)) result.trigger = update

  return result
}
