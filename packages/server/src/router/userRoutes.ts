/**
 * @ Author: willy
 * @ CreateTime: 2024-02-20 16:41:58
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-21 16:14:07
 * @ Description: 用户相关路由
 */

import express from 'express'
import { validateToken } from '../middleware/tokenMiddleware'
import {
  createRegister,
  createLogin,
  createCurrentUserInfo,
  createSpider,
} from './controllers/userControlles'

const router = express.Router()

router.get('/', (_, res) => {
  res.json({
    code: 200,
    msg: 'success',
    data: {},
  })
})

/** 注册 */
router.route('/register').post(createRegister)

/** 登录 */
router.route('/login').post(createLogin)

/** 用户信息 */
router.route('/userinfo').get(validateToken, createCurrentUserInfo)

/** 爬虫信息 */
router.route('/spider').get(createSpider)

export default router
