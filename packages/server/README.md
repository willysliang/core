## 项目结构
```bash
│  app.js
│  package.json
│  README.md
│
├─ config 配置文件
│			app.config
|			db.config
|			mogooseDB.connect
│
├─ dao 抽象层
│			BaseDao 基础抽象接口
│			UserDao 用户接口
|			
│
├─models 实体层
│			UserModel 用户信息数据源
|			contactModel 触摸信息
│
├─ middleware 中间件
|			errorMiddleware 错误信息中间件
|			tokenMiddleware 鉴权中间件
|
├─ public 静态资源
│		├─ images
│		├─ javascripts
│		└─ stylesheets
│					style.css
│
├─ router 路由表
|		└─ controller 层
│			index 路由主入口
|			userRoutes 用户相关路由
│
├─services 业务逻辑层
│			UserService 用户业务
│
├─utils 创建型的方法或者其他公共方法
│      index 公共方法
│      appUtils 服务主程序通用方法
│
└─views 视图层
│      error.jade
│      index.jade
│      layout.jade

```

