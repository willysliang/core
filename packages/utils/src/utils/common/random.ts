/**
 * @ Author: willy
 * @ CreateTime: 2024-02-26 10:09:14
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-26 10:10:09
 * @ Description: 随机类
 */

/**
 * @description 随机生成颜色
 * @param {string} type 颜色的类型
 * @return {string} 返回随机生成的颜色
 */
export const randomColor = (type: 'rgb' | 'hex' | 'hsl' = 'rgb'): string => {
  switch (type) {
    case 'rgb':
      return `rgb(${window.crypto
        .getRandomValues(new Uint8Array(3))
        .toString()})`
    case 'hex':
      return `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, `${Math.random() * 10}`)}`
    case 'hsl':
      // 在25-95%范围内具有饱和度，在85-95%范围内具有亮度
      return `hsl(${[
        360 * Math.random(),
        `${100 * Math.random()}%`,
        `${100 * Math.random()}%`,
      ].toString()})`
    default:
      return '#000'
  }
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
