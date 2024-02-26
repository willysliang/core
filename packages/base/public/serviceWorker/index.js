/**
 * @ Author: willy
 * @ CreateTime: 2024-02-19 14:25:43
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-26 16:13:07
 * @ Description: serviceWorker 的 demo 调用
 */

import { WebPushServer, WebPushUtils } from './webPush.js'

/**
 * 使用 serviceWorker API 缓存资源
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./serviceWorker.js', {
        scope: './serviceWorkerLoad.html',
      })
      .then((registration) => {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope,
        )

        // 当前 serviceWorker 的登记状态
        const serviceWorker =
          registration.installing || registration.waiting || registration.active
        if (serviceWorker) {
          console.log('serviceWorker.state: ' + serviceWorker.state)
          serviceWorker.addEventListener('statechange', (e) => {
            console.log('serviceWorker state is ' + e.target.state)
          })
        }
      })
      .catch((err) => {
        console.error('ServiceWorker registration failed: ', err)
      })
  })
} else {
  console.warn('该浏览器不支持 ServiceWorker API')
}

/**
 * 使用 PUSH API 推送消息（即使后续不打开该网站也会继续收到服务端下发的消息）
 * 注册 Service Worker 并请求推送通知权限
 */
if ('serviceWorker' in navigator && 'PushManager' in window) {
  navigator.serviceWorker
    .register('./serviceWorker.js')
    .then((swReg) => {
      console.log('Service Worker 注册成功', swReg)

      // swReg.showNotification('新消息', {
      //   body: '消息描述',
      //   icon: '../vite.svg',
      //   badge: '../vite.svg',
      // })

      const webPushUtils = new WebPushUtils()

      // 请求推送通知权限
      return swReg.pushManager.getSubscription().then(async (subscription) => {
        if (subscription === null) {
          // 用户还没有订阅推送服务，请求订阅
          return swReg.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: webPushUtils.urlBase64ToUint8Array(
                webPushUtils.vapidKey.publicKey, // 你的公钥
              ),
            })
            .then(async (pushSubscription) => {
              console.log('推送订阅成功：', pushSubscription)
              const webPushServer = new WebPushServer(pushSubscription)
              await webPushServer.sendSubscribe()
            })
            .catch((error) => {
              console.error('推送订阅失败：', error)
            })
        } else {
          // 用户已经订阅
          console.log('用户已经订阅: ', subscription)

          const webPushServer = new WebPushServer(subscription)
          webPushServer.checkPushSubscription()

          // 取消订阅
          // await webPushServer.unsubscribe().catch(() => {})
        }
      })
    })
    .catch((error) => {
      console.error('Service Worker 注册失败：', error)
    })
} else {
  console.warn('推送通知不支持')
}
