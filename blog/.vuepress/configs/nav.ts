/**
 * @ Author: willy
 * @ CreateTime: 2024-02-26 19:54:14
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-06-10 22:58:58
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
    '学海无涯',
  ]

  // 忽略的md名单 （只要 md 文件名存在这个名，则忽略这个文件的构建）
  const ignoreMdList = ['前端面试', '杂记']

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

        if (!ignoreMdList.some((item) => curFileName.includes(item))) {
          result.push({
            filePath: `/${prefix}/${curFileName}`,
            fileName: curFileName,
          })
        }
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
    text: 'HOME',
    children: [
      // { text: '记录', link: '/RECORD' },
      { text: '案例系统', link: 'https://willysliang.github.io/core' },
      { text: '旧版仓库', link: 'https://github.com/willysliang/portfolio' },
      {
        text: '旧版音乐仓库',
        link: 'https://github.com/willysliang/music-player',
      },
      {
        text: '提交日志',
        link: 'https://api.github.com/repos/willysliang/core/commits',
      },
    ],
  },
]

export default [...allNavs, ...shareNavs]
