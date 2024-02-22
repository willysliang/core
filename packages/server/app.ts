/**
 * @ Author: willy
 * @ CreateTime: 2024-02-20 10:13:16
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-22 20:10:16
 * @ Description: 入口
 */

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import indexRouter from './src/router/index'
import { handleOnError, handleOnListening } from './src/utils/appUtils'
import { SERVER_PORT } from './src/config/app.config'
import { errorHandler, error404Handler } from './src/middleware/errorMiddleware'

const path = require('node:path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const http = require('node:http')

const app = express()

// 禁止 X-Powered-By 响应头，减少了暴露服务使用情况的信息量
app.disable('x-powered-by')

/**
 * 视图资源
 */
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'jade')

/**
 * 接口/日志
 */
app.use(logger('dev'))
/**
 * 将 compression 中间件添加到 Express 应用，以自动压缩所有响应，用于在使用 Express 或其他兼容的框架时压缩 HTTP 响应。
 * 这个中间件使用 gzip、deflate 等压缩算法来减少发送到客户端的数据大小，从而提升 web 应用的性能，降低带宽使用，并加快客户端加载页面的速度。
 * 使用 compression 中间件可以显著减少响应体的大小，特别适用于文本类型的数据，如 HTML、CSS、JavaScript 和 JSON。
 * 对于已经压缩的资源，如图片和视频文件，通常不会再用 compression 中间件进行压缩，因为这些资源格式本身已经是压缩的，再次压缩不会带来显著的效果，反而可能会浪费 CPU 资源。
 */
app.use(compression())
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// 允许跨域
app.use(
  cors({
    origin: '*',
  }),
)

/**
 * 中间件
 */
/** 静态资源中间件设置 */
app.use(express.static(path.join(__dirname, 'public')))

/**
 * 路由分配
 */
app.use('/', indexRouter)

/** 404 处理 */
app.use(error404Handler)
/** 错误信息处理中间件 */
app.use(errorHandler)

/**
 * 服务器启动
 */
app.set('port', SERVER_PORT)
const server = http.createServer(app)
server.listen(SERVER_PORT)
server.on('error', (err) => handleOnError(SERVER_PORT, err))
server.on('listening', () => handleOnListening(server))
