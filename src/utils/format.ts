/**
 * @ Author: willy
 * @ Create Time: 2023-10-27 17:11:07
 * @ Modifier by: willy
 * @ Modifier time: 2023-10-27 17:51:32
 * @ Description: 转换类
 */

/**
 * 中文裁字
 * @param {string} str
 * @param {number} n
 * @param {number|string} format
 *
 * @test cutCNLetter('超六个字溢出', 6) // 超六个字溢出
 * @test cutCNLetter('超六个字溢出了', 6) // 超六个字溢出...
 */
export const cutCNLetter = (
  str: string,
  n: number = 10,
  format: number | string = '...',
) => {
  // eslint-disable-next-line no-control-regex
  const r = /[^\x00-\xff]/g
  const m = Math.floor(n)
  let curr, last
  str = '' + str
  if (str.replace(r, 'mm').length <= n) {
    return str
  }
  for (let i = m; i < str.length; i++) {
    curr = str.substr(0, i)
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    last = last || curr
    if (curr.replace(r, 'mm').length > n) {
      return last + format
    } else {
      last = curr
    }
  }
  return str
}
