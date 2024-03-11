/* eslint-disable prefer-rest-params */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */

/** 项目中处理用到的类型，枚举值对应 */
enum Type {
  NUMBER = 'Number',
  STRING = 'String',
  BOOLEAN = 'Boolean',
  NULL = 'Null',
  UNDEFINED = 'Undefined',
  SYMBOL = 'Symbol',
  BIGINT = 'BigInt',
  REGEXP = 'RegExp',
  OBJECT = 'Object',
  FUNCTION = 'Function',
  ERROR = 'Error',
  ARRAY = 'Array',
  SET = 'Set',
  MAP = 'Map',
  DATE = 'Date',
  WINDOW = 'Window',
  HTML_ELEMENT = 'HTMLElement',
}

function getType (data: any): string {
  return Object.prototype.toString.call(data).slice(8, -1)
}

/** 将枚举类型的枚举值转换成数组 */
function switchEnumValueToList (enumType: any): any[] {
  const list: any[] = []
  for (const i in enumType) {
    list.push(enumType[i])
  }
  return list
}

const processableTypeList: Type[] = switchEnumValueToList(Type)

/** 获取对象的所有键，包括不可枚举的键 */
export function getObjAllKeys (obj: any): Array<string | number> {
  const type = getType(obj)
  switch (type) {
    case Type.MAP: {
      return switchIteratorValueToList((obj as Map<any, any>).keys())
    }
    case Type.ARRAY: {
      return (obj as Array<any>).map((_, index) => index)
    }
    default: {
      return type !== Type.OBJECT ? [] : Object.getOwnPropertyNames(obj)
    }
  }
}

/** 获取迭代器所有value，生成list */
function switchIteratorValueToList (iterator: IterableIterator<any>): any[] {
  const list: any[] = []
  while (true) {
    const { value, done } = iterator.next()
    if (done) {
      break
    }
    list.push(value)
  }
  return list
}

export function safeJSONParse (data: string, defaultValue: any = {}): any {
  try {
    JSON.parse(data || JSON.stringify(defaultValue))
  } catch (error) {
    throwError(safeJSONParse.name, 'JSON解析错误')
    return defaultValue
  }
}

export function throwError (
  name: string,
  content = '程序错误',
  data?: any,
): void {
  if (data) {
    console.error(data)
  }
  throw new Error(`${content}, name: ${name}`)
}

export function JSONStringify (data: any): string {
  let [prefix, suffix] = ['', '']
  const type = getType(data)

  /** 先根据类型判断需要采用何种格式 */
  switch (type) {
    case Type.OBJECT: {
      prefix = '{'
      suffix = '}'
      break
    }
    case Type.ARRAY: {
      prefix = '['
      suffix = ']'
      break
    }
    case Type.MAP: {
      prefix = `Map(${data.size}){`
      suffix = '}'
      break
    }
    case Type.SET: {
      prefix = `Set(${data.size}){`
      suffix = '}'
      data = [...data]
      break
    }
    case Type.ERROR: {
      return `Error: ${JSONStringify(data.message)}`
    }
    case Type.REGEXP: {
      return data.toString()
    }
    default: {
      return JSON.stringify(data)
    }
  }

  let str = prefix
  const keys = getObjAllKeys(data)

  for (const [index, key] of keys.entries()) {
    let value = data[key]
    if (type === Type.MAP) {
      value = data.get(key)
    }
    if (type !== Type.ARRAY) {
      const keyType = getType(key)
      switch (keyType) {
        case Type.OBJECT:
        case Type.ARRAY:
        case Type.SET:
        case Type.SYMBOL:
          str += Object.prototype.toString.call(key)
          break
        default:
          str += key
      }
      str += ': '
    }

    let valueType = getType(value)
    if (isDom(valueType)) {
      valueType = Type.HTML_ELEMENT
    }
    switch (valueType) {
      case Type.ARRAY:
      case Type.OBJECT:
        str += JSONStringify(value)
        break
      case Type.REGEXP:
        str += value.toString()
        break
      case Type.FUNCTION:
        str += String(value)
        break
      case Type.SYMBOL:
        str += String(value)
        break
      case Type.HTML_ELEMENT:
        str += stringifyDOM(value)
        break
      case Type.ERROR:
        str += `Error: ${JSONStringify(value.message)}`
        break
      case Type.BIGINT:
        str += `${value.toString()}n`
        break
      case Type.NUMBER:
        str += Object.is(NaN, value) ? 'NaN' : JSON.stringify(value)
        break
      default:
        str += JSON.stringify(value)
    }
    if (index < keys.length - 1) {
      str += ', '
    }
  }
  str += suffix
  return str
}

/** 将dom转化为字符串 */
export function stringifyDOM (dom: HTMLElement): string {
  let eDiv: HTMLElement | null = document.createElement('div')
  eDiv.appendChild(dom.cloneNode(true))
  const domStr = eDiv.innerHTML
  eDiv = null
  return domStr
}

/** 获取对象所有自身属性名集合(包括不可枚举) */
export function getObjOwnKeyList (obj: any): string[] {
  return Object.getOwnPropertyNames(obj)
}

// judger.ts

export function isDom (type: string): boolean {
  return /^HTML/.test(type)
}

export function isUndefined (data: any): boolean {
  return data === undefined
}

export function isNull (data: any): boolean {
  return data === null
}

export function isMac (): boolean {
  return /macintosh|mac os x/i.test(navigator.userAgent)
}

/** 是否本身拥有的属性，不是通过原型链向上查找的 */
export function isOwnAttr (target: Record<string, any>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(target, key)
}

/** 判断对象中是否存在循环引用 */
export function isCyclic (obj: any): boolean {
  const stackSet = new Set()
  const detect = (data: any): boolean => {
    if (data && typeof data !== 'object') {
      return false
    }
    if (stackSet.has(data)) {
      return true
    }
    stackSet.add(data)

    // 遍历对象所有自身属性
    getObjOwnKeyList(data).forEach((key) => {
      detect(data[key])
    })

    stackSet.delete(data)
    return false
  }

  return detect(obj)
}

/** 判断对象是否为window */
export function isWindow (data: any): boolean {
  return getType(data) === Type.WINDOW
}

/** 由于JSON.stringify固有问题，只能在确保可以直接转换时才可使用 */
export function simpleDeepCopy (data: any): any {
  return JSON.parse(JSON.stringify(data))
}

// localSave.ts

export function setLocalStorage (key: string, val: any): void {
  localStorage.setItem(key, JSON.stringify(val))
}

export function getLocalStorage (key: string): any {
  const val = localStorage.getItem(key)
  if (isNull(val)) {
    throwError(getLocalStorage.name, `localStorage中没有指定key:${key}`)
  }
  return safeJSONParse(val!)
}

export function setSessionStorage (key: string, val: any): void {
  sessionStorage.setItem(key, JSON.stringify(val))
}

export function getSessionStorage (key: string): any {
  const val = sessionStorage.getItem(key)
  if (isNull(val)) {
    throwError(getSessionStorage.name, `sessionStorage中没有指定key:${key}`)
  }
  return safeJSONParse(val!)
}

// indexedDB

/**
 * 对于上一个版本(v3)来说，虽然是纯前端项目，但需要存储的数据量不大，完全可以使用sessionStorage和localStorage来应付。
 * 在v4中新增了可以存储自定义模板的功能，因为无法预知自定义模板的数据大小，所以使用indexedDB更加保险。
 */

interface IndexedDBStore {
  /** 对象仓库名称 */
  name: string
  /** 主键名称 */
  primaryKey: string
  /** 索引列表 key：索引名称 value：是否可以重复 */
  indexList: {
    name: string
    unique: boolean
  }[]
  /** 版本更新时是否需要删除原来的仓库 */
  isClear: boolean
}

interface IndexedDBConfig {
  /** 数据库名 */
  dbName: string
  /** 对象仓库集合 */
  stores: IndexedDBStore[]
  /** 数据库版本 */
  version?: number
  /** 初始化回调 */
  initCb?: () => void
}

type TransactionMode = 'readonly' | 'readwrite' | 'versionchange'

declare global {
  interface Window {
    webkitIndexedDB?: IDBFactory
    mozIndexedDB?: IDBFactory
    msIndexedDB?: IDBFactory
  }
}

export class IndexedDBHelper {
  /** 单例模式实例 */
  static dbInstance: IndexedDBHelper
  /** 数据库 */
  private indexedDb?: IDBFactory
  /** 数据库对象 */
  private db: IDBDatabase | null = null
  /** 数据库信息 */
  private readonly dbInfo?: IndexedDBConfig
  /** 数据库请求对象 */
  private readonly dbReq?: IDBOpenDBRequest

  constructor (config: IndexedDBConfig) {
    if (IndexedDBHelper.dbInstance) {
      return IndexedDBHelper.dbInstance
    }

    const indexedDb =
      window.indexedDB ||
      window.webkitIndexedDB ||
      window.mozIndexedDB ||
      window.msIndexedDB
    if (!indexedDb) {
      throwError(IndexedDBHelper.name, '您的浏览器不支持IndexedDB')
    }

    this.indexedDb = indexedDb
    this.dbInfo = config
    this.dbReq = this.open()
    this.initRequestHandler()
    IndexedDBHelper.dbInstance = this
  }

  /** 去除 proxy（主要针对 vue3 中响应式数据内置的 proxy 对象） */
  private removeProxy (data) {
    return JSON.parse(JSON.stringify(data))
  }

  /** 添加单条数据 */
  public add (storeName: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const req = this.beginTransaction(storeName).add(this.removeProxy(data))

      req.onsuccess = (event) => {
        console.log('数据库信息添加成功', ...arguments)
        resolve(event)
      }
      req.onerror = (event) => {
        throwError(IndexedDBHelper.name, '数据库信息添加失败', {
          arguments,
          event,
        })
        reject(event)
      }
    })
  }

  /** 获取单条数据 */
  public get (storeName: string, primaryKey: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const req = this.beginTransaction(storeName).get(primaryKey)

      req.onsuccess = (event) => {
        console.log('数据库信息获取成功', ...arguments)
        resolve(event)
      }
      req.onerror = (event) => {
        throwError(IndexedDBHelper.name, '数据库信息获取失败', {
          arguments,
          event,
        })
        reject(event)
      }
    })
  }

  /** 获取所有数据 */
  public getAll (storeName: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const req = this.beginTransaction(storeName).openCursor()
      const res: any[] = []
      req.onsuccess = (event: any) => {
        console.log('数据库信息获取成功', ...arguments)
        const cursor = event.target.result
        if (cursor) {
          res.push({ id: cursor.key, ...cursor.value })
          cursor.continue()
        } else {
          resolve(res)
        }
      }
      req.onerror = (event) => {
        throwError(IndexedDBHelper.name, '数据库信息获取失败', {
          arguments,
          event,
        })
        reject(event)
      }
    })
  }

  /** 通过索引获取相应数据 */
  public getByIndex (storeName: string, indexName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const req = this.beginTransaction(storeName).index(indexName).openCursor()
      const res: any[] = []
      req.onsuccess = (event: any) => {
        console.log('getAll数据库信息获取成功', ...arguments)
        const cursor = event.target.result
        if (cursor) {
          res.push({ id: cursor.key, ...cursor.value })
          cursor.continue()
        } else {
          resolve(res)
        }
      }
      req.onerror = (event) => {
        throwError(IndexedDBHelper.name, '数据库信息获取失败', {
          arguments,
          event,
        })
        reject(event)
      }
    })
  }

  /** 更新数据 */
  public update (
    storeName: string,
    data: any,
    primaryKey?: string,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const req = this.beginTransaction(storeName).put(data, primaryKey)

      req.onsuccess = (event) => {
        console.log('数据库信息设置成功', ...arguments)
        resolve(event)
      }
      req.onerror = (event) => {
        throwError(IndexedDBHelper.name, '数据库信息设置失败', {
          arguments,
          event,
        })
        reject(event)
      }
    })
  }

  /** 删除数据 */
  public delete (storeName: string, primaryKey: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const req = this.beginTransaction(storeName).delete(primaryKey)

      req.onsuccess = (event) => {
        console.log('数据库信息删除成功', ...arguments)
        resolve(event)
      }
      req.onerror = (event) => {
        throwError(IndexedDBHelper.name, '数据库信息删除失败', {
          arguments,
          event,
        })
        reject(event)
      }
    })
  }

  public count (storeName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const req = this.beginTransaction(storeName, 'readonly').count()

      req.onsuccess = (event) => {
        console.log('数据库条数获取成功', ...arguments)
        resolve(event)
      }
      req.onerror = (event) => {
        throwError(IndexedDBHelper.name, '数据库条数获取失败', {
          arguments,
          event,
        })
        reject(event)
      }
    })
  }

  /** 打开数据库 */
  private open (): IDBOpenDBRequest {
    const { dbName, version } = this.dbInfo as IndexedDBConfig
    return this.indexedDb!.open(dbName, version)
  }

  /** 初始化助手 */
  private initRequestHandler (): void {
    const dbReq = this.dbReq
    /** 连接被阻止 */
    dbReq!.onerror = (event) => {
      throwError(IndexedDBHelper.name, 'IndexedDB数据库连接失败', event)
    }

    /** 连接被阻止 */
    dbReq!.onblocked = (event) => {
      throwError(IndexedDBHelper.name, 'IndexedDB数据库连接被阻止', event)
    }

    /** 成功打开数据库 */
    dbReq!.onsuccess = (event) => {
      console.log('数据库连接成功')
      this.db = dbReq!.result
      this.dbInfo!.initCb?.()
    }

    /** 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件 */
    dbReq!.onupgradeneeded = (event) => {
      const db: IDBDatabase = (event as any).target?.result
      const dbInfo = this.dbInfo
      dbInfo!.stores.forEach((store) => {
        const { isClear, name } = store
        if (db.objectStoreNames.contains(name)) {
          if (!isClear) {
            return
          }
          // 删除旧仓库
          db.deleteObjectStore(name)
        }
        this.createStore(store, db)
      })
    }
  }

  /** 建表 */
  private createStore (store: IndexedDBStore, db: IDBDatabase = this.db!): void {
    const { name, primaryKey, indexList } = store
    const newStore = db.createObjectStore(name, {
      keyPath: primaryKey, // 主键
      autoIncrement: true, // 自增
    })
    indexList.forEach((index) => {
      const { name, unique } = index
      // 新建索引，三个参数分别为索引名称、索引所在的属性、配置对象
      newStore.createIndex(name, name, { unique })
    })
  }

  private beginTransaction (
    storeName: string,
    mode: TransactionMode = 'readwrite',
  ): IDBObjectStore {
    const transaction = this.db?.transaction(storeName, mode)

    transaction!.onerror = (event) => {
      throwError(IndexedDBHelper.name, '事务创建失败!', event)
    }
    transaction!.oncomplete = (event) => {
      console.log('数据库修改结束，事务完成')
    }

    return transaction!.objectStore(storeName)
  }
}

/**
 * 以下为indexedDB数据结构
 */

const enum IndexedDBStoreName {
  CUSTOM_TEMPLATE = 'customTemplate',
}

interface ICustomTemplate {
  id: number
  /** 模板名称 */
  name: string
  /** 模板代码 */
  code: {
    html: string
    css: string
    javaScript: string
  }
}
