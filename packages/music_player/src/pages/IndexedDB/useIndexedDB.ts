/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-use-before-define */
/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-20 11:27:05
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-20 11:27:07
 * @ Description: IndexedDB 数据库操作帮手 hooks
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

/** 跳出错误函数 */
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

/** IndexedDB 数据库操作帮手 */
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
