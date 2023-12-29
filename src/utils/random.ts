/**
 * @ Author: willy
 * @ CreateTime: 2023-12-22 16:41:29
 * @ Modifier: willy
 * @ ModifierTime: 2023-12-25 10:06:52
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
