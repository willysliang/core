/**
 * @ Author: willy
 * @ CreateTime: 2024-02-19 14:25:43
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-19 15:02:13
 * @ Description: serviceWorker 的 demo 调用
 */

/**
 * 使用 serviceWorker API 缓存资源
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/public/serviceWorker/serviceWorker.js', {
        scope: '/public/serviceWorker/serviceWorkerLoad.html',
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
 * @function urlBase64ToUint8Array 用于将 URL 安全的 base64 编码的公钥转换为 Uint8Array
 * @description 通常用于配置 Web Push 的 applicationServerKey
 */
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

/**
 * 使用 PUSH API 推送消息（即使后续不打开该网站也会继续收到服务端下发的消息）
 * 注册 Service Worker 并请求推送通知权限
 */
if ('serviceWorker' in navigator && 'PushManager' in window) {
  navigator.serviceWorker
    .register('/public/serviceWorker/serviceWorker.js')
    .then((swReg) => {
      console.log('Service Worker 注册成功', swReg)

      const VAPID_KEY = {
        publicKey:
          'BL2ZBfM2Vtg7dERhMqIyZv9T_9omdZ6K0TUrBBi5jxQnK6tK2ASX0ufWfa4Xf7Z2Hm1u2F0wT7BwQZ6rZZJI6sA',
        privateKey: 'dPbG4S6Bc3tB1fgEjMxm3gBlXHJm2wPMI0tm9g4TxvQ',
      }

      // 请求推送通知权限
      return swReg.pushManager.getSubscription().then((subscription) => {
        if (subscription === null) {
          // 用户还没有订阅推送服务，请求订阅
          return swReg.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(
                VAPID_KEY.publicKey, // 你的公钥
              ),
            })
            .then((PushSubscription) => {
              console.log('推送订阅成功：', PushSubscription)
              // 将订阅信息发送到服务器
            })
            .catch((error) => {
              console.error('推送订阅失败：', error)
            })
        } else {
          // 用户已经订阅
          console.log('Subscription object: ', subscription)
        }
      })
    })
    .catch((error) => {
      console.error('Service Worker 注册失败：', error)
    })
} else {
  console.warn('推送通知不支持')
}
