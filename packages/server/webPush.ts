/**
 * @ Author: willy
 * @ CreateTime: 2024-02-19 20:05:47
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-19 20:08:20
 * @ Description: web-push
 */

const webpush = require('web-push')

// 生成 VAPID 密钥对（VAPID keys 应当在服务器端生成和保存）
const vapidKeys = webpush.generateVAPIDKeys()

// {
//     "publicKey": "BL2ZBfM2Vtg7dERhMqIyZv9T_9omdZ6K0TUrBBi5jxQnK6tK2ASX0ufWfa4Xf7Z2Hm1u2F0wT7BwQZ6rZZJI6sA",
//     "privateKey": "dPbG4S6Bc3tB1fgEjMxm3gBlXHJm2wPMI0tm9g4TxvQ"
//   }

webpush.setVapidDetails(
  'mailto:willysliang@qq.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
)

const pushSubscription = {
  endpoint: 'ENDPOINT_URL',
  keys: {
    p256dh: 'USER_PUBLIC_KEY',
    auth: 'USER_AUTH_SECRET',
  },
}

const payload = JSON.stringify({ title: 'Hello', body: 'Hello, world!' })

webpush.sendNotification(pushSubscription, payload).catch((error) => {
  console.error('Push Notification error: ', error)
})
