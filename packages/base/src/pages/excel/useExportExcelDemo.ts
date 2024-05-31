/**
 * @ Author: willysliang
 * @ Create Time: 2022-11-15 16:27:51
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-16 11:57:21
 * @ Description: 导出 excel 简化版
 */

import * as XLSX from 'xlsx'

function workbook2blob (workbook) {
  const wbout = XLSX.write(workbook, {
    // 要生成的文件类型
    bookType: 'xlsx',
    // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    bookSST: false,
    type: 'binary',
  })
  // 将字符串转ArrayBuffer
  function s2ab (s) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }
  const blob = new Blob([s2ab(wbout)], {
    type: 'application/octet-stream',
  })
  return blob
}

// 将blob对象创建bloburl，然后用a标签实现弹出下载框
function openDownloadDialog (blob, fileName) {
  if (typeof blob === 'object' && blob instanceof Blob) {
    blob = URL.createObjectURL(blob) // 创建blob地址
  }
  const aLink = document.createElement('a')
  aLink.href = blob
  // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file:///模式下不会生效
  aLink.download = fileName || ''
  let event
  if (window.MouseEvent) event = new MouseEvent('click')
  //   移动端
  else {
    event = document.createEvent('MouseEvents')
    event.initMouseEvent(
      'click',
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null,
    )
  }
  aLink.dispatchEvent(event)
}

// 用的例子
const sheet1data = [
  { department: '行政部', count: 2 },
  { department: '前端部', count: 2 },
]
const sheet2data = [
  { name: '张三', do: '整理文件' },
  { name: '李四', do: '打印' },
]
const sheet3data = [
  { name: '张大人', do: 'vue' },
  { name: '李大人', do: 'react' },
]
const sheet1 = XLSX.utils.json_to_sheet(sheet1data)
const sheet2 = XLSX.utils.json_to_sheet(sheet2data)
const sheet3 = XLSX.utils.json_to_sheet(sheet3data)

/* create a new blank workbook */
const wb = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(wb, sheet1, '部门统计')
XLSX.utils.book_append_sheet(wb, sheet2, '行政部')
XLSX.utils.book_append_sheet(wb, sheet3, '前端部')
const workbookBlob = workbook2blob(wb)
openDownloadDialog(workbookBlob, `部门统计.xlsx`)
