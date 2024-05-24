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
      /* :host伪类，指代自定义元素本身 */
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

##### PushEvent

```bash
### PushEvent
Push API 接收消息时的事件。此事件在 ServiceWorkerGlobalScope 下响应。

属性
	- data：返回对 PushMessageData 类型，包含发送到的数据的对象。

```

##### PushMessageData

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

##### PushSubscription

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



#### 订阅原理

##### 详细执行过程

![202402282058](./image/202402282058.png)

##### 浏览器端订阅

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

##### 应用服务器端发送

```bash
### 应用服务器端发送
应用服务器从数据库里取出你的订阅信息，然后根据 Web Push 协议要求，对要发送的消息进行拼装和加密，然后发送给相应的 Push 服务器，然后 Push 服务器再根据订阅信息中的标志发送给相应的终端。

```

![image-20240228205239484](./image/image-20240228205239484.png)

##### 设备端接收

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

#### 加密认证

##### 浏览器订阅

```bash
### 浏览器订阅
在 `subscribe()` 方法中的 `applicationServerKey` 选项用于推送服务器鉴别订阅用户的应用服务，并用确保推送消息发送给哪个订阅用户。

`applicationServerKey` 是一对公私钥。私钥应用服务器保存，公钥交给浏览器，浏览器订阅时将这个公钥传给推送服务器，这样推送服务器可以将你的公钥和用户的 `PushSubscription` 绑定。

```



##### 你的服务器发送

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

##### 关于消息部分的加密

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

