/**
 * @ Author: willy
 * @ CreateTime: 2024-02-26 09:44:00
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-29 14:19:20
 * @ Description: 路由主入口
 */

import express, { Router } from 'express'
import userRoutes from './userRoutes'
import contactRoutes from './contactRoutes'
import webPushRoutes from './webPushRoutes'
import fileRoutes from './fileRoutes'

const router: Router = express.Router()

router.get('/', (_, res) => {
  res.render('index', { title: 'Express' })
})

/** webpush 相关 */
router.use('/webPush', webPushRoutes)

/** 用户相关 */
router.use('/user', userRoutes)

/** 联系人相关 */
router.use('/contact', contactRoutes)

/** 文件类相关 */
router.use('/file', fileRoutes)

export default router
