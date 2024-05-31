/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 09:05:41
 * @ Modified by: willysliang
 * @ Modified time: 2022-10-12 18:44:59
 * @ Description: 格式化相关工具类
 */

/***
 * 播放数量格式化
 */
export const formatQuantity = (number: number): string | number => {
  if (number > 100000000) {
    return Number((number / 100000000).toFixed(1)) + '亿'
  }

  if (number > 10000000) {
    return Number((number / 10000000).toFixed(1)) + ' 千万'
  }

  if (number > 10000) {
    return Number((number / 10000).toFixed(1)) + ' 万'
  }

  if (number > 1000) {
    return Number((number / 1000).toFixed(1)) + '千'
  }

  return number
}

/***
 * 文件大小格式化
 * formatBytes(1234);       // 1.21 KB
 * formatBytes(1234, 3);    // 1.205 KB
 * @param {number} bytes 文件的大小
 * @return 返回格式化后的文件大小
 * - log(a)b = log(c)b / log(c)a = Math.pow(b, 1/a)
 */
export const formatSizeUnits = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'
  const base = 1024 // 1024进制
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] // 单位
  const currentIndex = Math.floor(Math.log(bytes) / Math.log(base)) // 当前大小所属类型
  return `${parseFloat(
    (bytes / Math.pow(base, currentIndex)).toFixed(decimals),
  )} ${sizes[currentIndex]}`
}

/***
 * @formatZero 数字补零
 * @num 所要转换的数字
 * @len 数字所需长度
 */
export const formatZero = (num: string | number, len: number) => {
  if (String(num).length >= len) return num
  return (Array(len).join('0') + num).slice(-len)
}

/***
 * @formatDate 日期格式化
 * @params time 当前时间
 * @params spliter 设置格式化规格
 * @return yyyy-MM-dd hh:mm:ss
 */
export const formatDate = (
  time: Date | string = new Date(),
  spliter = false,
): string => {
  const d = new Date(time)
  let day: string | number = d.getDate()
  let month: string | number = d.getMonth() + 1
  const year: string | number = d.getFullYear()
  let hour: string | number = d.getHours()
  let minute: string | number = d.getMinutes()
  let seconds: string | number = d.getSeconds()

  if (day < 10) {
    day = '0' + day
  }
  if (month < 10) {
    month = '0' + month
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }

  if (spliter) {
    return year + '年' + month + '月' + day + '日 ' + hour + ':' + minute
  }
  return (
    year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds
  )
}

/***
 * @formatDateTemp 时间格式化
 * @params 当前时间
 * @return yyyy-mm-dd
 */
export const formatDateTemp = (time: string | Date = new Date()) => {
  const d = new Date(time)
  let day: string | number = d.getDate()
  let month: string | number = d.getMonth() + 1
  const year: string | number = d.getFullYear()

  if (day < 10) {
    day = '0' + day
  }
  if (month < 10) {
    month = '0' + month
  }
  return year + '-' + month + '-' + day
}

/***
 * 时间段转换
 */
export const formatDuring = (during: number) => {
  const s = Math.floor(during) % 60
  const i = Math.floor(during / 60) % 60

  const ss = s < 10 ? `0${s}` : s
  const ii = s < 10 ? `0${i}` : i

  return `${ii}:${ss}`
}

/**
 * @hexoToRGB 16进制颜色值转 RGB
 * @param {String} hex 16进制颜色字符串
 * @return {String} RGB颜色字符
 */
export function hexoToRGB(hex: string) {
  const tranHex: any = hex.replace('#', '0x')
  const r = tranHex >> 16
  const g = (tranHex >> 8) & 0xff
  const b = tranHex & 0xff
  return `rgb(${r}, ${g}, ${b})`
}

/**
 * @RGBToHex 16进制颜色值转 RGB
 * @param {String} rgb RGB颜色字符串
 * @return {String} 16进制颜色字符串
 */
export function RGBToHex(rgb) {
  const rgbArr = rgb.split(/[^\d]+/)
  const color = (rgbArr[1] << 16) | (rgbArr[2] << 8) | rgbArr[3]
  return `#${color.toString(16)}`
}
