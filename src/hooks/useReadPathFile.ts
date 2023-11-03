/**
 * @ Author: willy
 * @ Create Time: 2023-11-03 11:20:57
 * @ Modifier by: willy
 * @ Modifier time: 2023-11-03 11:50:18
 * @ Description: 读取设定目录的所有文件
 */

import { ref } from 'vue'
// import fs from 'fs'

export const useReadPathFiles = () => {
  const directoryPath = ref<string>('../../blog')

  //   fs.readdirSync(directoryPath.value).forEach((file, index) => {
  //     console.log('index', index, file)
  //   })

  return {
    directoryPath,
  }
}
