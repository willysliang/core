---
Author: willy
CreateTime: 2023-08-24 16:42:38
Modifier: willysliang
ModifiedTime: 2023-11-27 20:09:45
Description: NodeJS 进阶
---

## NodeJS 进阶

```bash
## NodeJS 进阶



```



## 原生路由

```ts
/**
 * @ Author: willy
 * @ Create Time: 2023-08-15 14:31:38
 * @ Modifier by: willy
 * @ Modifier time: 2023-08-24 17:39:53
 * @ Description: main.ts 入口文件
 */

// 启动服务
const server = require("./router/server")

// 路由模块
const route = require("./router/route")

// api
const apiRouter = require("./router/api")

server.use(route)
server.use(apiRouter)
server.start()

```

```js
/**
 * @ Author: willy
 * @ Create Time: 2023-08-24 16:45:14
 * @ Modifier by: willy
 * @ Modifier time: 2023-08-24 16:53:27
 * @ Description: server.ts 服务开关
 */

const http = require("http")

/** 服务基础地址 */
const BASE_URL = "http://127.0.0.1"
/** 开启的服务端口号 */
const LISTEN_PORT = 3000

/** 创建一个大对象存储所有的路由和 api */
const route = {}

/** 暴露出去的函数：用于合并路由和 api */
const use = (routeObj) => {
    Object.assign(route, routeObj)
}

/** 开启服务 */
const start = () => {
    http.createServer(async (req, res) => {
        const url = new URL(req.url, BASE_URL)
        // 使所有匹配不到的路径走404网页
        routeMap[url.pathname || "/404"](res)
    }).listen(LISTEN_PORT, () => {
        console.log(`${BASE_URL}:${LISTEN_PORT}启动成功~`)
    })
}

module.exports = {
    use,
    start,
}

```

```ts
/**
 * @ Author: willy
 * @ Create Time: 2023-08-24 17:09:05
 * @ Modifier by: willy
 * @ Modifier time: 2023-08-24 17:09:56
 * @ Description: utils.ts 工具类
 */

/** 接口调用中转处理 */
const render = (res, path, type = "", code = 200) => {
    res.writeHead(code, {
        "Content-Type": `${type || "text/html"};charset=utf8`,
    })
    res.write(fs.readFileSync(path), "utf-8")
    res.end()
}

module.exports = {
    render,
}

```

```ts
/**
 * @ Author: willy
 * @ Create Time: 2023-08-24 16:52:37
 * @ Modifier by: willy
 * @ Modifier time: 2023-08-24 17:58:55
 * @ Description: route.ts 路由表
 */

const fs = require("fs")
const path = require("path")
//根据文件后缀名自动获取响应头中content-type
const mime = require("mime")
const { render: routeRender } = require("./utils")

/** 路由表 */
const routes = {
    "/login"(req, res) {
        routeRender(res, "./static/login.html")
    },
    "/home"(req, res) {
        routeRender(res, "./static/home.html")
    },
    "/404"(req, res) {
        const url = new URL(req.url, "http://127.0.0.1")
        /*
         <link href='/css/index.css'></link>根路径访问，就等于127.0.0.1:3000/css/index.css。
         这里将项目文件夹F://项目+static+/css/index.css合并成文件路径，如果存在就读取该文件返回
         */
        let pathname = path.join(__dirname, "static", url.pathname)
        if (fs.readStaticFile(res, pathname)) {
            return
        }
        routeRender(res, "./static/404.html")
    },
}

module.exports = routes

```

```ts
/**
 * @ Author: willy
 * @ Create Time: 2023-08-24 17:03:51
 * @ Modifier by: willy
 * @ Modifier time: 2023-08-24 17:49:56
 * @ Description: api.ts 接口
 */

const { render: apiRender } = require("./utils")

const api = {
    //get请求
    "/api/login"(req, res) {
        const url = new URL(req.url, "http://127.0.0.1")
        const data = {}
        let username = url.searchParams.get("username")
        let password = url.searchParams.get("password")
        if (username === "ds" && password === "123") {
            Object.assign(data, { ok: 1 })
        } else {
            Object.assign(data, { ok: 0 })
        }
        apiRender(res, JSON.stringify(data))
    },

    //post请求
    "/api/loginpost"(req, res) {
        let data: any = ""
        //这里使用最原始的方法获取post请求参数, 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        req.on("data", (chunk) => {
            data += chunk
        })
        // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
        req.on("end", () => {
            data = JSON.parse(data)
            if (data.username === "ds" && data.password === "123") {
                apiRender(res, JSON.stringify({ ok: 1 }))
            } else {
                apiRender(res, JSON.stringify({ ok: 0 }))
            }
        })
    },
}

module.exports = api

```

```ts
/**
 * @ Author: willy
 * @ Create Time: 2023-08-15 14:31:38
 * @ Modifier by: willy
 * @ Modifier time: 2023-08-24 17:52:57
 * @ Description: demo.ts 客户端发起请求
 */

const username = 'willys'
const password = 123456

//get请求
fetch(`/api/login?username=${username}&password=${password}`)
    .then((res) => res.text())
    .then((res) => {
        console.log(res)
    })

//post请求
fetch(`/api/loginpost`, {
    method: "POST",
    body: JSON.stringify({
        username: username,
        password: password,
    }),
    headers: {
        "Content-Type": "application/json",
    },
})
    .then((res) => res.text())
    .then((res) => {
        console.log(res)
    })

```

## 中间件

```bash
## 中间件
中间件（Middleware）是一种软件模式，用于将不同的软件系统或组件连接起来，使其能够相互通信和交互。它最大的特点是一个中间件处理完可以再传递给下一个中间件。

App 实例再运行过程中，会调用一系列的中间件。每个中间件可以从 APP 实例中接收三个参数，依次为request对象（访问请求对象）、response对象（响应对象），next回调函数（代表 web 应用处于请求-响应循环流程中的下一个中间件）。每个中间件都可以对访问请求对象（request对象）进行加工，并且决定是否调用 next 方法将 request 对象再传给下一个中间件。



### 中间件的功能
1. 控制请求流程：可以通过调用 next 函数来将控制权传递给下一个中间件或路由处理程序，从而控制请求流程。
		注意：如果当前中间件没有终结 请求-响应 循环，则必须调用 next() 方法将控制权交给下一个中间件，否则请求就会挂起。
2. 处理请求：中间件可以拦截请求，在请求到达应用之前对其进行处理。例如，中间件可以验证请求参数、加装请求信息等。
3. 处理响应：可以在应用程序处理请求之后对请求响应 response 进行处理。例如，中间件可以设置响应信息、压缩响应体、处理错误等。
4. 执行共享逻辑：可以执行一些通用逻辑，这些逻辑可以在多个路由处理程序中共享。例如身份验证、请求日志记录、性能监控等。
5. 处理错误：可以捕获和处理应用程序中的错误。例如未处理的异常、HTTP 错误响应等。

```

````js
/** 不做任何操作，只传递 request 对象的中间件 */
const uselessMiddleware = (req, res, next) => {
    next()
}

/** 抛出异常的中间件（后面的中间件将不再执行，直到发现一个错误处理函数为止） */
const uselessMiddlewareError = (req, res, next) => {
    next("出错啦~")
}

````

## 洋葱模型

```bash
## 洋葱模型
洋葱模型是 Koa 框架中常用的一种中间件处理方式，它的核心思想是将请求和响应的处理过程看作是一层层的中间件函数，每个中间件函数都可以对请求和响应进行处理，并将处理结果传递给下一个中间件，最终得到最终的响应结果。

洋葱模型执行示意图：
请求 -> 中间件1(前置处理) -> 中间件2(前置处理) -> 中间件3(前置处理) -> 业务处理 -> 中间件3(后置处理) -> 中间件2(后置处理) -> 中间件1(后置处理) -> 最终结果的响应。
	

在洋葱模型中，请求从外层开始，依次经过每个中间件函数的前置处理，然后进入业务处理结果，最后依次经过每个中间件函数的后置处理，最终得到响应结果。

```

```ts
/**
 * Koa.ts
 * 实现 Koa 的洋葱模型
 */
class Koa {
  middlewares: Array<any> = []

  /** 执行动作 */
  private action = (instance, ctx) => {
    // 记录索引
    let index = 1

    const next = () => {
      // 记录执行的中间件函数
      const nextMiddleware = instance.middlewares[index]

      // 递归执行
      if (nextMiddleware) {
        index++
        nextMiddleware(ctx, next)
      }
    }

    // 从第一个开始执行
    instance.middlewares[0](ctx, next)
  }

  /** 添加中间件函数 */
  use(fn) {
    this.middlewares.push(fn)
  }

  /** 监听接口并启动服务 */
  public listen(port) {
    Promise.resolve({}).then((ctx) => {
      this.action(this, ctx)
    })
  }
}

```

```js
// const Koa = require("koa")
const Koa = require('./Koa')
const koa = new Koa()

koa.use(async (ctx, next) => {
    console.log(1)
    console.log(ctx) // {}
    await next()
    console.log(ctx) // { name: 'willy', age: 25 }
    console.log(2)
})

koa.use(async (ctx, next) => {
    console.log(3)
    ctx.name = "willy"
    await next()
    console.log(4)
})

koa.use(async (ctx, next) => {
    console.log(5)
    ctx.age = 25
})

koa.listen(3000)

/**
 * 执行结果为：
    1
    {}
    3
    5
    4
    { name: 'willy', age: 25 }
    2
 */

```



## Express 

```bash
## Express 中间件
可以为请求处理提供多个回调函数，其行为类似中间件。唯一的区别是这些回调函数有可能调用 next('route') 方法而略过其他路由回调函数。可以利用该机制为路由定义前提条件，如果在现有路径上继续执行没有意义，则可将控制权交给剩下的路径。


### lowdb
Lowdb是一种轻量级的本地JSON数据库，可以用于存储和操作JSON数据。它的作用是在Node.js和浏览器中提供一种简单的方法来创建和管理本地数据库，这些数据库通常用于小型应用程序和原型开发。Lowdb提供了一组简单易用的API，可以用于读取、写入、更新和删除JSON数据。它还支持链式操作，使得数据操作更加简单和直观。

安装：$ npm i lowdb

```

### all方法和http动词方法

```js
const express = require("express")
const http = require("http")
const app = express()

/** 使用中间件来加装请求内容、以及对响应进行拦截 */
app.all("*", (req, res, next) => {
    res.writeHead(200, { "Content-Type": "text/plain" })
    next()
})

app.get("/", (req, res) => {
    res.end("Welcome to the homepage!")
})

app.get("/about", (req, res) => {
    res.end("Welcome to the about page!")
})

// 携带参数的请求
app.get("/hello/:who", (req, res) => {
    res.end("Hello, " + req.params.who + ".")
})

/** 进行兜底处理 */
app.get("*", (req, res) => {
    res.end("404!")
})

http.createServer(app).listen(300)

```

### 路径匹配

```js
const express = require("express")
const http = require("http")
const app = express()

/**
 * 字符串模式路径
 */
// 匹配 acd 和 abcd
app.get("/ab?cd", function (req, res) {
    res.send("ab?cd")
})

// 匹配 abcd、abbcd、abbbcd等
app.get("/ab+cd", function (req, res) {
    res.send("ab+cd")
})

// 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
app.get("/ab*cd", function (req, res) {
    res.send("ab*cd")
})

// 匹配 /abe 和 /abcde
app.get("/ab(cd)?e", function (req, res) {
    res.send("ab(cd)?e")
})

/**
 * 正则表达式路径
 */
// 匹配任何路径中含有 a 的路径：
app.get(/a/, function (req, res) {
    res.send("/a/")
})

// 匹配以 fly 结尾的路径，如匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
app.get(/.*fly$/, function (req, res) {
    res.send("/.*fly$/")
})

http.createServer(app).listen(300)

```

### 多回调处理

```js
/** 多回调函数 */
app.get(
    "/example/b",
    (req, res, next) => {
        console.log("response will be sent by the next function ...")
        next()
    },
    (req, res) => {
        res.send("Hello from B!")
    }
)

/** 回调函数数组 */
const cb0 = (req, res, next) => {
    console.log("CB0")
    next()
}
const cb1 = (req, res, next) => {
    console.log("CB1")
    next()
}
const cb2 = (req, res) => {
    res.send("Hello from C!")
}
app.get("/example/c", [cb0, cb1, cb2])

```

### request对象

```bash
### request 对象
1. 原生操作
	- request.method
	- request.url
	- request.httpVersion
	- request.headers
	
2. express 内置
	- request.path
	- request.query
	- request.ip		获取 IP 地址
	
	- request.get('请求头中某个属性名') 	获取请求头

```

### response 对象

```bash
### response 对象
res.end()	结束响应过程。
res.json()	发送JSON响应。
res.jsonp()	发送带有JSONP支持的JSON响应。
res.set('属性名', '属性值') 设置的响应头。
res.send()	发送各种类型的响应。
res.sendStatus()	设置响应状态代码，并将其字符串表示形式发送为响应正文。

res.download('需要被下载文件的所在路径')	提示要下载的文件。
res.redirect()	重定向请求（允许网址的重定向）。
res.sendFile()	将文件作为八位字节流发送（用于发送文件）。
res.render()	渲染视图模板（用于渲染网页模板）。

```

```js
/** response.redirect */
response.redirect("/hello/anime")
response.redirect("http://wwww.willy.com")
response.redirect(301, "http://www.example.com")

/** response.sendFile */
response.sendFile("/path/to/willy.mp4")

/** response.render */
app.get("/", (request, response) => {
    response.render("index", { message: "Hello World!" })
})

```

### Express 中间件

```bash
### Express 中间件
Express 应用可使用如下几种中间件：
	- 应用级中间件
	- 路由级中间件
	- 错误处理中间件

使用可选则挂载路径，可在应用级别或路由级别装载中间件。此外还可以同时装在一系列中间件函数，从而在一个挂载点上创建一个子中间件栈。



### 应用级中间件
应用级中间件绑定到 app 对象 使用 app.use() 和 app.method()。
其中， method 是需要处理的 HTTP 请求的方法，例如 GET, PUT, POST 等等，全部小写。


### 静态资源中间件
express.static 是 Express 唯一内置的中间件。它基于 serve-static，负责在 Express 应用中提托管静态资源。每个应用可有多个静态目录。
将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了。
如果希望所有通过 express.static 访问的文件都存放在一个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录指定一个挂载路径的方式来实现。
    1. index.html 文件为默认打开的资源。
    2. 如果静态资源与路由规则同时匹配，谁先匹配成功就响应。
    3. 路由一般响应动态资源，静态资源中间件响应静态资源。



### 路由级中间件
路由级中间件和应用级中间件一样，只是它绑定的对象为 express.Router()。
使用 express.Router 该类创建模块化的，可安装的路由处理程序。一个 Router 实例是一个完整的中间件和路由系统。
可将路由器创建为模块，在其中加载中间件功能，定义一些路由，并将路由器模块安装在主应用程序的路径上。


### 错误处理中间件
错误处理中间件和其他中间件定义类似，只是要使用 4 个参数，而不是 3 个，其签名如下： (err, req, res, next)。
    //上面的中间件都没有匹配就会走这里
    app.use(function(err, req, res, next) {
      console.error(err.stack)
         //send的状态码默认是200
      res.status(500).send('error')
    })

```

```js
const express = require("express")
const app = express()
const http = require("http")

const indexRouter = require("./route/indexRouter")
const LoginRouter = require("./route/LoginRouter")

/** token 信息验证 */
const tokenMiddleware = (req, res, next) => {
    // 验证用户 token 和 cookie 是否过期
    const authHeader = req.headers["authorization"]
    const isValid = !!authHeader
    if (isValid) {
        next()
    } else {
        res.send("token error")
    }
}

/** 防盗链监控（非自己所控制的域名进行请求则不响应请求） */
const refererMiddleware = (req, res, next) => {
    // 获取 referer（第一次请求可能不存在 referer）
    const referer = req.get("referer")
    if (referer) {
        // 实例化
        const url = new URL(referer)
        const hostname = url.hostname

        // 检测请求头中的 referer 是否为 127.0.0.1
        if (hostname !== "127.0.0.1") {
            res.status(404).send("<h1>404 Not Found</h1>")
            return
        }
    }
    next()
}

/** 验证码信息验证（路由级中间件） */
const checkCodeMiddleware = (req, res, next) => {
    if (req.query.code === "521") {
        next()
    } else {
        res.send("验证码错误")
    }
}

//应用级别(后面的路由都会执行此中间件)
app.use(tokenMiddleware, refererMiddleware)

/** 静态资源中间件设置 */
app.use(express.static(__dirname + "/public"))
app.use("/static", express.static(__dirname + "/public"))

//应用级别(这里不写路径默认/)
//这些use方法是每次访问都是从上往下执行
//如果是/login/a,会先找到/login开头的这个应用级中间件
//然后再进入这个中间件找/a
app.use(indexRouter)
app.use("/login", checkCodeMiddleware, LoginRouter)

http.createServer(app).listen(3000)

```

## Express 服务端渲染

```bash
## Express 服务端渲染
1. 安装 Express 脚手架：
$ cnpm i -g express-generator

2. 使用 ejs 模板引擎创建应用：
$ express --view=ejs myapp

```

### ejs 标签含义

```bash
### ejs 标签含义
<% '脚本' 标签，用于流程控制，无输出。
<%_ 删除其前面的空格符
<%= 输出数据到模板（输出是转义 HTML 标签）
<%- 输出非转义的数据到模板
<%# 注释标签，不执行、不输出内容
<%% 输出字符串 '<%'
%> 一般结束标签
-%> 删除紧随其后的换行符
_%> 将结束标签后面的空格符删除

```

```ejs
<header>
  我是公共样式
  <div>
    <% if(isShowSchool) {%>
    <h1>校园招聘</h1>
    <% } %>
  </div>
</header>


<%- include("./header.ejs",{ isShowSchool:true }) %> index <%# 我的注释 %>

```

### ejs 列表渲染

```js
const ejs = require("ejs")

const arr = ["a", "b", "c", "d"]

const result = ejs.render(
    `<ul>
    <% arr.forEach(item => { %>
    <li><%= item %></li>
    <% }) %>
</ul>`,
    { arr }
)

console.log(result)

/* 
<!-- 输出 result 转化为以下内容 -->
<ul>
    <li>a</li>
    <li>b</li>
    <li>c</li>
    <li>d</li>
</ul> */

```

### ejs 条件渲染

```js
const ejs = require("ejs")

const isLogin = false

const result = ejs.render(
    `
    <% if (isLogin) { %>
        <span>欢迎回来</span>
    <% } else { %>
        <button>登录</button>
    <% } %>
    `,
    { isLogin }
)

console.log(result)

/* 
<!-- 输出 result 转化为以下内容 -->
<button>登录</button> 
*/

```

### express 中使用 ejs

```js
const express = require("express")
const path = require("path")

// 创建应用对象
const app = express()

// 设置模板引擎
app.set("view engine", "ejs")

// 设置模板文件存放位置（模板文件：指具有模板语法内容的文件）
app.set("views", path.resolve(__dirname, "./views"))

// 创建路由
app.get("/home", (req, res) => {
    const title = "Hi, willy~"
    // 会识别 /views/home.ejs 的内容
    res.render("home", { title })
})

app.listen(80, () => {
    console.log("server is running at port 5000")
})

```

```ejs
<!-- 文件路径 views/home.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
</head>
<body>
    <p><%= title %></p>
</body>
</html>
```

## mongoDB

```bash
## MongoDB 数据库
Mongoose 是一个对象文档模型（ODM）库，它对 Node 原生 的 MongoDB 模块做了进一步封装，并提供了更多功能。在大多数情况下，它被用来把结构化的模式应用到一个MongoDB集合，并提供了验证和类型转换等好处。

mongoose 中的对象：
	- Schema 模式对象（Schema 对象定义约束了数据库中的文档结构）
	- Model 模型对象（Model 对象作为集合中的所有文档的表示，相当于 MongoDB 数据库中的集合 collection）
	- Document 文档对象（Document 表示集合中的具体文档，相当于集合中的一个具体的文档）


[下载地址](https://www.mongodb.com/try/download/community)
[官方文档](https://docs.mongoing.com/install-mongodb)

mongoose 的好处
	1. 可以为文档创建一个模式结构（Schema）
	2. 可以对模型中的对象/文档进行验证
	3. 数据可以通过类型转换来转换成对象模型
	4. 可使用中间件来与应用业务逻辑挂钩

安装：
$ npm i -S mongoose


### 字段类型
- 字符串：String
- 数字：Number
- 布尔值：Boolean
- 数组：Array
- 日期：Date
- Buffer对象：Buffer
- Mixed：任意类型，需使用 mongoose.Schema.Types.Mixed 指定
- ObjectId：对象ID，需使用 mongoose.Schema.Types.ObjectId 指定
- Decimal128：高精度数字，需使用 mongoose.Schema.Types.Decimal128 指定


### 方法
mongoose.model(modelName, schemaObj, collection, skipInit, connection)
  - modelName（字符串）：模型的名称。
  - schemaObj（Schema对象）：用于定义模型结构的Mongoose Schema对象。
  - collection（字符串，可选）：可选的集合名称，如果未提供，则Mongoose将使用模型名称的小写版本。
  - skipInit（布尔值，可选）：如果为true，则不会自动初始化模型，否则会自动初始化。默认为false。
  - connection（Mongoose连接对象，可选）：可选的连接对象，用于指定用于模型的数据库连接。如果未提供，则将使用默认连接。

```

```ts
/**
 * db.connect.js
 * @param {*} success 数据库连接成功回调
 * @param {*} error 数据连接失败回调
 */
module.exports = function (success = null, error = null) {
    const mongoose = require("mongoose")

    /** 连接 mongoose 数据库 */
    mongoose.connect("mongodb://127.0.0.1:27017/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    /** 监听 mongoose 数据库连接的状态 */
    mongoose.connection.on("open", async () => {
        if (success) return success()
        console.log("数据库连接成功~")
    })
    mongoose.connection.on("close", () => {
        console.log("数据库连接已经断开~")
    })
    mongoose.connection.on("error", (err) => {
        if (error) return error()
        console.log("连接错误", err)
    })

    // 断开数据库连接
    // mongoose.disconnect()
}

```

### 字段定义及约束 Schema 

```bash
### 模型的配置对象 Schema 和 SchemaType
在 mongoose 中，Schema 是模型的配置对象。Schema 不允许您从 MongoDB 读写，这就是模型的用途。

Schema 的作用
	- 定义保存在 MongoDB 中的文档可以具有哪些属性
	- 定义自定义验证(validation)
  - 声明(virtuals)
  - 声明 getter 和 setter
  - 定义静态(statics)和方法(methods)


`SchemaType` 类只是一个基类。有几个类继承自 `SchemaType`，代表不同的核心 Mongoose 类型：
    - `mongoose.Schema.Types.String`
    - `mongoose.Schema.Types.Number`
    - `mongoose.Schema.Types.Date`
    - `mongoose.Schema.Types.Buffer`
    - `mongoose.Schema.Types.Boolean`
    - `mongoose.Schema.Types.Mixed`
    - `mongoose.Schema.Types.ObjectId`（或等效的 `mongoose.ObjectId`）
    - `mongoose.Schema.Types.Array`
    - `mongoose.Schema.Types.Decimal128`
    - `mongoose.Schema.Types.Map`


### 文档字段约束
- require：Boolean，数据是否必填。
- default: any，设置默认值，如果给字段设置值时则取该设定的默认值。
- min/max：最小/大值（仅适用于数字）
- match：正则匹配（仅适用于字符串）
- enum: 枚举匹配（只适用于字符串）
- validate：自定义匹配。validate 是一个函数，函数的参数代表当前字段，返回 true 表示通过验证，返回 false 表示未通过验证。

```

````js
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/student")

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: /01/, //将name的match设置为必须存在'01'字符。如果name不存在'01'，文档将不被保存
    },
    age: {
        type: Number,
        min: 10,
        max: 18,
        default: 14,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
    },
    desc: {
        type: String,
        validate: (arg) => arg.length < 20,
    },
  	money: Number,
})

// 判断原始类型
schema.path('name') instanceof mongoose.SchemaType // true
schema.path('name') instanceof mongoose.Schema.Types.String // true
schema.path('age') instanceof mongoose.SchemaType // true
schema.path('age') instanceof mongoose.Schema.Types.Number // true

// 设置值
schema.path('money').default(25)
schema.path('money').validate((v) => v >= 21)

// 创建实例
const stuModel = mongoose.model("students", schema)
new stuModel({ name: "01willy", age: 12, gender: "male", desc: "" }).save(
    (err, doc) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(doc)
    }
)

````

#### ObjectIds

```bash
### ObjectIds

```



### 文档新增

```bash
### 文档新增
- save()：操作的是文档

- create()：操作的是模型
- createOne()：创建一个对象
- createMany()：创建多个对象

- insertMany()：插入一个对象

```

### 文档查询

```bash
### 文档查询
- find()：根据条件返回多条数据
- findById()：根据id来进行查询
- findOne()：返回查询到的第一条数据

#### 复杂查询
- $where：复杂查询 $where 可以使用任意的 js 作为查询的一部分，包含 JavaScript 表达式的字符串或者函数。

常用的查询条件
  $or　　　　 或关系
  $nor　　　 或关系取反
  $gt　　　　 大于
  $gte　　　 大于等于
  $lt　　　　 小于
  $lte　　　 小于等于
  $ne　　　　 不等于
  $in　　　　 在多个值范围内
  $nin　　　 不在多个值范围内
  $all　　　 匹配数组中多个值
  $regex　　 正则，用于模糊查询
  $size　　　 匹配数组大小
  $maxDistance　 范围查询，距离（基于LBS）
  $mod　　　　 取模运算
  $near　　　 邻域查询，查询附近的位置（基于LBS）
  $exists　　 字段是否存在
  $elemMatch　 匹配内数组内的元素
  $within　　　 范围查询（基于LBS）
  $box　　　　 范围查询，矩形范围（基于LBS）
  $center　　　 范围醒询，圆形范围（基于LBS）
  $centerSphere　范围查询，球形范围（基于LBS）
  $slice　　　　 查询字段集合中的元素（比如从第几个之后，第N到第M个元素


### 特定类型查询
- sort	排序
- skip	跳过
- limit	限制
- select	显示字段
- exect	执行(与 Promise.then() 类似)
- count	计数
- distinct	去重
```

```js
// 字符串的 es5 中的 this 与 obj 指向一样，es6 中只能用 obj
stuModel.find({ $where: 'this.grades == this.test' || 'obj.grages == obj.test' })

// 函数
stuModel.find({ 
  $where: () => { return this.grades == this.test || obj.grades === obj.test } 
})

```

### 文档更新

```bash
### 文档更新
- update()
		- `Model.update(conditions, doc, [options], [callback])`
			- conditions：查询条件
			- doc：需要修改的数据（插入的数据）
			- [options]：控制选项
					- safe (boolean)： 默认为true。安全模式。 
					- upsert (boolean)： 默认为false。如果不存在则创建新记录。 
					- multi (boolean)： 默认为false。是否更新多个查询记录。 
					- runValidators： 如果值为true，执行Validation验证。 
					- setDefaultsOnInsert： 如果upsert选项为true，在新建时插入文档定义的默认值。 
					- strict (boolean)： 以strict模式进行更新。 
					- overwrite (boolean)： 默认为false。禁用update-only模式，允许覆盖记录。


- updateOne()：与 update() 的区别是默认更新一个文档，即使设置 {multi:true} 也无法只更新一个文档
- updateMany()：与 update() 的区别是默认更新多个文档，即使设置{multi:false}也无法只更新一个文档



#### 复杂更新
- find() + save()
- findOne() + save()

- fingOneAndUpdate()
- findByIdAndUpdate()

```

### 文档删除

```bash
### 文档删除
- deleteOne()：删除符合条件的所有数据
- findOneAndRemove()：删除符合条件的一条数据
- findByIdAndRemove()：通过 id 删除数据（id是唯一的）

```

### 前后钩子

```bash
### 前后钩子
前后钩子即 pre() 和 post() 方法（中间件）
中间件在 schema 上指定，类似静态方法或实例方法等。
- pre()：在执行某些操作前执行。
- post()：在执行某些操作前后执行，不可以使用 next()。

```

```js
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/student")
const Schema = new mongoose.Schema({
    name: String,
    grades: Number,
    test: { type: Number, default: 0 },
})
Schema.pre("find", (next) => {
    console.log("我是pre方法1")
    next()
})
Schema.pre("find", (next) => {
    console.log("我是pre方法2")
    next()
})
Schema.post("find", (docs) => {
    console.log("我是post方法1")
})
Schema.post("find", (docs) => {
    console.log("我是post方法2")
})
const stuModel = mongoose.model("grades", Schema)
stuModel.find((err, docs) => {
    console.log(docs[0])
})

/*
    我是pre方法1
    我是pre方法2
    我是post方法1
    我是post方法2
    {test: 34, _id: 6017befb5c36d64d08b72576,name: '小明',grades: 78,__v: 0}
*/

```

## MySQL关系数据库

```bash
## MySQL 关系数据库

### 关系型数据库与非关系型数据库的区别
关系型数据库最典型的数据结构是表，由二维表及其之间的联系所组成的一个数据组织。
  优点：
    1. 易于维护：都是使用表结构，格式一致。 
    2. 使用方便：SQL语言通用，可用于复杂查询。
    3. 复杂操作：支持SQL，可用于一个表以及多个表之间非常复杂的查询。 
  缺点： 
    1. 读写性能比较差，尤其是海量数据的高效率读写。 
    2. 固定的表结构，灵活度稍欠。
    3. 高并发读写需求，传统关系型数据库来说，硬盘I/O是一个很大的瓶颈。

非关系型数据库严格上不是一种数据库，应该是一种数据结构化存储方法的集合，可以是文档或者键值对等。
  优点：
    1. 格式灵活：存储数据的格式可以是key,value形式、文档形式、图片形式等，使而关系型数据库只支持基础类型。
    2. 速度快：nosql 可以使用硬盘或者随机存储器作为载体，而关系型数据库只能使用硬盘。
    3. 高扩展性。 
    4. 成本低：nosql数据库部署简单，基本都是开源软件。
  缺点：
    1. 不提供sql支持。
    2. 无事务处理。
    3. 数据结构相对复杂，复杂查询方面稍欠。


### 安装 MySQL 2
$ npm i --save mysql2

```

### 连接数据库

```js
/** config/db.config.js */
const mysql = require("mysql2/promise")

// 通过 createPool 方法连接服务器
const db = mysql.createPool({
    host: "127.0.0.1", // 表示连接某个服务器上的mysql数据库
    user: "root", // 数据库的用户名 （默认为root）
    password: "123456", // 数据库的密码 (默认为root)
    database: "dbtest11", // 创建的本地数据库名称
})

// 测试数据库是否连接成功
db.getConnection((err, conn) => {
    conn.connect((err) => {
        if (err) {
            console.log("连接失败~")
            return
        }
        console.log("连接成功~")
    })
})

module.exports = db

```

### 增删改查操作

```js
const express = require("express")
const db = require("../config/db.config")
const router = express.Router()

/**
 * 查询操作
 */
router.get("/", async (req, res) => {
    // 通过db.query方法来执行mysql  测试是否连接成功
    // 查询语句 data 得到的是一个数组，  增删改得到的是受影响的行数
    const users = await db.query("select * from users")
    console.log(users[0])
    res.send({
        ok: 1,
        data: users[0],
    })
})

/**
 * 插入操作
 */
router.get("/addUser", async (req, res) => {
    // 给user中添加用户名和密码
    const sql = "insert into users (userid,department_id) values (?,?)" // 构建sql语句
    // 执行sql语句
    let ret = await db.query(sql, ["Mary", 2])
    console.log(ret)
    res.send({
        ok: 1,
    })
})

/**
 * 修改操作
 */
router.get("/updateUser", async (req, res) => {
    const sql = "update users set userid=?,department_id=? where id=?" // 构建sql语句
    // 执行sql语句
    let ret = await db.query(sql, ["Jerry", 10, 8])
    console.log(ret)
    res.send({
        ok: 1,
    })
})

/**
 * 删除操作
 */
router.get("/deleteUser", async (req, res) => {
    const sql = "delete from users where id=?" // 构建sql语句
    // 执行sql语句
    let ret = await db.query(sql, [8])
    console.log(ret)
    res.send({
        ok: 1,
    })
})

module.exports = router

```

## RESTful 接口规范

```javascript
/** config/db.config.js */
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/ds')
//插入集合和数据,数据库ds2会自动创建

// 监听mongodb数据库的连接状态
// 绑定数据库连接成功事件
mongoose.connection.once('open', function () {
  console.log('连接成功')
})
// 绑定数据库连接失败事件
mongoose.connection.once('close', function () {
  console.log('数据库连接已经断开')
})
```

```javascript
// model/UserModel.js

const mongoose = require('mongoose')

const userType = new mongoose.Schema({
  username: String,
  password: String,
  age: Number,
})

const UserModel = mongoose.model('UserModel', userType, 'users')

module.exports = UserModel
```

```javascript
// app.js
var express = require('express');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
```

```javascript
// router/user.js
var express = require('express')
var router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.getUser)

router.post('/', userController.addUser)

router.put('/:id', userController.updateUser)

router.delete('/:id', userController.deleteUser)

module.exports = router
```

```js
// controllers/userController.js
const userService = require('../services/userService')

const userController = {
  async getUser(req, res, next) {
    const { page, limit } = req.query
    let data = await userService.getUser(page, limit)
    res.send(data)
  },
  async addUser(req, res, next) {
    const { username, password, age } = req.body
    let data = await userService.addUser({ username, password, age })
    res.send(data)
  },
  async updateUser(req, res, next) {
    let data = await userService.updateUser(req.params.id)
    res.send(data)
  },
  async deleteUser(req, res, next) {
    let data = await userService.deleteUser(req.params.id)
    res.send(data)
  },
}

module.exports = userController
```

```js
// services/userService.js
const userModel = require('../model/userModel')

const userService = {
  getUser(page, limit) {
    return userModel
      .find({}, { _id: 0 })
      .sort({
        age: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit)
  },
  addUser({ username, password, age }) {
    return userModel.create({
      username,
      password,
      age,
    })
  },
  updateUser(_id) {
    return userModel.updateOne(
      {
        _id,
      },
      {
        username: '更新',
      },
    )
  },
  deleteUser(_id) {
    return userModel.deleteOne({
      _id,
    })
  },
}

module.exports = userService
```

