/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-12 15:00:14
 * @ Modified by: willysliang
 * @ Modified time: 2022-10-12 18:47:33
 * @ Description: 文件操作相关的工具类
 */

/**
 * 复制文本
 * @param text
 */
export const copyText = (text: string) => {
  return new Promise((resolve) => {
    const copyInput = document.createElement('input') // 创建一个input框获取需要复制的文本内容
    copyInput.value = text
    document.body.appendChild(copyInput)
    copyInput.select()
    document.execCommand('copy')
    copyInput.remove()
    resolve(true)
  })
}
