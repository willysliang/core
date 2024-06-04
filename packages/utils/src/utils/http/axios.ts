/**
 * @ Author: willysliang
 * @ Create Time: 2023-01-24 17:50:27
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-25 21:17:46
 * @ Description: 网络请求
 */

import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestConfig,
} from 'axios'
import QS from 'qs'
import { errorMessage } from './httpStatus'
import { autoMathPrefix } from './requestTool'
import { MyStorage } from '../cache'
import { USER_TOKEN } from '../../constants'

/** axios 默认配置 */
Object.assign(axios.defaults, {
  timeout: 20 * 1000, // 如果请求超时，请求将被中断
  maxBodyLength: 5 * 1024 * 1024, // 请求参数最长度
  withCredentials: true, // 允许携带cookie
})

/** 请求拦截器 */
axios.interceptors.request.use(
  (config: AxiosRequestConfig & any) => {
    // token 判定
    const storage = new MyStorage(localStorage, '')
    const token = storage.get(USER_TOKEN)
    if (token && config.headers) {
      config.headers['Authori-zation'] = 'Bearer ' + token
    }

    // 请求头设定
    config.headers = Object.assign(
      config.method === 'get'
        ? {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
          }
        : {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
      config.headers,
    )

    // 如果为 post 请求，则根据 Content-Type 转换 data 格式
    if (config.method === 'post') {
      const contentType = config.headers['Content-Type']
      if (contentType && typeof contentType === 'string') {
        if (contentType.includes('multipart')) {
          // 类型为 multipart/form-data
          // config.data = config.data
        } else if (contentType.includes('json')) {
          // 类型为 application/json
          // 服务器收到 raw body(原始数据) "{name: "willy",age:"18"}" (普通字符串)
          config.data = JSON.stringify(config.data)
        } else {
          // 类型为 application/x-www-form-urlencoded
          // 服务器收到的 raw body(原始数据) name=willy&age=18
          config.data = QS.stringify(config.data)
        }
      }
    }

    // 请求后缀添加时间戳防止请求重复
    config.params = {
      ...config.params,
      // timeNow: Date.now(),
    }

    return Promise.resolve(config)
  },
  (err) => Promise.reject(err),
)

/** 添加响应拦截器 */
axios.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status === 200) {
      return res
    }
    errorMessage(res.status, res.data?.message || '')
    return Promise.reject(res)
  },
  // 对响应错误做处理
  (error) => {
    const { response, code, message } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorMessage(response.status, response.data?.message || '')
      return Promise.reject(response.data)
    } else if (code === 'ECONNABORED' && message.indexOf('timeout') !== -1) {
      errorMessage(response.status, '请求超时!')
      // return Promise.reject({ mes: '请求超时' })
      return Promise.reject(error)
    } else {
      errorMessage(response?.status, '网络连接异常,请稍后再试!')
      return Promise.reject(error)
    }
  },
)

export interface RequestOptions {
  /** 接口前缀 */
  prefix?: string
  /** 是否统一处理接口失败(提示) */
  showResponseMessage?: boolean
}

/** 请求封装 */
export const request = async (
  config: RawAxiosRequestConfig,
  options: RequestOptions = {
    prefix: 'api',
    showResponseMessage: true,
  },
) => {
  try {
    // 匹配接口前缀 开发环境则通过proxy配置转发请求； 生产环境根据实际配置
    config.baseURL = autoMathPrefix(options?.prefix || '')

    const res = await axios.request(config)

    // 自定义参数，是否允许全局提示错误信息
    if (options.showResponseMessage) {
      console.warn(res.data?.message || '请求处理失败！')
    }
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export default request
