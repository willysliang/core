/**
 * @ Author: willy
 * @ CreateTime: 2024-02-20 16:41:58
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-20 21:26:05
 * @ Description: 用户相关路由
 */

import express from 'express'
import { validateToken } from '../middleware/validateTokenHandler'
import {
  createRegister,
  createLogin,
  createCurrentUserInfo,
} from './controllers/userControlles'

const router = express.Router()

router.get('/', (_, res) => {
  res.status(200).json('')
})

/** 注册 */
router.route('/register').post(createRegister)

/** 登录 */
router.route('/login').post(createLogin)

/** 用户信息 */
router.route('/userinfo').get(validateToken, createCurrentUserInfo)

export default router
