/**
 * @ Author: willysliang
 * @ Create Time: 2023-01-13 10:28:07
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-13 11:29:35
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
        './serviceWorkerLoad.js',
        './serviceWorkerLoad.html',
        './serviceWorkerLoad.css',
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
