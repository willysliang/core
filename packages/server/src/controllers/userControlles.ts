/**
 * @ Author: willy
 * @ CreateTime: 2024-02-20 20:35:16
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-29 21:24:08
 * @ Description: 用户接口
 */

import { Response, Request, RequestHandler } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserService } from '../services/UserService'
import { SALT_ROUNDS, SECRETKEY } from '@willy/utils'
import { isUndefined } from '../utils/index'

const userService = new UserService()

/**
 * 注册
 * @example 前端调用案例
    fetch('http://localhost:3000/user/userinfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account: '3',
        email: '3',
        password: '3',
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('fetch', result)
      })
      .catch((error) => {
        console.error(error)
      })
 *
 */
export const createRegister: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { account, email, password } = req.body
    if (isUndefined(account) || isUndefined(email) || isUndefined(password)) {
      res.status(400).json('all fields are mandatory!')
      return
    }

    // 查询账号是否已经注册
    const userAvailable = await userService.getUser(account)

    console.log('userAvailable', userAvailable)
    if (userAvailable) {
      res.json({
        code: 400,
        msg: 'User already registered!',
      })
      return
    }

    // 密码加盐
    bcrypt.genSalt(SALT_ROUNDS, (err: Error, salt: string) => {
      if (err) {
        res.json({
          code: 400,
          msg: 'bcrypt salt error',
          data: { error: err },
        })
        return
      }

      bcrypt.hash(password, salt, async (error: Error, hash: string) => {
        if (error) {
          res.json({
            code: 400,
            msg: 'bcrypt hash error',
            data: { error },
          })
          return
        }

        const user = await userService.createUser({
          account,
          email,
          password: hash,
        })

        const jsonResult = user
          ? {
              code: 201,
              msg: 'success',
              data: { _id: user.id, email: user.email },
            }
          : {
              code: 400,
              msg: 'User data us not valid.',
            }
        res.json(jsonResult)
      })
    })
  },
)

/**
 * 登录
 */
export const createLogin: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { account, password } = req.body

    if (isUndefined(account) || isUndefined(password)) {
      res.json({
        code: 400,
        msg: 'All fields are mandatory.',
      })
      return
    }

    const user = await userService.getUser(account)

    // 验证密码是否匹配
    if (user && bcrypt.compare(user.password, password)) {
      const token = jwt.sign(
        {
          user: {
            account: user.account,
            id: user.id || user._id,
          },
        },
        SECRETKEY,
        { expiresIn: '24h' },
      )
      res.json({
        code: 200,
        msg: 'success',
        data: { token },
      })
    } else {
      res.json({
        code: 400,
        msg: 'account or password is valid',
      })
    }
  },
)

/**
 * 当前用户信息
 */
export const createCurrentUserInfo: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    res.json({
      code: 200,
      // @ts-expect-error 如果报错，则说明 jwt 校验没有通过(没有在请求头中写入 user 信息字段)
      msg: { user: req.user },
    })
  },
)

/**
 * 爬虫信息
 */
export const createSpider: RequestHandler = asyncHandler(
  async (_: Request, res: Response) => {
    const data = await userService.spider()
    console.log('data', data)
    res.json({
      code: 200,
      msg: 'success',
      data,
    })
  },
)
