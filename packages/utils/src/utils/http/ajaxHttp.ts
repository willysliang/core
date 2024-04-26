/**
 * @ Author: willy
 * @ CreateTime: 2024-04-25 20:59:14
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-26 15:49:25
 * @ Description: AJAX HTTP 请求
 */

/**
 * @class AJAX HTTP 请求
 * @param {*Object} config 请求配置项
 *
 * @memberof AJAXHttp#isSupportAjax 检查当前环境是否支持所需要的方法和 API
 * @memberof AJAXHttp#extend 将多个对象合并
 * @memberof AJAXHttp#extend 文本响应解析为 JSON
 * @memberof AJAXHttp#paramStringify 将对象转换为查询字符串
 *
 * @memberof AJAXHttp#sendXHR 发送请求
 * @memberof AJAXHttp#cancel 取消请求
 */
export class AjaxHttp {
  private config: Record<string, any> = {}
  public onCancel: () => void = () => {}

  constructor(config: Record<string, any> = {}) {
    if (!this.isSupportAjax) {
      throw new Error('Atomic: 此浏览器不支持此插件中使用的方法')
    }

    const defaultConfig = {
      method: 'GET',
      data: {},
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      responseType: 'text',
      timeout: null,
      withCredentials: false,
    }

    this.config = Object.assign(defaultConfig, config)
  }

  /** 检查当前环境是否支持所需要的方法和 API */
  get isSupportAjax(): boolean {
    return 'XMLHttpRequest' in window && 'JSON' in window && 'Promise' in window
  }

  /** 将多个对象合并 */
  private extend(...args: Array<Record<string, any>>): Record<string, any> {
    const extended = {}

    const merge = (obj: Record<string, any>) => {
      for (const prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
            extended[prop] = this.extend(extended[prop], obj[prop])
          }
        }
      }
    }

    for (let i = 0; i < args.length; i++) merge(args[i])

    return extended
  }

  /** 文本响应解析为 JSON */
  private parseJSON(request): { data: any; xhr: any } {
    if (!['', 'text'].includes(this.config.responseType)) {
      return { data: request.response, xhr: request }
    }

    try {
      return { data: JSON.parse(request.responseText), xhr: request }
    } catch (error) {
      return { data: request.responseText, xhr: request }
    }
  }

  /** 将对象转换为查询字符串 */
  private paramStringify(
    obj: Record<string, any>,
  ): Document | XMLHttpRequestBodyInit | null {
    // 如果是字符串或 FormData 类型，则直接返回
    if (
      typeof obj === 'string' ||
      Object.prototype.toString.call(obj) === '[object FormData]'
    ) {
      return obj as any
    }

    // 如果 content-type 设置为 JSON，则字符串化 JSON 对象
    if (
      /application\/json/i.test(this.config.headers['Content-type']) ||
      Object.prototype.toString.call(obj) === '[object Array]'
    ) {
      return JSON.stringify(obj)
    }

    // 否则将对象转换为序列化字符串
    const encoded: Array<string> = []
    for (const prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        encoded.push(
          encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]),
        )
      }
    }
    return encoded.join('&')
  }

  /** 发送 XHR 请求 */
  public sendXHR(url: string): Promise<any> {
    const request = new XMLHttpRequest()
    this.onCancel = () => {
      request.abort()
    }

    return new Promise((resolve, reject) => {
      // 设置监听器处理已完成的请求
      request.onreadystatechange = () => {
        // 仅在请求完成时运行
        if (request.readyState !== 4) return

        // 防止超时错误被处理
        if (!request.status) return

        // 处理响应
        if (request.status >= 200 && request.status < 300) {
          resolve(this.parseJSON(request))
        } else {
          const { status, statusText, responseText } = request
          reject({ status, statusText, responseText })
        }
      }

      // 设置 HTTP 请求
      request.open(this.config.method, url, true)
      request.responseType = this.config.responseType

      // 添加请求头
      for (const header in this.config.headers) {
        if (Object.prototype.hasOwnProperty.call(this.config.headers, header)) {
          request.setRequestHeader(header, this.config.headers[header])
        }
      }

      // 设置超时
      if (this.config.timeout) {
        request.timeout = this.config.timeout
        request.ontimeout = (e) => {
          reject({
            status: 400,
            statusText: '请求超时',
            responseText: e,
          })
        }
      }

      // 添加凭证
      if (this.config.withCredentials) {
        request.withCredentials = true
      }

      // 发送请求
      request.send(this.paramStringify(this.config.data))
    })
  }
}

// 示例
;(async () => {
  const http = new AjaxHttp()
  const { data } = await http.sendXHR(
    'https://jsonplaceholder.typicode.com/todos/1',
  )
  console.log(AjaxHttp.name, data)
})()
