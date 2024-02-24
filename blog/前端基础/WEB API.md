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

### Push API

```bash
### Push API
Push API 允许服务器向用户的设备发送通知，即使用户当前没有打开网站。这意味着,即使用户的浏览器是关闭的，只要设备是连接到互联网的，服务器也可以推送通知。

Push API 通常与 Service Workers API 结合使用来实现这种功能。
Service Workers 是在 Web 浏览器中运行的一种脚本，可以在没有页面或用户界面的情况下运行。因此，即使应用程序没有打开，Service Workers 也可以接收来自服务器的推送消息，并相应地对用户显示通知。


#### Push API 的使用流程大致如下：
1. 注册 Service Worker：首先，需要在客户端（用户的浏览器）注册一个 Service Worker。这个 Service Worker 负责监听推送事件并响应这些事件。
2. 订阅推送服务：通过 Service Worker，客户端向推送服务订阅，以接收来自服务器的推送消息。在订阅过程中，客户端会生成一对密钥（公钥和私钥），私钥保留在客户端，而公钥发送给服务器。
3. 将订阅信息发送给服务器：客户端将包含公钥和推送服务订阅信息的对象发送给服务器。服务器保留这些信息，用于之后的推送消息。
4. 服务器发送推送消息：当服务器想要发送消息时，它会使用保存的订阅信息和公钥向推送服务发送一个请求。推送服务负责将消息传递给正确的客户端。
5. 客户端接收消息：客户端的 Service Worker 会收到推送消息，并可以根据消息内容显示通知或执行其他相关操作。



#### 最佳实践及安全措施
1. 生成 VAPID 密钥：使用 Web Push 协议时，需要生成一对 VAPID（Voluntary Application Server Identification）密钥。这些密钥用于鉴别服务器身份，确保推送服务能够验证请求的来源。您应该只在服务端生成和保存私钥。
2. 保存订阅信息：当用户订阅推送通知时，前端会生成一个包含端点和密钥的订阅对象。您需要将这个订阅对象安全地发送到后端并存储起来，因为每次发送消息时都需要使用这些信息。
3. 服务端保密：所有的服务端通信和操作，比如存储订阅信息、发送推送消息、管理 VAPID 密钥等，都应该是安全的。确保您的服务器使用 HTTPS 并且所有敏感操作都经过适当的鉴权和验证。
4. 用户体验：确保用户能够轻松管理他们的订阅偏好，包括取消订阅。发送给用户的每个推送通知都应该是有价值的，避免发送垃圾消息，因为这可能导致用户取消订阅。
5. 遵守限制和政策：不同的浏览器和推送服务可能有自己的使用限制和隐私政策。确保您的实现遵从这些政策，并且能够适应不同环境下的变化。
6. 消息有效载荷加密：推送消息通常需要加密以确保用户的隐私。web-push 库可以帮助您处理加密的细节。
7. 错误处理：在发送推送消息时，您可能会遇到各种错误，比如网络问题、推送服务的限制等。在服务端代码中实现适当的错误处理逻辑是很重要的。
8. 监控和调试：监控推送消息的发送状态和用户的订阅情况可以帮助您调试问题，并优化您的推送策略。
9. 正式环境：在生产环境中，您还需要考虑其他因素，比如缩放到成千上万的用户，以及服务端和客户端之间的安全通信。一定要阅读和遵循推送服务提供商的文档以确保您的实现是符合标准的。

```



