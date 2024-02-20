/**
 * @ Author: willy
 * @ CreateTime: 2024-02-20 10:13:16
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-20 19:42:01
 * @ Description: 入口
 */

import express from 'express'
import indexRouter from './src/router/index'
import { handleOnError, handleOnListening } from './src/utils/app'
import { SERVER_PORT } from './src/config/app.config'
import { connectDB } from './src/config/mongooseDB.connect'

const path = require('node:path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const http = require('node:http')

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
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

/**
 * 静态资源
 */
app.use(express.static(path.join(__dirname, 'public')))

/**
 * 路由分配
 */
app.use('/', indexRouter)

/**
 * 连接数据库
 */
connectDB()

/**
 * 服务器启动
 */
app.set('port', SERVER_PORT)
const server = http.createServer(app)
server.listen(SERVER_PORT)
server.on('error', (err) => handleOnError(SERVER_PORT, err))
server.on('listening', () => handleOnListening(server))
