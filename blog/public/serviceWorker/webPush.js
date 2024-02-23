/**
 * @ Author: willy
 * @ CreateTime: 2024-02-23 16:16:32
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-23 18:39:37
 * @ Description: web push API
 */

export class WebPushUtils {
  constructor(SERVER_URL = 'http://localhost', SERVER_PORT = 3000) {
    this.vapidKey = {
      publicKey:
        'BBxUgcbebhS4grwjngZzv1_Ry04AP3qMZGqDu7V0fG-81HozMZuLC7acbd3RduinDKfGDEEhQEHPXzSUFo8nHpk',
      privateKey: 'A6mPrcxFeCWEHxfdkL1sieovIUtQfTl6JHxwYymHnMs',
    }
    this.SERVER_URL = SERVER_URL
    this.SERVER_PORT = SERVER_PORT
  }

  /** 获取 ip 信息 */
  async getIpInfo() {
    return new Promise((resolve, reject) => {
      const IP_INFO_KEY__ = 'IP_INFO_KEY__'
      const localIpInfo = localStorage.getItem(IP_INFO_KEY__)
      if (localIpInfo) return resolve(JSON.parse(localIpInfo).value)

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
          localStorage.setItem(
            IP_INFO_KEY__,
            JSON.stringify({ value: ipInfo, expire: null }),
          )
          resolve(ipInfo)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * @function urlBase64ToUint8Array 用于将 URL 安全的 base64 编码的公钥转换为 Uint8Array
   * @description 通常用于配置 Web Push 的 applicationServerKey
   */
  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }
}

export class WebPushServer {
  constructor(pushSubscription) {
    this.webPushUtils = new WebPushUtils()
    this.getIpInfo()

    this.pushSubscription = pushSubscription
  }

  async getIpInfo() {
    this.ipInfo = await this.webPushUtils.getIpInfo().catch(() => {})
  }

  /** 将订阅信息发送到服务器 */
  async sendSubscribe() {
    // 将订阅信息发送到服务器
    await fetch(
      `${this.webPushUtils.SERVER_URL}:${this.webPushUtils.SERVER_PORT}/webPush/subscribe`,
      {
        method: 'POST',
        body: JSON.stringify({
          pushSubscription: this.pushSubscription,
          ip: this.ipInfo && this.ipInfo.ip,
        }),
        headers: {
          'content-type': 'application/json',
        },
      },
    ).catch((error) => {
      console.log(error)
    })
  }

  /** 校检订阅信息是否需要取消订阅 */
  async checkPushSubscription() {
    // 将订阅信息发送到服务器
    fetch(
      `${this.webPushUtils.SERVER_URL}:${this.webPushUtils.SERVER_PORT}/webPush/check`,
      {
        method: 'POST',
        body: JSON.stringify({
          pushSubscription: this.pushSubscription,
          ip: this.ipInfo && this.ipInfo.ip,
        }),
        headers: {
          'content-type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((res) => {
        console.log('校检订阅信息是否需要取消订阅 res', res)
        // 是否需要取消订阅
        const need_unsubscribe = res.data?.need_unsubscribe
        if (need_unsubscribe) this.unsubscribe()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  /** 取消订阅 */
  async unsubscribe() {
    return new Promise((resolve, reject) => {
      this.pushSubscription
        .unsubscribe()
        .then(() => {
          console.log('推送订阅已取消')
          resolve('推送订阅已取消')
        })
        .catch((error) => {
          console.log('推送订阅取消失败')
          reject(error)
        })
    })
  }
}
