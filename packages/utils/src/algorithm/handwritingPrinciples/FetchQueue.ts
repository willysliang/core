/**
 * @ Author: willy
 * @ CreateTime: 2024-04-24 18:17:18
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-24 20:27:18
 * @ Description: 带并发数限制的fetch请求函数
 */

import { logger } from '../../utils'

/** 模拟fetch请求 */
const handleFetch = function (url, delay = Math.random() * 1e4) {
  return new Promise((resolve) => {
    console.log(`\t\tsending request: [${url}] >> [${delay}ms]`)
    setTimeout(() => {
      console.log(`\t\t-------- done:[${url}] >> [${delay}ms]`)
      resolve(url)
    }, delay)
  })
}

/** 带并发数限制的fetch请求函数 */
export const FetchQueue = (
  urls: string[],
  max: number,
  callback: (...args) => void,
) => {
  const urlCount = urls.length
  const requestsQueue: Array<any> = []
  const results: Array<any> = []

  let i = 0

  const handleRequest = (url) => {
    const req = handleFetch(url)
      .then((res) => {
        console.log('当前并发：' + requestsQueue)
        // 更新数组长度
        const len = results.push(res)

        if (len < urlCount && i + 1 < urlCount) {
          requestsQueue.shift()
          handleRequest(urls[++i])
        } else if (len === urlCount) {
          typeof callback === 'function' && callback(results)
        }
      })
      .catch((e) => {
        results.push(e)
      })

    if (requestsQueue.push(req) < max) {
      handleRequest(urls[++i])
    }
  }

  handleRequest(urls[i])
}

/** 示例 */
const urls = Array.from({ length: 10 }, (_, k) => k.toString())
const max = 4
const callback = () => {
  console.log('run callback')
}
logger.warn('带并发数限制的fetch请求', FetchQueue.name)
FetchQueue(urls, max, callback)
