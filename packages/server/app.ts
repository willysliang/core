/**
 * @ Author: willy
 * @ CreateTime: 2024-02-20 10:13:16
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-21 15:53:10
 * @ Description: 入口
 */

import express from 'express'
import indexRouter from './src/router/index'
import { handleOnError, handleOnListening } from './src/utils/appUtils'
import { SERVER_PORT } from './src/config/app.config'
import { errorHandler, error404Handler } from './src/middleware/errorMiddleware'

const path = require('node:path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const http = require('node:http')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

/**
 * 视图资源
 */
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'jade')

/**
 * 接口/日志
 */
app.use(logger('dev'))
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
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
