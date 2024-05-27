/* eslint-disable prefer-rest-params */
/* eslint-disable no-use-before-define */
/**
 * @ Author: willy
 * @ CreateTime: 2024-03-04 20:35:48
 * @ Modifier: willy
 * @ ModifierTime: 2024-03-05 21:17:36
 * @ Description: IndexedDB 数据库操作帮手
 */

declare global {
  interface Window {
    webkitIndexedDB?: IDBFactory
    mozIndexedDB?: IDBFactory
    msIndexedDB?: IDBFactory
    shimIndexedDB?: IDBFactory
  }
}

export interface IIndexedDBStore {
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

/** IndexedDB 配置参数约束 */
export interface IIndexedDBConfig {
  /** 数据库名 */
  dbName: string
  /** 对象仓库集合 */
  stores: IIndexedDBStore[]
  /** 数据库版本 */
  version?: number
  /** 初始化回调 */
  initCb?: () => void
}

/** 事务的模式：只读 | 读写 | 版本更改 */
export type ITransactionMode = 'readonly' | 'readwrite' | 'versionchange'

/**
 * @class IndexedDBHelper
 * @description Indexed 数据库操作帮手
 *
 * @example
    const dbInit = new IndexedDBHelper({
      dbName: 'test',
      version: 1,
      stores: [
        {
          name: 'userCopy',
          primaryKey: 'id',
          indexList: [{ name: 'name', unique: false }],
          isClear: false,
        },
      ],
    })
    const db = await dbInit.initRequestHandler()
    const storeName = 'userCopy'
    const addPrimaryKey = await db.add('userCopy', { name: 1023, a: 2312, b: 2312, c: 1312 })
    console.log('ADD==>', addPrimaryKey)
    const getData = await db.get('userCopy', 7)
    console.log('GET==>', getData)

    await db.update(storeName, {
      id: 11,
      name: 210,
      a: 21,
      b: 21,
      c: 21,
    })
    await db.delete(storeName, 11)
    const getAll = await db.getAll(storeName)
    console.log('GET_All==>', getAll)
 */
export class IndexedDBHelper {
  /** 单例模式实例 */
  static dbInstance: IndexedDBHelper | undefined
  /** 数据库 */
  private indexedDb?: IDBFactory
  /** 数据库对象 */
  private db: IDBDatabase | null = null
  /** 数据库配置信息 */
  private readonly dbConfig?: IIndexedDBConfig
  /** 数据库请求对象 */
  public dbReq?: IDBOpenDBRequest

  constructor(dbConfig: IIndexedDBConfig) {
    // 实现单次创建 IndexedDB 对象
    if (IndexedDBHelper.dbInstance) {
      return IndexedDBHelper.dbInstance
    }

    // 检查是否支持 IndexedDB 对象，如果支持泽取相应的 indexedDB API
    const indexedDb =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB ||
      window.shimIndexedDB
    if (!indexedDb) {
      this.throwError(IndexedDBHelper.name, '您的浏览器不支持IndexedDB')
      return
    }

    this.indexedDb = indexedDb
    this.dbConfig = dbConfig
    this.initRequestHandler()
  }

  /** 抛出异常错误 */
  private throwError(name: string, content: string = '程序错误', data?: any) {
    if (data) console.error(data)
    throw new Error(`IndexedDB 错误异常 --> ${name}: ${content}`)
  }

  /** 去除 proxy（主要针对 vue3 中响应式数据内置的 proxy 对象） */
  private removeProxy(data) {
    return JSON.parse(JSON.stringify(data))
  }

  /**
   *
   * @param storeName 仓库名称
   * @param data 数据对象
   * @returns {Promise<IDBValidKey>}
   * @example
   *  const addPrimaryKey = await db.add('userCopy', { name: 1023, a: 1, b: 2312 })
   */
  public add(storeName: string, data: any): Promise<IDBValidKey> {
    return new Promise((resolve, reject) => {
      const req = this.beginTransaction(storeName).add(this.removeProxy(data))

      req.onsuccess = (event: any) => {
        console.log('数据库信息添加成功', ...arguments)
        resolve(event.target.result)
      }
      req.onerror = (event: any) => {
        this.throwError(IndexedDBHelper.name, '数据库信息添加失败', {
          arguments,
          event,
        })
        reject(event.target.error)
      }
    })
  }

  /**
   * @function get 获取单条数据
   * @param storeName 仓库名称
   * @param primaryKey 主键的值
   * @returns {Promise<any>}
   * @example
   *  const getData = await db.get('userCopy', 1)
   */
  public get(
    storeName: string,
    primaryKey: IDBValidKey | IDBKeyRange,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.beginTransaction(storeName)
      const req = transaction.get(primaryKey)

      req.onsuccess = (event: any) => {
        const result = event.target.result
        console.log(
          this.get.name,
          '数据库信息查找成功',
          ...arguments,
          result ? `查找到数据: ${result}` : '没有查找到相关数据',
        )
        resolve(result)
      }
      req.onerror = (event: any) => {
        this.throwError(IndexedDBHelper.name, '数据库信息获取失败', {
          arguments,
          event,
        })
        reject(event.target.error)
      }
    })
  }

  /**
   * 获取所有数据
   * @param storeName 仓库名称
   * @returns {Promise<any[]>}
   * @example
   *  const getAll = await db.getAll(storeName)
   */
  public getAll(storeName: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const req = this.beginTransaction(storeName).openCursor()
      const res: any[] = []
      req.onsuccess = (event: any) => {
        console.log(this.getAll.name, '数据库信息获取成功', ...arguments)

        // cursor: 游标对象，可以遍历一个对象存储空间（Object Store）中的所有数据
        const cursor = event.target.result
        // 游标不存在，说明遍历完所有数据
        if (cursor) {
          res.push({ id: cursor.key, ...cursor.value })
          // 游标移动到下一条数据
          cursor.continue()
        } else {
          resolve(res)
        }
      }
      req.onerror = (event: any) => {
        this.throwError(IndexedDBHelper.name, '数据库信息获取失败', {
          arguments,
          event,
        })
        reject(event.target.error)
      }
    })
  }

  /**
   * 通过索引获取相应数据（即只查找出存在该索引值的数据）
   * @param storeName 仓库名称
   * @param indexName 索引名
   * @returns {Promise<any>}
   * @example
      await db.update(storeName, { id: 11, c: 21 }) // 插入一条没有 name 的数据
      const getAll = await db.getByIndex(storeName, 'name') // 将会查询不到上述插入的数据
   */
  public getByIndex(storeName: string, indexName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const req = this.beginTransaction(storeName).index(indexName).openCursor()
      const res: any[] = []
      req.onsuccess = (event: any) => {
        console.log(this.getByIndex.name, '数据库信息获取成功', ...arguments)
        const cursor = event.target.result
        if (cursor) {
          res.push({ id: cursor.key, ...cursor.value })
          cursor.continue()
        } else {
          resolve(res)
        }
      }
      req.onerror = (event: any) => {
        this.throwError(IndexedDBHelper.name, '数据库信息获取失败', {
          arguments,
          event,
        })
        reject(event.target.error)
      }
    })
  }

  /**
   * 更新数据
   * @param {string} storeName 仓库名称
   * @param {Record<string, any>} data 更新的数据（一般是已经包含 primaryKey 在里面的整齐数据）
   * @param {IDBValidKey} primaryKey 主键的值（建议忽略不传递，直接包含在 data 的数据中）
   * @returns {Promise<IDBValidKey>}
   * @example
      await db.update(storeName, {
        id: 11,
        name: 210,
        a: 21,
        b: 21,
        c: 21,
      }) // 将会更新 id 为 11 的数据
   */
  public update(
    storeName: string,
    data: any,
    primaryKey?: IDBValidKey,
  ): Promise<IDBValidKey> {
    return new Promise((resolve, reject) => {
      const req = this.beginTransaction(storeName).put(data, primaryKey)

      req.onsuccess = (event: any) => {
        console.log(this.update.name, '数据库信息设置成功', ...arguments)
        resolve(event.target.result)
      }
      req.onerror = (event: any) => {
        this.throwError(IndexedDBHelper.name, '数据库信息设置失败', {
          arguments,
          event,
        })
        reject(event.target.error)
      }
    })
  }

  /**
   * 删除数据
   * @param storeName 仓库名称
   * @param primaryKey 主键的值
   * @returns {Promise<undefined>}
   * @example
   *  await db.delete(storeName, 11)
   */
  public delete(
    storeName: string,
    primaryKey: IDBValidKey,
  ): Promise<undefined> {
    return new Promise((resolve, reject) => {
      const req = this.beginTransaction(storeName).delete(primaryKey)

      req.onsuccess = (event: any) => {
        console.log(this.delete.name, '数据库信息删除成功', ...arguments)
        resolve(event.target.result)
      }
      req.onerror = (event: any) => {
        this.throwError(IndexedDBHelper.name, '数据库信息删除失败', {
          arguments,
          event,
        })
        reject(event.target.error)
      }
    })
  }

  /**
   * 查询出仓库的条数
   * @param storeName 仓库名称
   * @returns {Promise<number>}
   * @example
   *  const count = await db.count(storeName)
   */
  public count(storeName: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const req = this.beginTransaction(storeName, 'readonly').count()

      req.onsuccess = (event: any) => {
        console.log('数据库条数获取成功', ...arguments)
        resolve(event.target.result)
      }
      req.onerror = (event: any) => {
        this.throwError(IndexedDBHelper.name, '数据库条数获取失败', {
          arguments,
          event,
        })
        reject(event.target.error)
      }
    })
  }

  /** 开始事务 */
  private beginTransaction(
    storeName: string,
    mode: ITransactionMode = 'readwrite',
  ): IDBObjectStore {
    const transaction = this.db!.transaction(storeName, mode)

    transaction.onerror = (event) => {
      this.throwError(IndexedDBHelper.name, '事务创建失败!', event)
    }
    transaction.oncomplete = () => {
      console.log('数据库修改结束，事务完成')
    }

    return transaction.objectStore(storeName)
  }

  /** 建表 */
  private createStore(
    store: IIndexedDBStore,
    db: IDBDatabase = this.db!,
  ): void {
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

  /** 打开数据库初始化 */
  public async initRequestHandler(): Promise<IndexedDBHelper> {
    return new Promise((resolve) => {
      // 实现单次创建 IndexedDB 对象
      if (IndexedDBHelper.dbInstance) {
        resolve(IndexedDBHelper.dbInstance)
      }

      const { dbName, version } = this.dbConfig!
      const dbReq = this.indexedDb!.open(dbName, version)
      this.dbReq = dbReq

      /** 连接被阻止 */
      dbReq.onerror = (event) => {
        this.throwError(IndexedDBHelper.name, 'IndexedDB数据库连接失败', event)
      }

      /** 连接被阻止 */
      dbReq.onblocked = (event) => {
        this.throwError(
          IndexedDBHelper.name,
          'IndexedDB数据库连接被阻止',
          event,
        )
      }

      /** 成功打开数据库 */
      dbReq.onsuccess = () => {
        console.log('数据库连接成功')
        this.db = dbReq.result

        IndexedDBHelper.dbInstance = this
        resolve(this)
      }

      /** 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件 */
      dbReq.onupgradeneeded = (event) => {
        const db: IDBDatabase = (event as any).target?.result
        const dbInfo = this.dbConfig!
        dbInfo.stores.forEach((store) => {
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
    })
  }
}
