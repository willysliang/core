/**
 * @ Author: willy
 * @ Create Time: 2023-11-03 11:20:57
 * @ Modifier by: willy
 * @ Modifier time: 2023-11-27 20:44:29
 * @ Description: 读取设定目录的所有文件
 */

import { reactive } from 'vue'

/** 单个文件的类型 */
interface IFileNode {
  filePath?: string
  fileName?: string
  children?: Record<string, IFileNode>
}

/** 文件地图类型 */
type IFileMap = Record<string, IFileNode>

/**
 * 读取设定目录下的所有文件
 * @returns {IFileMap} 文件列表（树形菜单）
 */
export const useReadPathFiles = () => {
  /** 获取设定目录的所有文件 */
  const modules = import.meta.glob('/**/*.md')

  /** 文件地图（属性菜单） */
  let fileMap: IFileMap = {}

  for (const path in modules) {
    /** 文件路径 */
    const filePath = path.slice(1, -3)

    /** 文件路径拆分开 */
    const dir: string[] = filePath.split('/')

    /** 初始化，从根节点开始遍历树形菜单 */
    let node = fileMap

    /** 根据文件路径组成树形菜单对象 */
    dir.forEach((curPath, index) => {
      /** 是否为目录 */
      const isDir = dir[index + 1] !== undefined

      /** 判断当前节点有没有子节点，否则创建对象来存储 */
      if (node[curPath] === undefined) {
        node[curPath] = {}
      }
      /** 判断当前节点的子节点有无节点，否则创建对象来存储 */
      if (node[curPath].children === undefined) {
        node[curPath].children = {}
      }

      /**
       * 1. 如果为目录，则取其子节点作为索引来继续进行
       * 2. 如果为文件，则进行赋值存储
       */
      if (isDir) {
        node = node[curPath].children as IFileMap
      } else {
        node[curPath] = {
          filePath: path,
          fileName: curPath,
        }
      }
    })
  }

  fileMap = reactive(fileMap)

  return {
    fileMap,
    modules,
  }
}
