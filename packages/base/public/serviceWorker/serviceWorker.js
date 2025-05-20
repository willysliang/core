/**
 * @ Author: willy
 * @ CreateTime: 2024-02-19 14:12:05
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-16 14:17:56
 * @ Description: serviceWorker 网络请求拦截中转
 */

/**
 * 监听安装事件
 * install 事件一般是被用来设置你的浏览器的离线缓存逻辑
 */
this.addEventListener('install', (event) => {
  // 通过这个方法可以防止缓存未完成就关闭 serviceWorker
  event.waitUntil(
    // 创建一个名叫 v1 的缓存版本
    caches.open('v1').then((cache) => {
      // 指定要缓存的内容，地址为相对于跟域名的访问路径
      return cache.addAll([
        './vite.svg',
        './serviceWorker/serviceWorkerLoad.js',
        './serviceWorker/serviceWorkerLoad.html',
        './serviceWorker/serviceWorkerLoad.css',
      ])
    }),
  )
})

/**
 * 注册 fetch 事件，拦截全站的请求
 */
this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    }),
  )
})

/**
 * 监听推送事件
 */
self.addEventListener('push', (event) => {
  const pushData = event.data.json()
  const title = pushData.title || '新消息'
  const options = {
    body: pushData.body,
    icon: './vite.svg',
    badge: './vite.svg',
  }

  event.waitUntil(self.registration.showNotification(title, options))
})
