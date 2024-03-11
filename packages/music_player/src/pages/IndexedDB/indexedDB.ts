/**
 * @ Author: willysliang
 * @ Create Time: 2023-01-12 18:10:40
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-15 20:31:31
 * @ Description: indexedDB
 */

import { getUserTX, getDB } from './indexedDBInit'

// 去除proxy
const removeProxy = (data) => JSON.parse(JSON.stringify(data))

// 新增
const add = (data) =>
  new Promise((resolve, reject) => {
    const request = getUserTX().add(removeProxy(data))

    request.onsuccess = (event) => resolve(event)
    request.onerror = (event) => reject(event)
  })

//   获取单个
const read = (id) =>
  new Promise((resolve, reject) => {
    const request = getUserTX().get(id)

    request.onsuccess = (event) => resolve(event)
    request.onerror = (event) => reject(event)
  })

//   获取所有
const readAll = () =>
  new Promise((resolve) => {
    const objectStore = getUserTX()
    const rst: any[] = []
    objectStore.openCursor().onsuccess = (event) => {
      const cursor = event.target.result
      if (cursor) {
        rst.push({
          id: cursor.key,
          name: cursor.value.name,
          age: cursor.value.age,
          sex: cursor.value.sex,
        })
        cursor.continue()
      } else {
        resolve(rst)
      }
    }
  })

//   更新
const update = (data) =>
  new Promise((resolve, reject) => {
    const request = getUserTX().put(data)

    request.onsuccess = (event) => resolve(event)
    request.onerror = (event) => reject(event)
  })

// 删除
const remove = (id) =>
  new Promise((resolve, reject) => {
    const request = getUserTX().delete(id)

    request.onsuccess = (event) => resolve(event)
    request.onerror = (event) => reject(event)
  })

// 通过建立的name索引来查询
const searchByName = (name) =>
  new Promise((resolve, reject) => {
    const request = getUserTX().index('name').get(name)

    request.onsuccess = (event) => resolve(event.target.result)
    request.onerror = (event) => reject(event)
  })

export { add, read, readAll, update, remove, getDB, searchByName }
