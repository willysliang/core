---
Author: willysliang
CreateTime: 2022-08-21 16:24:54
Modifier: willysliang
ModifiedTime: 2022-12-28 11:53:11
Description: NodeJS
---

## nodejs

```bash
### nodejs 的学习规划
1. 学习JavaScript，Node.js是基于JavaScript语言的，因此需要先学习 JS，掌握其基本语法、函数、面向对象编程等基础知识。
2. 学习Node.js基础知识，包括模块、事件机制、异步编程等。
3. 学习Node.js的核心模块，如fs、http、net等，掌握它们的使用方法和应用场景。
4. 学习Node.js框架，如Express、Koa等，了解它们的使用方法和特点，以及如何搭建Web应用程序。
5. 学习数据库操作，如MySQL、MongoDB等，学习如何使用Node.js连接数据库、进行增删改查等操作。
6. 学习前端技术，如HTML、CSS、React、Vue等，了解前后端分离的开发模式，以及如何使用Node.js搭建API服务。
7. 学习Node.js的高级特性，如流、Buffer、Cluster等，了解它们的使用方法和优化应用程序的技巧。
8. 实践项目，通过实践项目来巩固所学知识，如搭建一个博客、构建一个API服务等。


### nodejs 概念
- node.js是一个基于 Chrome V8 引擎的 JavaScript 运行环境：
	  - 不是库，是运行环境/JS语言解释器。底层源码是用C++开发的。
  	- Chrome V8引擎：引擎分为渲染引擎（渲染DOM）和脚本引擎(运行脚本语言)。脚本引擎最流行的是chrome中的V8引擎。
- node.js 的包管理是 npm，成为世界上最大的开源代码的生态系统。
- node.js 使用一个事件驱动、非阻塞I/O的模型，使其轻量又高效。
  	- 事件驱动：指在持续事务管理过程中，进行决策的一种策略，即跟随当前时间点上出现的事件，调动可用资源，执行相关任务，使不断出现的问题得以解决，防止事务堆积。
 	 	- I/O：在服务器上可理解为读写操作，非阻塞I/O(异步I/O)。nodejs是单线程语言，其在遇到I/O事件会创建一个线程去执行，然后主线程会继续往下执行。因此，触发一个I/O事件，紧接着继续执行别的动作，再触发一个I/O事件，两个动作并行执行，假如各需要 1s，那么总时间是1s。


### nodejs 组成
- nodejs 是由 ECMAScript 及 node 环境提供的一些附加API组成，包括文件、http、路径等API。
- 全局对象 global 的方法可在任何地方使用，global 可省略。
  - console.log()   //在控制台输出
  - setTimeout()   //设置超时定时器
  - clearTimeout()   /清除超时定时器
  - setInterval()   //设置间歇定时器
  - clearInterval()  //清除间歇定时器
- node 应用场景：自动化构件等工具、HTTP Proxy、网站应用开发、im即时聊天(socket、io)
```



## 安装 nodejs

```cmd
#下载cnpm	(i是英文install的缩写，-g代表全局安装，-D代表本地安装。全局安装意味着安装后在任何文件夹下都能使用，而本地安装则把东西安装到指定的文件夹，当然使用也只能在这个文件夹下使用)
npm i cnpm -g

#全局安装webpack（指定版本3.6.0，因为vue cli2依赖该版本）
npm install webpack@3.6.0 -g

#安装nrm（nrm有我们常用的镜像地址）
npm i nrm
#查看镜像地址
nrm ls
```

**npm安装报错**

```cmd
#去掉npm代理（权限问题记得加sudo）
npm config rm proxy
npm config rm https-proxy
#修改npm的资源镜像链接:
npm config set registry http://registry.npm.taobao.org
#查看是否修改成功
npm config get registry

```



### NPM

**概念**

- NPM是随同nodejs一起安装的包管理工具。常见使用场景：
  - 从NPM服务器下载别人编写的第三方包到本地；
  - 从NPM服务器下载并安装比人编写的命令行程序到本地；
  - 将自己编写的包或命令程序上传到NPM服务器。
- 在windows系统中，全局安装路径默认是用户node目录下的node_modules，非全局安装路径是命令运行所在路径下的node_modules下。

#### 使用npm

```bash
npm -v											#查看版本

npm install <name> -f			#强制安装
npm update <name>					#更新模块
npm uninstall <name>			#卸载模块


npm list									#查看安装的包
npm list | grep <包名> 		#查看安装的指定包的分支


npm view <包名>						#查看依赖包的所有的版本号


npm cache clean --force		#清除npm的缓存（防止上次安装断开导致此次无法正常安装）
```

#### package.json的使用

```bash
npm init -y									#初始化package.json文件，-y为默认生成
npm install <name> --save		#安装并写入package.json
npm install lodash --save-dev	#安装并写入package.json的dev环境上


npm i <name> -S #安装并写入package.json的生产环境("dependencies":{})中，即只有生产环境才使用的包
npm i <name> -D #安装并写入package.json的开发环境("devDependencies":{})中，即只有开发环境才使用的包
npm i --production				#安装package.json中指定环境的版本包(生产环境)
```

#### 更新本地安装依赖包的版本

**依赖包中的版本号`~、^、*`**

- **空表示patch；~表示minor； ^表示major ；*表示最新版本**
- `包名~2.0.0`：表示依赖包配置的版本号为2.0.0
- `包名^2.0.0`：表示依赖包配置的版本号最低要求为2.0.0
- `包名*`：表示依赖包配置版本号是最新的

```bash
$ npm info underscore
$ npm view underscore versions
$ npm install underscore@1.4.4 --save-dev
$ npm list | grep gulp

$ npm outdated 					#查看过期的包

$ npm list | grep gulp

$ npm update
```



#### npm install去哪获取模块？

- npm配置有仓库地址，install时都会从仓库地址中找模块。默认的仓库地址是：`https://registry.npmjs.org/`，可配置默本地默认的npm仓库下载地址：`npm config set registry http://ggjs-app-03.hnisi.com.cn:8090`



#### 国内镜像（国内加速访问GitHub）

**Windows：**

```hosts文件
 //Hosts文件位于C:\Windows\System32\drivers\etc
//1、将下面的信息添加到Hosts文件中，保存
140.82.114.3		github.com
199.232.69.194	github.global.ssl.fastly.net
151.101.192.133 raw.githubusercontent.com
```

```cmd命令
//2、更新DNS缓存
ipconfig /flushdns
```

**Linux：**

```命令行
//1、编辑Hosts文件
vi /etc/hosts
```

```vi文本
 //2、按i进入编辑模式，插入如下文本
 140.82.114.3		github.com
199.232.69.194	github.global.ssl.fastly.net
151.101.192.133 raw.githubusercontent.com

//3、按Esc键退出编辑模式，输入:wq!保存退出。
//4、重启机器或者重启服务使Hosts生效
```

### Yarn

**概念**

- Yarm是JavaScript包管理器。目标是解决npm所遇的问题：安装包不够快速和稳定；因npm允许包在安装时运行代码导致存在安全隐患。
- Yarm不能完全替代npm。Yarm仅仅是一个能够从npm仓库获取模块的新的CLI客户端。
- 特点：速度超快(yarm缓存每个下载过的包，再次使用无需重复下载)；安全(在执行代码前，yarm会通过算法校检每个安装包的完整性)；可靠(使用详细、简介的锁文件格式和明确的安装算法，Yarm能保证在不同系统上无差异工作)

### NVM

```bash
## NVM
在开发的工程中，我们可能需要经常切换node版本来应对不同的开发环境，所以需要经常使用不同版本的node


### 一、安装npm插件n ,通过n模块来管理node版本
1、全局安装n模块
npm instlal -g n
2、安装当前稳定版本
n stable或者sudo n stable
3、安装最新版本的
n latest或者sudo n latest
4、安装指定版本的node
n v8.16.0
5、卸载指定的node版本
n rm v8.16.0


### 二、使用nvm管理node版本
1、安装nvm
brew install nvm

2、使用nvm安装node版本
- 安装最新版本
	nvm isntall node

- 安装指定版本
	nvm install 8.16.0

3、查看所有版本
nvm ls

4、切换node版本
- 使用最新版本
	nvm use node
- 使用指定版本
nvm use 10.16.2

5. 案例
通常会使用第二种方式
例如：在一个项目中使用的是node@6.13.2,新项目使用的是node@8.16.0,
先要安装node@8.16.0：	nvm install 8.16.0，
然后，nvm use 8.16.0


### NVM 使用
nvm list	#查看所有安装版本
nvm use 12.13.1		#切换指定版本
nvm uninstall 12.13.1	#卸载指定版本
```

### NRM

- NRM(`npm registry manager`)是npm的镜像源管理工具，有时候国外资源太慢，使用这个就可以快速地在 npm 源间切换。

#### 手工切换源（镜像）

```bash
#1.查看当前源
npm config get registry

#2.切换淘宝源
npm config set registry https://registry.npm.taobao.org

#3.切换nrm  -->nrm use 源名

```

#### 管理源

```bash
#1.安装nrm
npm install -g nrm

#2.查看所拥有的源
#执行命令 nrm ls 查看可选的源。 其中，带*的是当前使用的源，上面的输出表明当前源是官方源。
nrm ls

#3.切换nrm  -->nrm use 源名
nrm use npm			#切换到https://registry.npmjs.org/
nrm use lesso		#切换到http://nexus.lesso.com/nexus/content/groups/npm/
nrm use taobao	#切换到 https://registry.npm.taobao.org/

#添加用户/账号
npm adduser

#测试源的响应时间
nrm test

```



### 对 npm package 进行发包

###### 1 编写模块

保存为index.js

```js
exports.sayHello = function(){
  return 'Hello World';
}
```

###### 2 初始化包描述文件

$ npm init package.json

```json
{
    "name": "gp19-npm",
    "version": "1.0.1",
    "description": "gp19 self module",
    "main": "index.js",
    "scripts": {
        "test": "make test"
    },
    "repository": {
        "type": "Git",
        "url": "git+https://github.com/lurongtao/gp19-npm.git"
    },
    "keywords": [
        "demo"
    ],
    "author": "Felixlu",
    "license": "ISC",
    "bugs": {
        "url": "https://github.com/lurongtao/gp19-npm/issues"
    },
    "homepage": "https://github.com/lurongtao/gp19-npm#readme",
}
```

###### 3 注册npm仓库账号

```
https://www.npmjs.com
felix_lurt/qq
$ npm adduser
```

###### 4 上传包

```bash
$ npm login
# 账号
# 密码
# 邮箱
# 一次性密码验证

$ npm publish
```

坑：403 Forbidden

```bash
查看npm源：npm config get registry
切换npm源方法一：npm config set registry http://registry.npmjs.org
切换npm源方法二：nrm use npm
```

###### 5 安装包

```
$ npm install gp19-npm
```

###### 6 卸载包

```bash
# 查看当前项目引用了哪些包：
$ npm ls

# 卸载包：
$ npm unpublish --force
```

###### 7 使用引入包

```
var hello = require('gp19-npm')
hello.sayHello()
```

###### 8 更新包

如果我们更新了该包，需要再次发包，可以使用 `npm version` 命令，控制该版本进行升级，注意需要遵循 [Semver 规范](https://github.com/semver/semver/blob/master/semver.md)。

```bash
# 增加一个修复版本号
$ npm version patch

# 增加一个小的版本号
$ npm version minor

# 将更新后的包发布到 npm 中
$ npm publish
```

在发布 npm 包时，我们一般都只发布构建后的资源，这时我们可以使用 `package.json` 的 `files` 字段。

```json
{
  "files": ["dist"]
}
```

它描述了在使用 `npm publish` 时推送到 npm 服务器的文件列表，支持目录和通配符，我们也可以在 `.gitignore` 或者 `.npmignore` 文件内排除不需要上传的文件。

但有一点需要注意，无论我们怎么设置，有些文件会始终被包含发包内，比如：

- `package.json`
- `README`
- `LICENSE / LICENCE`
- `package.json` 内 `main` 字段的文件

有一些文件则会始终被排除在发包内，比如：

- `.git`
- `.DS_Store`
- etc



### npm安装git上发布的包

```bash
# 这样适合安装公司内部的git服务器上的项目
npm install git+https://git@github.com:lurongtao/gp-project.git

# 或者以ssh的方式
npm install git+ssh://git@github.com:lurongtao/gp-project.git
```

### npm脚本

- npm允许在package.json文件里面，使用`scripts`字段定义脚本命令。
- 如果npm脚本里面需要执行多个任务，就需要明确他们的执行顺序。
  - 如果是并行执行（即同时的平行执行），可以使用 `&` 符号。`npm run script1 & npm run script2`
  - 如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用 `&&` 符号。`npm run script1 && npm run script2`

```json
"scripts": {
  "script1": "node script1.js",
  "script2": "node script2.js"
}
```

### npm变量

```bash
### npm 变量
- npm 脚本可以使用 npm 的内部变量。
- 通过 `npm_package_` 前缀， npm 脚本可以拿到 package.json 里面的字段。
	注意：一定要在 npm 脚本中运行才可以(如 `npm run view`)，直接在命令行中运行 JS 是拿不到值的(如 `node view.js`)。
- 通过环境变量 `process.env` 对象，拿到 `package.json` 的字段值。如果是 Bash 脚本，可以使用 `$npm_package_name` 和 `$npm_package_version` 取到这两个值。

```

**取值案例**

```json
// 以下为 pageage.json 文件内容

{
  "name": "foo",
  "version": "1.2.5",
  "scripts": {
    "view": "node view.js"
  }
}
```

```js
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version); // 1.2.5
```

### NPX

- NPX(npm package extention)想要解决的主要问题是**调用项目内部安装的模块**。
- Node 自带 npm 模块，所以可以直接使用 npx 命令。万一不能用，就要手动安装一下`npm install -g npx`

#### 避免全局安装模块

除了调用项目内部模块，npx 还能避免全局安装的模块。比如，`create-react-app`这个模块是全局安装，npx 可以运行它，而且不进行全局安装。

> ```bash
> $ npx create-react-app my-react-app
> ```

上面代码运行时，npx 将`create-react-app`下载到一个临时目录，使用以后再删除。所以，以后再次执行上面的命令，会重新下载`create-react-app`。

下载全局模块时，npx 允许指定版本。

> ```bash
> $ npx uglify-js@3.1.0 main.js -o ./dist/main.js
> ```

上面代码指定使用 3.1.0 版本的`uglify-js`压缩脚本。

注意，只要 npx 后面的模块无法在本地发现，就会下载同名模块。比如，本地没有安装`http-server`模块，下面的命令会自动下载该模块，在当前目录启动一个 Web 服务。

> ```bash
> $ npx http-server
> ```

#### `--no-install` 参数和`--ignore-existing` 参数

如果想让 npx 强制使用本地模块，不下载远程模块，可以使用`--no-install`参数。如果本地不存在该模块，就会报错。

> ```bash
> $ npx --no-install http-server
> ```

反过来，如果忽略本地的同名模块，强制安装使用远程模块，可以使用`--ignore-existing`参数。比如，本地已经全局安装了`create-react-app`，但还是想使用远程模块，就用这个参数。

> ```bash
> $ npx --ignore-existing create-react-app my-react-app
> ```

#### 使用不同版本的 node

利用 npx 可以下载模块这个特点，可以指定某个版本的 Node 运行脚本。它的窍门就是使用 npm 的 node 模块。

> ```bash
> $ npx node@0.12.8 -v
> v0.12.8
> ```

上面命令会使用 0.12.8 版本的 Node 执行脚本。原理是从 npm 下载这个版本的 node，使用后再删掉。

某些场景下，这个方法用来切换 Node 版本，要比 nvm 那样的版本管理器方便一些。

#### `-p` 参数

`-p`参数用于指定 npx 所要安装的模块。

> ```bash
> $ npx -p node@0.12.8 node -v
> v0.12.8
> ```

上面命令先指定安装`node@0.12.8`，然后再执行`node -v`命令。

`-p`参数对于需要安装多个模块的场景很有用。

> ```bash
> $ npx -p lolcatjs -p cowsay [command]
> ```

#### -c 参数

如果 npx 安装多个模块，默认情况下，所执行的命令之中，只有第一个可执行项会使用 npx 安装的模块，后面的可执行项还是会交给 Shell 解释。

> ```bash
> $ npx -p lolcatjs -p cowsay 'cowsay hello | lolcatjs'
> # 报错
> ```

上面代码中，`cowsay hello | lolcatjs`执行时会报错，原因是第一项`cowsay`由 npx 解释，而第二项命令`localcatjs`由 Shell 解释，但是`lolcatjs`并没有全局安装，所以报错。

`-c`参数可以将所有命令都用 npx 解释。有了它，下面代码就可以正常执行了。

> ```bash
> $ npx -p lolcatjs -p cowsay -c 'cowsay hello | lolcatjs'
> ```

`-c`参数的另一个作用，是将环境变量带入所要执行的命令。举例来说，npm 提供当前项目的一些环境变量，可以用下面的命令查看。

> ```bash
> $ npm run env | grep npm_
> ```

`-c`参数可以把这些 npm 的环境变量带入 npx 命令。

> ```bash
> $ npx -c 'echo "$npm_package_name"'
> ```

上面代码会输出当前项目的项目名。

#### 执行 GitHub 源码

npx 还可以执行 GitHub 上面的模块源码。

> ```bash
> # 执行 Gist 代码
> $ npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32
>
> # 执行仓库代码
> $ npx github:piuccio/cowsay hello
> ```

注意，远程代码必须是一个模块，即必须包含`package.json`和入口脚本。



### FNM

### FNM的安装

```powershell
### 安装 chocolatey
$ Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))



### 使用 cho 安装 FNM
$ choco install fnm


### 验证 FNM 安装
$ fnm --version


### 永久将 fm 添加到环境变量中
$ [System.Environment]::SetEnvironmentVariable("Path", $Env:Path + ";<fnm安装路径>", [System.EnvironmentVariableTarget]::User)

```

#### 在项目根目录中添加 .nvmrc 文件

````powershell
node --version
v14.18.3

node --version > .nvmrc

````

#### 更改 .bashrc

```bash
# https://github.com/Schniz/fnm#shell-setup
# auto changes the version of node
eval "$(fnm env --use-on-cd)"

corepack enable
```

![img](./image/image.jpeg)

#### windows下修改vscode默认终端为git bash

```bash
## 在vscode的settiongs.json中配置
"terminal.integrated.profiles.windows": {
  "PowerShell -NoProfile": {
  "source": "PowerShell",
  "args": ["-NoProfile"]
  },
  "Git-Bash": {
  "path": "D:\\Git\\bin\\bash.exe",
  "args": []
  }
},
"terminal.integrated.defaultProfile.windows": "Git-Bash"
```

配置fnm安装地址关联的环境变量

在 Powershell 中输入：`fnm env --use-on-cd | Out-String | Invoke-Expression`

## cross-env

```bash
## cross-env
- cross-env 是运行跨平台设置和使用环境变量的脚本。cross-env 使得可以使用单个命令而不必担心为平台正确设置或使用环境变量。

- 出现原因：当使用如 `NODE_ENV=production` 来设置环境变量时，大多数 Windows 命令提示符将会阻塞(报错)。（异常是Windows上的 Bash 是使用本机 Bash。即 Windows 不支持 `NODE_ENV=production` 的设置方式）

- 安装：`npm i --save-dev cross-env`

```

```bash
# 在Windows中
    #node中常用的到的环境变量是NODE_ENV，首先查看是否存在
    set NODE_ENV

    #如果不存在则添加环境变量
    set NODE_ENV=production

    #环境变量追加值 set 变量名=%变量名%;变量内容
    set path=%path%;C:\web;C:\Tools

    #某些时候需要删除环境变量
    set NODE_ENV=


# 在linux中配置
    #node中常用的到的环境变量是NODE_ENV，首先查看是否存在
    echo $NODE_ENV

    #如果不存在则添加环境变量
    export NODE_ENV=production

    #环境变量追加值
    export path=$path:/home/download:/usr/local/

    #某些时候需要删除环境变量
    unset NODE_ENV

    #某些时候需要显示所有的环境变量
    env
```



## npm 常用命令

### 基础

#### npm 帮助

`npm help` 命令提供了快速查询所有选项：

```bash
npm help
```

它可以帮助我们无论是否在线/离线状态下，都可以快速查看 npm 提供的所有选项。

还可以显示特定 npm 命令的帮助：

```bash
npm help <command>
# or
npm <command> -h
```



#### npm 的全局配置文件

npm 配置文件是 `.npmrc`，全局配置文件默认在用户目录下。

如果没有找到，可以通过以下命令查看：

```bash
npm config get userconfig
```

您可以查看该文件的所有 npm 配置信息。

以下是其他一些便捷的命令。

查看所有配置项：

```bash
npm config ls -l
```

查看缓存配置，`get` 后面可以跟任意配置项

```bash
npm config get cache
```

打开全局 `.npmrc` 文件，：

```bash
npm config edit
```



#### 设置镜像源

npm cli 还可以安装其他来源的包：

```bash
npm config set xxx

# 淘宝镜像
npm config set registry https://registry.npmmirror.com
```

查看是否切换成功：

```bash
npm config get registry
```

如果返回设置的源链接，说明镜像设置成功。

> **Tips**：您可以安装 [nrm](https://github.com/Pana/nrm) 包在不同源之间快速切换，例如 `npm`、`cnpm`、`taobao` 等。



#### 使用快捷方式安装包

安装依赖项：

```bash
npm install <package_name>
npm i <package_name>
```

安装开发环境依赖：

```bash
npm install --save-dev <package_name>
npm i -D <package_name>
```

安装生产环境依赖（默认）：

```bash
npm install --save-prod <package_name>
npm i -P <package_name>
```

全局安装软件包：

```bash
npm install --global <package_name>
npm i -g <package_name>
```

同时安装多个包：

```bash
npm i express cheerio axios
```

安装具有相同前缀的多个包：

```bash
npm i eslint-{plugin-import,plugin-react,loader} express
```

额外的，当你需要指定包版本时，可以使用 `@` 符号：

```bash
npm i vue@3.2.25
npm i -g webpack@5.58.0
```

检查 npm 包的所有版本，可以在下面的**检查任何 npm 包的最新版本**找到。



#### 检测当前镜像源的延迟

检测当前镜像源的延迟情况：

```bash
npm ping
```



### `package.json`

当创建一个 Node 项目时， 需要创建一个 package.json 文件，描述这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。

可以在命令行使用 `npm help package.json` 命令，将跳转到页面，查看这些字段如何使用。



#### 初始化 package.json

`npm init` 命令是一个逐步构建项目的工具。

```bash
npm init
```

根据提示填写内容，也可以按提供的默认值一路回车（Enter）。

为了省去上面的操作，加上 `--yes` 标志将自动使用默认值 `npm init` 填充所有选项：

```bash
npm init --yes
npm init -y
```

完成以上面操作后，将会生成一个 `package.json` 文件并将其放置在当前目录中。

可以通过 `npm config set` 配置常用的默认字段值：

```bash
npm config set init-author-name "willysliang"
npm config set init-author-email "willysliang@qq.com"
npm config set init-author-url "https://github.com/willysliang"
npm config set init-license "MIT"
# ...
```

> **Tips**：可以打开全局的 `.npmic` 文件配置统一配置它们。



#### 基础信息

`name` 项目名

```json
{
  "name": "node"
}
```

`version` 描述项目的当前版本号

```json
{
  "version": "0.1.0"
}
```

`description` 项目的描述

```json
{
  "description": "My package"
}
```

`main` 指定项目的主入口文件

```json
{
  "main": "index.js"
}
```

`author` 项目作者信息，贡献者。它可以有两种写法。`email` 和 `url` 是可选的。

```json
// 方式一：
{
  "name" : "willysliang",
  "email" : "willysliang@qq.com",
  "url" : "https://github.com/willysliang/core"
}

// 方式二：
{
  "author": "willysliang <willysliang@qq.com> (https://github.com/willysliang/core)"
}
```

`keywords` 使用相关关键字描述项目

```json
{
  "keywords": ["admin", "node", "node"]
}
```

`license` 许可证（告诉用户可以做什么和不能做什么，常见：MIT、BSD-3-Clause）

```json
{
  "keywords": "MIT"
}
```

`scripts` 指定运行脚本命令的 npm 命令行缩写，比如 start 指定了运行 `npm run start` 时，所要执行的命令。

```json
{
  "scripts": {
    "start": "node ./bin/xxx"
  }
}
```

`repository` 字段用于指定代码存放的位置。

```json
{
  "repository": {
    "type": "git",
    "url": "这里写上项目在 github 上的地址"
  }
}
```

也可以添加 `-y` 标志来生成默认的 `package.json` 文件：
使用 `npm init -y` 默认生成的 `package.json` 文件会少一个 `repository` 字段，需要的话可以手动添加上去。

```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

#### 依赖

[`dependencies`](https://github.com/npm/npm/blob/2e3776bf5676bc24fec6239a3420f377fe98acde/doc/files/package.json.md#dependencies) 字段指定了生产环境项目的依赖。当你添加生产环境依赖时，他会自动生成，如：`npm i express`

```json
{
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

[`devDependencies`](https://github.com/npm/npm/blob/2e3776bf5676bc24fec6239a3420f377fe98acde/doc/files/package.json.md#devdependencies) 字段指定了开发环境项目的依赖。当你添加生产环境依赖时，他会自动生成，如：`npm i eslint -D`

```json
{
  "devDependencies": {
    "eslint": "^6.7.2"
  }
}
```

[`peerDependencies`](https://github.com/npm/npm/blob/2e3776bf5676bc24fec6239a3420f377fe98acde/doc/files/package.json.md#peerdependencies) 兼容性依赖。如果你的包是插件，适合这种方式。

```json
{
  "peerDependencies": {
    "tea": "2.x"
  }
}
```

[`optionalDependencies`](https://github.com/npm/npm/blob/2e3776bf5676bc24fec6239a3420f377fe98acde/doc/files/package.json.md#optionaldependencies) 如果你想在某些依赖即使没有找到，或则安装失败的情况下，npm 都继续执行。那么这些依赖适合放在这里。

```json
{
  "optionalDependencies": {}
}
```

`bundledDependencies` 发布包时捆绑的包名数组

```json
{
  "bundledDependencies": ["renderized", "super-streams"]
}
```



#### NPM scripts

`npm scripts` 用于自定义脚本，例如：

```bash
npm run env
```

上面的命令是 `npm cli` 为我们提供的一个脚本命令，用于列出程序内的所有环境变量。

通常可以在 `package.json` 内的 `scripts` 定义我们的脚本命令，例如：

```json
{
  "name": "app-project",
  "scripts": {
    "serve": "nodemon app.js"
  }
}
```

可以通过运行 `npm run serve` 来启动我们的应用程序。

可以使用不带参数的 `npm run` 命令查看项目上的所有命令脚本：

```bash
npm run

#  serve
#    nodemon app.js
```

> **注意**：每当 `npm run` 命令，都会新建一个 shell 文件来执行我们当前的执行的命令，只要符合 shell 可运行的命令，都可以执行。

在执行 `npm scripts` 的过程中，可以通过 `npm_package_xxx` 前缀拿到 `package.json` 内的字段。

例如，获取 `name` 字段：

```js
console.log(process.npm_package_name) // app-project
```



#### 配置自定义变量

`config` 字段中的键作为 `env` 环境变量公开给脚本。

可以在 `package.json` 内的 `config` 字段添加自己的自定义变量，当用户执行 `npm run start` 命令时，这个脚本就可以得到值。

执行以下命令将看到刚才所配置的变量，它以 `npm_package_config_` 为前缀。

```json
{
  "name": "app-project",
  "config": {
    "foo": "hello"
  }
}
```

```bash
npm run env | grep npm_package_config_
```

项目中获取自定义变量：

```js
console.log(process.npm_package_config_myVariable) // hello
```

**注意**：`config` 字段内的变量可以在输入命令时被覆盖：

```bash
npm config set app-project:foo hi Node
```



#### lint-staged

在代码提交之前，进行代码规则检查能够确保进入 git 库的代码都是符合代码规则的。但是整个项目上运行 lint 速度会很慢，lint-staged 能够让 lint 只检测暂存区的文件，所以速度很快。

**安装与配置**：`husky` 和 `lint-staged`

```bash
npm i husky lint-staged -D
```

`package.json` 中配置：

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": "eslint --fix"
  }
}
```

`git commit` 时触发 `pre-commit` 钩子，运行 `lint-staged` 命令，对 `*.js` 执行 `eslint` 命令。`eslint` 要提前配置好。

#### 其他

`homepage` 项目首页的网址。

```json
{
  "homepage": "https://github.com/willysliang/core"
}
```

`bugs` 项目的问题追踪系统的 URL 或邮箱地址，这些对遇到软件包问题的人很有帮助。

```json
{
  "bugs": {
    "url": "http://github.com/owner/project/issues",
    "email": "project@hostname.com"
  }
}
```

`bin` 很多的包都会有执行文件需要安装到 PATH 中去。这个字段对应的是一个 Map，每个元素对应一个**{ 命令名：文件名 }**。这些可执行文件的头部需要加上 `#!/usr/bin/env node`。

```json
{
  "bin": {
    "npm": "./cli.js",
    "command": "./bin/command"
  }
}
```

`private` 是一个布尔值。如果 private 为 true，可以保证包不会被发布到 npm。这可以防止私有 repositories 不小心被发布出去。

`preferGlobal` 是一个布尔值。如果你的包是个命令行应用程序，需要全局安装，就可以设为 true。

```json
{
  "private": true,
  "preferGlobal": true
}
```

`browserslist` 指定项目所支持的浏览器版本。

```json
{
  "browserslist": [
    "last 3 Chrome versions",
    "last 3 Firefox versions",
    "Safari >= 10",
    "Explorer >= 11"
  ]
}
```

`engines` 字段指明了该项目运行的平台，比如 Node 的某个版本或者浏览器，也可以指定适用的 `npm` 版本。

```json
{
  "engines": {
    "node": ">= 12.16.2",
    "npm": ">= 6.14.8"
  }
}
```

`man` 用来指定当前项目的 man 文档的位置。

```json
{
  "man": ["./doc/calc.1"]
}
```

`style` 指定供浏览器使用时，样式文件所在的位置。样式文件打包工具 parcelify，通过它知道样式文件的打包位置。

```json
{
  "style": ["./node_modules/tipso/src/tipso.css"]
}
```

`cpu` 指定 CPU 型号。

```json
{
  "cpu": ["x64", "ia32"],
  "cpu": ["!arm", "!mips"]
}
```

`os` 指定项目可以在什么操作系统上运行。

```json
{
  "os": ["darwin", "linux"]
}
```

`files` 当你发布项目时，具体哪些文件会发布上去。如果需要把某些文件不包含在项目中，添加一个 `.npmignore` 文件。这个文件和 `gitignore` 类似。

```json
{
  "files": ["src", "dist/*.js", "types/*.d.ts"]
}
```

`publishConfig` 是一个布尔值。如果你的包是个命令行应用程序，需要全局安装，就可以设为 true。

`engineStrick` 是一个布尔值。如果你肯定你的程序只能在制定的 engine 上运行，设置为 true。

还有一些特殊的字段，比如 `prettier`、`unpkg`、`babel`、`jest` 等，他们配合工具使用。

#### 根据 package.json 内容自动生成 README.md 文件

对于任何开源项目来说，最重要的文档就是 README。

这里介绍一个好用的工具 [`readme-md-generator`](https://github.com/lio-zero/readme-md-generator)，它将根据 `package.json` 文件内容自动生成漂亮 README 文件

`readme-md-generator` 能够读取您的环境（`package.json`，git 配置等），创建项目的 README 文件。

以下是该模式提供的一个示例演示：

![使用示例](./image/18281896-f3c63011175001bf-1725004135089.gif)

##### 基本配置

确保已安装 [npx](https://www.npmjs.com/package/npx)（自 npm 以来默认 `npx` `5.2.0`)

只需在项目根部运行以下命令并回答问题：

```bash
npx readme-md-generator
```

或使用 `-y` 标志默认生成：

```bash
npx readme-md-generator -y
```

假设我们有如下配置：

```json
{
  "name": "vue3",
  "version": "0.1.0",
  "private": true,
  "description": "vue3-demo",
  "author": "willysliang <willysliang@qq.com>",
  "license": "MIT",
  "engines": {
    "node": ">= 12.16.2",
    "npm": ">= 6.14.8"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/willysliang/core.git"
  },
  "homepage": "https://github.com/willysliang/core.git#readme",
  "keywords": ["vue3", "cli"],
  "scripts": {},
  "dependencies": {},
  "devDependencies": {}
}
```



### 包信息

#### 打开包的包主页、储存库和 issues

在查找 npm 包的文档时，我们经常使用 Google 搜索其主页和 npm 页面。

但也有其他更快速的方法，我们可以通过运行以下命令快速进入主页：

```bash
npm home <package_name>
# or
npm docs <package_name>

# 例如：
npm home axios
npm home vue
```

导航到 issues：

```bash
npm bug <package_name>
```

打开它的存储库：

```bash
npm repo <package_name>

# 例如：
npm repo axios
npm repo vue
```

这几个命令都将在默认浏览器中打开目标网站，它们通常会通过 `package.json` 文件所提供的信息进行检索。



#### npm root 定位全局节点模块目录

```bash
# 本地 node_modules
npm root

# 全局 node_modules
npm root -g
```



### 移除/清理

#### 干净安装你的包依赖

`npm ci` 用于清除安装包依赖项。它通常用于自动化环境，如 CI/CD 平台。

```bash
npm ci
```

它与 `npm install` 有以下不同之处：

- 它安装的是 `package-lock.json` 中提到的包的确切版本。
- 删除现有的 `node_modules` 并运行新的安装。
- 它不会写信给你的 `package.json`或 `*-lock` 文件。
- 它不会安装与 npm install 类似的单个软件包。



#### 删除重复包

`npm dedupe` 命令用于删除重复的依赖项。它通过删除重复的包并在多个依赖包之间有效地共享公共依赖项来简化整体结构。它会产生一个扁平的和去重的树。

```bash
npm dedupe
# or
npm ddp
```



#### 清理 npm 缓存

磁盘满了，试着清楚 npm 缓存：

```bash
npm cache clean --force
yarn cache clean
pnpm store prune
```



#### 安装依赖问题

```bash
### ETIMEDOUT
问题：connect ETIMEDOUT 104.16.26.34:443

解决方案：
1. 清除缓存
$ npm config set proxy false

2. 如果报错，继续强制清除
$ npm cache clean --force

3. 重新执行安装步骤
$ npm i
```



### 检查

#### 扫描应用程序是否存在漏洞

`npm audit` 检查项目依赖项是否存在漏洞。它可以看出有风险的 package、依赖库的依赖链、风险原因及其解决方案。

```bash
npm audit
```

如果发现存在漏洞，可以使用 `npm audit fix`，它将自动安装所有易受攻击依赖包的修补版本（如果可用）。

```bash
npm audit fix
# or
npm audit fix --force
```

更好的做法是使用 [synk](https://github.com/snyk/cli)，它是一个高级版的 `npm audit`，可自动修复，且支持 CI/CD 集成与多种语言。

```bash
npx snyk
```



#### 检查环境

`npm doctor` 命令可以在我们的环境中运行多项检查，已检查当前 node 和 npm 存在的问题。

```bash
npm doctor
```



#### 检查过时的包

使用 `npm outdated` 命令来检查所有过时的 npm 包。它还显示了应该为任何过时的软件包安装的最新版本。

```bash
npm outdated --long
# or
npm outdated -l
```

#### 检查任何 npm 包的最新版本

我们可以通过运行以下命令来检查任何已发布的 npm 包的最新版本的详细信息：

```bash
npm view <package_name>
# or
npm v <package_name>
npm info <package_name>
npm show <package_name>
```

仅显示最新版本号：

```bash
npm v <package_name> version
```

显示所有版本的列表：

```bash
npm v <package_name> versions
```

#### 列出所有已安装的包

`npm list` 命令可以列出项目中安装的所有 npm 包。它将创建一个树结构，显示已安装的包及其依赖项。

```bash
npm list
#or
npm ls
```

- 可以利用 `--depth flag` 来限制搜索深度

```bash
npm ls --depth=1

# 查看全局安装的软件包
npm list -g --depth 0
```



#### 查找未使用的 npm 依赖项

`depcheck` 可以用来扫描代码并识别任何未使用的依赖项。

```bash
npx depcheck
```

如果有任何未使用的依赖项，将看到类似于以下的输出：

```txt
Unused dependencies
* eslint
* node-cron
* rss-parser
* uuid
* zlib
```

另外 `depcheck` 还将识别您正在使用的、未在 `package.json` 文件中明确列出的任何依赖项，如下所示：

```txt
Missing dependencies
* type-fest
```

还可以使用 `depcheck` 以在提交/推送时自动运行这些检查以确保您或其他开发者不会安装到这些未使用的依赖项。



### 更新

#### 更新软件包

`npm update` 命令用于更新软件包：

```bash
npm update <name>
npm update <name> -g
npm update <name> -D
```

为了便于查看依赖信息，我们可以安装 `npm-check` 包，它用于检查过时、不正确和未使用的依赖项。

```bash
npm i -g npm-check
```

运行以下命令：

```bash
npm-check -u
```

它将显示用于选择要更新的模块的交互式 UI。替代的还有 [`npm-check-updates`](https://www.npmjs.com/package/npm-check-updates)。



#### 查看哪些包已过时

查看哪些包已过时：

```bash
npm outdated
```

查看全局环境的已过时包：

```bash
npm outdated -g --depth=0
```



#### 锁定包依赖

[npm shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap) 命令用于锁定包依赖项的版本，以便您可以准确控制在安装包时将使用每个依赖项的哪些版本。

```bash
npm shrinkwrap
```

它在部署 Node.js 应用程序时非常有用。通过它，您可以确定要部署哪些版本的依赖项。



### 自定义包

#### 在本地测试你的 npm 包

我们可以将本地开发的 npm 包安装到全局或指定目录。

```bash
npm i . -g
# 在某个项目中安装本地包
npm i /path/to/packageName
```

还可以使用 `npm link` 命令做一个软链指向当前需要测试的项目：

```bash
# 先在本地开发的 npm 包中执行
npm link

# 然后切换到你需要安装本地测试包的项目中
npm link <package_name>
```

使用 `npm unlink` 可以取消安装本地的调试包：

```
npm unlink <package_name>
```



#### 发布一个包

首先，需要使用 `npm login` 登录：

```bash
npm login
```

然后，在使用 `npm publish` 发布项目：

```bash
npm publish
```



#### 控制项目版本号

当我们发布 npm 包后，每次我们要推送新版本时，都需要修改版本号的，这时可以通过 `npm version` 命令进行设置：

```bash
# 新补丁版本表示向后兼容的错误修复
npm version patch

# 新的次要版本表示向后兼容的新功能
npm version minor

# 新的主要版本表示重大更改
npm version major
```



#### 弃用发布的包

> **注意**：强烈建议弃用包或包版本而不是取消发布它们，因为取消发布会从注册表中完全删除一个包，这意味着任何依赖它的人都将无法再使用它，而不会发出警告。

弃用整个包：

```bash
npm deprecate <package_name> "弃用信息"
```

弃用包的单个版本：

```bash
npm deprecate <package_name>@<version> "弃用信息"
```

取消弃用操作：

```bash
# 将弃用消息改为空字符串即可
npm deprecate <package_name> ""
```

取消发布整个包：

```bash
npm unpublish <package_name> -f
```

取消发布包的指定版本：

```bash
npm unpublish <package_name>@<version>
```

取消发布包后，以相同名称重新发布将被阻止 24 小时。如果您错误地取消发布了一个包，建议您以不同的名称再次发布，或者对于未发布的版本，增加版本号并再次发布。



## 模块化 CommonJS

```bash
## 模块化
- nodejs 是一种 javascript 的运行环境，能够使得 javascript 脱离浏览器运行。
- node 的加载机制：node 会把整个待加载的 js 文件放入一个包装 load 中执行。在执行整个 load 函数前Node 会调用 module 变量。
- 模块化的好处：防止命名冲突、高复用性、高维护性。


### CommonJS
CommonJS 是 NodeJS 使用的模块化规范。
CommonJS 规范规定：每个模块内部，module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即`module.exports`）是对外的接口对象。加载某个模块其实是加载该模块的 `module.exports` 对象。

在 CommonJS 中每个文件都可以当作一个模块：
  - 在服务端：模块的加载是运行时同步加载的。
  - 在客户端：模块需要提前编译打包处理。因为同步容易引起阻塞，且浏览器不认识 require 语法，因此需要提前编译打包。
- 不限node版本的情况下，如果不声明严格模式`'use strict';`，往往es6语法不支持启动。


### 模块暴露：exports 和 module.exports 的区别
- 模块暴露数据的方式有两种：
    1. module.exports = value
    2. exports.propName = value

- Node 中每个模块的最后都会执行 `return module.exports`。
- Node 中每个模块都会把 module.exports 指向的对象赋值给一个变量 exports，并且初始化为空对象`{}`。
		- 即存在隐式关系：`exports = module.exports = {}`。
		- 不能使用 `exports = value` 的形式暴露数据的原因：在通过 require 引入数据时，是引用 module.exports 里面的数据，`exports = value` 不能让 module.exports 里面的数据发生变化。
		- 能使用  `exports.propName = value` 的形式暴露数据的原因： 因为 module.exports 和 exports 通过隐式赋值关系来共用了同一个对象的内存空间，所以在 `exports.propName = value` 修改属性值时 module.exports 也会同时改变值。



### 引入模块的方式：require
- `const module1 = require('模块名')`
    - 内置模块：require 的是包名。
    - 下载的第三方模块：require 的是包名（会自动在 node_modules 中寻找相应的模块）
    - 自定义模块：require 的是文件路径。文件路径既可以用绝对路径，也可以用相对路径。后缀名 `.js` 可以省略。

- require() 函数的两个作用：
		- 执行导入的模块中的对象。
		- 返回导入模块中的接口对象。

- 导入自定义模块的流程
    1. 将相对路径转为绝对路径，定位目标文件。
    2. 缓存检测（查看之前是否加载过该目标文件，如果加载则取缓存的，无需再次加载）。
    3. 读取目标文件代码。
    4. 包裹成一个立即执行函数（可通过 `arguments.callee.toString()` 查看自执行函数）。
    5. 缓存模块的值。
    6. 返回 module.exports 的值。



### 自定义模块导入目录的加载规则
- 在目录中放置一个`package.json`文件，并且将入口文件写入`main`字段。
- 如果 require 传入的参数字符串是指向一个目录，则会首先检测该目录的`package.json`文件中 `main` 属性对应的文件，然后加载`main` 字段指定的入口文件。如果 main 属性不存在，或者不存在 package.json 文件，则会检测加载目录下的 `index.js` 和 `index.json` 文件，如果还是没找到，则会报错。


#### 模块的缓存
- 第一次加载某个模块时，Node会缓存该模块。以后再加载该模块，就直接从缓存取出该模块的`module.exports`属性。


### 清除模块缓存
- 所有缓存的模块保存在`require.cache`之中
- 注意，缓存是根据绝对路径识别模块的，如果同样的模块名，但是保存在不同的路径，`require`命令还是会重新加载该模块。

    // 删除指定模块的缓存
    delete require.cache[moduleName];

    // 删除所有模块的缓存
    Object.keys(require.cache).forEach((key) => {
      delete require.cache[key];
    })
```

#### 导入模块原理

```js
/**
 * 模块导入 伪代码
 */
function require(file) {
    // 1. 将相对路径转化为绝对路径，定位目标文件
    const absolutePath = path.resolve(__dirname, file)

    // 2. 缓存检测（查看之前是否加载过该目标文件，如果加载则取缓存的，无需再次加载）
    const caches = {}
    if (caches[absolutePath]) {
        return caches[absolutePath]
    }

    // 3. 读取目标文件代码
    const code = fs.readFileSync(absolutePath).toString()

    const module = {}
    const exports = (module.exports = {})

    // 4. 包裹成一个立即执行函数
    ;(function (exports, require, module, __filename, __dirname) {
        var test = {
            name: "willy",
        }
        module.exports = test
        console.log(arguments.callee.toString())
    })(exports, require, module, __filename, __dirname)

    // 5. 缓存模块的值
    caches[absolutePath] = module.exports

    // 6. 返回 module.exports 的值
    return module.exports
}

const m1 = require("./tsconfig.json")
const m2 = require("./tsconfig.json") // 此时取缓存的，不会执行里面首次执行的内容
```



#### 在 nodejs 使用 ES6 导入语法

```bash
ES6 的 模块化（ESM）：一个 JS 文件可以导出一个或多个值，导出的值可以是变量、对象或函数。
	- 引入模块：import
	- 导出值：export
	- 单个文件的默认导出：export default
NodeJS 应用由模块组成，其模块系统采用 CommonJS 规范，它并不是 JS 语言规范的正式组成部分。
	- 加载模块：require
	- 导出模块：module.exports


1. 可以用最简单的方式使用 ES 模块。在创建时，以 `.cjs` 和 `.mjs` 扩展区分使用 CommonJS 还是 ES 模块。
2. 在 NodeJS v14.x.x 以上的版本，在 `package.json` 中设置 `"type": "module"`。
3. 在低于 Node V14 的版本环境引入 `@babel/core` 来支持 ESM 模块化。
```

**在 Node.js 版本 `14.x.x` 以上的版本，在 `package.json` 文件中设置 `"type": "module"` 。**

```json
{
  "type": "module"
}
```

**低于 Node v14 的版本环境需要引入支持 es6 的 babel 库来进行解析。**

安装依赖项：`$ npm i -D @babel/core @babel/preset-env @babel/node`

然后在 Node.js 项目的根目录下创建一个名为 `babel.config.json` 的文件，并添加以下内容：

```json
module.exports = {
  "presets": ["@babel/preset-env"]
}
```

`@babel/node` 包是一个 CLI 实用程序，它在运行 Node.js 项目之前用 Babel 预设和插件编译 JS 代码。这意味着它将在执行 Node 项目之前读取并应用 `babel.config.json` 中提供的任何配置。

运行命令执行脚本时，使用 `babel-node` 替换 `node`。

为了方便使用，在 `package.json` 中配置一个 npm script 来运行 node。

```json
{
  "scripts": {
    "dev": "node --exec babel-node index.js"
  }
}
```



#### 在 ES 模块（Node.js）中导入 JSON 文件

**使用 fs 模块读取和解析 JSON 文件**

```js
import { readFile } from 'fs/promises'

// 使用 fs 模块读取文件并解析
const json = JSON.parse(await readFile(new URL('./some-file.json', import.meta.url)))
```

**利用 CommonJS `require` 方法加载 JSON 文件**

createRequire 允许构造 CommonJS `require` 方法。而 CommonJS 的 require 可以读取 JSON ES 模块。

```js
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const data = require('./data.json')
```

- 二者的区别是 `require` 机制情况下，如果多个模块都加载了同一个 JSON 文件，那么其中一个改变了 JS 对象，其它跟着改变，这是由 Node 模块的缓存机制造成的，只有一个 JS 模块对象
- 第一种方式可以随意改变加载后的 JS 变量，而且各模块互不影响，因为他们都是独立的，是多个 JS 对象。

**import Assertions**

JSON 模块已经存在于 Chrome 91（仅在 Chorme91 中支持），它看起来就像一个 ES Modules 风格的导入，只是在最后设置了类型。

```js
import data from './data.json' assert { type: 'json' }

console.log(data)
```



## 全局对象 global

```bash
Node 全局对象有 `process`、`console`、`Buffer`、`global`、EventLoop 相关 API（`setImmediate`、`setInterval` 和 `setTimeout` 等）及为模块包装所使用的全局对象（`exports`、`module`、`require` 等），它们都不需要您使用 `require()` 即可在 Node 环境中使用。
```



## 操作系统信息 OS

```bash
OS 模块能获取当前计算机操作系统的信息。

os 提供的主要方法：
    - `os.platform()` 操作系统名，例如：`darwin`、`freebsd`、`linux`、`openbsd`、`win32` 等
    - `os.arch()` 操作系统 CPU 架构
    - `os.totalmem()` 返回操作系统中可用总内存的字节数
    - `os.freemem()` 返回操作系统中可用空闲内存的字节数
    - `os.arch()` 返回标识底层架构的字符串，如 `arm`、`x64` 和 `arm64`
    - `os.cpus()` 返回有关系统上可用 CPU 的信息
    - `os.userInfo()` 返回有关当前用户的信息
    - `os.uptime()` 返回计算机自上次重新启动以来已运行的秒数
    - `os.type()` 识别操作系统：Linux、macOS、Windows
    - `os.tmpdir()` 返回分配的临时文件夹的路径
    - `os.release()` 返回一个标识操作系统版本号的字符串
    - `os.networkInterfaces()` 返回系统上可用网络接口的详细信息
    - `os.hostname()` 返回主机名
    - `os.homedir()` 返回当前用户主目录的路径

另外，
    - `os.constants.signals` 告诉我们所有与处理进程信号相关的常量，如 `SIGHUP`、`SIGKILL` 等。
    - `os.constants.errno` 设置错误报告的常量，如 `EADDRINUSE`、`EOVERFLOW` 等。
```

```js
const os = require('os')

console.log('Platform: ' + os.platform()) // Platform: win32
console.log('Architecture: ' + os.arch()) // Architecture: x64
console.log('total memory : ' + os.totalmem() + ' bytes.') // total memory : 31194900400 bytes.
console.log('free memory : ' + os.freemem() + ' bytes.') // free memory : 30666943900 bytes.
```



## 进程 process

```bash

```

#### 环境变量 process.env

```js
if (process.env.NODE_ENV === 'production') {
  console.log('生产环境');
} else {
  console.log('非生产环境');
}
```

运行命令 `NODE_ENV=production node env.js`，将输出 `非生产环境`。



#### 异步：process.nextTick(fn)

```bash
process.nextTick 的作用是把回调函数作为微任务，放入事件循环的任务队列中。

因为 nodejs 并不适合计算密集型的应用，一个进程就一个线程，在当下时间点上，就一个事件在执行。那么，如果我们的事件占用了很多 cpu 时间，那么之后的事件就要等待非常久。所以，nodejs 的一个编程原则是尽量缩短每一个事件的执行事件。process.nextTick 的作用就在这，将一个大的任务分解成多个小的任务

process.nextTick(fn) 虽然跟 setTimeout(fn, 0) 类似，但实际有实现及性能上的差异：

	


在浏览器端，nextTick 会退化成 setTimeout(callback, 0)。
但在 nodejs 中请使用 nextTick 而不是 setTimeout，前者效率更高，并且严格来说，两者创建的事件在任务队列中顺序并不一样。
	- process.nextTick(fn) 将 fn 放到 node 事件循环的 下一个tick 里；
	- setTimetout(fn, 0) 将回调函数作为宏任务中的异步任务，放到事件循环的任务队列中。
	- 宏任务中的同步任务 -> 微任务 -> 宏任务中的异步任务 -> 下一次循环中的同步任务
```

```js
setTimeout(function() {
  console.log("第一个1秒");
  process.nextTick(function() {
    console.log("第一个1秒：nextTick");
  });
}, 1000);

setTimeout(function() {
  console.log("第2个1秒");
}, 1000);

console.log("我要输出1");

process.nextTick(function() {
  console.log("nextTick");
});

console.log("我要输出2");

/*
	输出：
    我要输出1
    我要输出2
    nextTick
    第一个1秒
    第一个1秒：nextTick
    第2个1秒
*/
```



#### 获取命令参数

```bash
process.argv 获取传给 node 的参数。例如 `node --harmony script.js --version` 中，`--harmony` 就是传给 node 的参数。
process.execArgv 获取传给进程的参数。例如 `node script.js --version --help` 中，`--version --help` 就是传给进程的参数。


process.argv 与 process.execArgv 返回一个数组，数组元素分别如下：
	- 元素1：node
	- 元素2：可执行文件的绝对路径
	- 元素x：其他，比如参数等
```

```js
// 命令行执行：node --harmony execArgv.js --nick chyingp

// execArgv.js
process.execArgv.forEach((val, index) => {
  console.log(index + ': ' + val)
})
// 输出：
// 0: --harmony

process.argv.forEach((val, index) => {
  console.log(index + ': ' + val)
})
// 输出：
// 0: /Users/a/.nvm/versions/node/v6.1.0/bin/node
// 1: /Users/a/Documents/execArgv.js
// 2: --nick
// 3: chyingp
```



#### 处理工作目录

```bash
- process.cwd()：返回当前工作目录
- process.chdir(directory)：切换当前工作目录，失败后会抛出异常
```

````js
console.log('Starting directory: ' + process.cwd())
try {
  process.chdir('/tmp')
  console.log('New directory: ' + process.cwd())
} catch (err) {
  console.log('chdir: ' + err)
}

/**
 * 输出如下：
  Starting directory: /Users/a/Documents/2016.11.22-node-process
  New directory: /private/tmp
 */
````



#### 处理异常

**uncaughtException 事件：来处理未捕获的异常**

Nodejs 可以通过 try-catch 来捕获异常。如果异常未捕获，则会一直从底向事件循环冒泡。如是冒泡到事件循环的异常没被处理，那么就会导致当前进程异常退出。

可以通过监听 process 的 uncaughtException 事件，来处理未捕获的异常。

```js
process.on("uncaughtException", (err, origin) => {
  console.log(err.message);
});

const a = 1 / b;
console.log("abc"); // 不会执行

// 控制台的输出是：b is not defined。捕获了错误信息，并且进程以0退出
```



**unhandledRejection 事件**

如果一个 Promise 回调的异常没有被`.catch()`捕获，那么就会触发 process 的 unhandledRejection 事件：

```javascript
process.on("unhandledRejection", (err, promise) => {
    console.log(err.message);
});

Promise.reject(new Error("错误信息")); // 未被catch捕获的异常，交由unhandledRejection事件处理
```



**warning 事件**

告警不是 Node.js 和 Javascript 错误处理流程的正式组成部分。 一旦探测到可能导致应用性能问题，缺陷或安全隐患相关的代码实践，Node.js 就可发出告警。

比如前一段代码中，如果出现未被捕获的 promise 回调的异常，那么就会触发 warning 事件。



**警告信息:process.emitWarning(warning)**

用来抛出警告信息。

```js
process.emitWarning('Something happened!');
// (node:50215) Warning: Something happened!
```

可以

```js
process.emitWarning('Something Happened!', 'CustomWarning');
// (node:50252) CustomWarning: Something Happened!
```

可以对其进行监听

```js
process.emitWarning('Something Happened!', 'CustomWarning');

process.on('warning', (warning) => {
  console.warn(warning.name);
  console.warn(warning.message);
  console.warn(warning.stack);
});

/*
(node:50314) CustomWarning: Something Happened!
CustomWarning
Something Happened!
CustomWarning: Something Happened!
    at Object.<anonymous> (/Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.22-node-process/emitWarning.js:3:9)
    at Module._compile (module.js:541:32)
    at Object.Module._extensions..js (module.js:550:10)
    at Module.load (module.js:456:32)
    at tryModuleLoad (module.js:415:12)
    at Function.Module._load (module.js:407:3)
    at Function.Module.runMain (module.js:575:10)
    at startup (node.js:160:18)
    at node.js:445:3
*/  
```

也可以直接给个Error对象

```js
const myWarning = new Error('Warning! Something happened!');
myWarning.name = 'CustomWarning';

process.emitWarning(myWarning);
```



#### 标准流对象

```bash
process 提供了 3 个标准流。需要注意的是，它们有些在某些时候是同步阻塞的
	- process.stderr：标准错误是程序写入错误消息并调试数据的流。WriteStream 类型，console.error的底层实现，默认对应屏幕
	- process.stdout：标准输出是程序将其输出数据写入的流。WriteStream 类型，console.log的底层实现，默认对应屏幕
	- process.stdin：ReadStream 类型，默认对应键盘输入
```

```js
process.stdin.setEncoding('utf8')

process.stdin.on('readable', () => {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {
    process.stdout.write(`data: ${chunk}`)
  }
})

process.stdin.on('end', () => {
  process.stdout.write('end')
})

/*
	通过 process.stdin 读取用户输入同时，通过 Process.stdout 将内容输出到控制台
      hello
      data: hello
      world
      data: world
*/
```



#### 用户组/用户 相关

```bash
- process.seteuid(id) 与 process.geteuid()：获得当前用户的id。（POSIX平台上才有效）
- process.setegid(id) 与 process.getegid()：获得当前有效群组的id。（POSIX平台上才有效）
- process.setgid(id) 与 process.getgid()：获得当前群组的id。（POSIX平台上才有效，群组、有效群组 的区别，请自行谷歌）
- process.setroups(groups) 与 process.getgroups()：获得附加群组的id。（POSIX平台上才有效，
- process.setgroups(groups) 与 process.getgroups()：获取群组信息
- process.initgroups(user, extra_group)：初始化群组
```



#### 进程消息

##### 当前进程信息

- process.pid：返回进程id。
- process.title：可以用它来修改进程的名字，当用ps命令，同时启动多个node进程时发挥作用。



##### 进程运行所在环境

- process.arch：返回当前系统的处理器架构（字符串），比如'arm', 'ia32', or 'x64'。
- process.platform：返回关于平台描述的字符串，比如 darwin、win32 等。



##### 运行情况/资源占用情况

- process.uptime()：当前node进程已经运行了多长时间（单位是秒）。
- process.memoryUsage()：返回进程占用的内存，单位为字节。输出内容大致如下：

```js
{ 
    rss: 19181568, 
    heapTotal: 8384512, // V8占用的内容
    heapUsed: 4218408 // V8实际使用了的内存
}
```

- process.cpuUsage([previousValue])：CPU使用时间耗时，单位为毫秒。user表示用户程序代码运行占用的时间，system表示系统占用时间。如果当前进程占用多个内核来执行任务，那么数值会比实际感知的要大。

```js
const startUsage = process.cpuUsage();
// { user: 38579, system: 6986 }

// spin the CPU for 500 milliseconds
const now = Date.now();
while (Date.now() - now < 500);

console.log(process.cpuUsage(startUsage));
// { user: 514883, system: 11226 }
```

- process.hrtime()：一般用于做性能基准测试。返回一个数组，数组里的值为 [[seconds, nanoseconds] （1秒等10的九次方毫微秒）。 注意，这里返回的值是相对于过去一个随机的时间，所以本身没什么意义。仅当你将上一次调用返回的值做为参数传入，才有实际意义。 

```js
const time = process.hrtime();

setInterval(() => {
  const diff = process.hrtime(time);

  console.log(`Benchmark took ${diff[0] * 1e9 + diff[1]} nanoseconds`);
}, 1000);

/*
	输出如下：
    Benchmark took 1006117293 nanoseconds
    Benchmark took 2049182207 nanoseconds
    Benchmark took 3052562935 nanoseconds
    Benchmark took 4053410161 nanoseconds
    Benchmark took 5056050224 nanoseconds
*/
```



##### node可执行程序相关信息

- process.version：返回当前node的版本，比如'v6.1.0'。
- process.versions：返回node的版本，以及依赖库的版本，如下所示。

```js
{ 
  http_parser: '2.7.0',
  node: '6.1.0',
  v8: '5.0.71.35',
  uv: '1.9.0',
  zlib: '1.2.8',
  ares: '1.10.1-DEV',
  icu: '56.1',
  modules: '48',
  openssl: '1.0.2h'
}
```

- process.release：返回当前node发行版本的相关信息，大部分时候不会用到。具体字段含义可以看这里。

```js
{
  name: 'node',
  lts: 'Argon',
  sourceUrl: 'https://nodejs.org/download/release/v4.4.5/node-v4.4.5.tar.gz',
  headersUrl: 'https://nodejs.org/download/release/v4.4.5/node-v4.4.5-headers.tar.gz',
  libUrl: 'https://nodejs.org/download/release/v4.4.5/win-x64/node.lib'
}
```

- process.config：返回当前 node版本 编译时的参数，同样很少会用到，一般用来查问题。
- process.execPath：node可执行程序的绝对路径，比如 '/usr/local/bin/node'



#### 向进程发送信号并关闭进程：process.kill(pid, signal)

process.kill() 这个方法先向进程发送信号，并关闭进程。

```js
console.log('hello');

process.kill(process.pid, 'SIGHUP');

console.log('world');
```

输出如下，可以看到，最后一行代码并没有执行，因为向当前进程发送 SIGHUP 信号，进程退出所致。

```shell
hello
[1]    50856 hangup     node kill.js
```

可以通过监听 SIGHUP 事件，来阻止它的默认行为。

```js
process.on('SIGHUP', () => {
  console.log('Got SIGHUP signal.');
});

console.log('hello');
process.kill(process.pid, 'SIGHUP');
console.log('world');
```

测试结果比较意外，输出如下：（osx 10.11.4），SIGHUP 事件回调里的内容并没有输出。

```shell
hello
world
```

猜测是因为写标准输出被推到下一个事件循环导致（类似process.exit()小节提到的），再试下

```js
process.on('SIGHUP', () => {
  console.log('Got SIGHUP signal.');
});

setTimeout(function(){
  console.log('Exiting.');
}, 0);

console.log('hello');

process.kill(process.pid, 'SIGHUP');

console.log('world');
```

输出如下

```shell
hello
world
Exiting.
Got SIGHUP signal.
```



#### 终止进程

##### process.exit() vs process.exitCode

- `process.exit([exitCode])` 可以用来立即退出进程。即使当前有操作没执行完，比如 process.exit() 的代码逻辑，或者未完成的异步逻辑。
- 但不推荐直接使用 process.exit()，这会导致事件循环中的任务直接不被处理，以及可能导致数据的截断和丢失（例如 stdout 的写入）。
  - 写数据到 process.stdout 之后，立即调用 process.exit() 是不保险的，因为在node中往 stdout 写数据是非阻塞的，可以跨越多个事件循环，所以可能会存在写数据写到一半退出进程导致无法写入数据完成。比较保险的做法是，通过process.exitCode设置退出码，然后等进程自动退出。
- 如果程序出现异常，必须退出不可，那么，可以抛出一个未被捕获的error，来终止进程，这个比 process.exit() 安全。 

不推荐写法

```js
setTimeout(() => {
    console.log("我不会执行");
});

process.exit(0);
```

正确安全的处理是，设置 process.exitCode，并允许进程自然退出。

```js
setTimeout(() => {
    console.log("我不会执行");
});

process.exitCode = 1;
```



##### 事件

```bash
用于处理进程退出的事件有：beforeExit 事件 和 exit 事件。


#### beforeExit 事件
beforeExit 事件在进程退出之前（清空其事件循环并且没有其他工作要安排时）触发，参数为 exitCode。
	- 如在退出时做一些异步操作，可以写在 beforeExit 事件中。
	- 当 EventLoop 清空后显示调用 process.exit() 退出，或者未捕获的异常导致退出，beforeExit 不会触发。
	- 注意：在 beforeExit 事件中如果是异步任务，那么又会被添加到任务队列中。当任务队列完成所有任务后，则又会触发 beforeExit 事件。因此需要处理这种情况来避免出现死循环。


#### exit 事件
在 exit 事件中，只能执行同步操作。在调用 'exit' 事件监听器之后，Node.js 进程将立即退出，从而导致在事件循环中仍排队的任何其他工作被放弃。
```

```js
let hasSend = false;
process.on("beforeExit", () => {
    if (hasSend) return; // 避免死循环

    setTimeout(() => {
        console.log("mock send data to serve");
        hasSend = true;
    }, 500);
});

console.log(".......");

// 输出：
// .......
// mock send data to serve
```



### 进程通信 IPC

```bash
child_process 模块提供了生成子进程的能力，可以给主进程提供优化 CPU 计算、多进程开发问题。


- process.connected：如果当前进程是子进程，且与父进程之间通过IPC通道连接着，则为true；
- process.disconnect()：
		- 断开与父进程之间的IPC通道，此时会将 process.connected 置为false；
		- 首先是 connected.js，通过 fork 创建子进程（父子进程之间创建了IPC通道）
```

```js
const child_process = require('child_process')

child_process.fork('./connectedChild.js', {
  stdio: 'inherit',
})
```

```js
// connectedChild.js
console.log('process.connected: ' + process.connected)
process.disconnect()
console.log('process.connected: ' + process.connected)

// 输出：
// process.connected: true
// process.connected: false
```



#### 创建子进程

```bash
child_process 模块创建子进程的方法：spawn、fork、exec、execFile。
	- fork、exec、execFile 都是通过 spawn 来实现的。
	- exec 默认会创建 shell。execFile 默认不会创建 shell，意味着不能使用 I/O 重定向、file glob，但效率更高。
	- spawn、exec、execFile 都有同步版本，但会造成进程阻塞。



`spawn()` 传递 2 个参数：
    - 第一个参数是要运行的命令。
    - 第二个参数是一个包含选项列表的数组。
		- 如 `spawn('ls', ['-lh', 'test'])` 则将生成命令 `ls -lh test`

调用 `spawn()` 方法的结果是 `ChildProcess` 类的一个实例，用于标识生成的子进程。
```

`child_process.spawn()`的使用：

```javascript
const { spawn } = require("child_process");

// 返回ChildProcess对象，默认情况下其上的stdio不为null
const ls = spawn("ls", ["-lh"]);

ls.stdout.on("data", data => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on("data", data => {
  console.error(`stderr: ${data}`);
});

ls.on("close", code => {
  console.log(`子进程退出，退出码 ${code}`);
});
```

`child_process.exec()`的使用：

```javascript
const { exec } = require("child_process");
// 通过回调函数来操作stdio
exec("ls -lh", (err, stdout, stderr) => {
  if (err) {
    console.error(`执行的错误: ${err}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
```



#### 取消子进程

```js
// 创建一个仅运行 5s 的子进程
// 注意：这里不需要加 await，这里演示 1s 后取消子进程
const subprocess = execa('sleep', ['5s'])

// 1s 后取消子进程
setTimeout(() => {
  subprocess.cancel()
}, 1000)

try {
  const { stdout, stderr } = await subprocess

  console.log({ stdout, stderr })
} catch (error) {
  if (error.isCanceled) {
    console.error(`ERROR: The command took too long to run.`)
  } else {
    console.error(error)
  }
}
```





#### 父子进程通信

`fork()`返回的 ChildProcess 对象，监听其上的 message 事件，来接受子进程消息；调用 send 方法，来实现 IPC。

```javascript
// parent.js

const { fork } = require("child_process");
const cp = fork("./sub.js");
cp.on("message", msg => {
  console.log("父进程收到消息：", msg);
});
cp.send("我是父进程");
```

```javascript
// sub.js

process.on("message", m => {
    console.log("子进程收到消息：", m);
});

process.send("我是子进程");
```

运行后结果：

```shell
父进程收到消息： 我是子进程
子进程收到消息： 我是父进程
```



#### 独立子进程

在正常情况下，父进程一定会等待子进程退出后，才退出。如果想让父进程先退出，不受到子进程的影响，那么应该：

- 调用 ChildProcess 对象上的`unref()`
- `options.detached` 设置为 true
- 子进程的 stdio 不能是连接到父进程

```javascript
// main.js

const { spawn } = require("child_process");
const subprocess = spawn(process.argv0, ["sub.js"], {
    detached: true,
    stdio: "ignore"
});

subprocess.unref();
```

```javascript
// sub.js

setInterval(() => {}, 1000);
```



#### 进程管道

options.stdio 选项用于配置在父进程和子进程之间建立的管道。 默认情况下，子进程的 stdin、 stdout 和 stderr 会被重定向到 ChildProcess 对象上相应的 subprocess.stdin、subprocess.stdout 和 subprocess.stderr 流。 这意味着可以通过监听其上的 `data`事件，在父进程中获取子进程的 I/O 。

必须将子进程的输出通过管道传输到主进程，否则我们将看不到它的任何输出

```js
'use strict'

const fs = require('fs')
const { spawn } = require('child_process')
const filename = 'test'

fs.watch(filename, () => {
  const ls = spawn('ls', ['-lh', filename])
  ls.stdout.pipe(process.stdout)
})
```

可以用来实现“重定向”：

```javascript
const fs = require("fs");
const { spawn } = require("child_process");

const subprocess = spawn("ls", {
  stdio: [
    0, // 使用父进程的 stdin 用于子进程。
    "pipe", // 把子进程的 stdout 通过管道传到父进程 。
    fs.openSync("err.out", "w") // 把子进程的 stderr 定向到一个文件。
  ]
});
```

也可以用来实现"管道运算符"：

```javascript
const { spawn } = require("child_process");

const ps = spawn("ps", ["ax"]);
const grep = spawn("grep", ["ssh"]);

ps.stdout.on("data", data => {
  grep.stdin.write(data);
});

ps.stderr.on("data", err => {
  console.error(`ps stderr: ${err}`);
});

ps.on("close", code => {
  if (code !== 0) {
    console.log(`ps 进程退出，退出码 ${code}`);
  }
  grep.stdin.end();
});

grep.stdout.on("data", data => {
  console.log(data.toString());
});

grep.stderr.on("data", data => {
  console.error(`grep stderr: ${data}`);
});

grep.on("close", code => {
  if (code !== 0) {
    console.log(`grep 进程退出，退出码 ${code}`);
  }
});
```



## URL接口

```bash
## URL 接口（代替内置模块 url）
浏览器原生提供 `URL()` 接口，它是一个构造函数，用来构造、解析和编码 URL。一般情况下，通过 `window.URL` 可拿到这个构造函数。



### URLSearchParams 对象(代替内置模块querystring使用)
URLSearchParams 对象是浏览器的原生对象，用来构造、解析和处理 URL 的查询字符串（即 URL 问号后面的部分）。
它本身也是一个构造函数，可以生成实例。参数可以为查询字符串，起首的问号?有没有都行，也可以是对应查询字符串的数组或对象。

  1. nodejs内置模块querystring有些方法要被废弃，我们使用URLSearchParams API 构造代替
  2. 如果你的nodejs版本大于18，可以使用 `const querystring= require('node:querystring')`。querystring比URLSearchParams性能更高，但不是 标准化的 API。使用URLSearchParams 当性能不重要或 当需要与浏览器代码兼容时。
  3. 还可以安装qs模块，使用方式和querystring一样


### qs 模块
安装：`$ npm install qs`
- `qs.parse()` 将URL解析成对象的形式
- `qs.stringify()` 将对象 序列化成URL的形式，以 `&` 进行拼接
```

#### url 模块和 URL 接口的对比

```js
// url模块，url.parse('link')
const url = {
    protocol: "https:",
    slashes: true,
    auth: null,
    host: "m.shop.com",
    port: null,
    hostname: "m.shop.com",
    hash: "#detail",
    search: "?id=4433&name=%E6%9D%8E%E5%A4%87&directCompanyId=&mobile=18951431099",
    query: "id=4433&name=%E6%9D%8E%E5%A4%87&directCompanyId=&mobile=18951431099",
    pathname: "/home/share",
    path: "/home/share?id=4433&name=%E6%9D%8E%E5%A4%87&directCompanyId=&mobile=18951431099",
    href: "https://m.shop.com/home/share?id=4433&name=%E6%9D%8E%E5%A4%87&directCompanyId=&mobile=18951431099#detail",
}

// new URL()
const newURL = {
    href: "https://m.shop.com/home/share?id=4433&name=%E6%9D%8E%E5%A4%87&directCompanyId=&mobile=18951431099#detail",
    origin: "https://m.shop.com",
    protocol: "https:",
    username: "",
    password: "",
    host: "m.shop.com",
    hostname: "m.shop.com",
    port: "",
    pathname: "/home/share",
    search: "?id=4433&name=%E6%9D%8E%E5%A4%87&directCompanyId=&mobile=18951431099",
    // searchParams: URLSearchParams
    searchParams: {
        id: "4433",
        name: "李备",
        directCompanyId: "",
        mobile: "18951431099",
    },
    hash: "#detail",
}

```



## 操作路径 path

```bash
const path = require(node:path)


### __dirname
`__dirname` 表示当前模块所在的目录的绝对路径
`__dirname` 是每个模块独有的局部变量（不是一个全局变量），因此在模块中使用 `__dirname` 时不需要使用 `global` 对象或 `require()` 方法进行导入
`__dirname` 变量可以确保路径的正确性，避免出现相对路径错误，常用于构建文件路径，比如读取文件、写入文件、加载模块等
例如 Node.js 模块位于 C:\myapp\index.js，那么在该模块中访问 `__dirname` 变量的值为 C:\myapp。



### 跨平台处理
路径分隔符：
	Windows：\，POSIX（Linux/macOS）：/
	可使用 path.sep 获取当前平台分隔符。



### 常用API
- 拼接规范的绝对路径：`path.resolve`
- 获取操作系统的路径分隔符：`path.sep`
- 解析路径并返回对象：`path.parse`
- 获取路径的基础名称：`path.basename`
- 获取路径的目录名：`path.dirname`
- 获取路径的扩展名：`path.extname`
```

|        方法        |             作用             |                     示例（输入 → 输出）                      |
| :----------------: | :--------------------------: | :----------------------------------------------------------: |
|   `path.join()`    |         安全拼接路径         |            `join('/tmp', 'a', '../b')` → `/tmp/b`            |
|  `path.resolve()`  | 解析绝对路径（从右向左处理） |   `resolve('src', '/img')` → `/img` (若当前目录是 `/home`)   |
| `path.normalize()` |  规范路径（处理 `.`和`..`）  |         `normalize('/foo/../bar//baz')` → `/bar/baz`         |
| `path.basename()`  |    获取文件名（含扩展名）    |           `basename('/tmp/file.txt')` → `file.txt`           |
|  `path.dirname()`  |         获取目录路径         |             `dirname('/tmp/file.txt')` → `/tmp`              |
|  `path.extname()`  |        获取文件扩展名        |              `extname('index.html')` → `.html`               |
|   `path.parse()`   |        分解路径为对象        | `parse('/tmp/file.txt')` → `{ root: '/', dir: '/tmp', base: 'file.txt', ... }` |
|  `path.format()`   |        从对象生成路径        | `format({ dir: '/tmp', base: 'file.txt' })` → `/tmp/file.txt` |

```js
const path = require('path')

/** path.resolve() */
const p1 = path.resolve(__dirname, './index.js')
const p2 = path.resolve(__dirname, 'index.js')
const p3 = path.resolve(__dirname, '/index.js') // 这会回到根目录下
console.log(p1, p2, p3)


/** sep 分隔符 */
console.log(path.sep)   // window下为 \，Linux下为 /
// 强制使用 POSIX 风格路径（如 Web 配置）
const posixPath = path.posix.join('src', 'images', 'logo.png'); // → 'src/images/logo.png'
// 强制使用 Windows 风格路径
const winPath = path.win32.join('C:', 'tmp', 'file.txt'); // → 'C:\\tmp\\file.txt'


/** 文件分隔符：parse */
console.log(path.parse(pathStr))


/** 文件基础名称：basename */
path.basename(pathStr) // index.js
path.basename('/path/to/test.txt') // 'test.txt'


/** 文件的所在目录名称：dirname */
path.dirname(pathStr) // C:\Users\OP0213\Desktop\core
path.dirname('/path/to/test.txt') // '/path/to'


/** 文件的扩展名：extname */
path.extname('/path/to/test.txt') // '.txt'
path.extname('/path/to/index.') // '.'
path.extname('/path/to/README') // ''
path.extname('/path/to/.gitignore') // ''
```

#### 相对路径与绝对路径问题

```bash
- 相对路径参照物：命令执行的工作目录（即在不同目录下执行命令，则会把当前的工作目录下作为参照物，因而会导致路径的不稳定性（特别是会导致生成/读取文件所在目录））。
- 绝对路径'全局变量'保存的是：所在文件的所在目录的绝对路径。

- 会导致生成文件目录不确定性：`fs.writeFileSync('./index.html', 'love')`
- 稳定生成在该文件夹下：`fs.writeFileSync(__dirname + '/index.html', 'love')`


### 相对路径和绝对路径的转化
1. 绝对路径
- `https://www.baidu.com`：完整的url地址，直接跳转。
- `//jd.com`：会获取网站上的的协议名称拼接然后再跳转。如现在的网站是 `http://test.com`，则打开这个链接会拼接成 `http://jd.com`，但因为 jd 会对 `http://jd.com` 进行 301 重定向，所以导致页面上显示的是 `https://jd.com`。
- `/search`：会获取网站上的协议名称、域名、端口号跟这个路径进行拼接。如现在的网站是 `http://test.com`，则打开这个链接会拼接成 `http://test.com/search`。

2. 相对路径
会根据原来的网站来进行相应的回退和前进来拼接，当页面的url错误时，会以网站的初始地址为基准。如现在的网站是 `http://test.com/demo1/index.html`：
    - `./css/index.css`：跳转 `http://test.com/demo1/css/index.css`。
    - `js/index.js`：跳转 `http://test.com/demo1/js/index.js`。
    - `../img/logo.jpg`: 跳转 `http://test.com/img/logo.jpg`。
    - `../../img/logo.jpg`: 跳转 `http://test.com/img/logo.jpg`。
```



#### `process.cwd()` 跟 `__dirname` 的区别

```bash
一. process.cwd()
- process.cwd() 是一个方法，用于获取 Nodejs 进程启动时所在的工作目录的绝对路径。
- 这个路径通常是在启动 Nodejs 应用程序时指定的，或者是在命令行中运行 Node.js 时的当前目录。


二. __dirname
- __dirname 是一个特殊的全局变量，用于获取当前模块的目录名的绝对路径。
- 这个路径是相对于当前模块文件的位置，所以它的值再不同模块中可能不同。


三. 两者区别
__dirname 是相对于当前模块的目录，而 process.cwd() 是整个应用程序的当前工作目录，因此它们的值可能在不同上下文和不同模块中有所不同。
如果需要模块特定的路径信息，使用 __dirname；如果需要整个应用程序的当前工作目录，使用 process.cwd()。
```



#### path.relative

```bash
`path.relative(from, to)` 方法根据当前工作目录返回从 `from` 到 `to` 的相对路径。
如果 `from` 和 `to` 都解析为相同的路径（在分别调用 `path.resolve()` 之后），则返回零长度字符串。

如果给定了相对于一个目录的路径，但需要相对于另一个目录的路径，则 `path.relative()` 方法非常有用。
```

```js
// 返回相对于第一条路径的第二条路径的路径
path.relative('/app/views/home.html', '/app/layout/index.html') // '../../layout/index.html'


const watcher = chokidar.watch('mydir')
// 如果用户添加 mydir/path/to/test.txt，则会打印 mydir/path/to/test.txt
watcher.on('add', (path) => console.log(path))
```

**Gatsby 库使用 `path.relative()` 方法帮助同步静态文件目录**

假设用户向 `static` 目录添加了一个新文件 `main.js`。Chokidar 调用 `on('add')` 事件处理程序，路径设置为 `static/main.js`。但是，当您将文件复制到 `/public` 时，不需要额外的 `static/`。

调用 `path.relative('static', 'static/main.js')` 返回 `static/main.js` 相对于 `static` 的路径，这正是您想要将 `static` 的内容复制到 `public` 的路径。

```js
export const syncStaticDir = (): void => {
  const staticDir = nodePath.join(process.cwd(), `static`)
  chokidar
    .watch(staticDir)
    .on(`add`, (path) => {
      const relativePath = nodePath.relative(staticDir, path)
      fs.copy(path, `${process.cwd()}/public/${relativePath}`)
    })
    .on(`change`, (path) => {
      const relativePath = nodePath.relative(staticDir, path)
      fs.copy(path, `${process.cwd()}/public/${relativePath}`)
    })
}
```



### 【文件监控与路径处理】

```js
const fs = require('fs')
const path = require('path')
const EventEmitter = require('events')

class FileWatcher extends EventEmitter {
  constructor(dir) {
    super()
    this.dir = path.resolve(dir) // 确保绝对路径
  }

  watch() {
    fs.watch(this.dir, (eventType, filename) => {
      const fullPath = path.join(this.dir, filename)
      this.emit('change', fullPath, eventType) // 触发事件
    })
  }
}

const watcher = new FileWatcher('./logs')
watcher.on('change', (filepath) => {
  console.log(`文件修改：${path.basename(filepath)}`)
})
watcher.watch()
```



##  文件操作 fs

```bash
fs 模块可以执行以下操作：
  - 创建文件和目录
  - 修改文件和目录
  - 删除文件和目录
  - 读取文件和目录的内容


### 同步与异步的取舍
- 由于 Node 环境执行的JS代码一般作为服务端的代码运行，且其绝大部分需要在服务器运行期反复执行业务逻辑的代码，所以必须使用异步代码，否则，同步代码在执行时期，服务器将会因为同步错误而停止响应（因为 JS 只有一个执行线程，产生同步错误会跳出异常并停止运行）
- 服务器启动时，如果需要读取配置文件，或者结束时需要写入到状态文件时，可以使用同步代码。因为这些代码只在启动和结束时执行一次，不影响服务器正常运行时的异步执行。


同步方法有两个缺点：
	1. 同步方法同步执行代码，因此会阻塞主线程。例如使用 `fs.readdirSync` 同步读取目录下的所有文件，它将阻塞后面代码的运行，直到读取目录完成。
	2. 同步代码需要使用 `try...catch` 捕获错误

因此推荐使用文件系统模块中的异步方法。
```



### 文件读写 readFile/writeFile

#### 文件读取 readFile

```bash
标准读取文件，是采取异步的方式读取的。
同步读取的函数和异步函数相比，函数需要加`Sync`后缀，并且不接收回调函数，函数直接返回结果。
并且如果同步读取文件发生错误，需要用`try...catch`捕获错误。

文件读取方法
  1. 异步读取：`fs.readFile(path[, options], callback)`
  2. 同步读取：readFileSync
  3. 流式读取：createReadStream

读取文件应用场景
  - 电脑开机
  - 程序运行
  - 编辑器打开文件
  - 查看图片、聊天记录
  - 播放视频、音乐
  - 上传文件
  - 查看 Git 提交记录
```

```js
const fs = require('fs')

// 异步(标准)读取文件
fs.readFile('test.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(data)
})


// 同步读取文件
try {
  const data = fs.readFileSync('test.txt', 'utf-8')
  console.log(data)
} catch (err) {
  console.log(err)
}
```



#### 文件写入 writeFile

```bash
`fs.writeFile(filePath, data[, options], callback)` 可将数据写入文件
    - 如果传入的数据是String，默认按UTF-8编码写入文本文件
    - 如果传入的参数是Buffer，则写入的是二进制文件
    - callback 回调函数由于只关心成功与否，因此只需要一个 err 参数
实现在文件内追加内容：fs.writeFile('/path', '追加的内容', { flag: 'a' })


文件写入的方法
    1. 异步写入：writeFile
    2. 同步写入：writeFileSync
    3. 追加写入：appendFile、appendFileSync
    4. 流式写入：createWriteStram

写入文件的场景：（当需要持久化保存数据时，应该想到文件写入）
    - 下载文件
    - 安装软件
    - 保存程序日志，如 Git
    - 编辑器保存文件
    - 视频录制
```

```js
const fs = require('fs')

const data = 'Hello, Node.js'

fs.writeFile('test.txt', data, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('ok.')
  }
})

fs.writeFileSync('test.txt', data)
```



#### 文件追加内容 appendFile

```bash
使用文件系统模块，可以使用 `appendFile` 方法向现有文件添加新内容
- `fs.appendFile(file, data[, options], callback)`
```

```js
const fs = require('fs')

fs.appendFile('example.txt', 'Hello, world!\n', (err) => {
  if (err) throw err
  console.log('内容已追加到文件')
})
```



#### 【读取/写入本地文件】

```js
const fs = require('fs').promises
const path = require('path')

// 读取 JSON 文件
async function readJSON(filePath) {
  const rawData = await fs.readFile(path.resolve(__dirname, filePath))
  return JSON.parse(rawData)
}

// 写入 JSON 文件
async function writeJSON(data, outputPath) {
  await fs.writeFile(
    path.resolve(__dirname, outputPath),
    JSON.stringify(data, null, 2),
  )
}

// 使用示例
;(async () => {
  const data = await readJSON('input.json')
  data.push({ id: 100, name: 'New Item' })
  await writeJSON(data, 'output.json')
})()
```



### stream 流

```bash
- stream 是 nodejs 提供的又一个仅在服务区端可用的模块，目的是支持 “流” 这种数据结构。
- 流的特点是数据有序，而且必须依次读取，或依次写入，不能像 Array 那样随机定位（类似堆栈）
- 所有可以读取数据的流都继承自 stream.Readable，所有可以写入的流都继承自 stream.Writable

- 流也是一个对象，存在三个响应流的事件：
    1. `data`事件表示流的数据已经读取；
    2. `end`事件表示这个流已经到末尾，没有数据可以再读取；
    3. `error`事件表示出错了。
- 注意：`data` 事件可能会有多次，每次传递的 `chunk` 是流的一部分数据。



#### 流式写入：createWriteStream
注意：程序打开一个文件是需要消耗资源的，流失写入可以减少打开关闭文件的次数。
流式写入方式适用于大文件写入或者频繁写入的场景，writeFile 适用于写入频率较低的场景。
`fs.createWriteStream(path[, options])`



#### readFile() 与 createReadStream() 的区别
- `readFile` 方法异步读取文件的全部内容，并存储在内存中，然后再传递给用户
- `createReadStream` 使用一个可读的流，逐块读取文件，而不是全部存储在内存中

与 `readFile` 相比，`createReadStream` 使用更少的内存和更快的速度来优化文件读取操作。如果文件相当大，用户不必等待很长时间直到读取整个内容，因为读取时会先向用户发送小块内容。
```

```js
const fs = require("fs")

/** 创建读取流 */
const rs = fs.createReadStream("./package.json", "utf-8")

rs.on("open", () => {
    console.log("读取的文件已打开")
})
    .on("close", () => {
        console.log("读取流结束")
    })
    .on("error", (err) => {})
    .on("error", (err) => {
        console.log("ERROR: ", err)
    })
    .on("end", () => {
        console.log("END")
    })
    .on("data", (chunk) => {
        console.log("单批数据流入: ", chunk.length, chunk)
    })
```

```js
const fs = require("fs")

/** 创建写入流 */
const ws = fs.createWriteStream("./willy.txt", "utf-8")

ws.on("open", () => {
  console.log("文件打开")
})
ws.on("close", () => {
  console.log("文件写入完成，关闭")
})

//文件流式写入
ws.write("helloworld1!", (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log("内容1流入完成")
})
ws.write('昨日晴空万里\r\n')
ws.write('今天依旧晴朗，风和日丽\r\n')


ws.end(() => { console.log("文件写入关闭") })
```

- 要以流的形式写入文件，只需要不断调用`write()`方法，最后以`end()`结束

```js
const fs = require("fs")

const ws1 = fs.createWriteStream("./temp/test1.js", "utf-8")
ws1.write("使用Stream写入文本数据...\n")
ws1.write("END.")
ws1.end()

const ws2 = fs.createWriteStream("./temp/test2.js")
ws2.write(Buffer.from("使用Stream写入二进制数据...\n", "utf-8"))
ws2.write(Buffer.from("END.", "utf-8"))
ws2.end()
```



#### pipe 读写流

```bash
一个 Readable 流和一个 Writable 流串起来后，所有的数据自动从 Readable 流进入 Writable 流，这种操作叫 pipe。
通过 pipe() 把一个文件流和另一个文件流串联，这样源文件的所有数据就自动写入到目标文件中(实际是复制文件的过程)

默认情况下，当读取流的数据的`end`事件触发后，将自动关闭写入流。而限制写入流的自动关闭，则需要传入参数：`readable.pipe(writable, { end: false })`
```

```js
const fs = require("fs")

const rs = fs.createReadStream("test1.txt")
const ws = fs.createWriteStream("test2.txt")

rs.on("close", () => {
    console.log("读取流结束")
})

rs.pipe(ws, { end: false }) // 限制管理写入流
```

#### pipe原理

```js
const fs = require("fs")

//创建读取流
const rs = fs.createReadStream("video.mp4")
const ws = fs.createWriteStream("b.mp4")

rs.on("close", () => {
    ws.end()
    console.log("读取流结束")
})

//每一批数据流入完成
rs.on("data", (chunk) => {
    console.log("单批数据流入:" + chunk.length)
    ws.write(chunk, () => {
        console.log("单批输入流入完成")
    })
})
```

#### 【1. 流式处理大文件】

```js
const fs = require('fs')
const csv = require('csv-parser')

const results = []

// 处理 CSV 文件
fs.createReadStream('./input.csv')
  .pipe(csv())
  .on('data', (row) => {
    // 转换数据类型示例
    row.price = parseFloat(row.price)
    results.push(row)
  })
  .on('end', async () => {
    console.log('CSV 处理完成，共', results.length, '条记录')
    // 可在此处进行数据保存或其他操作
  })
```

#### 【2. 流处理大文件-避免内存溢出】

```js
const { pipeline } = require('stream/promises')
const { Transform } = require('stream')

// 创建转换流处理 CSV
const transformer = new Transform({
  objectMode: true,
  transform(row, encoding, callback) {
    // 在此处处理每行数据
    this.push(processRow(row))
    callback()
  },
})

await pipeline(
  fs.createReadStream('bigfile.csv'),
  csv(),
  transformer,
  fs.createWriteStream('output.ndjson'),
)
```

#### 【3. CSV 转 JSON 并保存】

```js
const fs = require('fs')
const csv = require('csv-parser')
const { Transform } = require('stream')

// 创建转换流处理 CSV
const transformer = new Transform({
  objectMode: true,
  transform: (row, _, done) => {
    // 数据清洗：去除空值，转换数字
    const cleaned = {
      id: parseInt(row.id, 10),
      name: row.name.trim(),
      value: row.value ? parseFloat(row.value) : 0,
    }
    done(null, JSON.stringify(cleaned) + '\n')
  },
})

// 创建处理管道
fs.createReadStream('input.csv')
  .pipe(csv())
  .pipe(transformer)
  .pipe(fs.createWriteStream('output.ndjson'))
  .on('finish', () => console.log('转换完成！'))
```



### 文件信息状态 stat

```bash
`fs.stat()` 可以获取文件大小，创建时间等信息，它返回一个 Stat 对象，里面包含文件或目录的详细信息。

语法：
	- `fs.stat(path[, options], callback)`
	- `fs.statSync(path[, options])`

结果值对象结构：
    - 检测是否是文件 `isFile()`
    - 检测是否是目录 `isDirectory()`
    - 文件体积大小 `size`
    - 创建时间 `birthtime`
    - 最后修改时间 `mtime`


文件信息包含在 `stats` 变量中。包括：
    - 如果文件是目录或文件，则使用 `stats.isFile()` 和 `stats.isDirectory()`
    - 如果文件是符号链接，则使用 `stats.isSymbolicLink()`
    - 文件大小（以字节为单位），使用 `stats.size`


stat() 与 fstat() 的区别
    - `fs.stat` 接收的第一个参数是一个文件路径字符串
    - `fs.fstat` 接收的是一个文件描述符
```

```js
'use strict'
const fs = require('fs')

fs.stat('./blog', function (err, stat) {
  if (err) {
    console.log("操作失败", err)
    return
  }
  // 是否是文件:
  console.log('isFile: ' + stat.isFile())
  // 是否是目录:
  console.log('isDirectory: ' + stat.isDirectory())
  if (stat.isFile()) {
    // 文件大小:
    console.log('size: ' + stat.size)
    // 创建时间, Date对象:
    console.log('birth time: ' + stat.birthtime)
    // 修改时间, Date对象:
    console.log('modified time: ' + stat.mtime)
  }
})
```



### 文件复制

```js
const fs = require('fs')
const process = require('process')

/** 方式一：readFile */
try {
  // 读取文件内容
  const data = fs.readFileSync('./package.json')
  // 写入文件
  fs.writeFileSync('./temp.json', data)
  console.log(process.memoryUsage()) // rss  71471104 -> 68.16015625
} catch (err) {
  console.log(err)
}


/** 方式二：流式操作 */
// 创建读取流对象
const rs = fs.createReadStream('./package.json')
// 创建写入流对象
const ws = fs.createWriteStream('./temp2.json')
// 绑定 data 事件
rs.on('data', chunk => {
  ws.write(chunk)
})
rs.on('end', () => {
  console.log(process.memoryUsage()) // rss  71561216 -> 68.24609375
})
```



### 文件重命名与移动 rename

```js
const fs = require('fs')

/** 文件重命名 */
fs.rename('./temp/temp.json', './temp/temp1.json', (err) => {
  if (err) {
    console.log('操作失败~')
    return
  }
  console.log('操作成功')
})

/** 文件移动 */
fs.rename('./temp/temp2.json', './temp2.json', (err) => {
  if (err) {
    console.log('操作失败~')
    return
  }
  console.log('操作成功')
})
```



### 文件删除 unlink

```bash
文件系统模块的 `unlink` 方法允许您删除文件。
当以文件路径作为参数调用 `unlink` 方法时，它将删除该文件。
注意：它只适用于文件，不适用于目录。
```

```js
const fs = require('fs')

/** 调用 unlink 方法 或 unlinkSync */
fs.unlink('./temp/temp1.json', err => {
  if (err) {
    console.log('删除失败~')
    return
  }
  console.log('删除成功')
})


/** 调用 rm 方法 或 rmSync */
fs.rm('./temp/temp2.json', err => {
  if (err) {
    console.log('删除失败~')
    return
  }
  console.log('删除成功')
})
```



### 文件夹操作 mkdir

```bash
## 文件夹操作
1. 创建文件夹：mkdir、mkdirSync
2. 读取文件夹：readdir、readdirSync
3. 删除文件夹：rmdir、rmdirSync


- `fs.mkdir(path[, options], callback)`
- `fs.mkdirSync(path[, options])`


- 注意：递归创建文件夹需要增加 recursive 参数，如：`fs.mkdir(path, { recursive: true })`
- 注意：`fs.rm()` 或 `fs.rmdir()` 只能删除空目录，如果目录中还有文件或子目录，则需要使用 `fs.readdir()` 方法遍历目录并递归删除其中的文件和子目录，直到目录为空，才能使用 `fs.rm()、fs.rmdir()` 方法删除目录。
```

```js
const fs = require('fs')

/** 回调函数封装 */
const callback = (typeValue, showData = false) => {
    return (err, data) => {
        if (err) {
            console.log(`${typeValue}失败~`)
            return
        }
        console.log(`${typeValue}成功`)
        showData && console.log(data)
    }
}

/** 创建 */
fs.mkdir('./temp', callback('创建'))

/** 递归创建 */
fs.mkdir('./temp/a/b/c', { recursive: true }, callback('创建'))

/** 读取文件夹  */
fs.readdir('./temp', callback('读取', true))

/** 删除文件夹 */
fs.rm('./temp', { recursive: true }, callback('删除'))
```



### 递归删除一个目录及其子目录和文件

```js
/** 递归删除一个目录及其子目录和文件 */
const path = require('path')
const fs = require('fs')

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curFilePath = path.join(folderPath, file)
      if (fs.lstatSync(curFilePath).isDirectory()) {
        deleteFolderRecursive(curFilePath)
      } else {
        fs.unlinkSync(curFilePath)
      }
    });
    fs.rmdirSync(folderPath)
    console.log(`已删除目录：${folderPath}`)
  }
}

deleteFolderRecursive('temp')
```



### 检查文件是否存在 exists

`fs.exists` 已经废弃，建议使用 `fs.access`

```js
const { access, constants } = require('fs')

const file = 'package.json'

// 检查当前目录中是否存在该文件
access(file, constants.F_OK, (err) => {
  console.log(`${file} ${err ? '不存在' : '存在'}`)
})
```



### 截断文件内容 ftruncate

```bash
语法：`fs.ftruncate(fd, len, callback)`

`close` 方法接受以下参数：
    - `fd` — 文件 `fs.open()` 方法返回的文件描述符。
    - `len` — 文件的长度，在此长度之后文件将被截断。
    - `callback` — 回调函数，它不获取任何参数，除非给完成回调一个可能的异常。
```

```js
const { open, close, ftruncate } = require('node:fs')

function closeFd(fd) {
  close(fd, (err) => {
    if (err) throw err
  })
}

open('temp.txt', 'r+', (err, fd) => {
  if (err) throw err

  try {
    ftruncate(fd, 4, (err) => {
      closeFd(fd)
      if (err) throw err
    })
  } catch (err) {
    closeFd(fd)
    if (err) throw err
  }
})
```



### 监听文件 watch

```bash
watch() 与 watchFile() 的区别
二者主要用来监听文件变动：
- `fs.watch` 利用操作系统原生机制来监听，可能不适用网络文件系统
- `fs.watchFile` 则是定期检查文件状态变更，适用于网络文件系统，但是相比 `fs.watch` 有些慢，因为不是实时机制
```



### 按行读取数据流 readline

```bash
readline 模块提供一次一行的方式来读取数据流。

readline 模块的使用步骤
- 使用 `readline` 的 `createInterface` 方法创建了一个接口实例
- 调用实例的相关方法，如 `question` 方法输入
- 监听 `readline` 的 `close` 事件

一旦执行，Node.js 应用程序将不会终止，直到 `readline.Interface` 关闭，因为接口在输入流上等待接收数据。
当所有操作的完成时，我们使用 `close` 方法来触发 `close` 事件，并可在事件中结束程序。


`readline` 属性和方法
    - `clearLine()` 清除指定流的当前行
    - `clearScreenDown()` 从当前光标向下位置清除指定的流
    - `createInterface()` 创建一个接口对象
    - `cursorTo()` 将光标移动到指定位置
    - `emitKeypressEvents()` 为指定流触发按键事件
    - `moveCursor()` 将光标移动到相对于当前位置的新位置
```

```js
const readline = require('readline')
const { stdin: input, stdout: output } = require('process')

const rl = readline.createInterface({ input, output })

rl.question('你觉得 Node.js 怎么样？', (answer) => {
  console.log(`感谢您的宝贵反馈: ${answer}`)

  rl.close()
})

rl.on('close', () => {
  console.log('退出程序')
  process.exit(0)
})
```

**打开一个文件并逐行返回内容**

```js
const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
  input: fs.createReadStream('./package.json')
})

let lineno = 0
rl.on('line', (line) => {
  lineno++
  console.log(`Line number ${lineno}': ${line}`)
})
```

**回文扫描器**

```js
const readline = require('readline')

const { stdin: input, stdout: output } = require('process')
const rl = readline.createInterface({
  input,
  output
})

function isPalindrome(str) {
  const result = str
    .replace(/[\W_]/g, '')
    .toLowerCase()
    .split('')
    .reverse()
    .join('')
  if (result == str.toLowerCase()) return true
  else return false
}

console.log('------- 回文扫描器 ------- ')
console.log('输入回文: ')
rl.on('line', (input) => {
  console.log(`${input} ${isPalindrome(input) ? '是' : '不是'}回文`)
  console.log('输入回文: ')
})
```



### fs.extra

```bash
`fs.extra` 是原生 fs 的替代品，该模块继承了 `fs-extra` 中所有方法，添加了原生 `fs` 模块中不包含的文件系统方法，并向 `fs` 方法添加了 promise 支持。

`$ npm i fs-extra`
```

```js
const { copy, copySync, emptyDirSync } = require('fs-extra')

// 同步
try {
  copySync('/tmp/myFile', '/tmp/myNewFile')
  console.log('success!')
} catch (err) {
  console.error(err)
}

// 异步 promise
copy('/tmp/myFile', '/tmp/myNewFile')
  .then(() => console.log('success!'))
  .catch((err) => console.error(err))

// 异步回调
copy('/tmp/myFile', '/tmp/myNewFile', (err) => {
  if (err) return console.error(err)
  console.log('success!')
})


// 清空文件夹
const folder = './node_modules'
emptyDirSync(folder)
```



## 资源压缩 zlib

```bash
使用gizp：浏览器向服务端发起资源请求时，浏览器通过在 http 头部添加 `Accept-Encoding: gzip, deflate` 来告诉服务端可以用 gzip 或者 defaulte 算法来压缩资源。如下载一个js文件，服务端会先对资源进行压缩再返回给浏览器，以此减少资源的大小，加快返回速度。

在 nodejs 中能对资源压缩的模块为 zlib 模块。


- 压缩文件：`zlib.createGzip()`
- 解压资源：`zlib.createGunzip()`
- 压缩字符串：`zlib.gzipSync('字符串')`
```

```js
const fs = require("fs")
const zlib = require("zlib")

const readStream = fs.createReadStream("./README.md")
const writeStream = fs.createWriteStream("./README.md")

/** 资源压缩 */
const gzip = zlib.createGzip()
readStream.pipe(gzip).pipe(writeStream)

/** 对字符串压缩 */
const str = "Hi, willysliang~"
const gzipStr = zlib.gzipSync(str)
console.log(gzipStr)

/** 资源解压 */
const gunzip = zlib.createGunzip()
readStream.pipe(gunzip).pipe(writeStream)
```



#### 服务端gzip压缩

```js
const fs = require("fs")
const zlib = require("zlib")
const http = require("http")

/**
 * @title 服务端 gzip 压缩
 * @description 首先判断是否包含 accept-encoding 首部，且存在值为 gzip，是则返回 gzip 压缩后的文件，否则返回未压缩的文件
 */
const server = http.createServer((req, res) => {
    const filePath = "./README.md"
    const rs = fs.createReadStream(filePath)

    const acceptEncodeing = req.headers["accept-encoding"]

    // 判断是否需要 gzip 压缩
    if (acceptEncodeing && acceptEncodeing.indexOf("gzip") !== -1) {
        // 响应 Content-Encoding 告诉浏览器文件被 gzip 压缩过
        res.writeHeader(200, {
            "Content-Encoding": "gzip",
        })

        const gzip = zlib.createGzip()
        rs.pipe(gzip).pipe(res)

        // 对字符串进行 gzip 压缩
        const responseText = "Hi, willys~"
        res.end(zlib.gzipSync(responseText))
    } else {
        rs.pipe(res)
    }
})

server.listen(3000, () => {
    console.log("server start")
})
```



#### 下载和解压 Node 中的 gz 文件

```bash
- got：适用于 Node.js 的人性化且功能强大的 HTTP 请求库。
- Node-gzip：只需使用 `promise` 在 Node.js 中使用 `gzip` 和 `ungzip`。
```

```js
import got from 'got'
import pkg from 'node-gzip'

const { ungzip } = pkg
const SITEMAP_URL = 'https://developer.mozilla.org/sitemaps/en-US/sitemap.xml.gz'

async function main() {
  // 获取文件
  const { body } = await got(SITEMAP_URL, { responseType: 'buffer' })

  // 解压缓冲的 gzip 站点地图
  const sitemap = (await ungzip(body)).toString()

  console.log(sitemap)
}
main()
```



## 网络协议 http

```bash
http 模块提供了一种让 Node.js 通过 HTTP（超文本传输协议）传输数据的方法。而 https 模块通过 HTTP TLS/SSL 协议传输数据的方法，该协议是安全的 HTTP 协议。
	- 各种 Node HTTP 服务框架的底层原理都是离不开该模块。

使用内置的 `http` 模块，可搭建一个 HTTP 服务器。该服务器允许我们监听任意端口并提供一个回调函数在每个传入请求时调用。
回调将接收两个参数：一个 Request 对象和一个 Response 对象。Request 对象将填充有关请求的有用属性，而 Response 对象将用于向客户端发送响应。



### 配置本地 host
1. 打开hosts文件。该文件通常位于以下位置：C:\Windows\System32\drivers\etc\hosts（对于Windows）或/etc/hosts（对于Mac和Linux）
2. 在hosts文件中添加条目，格式为“IP地址 域名”，例如 “127.0.0.1 willys.com”。
3. 保存 hosts 文件夹
4. 测试新的host配置是否生效。可以使用ping命令测试，例如“ping willys.com”。



### 设置状态代码、状态描述信息
- 设置响应头：res.writeHead()
- 设置状态码：res.statusCode = codeNumber
- 设置描述信息：res.statusMessage = 'message desc'



### 设置相应主体
1. response.write(chunk[, encoding][, callback])
		- chunk：响应主体的内容，可以是string，也可以是buffer。当为string时，encoding参数用来指明编码方式。（默认是utf8）
		- encoding：编码方式，默认是 utf8。
		- callback：当响应体 flushed 时触发的回调。
	注意：
		- 如果 res.write() 被调用时 res.writeHead() 还没被调用过，则会把 header flush 出去。
		- res.write() 可被调用多次。
		- 当 res.write(chunk) 第一次被调用时，node 会将 header 信息以及 chunk 发送到客户端。第二次调用 res.write(chunk) ，node 会认为你是要发送 streaming data。


2. response.end([data][, encoding][, callback])
		- res.end() 用处是告诉 nodejs 此次请求到此结束。


### 超时处理
- response.setTimeout(msecs, callback)


### 事件 close/finish
- close：response.end() 被调用前连接就断开，此时会触发这个事件。
- finish：响应header、body都已经发送出去（交给操作系统，排队等候传输），但客户端是否实际收到数据为止。（这个事件后 res 上就不会再有其他事件触发）
```

### 服务器请求

```js
const http = require("node:http")

const router = (request, response) => {
  // 获取请求的方法
  const { method } = request

  // 获取请求的 url 路径
  const { pathname } = new URL(request.url, "http://127.0.0.1")

  console.log(method, pathname)

  /** 响应状态码 */
  response.statusCode = 203
  response.statusMessage = "willysliang"
  /** 响应头 */
  response.setHeader("willy", ["L", "O", "V", "E"])

  /** 响应体设置 */
  response.write("I ")
  response.write("LOVE ")
  response.write("U! ")
  response.end("willysliang")

  /** 请求超时处理 */
  const timeout = 5000 // 设置超时时间为5秒
  request.setTimeout(timeout, () => {
    response.statusCode = 408 // 请求超时状态码
    response.end("Request Timeout") // 响应超时信息
  })
}

const server = http.createServer(router)

/** socket 连接超时处理 */
server.on("connection", (socket) => {
  // 如果连接超时，则socket会触发timeout事件，可以在该事件的回调函数中调用socket.destroy()方法来关闭连接
  socket.setTimeout(5000) // 设置超时时间为5秒
})

const PORT = 80
server.listen(PORT, () => {
  console.log("listener 80....")
})
```

### 加载完整项目

```js
/** bug: 对无效的路径请求无法响应（做不到是因为单页面应用的路由模块还没配置白名单） */

const http = require('node:http')
const fs = require('fs')
const path = require('node:path')

// 声明 MIME 资源变量
const mimes: Record<string, string> = {
  html: 'text/html;charset=utf-8;',
  css: 'text/css',
  js: 'text/javascript',
  png: 'image/png',
  jpg: 'image/jpeg',
  gif: 'image/gif',
  mp4: 'video/mp4',
  mp3: 'video/mpeg',
  json: 'application/json',
  other: 'application/octet-stream', // 其他文件类型(此会让浏览器对资源进行下载)
}

const server = http.createServer((request, response) => {
  const { pathname } = new URL(request.url, 'http://127.0.0.1')
  console.log('pathname==========', pathname)

  if (pathname === '/') {
    const html = fs.readFileSync(__dirname + '/dist/index.html')
    response.end(html)
  } else {
    const resourcePath = __dirname + pathname
    if (fs.existsSync(resourcePath)) {
      const resource = fs.readFileSync(resourcePath)

      // 获取文件的后缀名
      const ext = path.extname(pathname).slice(1)

      // 兼容在模块脚本需要在服务器响应中设置正确的 MIME 类型（例如，text/javascript 或 application/javascript），否则浏览器将无法正确解析脚本并报告这个错误
      // if (ext === 'js') response.setHeader('Content-Type', 'application/javascript')

      // 设置文件的 MIME 类型,如果文件的后缀没有匹配到,则设置为 'application/octet-stream' 类型
      response.setHeader('Content-Type', mimes[ext] || mimes.other)

      response.end(resource)
    } else {
      // response.statusCode = 404
      // response.setHeader('Content-Type', 'text/html')
      // response.end('<h1>404 Not Found</h1>')
    }
  }
})

server.listen(80, () => {
  console.log('listener 80....')
})
```

### 优化版

```js
/** bug: 对无效的路径请求无法响应（做不到是因为单页面应用的路由模块还没配置白名单） */

const http = require('node:http')
const fs = require('fs')
const path = require('node:path')

/** 声明 MIME 资源变量 */
const mimes: Record<string, string> = {
  html: 'text/html;charset=utf-8;',
  css: 'text/css',
  js: 'text/javascript',
  png: 'image/png',
  jpg: 'image/jpeg',
  gif: 'image/gif',
  mp4: 'video/mp4',
  mp3: 'video/mpeg',
  json: 'application/json',
  other: 'application/octet-stream', // 其他文件类型(此会让浏览器对资源进行下载)
}

/** 错误处理 */
const errorResponse = (response, code) => {
  switch (code) {
    case 404:
      response.statusCode = 404
      response.end('<h1>404 Not Found</h1>')
      break
    case 403:
      response.statusCode = 403
      response.end('<h1>403 Forbidden</h1>')
      break
    case 405:
      response.statusCode = 405
      response.end('<h1>405 Method Not Allowed</h1>')
      break
    default:
      response.statusCode = 500
      response.end('<h1>500 Internet Server Error</h1>')
  }
  return response
}

const server = http.createServer((request, response) => {
  if (request.method !== 'GET') {
    response = errorResponse(response, 405)
    return
  }

  const { pathname } = new URL(request.url, 'http://127.0.0.1')
  console.log('pathname==========', pathname)

  if (pathname === '/') {
    const html = fs.readFileSync(__dirname + '/dist/index.html')
    response.end(html)
  } else {
    const resourcePath = __dirname + pathname
    fs.readFile(resourcePath, (err, resourceData) => {
      if (err) {
        console.log('err=====', err)
        response.setHeader('Content-Type', mimes.html)
        switch (err.code) {
          case 'ENOENT':
            response = errorResponse(response, 404)
            break
          case 'EPERM':
            response = errorResponse(response, 403)
            break
          default:
            response = errorResponse(response, err.code)
        }
        return
      }

      // 获取文件的后缀名
      const ext = path.extname(pathname).slice(1)

      // 兼容在模块脚本需要在服务器响应中设置正确的 MIME 类型（例如 text/javascript 或 application/javascript），否则浏览器将无法正确解析脚本并报告这个错误
      // if (ext === 'js') response.setHeader('Content-Type', 'application/javascript')

      // 设置文件的 MIME 类型,如果文件的后缀没有匹配到,则设置为 'application/octet-stream' 类型
      response.setHeader('Content-Type', mimes[ext] || mimes.other)
      response.end(resourceData)
    })
  }
})

server.listen(80, () => {
  console.log('listener 80....')
})
```



## 网络服务 https

```bash
## 网络服务 https
https 与 http 模块用法相似。
```

### 生成证书

````bash
### 生成证书
1. 创建目录存放证书
$ mkdir cert
$ cd cert


2. 生成私钥
$ openssl genrsa -out willy-key.pem 2048


3. 生成证书签名请求（csr是 Certificate Signing Request）
openssl req -new \
  -sha256
  -key willy-key.key.pem \
  -out willy-csr.pem \
  -subj "/C=CN/ST=Guandong/L=Guangzhou/O=YH Inc/CN=www.willy.com"



4. 生成证书
openssl x509 \
  -req -in willy-csr.pem \
  -signkey willy-key.pem \
  -out willy-cert.pem


5. 本地测试（因为本地没有域名，所以先配置本地host）
127.0.0.1 www.willy.com

````

```js
// htts 服务端
const https = require("https")
const fs = require("fs")

const options = {
  key: fs.readFileSync("./cert/chyingp-key.pem"), // 私钥
  cert: fs.readFileSync("./cert/chyingp-cert.pem"), // 证书
}

const server = https.createServer(options, (req, res) => {
  res.end("这是来自HTTPS服务器的返回")
})

server.listen(3000)
```



## TCP通讯服务 net

```bash
net 模块提供了一种创建 TCP 服务器和 TCP 客户端的方法。它是 NodeJS 通讯功能实现的基础。

net 模块主要包含两部分：
	- net.Server：用于创建 TCP 或 IPC 服务器。
	- net.Socket：对象是 TCP 或 UNIX Socket 的抽象。net.Socket 实例实现一个双工流接口，可以在用户创建客户端（使用 connect()） 时使用，或用 Node 创建它们，并通过 connection 服务器事件传递给用户。
```

```js
// server.js
const net = require('net')

// 建立服务器
const server = net.createServer((connection) => {
  console.log('client connected')
  connection.on('end', () => {
    console.log('客户端关闭连接')
  })
  connection.write('Hello Node.js!')
  connection.pipe(connection)
})

const port = 8080
server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
```

```js
// client.js
const net = require('net')

const port = 8080
const client = net.connect({ port }, () => {
  console.log('连接到服务器！')
})

client.on('data', (data) => {
  console.log(data.toString())
  client.end()
})

client.on('end', () => {
  console.log('断开与服务器的连接')
})
```



## 事件触发器 events

```bash
nodejs 存在许多内置的事件，可通过引入 events 模块并通过实例化 EventEmitter 类来绑定和监听事件


### EventEmmiter
EventEmitter 的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，而对于每个事件，EventEmitter 支持若干个事件监听器。
当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递
```

```js
// 引入 events 模块
const EventEmitter = require("events")

// 创建 eventEmitter 对象
const events = new EventEmitter()

events.on("someEvent", function (arg1, arg2) {
    console.log("listener1", arg1, arg2)
})
events.on("someEvent", function (arg1, arg2) {
    console.log("listener2", arg1, arg2)
})

events.emit("someEvent", "arg1 参数", "arg2 参数")

/**
 * 输出
 * listener1 arg1 参数 arg2 参数
    listener2 arg1 参数 arg2 参数
 */
```



## 缓存区 Buffer类

```bash
#### 概念
1. 二进制代码：
因为计算机处理器由晶体管组成，靠开（0）和关（1）信号激活。为了让计算机能理解、处理和存储数据，必须将数据转换为二进制代码。
发送到计算机的每一条数据在处理和输出结果之前，首先由微处理器转换成二进制，因此需要区分不同的数据类型。而计算机通过对不同的数据类型进行不同的编码，以区分不同类型的数据。

2. 缓冲区：
二进制流是大量二进制数据的集合，由于二进制流庞大，因而不会被一起发送，需要在发送之前分解成更小部分再进行发送。
当数据处理单元不能接收更多数据流时，多余的数据将存储在缓冲区中，直到数据处理单元准备好接收更多数据。

3. NodeJS 中的缓冲区类
NodeJS 中的 Buffer 类用于处理二进制数据，它是 NodeJS 在处理TCP流、文件系统操作、加密算法等方面的核心模块之一。
	- 读写文件系统（文件存储在二进制文件中）
	- 处理 TCP 流，它们在以小块形式发送二进制数据之前保护与接收器的连接。发送到接收器的数据流需要存储在缓冲区，直到接收器准备好接收更多数据块进行处理为止。
注意：
	- Buffer 是 V8 堆外分配的一段固定长度的连续内存，用于直接操作二进制数据流。与普通数组不同，Buffer 内存分配不经过 V8 引擎，避免了垃圾回收的延迟。
	- Buffer 对象在创建时需指定其大小(以字节为单位)，且创建后无法改变。在使用Buffer时需要注意内存泄漏、安全及避免缓冲区溢出问题。
	- Buffer 类可以方便地进行二进制数据的拼接、切片等操作，提高对二进制数据的处理效率。
	


#### Buffer 的作用
1. 存储二进制数据：可存储二进制数据，包括字节、位、16进制、ASCII等。
2. 处理网络流数据：可用于处理网络流数据，如socket接收到的数据，可以将其转换为Buffer对象进行处理。
3. 处理文件系统操作：可用于读取和写入文件系统中的二进制数据，如读取图片、音频、视频等文件。
4. 实现加密算法：可用于实现加密算法，如MD5、SHA1等，以及对称加密算法、非对称加密算法等。
5. 处理数据传输：可用于处理数据传输的编码和解码，如Base64编码、URL编码、JSON编码等。
6. 支持转换编码：可将不同编码的数据进行转换，如将UTF-8编码的数据转换为GBK编码的数据。
```

#### 属性和方法

```bash
- `Buffer.alloc()` 创建指定长度的缓冲区对象。以字节为单位分配缓冲区的大小
- `Buffer.from()` 从对象（字符串/数组/缓冲区）创建缓冲区对象
- `Buffer.compare()` 比较两个缓冲区对象
- `Buffer.concat()` 将缓冲区对象数组连接到一个缓冲区对象中
- `Buffer.fill()` 用指定的值填充缓冲区对象
- `Buffer.byteLength()` 返回指定对象中的字节数
- `Buffer.isEncoding()` 检查缓冲区对象是否支持指定的编码

- `buf.entries()` 返回缓冲区对象的 index、byte 对的迭代器
- `buf.includes()` 检查缓冲区对象是否包含指定的值。如果存在匹配项，则返回`true`，否则返回 `false`
- `buf.slice()` 将一个缓冲区对象分割成一个新的缓冲区对象，从指定的位置开始和结束。
- `buf.readInt8()` 从缓冲区对象读取 8 位整数
- `buf.writeFloatBE()` 使用 big-endian 将指定的字节写入缓冲区对象。字节应为 32 位浮点。
- `buf.length` 返回缓冲区对象的长度，以字节为单位



#### 创建 Buffer
在 Node V6.0 前，要创建新的 Buffer，只需要使用 `new` 关键字调用构造函数：
		`const newBuffer = new Buffer('new String')`
在 Node V6.0 后，`new Buffer()`构造函数已被弃用，并被 `Buffer.from()、Buffer.alloc()、Buffer.allocUnsafe()` 方法替换

类方法：Buffer.from(buffer)
  - Buffer.from()方法用于创建包含指定字符串，数组或缓冲区的新缓冲区
  - `Buffer.from( object, encoding)`
      - object：此参数可以包含字符串，缓冲区，数组或arrayBuffer。
      - encoding：如果对象是字符串，则用于指定其编码。它是可选参数。其默认值为utf8
  - 创建新的 Buffer 实例：`const newBuffer = Buffer.from('new String')`


#### buffer 与字符串的转换
- 转换为buffer：`Buffer.from()`
- 转换为字符串：`Buffer.toString()`，默认情况下，它会转换为 utf-8 格式字符串
注意：一个 buffer 位只能存储最高二进制值为256的数值，超出256的数值会在转换为二进制后进行高位舍弃

const buf1 = Buffer.from('hi, willy')
const buf2 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117])
const str1 = buf2.toString() // iloveyou
console.log(buf1, buf2, str1)
```

#### Buffer 的创建

```js
// 创建长度为15的空Buffer（填充 0）
const buf1 = Buffer.alloc(15) // <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>
buf1.length // 15

// 创建并初始化 Buffer（填充指定值）
const buf2 = Buffer.alloc(10, 0x41) // 填充 ASCII 'A'

// 从数组创建
const buf3 = Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]) // 'hello'

// 从字符串创建（自动编码）
const buf4 = Buffer.from('Hello Node.js', 'utf8')
```



#### Buffer 转换为 JSON 和 `utf-8` 字符串

```js
const bufferOne = Buffer.from('iloveyou')
console.log(bufferOne) // // <Buffer 69 6c 6f 76 65 79 6f 75>


/** 将 Buffer 转换为 JSON */
const json = JSON.stringify(bufferOne, null, 2)
console.log(json)
/**
{
  "type": "Buffer",
  "data": [105, 108, 111, 118, 101, 121, 111, 117],
}
 */


/** 将 JSON 转换为 Buffer */
const bufferOriginal = Buffer.from(JSON.parse(json).data)
console.log(bufferOriginal) // <Buffer 69 6c 6f 76 65 79 6f 75>


/** 将 Buffer 转换为 UTF-8 字符串 */
console.log(bufferOriginal.toString('utf8')) // iloveyou
```

#### 文件读写

```js
const fs = require('fs')

// 读取图片文件并转换为 Base64
const imageBuffer = fs.readFileSync('logo.png')
const base64Image = imageBuffer.toString('base64')

// 写入二进制数据
const data = Buffer.from('0101', 'hex')
fs.writeFileSync('binary.dat', data)
```

#### 网络通信

```js
const net = require('net')

const server = net.createServer((socket) => {
  socket.on('data', (buffer) => {
    // 解析二进制协议头（如前4字节为长度）
    const length = buffer.readUInt32BE(0)
    const payload = buffer.slice(4)
    console.log('Received:', payload.toString())
  })
})
server.listen(3000)
```

#### 加密与哈希

```js
const crypto = require('crypto')

// 未指定编码，可能按 UTF-8 处理，但若环境默认编码不同（如 latin1）会出错
const input = Buffer.from('secret data')

// 计算 SHA-256 哈希
const hash = crypto.createHash('sha256').update(input).digest('hex')

// AES 加密
const key = Buffer.from('32bytes-long-secret-key-1234567890ab')
const iv = crypto.randomBytes(16) // 初始化向量
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
const encrypted = Buffer.concat([iv, cipher.update(input), cipher.final()]) 
```



## 数据加密 crypto

```bash
crypto 模块提供了通用的加密和哈希算法。


### 加密类别
1. 对称加密技术：加密系统的加密密钥和解密密钥相同，或者虽然不同，但可以轻松从一个密钥推导出另外的一个密钥。
		- 破解方案1：明文+密钥=密文，这个公式只要知道任何两个，就可以推导出第三个
		- 破解方案2：在已知明文和对应密文的情况下，通过穷举和暴力破解可以破解 DES。
适用场景：
    - 数据传输加密（如 https 内容加密）
    - 本地存储加密（用户敏感信息存储）
    - 文件/数据库加密（静态数据保护）

2. 非对称加密技术：与对称加密技术相反



#### 加密的本质是二进制操作（Nodejs 加密为什么需要使用Buffer）
加密算法（如AES、SHA-256）的底层实现基于字节级运算(二进制数据)，而非字节编码(字符串)，所以必须要将输入先转换成二进制
	- 哈希函数：将输入视为二进制流，逐字节计算摘要
	- 对称加密：对字节进行异或、置换等数学操作

任何涉及加密、哈希、数字签名的操作，都应优先使用 Buffer 而非字符串。直接操作字符串会导致以下问题：
	- 二进制完整性：加密要求输入数据完全精确，字符串隐式转换会破坏数据完整性
	- 编码一致性：字符串默认使用 UTF-8/UTF-16 编码，不同编码的字符表示不同
		- utf8：将字符串 ↔ 字节互相转换
		- hex/base64：将字节 ↔ 文本互相转换，便于传输或存储

加密过程：字符串 → utf8 编码为字节 → 加密 → 字节 → hex/base64 编码为文本
    "hello world" (字符串) 
    → utf8编码 → 二进制数据 (字节) 
    → 加密 → 加密后的二进制 (字节) 
    → hex编码 → "e221f586cf104b2d0d5d58166a8cfe69" (可传输的字符串)

解密过程：文本 → hex/base64 解码为字节 → 解密 → 字节 → utf8 解码为字符串
    "e221f586cf104b2d0d5d58166a8cfe69" (hex字符串) 
    → hex解码 → 加密后的二进制 (字节) 
    → 解密 → 原始二进制 (字节) 
    → utf8解码 → "hello world" (字符串)

示例1：
    const str = '加密'
    const bufUtf8 = Buffer.from(str, 'utf8') // <Buffer e5 8a a0 e5 af 86>
    const bufHex = Buffer.from(str, 'hex')   // 若 str 是十六进制字符串则正确

示例2：
    let encrypted = cipher.update(data, "utf8", "base64") // 加密时使用 base64
    encrypted += cipher.final("base64")

    let decrypted = decipher.update(encrypted, "base64", "utf8") // 解密时使用 base64
    decrypted += decipher.final("utf8")



#### 主流的加密方式
- aes：高级加密标准（Advanced Encryption Standard），对称加密
- des：数据加密标准（Data Encryption Standard）
- md5：MD5信息摘要算法（Message-Digest Algorithm）
- sha-256：安全哈希算法256位
- dsa：数字签名算法（Digital Signature Algorithm）
- ecdsa：椭圆曲线数字签名算法
- elliptic：椭圆曲线密码体制
- hmac：密钥相关的哈希运算消息认证码（Hash-based Message Authentication Code）
- rand：随机数生成
- rc4：Ron Rivest设计的流密码
- rsa：一种非对称加密算法（RSA 是三位创造者的首字母缩写）
- cipher：密码


场景使用方案
- 大数据加密（文件/数据库）：对称加密（AES-256-GCM）
- 安全通信初始握手：非对称加密（ECDH/RSA）交换对称密钥
- 用户身份认证：非对称签名算法（Ed25519）
- 移动端低性能设备：对称加密（ChaCha20-Poly1305） + 非对称加密（X25519）

安全防御
- 密钥泄漏：定期轮换密钥，使用 HSM/KMS 硬件保护
- 中间人攻击：证书校验（TLS）、数字签名验证
- 随机数质量：使用 crypto.randomBytes() 而非 Math.random()
- 算法过时：禁用 DES/RC4，优先选择 AES-256 和 ECC
```

|    **特性**    |       **对称加密**       |              **非对称加密**              |
| :------------: | :----------------------: | :--------------------------------------: |
|  **密钥数量**  | 单一密钥（加密解密共用） |          密钥对（公钥 + 私钥）           |
|  **算法速度**  |    快（适合大数据量）    |        慢（适合小数据或密钥交换）        |
|  **典型算法**  |    AES-256、ChaCha20     |     RSA、ECC（椭圆曲线加密）、EdDSA      |
| **安全性基础** |        密钥保密性        | 数学难题（如大数分解、椭圆曲线离散对数） |
|  **适用场景**  |  数据加密（传输/存储）   |       密钥交换、数字签名、身份认证       |

### 主流加密方式详解

```bash
1. AES（高级加密标准）
特点：
  - 对称加密算法，加密和解密使用相同的密钥。密钥长度可以是128位、192位或256位，安全性高。
  - 基于字节替换、行移位、列混合和轮密钥加等操作，通过多轮加密来混淆和扩散明文信息。如 AES-128 的加密轮数是10轮，能有效抵抗各种密码分析攻击。
应用场景：
  - 广泛用于网络通信加密，如SSL/TLS协议中部分加密环节。当用户访问安全网站（https开头）时，数据传输可能采用AES加密，防止数据被窃取或篡改。
  - 用于文件加密和数据库加密，如操作系统中的加密文件系统，企业存储敏感数据（用户密码、财务数据等）也常用AES加密。


2. DES（数据加密标准）
特点：
  - 对称加密算法，密钥长度64位，其中有效位56位。采用Feistel网络结构，将明文分组后进行16轮加密。
  - 由于密钥长度较短，随着计算能力提升，安全性逐渐降低。
应用场景：
	- 早期广泛应用在金融领域（银行系统间资金转账、账户余额查询等数据传输）和企业内部（保护商业文件），现因安全性问题逐渐被替代，但在一些兼容旧系统场景下仍可能出现。


3. MD5（MD5信息摘要算法）
特点：
  - 产生128位的消息摘要，主要用于验证数据完整性。它是一种哈希函数，将任意长度的数据转换为固定长度的哈希值。
  - 算法速度快，但安全性有缺陷，容易出现碰撞（不同的数据产生相同的哈希值）。
应用场景：
	- 曾经用于密码存储，但由于安全性差，现在不建议用于密码验证。可用于简单的数据完整性检查，如文件下载时检查文件是否被篡改。


4. SHA-256（安全哈希算法256位）
特点：
  - 属于SHA-2系列哈希算法，产生256位的哈希值。比MD5更安全，抗碰撞能力强。
  - 计算过程复杂，通过一系列的位运算和逻辑运算对输入数据进行处理。
应用场景：
  - 用于数字货币（如比特币）的挖矿过程和区块链技术中，确保交易信息完整性和不可篡改性。
  - 在安全认证和数字签名等场景也广泛应用。


5. DSA（数字签名算法）
特点：
  - 用于数字签名，是一种非对称加密算法。包括私钥和公钥，私钥用于签名，公钥用于验证签名。
  - 基于离散对数问题的数学难题，保证签名的安全性和不可否认性。
应用场景：
	- 电子政务、电子商务等领域，用于签署电子合同、电子文件等，确保文件的来源真实性和完整性。


6. ECDSA（椭圆曲线数字签名算法）
特点：
  - 基于椭圆曲线密码体制的数字签名算法，相比DSA，它在相同安全强度下密钥长度更短，效率更高。
  - 利用椭圆曲线上的点运算来实现签名和验证功能。
应用场景：
	- 广泛应用于区块链技术、移动设备安全（如移动支付签名）和物联网安全等领域。


7. Elliptic（椭圆曲线密码体制）
特点：
  - 基于椭圆曲线的数学理论构建密码系统，除了数字签名（如ECDSA），还可用于密钥交换和加密。
  - 提供与传统密码体制（如RSA）相当的安全性，但密钥长度更短，计算资源需求可能更低。
应用场景：
	- 在资源受限的设备（如物联网设备）和对安全要求较高的移动应用中有很好的应用前景。


8. HMAC（密钥相关的哈希运算消息认证码）
特点：
  - 结合了哈希函数和密钥，用于验证消息的完整性和真实性。它可以使用不同的哈希函数（如SHA-1、SHA-256等）作为基础。
  - 计算方式是将密钥和消息通过特定的算法组合后进行哈希运算，接收方使用相同的密钥和算法进行验证。
应用场景：
	- 在网络通信中，用于验证消息在传输过程中是否被篡改，如在IPsec协议中用于数据完整性验证。


9. Rand（随机数生成）
特点：
  - 用于生成随机数，在密码学中，高质量的随机数对于密钥生成等操作至关重要。真正的随机数应该是不可预测的。
  - 分为伪随机数和真随机数，伪随机数是通过算法生成的看似随机的序列，真随机数通常依赖于物理现象（如热噪声）生成。
应用场景：
	- 用于生成加密密钥、初始化向量（IV）等，在各种加密算法和安全协议中都有应用。


10. RC4（Ron Rivest设计的流密码）
特点：
  - 对称加密算法，属于流密码。加密和解密速度快，以字节为单位进行加密操作。
  - 密钥长度可变，但安全性存在一定问题，容易受到攻击。
应用场景：
	- 曾广泛用于网络协议（如SSL早期版本）的加密，但由于发现安全漏洞，现在使用较少。


11. RSA（非对称加密算法）
特点：
  - 基于大整数分解和欧拉定理，使用一对密钥（公钥和私钥）。公钥用于加密，私钥用于解密，或者私钥用于签名，公钥用于验证签名。
  - 安全性基于数学难题，密钥长度较长，计算开销相对较大。
应用场景：
	- 用于安全通信中的密钥交换，如在SSL/TLS协议中，先使用RSA交换AES等对称加密算法的密钥。
	- 也用于数字签名，确保文件的真实性和不可否认性。


12. Cipher（密码）
特点：
  - 这是一个比较宽泛的概念，涵盖了各种加密和解密算法、技术和工具。
  - 不同的密码系统有不同的特点，包括对称和非对称加密、分组密码和流密码等多种类型。
应用场景：
	- 根据具体的密码类型（如AES、RSA等）应用于不同的安全领域，从网络安全到数据存储安全等各个方面。
```



### 计算摘要 hash

```bash
Hash 是一种用于计算数据摘要的算法，它可以将任意长度的数据映射为固定长度的哈希值。
Hash 对象是单向的，不能从哈希值中恢复原始数据。因此 Hash 算法通常用于验证数据完整性、数据签名和密码存储等场景。
在密码场景中，通常将密码的哈希值存储在数据库中，而不是存储密码本身，以提高安全性。当用户登录时，将输入的密码进行哈希计算，然后将计算得到的哈希值与数据库中存储的哈希值进行比较，以验证密码是否正确。

在 crypto 模块中，可以使用 `const hash = crypto.createHash(algorithm)` 方法创建一个 Hash 对象。
`algorithm` 参数指定要使用的哈希算法，例如 "sha256"、"md5" 等。
可以使用 `crypto.getHashes()` 方法获取支持的哈希算法列表。



### hash 对象实例方法
1. 计算摘要：hash.digest([encoding])
		encoding 可以是 hex、latin1 或者 base64。
	如果声明了 encoding，那么返回字符串。否则，返回Buffer实例。
	注意：调用 hash.digest() 后，hash 对象就作废了，再次调用就会出错。

2. hash.update(data[, input_encoding])：
		input_encoding 可以是 utf8、ascii 或者 latin1。
	如果 data 是字符串，且没有指定 input_encoding，则默认是utf8。
	注意：hash.update() 方法可以调用多次。
```

```js
const cryptos = require("crypto")

// 创建了一个 SHA-256 的 Hash 对象
const algorithm = "sha256"
const hash = cryptos.createHash(algorithm)

// 使用 update() 方法将 data 字符串写入 Hash 对象中
const data = "Hi, willys"
hash.update(data)

// 使用 digest() 方法获取哈希值，以十六进制字符串的形式返回
const digest = hash.digest("hex")

console.log(digest) // 5412b888d0f63cc2269dab76826196fb5f37cd4253f081ff0fa9def0c3e4f1b4
```



### 消息认证 HMAC

```bash
HMAC（Hash-base Message Authentication Code）是一种基于哈希函数和密钥的消息认证算法，可用于验证消息的完整性和真实性。
HMAC 是使用 key 标记信息的加密hash（加密哈希信息认证码），接收者使用相同的key逆运算来认证hash。
hmac 主要应用在身份验证中，认证流程如下：
	1. 客户端发出登录请求（假设是浏览器的GET请求）
	2. 服务器返回一个随机值，并在会话中记录这个随机值
	3. 客户端将该随机值作为密钥，用户密码进行hmac运算，然后提交给服务器
	4. 服务器读取用户数据库中的用户密码和步骤2中发送的随机值做与客户端一样的hmac运算，然后与用户发送的结果比较，如果结果一致则验证用户合法。



在 crypto 模块中，可以使用 `crypto.createHmac(algorithm, key)` 方法创建一个 HMAC 对象。
	- `algorithm` 参数指定要使用的哈希算法，例如 "sha256"、"md5" 等。
	- key 参数指定用于计算 HMAC 的密钥。
	可以使用 `crypto.getHashes()` 方法获取支持的哈希算法列表。
```

```js
const cryptos = require("crypto")

// 创建了一个 SHA-256 的 Hash 对象
const algorithm = "sha256"
const key = "willy-key"
const hmac = cryptos.createHmac(algorithm, key)

// 使用 update() 方法将 data 字符串写入 Hash 对象中
const data = "Hi, willys"
hmac.update(data)

// 使用 digest() 方法获取哈希值，以十六进制字符串的形式返回
const digest = hmac.digest("hex")

console.log(digest) // ff21d18da8f432e60025a04db1eccdc39b1574edb5e5ae49d3ad8d1509335cfe
```



### 散列函数 md5

```bash
MD5（Message-Digest Algorithm）是计算机安全领域广泛使用的散列函数（又称哈希算法、摘要算法），主要用来确保消息的完整和一致性。


### 应用场景：
1. 文件完整性校验：如从网上下载一个软件，一般网站都会将软件的 md5 值附在网页上，用户下载完软件后，可对下载到本地的软件进行 md5 运算，然后跟网站上的 md5 值进行对比，确保下载的软件是完整的、正确的。
2. 密码保护：将 md5 加密后的密码保存到数据库，而不是保存明文密码，避免拖库等事件发生后导致明文密码外泄。
3. 防篡改：比如数字证书的防篡改，就用到摘要算法（还需要结合数字签名等手段）


### 特点：
1. 运算速度快
2. 输出长度固定：输入长度不固定，输出长度固定为 128 位。
3. 运算不可逆：已知运算结果的情况下，无法通过逆运算得到原始字符串。
4. 高度离散：输入的微小变化，可导致运算结果差异巨大。
5. 弱碰撞性：不同输入的散列值可能相同。


### 单纯 md5 加密的缺陷
因为相同的明文密码 md5 值也相同，所以当攻击者知道加密算法是 md5，且知道数据库里存储的密码值时，理论上可推测出用户的明文密码。
事实上，彩虹表也是这么暴力破解的：事先将常见明文密码的 md5 值运算好存储起来，然后跟网站数据库里存储的密码进行匹配就能快速找到用户的明文密码（此时可以使用 "密码加盐" 来进一步提升安全性）



### 密码加盐
密码加盐的原理：在密码特定位置插入特定字符串后，再对修改后的字符串进行 md5 运算加密。
例如同样的密码，当 "盐值" 不一样时 md5 值的差异非常大。通过密码加密，可以防止最初级的暴力破解。如果攻击者事先不知道 "盐值"，破解的难度就会非常大。
```

```js
const cryptos = require("crypto")

const cryptoPwd = (password) => {
    const md5 = cryptos.createHash("md5")
    return md5.update(password).digest("hex")
}

const password = "123456"
// 服务器端加密
console.log(cryptoPwd(password)) // e10adc3949ba59abbe56e057f20f883e

// 他人恶意暴力破解
console.log(cryptoPwd("123456")) // e10adc3949ba59abbe56e057f20f883e
```



### 盐值加密

```js
const cryptos = require('crypto')

/** 密码盐值加密 */
const cryptoPwd = (password, savedSalt = '') => {
  // 生成随机的盐值
  const salt = cryptos.randomBytes(16).toString('hex')

  // 对密码进行哈希处理（如果为用户注册时则使用随机生成的盐值，如果用户登录时则拿用户注册的盐值进行校验）
  const hash = cryptos
    .pbkdf2Sync(password, savedSalt || salt, 1000, 64, 'sha512')
    .toString('hex')

  // 将盐值和哈希值保存到数据库中
  const savedPassword = { salt, hash }
  return savedPassword
}

// 当用户注册时时，获取保存的盐值和哈希值
const password = 'willy' // 假设用户输入的密码为 "password"
const savedPassword = cryptoPwd(password)
const savedSalt = savedPassword.salt
const savedHash = savedPassword.hash

// 对用户输入的密码进行哈希处理，并与保存的哈希值进行比较
const loginPassword = cryptoPwd('willy', savedSalt)
const loginHash = loginPassword.hash

if (loginHash === savedHash) {
  console.log('密码正确', loginHash)
} else {
  console.log('密码错误', loginHash, savedHash)
}
```



### RSA

```bash
攻击防御方案
- 使用短密钥(如512位) - 易被暴力破解：强制密钥长度 ≥ 2048 位
- 重用同一密钥对 - 增加侧信道攻击风险：定期轮换密钥（每 1-2 年）
- 明文存储私钥 - 私钥泄露导致系统崩溃：加密存储 + 访问控制
- 忽略填充验证 - 填充 Oracle 攻击：使用标准库而非手动实现加密逻辑
```

```js
const crypto = require('crypto')

// 1. 生成密钥对
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
})

// 2. 加密
const encrypt = (plaintext) => {
  return crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(plaintext),
  )
}

// 3. 解密
const decrypt = (ciphertext) => {
  return crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    ciphertext,
  )
}

// 使用示例
const message = 'Data to encrypt'
const encrypted = encrypt(message)
console.log('加密结果:', encrypted.toString('base64'))
console.log('解密结果:', decrypt(encrypted).toString())
```



### DES

```bash
对称加密技术 - DES（数据加密标准）算法主要采用替换和移位的方式进行加密，它用56位（64位密钥只有56位有效）对64位二进制数据块进行加密，每次加密对64位的输入数据进行16轮编码，经过一系列替换和移位后，输入的64位原数据转换成完全不同的64位输出数据。

DES算法的入口参数有三个：Key、Data、Mode。
	- Key为8个字节共64位，是DES算法的工作密钥；
	- Data也为8个字节64位，是要被加密或被解密的数据；
	- Mode为DES的工作方式，有两种：加密或解密。

DES算法具有极高安全性，到目前为止，除了用穷举搜索法对DES算法进行攻击外，还没有发现更有效的办法。而56位长的密钥的穷举空间为256，这意味着如果一台计算机的速度是每一秒种检测一百万个密钥，则它搜索完全部密钥就需要将近2285年的时间。而以现代计算能力24小时内即可被破解，可考虑把DES密钥的长度再增长一些，以此来达到更高的保密程度。

DES算法中只用到64位密钥中的其中56位，而第8、16、24、......64位8个位（奇偶校验位）并未参与DES运算，这一点，向我们提出了一个应用上的要求，即DES的安全性是基于除了8，16，24，......64位外的其余56位的组合变化256才得以保证的。因此，在实际应用中，我们应避开使用第8，16，24，......64位作为有效数据位，而使用其它的56位作为有效数据位，才能保证DES算法安全可靠地发挥作用。如果不了解这一点，把密钥Key的8，16，24，..... .64位作为有效数据使用，将不能保证DES加密数据的安全性，对运用DES来达到保密作用的系统产生数据被破译的危险，这正是DES算法在应用上的误区，留下了被人攻击、被人破译的极大隐患。
```

**DES加解密(web版)**

```ts
import * as CryptoJS from 'crypto-js'

/** 加密 */
const encryptDES = (message: string, key: string): string => {
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.toString()
}

/** 解密 */
const decryptDES = (encryptedMessage: string, key: string): string => {
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  const decrypted = CryptoJS.DES.decrypt(encryptedMessage, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

/** DES - CBC（密码分组链接）模式加密 */
const encryptDESWebCrypto = async (
  message: string,
  key: string,
): Promise<string> => {
  // 将消息和密钥转换为字节数组
  const encoder: TextEncoder = new TextEncoder()
  const data: Uint8Array = encoder.encode(message)
  const keyBuffer: Uint8Array = encoder.encode(key)

  const cryptoKey = await CryptoJS.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'DES - CBC', length: 64 },
    false,
    ['encrypt'],
  )
  const iv: Uint8Array = CryptoJS.getRandomValues(new Uint8Array(8))
  const encryptedData = await CryptoJS.subtle.encrypt(
    { name: 'DES - CBC', iv },
    cryptoKey,
    data,
  )

  const encryptedArray: Uint8Array = new Uint8Array(encryptedData)
  const combined: Uint8Array = new Uint8Array(iv.length + encryptedArray.length)
  combined.set(iv)
  combined.set(encryptedArray, iv.length)
  return btoa(String.fromCharCode.apply(null, Array.from(combined)))
}

/* DES - CBC（密码分组链接）模式解密 */
const decryptDESWebCrypto = async (
  encryptedMessage: string,
  key: string,
): Promise<string> => {
  const decoder: TextDecoder = new TextDecoder()
  const encryptedArray: Uint8Array = new Uint8Array(
    atob(encryptedMessage)
      .split('')
      .map((c) => c.charCodeAt(0)),
  )
  const iv: Uint8Array = encryptedArray.slice(0, 8)
  const encryptedData: Uint8Array = encryptedArray.slice(8)
  const keyBuffer: Uint8Array = new TextEncoder().encode(key)
  const cryptoKey = await CryptoJS.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'DES - CBC', length: 64 },
    false,
    ['decrypt'],
  )
  const decryptedData = await CryptoJS.subtle.decrypt(
    { name: 'DES - CBC', iv },
    cryptoKey,
    encryptedData,
  )
  return decoder.decode(decryptedData)
}

const message: string = 'This is a secret message'
const key: string = 'mysecretkey'

const encryptedMessage = encryptDES(message, key)
console.log('加密消息:', encryptedMessage)
const decryptedMessage = decryptDES(encryptedMessage, key)
console.log('解密消息:', decryptedMessage)

encryptDESWebCrypto(message, key).then((encryptedMessageRes) => {
  console.log(encryptedMessageRes)

  decryptDESWebCrypto(encryptedMessageRes, key).then((result) => {
    console.log(result)
  })
})
```

### AES

```bash
1. 密钥长度和安全性
1.1 密钥长度
DES：DES（数据加密标准）的密钥长度是 64 位，但其中有 8 位用于奇偶校验，所以实际有效密钥长度为 56 位。这种相对较短的密钥长度在现代计算环境下安全性较低。
AES：AES（高级加密标准）支持多种密钥长度，包括 128 位、192 位和 256 位。较长的密钥长度使得 AES 能够抵抗更强大的暴力破解攻击，提供更高的安全性。例如，使用暴力破解方法破解 AES-256 加密的数据，在目前的计算技术下几乎是不可行的。

1.2 安全性对比
DES 的安全性问题：56位的密钥长度已不足以保证数据的安全性，以目前计算机算力，可通过大规模的并行计算在合理的时间内破解 DES 加密的数据。
AES 的安全性优势：AES 的设计结构和密钥长度使其在理论和实践中都具有很高的安全性。其采用的分组密码体制和复杂的轮函数变换，在多轮加密过程中有效地混淆和扩散了明文信息，从而抵抗各种密码分析攻击。


2. 加密算法结构和轮数
2.1 算法结构
DES：DES 采用 Feistel 网络结构。它将64位的明文分组分为左右两部分（各32位），在每一轮加密中，右半部分通过一个函数（涉及子密钥）变换后与左半部分进行异或操作，然后左右部分交换，重复 16 轮这样的操作。最后通过逆初始置换得到密文。
AES：AES 的结构基于字节替换、行移位、列混合和轮密钥加等操作。它以 128 位（16字节）为一个分组，根据密钥长度的不同（128/192/256 位），加密轮数分别为 10 轮、12 轮或 14 轮。例如，在 AES-128 中，128 位的明文分组在 10 轮的加密过程中，每一轮都进行字节替换（通过 S - 盒）、行移位、列混合和轮密钥加操作，使得明文信息充分混淆。

2.2 轮数影响
DES 轮数固定为 16 轮：16 轮的 Feistel 网络结构在当时的设计中有其合理性，但随着密码分析技术的发展，这种固定轮数和相对简单的结构（相比 AES）使得 DES 更容易被分析和攻击。
AES 轮数根据密钥长度变化：AES 的轮数根据密钥长度而变化，更多的轮数意味着更高的安全性，但也会带来一定的计算开销。且现代计算机硬件能够较好地处理 AES 加密所需的计算量。


3. 工作模式和应用场景
3.1 工作模式
DES 工作模式：DES 常见的工作模式有电子密码本（ECB）模式和密码分组链接（CBC）模式。
		ECB 模式是将明文分组直接加密，但这种模式可能会出现相同明文分组加密后得到相同密文分组的情况，存在安全隐患。
		CBC 模式通过将前一个密文分组与当前明文分组进行异或操作后再加密，一定程度上增强了安全性。
AES 工作模式：AES 除 ECB 和 CBC 模式外，还有计数器（CTR）模式、伽罗瓦/计数器（GCM）模式等。
		CTR 模式将计数器的值与密钥进行加密后与明文进行异或操作，它在加密和解密过程中可以并行处理，效率较高。
		GCM 模式则结合了加密和认证功能，在安全性要求较高的场景中广泛应用。

3.2 应用场景
DES 早期广泛应用在金融领域（银行系统间资金转账、账户余额查询等数据传输）和企业内部（保护商业文件），现因安全性问题逐渐被替代，但在一些兼容旧系统场景下仍可能出现。
AES 由于其高安全性和灵活性，被广泛应用在网络通信加密（如 SSL/TLS 协议）、文件加密（操作系统的加密文件系统）、数据库加密、移动设备加密等场景。


4. 攻击防御方案
- 重放攻击：在加密数据中添加时间戳 + 序列号
- Padding Oracle：适用认证加密（如GCM）替代 CBC
- 密钥泄露：实施密钥分层（主密钥 → 数据密钥） + 硬件隔离
```

**AES-256-CBC 加/解密(NodeJS版)**

```js
const cryptos = require("crypto")

const algorithm = "aes-256-cbc" // 加密算法
const key = cryptos.randomBytes(32) // 根据加密算法生成一个32字节的密钥
const iv = cryptos.randomBytes(16) // 生成长度为 16 字节的随机数作为 iv

const data = "hello world" // 要加密的数据

/** 创建加密器 */
const cipher = cryptos.createCipheriv(algorithm, key, iv)
let encrypted = cipher.update(data, "utf8", "hex")
encrypted += cipher.final("hex")
console.log("encrypted:", encrypted) // encrypted: e221f586cf104b2d0d5d58166a8cfe69

/** 创建解密器 */
const decipher = cryptos.createDecipheriv(algorithm, key, iv)
let decrypted = decipher.update(encrypted, "hex", "utf8")
decrypted += decipher.final("utf8")
console.log("decrypted:", decrypted) // decrypted: hello world
```



**AES-256-GCM 加/解密(NodeJS版)**

```js
const crypto = require('crypto')

// 加密
function encrypt(plaintext, key) {
  const iv = crypto.randomBytes(12) // GCM 推荐 12 字节 IV
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ])
  const authTag = cipher.getAuthTag()
  return {
    iv: iv.toString('hex'),
    encrypted: encrypted.toString('hex'),
    authTag: authTag.toString('hex'),
  }
}

// 解密
function decrypt(encryptedData, key) {
  const iv = Buffer.from(encryptedData.iv, 'hex')
  const encrypted = Buffer.from(encryptedData.encrypted, 'hex')
  const authTag = Buffer.from(encryptedData.authTag, 'hex')

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(authTag)

  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString(
    'utf8',
  )
}

// 使用示例
const key = crypto.randomBytes(32)
const original = '敏感数据'

const encrypted = encrypt(original, key)
console.log('加密结果:', encrypted)

const decrypted = decrypt(encrypted, key)
console.log('解密结果:', decrypted) // 应与 original 相同
// 加密结果: { iv: 'a1b2c3d4e5f6g7h8i9j0', encrypted: 'a1b2c3d4e5f6g7h8i9j0', authTag: 'a1b2c3d4e5f6g7h8i9j0' }
```



### SM4

```bsh
SM4 是中国国家密码管理局 (GM/T) 发布的商用分组密码标准，属于对称加密算法，适用于物联网、金融等领域的数据加密需求。
对标国际算法：AES-128（但设计结构不同）
合规要求：中国金融、政务系统强制使用 SM 系列算法
```



## 断言测试 assert

```bash
在 Node.js 中，assert 模块用于进行断言测试，它提供一组用于验证条件的函数，如果条件不满足，就会抛出错误。
用于进行断言测试和错误处理。在开发过程中，可以使用它来确保代码的正确性，但在生产环境中应该谨慎使用，以避免不必要的错误抛出。


#### 注意事项
1. 断言失败会抛出错误：
   - 当断言条件不满足时，`assert`模块会抛出一个`AssertionError`。在生产环境中，通常不应该使用断言，因为抛出错误可能会导致应用程序崩溃。在开发和测试环境中，可以使用断言来帮助调试和确保代码的正确性。
2. 自定义错误消息：
   - 大多数`assert`函数都接受一个可选的`message`参数，可以用来提供更详细的错误消息。这对于在断言失败时快速理解问题很有帮助。
3. 与其他测试框架的结合：
   - 虽然`assert`模块可以用于简单的测试，但在实际项目中，通常会使用更强大的测试框架，如`Mocha`、`Jest`等。这些框架提供了更多的功能和更好的测试报告。
   
   
   
#### 用途
1. 单元测试：
	- 在编写单元测试时，可以使用`assert`模块来验证函数的输出是否符合预期。
	- 例如，测试一个加法函数是否正确地返回两个数的和。

2. 调试和错误处理：
	- 在开发过程中，可以使用断言来检查代码中的假设是否成立。
	- 如果假设不成立，说明可能存在错误，可以快速定位问题。



#### 主要方法
1. 真值：assert.ok(value[, message])
检查 `value` 是否为真值（即不是`false`、`0`、`''`、`null`、`undefined`和`NaN`）。
如果不是真值，就会抛出一个带有可选`message`的`AssertionError`。


2. 相等：assert.equal(actual, expected[, message])
检查`actual`和`expected`是否严格相等（使用`===`运算符）。
如果不相等，就会抛出一个带有可选`message`的`AssertionError`。

3. 不等：assert.notEqual(actual, unexpected[, message])
检查`actual`和`unexpected`是否不严格相等（使用`!==`运算符）。
如果相等，就会抛出一个带有可选`message`的`AssertionError`。

4. 深度相等：assert.deepEqual(actual, expected[, message])
递归地比较`actual`和`expected`是否相等。它会比较对象的属性和数组的元素，而不仅仅是引用相等。
如果不相等，就会抛出一个带有可选`message`的`AssertionError`。

5. 不深度相等：assert.notDeepEqual(actual, unexpected[, message])
与`assert.deepEqual`相反，检查`actual`和`unexpected`是否不深度相等。
如果相等，就会抛出一个带有可选`message`的`AssertionError`。
```

**方法示例**

```js
const assert = require('assert');

assert.ok(true); // 不会抛出错误
assert.ok(false, 'Value should be true'); // 会抛出 AssertionError: Value should be true

assert.equal(1, 1); // 不会抛出错误
assert.equal(1, 2, 'Values should be equal'); // 会抛出 AssertionError: Values should be equal

assert.notEqual(1, 2); // 不会抛出错误
assert.notEqual(1, 1, 'Values should not be equal'); // 会抛出 AssertionError: Values should not be equal

const obj1 = { a: 1, b: 2 };
const obj2 = { a: 1, b: 2 };
assert.deepEqual(obj1, obj2); // 不会抛出错误
assert.notDeepEqual(obj1, obj2, 'Objects should not be deeply equal'); // 会抛出 AssertionError: Objects should not be deeply equal
```

**用途示例**

```js
// 测试一个加法函数是否正确地返回两个数的和
function add(a, b) {
  return a + b;
}
const assert = require('assert');
assert.equal(add(2, 3), 5); // 验证加法函数的结果


// 调试和错误处理
function divide(a, b) {
  assert.ok(b!== 0, 'Division by zero is not allowed');
  return a / b;
}
divide(10, 2); // 正常执行
divide(10, 0); // 会抛出 AssertionError: Division by zero is not allowed
```



## 爬虫 puppeteer

```bash
Puppeteer 用来模拟 Chrome 浏览器的运行，它提供了高级 API 来通过 DevTools 协议控制 Chrome 或 Chromium。Puppeteer 默认情况下无头运行，但可以配置为运行完整（无头）的 Chrome 或 Chromium。
由于它在初始化时启动了一个新的 Chrome 实例，因此它可能不是性能最好的。这是使用 Chrome 自动化测试的最精确方法，因为它使用的是真正的浏览器。
确切地说，它使用 Chrome 的开源部分 Chromium，这主要意味着它没有 Google 许可且无法开源的专有编解码器（MP3、AAC、H.264..），也没有与崩溃报告、谷歌更新等谷歌服务的集成，但从编程的角度来看，它应该与 Chrome 100% 相似（除了媒体播放）。


安装：`$ pnpm i puppeteer-core`

作用：
    - 抓取网页
    - 自动化表单提交
    - 执行任何类型的浏览器自动化
    - 跟踪页面加载性能
    - 创建单页应用的服务器端渲染版本
    - 制作屏幕截图
    - 创建自动化测试
    - 从网页生成 PDF
```

```js
const puppeteer = require("puppeteer-core")

;(async () => {
    // 使用 puppeteer.launch 方法启动 Chrome 或 Chromium 浏览器
    const browser = await puppeteer.launch({
        executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        headless: false, // 关掉无界面模式 或 false（可视化）
        slowMo: 250, // 慢速度，slowMo选项以指定的毫秒减慢Puppeteer的操作
    })

    // 使用 browser.newPage 方法创建一个新页面
    const page = await browser.newPage()

    // 使用 page.goto 方法跳转到指定的网页并加载：
    await page.goto("https://cc.163.com/")

    // 捕获console的输出,通过监听console事件
    page.on("console", (msg) => console.log("PAGE LOG:", ...msg.args))

    // 使用 page.evaluate(pageFunction, ...args) 执行 JavaScript 代码并获取页面内容
    const dimensions = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio,
            title: document.title,
            href: location.href,
        }
    })
    console.log("Dimensions: ", dimensions)

    // 截屏
    await page.screenshot({ path: "willy.png" })

    // 打印页面成 pdf
    await page.pdf({ path: "willy.pdf", format: "A4" })

    // 使用 browser.close 方法关闭浏览器
    await browser.close()
})()
```

### Page 方法

调用 `browser.newPage()` 得到的 `page` 对象，所有方法都返回一个 Promise，因此它们通常带有 `await` 关键字。

#### 查询dom节点 page.$()

允许访问页面上的 `querySelector()` 方法

#### 查询全部dom节点 page.$$()

允许访问页面上的 `querySelectorAll()` 方法

#### 查询dom节点并传入函数 page.$eval()

接受 2 个或更多参数。第一个是选择器，第二个是函数。如果有更多参数，则这些参数将作为附加参数传递给函数。

它在页面上运行 `querySelectorAll()`，使用第一个参数作为选择器，然后将该参数用作函数的第一个参数。

```js
const innerTextOfButton = await page.$eval(
  'button#submit',
  (el) => el.innerText
)
```

#### 点击事件 click()

在作为参数传递的元素上执行鼠标单击事件：

```js
await page.click('button#submit')
```

我们可以传递一个带有选项对象的附加参数：

- `button` 可以设置为 `left`（默认）、`right` 或 `middle`
- `clickCount` 是一个默认为 1 的数字，用于设置应单击元素的次数
- `delay` 是点击之间的毫秒数。默认为 `0`

#### 获取页面内容 content()

获取页面的 HTML 源代码：

```js
const source = await page.content()
```

#### 模拟设备 emulate()

`emulate()` 用于模拟设备。它将用户代理设置为特定设备，并相应地设置视口。

以下是模拟 iPhone X 的方法：

```js
const puppeteer = require('puppeteer')
const device = require('puppeteer/DeviceDescriptors')['iPhone X']

puppeteer.launch().then(async (browser) => {
  const page = await browser.newPage()
  await page.emulate(device)

  //do stuff

  await browser.close()
})
```

#### 计算函数 evaluate()

在页面上下文中计算函数。在这个函数中可以访问 `document` 对象，因此可以调用任何 DOM API。

在此处调用的任何内容都在页面上下文中执行，因此如果运行 `console.log()`，将不会在 Node.js 上下文中看到结果，因为这是在无头浏览器中执行的。

我们可以在这里计算值并返回 JavaScript 对象，但如果想返回一个 DOM 元素并在 Node.js 上下文中访问它，必须使用方法 `evaluateHandle()`。如果从 `evaluate()` 返回一个 DOM 元素，我们只会得到一个空对象。

```js
const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://github.com/lio-zero')

  const result = await page.evaluate(() => {
    return document.querySelector('.avatar-user').length
  })

  console.log(result)
})()
```



#### 计算函数并返回DOM元素 evaluateHandle()

类似于 `evaluate()`，但是如果返回一个 DOM 元素，将得到正确的对象而不是一个空对象：

```js
const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://github.com/lio-zero')

  const result = await page.evaluateHandle(() => {
    return document.querySelector('.avatar-user')
  })

  console.log(result)
})()
```

#### 导出函数 exposeFunction()

此方法允许在浏览器上下文中添加一个新函数，该函数在 Node.js 上下文中执行。这意味着可以添加一个在浏览器中运行 Node.js 代码的函数。

此示例在浏览器上下文中添加一个 `test()` 函数，该函数从文件系统读取 `app.js` 文件，其路径相对于脚本：

```js
const puppeteer = require('puppeteer')
const fs = require('fs')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://github.com/lio-zero')

  await page.exposeFunction('test', () => {
    const loadData = (path) => {
      try {
        return fs.readFileSync(path, 'utf8')
      } catch (err) {
        console.error(err)
        return false
      }
    }
    return loadData('app.js')
  })

  const result = await page.evaluate(() => {
    return test()
  })

  console.log(result)
})()
```

#### 聚焦元素 focus()

聚焦元素：

```js
await page.focus('input#name')
```

#### 页面回退 goBack()

返回页面导航历史：

```js
await page.goBack()
```

#### 页面前进 goForward()

在页面导航历史中前进：

```js
await page.goForward()
```

#### 打开页面 goto()

打开一个新页面：

```js
await page.goto('https://github.com/lio-zero')
```

可以使用选项将对象作为第二个参数传递。其中，如果传递了 `waitUntil: networkidle2`，将等到导航完成：

```js
await page.goto('https://github.com/lio-zero', { waitUntil: 'networkidle2' })
```

#### 页面悬停 hover()

在作为参数传递的选择器上执行鼠标悬停：

```js
await page.hover('input#name')
```

#### 生成pdf文件 pdf()

从页面生成 PDF：

注意：`launch` 方法不要设置 `headless` 选项的值为 `false`。

```js
await page.pdf({ path: 'file.pdf' })
```

#### 重加载页面 reload()

重新加载页面：

```js
await page.reload()
```

#### 页面截图 screenshot()

获取页面的 PNG 截图，将其保存到使用 `path` 选择的文件名：

```js
await page.screenshot({ path: 'screenshot.png' })
```

#### 选择dom元素 select()

选择作为参数传递的选择器标识的 DOM 元素

```js
await page.select('input#name')
setContent()
```

可以设置页面的内容，而不是打开现有的网页。对于以编程方式使用现有 HTML 生成 PDF 或屏幕截图非常有用：

```js
const html = '<h1>Hello!</h1>'
await page.setContent(html)
await page.pdf({ path: 'hello.pdf' })
await page.screenshot({ path: 'screenshot.png' })
```

#### 设置视窗大小 setViewPort()

默认情况下，视口为 `800 x 600`。如果想有一个不同的视口，也许需要截屏，调用 `setViewport` 传递一个带有 `width` 和 `height` 属性的对象。

```js
await page.setViewport({ width: 1280, height: 800 })
```

#### 获取页面标题 title()

获取页面标题：

```js
await page.title()
```

#### type()

输入标识表单元素的选择器

```js
await page.type('input#name', 'lotto')
```

`delay` 选项允许像真实用户一样模拟打字，在每个字符之间添加延迟：

```js
await page.type('input#name', 'lotto', { delay: 100 })
```

#### url()

获取页面地址：

```js
await page.url()
```

#### viewport()

获取页面视口：

```js
await page.viewport()
```

#### waitFor()

等待特定的事情发生。具有以下快捷功能：

- `waitForFunction`
- `waitForNavigation`
- `waitForRequest`
- `waitForResponse`
- `waitForSelector`
- `waitForXPath`

```js
await page.waitFor(waitForNameToBeFilled)
const waitForNameToBeFilled = () => page.$('input#name').value != ''
```

### Page 命名空间

`page` 对象可以访问几个不同的对象：

- `accessibility`
- `coverage`
- `keyboard`
- `mouse`
- `touchscreen`
- `tracing

```js
// 触发 `input` 元素的方式
await page.keyboard.type('hello!')
```

其他键盘方法是：

- `keyboard.down()` 发送 `keydown` 事件
- `keyboard.press()` 发送一个 `keydown` 后跟一个 `keyup`（模拟普通键类型）。主要用于修饰键（`shift`、`ctrl` 和 `cmd`）
- `keyboard.sendCharacter()` 发送按键事件
- `keyboard.type()` 发送 `keydown`、`keypress` 和 `keyup` 事件
- `keyboard.up()` 发送 `keyup` 事件

`mouse` 提供 4 种方法：

- `mouse.click()` 模拟点击：`mousedown` 和 `mouseup` 事件
- `mouse.down()` 模拟 `mousedown` 事件
- `mouse.move()` 移动到不同的坐标
- `mouse.up()` 模拟 `mouseup` 事件



### 爬虫模拟登录

```ts
const puppeteer = require("puppeteer-core")
// import puppeteer from "puppeteer-core"
import type { Page, Browser } from "puppeteer-core"

const newPage = async (): Promise<{
    browser: Browser
    page: Page
}> => {
    const options = {
        executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        headless: false, // 关掉无界面模式 或 false（可视化）
        // slowMo: 250, // 慢速度，slowMo选项以指定的毫秒减慢Puppeteer的操作
        //设置视窗的宽高
        defaultViewport: {
            width: 1400,
            height: 800,
        },
        args: ["--window-size=1400,700"],
    }

    // 使用 puppeteer.launch 方法启动 Chrome 或 Chromium 浏览器
    const browser = await puppeteer.launch(options)

    // 使用 browser.newPage 方法创建一个新页面
    const page: Page = await browser.newPage()
    return {
        browser,
        page,
    }
}

const doPyt = async () => {
    const { page, browser } = await newPage()

    await page.goto("https://baidu.com")
    await page.type("#kw", "puppeteer", { delay: 100 })
    page.click("#su")
    await page.waitForSelector("#content_left")
    const targetLink = await page.evaluate(() => {
        const links = Array.prototype
            .concat(...document.querySelectorAll(".result a"))
            .filter((item) => {
                return item.innerText && item.innerText.includes("Puppeteer")
            })
        console.log(links)
        if (links.length > 0) {
            return links[0].href
        } else {
            // throw new Error("未找到相关链接")
            return "https://baidu.com"
        }
    })
    await page.goto(targetLink, { timeout: 60000 })
    await page.waitForSelector("#content_left")
    browser.close()
}
doPyt()
```

![爬虫](./image/e70bfa89b435885a8705d32af28fa5123d4c38da.gif)

### 多元素处理

```ts
const puppeteer = require("puppeteer-core")
import type { Page, Browser } from "puppeteer-core"

const newPage = async (): Promise<{
    browser: Browser
    page: Page
}> => {
    const options = {
        executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        headless: false, // 关掉无界面模式 或 false（可视化）
        // slowMo: 250, // 慢速度，slowMo选项以指定的毫秒减慢Puppeteer的操作
        //设置视窗的宽高
        defaultViewport: {
            width: 1400,
            height: 800,
        },
        args: ["--window-size=1400,700"],
    }

    // 使用 puppeteer.launch 方法启动 Chrome 或 Chromium 浏览器
    const browser = await puppeteer.launch(options)

    // 使用 browser.newPage 方法创建一个新页面
    const page: Page = await browser.newPage()
    return {
        browser,
        page,
    }
}

const doPyt = async () => {
    const { page, browser } = await newPage()

    // 使用 page.goto 方法跳转到指定的网页：
    await page.goto("https://www.jd.com/")

    const input = await page.$("#key")

    if (input) {
        await input.type("手机")
        await page.keyboard.press("Enter")
        await page.waitForSelector(".gl-warp>.gl-item:last-child")

        // 获取到的对象进行 dom 操作，然后获取相应的内容
        const lis = await page.$$eval(".gl-warp>.gl-item", (els) =>
            els.map((item: any) => item.innerText)
        )
        console.log(lis)
    }

    // 使用 browser.close 方法关闭浏览器
    await browser.close()
}
doPyt()
```

### 输入文本与元素点击

```ts
const puppeteer = require("puppeteer-core")
import type { Page } from "puppeteer-core"

const newPage = async (): Promise<Page> => {
    const options = {
        executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        headless: false, // 关掉无界面模式 或 false（可视化）
        // slowMo: 250, // 慢速度，slowMo选项以指定的毫秒减慢Puppeteer的操作
        //设置视窗的宽高
        defaultViewport: {
            width: 1400,
            height: 800,
        },
        args: ["--window-size=1400,700"],
    }

    // 使用 puppeteer.launch 方法启动 Chrome 或 Chromium 浏览器
    const browser = await puppeteer.launch(options)

    // 使用 browser.newPage 方法创建一个新页面
    const page: Page = await browser.newPage()
    return page
}

const doPyt = async () => {
    const page = await newPage()

    await page.goto("https://www.baidu.com/")
    const input = await page.waitForSelector("#kw")
    if (input) {
        await input.type("hello world")
        const btn = await page.$("#su")
        btn && btn.click()

        /* 等待指定的选择器匹配的元素出现在页面中，如果调用此方法时已经有匹配的元素，
  那么此方法立即返回。如果指定的选择器在超时时间后扔不出现，此方法会报错。
  返回: <Promise<ElementHandle>>*/
        await page.waitForSelector(
            "div#content_left > div.result-op.c-container.xpath-log"
        )

        const text1 = await page.$eval(
            "div#content_left > div.result-op.c-container.xpath-log",
            (el) => el.innerText
        )
        console.log(text1)

        /** 使用 js 方法 */
        let text2 = await page.evaluate(() => {
            const div: any = document.querySelector(
                "div#content_left > div.result-op.c-container.xpath-log"
            )
            return div.innerText
        })
        console.log(text2)
    }
}
doPyt()
```


