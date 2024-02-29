---
Author: willysliang
CreateTime: 2024-02-19 11:34:54
Modifier: willysliang
ModifiedTime: 2024-02-19 16:07:25
Description: WEB API
---

## WEB API

```bash
## WEB API

```



## 观察器

### IntersectionObserver 相交节点观察器

```bash
## IntersectionObserver API
IntersectionObserver API 是异步的，不随着目标元素的滚动同步触发。 即只有线程空闲下来，才会执行观察器。这意味着，这个观察器的优先级非常低，只在其他任务执行完，浏览器有了空闲才会执行。


## IntersectionObserverEntry对象提供目标元素的信息，一共有六个属性。
time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
target：被观察的目标元素，是一个 DOM 节点对象
rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回null
boundingClientRect：目标元素的矩形区域的信息
intersectionRect：目标元素与视口（或根元素）的交叉区域的信息
intersectionRatio：目标元素的可见比例，即intersectionRect占boundingClientRect的比例，完全可见时为1，完全不可见时小于等于0


## options 
root: null, // 指定与目标元素相交的根元素，默认null为视口
threshold: [] // [0, 0.5, 1] 当目标元素和根元素相交的面积占目标元素面积的百分比到达或跨过某些指定的临界值时就会触发回调函数
rootMagin：'' // "100px 0" 与margin类型写法，指定与跟元素相交时的延时加载


## 实例方法
- observe()
	- 观察某个目标元素，一个观察者实例可以观察任意多个目标元素。
	- 注意：这不是事件，没有冒泡。所以不能只调用一次 observe 方法就能观察一个页面里的所有 img 元素
- unobserve()
	- 取消对某个目标元素的观察，延迟加载通常都是一次性的，observe 的回调里应该直接调用 unobserve() 那个元素.
- disconnect()
	- 取消观察所有已观察的目标元素
- takeRecords()
    在浏览器内部，当一个观察者实例在某一时刻观察到了若干个相交动作时，它不会立即执行回调，它会调用 window.requestIdleCallback() （目前只有 Chrome 支持）来异步的执行我们指定的回调函数，而且还规定了最大的延迟时间是 100 毫秒，相当于浏览器会执行：
    requestIdleCallback(() => {
      if (entries.length > 0) {
        callback(entries, observer)
      }
    }, { timeout: 100 })

```



**图片滚动底部懒加载**

```vue
<template>
  <img
    v-for="(item, index) in imgUrl"
    :key="index"
    ref="imgRef"
    :src="systemNotfound"
    :data-src="imgUrl[index]"
    class="h-96"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { systemNotfound } from '@/assets/images'

const imgRef = ref([])
const imgUrl = ref([
  'https://img2.baidu.com/it/u=617579813,2960860841&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
  'https://img2.baidu.com/it/u=1003272215,1878948666&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
  'https://img1.baidu.com/it/u=2995157981,91041597&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750',
  'https://img2.baidu.com/it/u=1395980100,2999837177&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=675',
  'https://img0.baidu.com/it/u=925843206,3288141497&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=769',
  'https://img1.baidu.com/it/u=1300668939,1504410366&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=858',
  'https://img0.baidu.com/it/u=4008146120,512111027&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
  'https://img1.baidu.com/it/u=3622442929,3246643478&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
  'http://t13.baidu.com/it/u=230088816,2918366315&fm=224&app=112&f=JPEG?w=250&h=500',
  'https://img2.baidu.com/it/u=3038223445,2416689412&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
])

onMounted(() => {
  const options = {
    root: null,
    // 这里是一个数组可以指定多个比例类似[0.25, 0.5, 0.75, 1]
    threshold: [0], // 交会处
    rootMargin: '0px', // 对视口进行收缩和扩张
  }
  const lazyIntersection = new IntersectionObserver((entires) => {
    // entires为监听的节点数组对象
    entires.forEach((item: any) => {
      // isIntersecting是当前监听元素交叉区域是否在可视区域指定的阈值内返回的是一个布尔值
      if (item.isIntersecting) {
        item.target.src = item.target?.getAttribute('data-src')
        // 这里资源加载后就停止进行观察
        lazyIntersection.unobserve(item.target)
      }
    })
  }, options)

  /** observe用来观察指定的DOM节点 */
  imgRef.value.forEach((item) => {
    lazyIntersection.observe(item)
  })
})
</script>
```



### MutationObserver 节点元素变化监听器

```bash
## MutationObserver 节点元素变化监听器
- Mutation Observer 提供了监视对 DOM 树所做更改的能力。它被设计为旧的 Mutation Events 功能的替代品，该功能是 DOM3 Events 规范的一部分。
- 即是说这是一个 DOM 元素变化的监听器，当被观察的目标 DOM 发生改变时就可以执行指定的逻辑。


## MutationObserver 的应用场景（防删除 DOM 水印）
- MutationObserver 主要在需要监听用户是否违规操作 DOM 的场景。
- 以水印为例，监听用户是否私自把页面的水印 DOM 进行删除，如果触发了事件则对水印进行恢复。
- 常规的页面水印是通过一个 DOM 元素来生成顶层的固定水印，如果用户有一定的网页知识可通过开发者工具来删除水印，这时就可以使用 MutationObserver 来监听 DOM 的操作。
### 代码的实现
- 我们可在加载完水印之后创建一个监听器，并且监听了 body 元素（因为常规的水印元素是body的直接子元素，如果直接监听刚才的水印元素，删除这个元素并不会触发监听器）
- 首先根据 mutation 的 removedNodes 字段判断是否进行了删除操作，如果是删除操作再根据是否有下一个相邻节点来判断节点恢复的位置，如果存在相邻节点就在其前面插入被删除的节点，否则直接在末尾追加。


## 实例方法
- MutationObserver是一个构造函数，他的实例会有 disconnect、observe和 takeRecords 三个方法

### 1. constructor
构造函数接收一个函数，用于在 DOM 变化时执行，该函数有两个参数：一个是描述所有被触发改动的 MutationRecord 对象数组，另一个是调用该函数的 MutationObserver 对象。

### 2. observe
- mutationObserver.observe(target[, options])
	- target: DOM 树中的一个要观察变化的DOM Node（可能是一个Element），或者是被观察的子节点树的根节点。
	- options: 一个可选的 MutationObserverInit 对象，此对象的配置项描述了 DOM 的哪些变化应该提供给当前观察者的 callback
		- attributes设为 true 以观察受监视元素的属性值变更。默认值为 false。
		- attributeFilter要监视的特定属性名称的数组。如未包含此属性，则对所有属性的更改都会触发变动通知。无默认值。
		- characterData设为 true 以监视指定目标节点或子节点树中节点所包含的字符数据的变化。无默认值
		- childList设为 true 以监视目标节点（如果 subtree 为 true，则包含子孙节点）添加或删除新的子节点。默认值为 false。
		- subtree的其他值也会作用于此子树下的所有节点，而不仅仅只作用于目标节点。默认值为 false。

### 3. disconnect
阻止 MutationObserver 实例继续接收的通知，直到再次调用其 observe() 方法，该观察者对象包含的回调函数都不会再被调用。

### 4. takeRecords
返回已检测到但尚未由观察者的回调函数处理的所有匹配 DOM 更改的列表，使变更队列保持为空。
DOM 变化之后并不是立即通知执行回调，而是等主线程代码执行完毕再通知，所以 takeRecords 可以将通知提前拦截。

```

```js
const DOMHandle = (mutationList, observer) => {
	mutationList.forEach(mutation => {
		switch(mutation.type) {
			case 'childList':
        // 从树上添加或移除一个或多个的子节点
        console.log('结点变更')
        break
			case 'attributes':
        // mutation.target 中某节点的一个属性值被更改
        console.log('属性变更')
        break
		}
	})
}

const observer = new MutationObserver(DOMHandler)
const node1 = document.getElementById('box')
observer.observe(node1, { attributes: true })
node1.setAttribute('name', 'willy') // 属性变更

observer.disconnect()
node1.setAttribute('name', 'cilly') // 调用之后再元素版本修改属性都不会再次出发之前的回调


const node2 = document.getElementById('app')
observer.observe(node2, {attributes: true})
node.setAttribute('name', 'king')
const notices = observer.takeRecords()  // 拦截 DOM 更改的回调
console.log(notice)

```



**【实例】防删除 DOM 元素水印**

```html
<ul>
  <li>测试删除 DOM 是否能恢复</li>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>

<script>
	window.onload = () => {
    loadMark(settings) // 加载水印

    // DOMHandler 在 typescript 中属于 MutationCallback
    const DOMHandler = (mutationList, observer) => {
      console.log(mutationList)
      mutationList.forEach((mutation) => {
        const { target, nextSibling, removedNodes } = mutation
        // 如果列表不为空，说明触发操作的动作是删除
        if (mutation.removedNodes.length) {
          if (nextSibling) {
            // 如果存在下一个相邻子节点执行插入
            console.log('恢复被删除的节点')
            target.insertBefore(removedNodes[0], nextSibling)
          } else {
            // 直接添加到 target 的末尾
            target.appendChild(removedNodes[0])
          }
        }
      })
    }

    const observer = new MutationObserver(DOMHandler)
    const node = document.body
    observer.observe(node, { attributes: true, childList: true, subtree: true })
  }
</script>
```

![恢复删除的水印](./image/recover_deleted_watermark.webp)



## Service Worker

```bash
## Service Worker


```



## Push API

```bash
## Push API
[Push API](https://developer.mozilla.org/zh-CN/docs/Web/API/Push_API)

Push API 允许服务器向用户的设备发送通知，即使用户当前没有打开网站。这意味着即使用户的浏览器是关闭的，只要设备能连接到互联网，服务器也可以推送通知。

Service Workers 是在 Web 浏览器中运行的一种脚本，可以在没有页面或用户界面的情况下运行。因此即使应用程序没有打开，Service Workers 也可以接收来自服务器的推送消息，并相应地对用户显示通知。

Web 应用想要使用推送，需要 Push API 与 Service Workers API 结合使用才能实现。必须在 Web 应用下的 ServiceWorker 处于激活状态，在 ServiceWorkerRegistration scope 下的 PushManager 来做推送订阅相关工作。
在 ServiceWorkerGlobalScope scope 下通过 onpush 来监听推送事件。

激活一个 service worker 来提供推送消息会导致资源消耗的增加，尤其是电池。不同的浏览器对此有不同的方案——目前为止还没有标准的机制。Firefox 允许对发送给应用的推送消息做数量限制（配额）。该限制会在站点每一次被访问之后刷新。相比之下，Chrome 选择不做限制，但要求站点在每一次消息到达后都显示通知，这样可以让用户确认他们仍希望接收消息并确保用户可见性。



### Push API 的使用流程大致如下：
1. 注册 Service Worker：首先，需要在客户端（用户的浏览器）注册一个 Service Worker。这个 Service Worker 负责监听推送事件并响应这些事件。
2. 订阅推送服务：通过 Service Worker，客户端向推送服务订阅，以接收来自服务器的推送消息。在订阅过程中，客户端会生成一对密钥（公钥和私钥），私钥保留在客户端，而公钥发送给服务器。
3. 将订阅信息发送给服务器：客户端将包含公钥和推送服务订阅信息的对象发送给服务器。服务器保留这些信息，用于之后的推送消息。
4. 服务器发送推送消息：当服务器想要发送消息时，它会使用保存的订阅信息和公钥向推送服务发送一个请求。推送服务负责将消息传递给正确的客户端。
5. 客户端接收消息：客户端的 Service Worker 会收到推送消息，并可以根据消息内容显示通知或执行其他相关操作。



### 最佳实践及安全措施
1. 生成 VAPID 密钥：使用 Web Push 协议时，需要生成一对 VAPID（Voluntary Application Server Identification）密钥。这些密钥用于鉴别服务器身份，确保推送服务能够验证请求的来源。您应该只在服务端生成和保存私钥。
2. 保存订阅信息：当用户订阅推送通知时，前端会生成一个包含端点和密钥的订阅对象。您需要将这个订阅对象安全地发送到后端并存储起来，因为每次发送消息时都需要使用这些信息。
3. 服务端保密：所有的服务端通信和操作，比如存储订阅信息、发送推送消息、管理 VAPID 密钥等，都应该是安全的。确保您的服务器使用 HTTPS 并且所有敏感操作都经过适当的鉴权和验证。
4. 用户体验：确保用户能够轻松管理他们的订阅偏好，包括取消订阅。发送给用户的每个推送通知都应该是有价值的，避免发送垃圾消息，因为这可能导致用户取消订阅。
5. 遵守限制和政策：不同的浏览器和推送服务可能有自己的使用限制和隐私政策。确保您的实现遵从这些政策，并且能够适应不同环境下的变化。
6. 消息有效载荷加密：推送消息通常需要加密以确保用户的隐私。web-push 库可以帮助您处理加密的细节。
7. 错误处理：在发送推送消息时，您可能会遇到各种错误，比如网络问题、推送服务的限制等。在服务端代码中实现适当的错误处理逻辑是很重要的。
8. 监控和调试：监控推送消息的发送状态和用户的订阅情况可以帮助您调试问题，并优化推送策略。
9. 正式环境：在生产环境中，您还需要考虑其他因素，比如缩放到成千上万的用户，以及服务端和客户端之间的安全通信。



### 浏览器关闭是否会收到推送
1. Android 系统
Android 系统的消息机制是系统级的，系统有单独的进程去监听推送消息，收到消息就会唤醒对应的应用程序来处理这个推送消息，无论应用是否关闭。所有应用都采用这种处理方式。所以当收到浏览器的推送消息时，会唤醒浏览器，然后浏览器再去激活相应 的 ServiceWorker 线程，然后触发推送事件。

2. MAC 系统：
MAC 系统下当打开应用后，默认关闭应用实际上还在后台运行，可以通过 dock 来查看。
可以看到未完全关闭的应用下面会有一个黑点来标志，在这种情况下，浏览器是可以收到推送消息的。
如果浏览器完全关闭，则当在浏览器打开后，浏览器同样会收到通知消息（TTL 有效时间内）。

3. Windows 系统
Windows 系统和 MAC 相似，但判断浏览器是否在后台运行比较复杂。



### 对于消息推送如何在浏览器上调试查看
Chrome 环境下，地址栏输入chrome://gcm-internals/，并点击Start Recording按钮进行录制。
通常来说，主要有两方面的问题：
  - 发送消息时的问题：
    - 授权问题
    - HTTP 状态码错误问题
  - 接收消息时的问题：
    - payload 加密问题
    - 连接问题


### 为什么 Push 比 Web Sockets 好
Push 是工作在 serviceWorker 线程下的，所以不关系浏览器窗口是否打开。而 Web Sockets 必须保证浏览器和网页处于打开状态才能正常工作。



### 国内服务器无法与 FCM/GCM 推送服务器通讯
在国内服务器对消息通讯的请求上部署代理服务器，如在 node 环境下用 web-push 库：
  webpush.sendNotification(
    subscription，
    data,
    {
      ... options,
      proxy: '代理地址'
    }
  )

```

### Push API 接口

```bash
### Push API 接口
- PushManager
- PushEvent
- PushMessageData
- PushSubscription
- PushSubscriptionOptions

```

#### PushManager

```bash
### PushManager
通过 ServiceWorkerRegistration.PushManager 获取。
PushManager 接口用于操作推送订阅。


#### `PushManager.subscribe()`：用于订阅推送服务。
返回一个 Promise 形式的  PushSubscription 对象，该对象包含推送订阅的详情。如果当前 service worker 没有已存在的订阅，则会创建一个新的推送订阅。
语法： `PushManager.subscribe(options).then(function(pushSubscription){ ... } )`
options 参数：
	- userVisibleOnly：布尔值，表示返回的推送订阅将只能被用于对用户可见的消息。在订阅时必须把此项设置为 true，这样当有消息推送给用户时，浏览器会展示一个消息通知，也就是说不存在静默推送。为了让用户可知。
	- applicationServerKey：推送服务器用来向客户端应用发送消息的公钥。该值是应用程序服务器生成的签名密钥对的一部分，可使用在 P-256 曲线上实现的椭圆曲线数字签名（ECDSA）。若是使用 VAPID 协议（Voluntary Application Server Identification：自主应用服务器标识），则需要将 Base64 的公钥转为 Uint8 的数组。


#### `PushSubscription.getSubscription()`：用于获取订阅对象 PushSubscription
返回一个 Promise 用来处理一个包含已经发布的分支的细节的PushSubscription 对象。如果没有已经发布的分支存在，返回null。
语法：`PushManager.getSubscription().then(function(pushSubscription){ ... })`


#### `PushSubscription.permissionState()`： 用于获取 PushManager 的权限状态
语法：`PushManager.permissionState(options).then(function(PushMessagingState){ ... })`
options 参数:
	- userVisibleOnly
	- applicationServerKey
返回 Promise，如下值：
  - granted：WEB 应用已授权 Push 权限。
  - denied：WEB 应用已拒绝 Push 权限。
  - prompt：WEB 应用未授权 Push 权限。
如下使用：`ServiceWorkerRegistration.pushManager.permissionState({userVisibleOnly: true})`

```

#### PushEvent

```bash
### PushEvent
Push API 接收消息时的事件。此事件在 ServiceWorkerGlobalScope 下响应。

属性
	- data：返回对 PushMessageData 类型，包含发送到的数据的对象。

```

#### PushMessageData

```bash
### PushMessageData
此接口为 PushEvent.data 中的类型。
与 Fetch 中 Body 的方法相似，不同处再于可以重复调用。

方法
	- arrayBuffer()
	- blob()
	- json()
	- text()
```

#### PushSubscription

````bash
### PushSubscription
PushSubscription 为 PushManager.subscribe() 的订阅信息类型。

#### 属性
	- endpoint：包含订阅相关的推送服务器的信息。以 URL 形式展示。最好对于这个 URL 安全，防止被其他人劫持它并滥用推送功能。
	- expirationTime：返回与推送订阅关联的订阅到期时间（如果有），否则返回null。
	- options：PushSubscriptionOptions 类型，订阅时的 options 信息，包含：
		- applicationServerKey
		- userVisibleOnly


#### 方法
1. getKey()
用于获取 PushSubscription 中订阅的公钥信息，返回 ArrayBuffer。
语法：`const key = subscription.getKey(name)`
name 参数：
	- p256dh：P-256曲线上的椭圆曲线Diffie-Hellman公钥（即NIST secp256r1椭圆曲线）。 生成的密钥是ANSI X9.62格式的未压缩点。
	- auth：身份验证密钥，Web推送的加密描述。


2. toJSON()
序列化 PushSubscription 对象，用于存储和发送给应用服务器。
`subscription.toJSON()` 返回如下结构：
    {
      endpoint: "https://fcm.googleapis.com/fcm/send/xxx:zzzzzzzzz"
      expirationTime: null
      keys: {
        auth: "xxxx-zzzz"
        p256dh: "BasdfasdfasdfasdffsdafasdfFMRs"
      }
    }


3. unsubscribe()
用于取消订阅推送服务。
返回 Promise 的 Boolean。如果 true，则退订成功。
语法：`PushSubscription.unsubscribe().then(function(Boolean) { ... })`

````

### 接口间的关系图

> #### 接口间的关系
>
> ![image-20240228203329693](./image/image-20240228203329693.png)
>
> #### 相关属性、方法
>
> ![202402282040](./image/202402282040.png)



### Push 相关事件

```bash
### Push 相关事件
Push API 通过下面的 serviceWorker 事件来监控并响应推送和订阅更改事件。


#### onpush
当 ServiceWorker 收到 Push-Server 推送的消息时，就会触发 ServiceWorkerGlobalScope 接口的 onpush 事件。
语法：
	- `ServiceWorkerGlobalScope.onpush = function(PushEvent) { ... }`
	- `self.addEventListener('push', function(PushEvent) { ... })`
通过 PushEvent.data 来获取 PushMessageData 类型的推送消息中的数据。


#### onpushsubscriptionchange
当订阅信息发生改变时，会触发 ServiceWorkerGlobalScope 接口的 onpushsubscriptionchange 事件，
例如：如果推送服务器设置了订阅到期时间，则可能会触发此事件。（正常订阅/退订时不会触发此事件）
发生此事件时，通常需要重新订阅推送服务器，并把新的订阅体发送给应用服务器。
语法：
	- `ServiceWorkerGlobalScope.onpushsubscriptionchange = function() { ... }`
	- `self.addEventListener('pushsubscriptionchange', function() { ... })`

```



### 订阅原理

#### 详细执行过程

![202402282058](./image/202402282058.png)

#### 浏览器端订阅

```bash
### 浏览器端订阅
浏览器端在订阅 Push Server 时，必须 Notification 是授权的，否则会出现授权窗口，这里的授权交互和 Notification 的授权是一样的。

注意：Notificatino 的授权状态手动调整改变后，订阅体将失效，需要重新订阅。

注意：目前大部分国内网络环境无法访问 Chrome 的 FCM 推送服务器，所以在不出海的网络环境下浏览器无法完成订阅。FireFox 的推送服务器不存在此问题，所以可以在 FireFox 下测试此功能。

关于推送请求问题，需要使用 VAPID 协议。

订阅时applicationServerKey 使用 VAPID 公钥作为识别标示，规范中要求公钥需要 UInt8 类型，所以订阅前要进行类型转换。

```

![image-20240228204948313](./image/image-20240228204948313.png)

```js
// 浏览器订阅
navigator.serviceWorker.ready.then(swReg => {
  swReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      )
	}).then(pushSubscription => {
    // 将订阅信息发送到你的应用服务器
    fetch("https://你的应用服务器", {
      method: "post",
      body: JSON.stringify(pushSubscription.toJSON())
    });
  }).catch(e => {
    console.log('订阅失败', e)
    console.log('授权状态：' + await self.registration.pushManager.permissionState({userVisibleOnly:true}))
  });
});

```

#### 应用服务器端发送

```bash
### 应用服务器端发送
应用服务器从数据库里取出你的订阅信息，然后根据 Web Push 协议要求，对要发送的消息进行拼装和加密，然后发送给相应的 Push 服务器，然后 Push 服务器再根据订阅信息中的标志发送给相应的终端。

```

![image-20240228205239484](./image/image-20240228205239484.png)

#### 设备端接收

```bash
### 设备端接收
浏览器端收到推送消息后，会激活相应的 ServiceWorker 线程，并触发 Push 事件。
例如收到消息后，展示一个 Notification，或者做任何其他的事。
```

![image-20240228205720647](./image/image-20240228205720647.png)

```js
// serviceWorker 环境下
self.addEventListener("push", function(event) {
  // 此处可以做任何事
  console.log("push", event);
  
  var data = event.data.json();
  	
  if (!(self.Notification && self.Notification.permission === "granted")) {
    return;
  }
  self.registration.showNotification(data.title, {
    body: data.body
  });
});

```

### 加密认证

### 浏览器订阅

```bash
### 浏览器订阅
在 `subscribe()` 方法中的 `applicationServerKey` 选项用于推送服务器鉴别订阅用户的应用服务，并用确保推送消息发送给哪个订阅用户。

`applicationServerKey` 是一对公私钥。私钥应用服务器保存，公钥交给浏览器，浏览器订阅时将这个公钥传给推送服务器，这样推送服务器可以将你的公钥和用户的 `PushSubscription` 绑定。

```



### 你的服务器发送

```bash
### 你的服务器发送
当你的服务器要发送推送消息时，需要创建一个 `Authorization` 的 header 头，`Authorization` 由规范要求的加密算法进行私钥加密。推送消息收到消息时，首先取消息请求中 `endpoint` 对应的公钥，解码消息请求中签名过的 `Authorization` header 头，验证签名是否合法，防止它人伪造身份。通过后，推送服务器把消息发送到相应的设备浏览器。

注：这里说的 applicationServerKey 就是 VAPID key。


### JWT 加密生成 Authorization 信息
Authorization 的签名采用 JWT（JSON web token），JWT 是一种向第三方发送消息的方式，三方收到后，获取发送者的公钥进行验证 JWT 的签名。
Authorization 对 JWT 签名的格式要求：`Authorization: 'WebPush <JWT Info>.<JWT Data>.<Signature>'`
在签名的前面加上 WebPush 作为 Authorization 头的值发送给推送服务器。
推送协议同时要求Crypto-Key header 头，用来发送公钥，并需要p256ecdsa=前缀，格式：`Crypto-Key: p256ecdsa=<URL Safe Base64 Public Application Server Key>
`

```

#### 关于消息部分的加密

```bash
### 关于消息部分的加密
发送的消息部分（即 payload）为了保证安全性，协议里同样要求需要加密，且推送服务器无法解密，只有浏览器才能解密消息数据。

在浏览器向推送服务器进行订阅后产生的订阅体，在这里就用的上了，再看下结构：
    {
      endpoint: "https://fcm.googleapis.com/fcm/send/xxx:zzzzzzzzz"
      expirationTime: null
      keys: {
        auth: "xxxx-zzzz"
        p256dh: "BasdfasdfasdfasdffsdafasdfFMRs"
      }
    }


结构中的 keys 字段就是浏览器端的密钥信息，由浏览器生成。
加密需要 auth、p256dh和payload 三个值做为输入进行加密，加密过程比较复杂。

```

**FCM的请求DEMO**

```json
{
  'hostname': "fcm.googleapis.com",
  'port': null,
  'path':
    "/fcm/send/xxx-xx:APA91bFzxDp-j-xoN_kxqzie3uJS1aSNI5wI4SXL34dLWPFFa3QSZVBOE6eG7b4tb2RIvqUy3d3ww57In2lFsZW5MVsjQRtPFfbKoq9XqqrsTwRZiPDbPcbwZ4vkmv_1lnIHRo5yOxQF",
  'headers': {
    'TTL': 3600,
    "Content-Length": 224,
    "Content-Type": "application/octet-stream",
    "Content-Encoding": "aesgcm",
    'Encryption': "salt=lIiVReih7lcahHxS2UhENA",
    "Crypto-Key":
      "dh=BG9SmS2AixNf9UgRlOr1aEiVQMH5h47cAz0FW-_m9MRiwLqrUUP9DhrbFGXqaHAYh12IyKtvySbnDYNmF3Mh0d0;p256ecdsa=BDTgN25YAAabqE6ANPP49d2EkoLAMxT4xDZxE5BdrCHPyq1zk36LofZ2M3DYosxZzSG7i_26S1ViOGC_rBifW_U",
    'Authorization':
      "WebPush eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJodHRwczovL2ZjbS5nb29nbGVhcGlzLmNvbSIsImV4cCI6MTU1OTA3ODEwOSwic3ViIjoiaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL2Z1bmRhbWVudGFscy8ifQ.Fa3nW6Lt7cp2dGML71aZItdyIcEabZ4GRVtkQBc3dWavAGH3_xSh0jnT-Cy8vGHJrwwRSRKaOcbt-uniIYt6fA"
  },
  'method': "POST"
}
```



#### VAPID key 生成

```bash
### VAPID key 生成
密钥使用 ECDSA（椭圆曲线迪菲-赫尔曼金钥交换）的 ES256 算法（ECDSA使用 P-256 曲线和 SHA-256 哈希算法的缩写）。


基于 node 实现：
$ npm install -g web-push
$ web-push generate-vapid-keys

```

##### 基于浏览器 JS 实现

```js
function generateNewKeys() {
  return crypto.subtle.generateKey({name: 'ECDH', namedCurve: 'P-256'},
    true, ['deriveBits'])
  .then((keys) => {
    return cryptoKeyToUrlBase64(keys.publicKey, keys.privateKey);
  });
}

function cryptoKeyToUrlBase64(publicKey, privateKey) {
  const promises = [];
  promises.push(
    crypto.subtle.exportKey('jwk', publicKey)
    .then((jwk) => {
      const x = base64UrlToUint8Array(jwk.x);
      const y = base64UrlToUint8Array(jwk.y);

      const publicKey = new Uint8Array(65);
      publicKey.set([0x04], 0);
      publicKey.set(x, 1);
      publicKey.set(y, 33);

      return publicKey;
    })
  );

  promises.push(
    crypto.subtle
      .exportKey('jwk', privateKey)
    .then((jwk) => {
      return base64UrlToUint8Array(jwk.d);
    })
  );

  return Promise.all(promises)
  .then((exportedKeys) => {
    return {
      public: uint8ArrayToBase64Url(exportedKeys[0]),
      private: uint8ArrayToBase64Url(exportedKeys[1]),
    };
  });
}

function base64UrlToUint8Array(base64UrlData) {
  const padding = '='.repeat((4 - base64UrlData.length % 4) % 4);
  const base64 = (base64UrlData + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const buffer = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    buffer[i] = rawData.charCodeAt(i);
  }
  return buffer;
}

function uint8ArrayToBase64Url(uint8Array, start, end) {
  start = start || 0;
  end = end || uint8Array.byteLength;

  const base64 = window.btoa(
    String.fromCharCode.apply(null, uint8Array.subarray(start, end)));
  return base64
    .replace(/\=/g, '') // eslint-disable-line no-useless-escape
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

```

##### 应用服务器端实现

```js
// 这里用 node 来实现一下应用服务器向推送服务器发送消息
// 其他语言环境可参考 [web-push-libs](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fweb-push-libs)

const webpush = require("web-push");

const options = {
  vapidDetails: {
    subject: "mail@you.com", // 你的联系邮箱
    publicKey: "公钥",
    privateKey: "私钥"
  },
  TTL: 60 * 60 // 有效时间，单位秒
};

const subscription = db.getUser("xxx"); // 从数据库取用户的订阅对象
const payload = {
  // 要发送的消息
  msg: "hellow"
};

// 发送消息到推送服务器
webpush
  .sendNotification(subscription, payload, options)
  .then(() => {})
  .catch(err => {
    // err.statusCode
  });


```

