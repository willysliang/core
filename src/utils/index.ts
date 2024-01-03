/**
 * @ Author: willy
 * @ Create Time: 2023-10-27 17:30:27
 * @ Modifier by: willy
 * @ Modifier time: 2023-10-27 18:10:08
 * @ Description: 工具类汇集
 */

export * from './utils'
export * from './common'
export * from './cssUtils'
export * from './app'
export * from './format'
export * from './random'

export const modules = import.meta.glob('./*.ts')

/**
 * @description 获取所有模块
 * @returns {Promise<{string, any}>} 返回一个对象，key是函数名，value是函数体拿来执行
 *
 * @test
 *  getAllUtils().then((all) => {
      console.log(all.format_cutCNLetter('aaa'))
    })
 */
export const getAllUtils = async (): Promise<Record<string, any>> => {
  const allUtils: Record<string, unknown> = {}

  return await new Promise((resolve) => {
    for (const path in modules) {
      modules[path]()
        .then((mod) => {
          const name = path.replace(/^\.\/|\/$/g, '').replace(/\.ts$/, '')
          const exports: any = mod
          for (const key in exports) {
            if (typeof exports[key] === 'function') {
              allUtils[`${name}_${key}`] = exports[key]
            }
          }
        })
        .catch((err) => {
          throw new Error(err)
        })
        .finally(() => {
          resolve(allUtils)
        })
    }
  })
}
