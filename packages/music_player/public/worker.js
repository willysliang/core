/**
 * @ Author: willysliang
 * @ Create Time: 2023-01-05 15:59:20
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-13 10:30:10
 * @ Description: webWorker 收发消息
 */

self.addEventListener('message', function (event) {
  const data = event.data
  switch (data.method) {
    case 'start':
      self.postMessage('Worker Start: ' + data.msg)
      break;
    case 'stop':
      self.postMessage('Worker Stopped: ' + data.msg)
      self.close()
      break
    default:
      self.postMessage('Worker command: ' + data.msg)
  }
}, false)

// Worker 线程（接收主线程发送的数据，并进行返回）
self.onmessage = function (e) {
  const uInt8Array = e.data
  postMessage('Inside worker.js: uInt8Array.toString() = ' + uInt8Array.toString())
  postMessage('Inside worker.js: uInt8Array.byteLength = ' + uInt8Array.byteLength)
}
