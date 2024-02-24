/**
 * @ Author: willy
 * @ CreateTime: 2024-02-23 11:02:14
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-23 18:47:02
 * @ Description: web-push 业务逻辑层
 */

const webPush = require('web-push')

export class WebPushService {
  /**
   * web端service worker 信息（实际应使用DB等其他方式存储）
   */
  private pushSubscriptionMap: Map<string, any> = new Map()

  /**
   * wep-push, 生成 VAPID 密钥对（VAPID keys 应当在服务器端生成和保存）
   */
  vapidKey(): string {
    return webPush.generateVAPIDKeys()
  }

  /**
   * 检查 pushSubscription 是否需要取消订阅
   * @param pushSubscription
   * @param ip
   */
  checkPushSubscription(ip, pushSubscription): Promise<Record<string, any>> {
    return new Promise((resolve) => {
      // 如果不存在订阅数据，则取消订阅
      if (!this.pushSubscriptionMap.has(ip)) {
        resolve({ need_unsubscribe: 1, pushSubscription })
      }

      // 如果有存在订阅数据，则设定随机数取消订阅
      if (Math.random() > 0.5) {
        this.pushSubscriptionMap.delete(ip)
        resolve({ need_unsubscribe: 1, pushSubscription })
      }

      // 兜底，不取消订阅
      resolve({ need_unsubscribe: 0, pushSubscription })
    })
  }

  /**
   * 存储pushSubscription
   * @param pushSubscription
   * @param ip
   */
  savePushSubscription(pushSubscription, ip): Promise<Record<string, any>> {
    this.pushSubscriptionMap.set(ip, pushSubscription)

    return new Promise((resolve) => {
      resolve({
        code: 200,
        msg: 'success',
        data: {
          pushSubscription,
        },
      })
    })
  }

  /**
   * 使用 web-push 发送消息
   * @param message payload
   * @param pushSubscription
   * @param ip
   */
  pushMessage(
    message: { title: string; body: string },
    pushSubscription,
    ip,
  ): Promise<string> {
    // vapidKey 方法生成，需与web端一致
    const vapidKey = {
      publicKey:
        'BBxUgcbebhS4grwjngZzv1_Ry04AP3qMZGqDu7V0fG-81HozMZuLC7acbd3RduinDKfGDEEhQEHPXzSUFo8nHpk',
      privateKey: 'A6mPrcxFeCWEHxfdkL1sieovIUtQfTl6JHxwYymHnMs',
    }

    webPush.setVapidDetails(
      'mailto:willysliang@qq.com',
      vapidKey.publicKey,
      vapidKey.privateKey,
    )

    const payload = JSON.stringify(message)

    return new Promise((resolve, reject) => {
      webPush
        .sendNotification(pushSubscription, payload)
        .then((res) => {
          console.log('Push Notification sent successfully', ip)
          resolve(res)
        })
        .catch((error) => {
          console.error('Push Notification error: ', error)
          reject(error)
        })
    })
  }
}
