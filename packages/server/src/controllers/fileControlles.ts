/**
 * @ Author: willy
 * @ CreateTime: 2024-02-29 14:21:46
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-29 17:08:45
 * @ Description: 文件类接口
 */

import fs from 'node:fs'
import path from 'node:path'
import { Request, Response } from 'express'

export class FileController {
  /**
   * post - 上传 base64 资源
   *
   * @example
        const imgData = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS1sb2dvcyIgd2lkdGg9IjMxLjg4IiBoZWlnaHQ9IjMyIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB2aWV3Qm94PSIwIDAgMjU2IDI1NyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJJY29uaWZ5SWQxODEzMDg4ZmUxZmJjMDFmYjQ2NiIgeDE9Ii0uODI4JSIgeDI9IjU3LjYzNiUiIHkxPSI3LjY1MiUiIHkyPSI3OC40MTElIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNDFEMUZGIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjQkQzNEZFIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE4MTMwODhmZTFmYmMwMWZiNDY3IiB4MT0iNDMuMzc2JSIgeDI9IjUwLjMxNiUiIHkxPSIyLjI0MiUiIHkyPSI4OS4wMyUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkVBODMiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjguMzMzJSIgc3RvcC1jb2xvcj0iI0ZGREQzNSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZGQTgwMCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGZpbGw9InVybCgjSWNvbmlmeUlkMTgxMzA4OGZlMWZiYzAxZmI0NjYpIiBkPSJNMjU1LjE1MyAzNy45MzhMMTM0Ljg5NyAyNTIuOTc2Yy0yLjQ4MyA0LjQ0LTguODYyIDQuNDY2LTExLjM4Mi4wNDhMLjg3NSAzNy45NThjLTIuNzQ2LTQuODE0IDEuMzcxLTEwLjY0NiA2LjgyNy05LjY3bDEyMC4zODUgMjEuNTE3YTYuNTM3IDYuNTM3IDAgMCAwIDIuMzIyLS4wMDRsMTE3Ljg2Ny0yMS40ODNjNS40MzgtLjk5MSA5LjU3NCA0Ljc5NiA2Ljg3NyA5LjYyWiI+PC9wYXRoPjxwYXRoIGZpbGw9InVybCgjSWNvbmlmeUlkMTgxMzA4OGZlMWZiYzAxZmI0NjcpIiBkPSJNMTg1LjQzMi4wNjNMOTYuNDQgMTcuNTAxYTMuMjY4IDMuMjY4IDAgMCAwLTIuNjM0IDMuMDE0bC01LjQ3NCA5Mi40NTZhMy4yNjggMy4yNjggMCAwIDAgMy45OTcgMy4zNzhsMjQuNzc3LTUuNzE4YzIuMzE4LS41MzUgNC40MTMgMS41MDcgMy45MzYgMy44MzhsLTcuMzYxIDM2LjA0N2MtLjQ5NSAyLjQyNiAxLjc4MiA0LjUgNC4xNTEgMy43OGwxNS4zMDQtNC42NDljMi4zNzItLjcyIDQuNjUyIDEuMzYgNC4xNSAzLjc4OGwtMTEuNjk4IDU2LjYyMWMtLjczMiAzLjU0MiAzLjk3OSA1LjQ3MyA1Ljk0MyAyLjQzN2wxLjMxMy0yLjAyOGw3Mi41MTYtMTQ0LjcyYzEuMjE1LTIuNDIzLS44OC01LjE4Ni0zLjU0LTQuNjcybC0yNS41MDUgNC45MjJjLTIuMzk2LjQ2Mi00LjQzNS0xLjc3LTMuNzU5LTQuMTE0bDE2LjY0Ni01Ny43MDVjLjY3Ny0yLjM1LTEuMzctNC41ODMtMy43NjktNC4xMTNaIj48L3BhdGg+PC9zdmc+'
        fetch(`${SERVER_BASE_URL}/file/upload_base64`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imgData }),
        })
        .then((response) => response.json())
        .then((result) => {
          console.log('fetch', result)
        })
        .catch((error) => {
          console.error(error)
        })
   */
  async uploadBase64FilePostHandler(req: Request, res: Response) {
    // 获取POST请求中的base64图片数据
    const imgData = req.body.imgData

    // 从 imgData 中提取文件格式
    let fileExtension = imgData.match(/^data:image\/(.*?);base64,/)?.[1]
    if (!fileExtension) {
      const errorData = {
        code: 500,
        msg: 'base64 image 文件格式错误',
      }
      res.send(errorData)
      return
    }

    // 提取正确的文件格式（因为要对 svg+xml 这种格式进行处理）
    fileExtension = fileExtension.match(/\w+/)?.[0]

    // 匹配所有 Image 类型的 Base64 数据
    const base64Data = imgData.replace(/^data:image\/.+;base64,/, '')
    const dataBuffer = Buffer.from(base64Data, 'base64')

    // 根据文件格式来设定文件名称
    const filePath = `./data/file/test.${fileExtension}`
    const dirPath = path.dirname(filePath)

    fs.mkdir(dirPath, { recursive: true }, (error) => {
      if (error) {
        const errorData = {
          code: 500,
          msg: '创建文件目录错误',
          error,
        }
        res.send(errorData)
        return
      }

      fs.writeFile(filePath, dataBuffer, (err) => {
        if (err) {
          const errorData = {
            code: 500,
            msg: 'upload base64 image error',
            error: err,
          }
          res.send(errorData)
          return
        }
        res.json({
          code: 200,
          msg: 'upload base64 image success',
        })
      })
    })
  }
}
