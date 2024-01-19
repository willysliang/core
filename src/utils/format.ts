/**
 * @ Author: willy
 * @ Create Time: 2023-10-27 17:11:07
 * @ Modifier by: willy
 * @ Modifier time: 2023-10-27 17:51:32
 * @ Description: 转换类
 */

/** ======================================================================================== */
/** ----------------------------------- 中文 Utils ------------------------------------------ */
/** ======================================================================================== */

/**
 * @description 中文裁字
 * @param {string} str
 * @param {number} n
 * @param {number|string} format
 * @returns {string} 裁切后的字符串
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

/**
 * @function generateRandomChina 生成随机中文字符串
 * @param strLength 字符串长度
 * @returns 随机生成的字符串
 * @example generateRandomChina(10)
 */
export const generateRandomChina = (
  strLength: number = Math.floor(Math.random() * 3 + 2),
): string => {
  if (strLength < 1) return ''

  let strs = ''
  for (let i = 0; i < strLength; i++) {
    const randomNumber = Math.floor(Math.random() * (40959 - 19968 + 1)) + 19968
    strs += String.fromCharCode(randomNumber)
  }

  return strs
}

/** ======================================================================================== */
/** ----------------------------------- 时间 Utils ----------------------------------------- */
/** ======================================================================================== */

/**
 * @description 时间日期格式化
 * @param {Date | string} timestamp 时间戳
 * @param {string} formatRegTxt 时间格式化正则
 * @returns {string} 格式化后的时间字符串
 */
export const formatDate = (
  timestamp: Date | string = new Date(),
  formatRegTxt = 'YYYY-MM-DD hh:mm:ss',
) => {
  /** 边界判断，非时间则直接返回 */
  const typeIsDate = timestamp instanceof Date
  if (!typeIsDate) return timestamp

  /** 长度未满，前面补零 */
  const padZero = (txt: number | string = '', num = 2, pad = '0'): string => {
    return String(txt).padStart(num, pad)
  }

  /** 时间转化 */
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = padZero(date.getMonth() + 1)
  const day = padZero(date.getDate())
  const hours = padZero(date.getHours())
  const minutes = padZero(date.getMinutes())
  const seconds = padZero(date.getSeconds())

  /** 时间转化的 map 表 */
  const formatRegMap = {
    'Y+': year,
    'M+': month,
    'D+': day,
    'h+': hours,
    'm+': minutes,
    's+': seconds,
  }

  /** 根据提供的格式化字符串来进行替换内容 */
  for (const k in formatRegMap) {
    if (new RegExp(k).test(formatRegTxt)) {
      formatRegTxt = formatRegTxt.replace(new RegExp(k), formatRegMap[k])
    }
  }

  return formatRegTxt
}
