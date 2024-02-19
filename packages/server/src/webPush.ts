/**
 * @ Author: willy
 * @ CreateTime: 2024-02-19 20:05:47
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-19 20:57:30
 * @ Description: web-push
 */

const webpush = require('web-push')

// 生成 VAPID 密钥对（VAPID keys 应当在服务器端生成和保存）
// const vapidKeys = webpush.generateVAPIDKeys()

const vapidKeys = {
  publicKey:
    'BOj3rTG0Lxy7Etv2KdANNTSSWx1gruknBr35AFpZ90J9QZ8KpDeRrW87A_m2WaM0tvKVVItWT1pxhOIFGdPUW4c',
  privateKey: 'NTdFYX6zCzNvT0xS4oDlPhOdf_nMLMPzt9-nSvrSfAE',
}

webpush.setVapidDetails(
  'mailto:willysliang@qq.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
)

const pushSubscription = {
  endpoint:
    'https://fcm.googleapis.com/fcm/send/cjP1X-v2E1s:APA91bHtu4xtfi8WUOFxEkeBgAWxWKOHfeYa5nkrjoKzfW9uLJc-VCzKLRQOsx3jR2ByPyuluaPY45eCSSCmAGHuNcBshkpsHJLxzT5LnP_H6-LqUdLVjTbc4tYQ4_iQ_NBuMDyl_sm6',
  expirationTime: null,
  keys: {
    p256dh:
      'BAzYkSqjVglTC8g-ne4hGmVuTzgxqArJa18q22GP5ZoGz5f630Xc4v5QkIgQjYt4sjEuApu1NIFGbzrB_F7-Taw',
    auth: 'qRJByBrfscyk8ePyl4FhhA',
  },
}

const payload = JSON.stringify({ title: 'Hello', body: 'Hello, world!' })

webpush
  .sendNotification(pushSubscription, payload)
  .then((res) => {
    console.log('Push Notification sent successfully', res)
  })
  .catch((error) => {
    console.error('Push Notification error: ', error)
  })
