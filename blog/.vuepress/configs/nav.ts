/**
 * @ Author: willy
 * @ CreateTime: 2024-02-26 19:54:14
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-27 21:04:11
 * @ Description: 导航栏
 */

import fs from 'node:fs'
import path from 'node:path'

/**
 * 获取目录中的所有文件/目录
 * @param directoryPath 目录地址
 * @param isGetFile 是否获取文件名,还是获取文件夹名
 * @param prefix 拼接的 path 前缀
 * @returns {any[]}
 *
 * @description 注意：此结构仅限于两层结构
 */
const getDirectoryPathFileNames = (
  directoryPath,
  isGetFile = true,
  prefix = '',
) => {
  const files = fs.readdirSync(directoryPath)
  const result: (string | Record<string, string>)[] = []

  const directoryPathList = [
    '前端基础',
    '前端框架',
    '前端算法',
    '前端进阶',
    '后端基础',
    '构建工具',
    '计算机网络',
  ]

  // files 参数是包含文件名的数组
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file)
    const stats = fs.statSync(filePath)

    // 如果是目录，并且在规定的文件目录下，则插入结果
    if (stats.isDirectory()) {
      if (!isGetFile && directoryPathList.includes(file)) result.push(file)
    } else if (isGetFile) {
      // 如果是文件，并且文件名以 md 结尾，则插入结果
      const curFileNames = file.split('.')
      if (file.endsWith('.md') && curFileNames.length >= 2) {
        const curFileName = curFileNames
          .slice(0, curFileNames.length - 1)
          .join('')
        result.push({
          filePath: `/${prefix}/${curFileName}`,
          fileName: curFileName,
        })
      }
    }
  })

  return result
}

/**
 * 指定需要列出文件的目录
 * @param rootDirectoryPath 根目录地址
 * @returns {object} 返回目录的所有文件
 */
const getAllFile = (rootDirectoryPath) => {
  const rootFolder = getDirectoryPathFileNames(rootDirectoryPath, false)
  const allFile: any = {}
  rootFolder.forEach((folderName) => {
    const curFolderPath = path.join(rootDirectoryPath, folderName as string)
    const curFileNames = getDirectoryPathFileNames(
      curFolderPath,
      true,
      folderName as string,
    )
    allFile[folderName as string] = curFileNames
  })

  return allFile
}

/**
 * 
 * @param allFile 所有的文件
 * @returns {any[]} 返回所有导航项
 * 
 * @description 逻辑分项
    1. 字符串类型
    2. 对象类型
    3. 数组类型
 */
const getAllNav = (allFile): any[] => {
  const allNav: any[] = []

  for (const key in allFile) {
    const file = allFile[key]

    if (typeof file === 'string') {
      // 字符串类型： '/bar/README.md'
      allNav.push(file)
    } else if (Array.isArray(file)) {
      // 数组类型： { text: '参考', children: [{ text: '组件', link: './a/b/' }] }
      const curItem = {
        text: key,
        children: [] as any[],
      }
      file.forEach((item) => {
        curItem.children.push({ text: item.fileName, link: item.filePath })
      })
      allNav.push(curItem)
    } else if (file && typeof file === 'object') {
      // 对象类型：{ text: '指南', link: '/前端基础/ES6+语法' }
      allNav.push({ text: file.fileName, link: file.filePath })
    }
  }
  return allNav
}

/** 仅获取 blog 目录目录下的文件 */
const rootDirectoryPath = path.join(__dirname, '../../')
const allFile = getAllFile(rootDirectoryPath)
const allNavs = getAllNav(allFile)

// 分享的导航栏
const shareNavs = [
  {
    text: '生态系统',
    children: [
      { text: 'HOME', link: 'https://willysliang.github.io/core' },
      { text: 'Vue3.x', link: 'https://v3.cn.vuejs.org/' },
      {
        text: 'Element Plus',
        link: 'https://element-plus.gitee.io/zh-CN/guide/design.html',
      },
    ],
  },
]

export default [...allNavs, ...shareNavs]
