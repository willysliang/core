/**
 * @ Author: willy
 * @ CreateTime: 2024-03-06 14:24:50
 * @ Modifier: willy
 * @ ModifierTime: 2024-03-08 20:24:30
 * @ Description: Excel 文件
 */

import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import type { BookType } from 'xlsx'
import { basefileAllUtils } from './baseFileUtils'

export class ReadExcelUtils {
  /**
   * 读取表头信息
   * @param sheet 工作簿
   * @returns {string[]} 表头信息
   */
  readExcelHead(sheet: XLSX.WorkSheet): Array<string> {
    const headers: string[] = []
    let range
    if (sheet['!ref']) {
      range = XLSX.utils.decode_range(sheet['!ref'])
    }
    const rowNum = range.s.r
    for (let colNum = range.s.c; colNum <= range.e.c; ++colNum) {
      const nextCell = sheet[XLSX.utils.encode_cell({ c: colNum, r: rowNum })]
      let cellText = `void${colNum}`
      if (nextCell && nextCell.t) cellText = XLSX.utils.format_cell(nextCell)
      headers.push(cellText)
    }
    return headers
  }

  /**
   * 解析excel原数据
   * @param {File} rawFile
   * @returns {{ header: string[]; excelData: unknown[] }} 返回表头数据，跟表体数据
   */
  readRawData(rawFile: File) {
    return new Promise<{ header: string[]; excelData: unknown[] }>(
      (resolve) => {
        const reader = new FileReader()
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const data = e?.target?.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]

          const excelData = XLSX.utils.sheet_to_json(worksheet)
          const header = this.readExcelHead(worksheet)
          resolve({ header, excelData })
        }
        reader.readAsArrayBuffer(rawFile)
      },
    )
  }
}

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

export class ExportExcelUtils {
  private dateNum(date: string | number | Date, date1904?: undefined) {
    if (date1904) date = Number(date) + 1462
    const epoch = Date.parse(String(date))
    return (
      (epoch - Date.parse(String(new Date(Date.UTC(1899, 11, 30))))) /
      (24 * 60 * 60 * 1000)
    )
  }

  /**
   * 将数据转换为表格的形式
   * @param data
   * @returns
   * @description
   * - 单元格地址对象存储为{c: C, r: R}，其中C和R是0索引的列和行号，
   * 例如，单元格地址B5由对象{c:1, r:4}表示。
   * - 单元格范围对象存储为{s: S, e: E}，其中S是range范围内的第一个单元格，E是最后一个单元格。
   * 范围range是包含的。例如，范围A3:B7用对象{s:{c:0, r:2}， e:{c:1, r:6}}表示
   */
  private sheetFromArrayOfArrays(data: string | any[]) {
    const worksheet: Record<string, any> = {}
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
        const cell: Record<string, any> = {
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
            cell.v = this.dateNum(cell.v)
          } else cell.t = 's'

          worksheet[cellRef] = cell
        }
      }
    }
    if (range.s.c < 10000000) worksheet['!ref'] = XLSX.utils.encode_range(range)
    return worksheet
  }

  /**
   * 工作簿数据转化为 Blob 对象数据
   * @param workbook
   * @param {XLSX.BookType} bookType
   * @returns
   */
  private workbookToBlob(workbook, bookType: BookType = 'xlsx') {
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
    function stringToArrayBuffer(str: string) {
      const buf = new ArrayBuffer(str.length)
      const view = new Uint8Array(buf)
      for (let i = 0; i !== str.length; ++i) view[i] = str.charCodeAt(i) & 0xff
      return buf
    }

    const blob = new Blob([stringToArrayBuffer(wbData)], {
      type: 'application/octet-stream',
    })
    return blob
  }

  /**
   * 将json对象导出到Excel（单个工作表）
   * @param sheetConfig json对象
   * @param needDownload 是否需要下载
   * @param workbook 工作簿
   * @returns
   */
  public exportJsonToExcel(
    sheetConfig: IJsonType,
    needDownload = true,
    workbook = XLSX.utils.book_new(),
  ) {
    const {
      filename = 'defaultExcel',
      bookType = 'xlsx',
      sheetName = 'sheetJS DeafultName',
      autoWidth = true,
      header = [],
      multiHeader = [],
      merges = [],
      data = [],
    } = sheetConfig

    const worksheet = this.sheetFromArrayOfArrays([
      ...multiHeader.reverse(),
      header,
      ...data,
    ])

    if (merges.length) {
      worksheet['!merges'] = merges.map((item) => XLSX.utils.decode_range(item))
    }

    if (autoWidth) {
      /* 设置worksheet每列的最大宽度 */
      const colWidth = data.map(
        (
          row: ({
            toString: () => {
              charCodeAt: { (arg0: number): number; new (): any }
              length: number
            }
          } | null)[],
        ) =>
          row.map((val) => {
            /* 先判断是否为 null/undefined */
            if (val === null || typeof val === 'undefined') return { wch: 10 }

            /* 再判断是否为中文 */
            if (val.toString().charCodeAt(0) > 255) {
              return { wch: val.toString().length * 2 }
            }

            return { wch: val.toString().length }
          }),
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
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

    /** 如果需要下载，则转换成 Blod 对象数据后保存 */
    if (needDownload) {
      const workbookBlobData = this.workbookToBlob(workbook, bookType)
      saveAs(workbookBlobData, `${filename}.${bookType}`)
    }

    return workbook
  }

  /**
   * 将json对象导出到Excel（多个工作表）
   * @param sheetConfigs 配置对象数组
   * @param excelFileName 要导出的Excel文件名
   */
  public exportJSONArrayToExcel(
    sheetConfigs: IJsonType[],
    excelFileName: string = 'default.xlsx',
  ) {
    let wb
    sheetConfigs.forEach((sheetConfig, index) => {
      if (index === 0) {
        wb = this.exportJsonToExcel(sheetConfig, false)
      } else {
        this.exportJsonToExcel(sheetConfig, false, wb)
      }
    })

    const workbookBlob = this.workbookToBlob(wb, 'xlsx')
    saveAs(workbookBlob, excelFileName)
  }

  /**
   * 将json对象导出到Excel - 简易版（多个工作表）
   * @param sheetConfigs 配置对象数组
   * @param excelFileName 要导出的Excel文件名
   *
   * @example
      const sheetConfigs = [
        {
          sheetName: '部门统计',
          data: [
            { department: '行政部', count: 2 },
            { department: '前端部', count: 2 },
          ],
        },
        {
          sheetName: '行政部',
          data: [
            { name: '张三', do: '整理文件' },
            { name: '李四', do: '打印' },
          ],
        },
        {
          sheetName: '前端部',
          data: [
            { name: '张大人', do: 'vue' },
            { name: '李大人', do: 'react' },
          ],
        },
      ]
      exportSimpleExcel(sheetConfigs, `部门统计.xlsx`)
   */
  public exportSimpleExcel(
    sheetConfigs: { data: any[]; sheetName: string }[],
    excelFileName: string = 'default.xlsx',
  ) {
    const workbook = XLSX.utils.book_new()
    sheetConfigs.forEach((sheetConfig) => {
      const { data, sheetName } = sheetConfig
      const sheet = XLSX.utils.json_to_sheet(data)
      XLSX.utils.book_append_sheet(workbook, sheet, sheetName)
    })
    const workbookBlob = this.workbookToBlob(workbook, 'xlsx')
    basefileAllUtils.downloadBlob(workbookBlob, excelFileName)
  }
}

export const readExcelUtils = new ReadExcelUtils()
export const exportExcelUtils = new ExportExcelUtils()
