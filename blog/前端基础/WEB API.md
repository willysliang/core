---
Author: willysliang
CreateTime: 2024-02-19 11:34:54
Modifier: willysliang
ModifiedTime: 2024-02-19 16:07:25
Description: WEB API
---

## WEB API

## HTML5 API

### 地理定位 Geolocation

```bash
地理定位API(Geolocation API) 可以获取用户的地理位置。

它是基于权限的，要求用户批准在一个网站和一个请求的基础上共享该数据。它还需要 SSL 证书，尽管在本地运行时可以不使用 SSL 证书。

- `Geolocation.getCurrentPosition()` — 返回一个 Position 对象，表示用户的当前位置。


- `Geolocation.watchPosition()` — 指定一个监听函数，每当用户的位置发生变化，就执行该监听函数。


- `navigator.getCurrentPosition(successCallback, errorCallback, options)` 获取当前地理信息
- `navigator.watchPosition(successCallback, errorCallback, options) ` 指定一个监听函数，每当用户的位置发生变化，就执行该监听函数。
- `Geolocation.clearWatch()` — 取消 watchPosition 方法指定的监听函数。

说明：
- 当成功获取地理信息后，会调用succssCallback，并返回一个包含位置信息的对象`position`
    - `coords`即坐标
    - `position.coords.latitude`纬度
    - `position.coords.longitude`经度

- 当获取地理信息失败后，会调用errorCallback，并返回错误信息error。

- 可选参数 options 对象可以调整位置信息数据收集方式
    - `enableHighAccuracy` — 是否返回高精度结果。
    		如果设为 `true`，可能导致响应时间变慢或（移动设备的）功耗增加；
    		如果设为 `false`，设备可以更快速地响应。
    		默认值为 `false`。
    - `timeout` — 正整数，表示等待查询的最长时间，单位为毫秒。默认值为 `Infinity`。
    - `maximumAge` — 正整数，表示可接受的缓存最长时间，单位为毫秒。
    		如果设为 `0`，表示不返回缓存值，必须查询当前的实际位置；
    		如果设为 `Infinity`，必须返回缓存值，不管缓存了多少时间。
    		默认值为 `0`。



### Coordinates 对象
`Position.coords` 属性来使用 `Coordinates` 对象，该坐标接口用于表示设备在地球上的位置和海拔，以及计算这些属性的精确度。
    - `Coordinates.latitude` — 表示纬度。
    - `Coordinates.longitude` — 表示经度。
    - `Coordinates.altitude` — 表示相对于海平面的位置海拔（单位：米）。如果实现无法提供数据，则此值可以为 `null`。
    - `Coordinates.accuracy` — 表示经度和纬度属性的精度（单位：米）。
    - `Coordinates.altitudeAccuracy` —表示海拔的精度（单位：米）。此值可以为 `null`。
    - `Coordinates.speed` — 表示设备的速度（单位：米/秒）。此值可以为 `null`。
    - `Coordinates.heading` — 表示设备运行的方向（单位：度）。表示设备离正北方向有多远。0 度表示正北，方向是顺时针方向确定的（这意味着东是 90 度，西是 270 度）。如果 `Coordinates.speed` 为 0，`heading` 属性返回 `NaN`。如果设备无法提供标题信息，则此值为 `null`。
```

```js
/* 兼容处理;如果支持，获取用户地理信息
navigator:导航  geolocation:地理定位 */
if (window.navigator.geolocation) {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }

  const success = (pos) => {
    const crd = pos.coords
    console.log(`经度：${crd.latitude} 度`)
    console.log(`纬度：${crd.longitude} 度`)
    console.log(`海拔：${crd.altitude} 米`)
    console.log(`经度和纬度属性的精度：${crd.accuracy} 米`)
    console.log(`海拔的精确度：${crd.altitudeAccuracy} 米`)
    console.log(`设备的速度：${crd.speed} 米/秒`)
    console.log(`设备运行的方向：${crd.heading} 度`)
  }

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }
  navigator.geolocation.getCurrentPosition(success, error, options)
} else {
  console.log('sorry,你的浏览器不支持地理定位');
}
```



### 视频 Viode

```bash
## <video>标签的属性
src ：视频的属性
poster：视频封面，没有播放时显示的图片
preload：预加载
autoplay：自动播放
loop：循环播放
controls：浏览器自带的控制条
width：视频宽度
height：视频高度


<video id="media" src="http://www.sundxs.com/test.mp4" controls width="400px" heigt="400px"></video>

### audio和video都可以通过JS获取对象,JS通过id获取video和 audio的对象
获取video对象
Media = document.getElementById("media");
Media方法和属性：
HTMLVideoElement和HTMLAudioElement 均继承自HTMLMediaElement
Media.error; //null:正常
Media.error.code; //1.用户终止 2.网络错误 3.解码错误 4.URL无效

### 网络状态
- Media.currentSrc; //返回当前资源的URL
- Media.src = value; //返回或设置当前资源的URL
- Media.canPlayType(type); //是否能播放某种格式的资源
- Media.networkState; //0.此元素未初始化 1.正常但没有使用网络 2.正在下载数据 3.没有找到资源
- Media.load(); //重新加载src指定的资源
- Media.buffered; //返回已缓冲区域，TimeRanges
- Media.preload; //none:不预载 metadata:预载资源信息 auto:

### 准备状态
- Media.readyState;//1:HAVE_NOTHING 2:HAVE_METADATA 3.HAVE_CURRENT_DATA 4.HAVE_FUTURE_DATA 5.HAVE_ENOUGH_DATA
- Media.seeking; //是否正在seeking

### 回放状态
Media.currentTime = value; //当前播放的位置，赋值可改变位置
Media.startTime; //一般为0，如果为流媒体或者不从0开始的资源，则不为0
Media.duration; //当前资源长度 流返回无限
Media.paused; //是否暂停
Media.defaultPlaybackRate = value;//默认的回放速度，可以设置
Media.playbackRate = value;//当前播放速度，设置后马上改变
Media.played; //返回已经播放的区域，TimeRanges，关于此对象见下文
Media.seekable; //返回可以seek的区域 TimeRanges
Media.ended; //是否结束
Media.autoPlay; //是否自动播放
Media.loop; //是否循环播放
Media.play(); //播放
Media.pause(); //暂停


### 视频控制
Media.controls;//是否有默认控制条
Media.volume = value; //音量
Media.muted = value; //静音
TimeRanges(区域)对象
TimeRanges.length; //区域段数
TimeRanges.start(index) //第index段区域的开始位置
TimeRanges.end(index) //第index段区域的结束位置


### 相关事件
  var eventTester = function(e){
     Media.addEventListener(e,function(){
         console.log((new Date()).getTime(),e)
     },false);
 }
eventTester("loadstart"); //客户端开始请求数据
eventTester("progress"); //客户端正在请求数据
eventTester("suspend"); //延迟下载
eventTester("abort"); //客户端主动终止下载（不是因为错误引起）
eventTester("loadstart"); //客户端开始请求数据
eventTester("progress"); //客户端正在请求数据
eventTester("suspend"); //延迟下载
eventTester("abort"); //客户端主动终止下载（不是因为错误引起），
eventTester("error"); //请求数据时遇到错误
eventTester("stalled"); //网速失速
eventTester("play"); //play()和autoplay开始播放时触发
eventTester("pause"); //pause()触发
eventTester("loadedmetadata"); //成功获取资源长度
eventTester("loadeddata"); //
eventTester("waiting"); //等待数据，并非错误
eventTester("playing"); //开始回放
eventTester("canplay"); //可以播放，但中途可能因为加载而暂停
eventTester("canplaythrough"); //可以播放，歌曲全部加载完毕
eventTester("seeking"); //寻找中
eventTester("seeked"); //寻找完毕
eventTester("timeupdate"); //播放时间改变
eventTester("ended"); //播放结束
eventTester("ratechange"); //播放速率改变
eventTester("durationchange"); //资源长度改变
eventTester("volumechange"); //音量改变
```



### 全屏 fullScreen

- HTML5规范允许用户自定义网页上任意元素全屏显示
- 开启全屏显示：`requestFullscreen()`
- 关闭全屏显示：`cancleFullscreen()`
- 检测当前是否处于全屏状态：`document.fullScreen`

```js
// 1. 开启全屏显示
requestFullscreen()
webkitRequestFullScreen
webkitCancleFullScreen

// 2. 关闭全屏下显示
cancleFullscreen()
mozRequestFullScreen
mozCancleFullScreen

// 3. 检测当前是否处于全屏状态
document.fullScreen
document.webkitIsFullScreen
document.mozFullScreen

// 4. 全屏的伪类
:full-screen {}
:-webkit-full-screen {}
:moz-full-screen {}
```

```html
<style>
  .box {
    width: 250px;
    height: 250px;
    background-color: green;
    margin: 100px auto;
    border-radius: 50%;
  }

  /*全屏伪类：当元素处于全屏时，改变元素的背景色*/
  .box:-webkit-full-screen,
  .box:-moz-full-screen,
  .box:-ms-fullscreen {
    background-color: red;
  }
</style>

<script>
  // 开启全屏显示的兼容写法
  function launchFullScreen(elem) {
    if (elem.requestFullScreen) {
      // 如果支持全屏，那就让元素全屏
      elem.requestFullScreen()
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen()
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen()
    } else {
      elem.oRequestFullScreen()
    }
  }

  document.querySelector('.box').onclick = () => {
    launchFullScreen(document.querySelector('.box'))
  }
</script>
```



### Web存储 Storage

> ````bash
> ## 本地存储
> - 本地存储`window.localStorage`：保存在浏览器内存或硬盘中
> - 永久生效，除非手动删除
> - 可以多窗口共享数据
>
>
> ## 会话存储
> - 会话存储`window.sessionStorage`：保存在内存中
> - 当窗口关闭时销毁数据
> - 在同一个窗口下可共享数据
>
>
> ## Web存储特性
> - 设置、读取方便。
> - 容量较大，sessionStorage 约5M、localStorage 约20M（`document.cookie`只有4k）
> - 只能存储字符串，可以将对象 JSON.stringify() 编码后存储。
>
>
> ## 存储方式
> 1. 设置存储内容(若存在该则替换内容)：`setItem(key, value);`
> 2. 读取存储内容：`getItem(key);`
> 3. 根据键，删除存储内容：`removeItem(key);`
> 4. 清空所有存储内容：`clear();`
> 5. 根据索引值来获取存储内容：`key(n);`
> ````
>
> #### 使用class设置本地存储过期时间
>
> ```js
> class Storage {
>   constructor(time) {
>     this.time = time;
>   }
>   // this.time/1000 秒后清除localhost成功
>   setItems(key, val) {
>     localStorage.setItem(key,val);
>     setTimeout(() => {
>       localStorage.removeItem(key)
>     }, this.time);
>   }
> }
> let a = new Storage(5000).setItems('a', 'b');
> ```

### 网络状态 online/offline

> ```bash
> - `window.online` ：检测用户当前的网络状况，返回一个布尔值
> - `window.online`：用户网络连接时被调用
> - `window.offline`：用户网络断开时被调用（拔掉网线或者禁用以太网）
> ```
>
> ```js
> window.addEventListener('online', function () {
>   alert('网络连接建立！');
> });
> window.addEventListener('offline', function () {
>   alert('网络连接断开！');
> })
> ```

### 应用缓存 cache

> - 构建一个离线（无网络状态）应用，需要创建 `cache manifest` 缓存清单文件
>     缓存清单文件中列出了浏览器应缓存，以供离线访问的资源。
>     推荐使用 `.appcache`作为后缀名，另外还要添加MIME类型。
> - 应用缓存的优势
>     - 可配置需要缓存的资源；
>     - 网络无连接应用仍可用；
>     - 本地读取缓存资源，提升访问速度，增强用户体验；
>     - 减少请求，缓解服务器负担。
>
> - **应用缓存清单内容**
>     1. 顶行写CACHE MANIFEST。
>     2. CACHE: 指定需要缓存的静态资源，如.css、image、js等。
>     3. NETWORK: 指定需要在线访问的资源，可使用通配符（不需缓存、必须在网络下才能访问的资源）。
>     4. FALLBACK: 当被缓存的文件找不到时的备用资源（当访问不到某个资源时，自动由另外一个资源替换）。
>
> ```appcache
> CACHE MANIFEST
>
> #要缓存的文件
> CACHE:
>     images/img1.jpg
>     images/img2.jpg
>
> #指定必须联网才能访问的文件
> NETWORK:
>      images/img3.jpg
>      images/img4.jpg
>
> #当前页面无法访问是回退的页面
> FALLBACK:
>     404.html
> ```



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



## 无框架 Web 组件(Web Components)

```bash
## 无框架 Web 组件
Web 组件是一套不同的技术，允许创建可重复使用的定制元素（它们的功能封装在您的代码之外）并且在您的 Web 应用中使用它们，不需要任何外部库来工作。


### 特性
- Custom elements（自定义元素）
- Shadow DOM（影子DOM）
- HTML template（HTML模板）
- HTML import（允许导入外部html文档）


### Web 组件工程流程
Web组件允许添加自己的 HTML 自定义元素，元素名称必须要包含连字符（`-`），以确保它不会与正式 HTML 元素冲突。
然后为您的自定义元素注册一个 ES6 类（`class`）。它可以附加 DOM 元素，如按钮、标题、段落等。为了确保这些元素不会与页面的其余部分冲突，您可以将它们附加到具有自己范围样式的内部 Shadow DOM。您可以将其视为迷你版 `<iframe>`，尽管 CSS 属性（如字体和颜色）是通过级联继承的。
最后，您可以使用可重用的 HTML 模板将内容附加到 Shadow DOM 中，HTML 模板通过标签提供一些配置。


### Wen 组件的优势
与框架相比，标准 web 组件是最基本的。它们不包括数据绑定和状态管理等功能，但 web 组件具有一些自身优势：
	- 它们轻巧快速
	- 它们可以实现单独用 JavaScript 无法实现的功能（例如 Shadow DOM）
	- 它们可以在任何 JavaScript 框架内工作
	- 它们将得到浏览器的支持。
```



### 自定义元素的内容

```html
<body>
  <user-card></user-card>
  <user-card></user-card>

  <script type="text/javascript">
    /**
     * @description 用户卡片组件
     * UserCard就是自定义元素的类。注意，这个类的父类是HTMLElement，因此继承了 HTML 元素的特性
     */
    class UserCard extends HTMLElement {
      constructor() {
        super()

        this._render()
      }

      _render() {
        var image = document.createElement('img')
        image.src = 'https://semantic-ui.com/images/avatar2/large/kristy.png'
        image.style.height = '100px'
        image.classList.add('image')

        var container = document.createElement('div')
        container.classList.add('container')

        var name = document.createElement('p')
        name.classList.add('name')
        name.innerText = 'User Name'

        var email = document.createElement('p')
        email.classList.add('email')
        email.innerText = 'yourmail@some-email.com'

        var button = document.createElement('button')
        button.classList.add('button')
        button.innerText = 'Follow'

        container.append(name, email, button)

        // this.append()的this表示自定义元素实例
        this.append(image, container)
      }
    }

    // 告诉浏览器<user-card>元素与这个类关联
    window.customElements.define('user-card', UserCard)
  </script>
</body>
```



### 使用 `<template>` 标签定义 DOM

```html
<body>
  <user-card></user-card>
  <user-card></user-card>

  <template id="userCardTemplate">
    <img src="https://semantic-ui.com/images/avatar2/large/kristy.png" style="height: 100px;" class="image">
    <div class="container">
      <p class="name">User Name</p>
      <p class="email">yourmail@some-email.com</p>
      <button class="button">Follow</button>
    </div>
  </template>

  <script type="text/javascript">
    /**
     * @description 用户卡片组件
     * UserCard就是自定义元素的类。注意，这个类的父类是HTMLElement，因此继承了 HTML 元素的特性
     */
    class UserCard extends HTMLElement {
      constructor() {
        super()

        this._render()
      }

      _render() {
        var templateEle = document.getElementById('userCardTemplate')
        var content = templateEle.content.cloneNode(true)
        this.append(content)
      }
    }

    // 告诉浏览器<user-card>元素与这个类关联
    window.customElements.define('user-card', UserCard)
  </script>
</body>
```



### 添加样式

```html
<body>
  <user-card></user-card>
  <user-card></user-card>

  <template id="userCardTemplate">
    <style>
      /* :host 伪类选择器允许选择 shadow 宿主（包含 shadow 树的元素），指代自定义元素本身 */
      :host {
        display: flex;
        align-items: center;
        width: 450px;
        height: 180px;
        background-color: #d4d4d4;
        border: 1px solid #d5d5d5;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        overflow: hidden;
        padding: 10px;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
      }
      .image {
        flex: 0 0 auto;
        width: 160px;
        height: 160px;
        vertical-align: middle;
        border-radius: 5px;
      }
      .container {
        box-sizing: border-box;
        padding: 20px;
        height: 160px;
      }
      .container > .name {
        font-size: 20px;
        font-weight: 600;
        line-height: 1;
        margin: 0;
        margin-bottom: 5px;
      }
      .container > .email {
        font-size: 12px;
        opacity: 0.75;
        line-height: 1;
        margin: 0;
        margin-bottom: 15px;
      }
      .container > .button {
        padding: 10px 25px;
        font-size: 12px;
        border-radius: 5px;
        text-transform: uppercase;
      }
    </style>

    <img src="https://semantic-ui.com/images/avatar2/large/kristy.png" class="image">
    <div class="container">
      <p class="name">User Name</p>
      <p class="email">yourmail@some-email.com</p>
      <button class="button">Follow</button>
    </div>
  </template>

  <script type="text/javascript">
    class UserCard extends HTMLElement {
      constructor() {
        super()

        this._render()
      }

      _render() {
        var templateEle = document.getElementById('userCardTemplate')
        var content = templateEle.content.cloneNode(true)
        this.append(content)
      }
    }

    // 告诉浏览器<user-card>元素与这个类关联
    window.customElements.define('user-card', UserCard)
  </script>
</body>
```



### 自定义元素的参数

```html
<body>
  <user-card
 		image="https://semantic-ui.com/images/avatar2/large/kristy.png"
		name="User Name"
	></user-card>

  <template id="userCardTemplate">
    <img class="image" style="height: 160px; border-radius: 5px;">
    <div class="container">
      <p class="name"></p>
      <p class="email"></p>
      <button class="button">Follow John</button>
    </div>
  </template>

  <script type="text/javascript">
    class UserCard extends HTMLElement {
      constructor() {
        super()
        this._render()
      }

      _render() {
        var templateElem = document.getElementById('userCardTemplate');
        var content = templateElem.content.cloneNode(true);
        content.querySelector('img').setAttribute('src', this.getAttribute('image'));
        content.querySelector('.container>.name').innerText = this.getAttribute('name');
        content.querySelector('.container>.email').innerText = this.getAttribute('email');
        this.appendChild(content);
      }
    }

    // 告诉浏览器<user-card>元素与这个类关联
    window.customElements.define('user-card', UserCard)
  </script>
</body>
```



### Shadow DOM

Web Component 允许内部代码隐藏起来，这叫做 Shadow DOM。即这部分 DOM 默认与外部 DOM 隔离，内部任何代码都无法影响外部。
自定义元素的 `this.attachShadow()` 方法可以开启 Shadow DOM。

```html
<body>
  <user-card
    image="https://semantic-ui.com/images/avatar2/large/kristy.png"
    name="User Name"
    email="yourmail@some-email.com"
  ></user-card>

  <template id="userCardTemplate">
    <img class="image" style="height: 160px; border-radius: 5px;">
    <div class="container">
      <p class="name"></p>
      <p class="email"></p>
      <button class="button">Follow John</button>
    </div>
  </template>

  <script type="text/javascript">
    class UserCard extends HTMLElement {
      constructor() {
        super()

        this._render()
      }

      _render() {
        var shadow = this.attachShadow( { mode: 'closed' } );

        var templateElem = document.getElementById('userCardTemplate');
        var content = templateElem.content.cloneNode(true);
        content.querySelector('img').setAttribute('src', this.getAttribute('image'));
        content.querySelector('.container>.name').innerText = this.getAttribute('name');
        content.querySelector('.container>.email').innerText = this.getAttribute('email');

        shadow.appendChild(content);
      }
    }

    // 告诉浏览器<user-card>元素与这个类关联
    window.customElements.define('user-card', UserCard)
  </script>
</body>
```



### 插槽

```html
<body>
  <element-details>
    <span slot="element-name">插槽</span>
    <span slot="description"
      >用户可以用自己编写的标记填充至 web 组件中的占位符，从而达到组合不同 DOM
      树的效果。</span
    >
    <dl slot="attributes">
      <dt>名称</dt>
      <dd>插槽的名称</dd>
    </dl>
  </element-details>

  <element-details>
    <span slot="element-name">模板</span>
    <span slot="description"
      >一种用于保存客户端内容的机制，此类内容不会在页面加载时呈现，但随后可能在运行时使用
      JavaScript 实例化。</span
    >
  </element-details>

  <template id="element-details-template">
    <style>
      details {
        font-family: "Open Sans Light", Helvetica, Arial;
      }
      .name {
        font-weight: bold;
        color: #217ac0;
        font-size: 120%;
      }
      h4 {
        margin: 10px 0 -8px 0;
      }
      h4 span {
        background: #217ac0;
        padding: 2px 6px 2px 6px;
      }
      h4 span {
        border: 1px solid #cee9f9;
        border-radius: 4px;
      }
      h4 span {
        color: white;
      }
      .attributes {
        margin-left: 22px;
        font-size: 90%;
      }
      .attributes p {
        margin-left: 16px;
        font-style: italic;
      }
    </style>
    <details>
      <summary>
        <span>
          <code class="name"
            >&lt;<slot name="element-name">NEED NAME</slot>&gt;</code
          >
          <i class="desc"><slot name="description">NEED DESCRIPTION</slot></i>
        </span>
      </summary>
      <div class="attributes">
        <h4><span>Attributes</span></h4>
        <slot name="attributes"><p>None</p></slot>
      </div>
    </details>
    <hr />
  </template>

  <script type="text/javascript">
    class ElementDetails extends HTMLElement {
      constructor() {
        super();

        var template = document.getElementById(
          "element-details-template",
        ).content;
        const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
          template.cloneNode(true),
        );
      }
    }

    // 告诉浏览器<user-card>元素与这个类关联
    window.customElements.define('element-details', ElementDetails)
  </script>
</body>
```





## 类文件对象 Blob

```bash
## 类文件对象 Blob
- Blob 表示二进制类型的大对象，在 JS 中 Blob 类型的对象表示一个不可变的类似文件对象的原始数据。
- Blob 存储的数据可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作。

- Blob 对象主要负责保存数据，是字节块的不透明表示。
		- Blob 通常存储的是映像、声音或多媒体文件。
		- 注意：Blob 存储的不一定是 JavaScript 原生格式的格式的数据。
		- 如 `File` 接口基于 Blob，继承 Blob 的功能并将其扩展使其支持用户系统上的文件。


### Blob 对象拥有两个属性：
- size: 表示 Blob 对象所包含数据的大小（以字节为单位）
- type: 表明该 Blob 对象所包含数据的 MIME 类型。（字符串类型），如果类型未定义，则该值为空字符串
- 可以调用它唯一的 `slice()` 方法检索 Blob 的一部分。



### Blob 的作用
- Blob 可以从网络内容中创建，可以保存到磁盘，也可以从磁盘读取。Blob 是 `FileReader` API 中使用的文件的底层数据结构。
- Blob 可以使用 [Channel Messaging API] 在 [Web Worker] 和 [iframe] 之间发送，也可以使用 [Push API] 从服务器发送到客户端。
- 可以使用 URL 引用 Blob。
- 提取存储在 Blob 中的文本(或字节)，Blob 还可以直接存储在 [IndexedDB] 总，也可以从 IndexedDB 中检索出来。



### Blob 的方法
- slice([start[, end[, contentType]]])：返回一个新的 Blob 对象，包含了源 Blob 对象中指定范围内的数据。
- stream()：返回一个能读取 blob 内容的 ReadableStream。
- text()：返回一个 Promise 对象且包含 blob 所有内容的 UTF-8 格式的 USVString。
- arrayBuffer()：返回一个 Promise 对象且包含 blob 所有内容的二进制格式的 ArrayBuffer。



### 关联/参考地址
- [Channel Messaging API](https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API)
- [ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
- [ArrayBufferView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

- [Blob](https://zh.javascript.info/blob)
- [你不知道的 Blob](https://juejin.cn/post/6844904178725158926)
- [《你不知道的 Blob》番外篇](https://juejin.cn/post/6844904183661854727)

```

![blob_composition](./image/blob_composition.png)

#### 创建 Blob

```bash
### 创建 Blob
#### 创建 Blob 的方式一：使用 Blob 构造函数
- Blob 由一个可选的字符串 `type`（通常指 MIME 类型）和 `blobParts` 组成。
- 语法：`const Blob = new Blob(blobParts, options)`
		- blobParts：它是一个由 ArrayBuffer，ArrayBufferView，Blob，字符串（包括 DOMString） 等对象构成的值数组。
				- 即使只有一个字符串也必须将其包装在数组中。
				- DOMStrings 会被编码为 UTF-8。
		- options：一个可选的对象，包含以下两个属性：
				- type：默认值为 ""，它代表了将会被放入到 blob 中的数组内容的 MIME 类型。
				- endings：用于指定包含行结束符 \n 的字符串如何被写入。 它是以下两个值中的一个：（默认值为 "transparent"）
        	- "native"：代表行结束符会被更改为适合宿主操作系统文件系统的换行符。
        	- "transparent"：代表会保持 blob 中保存的结束符不变。


- 例子：
	- `const data = new Blob(['Test'])`
	- `const data = new Blob(['Test'], { type: 'text/plain' })`


#### 创建 Blob 的方式二：从另一个 Blob，使用 `Blob.slice()` 实例方法
	- 从 aBlob 字节 10 到 20 创建新 blob：`const partialBlob = aBlob.slice(10, 20)`

```

```js
/**
 * 从普通字符串创建（基础版）
 */
const txt = 'willy'
const txtToBolb = new Blob([txt])
console.log('txtToBolb: ', txtToBolb.size, txtToBolb.type) // txtToBolb:  5 ''


/**
 * 从 DOMString 创建 Blob
 */
const str = '<html><h2>Hello willy</h2></html>' // DOMString
const strToBlob = new Blob([str], { type: 'text/html', endings: 'transparent' })
console.log('strToBlob: ', strToBlob.size, strToBlob.type) // strToBlob:  33 text/html
// strToBlob.text().then((data) => console.log(data))


/**
 * 从类型化数组和字符串创建 Blob
 */
const hello = new Uint8Array([72, 101, 108, 108, 111]) // 二进制格式的 "hello"
const arr = [hello, ' ', 'willy']
const arrToBlob = new Blob(arr, { type: 'text/plain' })
console.log('arrToBlob: ', arrToBlob.size, arrToBlob.type) // arrToBlob:  11 text/plain


/**
 * 从另一个 Blob 中使用 slice() 实例方法创建
 */
const blob1 = new Blob(['hello willy'])
const blob2 = blob1.slice(6)
const blob2Text = await blob2.text()
console.log(blob2Text) // 'willy'

```

#### 读取 Blob 的数据

```bash
### 读取 Blob 的数据
- 无法直接访问 Blob 对象中包含的数据，必须使用 `FileReader` 对象或使用响应对象`Response`。

```

```js
/* 使用 FileReader 对象访问 Blob 中的数据 */
const reader = new FileReader()
reader.addEventListener('load', () => {
  console.log(reader.result) // 'Test'
})
reader.readAsText(data)


/* 使用 Response 响应对象访问 Blob 中的数据 */
const text = await new Response(data).text()
text // 'Test'
```



#### Blob 用作 URL

```bash
### Blob 用作 URL 引用
- Blob 可以作为 `<a>`、`<img>` 或其他标签的 URL。而因为 Blob 的 type 属性，还可以进行上传/下载 Blob 对象。

- Blob URL 以 `blob://` 开头，不同于 Data URL（以 `data:` 开头），因为它们不将数据存储在 URL 中。它也不同于 File URL（以 `file:` 开头），因为它们不会显示文件路径等敏感信息。




#### Blob URL / Object URL
- Blob URL/Object URL 是一种伪协议，允许 Blob 和 File 对象用作图像，下载二进制数据链接等的 URL 源。

- 在浏览器中，使用 `URL.createObjectURL` 方法来创建 Blob URL，该方法可接收一个 Blob 对象，并为其创建一个唯一的 URL，其形式为 `blob:<origin>/<uuid>`。
		- 例：`blob:http://localhost:4000/7966ae32-0105-498d-b37f-b6b6a245dcd5`。
		- 浏览器内部为每个通过 URL.createObjectURL 生成并存储了一个 URL → Blob 映射。因为 Blob URL 是通过内部引用的方式来使用，因此 Blob URL 较短。
		- 当浏览器看到 Blob URL，它将提供存储在内存或磁盘中的相应 Blob，以此访问 Blob。
		- 如果访问一个不再存在的 Blob URL，将收到来自浏览器的 404 错误。

- 注意：生成的 Blob URL 仅在当前文档打开的状态下才有效。
    - 虽然存储了 URL → Blob 的映射，但 Blob 本身仍驻留在内存中，浏览器无法释放它。
    - 映射在文档卸载时自动清除，因此 Blob 对象随后被释放。但是，如果应用程序寿命很长，那不会很快发生。因此，如果我们创建一个 Blob URL，即使不再需要该 Blob，它也会存在内存中。

- 生成 Blob URL 后，可以通过调用 `URL.revokeObjectURL()` 方法，从内部映射中删除引用，从而允许删除 Blob（如果没有其他引用），并释放内存。

```



#### Blob 转换为 Base64

```bash
### Blob 转换为 Base64

#### Base64
Base64 是一种基于 64 个可打印字符来表示二进制数据的表示方法，它常用于处理文本数据的场合，表示、传输、存储二进制数据(如 MIME 的电子邮件及 XML 的一些复杂数据)。

Base64 可以用来将二进制的字节序列数据编码成 ASCII 字符序列构成的文本。使用时需要在传输编码方式中指定 base64。Base64 使用的字符包括大小写阿拉丁字母各 26 个、数字 10 个、加号`+`和斜杠`/`，共 64 个字符，等号 `=` 用来作为后缀用途。


#### Data URLs
当图片数据为二进制数据时，使用 `Data URLs` 特性来支持进行嵌入。`Data URLs` 允许使用 base64 对图片或其他文件的二进制数据进行编码，将其作为文本字符串嵌入页面中。

Data URLs 由四部分组成：前缀(`data:`)、指定数据类型的 MIME 类型、如果非文本则为可选的 base64 标记、数据本身(二进制字节)。

`data:[<mediatype>][;base64],<data>`：
mediatype 是一个 MIME 类型的字符串，如 `image/jpeg` 表示 JPEG 图像文件。如果被省略，则默认值为 `text/plain;charset=US-ASCII`。如果数据是文本类型，可以直接将文本嵌入（根据文档类型，使用合适的实体字符或转义字符）。如果是二进制数据，可以将数据进行 base64 编码之后再进行嵌入。
如一张图片转化为 base64后：`data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...`。

注意：如果图片较大，图片的色彩层次比较丰富，则不适合使用这种方式，因为该图片经过 base64 编码后的字符串非常大，会明显增大 HTML 页面的大小，从而影响加载速度。

对于 FileReader 对象来说，除了支持把 Blob/File 对象转换为 Data URL 之外，还提供了 readAsArrayBuffer() 和 readAsText() 方法，用于把 Blob/File 对象转换为其它的数据格式。

```

##### blob 转换为 base64

```js
/**
 * @function blobToOther 将 Blob 转换其他类型
 * @param {Blob} blob 要转换的 Blob 对象
 * @param {'base64' | 'arrayBuffer'} transfromType 要转换的类型
 * @returns {string | ArrayBuffer | null} 正常会返回 base64 编码的字符串
 *
 * @example
  const blob = new Blob(['Hello World'], { type: 'text/plain' })
  const base64 = await blobToOther(blob, 'base64').catch((e) => {
    console.error('Error converting blob to base64:', e)
  })
  console.log(base64) // 输出将会是一个 base64 编码的字符串
*/
function blobToOther(
  blob: Blob,
  transfromType: 'base64' | 'arrayBuffer' = 'base64',
): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()

    switch (transfromType) {
      case 'arrayBuffer':
        fileReader.readAsArrayBuffer(blob)
        break
      case 'base64':
        fileReader.readAsDataURL(blob)
        break
      default:
        fileReader.readAsDataURL(blob)
    }

    fileReader.onloadend = () => resolve(fileReader.result)
    fileReader.onerror = reject
  })
}

```

##### 服务端存储 base64 数据

```ts
import express, { Router } from 'express'

const router: Router = express.Router()

/**
 * post - 上传 base64 资源
 *
 * @example
      const imgData = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS1sb2dvcyIgd2lkdGg9IjMxLjg4IiBoZWlnaHQ9IjMyIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB2aWV3Qm94PSIwIDAgMjU2IDI1NyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJJY29uaWZ5SWQxODEzMDg4ZmUxZmJjMDFmYjQ2NiIgeDE9Ii0uODI4JSIgeDI9IjU3LjYzNiUiIHkxPSI3LjY1MiUiIHkyPSI3OC40MTElIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNDFEMUZGIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjQkQzNEZFIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE4MTMwODhmZTFmYmMwMWZiNDY3IiB4MT0iNDMuMzc2JSIgeDI9IjUwLjMxNiUiIHkxPSIyLjI0MiUiIHkyPSI4OS4wMyUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkVBODMiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjguMzMzJSIgc3RvcC1jb2xvcj0iI0ZGREQzNSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZGQTgwMCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGZpbGw9InVybCgjSWNvbmlmeUlkMTgxMzA4OGZlMWZiYzAxZmI0NjYpIiBkPSJNMjU1LjE1MyAzNy45MzhMMTM0Ljg5NyAyNTIuOTc2Yy0yLjQ4MyA0LjQ0LTguODYyIDQuNDY2LTExLjM4Mi4wNDhMLjg3NSAzNy45NThjLTIuNzQ2LTQuODE0IDEuMzcxLTEwLjY0NiA2LjgyNy05LjY3bDEyMC4zODUgMjEuNTE3YTYuNTM3IDYuNTM3IDAgMCAwIDIuMzIyLS4wMDRsMTE3Ljg2Ny0yMS40ODNjNS40MzgtLjk5MSA5LjU3NCA0Ljc5NiA2Ljg3NyA5LjYyWiI+PC9wYXRoPjxwYXRoIGZpbGw9InVybCgjSWNvbmlmeUlkMTgxMzA4OGZlMWZiYzAxZmI0NjcpIiBkPSJNMTg1LjQzMi4wNjNMOTYuNDQgMTcuNTAxYTMuMjY4IDMuMjY4IDAgMCAwLTIuNjM0IDMuMDE0bC01LjQ3NCA5Mi40NTZhMy4yNjggMy4yNjggMCAwIDAgMy45OTcgMy4zNzhsMjQuNzc3LTUuNzE4YzIuMzE4LS41MzUgNC40MTMgMS41MDcgMy45MzYgMy44MzhsLTcuMzYxIDM2LjA0N2MtLjQ5NSAyLjQyNiAxLjc4MiA0LjUgNC4xNTEgMy43OGwxNS4zMDQtNC42NDljMi4zNzItLjcyIDQuNjUyIDEuMzYgNC4xNSAzLjc4OGwtMTEuNjk4IDU2LjYyMWMtLjczMiAzLjU0MiAzLjk3OSA1LjQ3MyA1Ljk0MyAyLjQzN2wxLjMxMy0yLjAyOGw3Mi41MTYtMTQ0LjcyYzEuMjE1LTIuNDIzLS44OC01LjE4Ni0zLjU0LTQuNjcybC0yNS41MDUgNC45MjJjLTIuMzk2LjQ2Mi00LjQzNS0xLjc3LTMuNzU5LTQuMTE0bDE2LjY0Ni01Ny43MDVjLjY3Ny0yLjM1LTEuMzctNC41ODMtMy43NjktNC4xMTNaIj48L3BhdGg+PC9zdmc+'
      fetch(`${SERVER_BASE_URL}/file/upload_base64`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imgData }),
      })
      .then((response) => response.json())
      .then((result) => {
        console.log('fetch', result)
      })
      .catch((error) => {
        console.error(error)
      })
  */
async function uploadBase64FilePostHandler(req: Request, res: Response) {
  // 获取POST请求中的base64图片数据
  const imgData = req.body.imgData

  // 从 imgData 中提取文件格式
  let fileExtension = imgData.match(/^data:image\/(.*?);base64,/)?.[1]
  if (!fileExtension) {
    const errorData = {
      code: 500,
      msg: 'base64 image 文件格式错误',
    }
    res.send(errorData)
    return
  }

  // 提取正确的文件格式（因为要对 svg+xml 这种格式进行处理）
  fileExtension = fileExtension.match(/\w+/)?.[0]

  // 匹配所有 Image 类型的 Base64 数据
  const base64Data = imgData.replace(/^data:image\/.+;base64,/, '')
  const dataBuffer = Buffer.from(base64Data, 'base64')

  // 根据文件格式来设定文件名称
  const filePath = `./data/file/test.${fileExtension}`
  const dirPath = path.dirname(filePath)

  fs.mkdir(dirPath, { recursive: true }, (error) => {
    if (error) {
      const errorData = {
        code: 500,
        msg: '创建文件目录错误',
        error,
      }
      res.send(errorData)
      return
    }

    fs.writeFile(filePath, dataBuffer, (err) => {
      if (err) {
        const errorData = {
          code: 500,
          msg: 'upload base64 image error',
          error: err,
        }
        res.send(errorData)
        return
      }
      res.json({
        code: 200,
        msg: 'upload base64 image success',
      })
    })
  })
}

router.route('/upload_base64').post(uploadBase64FilePostHandler)

```



#### 从本地磁盘加载文件并获取

```bash
### 从页面上的本地磁盘加载文件并获取

```

```html
<!-- 用 input 标签选择图像，一旦选择图像，则删除输入元素并显示图像，然后在完成图像显示后清除 Blob  -->
<input type="file" allow="image/*" />

<script>
const input = document.querySelector('input')

if (input !== null) {
  input.addEventListener('change', () => {
    const img = document.createElement('img')
    const imageBlob = URL.createObjectURL(input?.files?.[0] || new Blob([]))
    img.src = imageBlob

    img.onload = function () {
      URL.revokeObjectURL(imageBlob)
    }

    input && input.parentNode && input.parentNode.replaceChild(img, input)
  })
}
</script>
```



#### 图片压缩

```bash
### 图片压缩
一般在上传本地图片时，先对图片进行一定压缩，然后再提交到服务器，从而减少传输的数据量。
一般前端实现图片压缩，可以利用 Canvas 对象提供的 toDataURL() 方法，该方法接收 type（图片格式）和 encoderOptions（图片质量）两个可选参数。

```

```ts
/**
 * @function compressImage 将 base64 图片进行压缩
 * @param {string} base64 图片转换为 base64 的字符串
 * @param {number} quality 图片质量的比例（要压缩的比例），取值范围（0 ~ 1），默认1为不压缩，值越小，压缩率越高，图片质量越低
 * @param {string} mimeType 表示图像格式的 DOMString。
 * @param {boolean} needOptimizeDataSize 是否需要优化数据量的大小
 * @returns {Promise<Blob | string>} 返回压缩后的 base64 字符串或 Blob 对象
 */
compressImage(
  base64: string,
  quality: number = 0.92,
  mimeType: string = 'image/png',
  needOptimizeDataSize: boolean = true,
): Promise<Blob | string> {
  const canvas = document.createElement('canvas')
  const imgDom = document.createElement('img')
  imgDom.crossOrigin = 'anonymous'

  return new Promise((resolve, reject) => {
    imgDom.src = base64

    const imgOnload = () => {
      /** 图片最大宽度 */
      const IMG_MAX_WIDTH = 800

      /** 没有超出图片最大宽度 */
      const unExceedMaximum: boolean = imgDom.width <= IMG_MAX_WIDTH
      const targetWidth = unExceedMaximum ? imgDom.width : IMG_MAX_WIDTH
      const targetHeight = unExceedMaximum
        ? imgDom.height
        : (imgDom.height * IMG_MAX_WIDTH) / imgDom.width

      canvas.width = targetWidth
      canvas.height = targetHeight

      const ctx = canvas.getContext('2d')
      ctx?.clearRect(0, 0, targetWidth, targetHeight) // 清除画布
      ctx?.drawImage(imgDom, 0, 0, canvas.width, canvas.height)

      const imageData = canvas.toDataURL(mimeType, quality)

      // 对于 Data URL 格式的图片数据，如果需要优化数据量的大小，则把它转换为 Blob 对象减少，否则返回压缩后的 base64 字符串
      if (needOptimizeDataSize) {
        const compressedImageBlob = this.dataUrlToBlob(imageData)
        resolve(compressedImageBlob)
      } else {
        resolve(imageData)
      }
    }

    imgDom.onload = imgOnload
    imgDom.onerror = reject
  })
}
```



#### 上传 Blob 数据

```bash
### 上传 Blob 数据

```

```js
/**
 * @function uploadBlob 上传Blob 数据
 * @param {string} url 上传的接口地址
 * @param {Blob} blob 所上传的 Blob
 * @param {Function} trackProgress 跟踪上传的进度
 * @desc 用作对输入类型或拖放的回调
 */
export const uploadBlob = (url, blob, trackProgress) => {
  // 使用 XHR 将 Blob 加载到 URL
  const xhr = new XMLHttpRequest()
  xhr.open('POST', url)
  xhr.send(blob)
  xhr.upload.onprogress = trackProgress
}

```

#### 文件分片上传

```bash
### 文件分片上传
File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的上下文中。
所以针对大文件传输的场景，可以使用 Blob 的 slice() 实例方法对大文件进行切割，然后分片进行上传。

```

```js
const chunkedUpload = (file = new File(), uploadUrl = '', chunkSize = 4000) => {
  for (let start = 0; start < file.size; start += chunkSize) {
    const chunk = file.slice(start, start + chunkSize)
    const formData = new FormData()
    formData.append('data', chunk)

    fetch(uploadUrl, { method: 'post', body: formData })
      .then((res) => {
        res.text()
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

const file = new File(['a'.repeat(1000000)], 'test.txt')
const chunkSize = 4000
const uploadUrl = 'http://willy.com/api/upload_file/post'

chunkedUpload(file, uploadUrl, chunkSize)

```



#### 以 Blob 形式从互联网下载数据

```bash
### 以 Blob 形式从互联网下载数据


```

```js
/**
 * @function downloadBlob 以 Blob 形式从互联网下载数据
 * @param {string} url 所需要下载的数据接口地址
 * @param {Function} callback 回调函数，获取 Blob 对象
 * @desc 从互联网下载数据，并将其存储到 Blob 对象中
 */
export const downloadBlob = (url, callback) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.responseType = 'blob'

  xhr.onload = () => {
    callback(xhr.response)
  }

  xhr.send(null)
}

```

**下载线上图片到本地显示**

```ts
const myImage = document.querySelector('img') as HTMLImageElement | null

const requestImg = new Request(
  'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/2/172734410c51dbed~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png',
)

fetch(requestImg)
  .then((response) => response.blob())
  .then((myBlob) => {
    // 创建一个 blob 的资源 url 地址
    const objectURL = URL.createObjectURL(myBlob)
    console.log(objectURL)

    if (myImage && 'src' in myImage) myImage.src = objectURL
  })

```



#### Blob 文件下载

```ts
/**
 * @function downloadBlob 下载 Blob 对象中的内容
 * @param {Blob} blob Blob 对象
 * @param {string} fileName 文件名字
 * @example
  const blob = new Blob(['一文彻底掌握 Blob Web API'], { type: 'text/plain' })
  downloadBlob(blob, 'test')
 */
const downloadBlob = (blob: Blob, fileName: string) => {
  // 创建 a 标签下载 Blob 对象中的内容
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = fileName
  link.click()
  link.remove()

  // 及时清除 Blob 对象
  URL.revokeObjectURL(link.href)
}

```



#### 生成pdf

```html
<script src="https://unpkg.com/jspdf@latest/dist/jspdf.min.js"></script>
<script>
  (function generatePdf() {
    const doc = new jsPDF();
    doc.text("Hello semlinker!", 66, 88);
    const blob = new Blob([doc.output()], { type: "application/pdf" });
    blob.text().then((blobAsText) => {
      console.log(blobAsText);
    });
  })();
</script>
```



#### Blob 与 ArrayBuffer 的区别

```bash
### Blob 与 ArrayBuffer 的区别
- 除非需要使用 ArrayBuffer 提供的写入/编辑能力，否则 Blob 格式是最好的。
- Blob 对象是不可变的，而 ArrayBuffer 是可以通过 TypedArrays 或 DataView 来操作。
- ArrayBuffer 是存在内存中的，可以直接操作。而 Blob 可以位于磁盘、高速缓存内存和其他不可用的位置。
虽然 Blob 可以直接作为参数传递给其他函数（如 `window.URL.createObjectURL()`），但你可能仍需要 FileReader 之类的 File API 才能与 Blob 一起使用。
Blob 与 ArrayBuffer 对象之间是可以相互转化的：
	- 使用 FileReader 的 readAsArrayBuffer() 方法，可以把 Blob 对象转换为 ArrayBuffer 对象；
	- 使用 Blob 构造函数，如 new Blob([new Uint8Array(data]);，可以把 ArrayBuffer 对象转换为 Blob 对象。


```

##### http 中 Blob 和 ArrayBuffer 的使用方式

```js
function GET(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer'; // or xhr.responseType = "blob";
  xhr.send();

  xhr.onload = function(e) {
    if (xhr.status != 200) {
      alert("Unexpected status code " + xhr.status + " for " + url);
      return false;
    }
    callback(new Uint8Array(xhr.response)); // or new Blob([xhr.response]);
  };
}

```



## Web Worker 线程

```bash
## Web Worker 描述
Web Worker 作用是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。

在HTML 页面中，如果在执行脚本时，页面的状态是不可相应的，直到脚本执行完成后，页面才变成可响应。web worker 是运行在后台的js，独立于其他脚本，不会影响页面的性能。并且通过 postMessage 将结果回传到主线程。

使用 WebWorker 的主要作用：是为了解决大量计算而不影响页面性能。
在进行复杂操作时，如一些计算密度型或高延迟（大量计算、耗时）的任务被 Worker 线程负担了，主线程不会被阻塞或拖慢，(通常负责UI交互)就会很流畅。

Worker 线程一旦新建成功，就会始终执行，不会被主线程上的活动（如用户点击按钮、表单提交）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。


如何创建web worker：检测浏览器对于web worker 的支持性，创建web worker 文件（js，回传函数等），创建web worker 对象。



### Web Worker 的限制
1. 同源限制：受浏览器同源策略影响，它需要从同一来源（域、端口和协议）加载
	- 分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

2. DOM 限制：无法访问 DOM — `window` 对象和 `document` 对象
	- Worker 线程所在的全局对象与主线程不一样，无法读取主线程所在页面的 DOM 对象，也无法使用 document、window、parent 这些对象。但 Worker 线程可以使用 navigator 对象和 location 对象。

3. 通信联系：它可以使用消息传递与主 JavaScript 程序进行通信
	- Worker 线程和主线程不再同一个上下文环境，它们不能直接通信，必须通过消息完成。

4. 文件限制：如果使用文件协议（`file://`）提供页面，它将不起作用
	- Worker 线程无法读取本地文件，即不能打开本机的文件系统（`file://`），它所加载的脚本，必须来自网络。

5. 脚本限制：Web Worker 的全局作用域是 `WorkerGlobalScope` 对象，而不是主线程中的 Window。
	- Worker 线程不能执行 `alert()` 方法和 `confirm()` 方法，但可以使用 `XMLHttpRequest` 对象发起 `Ajax` 请求。



### API
1. 主线程
- 浏览器提供 `Worker()` 构造函数，用来提供主线程生成 Worker 实例。
- 语法：`const worker = new Worker(jsUrl, options)`
    - jsUrl：为脚本的网址（必须遵守同源政策），必填参数。只能加载JS脚本，否则会报错。
    - options：配置对象，可选。它的一个作用是指定 Worker 的名称，用来区分多个worker 线程。
- 例子：
		- 主线程：const myWorker = new Worker('worker.js', { name: 'myWorker1' })
		- Worker线程(worker.js文件里配置)：self.name	// myWorker1
- `Worker()` 构造函数返回一个 Worker 线程对象，用来供主线程操作Worker。Worker线程对象的属性和方法如下：
		- `Worker.onerror`：指定 error 事件的监听函数，报错时触发。
		- `Worker.onmessage`：指定 message 事件的监听函数，发送过来的数据在 Event.data 属性中。
		- `Worker.onmessageerror`：发送的数据无法序列化成字符串时，会触发这个事件。
		- `Worker.postMessage()`：向 Worker 线程发送数据。它可以使各种数据，包括二进制数据。
		- `Worker.terminate()`：立即终止 Worker 线程。

2. Worker 线程
- Web Worker 有自己的全局对象，不是主线程的 window，而是一个专门为 Worker 定制的全局对象。因此定义在 window 上面的对象和方法不是全部都可以使用。
- 在worker线程中，`self`代表子线程自身，即子线程的全局对象（可理解为this指向worker对象，隐藏的全局对象缩写也为子线程自身）
- Worker 线程自己的全局属性和方法：
		- `self.name`：Worker 的名字。该属性只读。由构造函数指定。
		- `self.onerror`：指定 error 事件的监听函数，报错时触发。
		- `self.onmessage`：指定 message 事件的监听函数，发送过来的数据在 Event.data 属性中。
		- `self.onmessageerror`：发送的数据无法序列化成字符串时，会触发这个事件。
		- `self.postMessage()`：向产生这个 Worker 线程发送消息。
		- `self.close()`：关闭 Worker 线程。
		- `self.importScripts()`：加载 JS 脚本。
```



#### webWorker 中可用的API

```bash
Web Worker 无法访问 DOM，因此您无法与 `window` 和 `document` 对象进行交互。此外，`parent` 不可用。但如下的 API 可以使用：
  - XHR API
  - Fetch API
  - BroadcastChannel API
  - FileReader API
  - IndexedDB
  - Notifications API
  - Promises
  - Service Workers
  - Channel Messaging API
  - Cache API
  - Console API（`console.log()`...）
  - JavaScript Timers（`setTimeout`，`setInterval`...）
  - CustomEvents API: `addEventListener()` and `removeEventListener()`
  - 当前 URL，您可以在读取模式下通过 `location` 属性访问该 URL
  - WebSockets
  - WebGL
  - SVG Animations
```



#### 基本用法

> #### 主线程
>
> ```js
> /** 主线程 */
> const worker = new Worker("./worker.js")
>
> // 发送数据给 Worker 线程
> worker.postMessage('Hello World！')
> worker.postMessage({ method: 'echo', args: ['Work'] })
>
> // 接收 Worker 线程发送过来的数据
> worker.onmessage = function (event) {
> console.log('Received message' + event.data)
> doSomething()
> }
>
> function doSomething () {
> // 执行任务
> worker.postMessage('Worker done!')
> }
>
> // 在 Worker 完成任务后，主线程可以把它关掉
> worker.terminate()
> ```
>
> #### Worker 线程
>
> ```js
> /** worker.js */
> // worker 线程内部需要 一个监听函数，监听 message 事件
> self.addEventListener('message', function(event) {
> self.postMessage('Your said：' + event.data)
> }, false)
>
> /**
> // 与 self 等同的写法一：
> this.addEventListener('message', function(event) {
> this.postMessage('Your said：' + event.data)
> }, false)
>
> // 与 self 等同的写法二：
> addEventListener('message', function(event) {
> postMessage('Your said：' + event.data)
> }, false)
> */
>
>
> // 根据主线程发来的消息，Worker 可调用不同方法
> self.addEventListener('message', function (event) {
> const data = event.data
> switch (data.method) {
>  case 'start':
>    self.postMessage('Worker Start: ' + data.msg)
>    break;
>  case 'stop':
>    self.postMessage('Worker Stopped: ' + data.msg)
>    self.close()
>    break
>  default:
>    self.postMessage('Worker command: ' + data.msg)
> }
> }, false)
>
>
> // worker加载脚本（可加载多个脚本）
> self.importScripts('script1.js', 'script2.js')
>
>
> // 主线程可以监听 Worker 是否发生错误，如果发生错误，Worker 会触发主线程的 error 事件
> self.onerror(event => {
> console.log(['Error: Line', e.lineno, 'in ', e.filename, ': ', e.message].join(''))
> })
> self.addEventListener('error', function(e) {
> console.log(e)
> })
> ```

#### 数据通信

> - 主线程与 Worker 之间的通信内容，可以是文本或对象。
> - 注意：这种通信是拷贝关系，即只是传值而不是传地址，Worker 对通信内容的修改，不会影响到主线程。
> - 事实上，浏览器内部的运行机制是，先将通信内容串行化，然后把串行化后的字符串发给 Worker，后者再将它还原。
> - 主线程与 Worker 之间可以交换二进制数据，比如`File、Blob、ArrayBuffer`等类型，也可以在线程之间发送。
>
> ```js
> // 主线程
> const worker = new Worker('./worker.js')
> const uInt8Array = new Uint8Array(new ArrayBuffer(10))
> for (let i = 0; i < uInt8Array.length; ++i) {
>   uInt8Array[i] = i * 2 // [0, 2, 4, 6, ...]
> }
> worker.postMessage(uInt8Array)
>
>
> // Worker 线程（接收主线程发送的数据，并进行返回）
> self.onmessage = function (e) {
>   const uInt8Array = e.data
>   postMessage('Inside worker.js: uInt8Array.toString() = ' + uInt8Array.toString())
>   postMessage('Inside worker.js: uInt8Array.byteLength = ' + uInt8Array.byteLength)
> }
> ```
>
> - 但若是如上述方法使用拷贝方式发送二进制数据，会造成性能问题。
> - 如主线程向 Worker 发送一个 500MB 文件，默认情况下浏览器会生成一个源文件的拷贝。为了解决这个问题，JavaScript允许主线程把二进制数据直接转移给子线程，但是一旦转移，主线程就无法再使用这些二进制数据了，这是为了防止出现多个线程同时修改数据的玛法局面。
> - 这种转移方法为 `Transferable Objects`，这使得主线程可以快速地把数据交给 Worker，对于影像处理、声音处理、3D运算等就非常方便，不会产生性能负担。
>
> ```js
> // 直接转移数据的控制权（Transferable Object格式）
>   worker.postMessage(arrayBuffer, [arrayBuffer])
>
>
> // 例子
> const ab = new ArrayBuffer(1)
> worker.postMessage(ab, [ab])
> ```

#### 使用 Channel Messaging API

```js
// main.js
const worker = new Worker('worker.js')
const messageChannel = new MessageChannel()

messageChannel.port1.addEventListener('message', (event) => {
  console.log(event.data)
})

worker.postMessage('main', [messageChannel.port2])
```

```js
// worker.js
addEventListener('message', (event) => {
  console.log(event.data)
  // 通过向 `messageChannel.port2` 发送消息来返回消息
  event.ports[0].postMessage(data)
})
```



#### 同页面的Web Worker

> - 通常情况下，Worker 载入的是一个单独的JavaScript脚本文件，但也可载入与主线程在同一个页面的代码。
>
> ```html
> <!DOCTYPE html>
>   <body>
>     <script id="worker" type="app/worker">
>       addEventListener('message', function () {
>         postMessage('some message');
>       }, false);
>     </script>
>   </body>
> </html>
> ```
>
> 上面是一段嵌入网页的脚本，注意必须指定`<script>`标签的`type`属性是一个浏览器不认识的值，上例是`app/worker`。然后读取这一段嵌入页面的脚本，用 Worker 来处理。
>
> ```js
> const blob = new Blob([document.querySelector('#worker').textContent]);
> const url = window.URL.createObjectURL(blob);
> const worker = new Worker(url);
>
> worker.onmessage = function (e) {
>   // e.data === 'some message'
> };
> ```
>
> 上面代码中，先将嵌入网页的脚本代码，转成一个二进制对象，然后为这个二进制对象生成 URL，再让 Worker 加载这个 URL。这样就做到了，主线程和 Worker 的代码都在同一个网页上面。

#### Worker 线程完成轮询

> 有时，浏览器需要轮询服务器状态，以便第一时间得知状态改变。这个工作可以放在 Worker 里面。
>
> 下述代码中，Worker 每秒钟轮询一次数据，然后跟缓存做比较。如果不一致，就说明服务端有了新的变化，因此就要通知主线程。
>
> ```js
> function createWorker(f) {
> var blob = new Blob(['(' + f.toString() +')()']);
> var url = window.URL.createObjectURL(blob);
> var worker = new Worker(url);
> return worker;
> }
>
> var pollingWorker = createWorker(function (e) {
> var cache;
>
> function compare(new, old) { ... };
>
> setInterval(function () {
>  fetch('/my-api-endpoint').then(function (res) {
>    var data = res.json();
>
>    if (!compare(data, cache)) {
>      cache = data;
>      self.postMessage(data);
>    }
>  })
> }, 1000)
> });
>
> pollingWorker.onmessage = function () {
> // render data
> }
>
> pollingWorker.postMessage('init');
> ```



## IndexedDB

> ```bash
> ## IndexedDB
> ### 前言
> 在以前和现在常用的本地存储方式一般都是 localStorage、sessionStorage 和 cookie。
> 但它们都不能存放大量数据，在现在的业务情况下，很容易出现存放数据过大，导致超出浏览器对于 localStorage、sessionStorage 和 cookie 的存储大小（cookies 不能超过4KB，localStorage、sessionStorage一般不超过4MB），所以这些技术不太适合存放大量数据，此时就可以使用 HTML5 提供的新 API：IndexedDB。
> 是属于 NoSQL 的一种。
>
>
> ### IndexedDB 的特点
> 1. key/value 的存储方式：
> IndexedDB 和 localStorage 的存储方式类似，都是通过一个 key 对应一个 value，而且 key 是唯一的方式进行存储的，但是 IndexedDB 和 localStorage 有很不一样的一点就是可以直接存储对象数组等，不需要像  localSotrage 那样必须转为字符串。
> 2. 异步调用
> IndexedDB 是使用异步调用的，当我们存储一个较大的数据时，不会因为写入数据慢而导致页面阻塞。
> 3. 支持事务
> IndexedDB 支持事务，能确保我们多个操作只要其中一步出现问题，就可以整体回滚。
> 4. 同源限制
> IndexedDB 和 localStorage 都是有同源策略的问题，不能跨协议、端口、域名使用。
> 5. 储存空间
> IndexedDB 存储空间相比 localStorage 要大得多，一般不少于 250 MB。
> 6. 支持二进制
> IndexedDB 不但可以存储对象、字符串等，还可以存储二进制数据。
>
>
> ### 应用场景
> 比如在对商品列表的数据进行缓存，因为在浏览器中实现后退上一个页面，不刷新页面，一般只有用单页面应用才能实现，但因为种种原因而没有使用单页面框架，所以必须要将数据缓存到本地，下次打开列表后，发现如果 url 中的 id 和缓存数据的 id 一致，那么久直接使用缓存数据，不再进行请求。
> 如果使用 localStorage 来解决会发现在一些特定情况下，数据有可能达到接近 5MB 的数据，在 PC 端的 Chorme 中是可以存到 localStorage 中，但在 IOS 中可能会报出空间不足，导致无法放入 localStorage 中，此时可以使用 indexedDB。
> 因为 IndexedDB 的空间足够大，可以无需去考虑数据数据大小，而且还能直接以对象的形式存入，无需转为 JSON 字符串，大大减少了转换的运算。但使用 IndexedDB 基本上都是一步操作且要考虑一些低版本的手机可能不支持的情况，所以需要封装中间件，同样的调用，根据设备对 IndexedDB 的兼容情况，自动决定使用 IndexedDB 还是 localStorage。最终完成需求，并且优化前后达到超过 70% 的优化率，页面的渲染基本是秒开。
>
>
> ### localStorage 和 IndexedDB 区别
> - 相同点：两者都是在客户端永久性存储数据，都通过键值对存储数据。
> - 不同点：
>     - indexedDB 是 JS 脚本语言可以操作的数据库。
>     - 操作是异步的。
>     - indexedDB支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。
>     - 储存空间大。IndexedDB 的存储空间比 localStorage 大得多，一般来说不少于 250MB，甚至没有上线。
>     - localStorage 不支持搜索。
> ```
>
> ```ts
> interface IndexedDBStore {
>   /** 对象仓库名称 */
>   name: string
>   /** 主键名称 */
>   primaryKey: string
>   /** 索引列表 key：索引名称 value：是否可以重复 */
>   indexList: {
>     name: string
>     unique: boolean
>   }[]
>   /** 版本更新时是否需要删除原来的仓库 */
>   isClear: boolean
> }
>
> interface IndexedDBConfig {
>   /** 数据库名 */
>   dbName: string
>   /** 对象仓库集合 */
>   stores: IndexedDBStore[]
>   /** 数据库版本 */
>   version?: number
>   /** 初始化回调 */
>   initCb?: () => void
> }
>
> type TransactionMode = 'readonly' | 'readwrite' | 'versionchange'
>
> declare global {
>   interface Window {
>     webkitIndexedDB?: IDBFactory
>     mozIndexedDB?: IDBFactory
>     msIndexedDB?: IDBFactory
>   }
> }
>
> /** 跳出错误函数 */
> export function throwError (
>   name: string,
>   content = '程序错误',
>   data?: any,
> ): void {
>   if (data) {
>     console.error(data)
>   }
>   throw new Error(`${content}, name: ${name}`)
> }
>
> /** IndexedDB 数据库操作帮手 */
> export class IndexedDBHelper {
>   /** 单例模式实例 */
>   static dbInstance: IndexedDBHelper
>   /** 数据库 */
>   private indexedDb?: IDBFactory
>   /** 数据库对象 */
>   private db: IDBDatabase | null = null
>   /** 数据库信息 */
>   private readonly dbInfo?: IndexedDBConfig
>   /** 数据库请求对象 */
>   private readonly dbReq?: IDBOpenDBRequest
>
>   constructor (config: IndexedDBConfig) {
>     if (IndexedDBHelper.dbInstance) {
>       return IndexedDBHelper.dbInstance
>     }
>
>     const indexedDb =
>       window.indexedDB ||
>       window.webkitIndexedDB ||
>       window.mozIndexedDB ||
>       window.msIndexedDB
>     if (!indexedDb) {
>       throwError(IndexedDBHelper.name, '您的浏览器不支持IndexedDB')
>     }
>
>     this.indexedDb = indexedDb
>     this.dbInfo = config
>     this.dbReq = this.open()
>     this.initRequestHandler()
>     IndexedDBHelper.dbInstance = this
>   }
>
>   /** 去除 proxy（主要针对 vue3 中响应式数据内置的 proxy 对象） */
>   private removeProxy (data) {
>     return JSON.parse(JSON.stringify(data))
>   }
>
>   /** 添加单条数据 */
>   public add (storeName: string, data: any): Promise<any> {
>     return new Promise((resolve, reject) => {
>       const req = this.beginTransaction(storeName).add(this.removeProxy(data))
>
>       req.onsuccess = (event) => {
>         console.log('数据库信息添加成功', ...arguments)
>         resolve(event)
>       }
>       req.onerror = (event) => {
>         throwError(IndexedDBHelper.name, '数据库信息添加失败', {
>           arguments,
>           event,
>         })
>         reject(event)
>       }
>     })
>   }
>
>   /** 获取单条数据 */
>   public get (storeName: string, primaryKey: string): Promise<any> {
>     return new Promise((resolve, reject) => {
>       const req = this.beginTransaction(storeName).get(primaryKey)
>
>       req.onsuccess = (event) => {
>         console.log('数据库信息获取成功', ...arguments)
>         resolve(event)
>       }
>       req.onerror = (event) => {
>         throwError(IndexedDBHelper.name, '数据库信息获取失败', {
>           arguments,
>           event,
>         })
>         reject(event)
>       }
>     })
>   }
>
>   /** 获取所有数据 */
>   public getAll (storeName: string): Promise<any[]> {
>     return new Promise((resolve, reject) => {
>       const req = this.beginTransaction(storeName).openCursor()
>       const res: any[] = []
>       req.onsuccess = (event: any) => {
>         console.log('数据库信息获取成功', ...arguments)
>         const cursor = event.target.result
>         if (cursor) {
>           res.push({ id: cursor.key, ...cursor.value })
>           cursor.continue()
>         } else {
>           resolve(res)
>         }
>       }
>       req.onerror = (event) => {
>         throwError(IndexedDBHelper.name, '数据库信息获取失败', {
>           arguments,
>           event,
>         })
>         reject(event)
>       }
>     })
>   }
>
>   /** 通过索引获取相应数据 */
>   public getByIndex (storeName: string, indexName: string): Promise<any> {
>     return new Promise((resolve, reject) => {
>       const req = this.beginTransaction(storeName).index(indexName).openCursor()
>       const res: any[] = []
>       req.onsuccess = (event: any) => {
>         console.log('getAll数据库信息获取成功', ...arguments)
>         const cursor = event.target.result
>         if (cursor) {
>           res.push({ id: cursor.key, ...cursor.value })
>           cursor.continue()
>         } else {
>           resolve(res)
>         }
>       }
>       req.onerror = (event) => {
>         throwError(IndexedDBHelper.name, '数据库信息获取失败', {
>           arguments,
>           event,
>         })
>         reject(event)
>       }
>     })
>   }
>
>   /** 更新数据 */
>   public update (
>     storeName: string,
>     data: any,
>     primaryKey?: string,
>   ): Promise<any> {
>     return new Promise((resolve, reject) => {
>       const req = this.beginTransaction(storeName).put(data, primaryKey)
>
>       req.onsuccess = (event) => {
>         console.log('数据库信息设置成功', ...arguments)
>         resolve(event)
>       }
>       req.onerror = (event) => {
>         throwError(IndexedDBHelper.name, '数据库信息设置失败', {
>           arguments,
>           event,
>         })
>         reject(event)
>       }
>     })
>   }
>
>   /** 删除数据 */
>   public delete (storeName: string, primaryKey: string): Promise<any> {
>     return new Promise((resolve, reject) => {
>       const req = this.beginTransaction(storeName).delete(primaryKey)
>
>       req.onsuccess = (event) => {
>         console.log('数据库信息删除成功', ...arguments)
>         resolve(event)
>       }
>       req.onerror = (event) => {
>         throwError(IndexedDBHelper.name, '数据库信息删除失败', {
>           arguments,
>           event,
>         })
>         reject(event)
>       }
>     })
>   }
>
>   public count (storeName: string): Promise<any> {
>     return new Promise((resolve, reject) => {
>       const req = this.beginTransaction(storeName, 'readonly').count()
>
>       req.onsuccess = (event) => {
>         console.log('数据库条数获取成功', ...arguments)
>         resolve(event)
>       }
>       req.onerror = (event) => {
>         throwError(IndexedDBHelper.name, '数据库条数获取失败', {
>           arguments,
>           event,
>         })
>         reject(event)
>       }
>     })
>   }
>
>   /** 打开数据库 */
>   private open (): IDBOpenDBRequest {
>     const { dbName, version } = this.dbInfo as IndexedDBConfig
>     return this.indexedDb!.open(dbName, version)
>   }
>
>   /** 初始化助手 */
>   private initRequestHandler (): void {
>     const dbReq = this.dbReq
>     /** 连接被阻止 */
>     dbReq!.onerror = (event) => {
>       throwError(IndexedDBHelper.name, 'IndexedDB数据库连接失败', event)
>     }
>
>     /** 连接被阻止 */
>     dbReq!.onblocked = (event) => {
>       throwError(IndexedDBHelper.name, 'IndexedDB数据库连接被阻止', event)
>     }
>
>     /** 成功打开数据库 */
>     dbReq!.onsuccess = (event) => {
>       console.log('数据库连接成功')
>       this.db = dbReq!.result
>       this.dbInfo!.initCb?.()
>     }
>
>     /** 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件 */
>     dbReq!.onupgradeneeded = (event) => {
>       const db: IDBDatabase = (event as any).target?.result
>       const dbInfo = this.dbInfo
>       dbInfo!.stores.forEach((store) => {
>         const { isClear, name } = store
>         if (db.objectStoreNames.contains(name)) {
>           if (!isClear) {
>             return
>           }
>           // 删除旧仓库
>           db.deleteObjectStore(name)
>         }
>         this.createStore(store, db)
>       })
>     }
>   }
>
>   /** 建表 */
>   private createStore (store: IndexedDBStore, db: IDBDatabase = this.db!): void {
>     const { name, primaryKey, indexList } = store
>     const newStore = db.createObjectStore(name, {
>       keyPath: primaryKey, // 主键
>       autoIncrement: true, // 自增
>     })
>     indexList.forEach((index) => {
>       const { name, unique } = index
>       // 新建索引，三个参数分别为索引名称、索引所在的属性、配置对象
>       newStore.createIndex(name, name, { unique })
>     })
>   }
>
>   private beginTransaction (
>     storeName: string,
>     mode: TransactionMode = 'readwrite',
>   ): IDBObjectStore {
>     const transaction = this.db?.transaction(storeName, mode)
>
>     transaction!.onerror = (event) => {
>       throwError(IndexedDBHelper.name, '事务创建失败!', event)
>     }
>     transaction!.oncomplete = (event) => {
>       console.log('数据库修改结束，事务完成')
>     }
>
>     return transaction!.objectStore(storeName)
>   }
> }
> ```



## Service Worker



### Cache API

[Cache API](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache) 是 Service Worker 规范的一部分，是一种增强资源缓存能力的好方法。

- 它允许您缓存 URL 可寻址资源，这意味着资源、网页、HTTP API 响应。
- 它并不意味着缓存单个数据块，这是 IndexedDB API 的任务。

#### 检测 Cache API 是否可用

Cache API 通过 `caches` 对象公开。要检测 API 是否在浏览器中实现，只需使用以下命令检查其是否存在：

```js
if ('caches' in window) {
  console.log('支持 Cache API')
}
```

#### 初始化缓存

- 使用 `caches.open('key-name')` API，它返回一个带有缓存对象的 Promise 以供使用。
- `caches.open` 传入的参数是用来标识要初始化的缓存的名称，如果缓存尚不存在，`caches.open` 则创建它

```js
caches.open('my-cache').then((cache) => {
  // 您可以开始使用缓存
})
```

#### 将项目添加到缓存

`cache` 对象公开了两种将项目添加到缓存的方法：`add` 和 `addAll`。

**cache.add**

- `add` 接受单个 URL，并在调用时获取资源并缓存它。
- 为了允许对获取进行更多控制，您可以传递一个请求对象，而不是字符串。

```js
caches.open('my-cache').then((cache) => {
  cache.add('/api/todos')
})

caches.open('my-cache').then((cache) => {
  const options = {
    // the options
  }
  cache.add(new Request('/api/todos', options))
})
```

**cache.addAll**

- `addAll` 接受一个数组，并在所有资源都被缓存后返回一个 Promise。

```js
caches.open('my-cache').then((cache) => {
  cache.addAll(['/api/todos', '/api/todos/today']).then(() => {
    // 所有请求都已缓存
  })
})
```

#### 手动获取和添加

`cache.add()` 自动获取资源并将其缓存。
Cache API 通过 `cache.put()` 对此提供了更细粒度的控制。你负责获取资源，然后告诉 Cache API 存储一个响应。

```js
const url = '/api/todos'
fetch(url).then((res) => {
  return caches.open('my-cache').then((cache) => {
    return cache.put(url, res)
  })
})
```

#### 从缓存中检索项目

`cache.match()` 返回一个 Response 对象，其中包含有关请求的所有信息和网络请求的响应

```js
caches.open('my-cache').then((cache) => {
  cache.match('/api/todos').then((res) => {
    // res 是响应对象
  })
})
```

#### 获取缓存中的所有项目

`cachedItems` 是一个 Request 对象数组，其中包含 `url` 属性中资源的 URL。

```js
caches.open('my-cache').then((cache) => {
  cache.keys().then((cachedItems) => {
    console.log(cachedItems)
  })
})
```

#### 获取所有可用的缓存

`caches.keys()` 方法列出了每个可用缓存的键。

```js
caches.keys().then((keys) => {
  // keys 是一个包含键列表的数组
  console.log(keys)
})
```

#### 从缓存中删除项目

给定一个 `cache` 对象，其 `delete()` 方法将从中删除缓存的资源。

```js
caches.open('my-cache').then((cache) => {
  cache.delete('/api/todos')
})
```

#### 删除缓存

`caches.delete()` 方法接受一个缓存标识符，并在执行时从系统中清除缓存及其缓存项。

```js
caches.delete('my-cache').then(() => {
  console.log('已成功删除')
})
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

#### Push API 接口

```bash
### Push API 接口
- PushManager
- PushEvent
- PushMessageData
- PushSubscription
- PushSubscriptionOptions
```

##### PushManager

```bash
PushManager 接口用于操作推送订阅，通过 ServiceWorkerRegistration.PushManager 获取


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

##### PushEvent

```bash
Push API 接收消息时的事件。此事件在 ServiceWorkerGlobalScope 下响应。

属性
	- data：返回对 PushMessageData 类型，包含发送到的数据的对象。
```

##### PushMessageData

```bash
PushMessageData 接口为 PushEvent.data 中的类型。与 Fetch 中 Body 的方法相似，不同处再于可以重复调用。

方法
	- arrayBuffer()
	- blob()
	- json()
	- text()
```

##### PushSubscription

````bash
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

#### 接口间的关系图

> #### 接口间的关系
>
> ![image-20240228203329693](./image/image-20240228203329693.png)
>
> #### 相关属性、方法
>
> ![202402282040](./image/202402282040.png)



#### Push 相关事件

```bash
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



#### 订阅原理

##### 详细执行过程

![202402282058](./image/202402282058.png)

##### 浏览器端订阅

```bash
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

##### 应用服务器端发送

应用服务器从数据库里取出你的订阅信息，然后根据 Web Push 协议要求，对要发送的消息进行拼装和加密，然后发送给相应的 Push 服务器，然后 Push 服务器再根据订阅信息中的标志发送给相应的终端。

![image-20240228205239484](./image/image-20240228205239484.png)

##### 设备端接收

浏览器端收到推送消息后，会激活相应的 ServiceWorker 线程，并触发 Push 事件。
例如收到消息后，展示一个 Notification，或者做任何其他的事。

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

#### 加密认证

##### 浏览器订阅

```bash
在 `subscribe()` 方法中的 `applicationServerKey` 选项用于推送服务器鉴别订阅用户的应用服务，并用确保推送消息发送给哪个订阅用户。

`applicationServerKey` 是一对公私钥。私钥应用服务器保存，公钥交给浏览器，浏览器订阅时将这个公钥传给推送服务器，这样推送服务器可以将你的公钥和用户的 `PushSubscription` 绑定。
```



##### 你的服务器发送

```bash
当你的服务器要发送推送消息时，需要创建一个 `Authorization` 的 header 头，`Authorization` 由规范要求的加密算法进行私钥加密。推送消息收到消息时，首先取消息请求中 `endpoint` 对应的公钥，解码消息请求中签名过的 `Authorization` header 头，验证签名是否合法，防止它人伪造身份。通过后，推送服务器把消息发送到相应的设备浏览器。

注：这里说的 applicationServerKey 就是 VAPID key。


### JWT 加密生成 Authorization 信息
Authorization 的签名采用 JWT（JSON web token），JWT 是一种向第三方发送消息的方式，三方收到后，获取发送者的公钥进行验证 JWT 的签名。
Authorization 对 JWT 签名的格式要求：`Authorization: 'WebPush <JWT Info>.<JWT Data>.<Signature>'`
在签名的前面加上 WebPush 作为 Authorization 头的值发送给推送服务器。
推送协议同时要求Crypto-Key header 头，用来发送公钥，并需要p256ecdsa=前缀，格式：`Crypto-Key: p256ecdsa=<URL Safe Base64 Public Application Server Key>
`
```

##### 关于消息部分的加密

```bash
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



##### VAPID key 生成

```bash
### VAPID key 生成
密钥使用 ECDSA（椭圆曲线迪菲-赫尔曼金钥交换）的 ES256 算法（ECDSA使用 P-256 曲线和 SHA-256 哈希算法的缩写）。


基于 node 实现：
$ npm install -g web-push
$ web-push generate-vapid-keys

```

###### 基于浏览器 JS 实现

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

###### 应用服务器端实现

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
