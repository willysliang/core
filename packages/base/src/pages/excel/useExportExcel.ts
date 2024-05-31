/**
 * @ Author: willysliang
 * @ Create Time: 2022-11-15 17:26:07
 * @ Modified by: willysliang
 * @ Modified time: 2022-12-05 17:07:25
 * @ Description: 导出 Excel 的工具类
 */

import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import type { BookType } from 'xlsx'

interface IJsonType {
  multiHeader: any[]
  header: any[]
  data: any[][]
  filename: string
  merges: []
  autoWidth: boolean
  bookType: BookType
  /** 工作表名称 */
  sheetName: string
}
declare type ws = {
  [key: string]: any
}
declare type cellType = {
  [key: string]: any
}
declare type dateType = string | number | Date

/**
 * @description Workbook 类声明
 */
// class Workbook implements XLSX.WorkBook {
//   public SheetNames: any[]

//   public Sheets: any

//   constructor (nameParams = [], sheetsParams = {}) {
//     this.SheetNames = nameParams
//     this.Sheets = sheetsParams
//   }
// }

function datenum (date: dateType, date1904?: undefined) {
  if (date1904) date = Number(date) + 1462
  const epoch = Date.parse(String(date))
  return (
    (epoch - Date.parse(String(new Date(Date.UTC(1899, 11, 30))))) /
    (24 * 60 * 60 * 1000)
  )
}

/**
 * @description sheet  General Structures
 * - 单元格地址对象存储为{c: C, r: R}，其中C和R是0索引的列和行号，
 * 例如，单元格地址B5由对象{c:1, r:4}表示。
 * - 单元格范围对象存储为{s: S, e: E}，其中S是range范围内的第一个单元格，E是最后一个单元格。
 * 范围range是包含的。例如，范围A3:B7用对象{s:{c:0, r:2}， e:{c:1, r:6}}表示
 *
 */
function sheetFromArrayOfArrays (data: string | any[]) {
  const worksheet: ws = {}
  const range = {
    s: {
      c: 10000000,
      r: 10000000,
    },
    e: {
      c: 0,
      r: 0,
    },
  }
  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R
      if (range.s.c > C) range.s.c = C
      if (range.e.r < R) range.e.r = R
      if (range.e.c < C) range.e.c = C
      const cell: cellType = {
        v: data[R][C],
      }
      if (cell.v !== null) {
        const cellRef = XLSX.utils.encode_cell({
          c: C,
          r: R,
        })

        if (typeof cell.v === 'number') cell.t = 'n'
        else if (typeof cell.v === 'boolean') cell.t = 'b'
        else if (cell.v instanceof Date) {
          cell.t = 'n'
          const z = XLSX.SSF.parse_date_code(14)
          cell.z = z
          cell.v = datenum(cell.v)
        } else cell.t = 's'

        worksheet[cellRef] = cell
      }
    }
  }
  if (range.s.c < 10000000) worksheet['!ref'] = XLSX.utils.encode_range(range)
  return worksheet
}

/***
 * @description 工作簿数据转化为 blod 对象数据
 */
function workbook2blob (workbook, bookType: BookType = 'xlsx') {
  /** 存入工作簿数据 */
  const wbData = XLSX.write(workbook, {
    /** 要生成的文件类型 */
    bookType,
    /** 是否生成Shared String Table，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性 */
    bookSST: false,
    type: 'binary',
  })

  /**
   * @description 将string 转化为arrayBuffer
   * 0x代表16进制数,0xff表示的数二进制1111 1111 占一个字节.和其进行&操作的数,最低8位,不会发生变化.
   */
  function s2ab (s: string) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }

  const blob = new Blob([s2ab(wbData)], {
    type: 'application/octet-stream',
  })
  return blob
}

/**
 * @description 将json对象导出到Excel（单个工作表）
 */
export function exportJsonToExcel (params: IJsonType, needDownload = true, wb = XLSX.utils.book_new()) {
  const filename = params?.filename ?? 'defaultExcel'
  const bookType = params?.bookType ?? 'xlsx'
  const multiHeader = params?.multiHeader ?? []
  const merges = params?.merges ?? []
  const autoWidth = params.autoWidth ?? true
  const wsName = params.sheetName ?? 'sheetJS DeafultName'

  const data = [...params.data]
  data.unshift(params.header)
  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i])
  }

  const worksheet = sheetFromArrayOfArrays(data)

  if (merges.length > 0) {
    if (!worksheet['!merges']) worksheet['!merges'] = []
    merges.forEach((item) => {
      worksheet['!merges'].push(XLSX.utils.decode_range(item))
    })
  }

  if (autoWidth) {
    /* 设置worksheet每列的最大宽度 */
    const colWidth = data.map(
      (
        row: ({
          toString: () => {
            (): any
            new (): any
            charCodeAt: { (arg0: number): number; new (): any }
            length: number
          }
        } | null)[],
      ) =>
        row.map(
          (
            val: {
              toString: () => {
                (): any
                new (): any
                charCodeAt: { (arg0: number): number; new (): any }
                length: number
              }
            } | null,
          ) => {
            /* 先判断是否为null/undefined */
            if (val === null) return { wch: 10 }

            /* 再判断是否为中文 */
            if (val.toString().charCodeAt(0) > 255) {
              return { wch: val.toString().length * 2 }
            }

            return { wch: val.toString().length }
          },
        ),
    )

    /* 以第一行为初始值 */
    const result = colWidth[0]
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j].wch < colWidth[i][j].wch) {
          result[j].wch = colWidth[i][j].wch
        }
      }
    }
    worksheet['!cols'] = result
  }

  /* 添加工作表到工作簿中 */
  // const wb = new Workbook()
  // wb.SheetNames.push(wsName)
  // wb.Sheets[wsName] = worksheet
  XLSX.utils.book_append_sheet(wb, worksheet, wsName)

  if (needDownload) {
    /** 转换 Blod 对象数据 */
    const workbookBlob = workbook2blob(wb, bookType)

    /** 保存 Blod 对象的数据 */
    saveAs(workbookBlob, `${filename}.${bookType}`)
  } else {
    return wb
  }
}

/***
 * @description 将json对象导出到Excel（多个工作表）
 */
export const exportArrayJSONExcel = (arrayParams: IJsonType[]) => {
  let wb
  arrayParams.forEach((item, index) => {
    if (index === 0) {
      wb = exportJsonToExcel(item, false)
    } else {
      exportJsonToExcel(item, false, wb)
    }
  })

  /** 转换 Blod 对象数据 */
  const workbookBlob = workbook2blob(wb, 'xlsx')

  /** 保存 Blod 对象的数据 */
  saveAs(workbookBlob, `部门统计.xlsx`)
}

export default { exportJsonToExcel, exportArrayJSONExcel }
