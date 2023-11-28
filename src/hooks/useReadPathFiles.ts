/**
 * @ Author: willy
 * @ CreateTime: 2023-11-28 10:23:13
 * @ Modifier: willy
 * @ ModifierTime: 2023-11-28 21:30:44
 * @ Description: 读取设定目录的所有文件
 */

import { reactive } from 'vue'
import { isEnvProd } from '@utils/url'

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

  const urlPathname = new URL(location.href).pathname.split('/').slice(0, -1)

  /**
   * url 前缀
   * 在 正式环境 且 url 的 pathname 不是非 /*.html(存在多级的情况), 需要添加 url 前缀
   */
  const prefixUrl: string =
    isEnvProd && urlPathname.length > 1 ? urlPathname.join('/') : ''

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
        const filePath = `${prefixUrl}${
          path.startsWith('/blog/') && isEnvProd ? path.slice(5) : path
        }`
        node[curPath] = {
          filePath,
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
