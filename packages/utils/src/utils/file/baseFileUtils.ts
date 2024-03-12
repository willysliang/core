/**
 * @ Author: willy
 * @ CreateTime: 2024-03-06 12:55:30
 * @ Modifier: willy
 * @ ModifierTime: 2024-03-06 14:13:22
 * @ Description: 基础的文件工具类
 */

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { IMixinsReturnType, Mixins } from './classMixinUtils'

/**
 * @class FileConvertFormatUtils 文件转换格式类
 * @function blobToOther 将 Blob 转换其他类型（'base64' | 'arrayBuffer'）
 * @function dataUrlToBlob 将 base64 数据Url 转换为 Blob 对象
 *
 *
 * @class FileConvertFormatUtils 文件加载类
 * @function downloadBlob 下载 Blob 对象中的内容
 * @function downloadOnlineImageToLocal 下载线上图片到本地显示
 * @function generatePdf 生成 PDF 文档
 *
 *
 * @class FileConvertFormatUtils 文件优化类
 * @function compressImage 将 base64 图片进行压缩
 */

/**
 * @class FileConvertFormatUtils
 * @description 文件转换格式类
 */
export class FileConvertFormatUtils {
  /**
   * @function blobToOther 将 Blob 转换其他类型
   * @param {Blob} blob 要转换的 Blob 对象
   * @param {'base64' | 'arrayBuffer'} transfromType 要转换的类型
   * @returns {string | ArrayBuffer | null} 正常会返回 base64 编码的字符串
   *
   * @example
    const blob = new Blob(['Hello World'], { type: 'text/plain' })
    const base64 = await new blobToBase64(blob, 'base64').catch((e) => {
      console.error('Error converting blob to base64:', e)
    })
    console.log(base64) // 输出将会是一个 base64 编码的字符串
   */
  blobToOther(
    blob: Blob,
    transfromType: 'base64' | 'arrayBuffer' = 'base64',
  ): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()

      switch (transfromType) {
        case 'arrayBuffer':
          fileReader.readAsArrayBuffer(blob)
          break
        case 'base64':
          fileReader.readAsDataURL(blob)
          break
        default:
          fileReader.readAsDataURL(blob)
      }

      fileReader.onloadend = () => resolve(fileReader.result)
      fileReader.onerror = reject
    })
  }

  /**
   * @function dataUrlToBlob 将 base64 数据Url 转换为 Blob 对象
   * @param {string} base64DataUrl 图片格式为 base64 的字符串
   * @param {string} mimeType 图片类型
   * @returns {Blob} 转化为 Blob 对象后返回
   */
  dataUrlToBlob(base64DataUrl: string): Blob {
    // 解码Base64字符串
    const base64Response = atob(base64DataUrl.split(',')[1])
    // 将解码的字符串转换为类型化数组，以便构建Blob对象
    const byteArray = new Uint8Array(base64Response.length)
    for (let i = 0; i < base64Response.length; i++) {
      byteArray[i] = base64Response.charCodeAt(i)
    }

    // 获取MIME类型
    const mimeString = base64DataUrl.split(',')[0].split(':')[1].split(';')[0]

    // 创建Blob对象
    const blob = new Blob([byteArray], { type: mimeString })

    return blob
  }
}

/**
 * @class FileConvertFormatUtils
 * @description 文件加载类
 */
export class FileLoadUtils {
  /**
   * @function downloadBlob 下载 Blob 对象中的内容
   * @param {Blob} blob Blob 对象
   * @param {string} fileName 文件名字
   *
   * @example
      const blob = new Blob(['一文彻底掌握 Blob Web API'], { type: 'text/plain' })
      downloadBlob(blob, 'test')
  */
  downloadBlob(blob: Blob, fileName: string) {
    // 创建 a 标签下载 Blob 对象中的内容
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = fileName

    // 触发下载
    link.click()
    link.remove()

    // 及时释放 Blob 对象
    URL.revokeObjectURL(link.href)
  }

  /**
   * @function downloadOnlineImageToLocal 下载线上图片到本地显示
   * @param {string} url 图片地址，如 'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/2/172734410c51dbed~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png'
   * @param {HTMLImageElement | null} imgElement 要展示的图片元素
   * @returns {Promise<string>} 返回一个 blob 资源的 url 地址
   *
   * @example
      const imgDom = document.querySelector('img') as HTMLImageElement | null
      const url = 'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/2/172734410c51dbed~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png'
      await downloadOnlineImageToLocal(url, imgDom)
   */
  downloadOnlineImageToLocal(
    url: string,
    imgElement: HTMLImageElement | null = null,
  ): Promise<string> {
    if (imgElement && !(imgElement instanceof HTMLImageElement)) {
      throw new Error('element 必须是 HTMLImageElement 类型或 null')
    }
    return new Promise((resolve, reject) => {
      const requestImg = new Request(url)
      fetch(requestImg)
        .then((response) => response.blob())
        .then((blob) => {
          // 创建一个 blob 的资源 url 地址
          const objectURL = URL.createObjectURL(blob)
          resolve(objectURL)
          imgElement && (imgElement.src = objectURL)
        })
        .catch(reject)
    })
  }

  /**
   * @function generatePdf 生成 PDF 文档
   * @param {string} text 向文本中加入的文字
   * @returns {Promise<Blob>} 返回一个 Blob 对象
   *
   * @see https://pdf-lib.js.org/ 【官方文档】
   */
  async generatePdf(text: string = 'Hello, world!'): Promise<Blob> {
    // 创建一个新的 PDF 文档
    const pdfDoc = await PDFDocument.create()

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

    // 向文档中添加一页
    const page = await pdfDoc.addPage()

    // 获取页面尺寸
    const { height } = page.getSize()
    const fontSize = 24

    // 在页面上添加文本
    page.drawText(text, {
      x: 20,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    })

    // 将PDF文档序列化为Uint8Array
    const pdfBytes = await pdfDoc.save()

    // 将Uint8Array转换为Blob
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })

    // 返回Blob对象
    return blob
  }

  async b() {
    return await new Promise((resolve) => resolve('111'))
  }
}

/**
 * @class FileOptimizeUtils
 * @description 文件优化类
 */
export class FileOptimizeUtils {
  /**
   * @function compressImage 将 base64 图片进行压缩
   * @param {string} base64 图片转换为 base64 的字符串
   * @param {number} quality 图片质量的比例（要压缩的比例），取值范围（0 ~ 1），默认1为不压缩，值越小，压缩率越高，图片质量越低
   * @param {string} mimeType 表示图像格式的 DOMString。
   * @param {boolean} needOptimizeDataSize 是否需要优化数据量的大小
   * @returns {Promise<Blob | string>} 返回压缩后的 base64 字符串或 Blob 对象
   */
  compressImage(
    base64: string,
    quality: number = 0.92,
    mimeType: string = 'image/png',
    needOptimizeDataSize: boolean = true,
  ): Promise<Blob | string> {
    const canvas = document.createElement('canvas')
    const imgDom = document.createElement('img')
    imgDom.crossOrigin = 'anonymous'

    return new Promise((resolve, reject) => {
      imgDom.src = base64

      const imgOnload = () => {
        /** 图片最大宽度 */
        const IMG_MAX_WIDTH = 800

        /** 没有超出图片最大宽度 */
        const unExceedMaximum: boolean = imgDom.width <= IMG_MAX_WIDTH
        const targetWidth = unExceedMaximum ? imgDom.width : IMG_MAX_WIDTH
        const targetHeight = unExceedMaximum
          ? imgDom.height
          : (imgDom.height * IMG_MAX_WIDTH) / imgDom.width

        canvas.width = targetWidth
        canvas.height = targetHeight

        const ctx = canvas.getContext('2d')
        ctx?.clearRect(0, 0, targetWidth, targetHeight) // 清除画布
        ctx?.drawImage(imgDom, 0, 0, canvas.width, canvas.height)

        const imageData = canvas.toDataURL(mimeType, quality)

        // 对于 Data URL 格式的图片数据，如果需要优化数据量的大小，则把它转换为 Blob 对象减少，否则返回压缩后的 base64 字符串
        if (needOptimizeDataSize) {
          const fileConvertFormatUtils = new FileConvertFormatUtils()
          const compressedImageBlob =
            fileConvertFormatUtils.dataUrlToBlob(imageData)
          resolve(compressedImageBlob)
        } else {
          resolve(imageData)
        }
      }

      imgDom.onload = imgOnload
      imgDom.onerror = reject
    })
  }
}

/** 文件汇总类 */
const fileMixins = [FileConvertFormatUtils, FileLoadUtils, FileOptimizeUtils]
export class BaseFileAllUtils extends Mixins(class {}, ...fileMixins) {}
export const basefileAllUtils = new BaseFileAllUtils() as IMixinsReturnType<
  typeof BaseFileAllUtils
>
