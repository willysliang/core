/**
 * @ Author: willy
 * @ CreateTime: 2024-02-23 17:16:37
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-23 18:38:05
 * @ Description: 有效时长的缓存类（包含 localStorage、sessionstorage、cookie）
 */

/** 默认缓存时间为 7 天 */
export const DEFAULT_CACHE_TIME = 1000 * 60 * 60 * 24 * 7

/**
 * 本地缓存类
 * @class MyStorage
 *
 * @param {string=} prefixKey - 要缓存的 KEY 值的前缀
 * @param {Object} [storage=localStorage] - 分为 sessionStorage | localStorage 两种类型
 */
export class MyStorage {
  private storage: Storage
  private prefixKey: string

  constructor(storage: Storage = localStorage, prefixKey = 'WILLY') {
    this.prefixKey = prefixKey
    this.storage = storage
  }

  private getKey(key: string) {
    return `${this.prefixKey}_${key}__`.toUpperCase()
  }

  /**
   * @description 设置缓存
   * @param {string} key 缓存键
   * @param {*} value 缓存值
   * @param expire 缓存有效期时长，单位毫秒
   */
  set(key: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
    const stringData = JSON.stringify({
      value,
      expire: expire !== null ? new Date().getTime() + expire : null,
    })
    this.storage.setItem(this.getKey(key), stringData)
  }

  /**
   * 读取缓存
   * @param {string} key 缓存键
   * @param {*=} defaultValue 默认值
   */
  get<T = any>(key: string, defaultValue: any = null): T {
    const item = this.storage.getItem(this.getKey(key))
    if (item) {
      try {
        const data = JSON.parse(item)
        const { value, expire } = data

        // 在有效期内直接返回，否则移除缓存的 key 值
        if (expire === null || expire >= Date.now()) {
          return value
        } else {
          this.remove(this.getKey(key))
        }
      } catch (e) {
        return defaultValue
      }
    }
    return defaultValue
  }

  /**
   * 从缓存删除某项
   * @param {string} key 要移除的缓存 KEY 值
   */
  remove(key: string) {
    this.storage.removeItem(this.getKey(key))
  }

  /**
   * 清空所有缓存
   * @memberOf Cache
   */
  clear(): void {
    this.storage.clear()
  }

  /* ------------------------------------ cookie ------------------------------------- */
  /**
   * 设置cookie
   * @param {string} name cookie 名称
   * @param {*} value cookie 值
   * @param {number=} expire 过期时间
   * 如果过期时间没有设置数值，默认关闭浏览器自动删除
   * @example
   */
  setCookie(
    name: string,
    value: any,
    expire: number | null = DEFAULT_CACHE_TIME / 1000,
  ) {
    document.cookie = `${this.getKey(name)}=${value}; Max-Age=${expire}`
  }

  /**
   * 根据名字获取cookie值
   * @param name
   */
  getCookie(name: string): string {
    const cookieArr = document.cookie.split('; ')
    for (let i = 0, length = cookieArr.length; i < length; i++) {
      const kv = cookieArr[i].split('=')
      if (kv[0] === this.getKey(name)) {
        return kv[1]
      }
    }
    return ''
  }

  /**
   * 根据名字删除指定的cookie
   * @param {string} key
   */
  removeCookie(key: string) {
    this.setCookie(key, 1, -1)
  }

  /**
   * 清空cookie，使所有cookie失效
   */
  clearCookie(): void {
    const keys = document.cookie.match(/[^ =;]+(?==)/g)
    if (keys) {
      for (let i = keys.length; i; i--) {
        document.cookie = `${keys[i]}=0;expire=${new Date(0).toUTCString()}`
      }
    }
  }
}
