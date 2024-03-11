import http from '@/utils/http'
import type { UserProfile } from '@/types/user'

/***
 * 登录
 */
export const useLogin = async (phone: string, password: string) => {
  return await http.get<{
    code: number
    cookie: string
    token: string
    username: string | undefined | null
  }>({
    url: '/api/login/cellphone',
    params: { phone, password },
  })
}

/***
 * 二维码登录
 */
/**  二维码 key 生成接口 */
export const useLoginQrKey = async () => {
  const {
    data: { unikey },
  } = await http.get<{ data: { unikey: string } }>({
    url: '/api/login/qr/key',
  })
  return unikey
}

/**  二维码生成接口 */
export const useLoginQrCreate = async (key: string) => {
  const {
    data: { qrimg },
  } = await http.get<{ data: { qrimg: string; qrurl: string } }>({
    url: '/api/login/qr/create',
    params: {
      key,
      qrimg: true,
    },
  })
  return qrimg
}

/**  二维码检测扫码状态接口 */
export const useLoginQrCheck = async (key: string) => {
  // 二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies
  return await http.get<{ code: number; cookie: string; message: string }>({
    url: '/api/login/qr/check',
    params: {
      key,
    },
  })
}

/** 获取登录状态 */
export const useLoginStatus = async (cookie: string | null) => {
  return await http.post<{
    data: {
      code: number
      profile: UserProfile
    }
  }>({
    url: '/api/login/status',
    data: {
      cookie,
    },
  })
}
