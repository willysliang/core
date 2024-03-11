import axios, { type AxiosRequestConfig, AxiosResponse } from 'axios'
import { errorMessage } from './status'
import { Storage } from '@util/cache'
import { USER_TOKEN, BASE_URL, API_TARGET_URL } from '@/config/constant/cache'
import { ElMessage } from 'element-plus'

if (import.meta.env.MODE === 'development') {
  //
} else if (import.meta.env.MODE === 'production') {
  axios.defaults.baseURL = localStorage.getItem(BASE_URL)?.toString() || API_TARGET_URL
}

axios.defaults.timeout = 20 * 1000 // 如果请求超时，请求将被中断
axios.defaults.maxBodyLength = 5 * 1024 * 1024 // 请求参数最长度
axios.defaults.withCredentials = true // 允许携带cookie
axios.defaults.headers.post['Access-Control-Allow-Origin-Type'] = '*' // 允许跨域
axios.defaults.headers.post['Content-Type'] = 'application/json' // 默认使用 application/json 形式

// 请求拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = Storage.get(USER_TOKEN)
    if (token && config.headers) {
      // 请求头token信息
      // config.headers.Authorization = `Bearer willysliang`
      config.headers['Authori-zation'] = 'Bearer ' + token
    }

    config.params = {
      ...config.params,
      timeNow: Date.now(),
    }
    return config
  },
  (err) => Promise.reject(err),
)

// 添加响应拦截器
axios.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status === 200) {
      return res
    }
    errorMessage(res.status, res.data?.message || '')
    return Promise.reject(res)
  },
  (error) => {
    const { res } = error
    if (res) {
      // 请求已发出，但是不在2xx的范围
      errorMessage(res.status, res.data?.message || '')
      return Promise.reject(res.data)
    }
    errorMessage('网络连接异常,请稍后再试!')
  },
)

interface Http {
  get<T>(config: AxiosRequestConfig): Promise<T>

  post<T>(config: AxiosRequestConfig): Promise<T>

  upload<T>(config: AxiosRequestConfig): Promise<T>

  put<T>(config: AxiosRequestConfig): Promise<T>

  delete<T>(config: AxiosRequestConfig): Promise<T>

  download(config: AxiosRequestConfig): void
}

const http: Http = {
  get ({ url = '', params }) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err.data)
        })
    })
  },

  post ({ url = '', params }) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, JSON.stringify(params))
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err.data)
        })
    })
  },

  put ({ url = '', params }) {
    return new Promise((resolve, reject) => {
      axios
        .put(url, JSON.stringify(params))
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err.data)
        })
    })
  },

  delete ({ url = '', params }) {
    return new Promise((resolve, reject) => {
      axios
        .delete(url, { params })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err.data)
        })
    })
  },

  upload ({ url = '', params: file }) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, file, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err.data)
        })
    })
  },

  download ({ url = '' }) {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function () {
      document.body.removeChild(iframe)
    }

    document.body.appendChild(iframe)
  },
}

export interface RequestOptions {
  /** 当前接口权限, 不需要鉴权的接口请忽略， 格式：sys:user:add */
  permCode?: string
  /** 是否直接获取data，而忽略message等 */
  isGetDataDirectly?: boolean
  /** 请求成功是提示信息 */
  successMsg?: string
  /** 请求失败是提示信息 */
  errorMsg?: string
  /** 是否mock数据请求 */
  isMock?: boolean
}
/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = async <T = any>(
  config: AxiosRequestConfig,
  options: RequestOptions = {},
): Promise<T> => {
  try {
    const {
      successMsg,
      errorMsg,
      // permCode,
      // isMock,
      isGetDataDirectly = true,
    } = options
    // 如果当前是需要鉴权的接口 并且没有权限的话 则终止请求发起
    // if (permCode && !useUserStore().perms.includes(permCode)) {
    //   return $message.error('你没有访问该接口的权限，请联系管理员！');
    // }

    const res = await axios.request(config)
    successMsg && ElMessage.success(successMsg)
    errorMsg && ElMessage.error(errorMsg)
    return isGetDataDirectly ? res.data : res
  } catch (error: any) {
    return Promise.reject(error)
  }
}

export default http
