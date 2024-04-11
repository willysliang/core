/**
 * @ Author: willy
 * @ CreateTime: 2024-04-08 17:57:02
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-11 17:19:41
 * @ Description: fetch 请求封装
 */

import queryString from 'query-string'

type IMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
interface IRequestConfig {
  /** 请求地址 */
  url: string
  /** 请求方法 */
  method: IMethod
}

interface IRequestParams extends IRequestConfig {
  /** 缓存时间，单位为s。默认强缓存，0为不缓存 */
  time?: number
  params?: Record<string, unknown>
  /** 请求的配置参数 */
  config?: RequestInit & { headers?: Record<string, unknown> }
  /** 是否需要鉴权 token */
  needAuthorization?: boolean
}

interface IHttpFactoryProps extends IRequestConfig {
  config?: Omit<IRequestParams, 'url' | 'method'>
}

export class FetchRequest {
  private baseUrl: string
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  /** 请求拦截器 */
  private interceptorsRequest({
    url,
    method,
    params,
    time,
    config = {},
    needAuthorization,
  }: IRequestParams) {
    let queryParams = '' // url 的参数
    let requestPayload = '' // 请求体载荷数据

    const { headers = {} } = config
    if (needAuthorization) headers.authorization = `Bearer ...`

    if (['GET', 'DELETE'].includes(method)) {
      // fetch 对 GET 请求不支持参数传在 body，所以需要手动拼接到 url 中
      if (params) {
        queryParams = queryString.stringify(params)
        url = `${url}?${queryParams}`
      }
    } else {
      // 非form-data传输JSON数据格式
      if (
        !['[object FormData]', '[object URLSearchParams]'].includes(
          Object.prototype.toString.call(params),
        )
      ) {
        Object.assign(headers, { 'Content-Type': 'application/json' })
        requestPayload = JSON.stringify(params)
      }
    }

    const options: Record<string, unknown> = {
      method,
      headers,
      body: ['GET', 'DELETE'].includes(method) ? undefined : requestPayload,
    }
    if (typeof time === 'number') {
      if (time > 0) options.next = { revalidate: time }
      else options.cache = 'no-store'
    } else {
      options.cache = 'force-cache'
    }

    return {
      url,
      options,
    }
  }

  /** 响应拦截器 */
  private interceptorsResponse<T>(
    req: ReturnType<FetchRequest['interceptorsRequest']>,
  ): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(req.url, req.options)
        const requestUrl = res.url
        if (res.ok) return resolve(res.json())
        res
          .clone()
          .text()
          .then((text) => {
            try {
              const errorData = JSON.parse(text)
              return reject({
                msg: errorData || '请求接口异常',
                url: requestUrl,
              })
            } catch (err) {
              return reject({ msg: text, url: requestUrl })
            }
          })
      } catch (err) {
        return reject({
          msg: err,
          url: req.url,
        })
      }
    })
  }

  /** http 工厂模式 */
  private async httpFactory<T>({
    url = '',
    config = {},
    method,
  }: IHttpFactoryProps): Promise<T> {
    const req = this.interceptorsRequest({
      url: `${this.baseUrl}${url}`,
      method,
      params: config.params,
      time: config.time,
    })
    return this.interceptorsResponse<T>(req)
  }

  public request<T>(method: IMethod, url: string, config?: IRequestParams) {
    return this.httpFactory<T>({ url, method, config })
  }

  public get<T>(url: string, config?: IRequestParams) {
    return this.request<T>('GET', url, config)
  }

  public post<T>(url: string, params?: IRequestParams): Promise<T> {
    return this.request('POST', url, params)
  }

  public put<T>(url: string, params?: IRequestParams): Promise<T> {
    return this.request('PUT', url, params)
  }

  public delete<T>(url: string, params?: IRequestParams): Promise<T> {
    return this.request('DELETE', url, params)
  }

  public patch<T>(url: string, params?: IRequestParams): Promise<T> {
    return this.request('PATCH', url, params)
  }
}

const request = new FetchRequest(process.env.NEXT_PUBLIC_BASEURL)
export default request
