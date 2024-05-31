/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-12 18:44:30
 * @ Modified by: willysliang
 * @ Modified time: 2022-10-12 18:45:42
 * @ Description: 随机生成相关的工具类
 */

/**
 * @description 随机生成颜色
 * @param {string} type
 * @return {string}
 */
export const randomColor = (type: 'rgb' | 'hex' | 'hsl'): string => {
  switch (type) {
    case 'rgb':
      return window.crypto.getRandomValues(new Uint8Array(3)).toString()
    case 'hex':
      return `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, `${Math.random() * 10}`)}`
    case 'hsl':
      // 在25-95%范围内具有饱和度，在85-95%范围内具有亮度
      return [
        360 * Math.random(),
        `${100 * Math.random()}%`,
        `${100 * Math.random()}%`,
      ].toString()
  }
}
