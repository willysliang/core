/**
 * @ Author: willy
 * @ CreateTime: 2024-02-23 14:59:38
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-26 09:58:08
 * @ Description: app 相关的辅助函数
 */

import { IP_INFO_KEY__ } from '../../constants/index'
import { MyStorage } from './storage'

export interface IIpInfo {
  /** IP地址 */
  ip: string
  /** 位置 */
  city: string
  /** 位置 */
  region: string
  /** 位置 */
  country: string
  /** ISP供应商 */
  org: string
}

/** 获取客户端的 ip 信息 */
export const getIpInfo = async (): Promise<IIpInfo> => {
  return new Promise((resolve, reject) => {
    // 先从本地存储中查找，如果有则无需再次请求
    const storage = new MyStorage(localStorage, '')
    const localIpInfo = storage.get(IP_INFO_KEY__)
    if (localIpInfo) return resolve(JSON.parse(localIpInfo))

    fetch('https://ipinfo.io/json')
      .then((response) => response.json())
      .then((data) => {
        const ipInfo = {
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country,
          org: data.org,
        }
        storage.set(IP_INFO_KEY__, ipInfo)
        resolve(ipInfo)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * @description 当前容器是否为移动端
 */
export const isMobile: boolean =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
