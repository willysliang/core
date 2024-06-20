---
Author: willysliang
CreateTime: 2023-03-31 16:56:31
Modifier: willysliang
ModifiedTime: 2023-03-31 16:57:29
Description: ES6+语法Ⅱ
---

## ES6+语法Ⅱ

## 模块化

> ```bash
> ## 模块规范化
> 编程语言中的模块通常是为了避免全局污染，同时更好地组织程序逻辑，方便代码复用。
> 		- 模块定义：如果定义私有和公开变量、属性、函数、方法
> 		- 模块加载：如何在运行环境中使用模块，模块之间如何相互引用
> 模块的加载在 nodejs 和浏览器的区别：
> 		- Nodejs 模块文件的后缀名为 .mjs
> 		- 浏览器为 script 标签
>
>
> ## 模块化
> 1. 第一阶段：仅仅基于文件的划分模块的方式
> 具体做法就是将每个功能及其相关状态数据各自单独放到不同的文件中，约定每个文件就是一个独立的模块，使用某个模块就是将这个模块引入到页面中，然后直接调用模块中的成员（变量 / 函数）
> 缺点：所有模块都直接在全局工作，没有私有空间，所有成员都可以在模块外部被访问或者修改，而且模块过多，容易产生命名冲突，另外无法管理模块与模块之间的依赖关系
>
>
> 2. 第二阶段：【命名空间】每个模块暴露一个全局对象，所有模块成员都挂载到这个对象中
> 具体做法就是在第一阶段的基础上，通过将每个模块「包裹」为一个全局对象的形式实现，有点类似于为模块内的成员添加了「命名空间」。
> 通过「命名空间」减小了命名冲突的可能，但是同样没有私有空间，所有模块成员也可以在模块外部被访问或者修改，而且也无法管理模块之间的依赖关系。
> 在 JS 中，为了不污染全局变量，我们把想要访问的变量用一个「命名空间」包裹。实际上就是新建了一个包含属性的对象，避免属性直接挂载在全局变量（window/Global）上。但这个对象可任意修改，没有封闭的作用域，所以并非真正的模块。
>       var moduleA = { id: 1, name: 'test' }
>       console.log(moduleA.id)
>
>
> 3. 第三阶段：使用立即执行函数表达式（IIFE：Immediately-Invoked Function Expression）为模块提供私有空间
> 具体做法就是将每个模块成员都放在一个函数提供的私有作用域中，对于需要暴露给外部的成员，通过挂在到全局对象上的方式实现
> 有了私有成员的概念，私有成员只能在模块成员内通过闭包的形式访问。
> 利用立即执行函数表达式创建一个闭包：函数内部的变量均为私有，对外暴露函数的返回值，这个闭包就成为一个模块。
>       var moduleA = (function  () {
>         var _id = 1
>         var _getId = function () { console.log(id) }
>         // 对外暴露的是返回值
>         return { getId: _getId }
>       })()
>       moduleA._id // undefined
>       moduleA._getId // undefined
>       module.getId // 1
>
>
> 4. 第四阶段： 利用 IIFE 参数作为依赖声明使用
> 具体做法就是在第三阶段的基础上，利用立即执行函数的参数传递模块依赖项。
> 这使得每一个模块之间的关系变得更加明显。
>
>
> 5. 第五阶段： 模块化规范
> Require.js 提供了 AMD 模块化规范，以及一个自动化模块加载器---模块化规范的出现。
> 再之后便有了其他更多标准紧接而来，CommonJS、CMD。
> ```

### CommonJS（nodejs）

> ```bash
> ## CommonJS 规范（nodejs 提出的标准）
> CommonJS 中一个 JS 文件就是一个模块，每个模块都有单独的作用域(文件中的所有变量均为私有变量)；
> 	通过 `module.exports` 导出一个对象，里面包含的则是公开变量；
> 	引用时通过 `require` 函数载入模块，其获取模块导出的对象。
>
> 缺点：CommonJS 是以同步模式加载模块，即等待所有模块加载完毕后再执行代码。
> 	- nodejs 执行机制是启动时加载模块，执行过程中不需要加载，只需要使用，所以不会出现问题。
> 	- 在五福段无需要考虑网络的场景下也是没问题的。
> 	- 但在浏览器，同步加载的方式可能会导致较长的网络加载时间；或会导致大量同步请求出现，因而导致效率低。
> ```
>
> ```js
> // ModuleA.js
> var id = 1
> var getId = function () {
>   console.log(id)
> }
> module.exports = { getId }
>
>
> // ModuleB.js
> const moduleA = require('ModuleA.js')
> moduleA.id	// undefined
> moduleA.getId()	// 1
> ```

### AMD（异步：依赖前置，提前执行）

> ```bash
> ## AMD（Asynchronous Module Definition）异步模块定义规范
> AMD 是 require.js 推出的模块规范。通过 define API函数定义和引用模块。
> 优势：目前绝大多数第三方库都支持 AMD 规范。
> 缺点：使用复杂模块划分细致，模块 JS 文件会出现请求频繁的情况。
>
>
> ## Require.js
> 提供 AMD 模块化规范，以及一个自动化模块加载器，提供 require 函数加载模块。
> ```
>
> ```js
> // 入口文件引入 sea.js
> <script src="sea.js"></script>
> <script>
>   seajs.config({
>    base: "js",
>    alias: { jquery: "jquery/jquery/1.10.1/jquery.js" },
> });
> seajs.use("js/main.js");
> </script>
>
>
> // moduleA.js
> define(function () {
>   // 私有变量
>   var id = 1
>   var getId = function () { console.log(id) }
>   // 暴露模块
>   return { getId }
> })
>
>
> // moduleB.js
> define(/** 第一个参数是模块引用列表 */['moduleA'], function () {
>   console.log(moduleA.getId())
> })
> ```

### CMD（异步：依赖就近，延迟执行）

> ```bash
> ## Sea.js(淘宝推出) + CMD(通用模块定义规范)
> CMD是 sea.js 推广的另一个异步加载模块规范，后期也被 Require.js 兼容。
> 使用方式和 AMD 类似，都是在入口 html 文件中引入模块依赖包并进行配置，然后在 js 文件中根据各自规范的 API 定义和引用模块。
> ```
>
> ```js
> // 入口文件引入 sea.js
> <script src="sea.js"></script>
> <script>
>   seajs.config({
>    base: "js",
>    alias: { jquery: "jquery/jquery/1.10.1/jquery.js" },
> })
> seajs.use("js/main.js")
> </script>
>
>
> // moduleA.js
> define(function (require, exports, module) {
>   // 私有变量
>   var id = 1
>   var getId = function () { console.log(id) }
>   // 暴露模块
>   module.exports = { getId }
> })
>
>
> // moduleB.js
> define(function (require, exports, module) {
>   const moduleA = require("moduleA")
>   console.log(moduleA.getId())
> })
> ```

### UMD（模块兼容方案）

> ```bash
> ### AMD & CMD 的区别
> AMD 和 CMD 的区别在于依赖引入的时机。
> 	1. AMD 会将全部依赖前置，只要加载完成就会执行代码；
> 	2. CMD 则推荐将依赖就进处理，需要时再引入。
>
> 这两种方式没有优劣之分，可能从节省网络开销的角度上 CMD 会更好些；在 AMD 的方案中，若 b.doSomething() 是在某个条件下执行，但没有被执行到，那么模块 b 的加载是浪费的（但不影响程序执行速度）。
>
>
> ## UMD（模块兼容方案）
> UMD 不是一个模块规范，而是一个对 AMD 和 CommonJS 的兼容方案，目的是为了让模块同时能够支持浏览器和 Nodejs 两个运行。
> ```
>
> #### AMD & CMD
>
> ```js
> // AMD 推荐
> define(["a", "b"], function (a, b) {
>   a.doSomething(); // 依赖前置，提前执行
>   b.doSomething();
> });
>
>
> // CMD 推荐
> define(function (require, exports, module) {
> var a = require("a");
>   a.doSomething();
> var b = require("b");
>   b.doSomething(); // 依赖就近，延迟执行
> });
> ```
>
> #### UMD方案
>
> ```js
> (function (window, factory) {
>   // Node.js 环境
>   if (typeof exports === "object") {
>     module.exports = factory();
>     // 浏览器环境，支持 AMD
>   } else if (typeof define === "function" && define.amd) {
>     define(factory);
>     // 浏览器环境，不支持 AMD
>   } else {
>     window.eventUtil = factory();
>   }
> })(this, function () {
>   //module ...
> });
> ```

### ES Modules（浏览器）

> ```bash
> ## ES Modules
> ES6 Module 是 JavaScript 中官方支持的模块化方案，它采用 import 和 export 关键字导入和导出模块。
> ES6 模块化支持静态分析，在编译时就能够确定模块的依赖关系，因此可以进行更加高效的打包和压缩。
>
>
> ### ES6 Module 的使用
> 通过 script 添加 `type=module` 的属性使用 ES Modules。
>     1. ESM 自动采用严格模式，忽略 'use strict'。
>     2. 每个 ES Module 都是运行在单独的私有作用域中。
>     3. ESM 是通过 CORS 的方式请求外部 JS 模块的。
>     4. ESM 的 script 标签会延迟执行脚本。
>
>
> ### CommonJS 与 ES Modules 的区别
> 1. 使用语法层面，CommonJs是通过module.exports，exports导出，require导入；ESModule则是export导出，import导入
> 2. CommonJs是运行时加载模块，ESModule是在静态编译期间就确定模块的依赖
> 3. ESModule在编译期间会将所有import提升到顶部，CommonJs不会提升require
> 4. CommonJs导出的是一个值拷贝，会对加载结果进行缓存，一旦内部再修改这个值，则不会同步到外部。ESModule是导出的一个引用，内部修改可以同步到外部
> 5. CommonJs中顶层的this指向这个模块本身，而ESModule中顶层this指向undefined
> 6. CommonJS加载的是整个模块，将所有的接口全部加载进来，ESModule可以单独加载其中的某个接口
>
>
> ### 导出字面量和导出模块的区别
>     导出字面量(如:对象):export default { name, age }
>     注意: import {name, age} from 'modulename'导入模块无法使用到name和age的值
>
>     导出模块:
>       export { name, age }
>       import {name, age} from 'modulename' 导入模块可以使用到name和age的值
> 		原因：import导入的是对模块内部的使用
>
> 		注意：export暴露的是模块的引用关系(地址)，并且只读不可修改(尝试修改会报错误)
>
>
> ### 导出
> 1. CommonJS 中是先将模块整体导入为一个对象，然后从对象中结构出需要的成员
> 			const { name, age } = require('./module.js')
> 2. ES Module 中 { } 是固定语法，就是直接提取模块导出成员
> 			import { name, age } from './module.js'
> 3. ES Modules 导入成员并不是复制一个副本，而是直接导入模块成员的引用地址。
> 		即 import 得到的变量与 export 导入的变量在内存中是同一块空间。一旦模块中成员修改了，这里也会同时修改。
> 4. 导入模块成员变量是只读的
> 			name = 'tom' // 报错
> 5. 导入的是一个对象，对象的属性读写不受影响
> 			name.xxx = 'xxx' // 正常
> ```
>
> ```js
> // ModuleA.js
> var id = 1;
> // 可以直接导出变量
> export const getId = function () {
>   console.log(id);
> };
> // 也可以整体导出模块
> export default { getId };
>
>
> // ModuleB.js
> import moduleA from 'moduleA.js'
> moduleA.id; // undefined
> moduleA.getId(); // 1
> ```

#### ES Modules in Node.js - 与 CommonJS 的差异

> ```bash
> ## ES Modules in Node.js - 与 CommonJS 的差异
> 1、ESM 中无法引用 CommonJS 中的那些模块全局成员
> 2、require, module, exports 可通过 import 和 export 代替
> 3、__filename 和 __dirname 通过 import 对象的 meta 属性获取
> ```
>
> ```js
> /** CommonJS */
> console.log(require) // 加载模块函数
> console.log(module) // 模块对象
> console.log(exports) // 导出对象别名
> console.log(__filename) // 当前文件的绝对路径
> console.log(__dirname) // 当前文件所在目录
>
>
> /** ES Modules */
> // 通过 url 模块的 fileURLToPath 方法转换为路径
> import { fileURLToPath } from 'url'
> import { dirname } from 'path'
> const __filename = fileURLToPath(import.meta.url)
> const __dirname = dirname(__filename)
> console.log(__filename)
> console.log(__dirname)
> const currentUrl = import.meta.url
> console.log(currentUrl)
> ```

#### ES Module工作原理

> ```bash
> ## ES Module 的工作原理
> 浏览器通过Module Record的数据结构。每个 Module Record 包含：
>     - ECMAScript Code: AST 语法树
>     - 需要请求的模块
>         - moduleA.js
>         - moduleB.js
>     - 请求模块的入口
>         - import CustomModule from 'moduleA.js': CustomModule 就是模块入口
>     - 其它属性和方法
>
>
> Module Record 再转换成为包含 code 和 state 的 Module Instance。转换的过程分三步：
>     1. 构造（Construction）
>     2. 实例化（Instantiation）
>     3. 求值（Evaluation）
>
> ES modules: A cartoon deep-dive 构造每个 Module 在构造阶段要执行三个操作：
>     1. 找到包含模块的文件
>     2. 下载文件
>     3. 将文件解析为 Module Record
>
>
> 上述这两个步骤和运行时相关，例如浏览器中文件通过 script 标签引入的；而 Node.js 中文件从文件系统中引入。
>
> 浏览器会建立一个 Module Map，当请求一个 URL 时，浏览器把这个 URL 放入 Module Map，并将其打上标记来标识正在下载该文件。之后就发送请求获取该文件，然后继续获取下一个文件；同时 Module Map 也充当起模块缓存的作用，当请求的 URL 已存在时，会直接从 Map 中取得模块。
>
> 当文件下载完成后，浏览器会将文件转换为 Module Record，然后保存在 Module Map 中。实例化是给各个 Module Record 中 export 的变量和函数分配内存地址，接着将其它模块中对应的 import 部分，指向对应的 export 内存地址。JS 引擎会深度优先遍历模块树，此时变量和函数只分配内存地址，没有值。赋值在最后一步进行。
> ```

### 闭包实现模块化

> ```js
> /* 状态模块（存变量） */
> var module_status = (function () {
>     var status = {
>        number: 0,
>        color: null,
>     };
>     var get = function (prop) {
>        return status[prop];
>     };
>     var set = function (prop, value) {
>        status[prop] = value;
>     };
>     return { get, set, };
> })();
>
> /* 功能模块（调用状态） */
> var module_color = (function () {
>     //用这种方式执行第二步引入操作，类似 import state from 'module_status'
>     var state = module_status;
>     var colors = ["orange", "#ccc", "pink"];
>     function render() {
>        state.set("color", colors[state.get("number") % colors.length])
>        console.log(state.get('color'));
>     }
>     return { render, };
> })();
> var module_context = (function () {
>     var state = module_status;
>     function render() {
>        console.log("this Number is" + state.get("number"));
>     }
>     return { render, };
> })();
>
> /* 主模块（执行功能模块） */
> var module_main = (function () {
>     var state = module_status;
>     var color = module_color;
>     var context = module_context;
>
>     setInterval(function () {
>        state.set("number", state.get("number") + 1);
>        color.render();
>        context.render();
>     }, 1000);
> })();
> ```

## 模块方法

### 动态导入 `import()`

> 在此之前，我们只能使用静态导入，它只接受模块路径的字符串。使用动态导入，我们必须使用 Promise 有条件地导入模块。
>
> ```html
> <nav>
>   <a href="books.html" data-entry-module="books">Books</a>
>   <a href="movies.html" data-entry-module="movies">Movies</a>
>   <a href="video-games.html" data-entry-module="video-games">Video Games</a>
> </nav>
>
> <main>Content will load here!</main>
> ```
>
> ```js
> const main = document.querySelector('main')
> for (const link of document.querySelectorAll('nav > a')) {
>     link.addEventListener('click', (e) => {
>        e.preventDefault()
>
>        import(`./section-modules/${link.dataset.entryModule}.js`)
>          .then((module) => {
>          module.loadPageInto(main)
>        })
>          .catch((err) => {
>          main.textContent = err.message
>        })
>     })
> }
> ```
>

### `import.meta`

> 用于保存有关当前模块的特定于主机的元数据的**元属性**。
>
> ```js
> ;(async () => {
>     const response = await fetch(new URL('../hamsters.jpg', import.meta.url))
>     const blob = await response.blob()
>
>     const size = import.meta.scriptElement.dataset.size || 300
>
>     const image = new Image()
>     image.src = URL.createObjectURL(blob)
>     image.width = image.height = size
>
>     document.body.appendChild(image)
> })()
> ```
>

### `export * as ns from 'mod'`

```bash
### `export * as ns from 'mod'`
语法：`export * as nameSpaceStr from 'modulePath'`


- 为了确保有一个默认导出， [Airbnb 规范](https://github.com/airbnb/javascript)建议不要使用通配符导入。
- 不要直接从 import 中 export，使用一种清晰的导入方式和一种清晰的导出方式可以使事情保持一致。
```

```js
export * as ns from './utils'

// 👆 等同于 👇
import * as ns from './utils'
export { ns }
```

**确保存在一个默认导出**

```js
// bad
import * as AirbnbStyleGuide from './AirbnbStyleGuide'

// good
import AirbnbStyleGuide from './AirbnbStyleGuide'
```

```js
// bad
export { es6 as default } from './AirbnbStyleGuide'

// good
import { es6 } from './AirbnbStyleGuide'
export default es6
```



## 正则表达式  RegExp

> ```bash
> ### 正则表达式 RegExp
>
> ### 正则作用
>     - 检索、替换符合某个模式（规则）的文本
>     - 过滤页面内容中的一些敏感词（替换）
>     - 从字符串中获取特定部分（提取）
>
>
>
> ### 创建正则表达式
> 1. 通过 `RegExp` 对象的构造函数创建正则表达式
> 		- `let reg = new RegExp(/正则表达式/)`
> 		- `let reg = new RegExp(字符串, 匹配模式修饰符Flag)`
>
> 2. 通过字面量创建
> 		- `let reg = /表达式/`
> 		- `let reg = /正则表达式/匹配模式`
>
>
>
> ### 字符串的正则方法
> 字符串对象共有 4 个方法，可以使用正则表达式：match()、replace()、search()和split()。
> ES6 将这 4 个方法，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上。
>     - String.prototype.match 调用 RegExp.prototype[Symbol.match]
>     - String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
>     - String.prototype.search 调用 RegExp.prototype[Symbol.search]
>     - String.prototype.split 调用 RegExp.prototype[Symbol.split]
>
> ```

### 匹配模式（标志）

```bash
## 匹配模式
### `i`：忽略大小写 ignore(Case Insensitive)
- 修饰语 `i` 用于忽略大小写。
- 如：`'The fat cat sat on the mat.'.match(/The/gi)` 会返回 `['The', 'the']`


### `g`：全局搜索 global(Global search)
- 修饰符 `g` 常用于执行一个全局搜索匹配，即（不仅仅返回第一个匹配的，而是返回全部）
- 全局匹配模式`g`一般用于 `exec()、match()、replace()` 等方法
- 全局匹配模式`g`如果用于test()方法会有问题。因为g模式会生成一个`lastindex`参数来存储匹配最后一次的位置。
- 如：`'The fat cat sat on the mat.'.match(/.(at)/g)` 会返回 `['fat', 'cat', 'sat', 'mat']`


### `m`: 多行修饰符 (Multiline)
- 多行修饰符 `m` 常用于执行一个多行匹配。
- 像 `(^,$)` 用于检查格式是否是在待检测字符串的开头或结尾。但我们如果想要它在每行的开头和结尾生效，我们需要用到多行修饰符 `m`。
- 如：`'The fat cat sat on the mat.'.match(/.at(.)?$/gm)` 会返回 `['mat.']`


### `y`：指黏连 sticky
    - 类似全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始；
    - `g`修饰符只要剩余位置中存在匹配就行，而`y`修饰符确保匹配必须从剩余的第一个位置开始。


### `u` 修饰符：含义为 Unicode 模式
		- 用来正确处理大于`\uFFFF` 的 Unicode 字符，即会正确处理四个字节的UTF-16编码。
		- 在 ES5 中不支持四个字节的 UTF-16 编码，会将其识别为两个字符；加上 `u` 修饰符后，ES6就会识别其为一个字符。
		- 如：`/𠮷{2}/u.test('𠮷𠮷') === true`。
          /^\uD83D/u.test('\uD83D\uDC2A') // false
          /^\uD83D/.test('\uD83D\uDC2A') // true


### `.` 修饰符：含义是除了换行符以外的任意单个字符
		- 对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符。



### `s` 修饰符：dotAll 模式
正则表达式中，点（.）是一个特殊字符，代表任意的单个字符，但是有两个例外。一个是四个字节的 UTF-16 字符，这个可以用u修饰符解决；另一个是行终止符（line terminator character）。
所谓行终止符，就是该字符表示一行的终结。以下四个字符属于“行终止符”。
    - U+000A 换行符（\n）
    - U+000D 回车符（\r）
    - U+2028 行分隔符（line separator）
    - U+2029 段分隔符（paragraph separator）
```

| 修饰符 | 描述                                                         |
| :----- | :----------------------------------------------------------- |
| `i`    | 忽略大小写。                                                 |
| `g`    | 全局匹配（查找所有匹配而非在找到第一个匹配后停止）。         |
| `m`    | 多行匹配：锚点元字符 `^` `$` 工作范围在每行的起始。          |
| `u`    | Unicode 模式                                                 |
| `y`    | 粘连（sticky），与 `g` 修饰符类似，也是全局匹配。`y` 修饰符确保匹配必须从剩余的第一个位置开始 |
| `s`    | ES2018 引入 `s` 修饰符，使得 `.` 可以匹配任意单个字符。 `dotAll` 模式。即点（dot）代表一切字符。 |



#### `y` 修饰符

> ```js
> var s = 'aaa_aa_a';
> var r1 = /a+/g;
> var r2 = /a+/y;
> r1.exec(s) // ["aaa"]
> r2.exec(s) // ["aaa"]
> r1.exec(s) // ["aa"]
> r2.exec(s) // null
>
>
>
> /** g修饰符通过 lastIndex 来排查 */
> const REGEX = /a/g;
> // 指定从2号位置（y）开始匹配
> REGEX.lastIndex = 2;
> // 匹配成功
> const match = REGEX.exec('xaya');
> // 在3号位置匹配成功
> match.index // 3
> // 下一次匹配从4号位开始
> REGEX.lastIndex // 4
> // 4号位开始匹配失败
> REGEX.exec('xaya') // null
>
>
>
> /** y修饰符通过 lastIndex 来排查 */
> const REGEX = /a/y;
> // 指定从2号位置开始匹配
> REGEX.lastIndex = 2;
> // 不是粘连，匹配失败
> REGEX.exec('xaya') // null
> // 指定从3号位置开始匹配
> REGEX.lastIndex = 3;
> // 3号位置是粘连，匹配成功
> const match = REGEX.exec('xaya');
> match.index // 3
> REGEX.lastIndex // 4
> ```

#### `u`修饰符

> ```js
> /** u 修饰符 */
> /^\uD83D/u.test('\uD83D\uDC2A') // false
> /^\uD83D/.test('\uD83D\uDC2A') // true
>
>
> /** 点修饰符 与 u 修饰符搭配 */
> /^.$/.test('𠮷') // false
> /^.$/u.test('𠮷') // true
> // 上面代码如果不添加u修饰符，正则表达式就会认为字符串为两个字符，从而匹配失败。
>
>
>
> /** Unicode 字符表示法 */
> // 使用大括号表示 Unicode 字符，这种表示法在正则表达式中必须加上`u`修饰符，才能识别当中的大括号，否则会被解读为量词。
> /\u{61}/.test('a') // false
> /\u{61}/u.test('a') // true
> /\u{20BB7}/u.test('𠮷') // true
>
>
>
> /** 量词 */
> /a{2}/.test('aa') // true
> /a{2}/u.test('aa') // true
> /𠮷{2}/.test('𠮷𠮷') // false
> /𠮷{2}/u.test('𠮷𠮷') // true
>
>
>
> /** 预定义模式 */
> /^\S$/.test('𠮷') // false
> /^\S$/u.test('𠮷') // true
> ```

#### `s` 修饰符

> 正则表达式中，点（`.`）是一个特殊字符，代表任意的单个字符，但是有两个例外。一个是四个字节的 UTF-16 字符，这个可以用`u`修饰符解决；另一个是行终止符（line terminator character）。
>
> 所谓行终止符，就是该字符表示一行的终结。以下四个字符属于“行终止符”。
>
> - U+000A 换行符（`\n`）
> - U+000D 回车符（`\r`）
> - U+2028 行分隔符（line separator）
> - U+2029 段分隔符（paragraph separator）
>
> ```js
> /foo.bar/.test('foo\nbar') // false
> ```
>
> 上面代码中，因为`.`不匹配`\n`，所以正则表达式返回`false`。
>
> 但是，很多时候希望匹配的是任意单个字符，这时有一种变通的写法。
>
> ```js
> /foo[^]bar/.test('foo\nbar') // true
> ```
>
> 这种解决方案毕竟不太符合直觉，ES2018引入 `s`修饰符，使得`.`可以匹配任意单个字符。
>
> ```js
> /foo.bar/s.test('foo\nbar') // true
> ```
>
> 这被称为`dotAll`模式，即点（dot）代表一切字符。所以，正则表达式还引入了一个`dotAll`属性，返回一个布尔值，表示该正则表达式是否处在`dotAll`模式。
>
> ```js
> const re = /foo.bar/s;
>
> // 另一种写法
> const re = new RegExp('foo.bar', 's');
> re.test('foo\nbar') // true
> re.dotAll // true
> re.flags // 's'
> ```
>
> `/s`修饰符和多行修饰符`/m`不冲突，两者一起使用的情况下，`.`匹配所有字符，而`^`和`$`匹配每一行的行首和行尾。

#### dotAll 模式

> **dotAll 模式**，即点（dot）代表一切字符。所以，正则表达式中点（`.`）匹配除行终止符外的任何单字符，ES9 引入 `s` 修饰符可以改变这种行为，允许**行终止符（line terminator character）**的出现。
>
> 所谓行终止符，就是该字符表示一行的终结。以下四个字符属于“行终止符”。
>
> - U+000A 换行符（`\n`）
> - U+000D 回车符（`\r`）
> - U+2028 行分隔符（line separator）
> - U+2029 段分隔符（paragraph separator）
>
> ```js
> ;/hello.world/.test('hello\nworld') / // false
> /hello.world/s.test('hello\nworld') // true
> ```
>
> 正则表达式还引入了一个 `dotAll` 属性，返回一个布尔值，表示该正则表达式是否处在 `dotAll` 模式。
>
> ```js
> const reg = /foo.bar/s
>
> reg.test('foo\nbar') // true
> reg.dotAll // true
> reg.flags // 's'
> ```
>
> `/s` 修饰符和多行修饰符 `/m` 不冲突，两者一起使用的情况下，`.` 匹配所有字符，而 `^` 和 `$` 匹配每一行的行首和行尾。

### `[]` 元字符

| 元字符   | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| `.`      | 匹配任意单个任何字符，除了换行符                             |
| `[ ]`    | 字符种类。匹配方括号内的任意字符。                           |
| `[^]`    | 否定的字符种类。匹配除了方括号里的任意字符。                 |
| `*`      | 匹配 `>=0` 个重复的在 `*` 号之前的字符。                     |
| `+`      | 匹配 `>=1` 个重复的 `+` 号前的字符。                         |
| `?`      | 标记 `?` 之前的字符为可选。                                  |
| `{n, m}` | 匹配 `num` 个大括号之前的字符或字符集 (n <= num <= m)。      |
| `(xyz)`  | 字符集，匹配与 `xyz` 完全相等的字符串。                      |
| `\`      | 转义字符，用于匹配一些保留的字符 `[ ] ( ) { } . \* + ? ^ $ \ |
| `^`      | 从开始行开始匹配。                                           |
| `$`      | 从末端开始匹配。                                             |
| `|`      | 匹配符号前或后的字符                                         |

#### [ 值- 值] 范围

> - `/[ab]/` 等价于 `/a|b/`：检查一个字符串中是否包含 **a或b**
> - `/[a-z]/`：检查一个字符串那种是否包含**任意小写字母**
> - `/[A-Z]/`：任意大写字母
> - `/[A-z]/`：任意字母
> - `/[0-9]/`：任意数字
> - `[a-z0-9A-Z]`：任意数字、字母
> - `/a[bde]c/`：检查一个字符串中是否包含 abc 或 adc 或 aec

#### `[^值]`  排除

> ```javascript
> // 举例1：
> var reg = /[^ab]/; // 规则：字符串中，除了a、b之外，还有没有其他的字符内容？
> var str = "acb";
> console.log(reg.test(str)); // 打印结果：true
>
> // 举例2：（可以用来验证某字符串是否为 纯数字）
> var reg = /[^0-9]/;  // 规则：字符串中，除了数字之外，还有没有其他的内容？
> var str1 = "1991";
> var str2 = "199a1";
>
> console.log(reg.test(str1)); // 打印结果：false （如果字符串是 纯数字，则返回 false）
> console.log(reg.test(str2)); // 打印结果：true
> ```

#### 转义字符

> - `.`(点) ：任意字符
> - `\d` (数字)：`[0-9]`
> - `\w` (数字、英文、下划线) ：`[a-z0-9_]`
> - `\s` (空白字符)：`[ ]`
> - `\D` (除了数字)：`[^0-9]`
> - `\W` (除了数字英文下划线) ：`[^a-z0-9_]`
> - `\S` (除了空白字符)：`[^ ]`
> - ``^` ：行首
> - `$`：行尾

#### 量词

| `a*`     | 匹配 0 或更多     |
| -------- | ----------------- |
| `a+`     | 匹配 1 或更多     |
| `a?`     | 匹配 0 或 1       |
| `a{5}`   | 精确匹配 5        |
| `a{,3}`  | 最多匹配 3 个     |
| `a{3,}`  | 匹配 3 或更多     |
| `a{1,3}` | 1 和 3 之间的匹配 |

- `{n}`：刚好出现 n 次
- `{n,m}` 至少出现 n 次，最多 m 次
- `{n,}` 至少 n 次，无上限
- `*` 任意次 `{0,}` 可以为0次，不建议使用
- `？` 零次或一次 `{0,1}`
- `+` 一次或任意次`{1,}`

```js
// 固定电话:010-23456789-1234 或 23456789
(0\d{2,3}-)?[1-9]\d{7}(-\d{1,5})?
```



#### 锚点

| `\G`      | 匹配开始       |
| --------- | -------------- |
| `^`、`\A` | 字符串开头     |
| `$`、`\Z` | 字符串结尾     |
| `\z`      | 字符串绝对结尾 |
| `\b`      | 单词边界       |
| `\B`      | 非单词边界     |
| `^abc`    | 以 `abc` 结尾  |
| `abc$`    | 以 `abc` 开头  |



#### 字符集

字符集也叫做字符类。方括号 `[]` 用来指定一个字符集。 在方括号中使用连字符来指定字符集的范围。 在方括号中的字符集不关心顺序。

| `[abc]`       | `a`、`b` 或 `c` 中的任何一种        |
| ------------- | ----------------------------------- |
| `[a-z]`       | 介于和 `a` 和 `z` 之间的字符        |
| `[1-9]`       | 介于和 `1` 和 `9` 之间的数字        |
| `[[:print:]]` | 包括空格在内的任何可打印字符        |
| `[^abc]`      | 除了 `a`、`b` 或 `c` 以外的任何字符 |

| `.`  | 除换行符外的所有字符                                         |
| ---- | ------------------------------------------------------------ |
| `\w` | 文字（字母、数字、下划线）。相当于 `[A-Za-z0-9_]`            |
| `\d` | 数字。相当于 `[0-9]`                                         |
| `\s` | 空白（任何空白字符，包括空格、制表符、换页符等）。相当于 `[ \f\n\r\t\v]` |
| `\W` | 非文字                                                       |
| `\D` | 非数字                                                       |
| `\S` | 非空白                                                       |
| `\f` | 匹配一个换页符                                               |
| `\n` | 匹配一个换行符                                               |
| `\r` | 匹配一个回车符                                               |
| `\t` | 匹配一个制表符                                               |
| `\v` | 匹配一个垂直制表符                                           |
| `\p` | 匹配 CR/LF（等同于 `\r\n`），用来匹配 DOS 行终止符           |



### 命名捕获组`?<name>`

> JavaScript 正则表达式可以返回一个匹配的对象 —— 一个包含匹配字符串的类数组，例如：以 `YYYY-MM-DD` 的格式解析日期：
>
> ```js
> const reDate = /([0-9]{4})-([0-9]{2})-([0-9]{2})/,
> match = reDate.exec('2018-04-30'),
> year = match[1], // 2018
> month = match[2], // 04
> day = match[3] // 30
> ```
>
> 这样的代码很难读懂，并且改变正则表达式的结构有可能改变匹配对象的索引。
>
> ES9 允许命名捕获组使用符号 `?<name>`，在打开捕获括号 `(` 后立即命名，示例如下：
>
> ```js
> const reDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
> match = reDate.exec('2018-04-30'),
> year = match.groups.year, // 2018
> month = match.groups.month, // 04
> day = match.groups.day // 30
> ```
>
> 任何匹配失败的命名组都将返回 `undefined`。
>
> 命名捕获也可以使用在 `replace()` 方法中。例如将日期转换为美国的 `MM-DD-YYYY` 格式：
>
> ```js
> const reDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
> d = '2018-04-30',
> usDate = d.replace(reDate, '$<month>-$<day>-$<year>')
> ```

### Unicode 属性转义

> 在 ES9 之前，在正则表达式中访问 Unicode 字符属性是不被允许的。
>
> ES9 添加了 Unicode 属性转义，形式为 `\p{...}` 和 `\P{...}`，在正则表达式中使用标记 `u` （unicode）设置，在 `\p` 块内，可以以键值对的方式设置需要匹配的属性而非具体内容。例如：
>
> ```js
> const reGreekSymbol = /\p{Script=Greek}/u
> reGreekSymbol.test('π') // true
> ```
>
> 此特性可以避免使用特定 Unicode 区间来进行内容类型判断，提升可读性和可维护性。



### 实例属性

- `ignoreCase` 只读属性。返回一个布尔值，表示是否设置了 `i` 修饰符。
- `multiline` 只读属性。返回一个布尔值，表示是否设置了 `m` 修饰符。
- `global` 只读属性。返回一个布尔值，表示是否设置了 `g` 修饰符。

```js
const reg = /abc/gim

reg.ignoreCase // true
reg.global // true
reg.multiline // true
```

`lastIndex` 可读可写。返回一个数值，表示下一次开始搜索的位置。

```js
;/(hi)?/g.lastIndex // 0
```

`source` 只读属性。返回正则表达式的字符串形式（不包括反斜杠）。

```js
;/abc/gim.source // "abc"
```

`unicode` 只读属性。属性表明正则表达式带有 `u` 修饰符。

```js
;/\u{61}/u.unicode // true
```

`sticky` ES6 新增的只读属性。表示是否设置了`y`修饰符。

```js
;/foo/y.sticky // true
```

`flags` ES6 新增。该属性返回一个字符串，由当前正则表达式对象的修饰符组成，以字典序排序（从左到右，即 `"gimuy"`）。

```js
;/foo/gi.flags / // "gi"
  bar /
  myu.flags.flags // "muy"
```



### 零宽度断言（前后预查）

先行断言和后发断言都属于**非捕获簇**（不捕获文本 ，也不针对组合计进行计数）。 先行断言用于判断所匹配的格式是否在另一个确定的格式之前，匹配结果不包含该确定格式（仅作为约束）。

例如，我们想要获得所有跟在 `$` 符号后的数字，我们可以使用正后发断言 `(?<=\$)[0-9\.]*`。 这个表达式匹配 `$` 开头，之后跟着 `0,1,2,3,4,5,6,7,8,9,.` 这些字符可以出现大于等于 0 次。

```js
'$'.match(/(?<=\$)[0-9\.]*/) // ['', index: 1, input: '$', groups: undefined]
'$1'.match(/(?<=\$)[0-9\.]*/) // ['1', index: 1, input: '$1', groups: undefined]
```

| 符号  | 描述            |
| ----- | --------------- |
| `?=`  | 正先行断言-存在 |
| `?!`  | 负先行断言-排除 |
| `?<=` | 正后发断言-存在 |
| `?<!` | 负后发断言-排除 |

#### `?=` 正先行断言

`?=` 正先行断言，表示第一部分表达式之后必须跟着 `?=...`定义的表达式。

返回结果只包含满足匹配条件的第一部分表达式。 定义一个正先行断言要使用 `()`。在括号内部使用一个问号和等号： `(?=...)`。

正先行断言的内容写在括号中的等号后面。

```js
'The fat cat sat on the mat.'.match(/(T|t)he(?=\sfat)/) // ['The', 'T', index: 0, input: 'The fat cat sat on the mat.', groups: undefined]
'The fat cat sat on the mat.'.match(/(T|t)he(?=\sfat)/) // ['The', 'T', index: 0, input: 'The fat cat sat on the mat.', groups: undefined]
```

#### `?!` 负先行断言

`?!` 负先行断言，用于筛选所有匹配结果，筛选条件为 其后不跟随着断言中定义的格式。 正先行断言定义和负先行断言一样，区别就是 `=` 替换成 `!` 也就是 `(?!...)`。

```js
;/(T|t)he(?!\sfat)/.exec('The fat cat sat on the mat.') // ['the', 't', index: 19, input: 'The fat cat sat on the mat.', groups: undefined]
```

#### `?<=` 正后发断言

`?<=` 正后发断言，用于筛选所有匹配结果，筛选条件为 其前跟随着断言中定义的格式。

```js
;/(?<=(T|t)he\s)(fat|mat)/.exec('The fat cat sat on the mat.') // ['fat', 'T', 'fat', index: 4, input: 'The fat cat sat on the mat.', groups: undefined]
```

#### `?<!` 负后发断言

`?<!` 负后发断言，用于筛选所有匹配结果，筛选条件为 其前不跟随着断言中定义的格式。

```js
;/(?<!(T|t)he\s)(cat)/.exec('The fat cat sat on the mat.') // ['cat', undefined, 'cat', index: 8, input: 'The fat cat sat on the mat.', groups: undefined]
```



#### 反向断言（lookbehind）

目前 JavaScript 在正则表达式中支持先行断言（lookahead）。这意味着匹配会发生，但不会有任何捕获，并且断言没有包含在整个匹配字段中。例如从价格中捕获货币符号：

```js
const reLookahead = /\D(?=\d+)/
const match = reLookahead.exec('$123.89')

console.log(match[0]) // $
```

ES9 引入以相同方式工作但是匹配前面的反向断言（lookbehind），这样我就可以忽略货币符号，单纯的捕获价格的数字：

```js
const reLookbehind = /(?<=\D)\d+/
const match = reLookbehind.exec('$123.89')

console.log(match[0]) // 123.89
```

以上是**肯定反向断言**，非数字 `\D` 必须存在。同样的，还存在**否定反向断言**，表示一个值必须不存在，例如：

```js
const reLookbehindNeg = /(?<!\D)\d+/
const match = reLookbehind.exec('$123.89')

console.log(match[0]) // null
```



### 贪婪匹配与惰性匹配（Greedy vs lazy matching）

正则表达式默认采用贪婪匹配模式，在该模式下意味着会匹配尽可能长的子串。我们可以使用 `?` 将贪婪匹配模式转化为惰性匹配模式。

- `*?`：表示某个模式出现 0 次或多次，匹配时采用非贪婪模式。
- `+?`：表示某个模式出现 1 次或多次，匹配时采用非贪婪模式。

```js
'The fat cat sat on the mat.'.match(/(.*at)/) // ['The fat cat sat on the mat', 'The fat cat sat on the mat', index: 0, input: 'The fat cat sat on the mat.', groups: undefined]

'The fat cat sat on the mat.'.match(/(.*?at)/) // ['The fat', 'The fat', index: 0, input: 'The fat cat sat on the mat.', groups: undefined]
```



### 检测`test()`

```bash
### 检测 test()
- `regExp.test(要测试的文本str)`：方法返回一个布尔值，表示当前模式是否能匹配参数字符串
- 对于 '非全局匹配' 的正则表达式，test() 只会检测 '是否存在某个目标字符串'(只要存在就为 true)，多次检测的见过都相同。
- 注意：全局匹配 g 慎用 test() 方法，因为每次检测的结果可能会出现不一致。
```

```js
/lit/.test('I am a lit') // true


const reg = /test/g;
const str = '_test_test';

console.log(reg.test(str)); // true
console.log(reg.lastIndex); // 5

console.log(reg.test(str)); // true
console.log(reg.lastIndex); // 10

console.log(reg.test(str)); // false
console.log(reg.lastIndex); // 0
```



### 替换`replace()`

> ```bash
> ## 替换 replace()
> - `replace()`：将字符串中的指定内容替换为新的内容并返回。不会修改原字符串。
> - `新的字符串 = 原字符串.replace(被替换的内容, 要替换的新内容)`
>
> - 对于不带标志 `/g` 的正则表达式，replace() 只访问第一个匹配项。
> - 若在正则表达还是后面加上 `/g`，replace() 会执行多次。
>
>
>
> ### replaceAll()
> - `replaceAll()` 替换正则表达式或字符串的所有匹配项。
> - `String.prototype.replaceAll(searchValue, replaceValue)`
> 		- `searchValue` 可以是一个字符串或正则表达式。
>
> 		- `.*` — 单个字符匹配任意次，即贪婪匹配
>     - `u` — Unicode 模式
>     - `g` — 全局匹配，查找所有的匹配项
> ```
>
> ```js
> var str2 = "Today is fine day,today is fine day !!!"
> console.log(str2.replace("today", "tomorrow"));  //只能替换第一个today
> console.log(str2.replace(/today/gi, "tomorrow")); //这里用到了正则为“全局匹配”模式，才能替换所有的today
>
>
> /** replace */
> const regExp = /^([A-Za-z]+): (.*)$/gu
> 'first: Jane'.replaceAll(regExp, 'KEY: $1, VALUE: $2') // 'KEY: first, VALUE: Jane'
>
>
> /** replaceAll() 对插入命名组的捕获 */
> const regExp = /^(?<key>[A-Za-z]+): (?<value>.*)$/gu
> 'first: Jane'.replaceAll(regExp, 'KEY: $<key>, VALUE: $<value>') // 'KEY: first, VALUE: Jane'
> ```

### 搜索`search()`

> - `search()`：搜索字符串中是否含有指定内容，返回指定内容第一次出现的索引；否则返回-1（注意：search只会查找一个，即使设置全局匹配也无效）
>
> ```js
> var str = "hello abc hello aec afc";
> // 搜索字符串中是否含有abc 或 aec 或 afc
> console.log(str.search(/a[bef]c/));	 // 6
> ```

### 提取`match()`

> ```bash
> ## 提取 match()
> - `match()`：根据正则表达式从一个字符串中将符合条件的内容提取出来，封装到一个数组中返回。
>
> 注意：默认情况下，`match()` 方法只找到 '第一个' 符合要求的内容后就停止检索，但是设置正则表达式为 '全局匹配' 模式，就会匹配到所有相关的内容，并以 '数组' 的形式返回。
>
>
>
> ### 提取所有匹配项 matchAll()
> - ES2020 增加 `String.prototype.matchAll()` 方法，可以一次性提取所有匹配。不过，它返回的是一个遍历器(Iterator)，而不是数组。
>
> - 由于 `string.matchAll(regex)` 返回的是遍历器，所以可以用 `for...of` 循环取出。相对于返回数组，返回遍历器的好处在于，如果匹配结果是一个很大的数组，那么遍历器比较节省资源。
> 遍历器可以使用 `...`运算符 和 `Array.from()` 方法来转为数组。
> ```
>
> ```js
> /** match() */
> var str = "1aae6A8B";
> var r1 = str.match(/[a-z]/);   // 找到符合要求的第一个内容，然后返回
> var r2 = str.match(/[a-z]/g);  // 设置为“全局匹配”模式，匹配字符串中 所有的小写字母
> var r3 = str.match(/[a-z]/gi); // 设置多个匹配模式，匹配字符串中 所有的字母（忽略大小写）
> console.log(r1, r2, r3); // 打印结果：["a"], ["a", "a", "e"], ["a", "a", "e", "A", "B"]
>
>
> /** matchAll() */
> const string = 'test1test2test3';
> // g 修饰符加不加都可以
> const regex = /t(e)(st(\d?))/g;
> for (const match of string.matchAll(regex)) {
>   console.log(match);
> }
> // ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"]
> // ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"]
> // ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
>
>
> // 转为数组方法一
> [...string.matchAll(regex)]
> // 转为数组方法二
> Array.from(string.matchAll(regex))
> ```

### 拆分 split

> - `split()` 可以使用字符串或正则表达式指定分隔符来进行拆分字符串成一个数组。
>   - 如果该正则表达式至少包含一个捕获组，则 `split()` 返回一个数组，其中子字符串与第一个组捕获的内容交错
>
> ```js
> const str = "11a22b33c44d55e66f77g"
> const regExp = /[A-z]/
> const result = str.split(regExp) // 参数是一个正则表达式：表示所有字母
> console.log(result)  // [ '11', '22', '33', '44', '55', '66', '77', '' ]
>
>
> const regExp1 = /<(-+)>/gu
> const str1 = 'a<--->b<->c'
> str1.split(regExp1) // [ 'a', '---', 'b', '-', 'c' ]
> ```

### 搜索匹配 exec

> `exec()` 方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 `null`。
>
> ```js
> const str = '_x_x'
>
> /x/.exec(str) // ['x', index: 1, input: '_x_x', groups: undefined]
> /y/.exec(str) // null
> ```
>
> 在以下示例中，我们收集数组匹配中组 1 的所有捕获：
>
> ```js
> function collectGroup1(regExp, str) {
>   const matches = []
>   while (true) {
>     const match = regExp.exec(str)
>     if (match === null) break
>     // 将组 1 的捕获添加到 matches
>     matches.push(match[1])
>   }
>   return matches
> }
>
> collectGroup1(/"([^"]*)"/gu, `"foo" and "bar" and "baz"`) // [ 'foo', 'bar', 'baz' ]
> ```
>
> 没有标志 `/g`，`exec()` 始终只返回第一个匹配项：
>
> ```js
> const re = /[abc]/
> re.exec('abc') // [ 'a', index: 0, input: 'abc' ]
>
> re.exec('abc') // [ 'a', index: 0, input: 'abc' ]
> ```
>
> 这对 `collectGroup1()` 来说是个坏消息，因为如果 `regExp` 没有标志 `/g`，它将永远不会完成。

#### 捕获组

捕获组允许您获取匹配字符串的特定部分，只需将部分正则表达式括在括号中即可 `(...)`：

```js
const str = 'JavaScript is a programming language';
/(JavaScript) is a (.*)/.exec(str)

/*
  [
    0: 'JavaScript is a programming language',
    1: 'JavaScript',
    2: 'programming language'
    ...
  ]
*/
```



#### 非捕获组

非捕获组用于匹配某些内容而不捕获它，例如您并不真正需要的一个 `/` 或匹配组。它们的定义类似于捕获组，但前缀为 `?:`：

```js
const str = 'JavaScript is a programming language';
/(?:JavaScript|Python) is a (.+)/.exec(str)

/*
  [
    0: 'JavaScript is a programming language',
    1: 'programming language'
    ...
  ]
*/
```



#### 捕获组反向引用

反向引用帮你写较短的正则表达式，通过重复现有的捕获组，使用 `\1`，`\2` 等等。同样地，你也可以重复命名捕捉使用群体 `\k` `<name>`：

```js
const str = 'JavaScript is a programming language - an awesome programming language JavaScript is';
/(.+) is a (?<description>.+) - an awesome \k<description> \1 is/.exec(str)

/*
  [
    0: 'JavaScript is a programming language - an awesome programming language JavaScript is',
    1: 'JavaScript',
    2: 'programming language',
    groups: {
      description: 'programming language'
    }
    ...
  ]
*/
```



#### 前瞻

前瞻（Lookaheads）允许您检查某些内容是否遵循特定模式，而无需实际匹配它。您可以使用以下方法创建正先行断言（`?=`）和负先行断言（`?!`）：

```js
const str = 'JavaScript is not the same as Java and you should remember that';

/Java(?=Script)(.*)/.exec(str)
/*
  [
    0: 'JavaScript is not the same as Java and you should remember that',
    1: 'Script is not the same as Java and you should remember that'
    ...
  ]
*/


/Java(?!Script)(.*)/.exec(str)
/*
  [
    0: 'Java and you should remember that',
    1: ' and you should remember that'
    ...
  ]
*/
```



#### Unicode 字符

最后，可以匹配 unicode 字符，使用 `/p{...}` 和 `/u` 标志。示例包括但不限于 `{Emoji}`，`{Math_Symbols}` 和 `{Script=Greek}`：

```js
const str = 'Greek looks like this: γεια'
;/\p{Script=Greek}+/u.exec(str)
/*
  [
    0: 'γεια'
    ...
  ]
*/
```



### 常用正则

#### 匹配是否包含汉字

```js
/** 传统的匹配是否包含汉字：枚举法 */
const pattern1 = /[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|[\uD86A-\uD86C][\uDC00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]/


/** 优化后的匹配汉字表达式 */
const pattern = /\p{Script=Han}/u
!!'你好'.match(pattern) // true

```



## 数据结构

### Set

> - `Set`数据结构类似于数组，但成员值都是唯一、没有重复的值（可用于**搜索关键词、数组去重**）
> - `Set`本身是构造函数，用来生成`Set`数据结构，`Set`函数可以接受一个数组(或具有Iterable接口的其他数据结构)作为参数，用来初始化
> - 注意：在Set内部两个`NaN`是相等的，两个对象总是不相等的
> - 实例方法
>   - `add(value)`：增加新元素，返回Set结构本身
>   - `delete(value)`：删除指定元素，返回布尔值表示是否删除成功
>   - `has(value)`：返回布尔值，检测Set数据是否有该值
>   - `size()`：返回集合的元素个数
>   - `clear()`：清除所有成员，没有返回值
>
> ```js
> const s = new Set();
> s.add(1).add(2).add(2) // s：{1, 2}
> s.size	// 2
> s.delete(2)	// s: {1}
> s.has(2)	// false
>
> const s1 = new Set([1, 2, 3, 4, 2, 1]);	//	{1, 2, 3, 4}
> const set = new Set(["a", "b", "a", "b"]);	//	{"a", "b"}
> const arr = [...set];	//把set结构转换为数组结构 [ 'a', 'b' ]
>
> //遍历set数据结构
> set.forEach(value => { console.log(value) })	//a b
>
> /* 遍历器：只能用for of来遍历 */
> // Array.keys()指的是返回键名的遍历器
> for (let s of arr.keys()) {
>     console.log(s); // 0 1
> }
> //.values()指的是返回键值的遍历器
> for (let x of arr.values()) {
>     console.log(x); // a b
> }
> //.entries()指的是返回键值对的遍历器
> for (let y of arr.entries()) {
>     console.log(y); // [ 0, 'a' ] [ 1, 'b' ]
> }
>
> /* map 和 filter方法可间接用于Set */
> let set = new Set([1, 2, 3, 4, 2, 1])
> set = new Set([...set].map(val => val * 2))
> set = new Set([...set].filter(val => (val % 2) === 0)
> ```
>
> ```js
> let set1 = new Set([1, 2, 3]), set2 = new Set([2, 1, 4]);
> // 模拟求交集
> let intersection = new Set([...set1].filter(x => set2.has(x)));
>
> // 模拟求差集
> let difference = new Set([...set1].filter(x => !set2.has(x)));
>
> // Set集合与数组互换
> const arr = Array.from([...set1])
> const mySet = new Set(arr)
>
> // 数组去重
> const arr = [123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]
> let m  = [...new Set(arr.map(JSON.stringify))].map(JSON.parse);
> console.log(m)	// [ 123, [ 1, 2, 3 ], [ 1, '2', 3 ], 'meili' ]
>
> // 去除数组重复成员
> let arr = [...new Set([1, 2, 2, 1])]
> // 去除字符串的重复字符
> let str = [...new Set('ababbc')].join('')
> ```

### WeakSet

> - `WeakSet`与`Set`结构的区别
>   - `WeakSet`成员只能是对象，而不能有其他类型的值（可接受数组或类似数组的对象作为参数）
>   - `WeakSet`中的对象都是弱引用（即当其他对象不再引用该对象时，垃圾回收机制会自动回收该对象所占用的内存，使得我们不用考虑对象还存不存在`WeakSet`中），常用于保存DOM节点使得不容易造成内存泄漏
>   - 总结：所以WeakSet的成员是不适合引用的，因为它会随时消失。由于内部成员数量取决于垃圾回收机制是否运行，运行前后很可能成员数量不同，且垃圾回收机制何时运行不可测，所以ES6规定WeakSet不可遍历
> - `ws.add(val)`：向 WeakSet 实例添加一个新成员
> - `ws.delete(val)`：清除 WeakSet 实例的指定成员
> - `ws.has(val)`：返回一个布尔值，表示某个值是否在 WeakSet 实例之中
>
> ```js
> const a = [[1, 2], [3, 4]];
> const ws = new WeakSet()	// WeakSet {[1, 2], [3, 4]}
> const obj = {}
> ws.add(obj)
> ws.has(obj)	// true
> ws.delete(obj)
> ```

### Map

```bash
## Map 数据结构
- `Map` 数据结构是为了**解决对象无法使用非字符串作为键**而提出的数据结构（即Map可使用各种类型的值作为键，包括对象也可作为键）
- `Map`本质上是一个二维数组，其中数组元素是只包含两个元素(键值对)的数组。

    - 设置键值对：`set(key, value)`
    - 获得值：`get(key)`
    - 删除键值对：`delete(key)`
    - 清空所有数据：`clear()`

    - 构造Map实例 `new Map(iterable)` 参数是 `iterable` 对象。
    - 由于 `entries()` 方法产生的形式与 Map 本身一样，所以可以用 Map实例当参数传入
```

```js
/**
 * 一般使用
 */
const map1 = new Map()
const map2 = new Map(map1.entries()) // 等价 let m3 = new Map(map1);
console.log(map2)

const x = { id: 1 }
const y = { id: 2 }
map1.set(x, 'foo')
map1.set(y, 'bar')

console.log(map1.has({ id: 1 }), map1.has(x)) // false true

const marr = [...map1]
console.log(marr) // [[{id: 1}, 'foo'], [{id: 2}, 'bar']]; 二维数组

const marr2 = [...map1.entries()] // 效果同上 [...map1]
console.log(marr2[0][1]) // 'foo'



/**
 * 迭代遍历
 */
const map3 = new Map([
  ['acc', 'abcd'],
  ['123', { x: '手机', y: '电脑' }],
  ['2 > 3', '不正确'],
])
console.log(map3) // Map { 'acc' => 'abcd', 123 => { x: '手机', y: '电脑' }, false => '不正确' }

// 可以直接使用数组的foreach遍历
map3.forEach((x) => {
  console.log(x)
})

// 遍历器
// 遍历器只能用for of来遍历
// .keys()指的是返回键名的遍历器
for (const s of map3.keys()) {
  console.log(s)
}
// .values()指的是返回键值的遍历器
for (const a of map3.values()) {
  console.log(a)
}
// .entries()指的是返回键值对的遍历器
for (const y of map3.entries()) {
  console.log(y)
}

```

#### Map和 Object 的区别

```bash
### Map 和 Object 的区别
1. Key 的类型：
对象（Object）的键必须是字符串或者Symbols。尽管当你使用非字符串作为键时，它会被转换为字符串。
Map可以使用任何类型作为键，包括对象、函数、原始类型。

2. 键的顺序：
对象（Object）在ES2015之前没有键的顺序保证；而在ES2015及之后，字符串键按照创建时的顺序排列，Symbol键则按照它们被添加到对象的顺序排列。
Map则会按照元素添加的顺序保持键值对的顺序。

3. 大小可追踪：
对象（Object）没有内建的方式来追踪有多少键值对存在。
Map有一个size属性，可以直接获取到Map中键值对的数量。

4. 性能：
对象（Object）在处理大量的键值对和频繁添加和删除键值对时，性能可能不如Map。
Map在频繁的添加和删除键值对的操作中通常提供更好的性能，特别是当涉及到大量的键值对时。

5. 易用性：
对象（Object）拥有字面量语法（{}），并且在JavaScript中被广泛使用。
Map则需要使用构造函数（new Map()）来创建。

6. 内建方法：
对象（Object）有一些内建的原型方法，但这些方法可能被对象的键覆盖。
Map提供了一套标准的方法来操作数据，例如get(), set(), has(), delete(), clear()，以及可以直接进行迭代的方法，例如keys(), values(), 和 entries()。

7. JSON支持：
对象（Object）可以直接被转换为JSON字符串，使用JSON.stringify()。
Map不支持直接转换为JSON，需要先转换为数组或者其他结构。

在实践中：
如果你需要保证键的顺序，或者你的键不仅仅是字符串或Symbol，那么Map可能是更好的选择。
如果你的数据结构相对简单，并且主要用于JSON序列化，那么对象可能更便捷。

```



### WeakMap

> - `WeakMap`是为了**解决频繁变动对象垃圾回收（GC）**而引入的Map弱引用数据结构。
>
> - `WeakMap`只接受对象作为键名(null 除外)。当对象只被`WeakMap`引用到而没被其他对象引用时，则会被垃圾回收机制回收并释放内存，相应的`WeakMap`这一键值对会被删除。
>
>   - 即把键重定义为`null`，会清除之前键的引用，可以释放该出的内存；
>     把值定义为`null`，只是清除值的引用，而键还在，所以不会被垃圾回收。
>
> - 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
>
> - 不能遍历，方法有 get、set、has、delete
>
> - （WeakMap的特点很适合给DOM对象关联一些信息存储在`WeakMap`中，DOM对象一旦被删除，则其内存会被回收，WeakMap的这一键值对会消失）
>
>   ```js
>   var m = new WeakMap();
>   var x = { id: 1 }, y = { id: 2 }, z = { id: 3 }, w = { id: 4 };
>   m.set(x, y);
>   m.set(z, w);
>   x = null; // {id: 1}不再由变量x引用，只有m才能引用，此时，{id: 1}会被垃圾回收，这一键值对会被删除；
>   w = null; // 尽管值{id: 4}也不再由w引用，但m对值的引用是强引用，所以{id: 4}不会被回收
>   ```
>
>   ```js
>   /**
>    * 使用DOM节点作为键名
>    * 每当发生click，就更新状态，并把这个状态作为键值放在WeakMap，对应键名就是这个节点对象
>    * 一旦这个DOM节点删除，该状态就会消失，不存在内存泄漏风险
>    */
>   let weakMap = new WeakMap();
>   weakMap.set(
>     document.getElementById('logo'),
>     { timesClicked: 0 }
>   );
>   document.getElementById('logo').addEventListener('click', function () {
>     let logoData = weakMap.get(document.getElementById('logo'));
>     logoData.timesClicked++;
>   }, false);
>   ```
>
>
>   /**
>    * 使用WeakMap 部署私有属性
>       */
>
>     const _counter = new WeakMap();
>     const _action = new WeakMap();
>
>   class Countdown {
>     constructor(counter, action) {
>       _counter.set(this, counter);
>       _action.set(this, action);
>     }
>     dec() {
>       let counter = _counter.get(this);
>       if (counter < 1) return;
>       counter--;
>       _counter.set(this, counter);
>       if (counter === 0) {
>         _action.get(this)();	// 当counter为0时，则执行action函数
>       }
>     }
>   }
>
>   const c = new Countdown(2, () => console.log("DONE"));
>   c.dec();
>   c.dec();
>   // DONE
>   ```
>
>   ```

### WeakRef

> - WeakRef对象用于直接创建对象的弱引用，基于原始对象创建的WeakRef实例不会妨碍原始对象被垃圾回收机制清除
> - `wr.deref()`方法可判断原始对象是否已被垃圾回收清除
> - 弱引用对象的用处是：作为缓存，未被清除时可以从缓存中取值，一旦清除缓存就自动失效
> - 注意：一旦使用`WeakRef()`创建了原始对象的弱引用，则在本轮事件循环`event loop`中，原始对象肯定不会被清除，只会在后面的事件循环才会被清除
>
> ```js
> /**
>  * target是原始對象
>  * 构造函数 WeakRef() 创建了一个基于 target的新对象wr
>  * wr属于对target的弱引用，不会被垃圾回收机制计入这个引用
>  * 即wr的引用不会妨碍原始对象target被垃圾回收机制清除
> */
> let targe = {};
> let wr = new WeakRef(target); // wr 和 target 是不一样的
> let obj = wr.deref();
> if(obj) { // target 未被垃圾回收机制清除
>   /* .... */
> }
>
>
> /**
>  * @ makeWeakCached() 用于建立一个缓存，缓存里面保存对原始文件的弱引用
>  */
> function makeWeakCached(files) {
>   const cache = new Map();
>   return key => {
>     const ref = cache.get(key);
>     if (ref) {
>       const cached = ref.deref();
>       if (cached !== undefined) return cached;
>     }
>
>     const fresh = files(key);
>     cache.set(key, new WeakMap(fresh));
>     return fresh;
>   }
> }
> const getImageCached = makeWeakCached(getImage);
> ```

### FinalizationRegistry

> - 清理器注册表功能`FinalizationRegistry`用来指定目标对象被垃圾回收机制清除后，所要执行的回调函数
> - 注意：注册表不对目标对象构成强引用，属于弱引用。因为强引用的话，原始对象就不会被垃圾回收机制清除，这就失去使用注册表的意义
> - 回调函数的参数`heldValue`可以是任意类型的值，字符串、数值、布尔值、对象，甚至可以是`undefined`
> - 若想取消已经注册的回调函数，则要向`register()`传入第三个参数，作为标记值，这个标记值必须是对象，一般都用原始对象。然后再使用注册表实例对象的`unregister()`方法取消注册。
>   - 第三个参数也属于弱引用，如果没有这个参数，则回调函数无法取消
>   - 由于回调函数被调用以后就不再存在于注册表之中，所以执行`unregister()`应该是在回调函数还没被调用之前。
>
> ```js
> /**
>  * 新建一个注册表实例
>  * @FinalizationRegistry 是系统提供的构造函数；
>  * @callBack 回调函数作为该构造函数参数传入，它本身有一个参数 heldValue
>  * @return 返回一个清理器注册表实例，里面登记了索要执行的回调函数
> */
> const registry = new FinalizationRegistry(heldValue => {
>   // ....
> });
>
> /**
>  * @registry 注册表实例的registry 方法，来用注册索要观察的目标对象
>  * theObject是索要观察的目标对象，一旦该对象被垃圾回收机制清除，注册表就会在清除完成后，调用早前注册表的回调函数，并将`some value`作为参数传入回调函数
> */
> registry.register(theObject, "some value");
>
> // 第三个参数用于取消已注册的回调函数
> registry.register(theObject, "some value", theObject);
> // ...其他操作
>
> // ...过了一段时间，如果你不再关心 theObject
> registry.unregister(theObject);
> ```
>
> #### 【典例】缓存函数
>
> ```js
> /**
>  * 缓存函数
>  * 增加一个清理器注册表，一旦缓存的原始对象被垃圾回收机制清除，会自动执行一个回调函数
>  * 该回调函数会清除缓存里面已经失效的键
> */
> function makeWeakCached(files) {
>   const cache = new Map();
>   const cleanup = new FinalizationRegistry(key => {
>     const ref = cache.get(key);
>     if (ref && !ref.deref()) cached.delete(key);
>   });
>
>   return key => {
>     const ref = cache.get(key);
>     if (ref) {
>       const cached = ref.deref();
>       if (cached !== undefined) return cached;
>     }
>
>     const fresh = files(key);
>     cache.set(key, new WeakMap(fresh));
>     cleanup.register(fresh, key);
>     return fresh;
>   }
> }
>
> const getImageCached = makeWeakCached(getImage);
> ```

## 高阶函数

- 高阶函数是对其他函数进行操作的函数，它接受函数作为参数或将函数作为返回值输出。
- 函数也是一种数据类型，可作为参数传递给另一个参数使用。如：回调函数。

```html
<div style="width: 200px;height: 200px;position: absolute;background-color: pink;"></div>

<script src="../lib/jquery-3.2.1.js"></script>
<script>
function fn(a, b, callback) {
    console.log(a + b);
    callback && callback();
}
fn(1, 2, function() {
    console.log("我是最后调用的");
});
$("div").animate({left: 500}, function(){
    $("div").css("background","purple");
})
```



## 象征属性 Symbol

```bash
## 象征属性 Symbol
只有两种原始类型可以用作对象属性键：
	1. 字符串类型（数字会被自动转换为字符串）
	2. Symbol 类型


- symbol 是一种基本数据类型，`Symbol()` 函数会返回 symbol 类型的值，该类型具有静态属性和静态方法。
    - 它的静态属性会暴露几个内建的成员对象。
    - 它的静态方法会保护全局的 symbol 注册，且类似内建对象类，但因为不支持 `new Symbol()`，所以作为构造函数它并不完整。
- 每个从 `Symbol()` 返回的 symbol 值都是唯一的。即使创建许多具有相同描述的 symbol，它们的值也是不同。描述只是一个标签，不影响任何东西。
- 一个 symbol 值能表示对象属性的标识符 (该数据类型仅有的目的)。


### symbol 的特点
  - Symbol属性值唯一，避免了常量值重复问题
  - Symbol不能与其他类型的值进行运算
  - Symbol可以转换为字符串和布尔值，但不能转为数字
  - for in、for of 遍历时不会遍历Symbol属性。
注意：Symbol是函数，但并不是构造函数


### symbol 不会自动转换为字符串
JS 中的大多数值都支持字符串的隐式转换，但 symbol 不会被自动转换。
这是一种防止混乱的“语言保护”，因为字符串和 symbol 有本质上的区别，不应该意外地将它们转换成另一个。
显示一个 symbol 值的方法：
	1. 通过 `Symbol('symbol定义的值').toString()` 转换。
	2. 通过获取 `symbol.desciption` 属性，只显示描述。

```


```js
let s1 = Symbol('foo');
let s2 = Symbol('foo');
console.log(s1 == s2); // false
console.log(s1.toString() == s2.toString());  // true
```

#### 隐藏属性

> symbol 允许创建对象的隐藏属性，代码的任何其他部分都不能意外访问或重写这些属性。
>
> ```js
> // 属于另一个代码库
> const user = {name: 'Willy'}
>
> // 添加标识符
> const flag = Symbol('flag')
> user[flag] = 'Their flag value'
>
> // 定义变量
> const id = Symbol('id')
> user[id] = 1
>
> console.log(user[id]) // 可以使用 symbol 作为键来访问数据
>
> ```
>
> 在上述代码中，由于 `user` 对象属于另一个代码库，所以向它添加字段是不安全的，因为我们可能会影响代码库中的其他预定义行为。但 symbol 属性不会被意外访问到。第三方代码不会知道新定义的 symbol，因此将 symbol 添加到 `user` 对象是安全的。
>
> 另外，假设另一个脚本希望在 `user` 中有自己的标识符，以实现自己的目的。
>
> - 使用 symbol 作为标识符，标识符与标识符之前不会冲突，因为 symbol 总是不同的，即使它们有相同的名字。
> - 但如果使用字符串`flag`而不是用 symbol，就会出现冲突，后者会覆盖前者的内容。

#### 避免值重复

```js
const KEY = {
  alibaba: Symbol(),
  baidu: Symbol(),
  tencent: Symbol()
}
function getValue(key) {
  switch (key) {
    case KEY.alibaba:
      console.log('alibaba')
    case KEY.baidu:
      console.log('baidu')
    case KYEY.tencent:
      console.log('tencent')
  }
}
getValue(KEY.baidu);
```

#### 实例：消除魔术字符串

魔术字符串是指在代码中多次出现，与代码形成强耦合的某一字符串或数值，不利于将来的修改和维护。
消除魔术字符串 常用的是方法是把他**设置为一个变量**。

```js
const evening = Symbol('星期一');	// 给常用的字符串 定义为变量
function getEating(today, option) {
  let food = "tomato";
  switch (today) {
    case evening:
      food = option;
      break;
  }
  return food;
}
console.log(getEating(evening, "noodles"));
```

#### 可迭代对象

- 拥有`Symbol.iterator`函数的对象被称为可迭代对象，即可以在对象中使用`for..of`循环
- `symbol`让对象的内部数据和用户数据隔离。由于`sysmbol`无法在 JSON 里表示，因此不用担心给 Express API 传入带有不合适的`Symbol.iterator`属性的数据。另外，对于那种混合了内置函数和用户数据的对象，可以用`symbol`来确保用户数据不会跟内置属性冲突。

```js
const fibonacci = {
  [Symbol.iterator]: function* () {
    let a = 1, b = 1;
    while (true) {
      [a, b] = [a+b, a]
      yield b;
    }
  }
};

// Prints every Fibonacci number less than 100
let a = [];
for (const x of fibonacci) {
  if (x >= 100) { break; }
  a = [...a, x];
}
console.log(a);
```

```js
class MyClass {
  constructor(obj) {
    Object.assign(this, obj);
  }

  iterator() {
    const keys = Object.keys(this);
    let i = 0;
    return (function* () {
      if (i >= keys.length) {
        return;
      }
      yield keys[i++];
    })();
  }
}
const obj = new MyClass({ iterator: 'not a function' });
console.log(obj.iterator());
```

- `MyClass` 的实例是可迭代对象，可以遍历对象上面的属性。但是上面的类有个潜在的缺陷，假设有个恶意用户给 `MyClass` 构造函数传了一个带有`iterator`属性的对象。当在实例上使用`for/of`会抛出`TypeError: obj is not iterable`异常。可以看出传入对象的 `iterator`函数覆盖了类的 `iterator`属性。会产生类似原型污染的安全问题，无脑复制用户数据会对一些特殊属性，比如`__proto__`和`constructor`带来问题。

####  复用同一个Symbol值：for/keyFor

- **`Symbol.for(key)`** 方法会根据给定的键 `key`来从运行时的 symbol 注册表中找到对应的 symbol，如果找到则返回它；否则，新建一个与该键关联的 symbol，并放入全局 symbol 注册表中。

- **`Symbol.keyFor(key)`**方法返回一个已登记的 Symbol 类型值的`key`。

- > 注意：为了防范冲突，最好给要放入 symbol 注册表中的 symbol 带上键前缀。
  > for与keyfor的区别：前者会被登记在全局环境中供搜索，后者不会。

```js
let a = Symbol.for("foo"); // 创建一个 symbol 并放入 symbol 注册表中，键为 "foo"
let b = Symbol.for("foo"); // 从 symbol 注册表中读取键为"foo"的 symbol
console.log(a == b);	// true
Symbol.for("mdn.foo");	// 给加入键前缀 mdn.

Symbol.keyFor(s1) // "foo"
Symbol.keyFor(s2) // undefined
```



#### 实例：模块的 Singleton 模式

Singleton模块指的是调用一个类，任何时候返回的都是同一个实例。

```js
// a.js
const NAME_KEY = Symbol.for('name');	// 如果键名使用Symbol方法生成，那么外部将无法引用这个值，导致也就无法改写name的值。
function A() {
    this.name = "willy";
}
if(!global[NAME_KEY]) {
    global[NAME_KEY] = new A();
}
module.exports = global[NAME_KEY];


// b.js
global[Symbol.for('name')] = { name: 'xili' };	// 调用时，更改a.js里面定义的name属性
const a = require('./a.js');
console.log(a)	// { name: 'xili' }
```



#### Symbol.prototype.description

> 当我们在 JS 中创建一个 `Symbol` 时，可以指定一个描述，用于以后的调试。取回这个描述的过程有点乏味。我们必须重新构造 `Symbol`，并借助 `toString()` 方法访问描述。
>
> ES10 添加了一个名为 `description` 的新只读属性，该属性返回 `Symbol` 的描述。
>
> ```js
> const symbol = Symbol('This is a Symbol')
> console.log(symbol.toString()) // Symbol(This is a Symbol)
> console.log(symbol.description) // This is a Symbol
> ```
>



## 迭代器 Iterator

- `String、Array、TypeArray、Map、Set`都是内置可迭代对象，因为它们原型对象都拥有`Symbol.iterator`方法。
- 用于可迭代对象的语法：`for..of`循环、展开语法(三点)、`yield*(生成器的yield多次返回值)`和解构对象。

```js
/* Array */
let arr = ['a', 'b', 'c'];
let arr1 = arr[Symbol.iterator]();
console.log(arr1.next().value, arr1.next().value, arr1.next().value, arr1.next().value);

/* Map数据机构 */
const map = new Map();
map.set('a', 'willy');
map.set('c', 'cilly');


// 通过 for...of 循环迭代
const iterator1 = map[Symbol.iterator]();
for (let item of iterator1) {
  console.log("for..of循环迭代：" + item);
}

// 通过展开语法 三点运算符 来迭代
const iterator2 = map[Symbol.iterator]();
console.log(...iterator2);

// 通过生成器 yield* 多次返回来迭代
const iterator3 = map[Symbol.iterator]();
function* gen() {
  yield* iterator3;
}
console.log(gen().next(), gen().next(), gen().next());

/* 控制台输出
a b c undefined
for..of循环迭代：a,willy
for..of循环迭代：c,cilly
[ 'a', 'willy' ] [ 'c', 'cilly' ]
{ value: [ 'a', 'willy' ], done: false } { value: [ 'c', 'cilly' ], done: false } { value: undefined, done: true } */
```



### Iterable object（可迭代对象）

可迭代（Iterable）对象是数组的泛化。这个概念是说任何对象都可以被定制为可在 `for...of` 循环中使用的对象。

不仅数组是可迭代的，很多其他内建对象也是可迭代的，如字符串。

#### Symbol.iterator

为了让对象可迭代（即让 `for...of` 可正常执行），需要为对象添加一个名为 `Symbol.iterator` 的方法（一个专门用于使对象可迭代的内建 symbol）

1. 当 `for...of` 循环启动时，它会调用这个方法（如果没有找到，就会报错）。这个方法必须返回一个迭代器（Iterator）——一个又 `next` 方法的对象。
2. 从此开始，`for...of` 仅适用于这个被返回的对象。
3. 当 `for...of` 循环希望取得下一个数值，它就调用这个对象的 `next()` 方法。
4. `next()` 方法返回的格式必须是 `{done:Boolean,value:any}`， 当 `done=true` 时表示循环结束，否则 `value` 是下一个值。

```js
const range = {
  from: 1,
  to: 5,

  // 1. for..of 调用首先会调用这个：
  [Symbol.iterator]() {
    // ……它返回迭代器对象（iterator object）：
    // 2. 接下来，for..of 仅与下面的迭代器对象一起工作，要求它提供下一个值
    return {
      current: this.from,
      last: this.to,

      // 3. next() 在 for..of 的每一轮循环迭代中被调用
      next() {
        // 4. 它将会返回 {done:.., value :...} 格式的对象
        if (this.current <= this.last) {
          return { done: false, value: this.current++ }
        } else {
          return { done: true }
        }
      },
    }
  },
}

for (const num of range) {
  console.log(num) // 1, 然后是 2, 3, 4, 5
}
```



#### 显示调用迭代器

```js
const str = 'Hello'

for (const char of str) console.log(char)

// 直接获取内置的迭代器来进行遍历（等价于上面的 for...of）
const iterator = str[Symbol.iterator]()
while (true) {
  const result = iterator.next()
  if (result.done) break
  console.log(result.value) // // 一个接一个地输出字符
}

```



## 生成器 generator

- generator 生成器是ES6引入的新数据类型，**可返回多次值**。
- generator 与一般函数的区别
    - 一般函数在执行过程中，如果没有遇到`return `语句(函数末尾如果没有`return`，默认为`return undefined;`)，控制权无法返回被调用的代码。
    - generator与一般函数不同的是，generator由`function*`定义，并且除了`return`语句，还可用`yield`返回多次。
- `yield*`表达式用于委托给另一个generator或可迭代对象。其表达式本身的值是当迭代器关闭时返回值(即done为true时)
- 调用一个生成器函数并不会马上执行它里面的语句，而是返回一个这个生成器的迭代器对象，当这个迭代器的`next()` 方法被调用时，其内的语句会执行到出现 `yield` 的位置为止（让执行处于**暂停状态**），`yield` 后紧跟迭代器要返回的值。或者如果用的是 `yield*`，则表示将执行权移交给另一个生成器函数（当前生成器**暂停执行**），调用 `next()`方法时如果传入参数，则此参数会作为**上一条执行的 `yield` 语句的返回值**
- 调用 generator 对象由两个方法：
    1. 不断地调用generator对象的`next()`方法。
        `next()`方法会执行generator的代码，然后每次遇到`yield x;`就返回一个对象`{value:x, done:true/false}`，然后“暂停”。返回的`value`就是`yield`的返回值，`done`表示这个generator是否已经执行结束；如果`done`为`true`，则`value`就是`return`的返回值。
    2. 用`for...of`循环迭代 generator 对象，这种方式不需要判断`done`
- generator应用场景
    1. 每次返回一个值：在同一场合下，函数只能返回一次，所以必须返回一个`Array`；但是换成generator，就**可以一次返回一个数，不断返回多次**。
    2. 用一个对象来保存状态：因为generator可以在执行过程中多次返回，所以它就像一个可记住执行状态的函数。
    3. 可把ajax的异步回调变成同步式ajax，优化了传统的 then式产生的回调地狱

```js
function* another() {
  yield 'willy';
}
function* gen() {
  yield* another();
  const a = yield 'hello';
  const b = yield a + 1;
  yield b;
  return "return"
}
const g = gen();
let
  a = g.next().value, // another()中返回的值
  b = g.next().value, //
  c = g.next('world').value, // 把语句 yield a+1 中的值
  d = g.next('!').value,  // 把语句 yield b 中的值替换为 !
  e = g.next().value, // return返回的值
  f = g.next().value; // 超出界限
console.log([a, b, c, d, e, f]);  // [ 'willy', 'hello', 'world1', '!', 'return', undefined ]
```

```js
/* 普通函数 */
function fib(max) {
  let a = 0, b = 1, arr = [0, 1,];
  while (arr.length < max) {
    [a, b] = [b, a + b];
    arr.push(b);
  }
  return arr;
}
console.log(fib(5));    // [ 0, 1, 1, 2, 3 ]


/* 生成器 */
function* fibGenerator(max) {
  let a = 0, b = 1, n = 0;
  while (n < max) {
    yield a;
    [a, b] = [b, a + b];
    n++;
  }
  return '最后return的值';
}
// next()方法循环迭代generator
let f = fibGenerator(5);
let f1 = f.next().value, f2 = f.next().value, f3 = f.next().value;
let f4 = f.next().value, f5 = f.next().value, f6 = f.next().value;
console.log("next()", [f1, f2, f3, f4, f5, f6]); // next() [ 0, 1, 1, 2, 3, '最后return的值' ]


// for...of 循环迭代generator
let ff = fibGenerator(5), ffResult = [];
for (let x of ff) {
  // console.log(x);
  ffResult = [...ffResult, x];
}
console.log("for...of：", ffResult);  // for...of： [ 0, 1, 1, 2, 3 ]


// while 循环迭代generator
let fff = fibGenerator(5);
let res = fff.next(), result = [];
while (!res.done) {
  result = [...result, res.value];
  res = fff.next();
}
console.log("while", result);  // while [ 0, 1, 1, 2, 3 ]


// 用generator 生成同步式ajax，相对传统的 then，优化了回调地狱
/* try {
  r1 = yield ajax('http://url-1', data1);
  r2 = yield ajax('http://url-2', data2);
  r3 = yield ajax('http://url-3', data3);
  success(r3);
} catch (err) {
  handle(err);
} */
```



### 使用 generator 进行迭代

**使用 Iteable**

```js
let range = {
  from: 1,
  to: 5,

  // for..of range 在一开始就调用一次这个方法
  [Symbol.iterator]() {
    // ...它返回 iterator object：
    // 后续的操作中，for..of 将只针对这个对象，并使用 next() 向它请求下一个值
    return {
      current: this.from,
      last: this.to,

      // for..of 循环在每次迭代时都会调用 next()
      next() {
        // 它应该以对象 {done:.., value :...} 的形式返回值
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

// 迭代整个 range 对象，返回从 `range.from` 到 `range.to` 范围的所有数字
alert([...range]); // 1,2,3,4,5
```

**使用generator进行迭代**

```js
let range = {
  from: 1,
  to: 5,

  // [Symbol.iterator]: function*() 的简写形式
  *[Symbol.iterator]() {
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

alert( [...range] ); // 1,2,3,4,5
```



### generator 组合

generator 组合（composition）是 generator 的一个特殊功能，它允许透明地（transparently）将 generator 彼此“嵌入（embed）”到一起。

**例：有一个生成数字序列的函数**

```js
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {
  // 0..9
  // yield* generateSequence(48, 57);
  for (let i = 48; i <= 57; i++) yield i;

  // A..Z
  // yield* generateSequence(65, 90);
  for (let i = 48; i <= 57; i++) yield i;

  // a..z
  // yield* generateSequence(97, 122);
  for (let i = 97; i <= 122; i++) yield i;
}

let str = '';
for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}
alert(str); // 0..9A..Za..z
```



###  `yield` 是一条双向路

`yield` 是一条双向路（two-way street）：它不仅可以向外返回结果，而且还可以将外部的值传递到 generator 内。

调用 `generator.next(arg)`，我们就能将参数 `arg` 传递到 generator 内部。这个 `arg` 参数会变成 `yield` 的结果。

```js
function* gen() {
  // 向外部代码传递一个问题并等待答案
  let result = yield "2 + 2 = ?"; // (*)

  alert(result);
}

let generator = gen();

let question = generator.next().value; // <-- yield 返回的 value

generator.next(4); // --> 将结果传递到 generator 中
```





## 代理对象 Proxy

```bash
### 代理对象 Proxy
- `Proxy`用于修改某些操作的默认行为，等同于对编程语言进行编程做出修改，所以属于一种“元编程”。
- Proxy给目标对象设置一层“拦截”，外界对该对象的访问必须通过这层拦截，可对外界的访问进行过滤和改写等自定义操作（代理完成对数据的处理、对构造函数的处理，对数据的验证）


### 反射 Reflect
  - `Reflect`是一个内置对象，它提供拦截`JavaScript`操作的方法。这些方法与`Proxy handlers`的方法相同
  - `Reflect`不是一个函数对象，因此它是不可构造的，所以不能通过`new`来对其进行调用，或作为一个函数来调用。
  - `Reflect`的所有属性和方法都是静态的



 let p = new Proxy(target, handler);
	- 代理实例中没有指定的`handler`，实际就是操作原对象`target`。
	- `target`：需要使用`Proxy`包装的目标对象（可以是任何类型的对象，包括原生数组、函数、甚至是另一个代理）
	- `handler`：代理配置：带有“捕捉器”（“traps”，即拦截操作的方法）的对象。其属性是当执行一个操作时定义代理的行为函数（可理解为某种触发器）
```

```js
/**
	* 同一拦截函数，设置拦截多个操作
*/
var handler = {
  get: function(target, propKey) {
    if (propKey === 'prototype')  return Object.prototype;
    if (propKey in target) return target[propKey];
    throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
froxy.foo === "foo" // true
```



#### 拦截方法

| 内部方法                | Handler 方法               | 何时触发                                                     |
| :---------------------- | :------------------------- | :----------------------------------------------------------- |
| `[[Get]]`               | `get`                      | 读取属性                                                     |
| `[[Set]]`               | `set`                      | 写入属性                                                     |
| `[[HasProperty]]`       | `has`                      | `in` 操作符                                                  |
| `[[Delete]]`            | `deleteProperty`           | `delete` 操作符                                              |
| `[[Call]]`              | `apply`                    | 函数调用                                                     |
| `[[Construct]]`         | `construct`                | `new` 操作符                                                 |
| `[[GetPrototypeOf]]`    | `getPrototypeOf`           | [Object.getPrototypeOf](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) |
| `[[SetPrototypeOf]]`    | `setPrototypeOf`           | [Object.setPrototypeOf](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) |
| `[[IsExtensible]]`      | `isExtensible`             | [Object.isExtensible](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible) |
| `[[PreventExtensions]]` | `preventExtensions`        | [Object.preventExtensions](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions) |
| `[[DefineOwnProperty]]` | `defineProperty`           | [Object.defineProperty](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty), [Object.defineProperties](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) |
| `[[GetOwnProperty]]`    | `getOwnPropertyDescriptor` | [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor), `for..in`, `Object.keys/values/entries` |
| `[[OwnPropertyKeys]]`   | `ownKeys`                  | [Object.getOwnPropertyNames](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames), [Object.getOwnPropertySymbols](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols), `for..in`, `Object.keys/values/entries` |

其中大多数用于返回值：

- `[[Set]]` 如果值已成功写入，则必须返回 `true`，否则返回 `false`。
- `[[Delete]]` 如果已成功删除该值，则必须返回 `true`，否则返回 `false`。
- ……

#### get 方法

> - `get(目标对象, 属性名, proxy实例本身[可选])`方法用于拦截某个属性的读取操作
>
> ```js
> let numbers = [0, 1, 2];
> 
> numbers = new Proxy(numbers, {
>   get(target, prop) {
>     if (prop in target) {
>       return target[prop];
>     } else {
>       return 0; // 默认值
>     }
>   }
> });
> 
> alert( numbers[1] ); // 1
> alert( numbers[123] ); // 0（没有这个数组项）
> ```
>

#### 可撤销 Proxy

一个 **可撤销** 的代理是可以被禁用的代理。

假设有一个资源，并且想随时关闭对该资源的访问。可以做的是将它包装成可一个撤销的代理，没有任何捕捉器。这样的代理会将操作转发给对象，并且我们可以随时将其禁用。

语法为：`let` `{`proxy`,` revoke`}` `=` Proxy`.``revocable``(`target`,` handler`)`

```js
let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

// 将 proxy 传递到其他某处，而不是对象...
alert(proxy.data); // Valuable data

// 稍后，在我们的代码中
revoke();

// proxy 不再工作（revoked）
alert(proxy.data); // Error
```



## 承诺对象 Promise

> ```bash
> ## 承诺对象 Promise
> - Promise 是异步编程的一种解决方案，表示 '承诺' 无法改变。
> - 一般处理异步事件时，使用`Promise`对这个异步操作进行封装（如网络请求）
>   - 封装一个网络请求函数，因不能立即拿到结果，所以往往会传入另一个函数，在数据请求成功时，将数据通过传入的函数回调出去（网络请求复杂，会耗时过长）
> - new：构造函数（1.保存一些状态信息；2.执行传入的函数）
>
>
>
> ### Promise 的状态
> 1. Promise 对象代表异步操作，有三种状态，且不受外界影响:
> 		- pending: 等待状态，在等响应跳转。
> 		- resolved/fulfilled: 满足状态，当我们主动回调resolve时处于该状态，并且会回调`.then()`。
> 		- rejected: 拒绝状态，当我们主动回调了reject时处于该状态，并且会回调`.catch()`。
> 	注意：只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
>
> 2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果(不可逆)
>   Promise 对象的状态改变只有两种可能：从 Pending 变为 Resolved 和从 Pending 变为 Rejected。
>   只要这两种情况发生，状态就凝固(一直保持这个结果，不再改变)。
>   就算改变已经发生，再对 Promise 对象添加回调函数，也会立即得到这个结果。
>   这与事件（Event）完全不同的是如果错过了该事件再去监听，是得不到结果的。
>
>
>
> ### Promise 优缺点
> - 优点：
> 		- 一旦状态改变，就不会再变，之后的任何时候都可以得到和这个结果。
> 		- Promise 对象提供统一的接口，可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数(解决了回调地狱问题)
>
> - 缺点：
>    - 无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
>    - 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
>    - 当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）
>
>
>
> ### Promise 和 setTimeout 的区别
> Promise 是微任务，setTimeout 是宏任务，同一个事件循环中，promise.then总是先于 setTimeout 执行。
>
> ```

### Promise创建

- 当 new Promise()执行之后，promise 对象的状态会被初始化为`pending`状态。`new Promise()`括号里的内容是同步执行的。括号里可以再定义一个 异步任务的 function

- Promise 构造函数包含一个参数和一个带有 resolve（解析）和 reject（拒绝）两个参数的回调。
  在回调中执行一些操作（如异步），如果一切都正常，则调用 resolve，否则调用 reject。

```js
new Promise((resolve, reject) => {
  //在执行传入的回调函数时，会传入两个参数resolve, reject，本身又是函数
  setTimeout((data) => {
    resolve(data)
  }, 1000)
}).then((data) => {	// 立即回调
  //执行成功后处理的代码 resolve处理
  console.log(data);
}).catch(err => {
  //捕获抛出异常 reject处理
  console.log(err)
})
```

### 链式操作 then

> ```js
> new Promise((resolve, reject) => {
>   setTimeout(() => {
>     resolve('a')
>   }, 1000)
> }).then(res => {
>   console.log(res)
>   return Promise.resolve(res + '111')
>   // return Promise.reject('error message（返回异常）');
>   // throw "error message（抛出异常）";
> }).then(res => {
>   console.log(res)
>   return Promise.resolve(res + '222')
> }).then(res => {
>   console.log(res)
> }).catch(err => {
>   console.log(err)
> })
> // 输出 a a111 a111222
> ```
>
> #### 长链式调用
>
> ```js
> new Promise((resolve, reject) => {
>     setTimeout(() => {
>        resolve('Hello World')
>     }, 1000)
> }).then(res => {
>     console.log(res + 'start')
>     return res + '111'
> }).then(res => {
>     console.log(res)
>     return res + '222'
> }).then(res => {
>     console.log(res)
>     return Promise.reject(res + 'error')
> }).then(res => {
>     // 此部分不执行，所以不输出
>     console.log(res)
>     return res + '333'
> }).catch(err => {
>     console.log(err)
>     return err + '4 44'
> }).then(res => {
>     console.log(res + 'end');
> })
>
> /* Hello Worldstart
> Hello World111
> Hello World111222
> Hello World111222error
> Hello World111222error444end */
> ```

### 最终执行 finally

> ```bash
> ## 最终执行 Promise.prototype.finally()
> - finally() 方法无论 Promise 实例最终成功还是失败都会执行。
> - finally() 函数不接受参数，finally 内部通常不知道 Promise 实例的执行结果，所以通常在 finally() 方法内执行的是与 Promise 状态无关的操作。
> - 不管成功还是失败，都会走到finally中,并且finally之后，还可以继续then。并且会将值原封不动的传递给后面的then。
> ```
>
> ```js
> const promise = new Promise((resolve, reject) => {
>   setTimeout(() => {
>     resolve('res')
>   }, 1000)
> })
> promise
>   .then((res) => console.log('success', res))
>   .catch(() => console.log('fail'))
>   .finally(() => console.log('finally'))
> /* 输出： success, res, finally */
> ```
>
> ### `Promise.prototype.finally()` 的实现
>
> ```js
> Promise.prototype.finally = function (callback) {
>   return this.then((value) => {
>     return Promise.resolve(callback()).then(() => {
>       return value
>     })
>   }, (err) => {
>     return Promise.resolve(callback()).then(() => {
>       throw err
>     })
>   })
> }
> ```

### Promise.all

> ```bash
> ## Promise.all()
> `Promsie.all([p1, p2, p3])`：并发处理多个异步任务，所有任务都执行成功，才算成功（才会走到 then）；只要有一个任务失败，就会马上走到 catch，整体都算失败。
> - 传递的参数是多个 promise 实例组成的数组。
> ```
>
> ```js
> Promise.all([
>   new Promise((resolve, reject) => {
>     setTimeout(() => {
>       resolve({ name: "willy", age: 11 })
>     }, 2000)
>   }),
>   new Promise((resolve, reject) => {
>     setTimeout(() => {
>       resolve({ name: 'william', age: 22 })
>     }, 3000)
>   })
> ]).then(results => {
>   // console.log(results[0], results[1]);
>   console.log(results); // [{name: 'willy', age: 11}, {name: 'william', age: 22}]
> })
> ```
>
> ### Promise.all() 的实现
>
> ```bash
> ## Promise.all() 的实现
> 1. 如果传入的参数是一个空的可迭代对象，那么此promise对象回调完成(resolve)，只有此情况，是同步执行的，其它都是异步返回的。
> 2. 如果传入的参数不包含任何 promise，则返回一个异步完成。 promises 中所有的promise都“完成”时或参数中不包含 promise 时回调完成。
> 3. 如果参数中有一个promise失败，那么Promise.all返回的promise对象失败。
> 4. 在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个数组。
> ```
>
> ```js
> Promise.all = function (promises) {
>   return new Promise((resolve, reject) => {
>     let index = 0;
>     let result = [];
>     if (promises.length === 0) {
>       resolve(result);
>     } else {
>       function processValue(i, data) {
>         result[i] = data;
>         if (++index === promises.length) {
>           resolve(result);
>         }
>       }
>       for (let i = 0; i < promises.length; i++) {
>         // promises[i] 可能是普通值
>         Promise.resolve(promises[i]).then((data) => {
>           processValue(i, data);
>         }, (err) => {
>           reject(err);
>           return;
>         });
>       }
>     }
>   });
> }
> ```

### Promise.race

- `Promise.race([p1, p2, p3])`：并发处理多个异步任务，**返回的是第一个执行完成的 promise**，且状态和第一个完成的任务状态保持一致。参数里传的是多个 promise 实例组成的数组。
- 只要有一个异步任务执行完成，整体就是完成的
- 通常在http请求时，做超时判断时可以这样使用，设置一个定时器，当定时器时间到了时就在UI上提醒请求超时

```js
const promise1 = new Promise((resolve, reject) => { setTimeout(resolve, 500, 'promise 1 resolved') })
const promise2 = new Promise((resolve, reject) => { setTimeout(reject, 100, 'promise 2 rejected') })
const promise3 = new Promise((resolve, reject) => { setTimeout(resolve, 200, 'promise 3 resolved') })
(async () => {
  try {
    const result = await Promise.race([promise1, promise2, promise3]);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
})()
// 输出- "promise 2 rejected"
// 尽管promise1和promise3可以解决，但promise2拒绝的速度比它们快。
// 因此Promise.race方法将以promise2拒绝
```

```js
Promise.all([]).then((res) => {
  console.log('all');
});
Promise.race([]).then((res) => {
  console.log('race');
});
/*  all会输出，race不会输出 */
```

### Promise.any 和 AggregateError

> ```bash
> ## Promise.any() 与 AggregateError
> - Promise.any() 接收一个 Promise 可迭代对象(如数组)，只要其中一个 Promise 成功，就返回那个已经成功的 Promise
>
> - 如果传入的可迭代对象中的所有 Promise 都失败，将返回一个包含所有拒绝值的 `AggregateError` 实例。它是 Error 的一个子类，用于把单一的错误集合在一起。
>
> - 只要一个成功就返回成功，如果所有的都失败才会报错；
> - 如果 Promise.any 接收的是一个非 promise 数组，则返回成功。
> ```
>
> ````js
> const promise1 = new Promise((resolve, reject) => { setTimeout(reject, 100, 'promise 1 rejected') })
> const promise2 = new Promise((resolve, reject) => { setTimeout(resolve, 400, 'promise 2 resolved at 400 ms') })
> const promise3 = new Promise((resolve, reject) => { setTimeout(resolve, 700, 'promise 3 resolved at 800 ms') })
> (async () => {
>   try {
>     const value = await Promise.any([promise1, promise2, promise3])
>     console.log(value)
>   } catch (error) {
>     console.log(error)
>   }
> })()
> //Output - "promise 2 resolved at 400 ms"
> ````
>
> ```js
> // 示例伪代码
> /* 返回成功的 */
> const promises1 = [
>   Promise.reject('ERROR A'),
>   Promise.reject('ERROR B'),
>   Promise.resolve('result'),
> ]
>
> Promise.any(promises1).then((value) => {
>   console.log('value: ', value)
> }).catch((err) => {
>   console.log('err: ', err)
> })
> // 输出结果：value:  result
>
> /* 传入的所有Promises都失败 */
> const promises2 = [
>   Promise.reject('ERROR A'),
>   Promise.reject('ERROR B'),
>   Promise.reject('ERROR C'),
> ]
> Promise.any(promises2).then((value) => {
>   console.log('value：', value)
> }).catch((err) => {
>   console.log('err：', err)
>   console.log(err.message)
>   console.log(err.name)
>   console.log(err.errors)
> })
> /* err：AggregateError: All promises were rejected
> All promises were rejected
> AggregateError
> ["ERROR A", "ERROR B", "ERROR C"] */
> ```
>

### Promise.all、race、any的区别

- Promise.any();有一个子实例成功就算成功，全部子实例失败才算失败；
- Promise.all()；全部子实例的成功才算成功，一个子实例失败就算失败；
- Promise.race()；rece是赛跑机制，看最先的promise子实例是成功还是失败。

### Promise.allSettled

> - 当所有给定的 Promise 都得到解决时返回（`resolved` 或 `rejected`，无关紧要）。
>
> ```js
> const sleep = (sm) => new Promise((resolve) => setTimeout(() => resolve(sm), sm))
> const err = (ms) => sleep(ms).then(() => Promise.reject(ms))
>
> Promise.allSettled([1, 2, 3]).then(console.log)
> Promise.allSettled([sleep(300), sleep(100), sleep(200)]).then(console.log)
> Promise.allSettled([sleep(3000), err(100), sleep(2000)]).then(console.log)
> Promise.allSettled([err(50), err(60)]).then(console.log)
> ```

### Promise封装Ajax

> ```js
> function ajax(URL) {
>   return new Promise(function (resolve, reject) {
>     const req = new XMLHttpRequest();
>     req.open('GET', URL, true);
>     req.send();
>     req.onload = function () {
>       if (req.status === 200) {
>         resolve(req.responseText);
>       } else {
>         reject(new Error(req.statusText));
>       }
>     };
>
>     req.onerror = function () {
>       reject(new Error(req.statusText));
>     };
>   });
> }
>
> // 返回的还是一个 Promise对象，所以需要用then/catch
> ajax("./test.php")
>   .then(function onFulfilled(value) {
>     document.write('内容是：' + value);
>   }).catch(function onRejected(error) {
>     document.write('错误：' + error);
>   });
> ```

### 回调函数的缺点

> - 回调的写法比较直观，不需要 return，层层嵌套即可
> - 如果多个异步函数存在依赖关系（需要等前一个异步函数执行完成后，才能执行下一个异步函数），就需要多个异步函数进⾏层层嵌套，会导致**回调地狱**的问题。
>
> #### 定时器的回调地狱
>
> ```js
> setTimeout(function () {
>     console.log('qiangu1');
>     setTimeout(function () {
>         console.log('qiangu2');
>         setTimeout(function () {
>             console.log('qiangu3');
>         }, 3000);
>     }, 2000);
> }, 1000);
> ```
>
> #### ajax 请求的回调地狱
>
> ```javascript
> // 伪代码
> ajax('a.json', (res1) => {
>     console.log(res1);
>     ajax('b.json', (res2) => {
>         console.log(res2);
>         ajax('c.json', (res3) => {
>             console.log(res3);
>         });
>     });
> });
> ```
>
> #### 回调的写法不一致问题
>
> ```javascript
> // Node.js 读取文件时，成功回调和失败回调，是通过 error参数来区分
> readFile('d:\\readme.text', function (error, data) {
>   if (error) {
>     console.log('文件读取失败');
>   } else {
>     console.log('文件读取成功');
>   }
> });
>
> // jQuery的 ajax 写法中，成功回调和失败回调，是通过两个回调函数来区分
> $.ajax({
>   url: '/ajax.json',
>   success: function (response) {
>     console.log('文件读取成功');
>   },
>   error: function (err) {
>     console.log('文件读取失败');
>   },
> });
> ```
>

### 捕获异常 `try/catch`

> ```bash
> ## 捕获异常 try...catch
> - try-catch 主要用于捕获 '同步函数' 的异常，无法捕获异步函数的异常
> 原因是当异步函数抛出异常时，
>     - 对于宏任务而言，执行函数时已经将该函数推入栈，此时并不在 try-catch 所在的栈，所以 try-catch 并不能捕获到错误。
>     - 对于微任务而言（如 Promise 的构造函数的异常只能被自带的 reject（.catch函数）捕获到）
>
>
>
> ### `promiseA().then().catch()` 和 `promiseA.catch().then()` 的区别
> 		- 前者可以捕获到 `then` 里面的异常；
> 		- 后者不能捕获到 `then` 里面的异常。
>
>
>
> ### 可选 catch 绑定
> 在 ES10 之前，语法迫使我们为 `catch` 子句绑定一个异常变量，不管它是否必要。
> 很多时候可以注意到，`catch` 块只是多余的。ES10 提案使我们能够完全忽略变量，让我们少关心一件事。
>         try {
>           const data = JSON.parse(obj)
>           return true
>         } catch {
>           return false
>         }
> ```

### 异步函数 async/await

> ```bash
> ## 异步函数 async/await
> - `async/await` 是 Generator 的语法糖，是一个自执行的 generate 函数。
> 		`async function` 代替了 `function *`，`await` 代替了 `yield`，同时也无需自己手写一个自动执行器 run。
>
>
>
> ```
>
> ```js
> /** Generator */
> run(function* () {
>   const res1 = yield readFile(path.resolve(__dirname, './test.css'), { encoding: 'utf8' });
>   console.log(res1);
>   const res2 = yield readFile(path.resolve(__dirname, './json.js'), { encoding: 'utf8' });
>   console.log(res2);
> })();
>
>
> /** async...await */
> const readFile = async () => {
>   const res1 = await readFile(path.resolve(__dirname, './test.css'), { encoding: 'utf8' });
>   console.log(res1);
>   const res2 = await readFile(path.resolve(__dirname, './json.js'), { encoding: 'utf8' });
>   console.log(res2);
>   return 'done';
> }
> const res = readFile();
> ```

- `async`用于申明一个`function`是异步的，而`await`用于等待一个异步方法执行完成（`await`只出现在`async`函数中）

- **async 函数会始终返回一个 Promise 对象**。async 函数会把返回值通过 Promise.resolve() 封装成 Promise 对象再返回。

- 在函数内部没有 `await` 关键字的情况下执行 async 函数，函数会立即执行，但仍然返回一个已解决的 Promise，且绝不会阻塞后面的语句。这意味着即使没有 `await` 关键字，仍然可以使用 `.then` 和 `.catch` 来处理该函数产生的 Promise。

  ```js
  async function Async() {
      return "hello,async"
  }
  Async().then(result => {
      console.log(result);	// hello,async
  })
  ```

- `await`是运算符，await 表达式的运算结果取决于它等的东西。如果它等到的是一个 Promise 对象，等 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。async 函数调用不会造成阻塞，它内部所有的阻塞都被封装在一个 Promise 对象中异步执行。

- 单一的 Promise 链并不能发现 async/await 的优势，但如果需要处理由多个 Promise 组成的 then 链时，优势就能体现出来（Promise 通过 then 链来解决多层回调的问题，又用 async/await 来进一步优化它)

- **例：假设一个业务，分多个步骤完成，每个步骤都是异步的，而且依赖于上一个步骤的结果**

```js
console.log("假设一个业务，分多个步骤完成，每个步骤都是异步的，而且依赖于上一个步骤的结果");
function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 200), n);
    });
}
step1 = (n) => {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}
step2 = (m, n) => {
    console.log(`step2 with ${m} and ${n}`);
    return takeLongTime(m, n);
}
step3 = (k, m, n) => {
    console.log(`step3 with ${k}, ${m} and ${n}`);
    return takeLongTime(k + m + n);
}

/* doIt = () => {
    console.time("Pormise .then()");
    const time1 = 300;
    step1(time1)
        .then(time2 => {
            return step2(time1, time2)
                .then(time3 => [time1, time2, time3]);
        })
        .then(times => {
            const [time1, time2, time3] = times;
            return step3(time1, time2, time3);
        })
        .then(result => {
            console.log(`Pormise .then() result is ${result}`);
            console.timeEnd('Pormise .then()');
        })

}
doIt(); */
/* 输出 doIt()
step1 with 300
step2 with 300 and 500
step3 with 300, 500 and 500
Pormise .then() result is 1500
Pormise .then(): 1909.204ms */

async function test() {
    console.time("async && await");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time1, time2);
    const result = await step3(time1, time2, time3);
    console.log(`async && await result is ${result}`);
    console.timeEnd(`async && await`);
}
test();

/* 输出 test()
step1 with 300
step2 with 300 and 500
step3 with 300, 500 and 500
async && await result is 1500
async && await: 1910.646ms */
```

####  async/await 与 try/catch 结合使用

```js
// vue 中使用 async/await 与 try/catch 结合使用
async reqHttp = () => {
  try {
    let params = {};
  	const res = await this.$http.reqInterface(params);
    let { code, total, rows, info } = res.data;
    if(code == 1) {
      this.rowData = rows;
      this.total = total;
    } else {
      console.log("获取数据异常", info)
    }
  } catch(err) {
    this.$message.error("请求接口异常",error);
  }
}
```

#### 异步迭代器`for await...of`

> ```bash
> ## 异步迭代器 for-await...of
> -  ES2018 引入异步迭代器（asynchronous iterators），这就像常规迭代器，除了`next()` 方法返回一个 Promise。因此 `await` 可以和 `for...of` 循环一起使用，以串行的方式运行异步操作。
>
> - for-await...of 主要用于遍历异步可迭代对象。其会在异步或同步可迭代对象中创建一个迭代循环（String/Array/类数组/Map/Set/自定义可迭代对象）
>
> - 注意1：for-await...of 语句只能在 async function 内使用。
> - 注意2：如果是寻常的同步遍历方法进行循环，其执行顺序不会按顺序执行。
> ```
>
> ```js
> function Gen(time) {
>   return new Promise((resolve, reject) => {
>     setTimeout(function () {
>       resolve(time)
>     }, time)
>   })
> }
>
> /** 正确代码示例 */
> async function test1() {
>   const arr = [Gen(2000), Gen(100), Gen(3000)]
>   for await (let item of arr) {
>     console.log(item)
>   }
> }
> test1()	// 输出：2000, 100, 3000
>
>
> /** 正确代码示例：for-await...of 的实现原理 */
> async function test2() {
>   const arr = [Gen(2000), Gen(100), Gen(3000)]
>   for (let i of arr) {
>   	const res = await i
>     console.log(res)
>   }
> }
> test2()	// 输出：100, 2000, 3000
>
> /** 错误代码示例：不会有效执行的循环（不会按顺序执行） */
> async function test3() {
>   const arr = [Gen(2000), Gen(100), Gen(3000)]
>   arr.forEach(async (i) => {
>     const res = await i
>     console.log(res)
>   })
> }
> test3()	// 输出：100, 2000, 3000
> ```
>

