/**
 * @ Author: willy
 * @ CreateTime: 2024-01-27 21:20:15
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-26 10:30:34
 * @ Description: 文件相关
 */

/**
 * @function downloadBlob 下载 Blob 对象中的内容
 * @param {Blob} blob Blob 对象
 * @param {string} fileName 文件名字
 * @example
  const blob = new Blob(['一文彻底掌握 Blob Web API'], { type: 'text/plain' })
  downloadBlob(blob, 'test')
 */
export const downloadBlob = (blob: Blob, fileName: string) => {
  // 创建 a 标签下载 Blob 对象中的内容
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = fileName
  link.click()
  link.remove()

  // 及时清除 Blob 对象
  URL.revokeObjectURL(link.href)
}
